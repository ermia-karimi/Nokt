/* =========================================================
   Worker - Hybrid TextRank (Full)
========================================================= */

/* StopWords پیشرفته فارسی */
const stopWords = [
    "و", "یا", "اما", "ولی", "بلکه", "زیرا", "بنابراین", "پس",
    "در", "به", "از", "تا", "برای", "با", "بر", "بین", "بدون", "مثل",
    "این", "آن", "ای", "همان", "چنین", "همچنین",
    "من", "تو", "او", "ما", "شما", "آنها", "وی", "ایشان",
    "است", "هست", "بود", "بودند", "باشد", "هستم",
    "هستند", "می", "شود", "شد", "شده", "می‌شود", "کرد",
    "کرده", "می‌کند", "کنند", "کردن", "خواهد", "خواهند",
    "بسیار", "خیلی", "زیاد", "کم", "هم", "نیز", "همه",
    "یک", "دو", "سه", "چند", "هر", "هیچ"
];

/* Normalize */
function normalize(text) {
    return text
        .replace(/[^\u0600-\u06FF\s.!؟]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function splitSentences(text) {
    return normalize(text)
        .split(/(?<=[.!؟])/)
        .map(s => s.trim())
        .filter(Boolean);
}

function getWords(text) {
    return normalize(text)
        .split(" ")
        .filter(w => w.length > 2 && !stopWords.includes(w));
}

/* TF-IDF */
function computeTFIDF(sentences) {
    const docs = sentences.map(s => getWords(s));
    const df = {};
    docs.forEach(words => new Set(words).forEach(w => df[w] = (df[w] || 0) + 1));

    return docs.map(words => {
        const tf = {};
        words.forEach(w => tf[w] = (tf[w] || 0) + 1);
        let score = 0;
        words.forEach(w => {
            const idf = Math.log(docs.length / (df[w] || 1));
            score += tf[w] * idf;
        });
        return score;
    });
}

/* Cosine Similarity */
function buildFreqMap(words) {
    const map = {};
    for (let w of words) map[w] = (map[w] || 0) + 1;
    return map;
}

function cosineSim(a, b) {
    let dot = 0, na = 0, nb = 0;
    for (let w in a) { na += a[w] * a[w]; if (b[w]) dot += a[w] * b[w]; }
    for (let w in b) { nb += b[w] * b[w]; }
    return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

/* Similarity Matrix */
function buildMatrix(sentences) {
    const docs = sentences.map(s => getWords(s));
    const freqDocs = docs.map(d => buildFreqMap(d));
    const n = docs.length;
    const matrix = Array(n).fill(0).map(() => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const sim = cosineSim(freqDocs[i], freqDocs[j]);
            matrix[i][j] = sim;
            matrix[j][i] = sim;
        }
    }
    return { matrix, docs };
}

/* PageRank */
function pageRank(matrix, d = 0.85, iter = 25) {
    const n = matrix.length;
    let ranks = Array(n).fill(1 / n);
    for (let k = 0; k < iter; k++) {
        const newRanks = Array(n).fill((1 - d) / n);
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (matrix[j][i] === 0) continue;
                const outSum = matrix[j].reduce((a, b) => a + b, 0);
                if (!outSum) continue;
                newRanks[i] += d * (matrix[j][i] / outSum) * ranks[j];
            }
        }
        ranks = newRanks;
    }
    return ranks;
}

/* Keyword Boost */
function getTopKeywords(freq, limit = 10) {
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, limit).map(x => x[0]);
}

function keywordBoost(words, keywords) {
    let boost = 0;
    words.forEach(w => { if (keywords.includes(w)) boost += 2; });
    return boost;
}

/* Position + Length */
function positionWeight(i, total) {
    if (i < total * 0.2) return 1.25;
    if (i > total * 0.8) return 1.15;
    return 1;
}

function lengthWeight(len) {
    const ideal = 12;
    return 1 / (1 + Math.abs(len - ideal) / ideal);
}

/* Redundancy Filter */
function filterRedundant(selected, docs, threshold = 0.7) {
    const result = [];
    selected.forEach(s => {
        const wordsA = docs[s.index];
        const tooSimilar = result.some(r => {
            const wordsB = docs[r.index];
            return cosineSim(wordsA, wordsB) > threshold;
        });
        if (!tooSimilar) result.push(s);
    });
    return result;
}

/* Hybrid TextRank */
function hybridTextRank(sentences) {
    const { matrix, docs } = buildMatrix(sentences);
    const ranks = pageRank(matrix);
    const tfidf = computeTFIDF(sentences);
    const allWords = docs.flat();
    const freq = {};
    allWords.forEach(w => freq[w] = (freq[w] || 0) + 1);
    const keywords = getTopKeywords(freq, 10);

    return sentences.map((s, i) => {
        const words = docs[i];
        const rankScore = ranks[i];
        const tfidfScore = tfidf[i];
        const posWeight = positionWeight(i, sentences.length);
        const lenWeightVal = lengthWeight(words.length);
        const keyBoost = keywordBoost(words, keywords);
        const score = (rankScore * 2) + (tfidfScore * 1.5) + keyBoost;
        return { s, score: score * posWeight * lenWeightVal, index: i };
    });
}

/* ================= Process Text ================= */
onmessage = function (e) {
    const { text, percent } = e.data;
    if (!text) return;
    const sentences = splitSentences(text);
    let scored = hybridTextRank(sentences);
    scored.sort((a, b) => b.score - a.score);
    const target = Math.max(3, Math.floor(scored.length * percent));
    let selected = scored.slice(0, target);
    selected = filterRedundant(selected, sentences.map(s => buildFreqMap(getWords(s))));
    postMessage({ sentences, selected });
};
