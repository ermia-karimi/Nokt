// /* ---------- تنظیمات ---------- */
// const stopWords = [
//     "و", "در", "به", "از", "که", "را", "برای", "این", "آن", "با",
//     "می", "شود", "شد", "است", "هم", "کرد", "کردن", "باشد"
// ];

// const percentInputEl = document.getElementById("percent");
// const percentLabel = document.getElementById("percentLabel");
// const pdfBtn = document.getElementById("pdfBtn");

// percentInputEl.oninput = () => {
//     percentLabel.innerText = percentInputEl.value + "%";
// };

// /* ---------- پردازش متن ---------- */
// function normalize(text) {
//     return text
//         .replace(/[^\u0600-\u06FF\s.!؟]/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
// }

// function splitSentences(text) {
//     return text.split(/(?<=[.!؟])/).map(s => s.trim()).filter(Boolean);
// }

// function getWords(text) {
//     return normalize(text)
//         .split(" ")
//         .filter(w => w.length > 2 && !stopWords.includes(w));
// }

// function scoreSentences(sentences) {
//     const allWords = getWords(sentences.join(" "));
//     const freq = {};
//     allWords.forEach(w => freq[w] = (freq[w] || 0) + 1);

//     return sentences.map(s => {
//         const words = getWords(s);
//         let score = 0;
//         words.forEach(w => score += freq[w] || 0);
//         score *= Math.log(words.length + 1);
//         return { s, score };
//     });
// }

// /* ---------- اجرای الگوریتم ---------- */
// function processText() {
//     const text = inputText.value.trim();
//     if (!text) { alert("متن وارد کن"); return; }

//     const percent = percentInputEl.value / 100;
//     const sentences = splitSentences(text);
//     const scored = scoreSentences(sentences);

//     scored.sort((a, b) => b.score - a.score);

//     let target = Math.max(3, Math.floor(scored.length * percent));
//     let selected = scored.slice(0, target);

//     const lastScore = selected[selected.length - 1].score;
//     const epsilon = lastScore * 0.85;
//     scored.forEach(x => { if (x.score >= epsilon) selected.push(x) });

//     selected = [...new Map(selected.map(x => [x.s, x])).values()];

//     const selectedSet = new Set(selected.map(x => x.s));
//     render(sentences, selectedSet);
// }

// /* ---------- رندر ---------- */
// function render(sentences, selected) {
//     content.innerHTML = sentences.map(s => {
//         if (selected.has(s)) {
//             return `<div class="sentence highlight">${s}</div>`;
//         }
//         return `<div class="sentence">${s}</div>`;
//     }).join("");

//     mainPage.style.display = "none";
//     highlightPage.style.display = "block";

//     preparePDFButton();
// }

// function goBack() {
//     highlightPage.style.display = "none";
//     mainPage.style.display = "block";
// }

// /* ---------- PDF ---------- */
// function preparePDFButton() {
//     pdfBtn.disabled = false;
//     pdfBtn.innerText = "باز کردن PDF";
//     pdfBtn.onclick = createPDF;
// }


// // function createPDF() {
// //     const element = document.getElementById("content");

// //     const opt = {
// //         margin: 0.6,
// //         filename: "nokta.pdf",
// //         html2canvas: { scale: 2 },
// //         pagebreak: { mode: ["avoid-all", "css"] },
// //         jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
// //     };

// //     html2pdf()
// //         .set(opt)
// //         .from(element)
// //         .outputPdf("blob")
// //         .then(blob => {
// //             const blobUrl = URL.createObjectURL(blob);

// //             // باز شدن با PDF Viewer یا Chrome
// //             window.open(blobUrl, "_blank");
// //         });
// // }



// async function createPDF() {
//     const element = document.getElementById("content");
//     const blob = await html2pdf().from(element).outputPdf("blob");

//     if (window.Capacitor && window.Capacitor.isNativePlatform()) {
//         const base64 = await blobToBase64(blob);
//         const file = await window.Capacitor.Plugins.Filesystem.writeFile({
//             path: "nokta.pdf",
//             data: base64,
//             directory: window.Capacitor.Plugins.Filesystem.Directory.Cache
//         });

//         await window.Capacitor.openUrl({ url: file.uri });
//     } else {
//         const url = URL.createObjectURL(blob);
//         window.open(url, "_blank");
//     }
// }

// function blobToBase64(blob) {
//     return new Promise(resolve => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result.split(',')[1]);
//         reader.readAsDataURL(blob);
//     });
// }





































// /* ---------- تنظیمات ---------- */
// const stopWords = [
//     "و", "در", "به", "از", "که", "را", "برای", "این", "آن", "با",
//     "می", "شود", "شد", "است", "هم", "کرد", "کردن", "باشد"
// ];

// const percentInputEl = document.getElementById("percent");
// const percentLabel = document.getElementById("percentLabel");
// const pdfBtn = document.getElementById("pdfBtn");
// const content = document.getElementById("content");
// const mainPage = document.getElementById("mainPage");
// const highlightPage = document.getElementById("highlightPage");
// const inputText = document.getElementById("inputText");

// percentInputEl.oninput = () => percentLabel.innerText = percentInputEl.value + "%";

// /* ---------- ابزارهای سئو ---------- */
// function generateId() {
//     return Math.random().toString(36).substring(2, 8);
// }

// function setDynamicMeta(titleText, descText) {
//     document.title = titleText;

//     let meta = document.querySelector("meta[name='description']");
//     if (!meta) {
//         meta = document.createElement("meta");
//         meta.name = "description";
//         document.head.appendChild(meta);
//     }
//     meta.content = descText;
// }

// /* ---------- لاگ تعامل ---------- */
// const pageStartTime = Date.now();
// window.addEventListener("beforeunload", () => {
//     const seconds = Math.round((Date.now() - pageStartTime) / 1000);
//     console.log("Time on page:", seconds, "seconds");
// });

// /* ---------- پردازش متن ---------- */
// function normalize(text) {
//     return text.replace(/[^\u0600-\u06FF\s.!؟]/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
// }

// function splitSentences(text) {
//     return normalize(text)
//         .split(/(?<=[.!؟])/)
//         .map(s => s.trim())
//         .filter(Boolean);
// }

// function getWords(text) {
//     return normalize(text)
//         .split(" ")
//         .filter(w => w.length > 2 && !stopWords.includes(w));
// }

// function scoreSentences(sentences) {
//     const allWords = getWords(sentences.join(" "));
//     const freq = {};
//     allWords.forEach(w => freq[w] = (freq[w] || 0) + 1);

//     return sentences.map(s => {
//         const words = getWords(s);
//         let score = 0;
//         words.forEach(w => score += freq[w] || 0);
//         score *= Math.log(words.length + 1);
//         return { s, score };
//     });
// }

// /* ---------- اجرای الگوریتم ---------- */
// function processText() {
//     const text = inputText.value.trim();
//     if (!text) {
//         alert("متن وارد کن");
//         return;
//     }

//     const percent = percentInputEl.value / 100;
//     const sentences = splitSentences(text);
//     let scored = scoreSentences(sentences).sort((a, b) => b.score - a.score);

//     let target = Math.max(3, Math.floor(scored.length * percent));
//     let selected = scored.slice(0, target);

//     const lastScore = selected[selected.length - 1].score;
//     const epsilon = lastScore * 0.85;
//     scored.forEach(x => {
//         if (x.score >= epsilon) selected.push(x);
//     });

//     selected = [...new Map(selected.map(x => [x.s, x])).values()];
//     const selectedSet = new Set(selected.map(x => x.s));

//     const maxScore = Math.max(...selected.map(x => x.score));
//     const minScore = Math.min(...selected.map(x => x.score));
//     const range = maxScore - minScore || 1;

//     const sentenceLevels = {};
//     selected.forEach(x => {
//         const rel = (x.score - minScore) / range;
//         if (rel > 0.66) sentenceLevels[x.s] = "high";
//         else if (rel > 0.33) sentenceLevels[x.s] = "medium";
//         else sentenceLevels[x.s] = "low";
//     });

//     render(sentences, selectedSet, sentenceLevels);

//     /* --- ذخیره خروجی و URL --- */
//     const resultId = generateId();
//     localStorage.setItem("nokta_" + resultId, content.innerHTML);
//     history.pushState({}, "", `?r=${resultId}`);

//     setDynamicMeta(
//         "نکات مهم این متن | نکتا",
//         "نکات مهم استخراج‌شده از یک متن آموزشی با ابزار نکتا"
//     );
// }

// /* ---------- رندر ---------- */
// function render(sentences, selectedSet, sentenceLevels) {
//     content.innerHTML = sentences.map(s => {
//         if (selectedSet.has(s)) {
//             return `<div class="sentence highlight ${sentenceLevels[s]}">${s}</div>`;
//         }
//         return `<div class="sentence">${s}</div>`;
//     }).join("");

//     mainPage.style.display = "none";
//     highlightPage.style.display = "block";

//     preparePDFButton();
// }

// function goBack() {
//     highlightPage.style.display = "none";
//     mainPage.style.display = "block";
// }

// /* ---------- Lazy Load PDF ---------- */
// function loadPDFLibs(callback) {
//     if (window.html2pdf) {
//         callback();
//         return;
//     }

//     const s = document.createElement("script");
//     s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
//     s.onload = callback;
//     document.body.appendChild(s);
// }

// /* ---------- PDF ---------- */
// function preparePDFButton() {
//     pdfBtn.style.display = "none";
//     pdfBtn.disabled = false;
//     pdfBtn.innerText = "باز کردن PDF";
//     pdfBtn.onclick = () => loadPDFLibs(createPDF);
// }

// async function createPDF() {
//     const opt = {
//         margin: 0.6,
//         filename: "nokta.pdf",
//         html2canvas: { scale: 2 },
//         pagebreak: { mode: ["avoid-all", "css"] },
//         jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
//     };
//     const blob = await html2pdf().set(opt).from(content).outputPdf("blob");
//     window.open(URL.createObjectURL(blob), "_blank");
// }

// /* ---------- بازیابی خروجی از URL ---------- */
// window.addEventListener("load", () => {
//     const params = new URLSearchParams(window.location.search);
//     const rid = params.get("r");

//     if (rid) {
//         const saved = localStorage.getItem("nokta_" + rid);
//         if (saved) {
//             content.innerHTML = saved;
//             mainPage.style.display = "none";
//             highlightPage.style.display = "block";

//             setDynamicMeta(
//                 "نکات مهم این متن | نکتا",
//                 "نکات مهم استخراج‌شده از یک متن آموزشی با ابزار نکتا"
//             );
//         }
//     }
// });



/* =========================================================
   تنظیمات
========================================================= */

const stopWords = [
    "و", "در", "به", "از", "که", "را", "برای", "این", "آن", "با",
    "می", "شود", "شد", "است", "هم", "کرد", "کردن", "باشد"
];

const percentInputEl = document.getElementById("percent");
const percentLabel = document.getElementById("percentLabel");
const pdfBtn = document.getElementById("pdfBtn");
const content = document.getElementById("content");
const mainPage = document.getElementById("mainPage");
const highlightPage = document.getElementById("highlightPage");
const inputText = document.getElementById("inputText");

percentInputEl.oninput =
    () => percentLabel.innerText = percentInputEl.value + "%";

/* =========================================================
   متن پایه
========================================================= */

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

/* =========================================================
   Cosine Similarity
========================================================= */

function cosineSim(a, b) {

    const set = new Set([...a, ...b]);

    let dot = 0, na = 0, nb = 0;

    set.forEach(w => {
        const fa = a.filter(x => x === w).length;
        const fb = b.filter(x => x === w).length;

        dot += fa * fb;
        na += fa * fa;
        nb += fb * fb;
    });

    return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

/* =========================================================
   TF-IDF
========================================================= */

function computeTFIDF(sentences) {

    const docs = sentences.map(s => getWords(s));
    const df = {};

    docs.forEach(words => {
        new Set(words).forEach(w => {
            df[w] = (df[w] || 0) + 1;
        });
    });

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

/* =========================================================
   Keyword Boost
========================================================= */

function getTopKeywords(freq, limit = 10) {
    return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(x => x[0]);
}

function keywordBoost(words, keywords) {
    let boost = 0;
    words.forEach(w => {
        if (keywords.includes(w)) boost += 2;
    });
    return boost;
}

/* =========================================================
   Position + Length
========================================================= */

function positionWeight(i, total) {
    if (i < total * 0.2) return 1.25;
    if (i > total * 0.8) return 1.15;
    return 1;
}

function lengthWeight(len) {
    const ideal = 12;
    return 1 / (1 + Math.abs(len - ideal) / ideal);
}

/* =========================================================
   Similarity Matrix
========================================================= */

function buildMatrix(sentences) {

    const docs = sentences.map(s => getWords(s));
    const n = docs.length;

    const matrix = Array(n)
        .fill(0)
        .map(() => Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            matrix[i][j] = cosineSim(docs[i], docs[j]);
        }
    }

    return { matrix, docs };
}

/* =========================================================
   PageRank
========================================================= */

function pageRank(matrix, d = 0.85, iter = 25) {

    const n = matrix.length;
    let ranks = Array(n).fill(1 / n);

    for (let k = 0; k < iter; k++) {

        const newRanks = Array(n).fill((1 - d) / n);

        for (let i = 0; i < n; i++) {

            for (let j = 0; j < n; j++) {

                if (matrix[j][i] === 0) continue;

                const outSum =
                    matrix[j].reduce((a, b) => a + b, 0);

                if (outSum === 0) continue;

                newRanks[i] +=
                    d *
                    (matrix[j][i] / outSum) *
                    ranks[j];
            }
        }

        ranks = newRanks;
    }

    return ranks;
}

/* =========================================================
   Redundancy Filter
========================================================= */

function filterRedundant(selected, threshold = 0.7) {

    const result = [];

    selected.forEach(s => {

        const wordsA = getWords(s.s);

        const tooSimilar = result.some(r => {
            const wordsB = getWords(r.s);
            return cosineSim(wordsA, wordsB) > threshold;
        });

        if (!tooSimilar) result.push(s);
    });

    return result;
}

/* =========================================================
   Hybrid TextRank Scoring
========================================================= */

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
        const lenWeight = lengthWeight(words.length);
        const keyBoost = keywordBoost(words, keywords);

        const score =
            (rankScore * 2) +
            (tfidfScore * 1.5) +
            keyBoost;

        return {
            s,
            score: score * posWeight * lenWeight
        };
    });
}

/* =========================================================
   اجرای پردازش
========================================================= */

function processText() {

    const text = inputText.value.trim();

    if (!text) {
        alert("متن وارد کن");
        return;
    }

    const percent = percentInputEl.value / 100;
    const sentences = splitSentences(text);

    let scored =
        hybridTextRank(sentences)
            .sort((a, b) => b.score - a.score);

    let target =
        Math.max(3, Math.floor(scored.length * percent));

    let selected = scored.slice(0, target);

    selected = filterRedundant(selected);

    const selectedSet =
        new Set(selected.map(x => x.s));

    /* شدت */

    const maxScore = Math.max(...selected.map(x => x.score));
    const minScore = Math.min(...selected.map(x => x.score));
    const range = maxScore - minScore || 1;

    const levels = {};

    selected.forEach(x => {

        const rel = (x.score - minScore) / range;

        if (rel > 0.66) levels[x.s] = "high";
        else if (rel > 0.33) levels[x.s] = "medium";
        else levels[x.s] = "low";
    });

    render(sentences, selectedSet, levels);
}

/* =========================================================
   رندر
========================================================= */

function render(sentences, set, levels) {

    content.innerHTML = sentences.map(s => {

        if (set.has(s)) {
            return `
            <div class="sentence highlight ${levels[s]}">
                ${s}
            </div>`;
        }

        return `<div class="sentence">${s}</div>`;

    }).join("");

    mainPage.style.display = "none";
    highlightPage.style.display = "block";

    preparePDFButton();
}

/* =========================================================
   دکمه بازگشت
========================================================= */

function goBack() {

    /* نمایش صفحه اصلی */
    highlightPage.style.display = "none";
    mainPage.style.display = "block";

    /* پاک کردن URL پارامتر */
    history.pushState({}, "", window.location.pathname);

    /* پاک کردن خروجی */
    content.innerHTML = "";

    /* ریست PDF دکمه */
    pdfBtn.style.display = "none";
}


/* =========================================================
   PDF
========================================================= */

function loadPDFLibs(cb) {

    if (window.html2pdf) {
        cb();
        return;
    }

    const s = document.createElement("script");
    s.src =
        "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    s.onload = cb;

    document.body.appendChild(s);
}

function preparePDFButton() {

    pdfBtn.style.display = "none";
    pdfBtn.disabled = false;
    pdfBtn.innerText = "باز کردن PDF";

    pdfBtn.onclick =
        () => loadPDFLibs(createPDF);
}

async function createPDF() {

    const opt = {
        margin: 0.6,
        filename: "nokta.pdf",
        html2canvas: { scale: 2 },
        pagebreak: { mode: ["avoid-all", "css"] },
        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }
    };

    const blob =
        await html2pdf()
            .set(opt)
            .from(content)
            .outputPdf("blob");

    window.open(
        URL.createObjectURL(blob),
        "_blank"
    );
}


































































































































// /* =========================
//    تنظیمات زبانی
// ========================= */

// const stopWordsCore = new Set([
//     "و", "یا", "اما", "اگر", "زیرا", "چون", "پس", "بنابراین", "درنتیجه", "همچنین", "لیکن",
//     "که", "این", "آن", "اینکه", "آنکه", "چنین", "چنان", "همین", "همان",
//     "از", "به", "با", "بر", "برای", "بی", "تا", "در", "روی", "میان", "نزد",
//     "را", "ها", "های", "هایی", "ان", "ات",
//     "می", "نمی", "شود", "شد", "شده", "می‌شود", "می‌باشد", "باشد", "باشند",
//     "کرد", "کرده", "کردن", "می‌کند", "می‌کنند",
//     "است", "هست", "هستند", "نیست", "نیستند", "بوده",
//     "داشت", "دارد", "دارند",
//     "هر", "همه", "هیچ", "چند", "چندین", "بسیار", "خیلی", "کم", "زیاد",
//     "اول", "دوم", "سوم", "نخست", "آخر", "بعد", "قبل"
// ]);

// const lowWeightWords = new Set([
//     "فرایند", "فرآیند", "سیستم", "روش", "عامل", "عوامل", "نوع", "انواع",
//     "مفهوم", "اصطلاح", "تعریف", "معنی", "کاربرد",
//     "مقدار", "میزان", "عدد", "ارزش",
//     "زمان", "دوره", "مرحله", "مراحل",
//     "شکل", "تصویر", "نمودار", "جدول",
//     "رابطه", "ارتباط", "وابسته", "وابستگی",
//     "بررسی", "مطالعه", "تحلیل",
//     "ویژگی", "خصوصیت", "مشخصه"
// ]);

// const LOW_WEIGHT = 0.3;

// /* =========================
//    الگوهای جمله‌ای
// ========================= */

// const definitionPatterns = [
//     /عبارت\s+است\s+از/,
//     /به\s+.*\s+گفته\s+می‌شود/,
//     /به\s+نام\s+.*\s+شناخته\s+می‌شود/
// ];

// const conclusionPatterns = [
//     /بنابراین/,
//     /در\s+نتیجه/,
//     /پس/,
//     /به\s+همین\s+دلیل/
// ];

// const emphasisPatterns = [
//     /نکته/,
//     /توجه/,
//     /دقت/,
//     /مهم\s+است/,
//     /باید\s+توجه\s+داشت/
// ];

// /* =========================
//    UI
// ========================= */

// const percentInputEl = document.getElementById("percent");
// const percentLabel = document.getElementById("percentLabel");

// percentInputEl.oninput = () => {
//     percentLabel.innerText = percentInputEl.value + "%";
// };

// /* =========================
//    پردازش متن
// ========================= */

// function normalize(text) {
//     return text
//         .replace(/[^\u0600-\u06FF\s.!؟\n]/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
// }

// function splitSentences(text) {
//     return text
//         .split(/(?<=[.!؟])|\n+/)
//         .map(s => s.trim())
//         .filter(s => s.length > 5);
// }

// function getWords(sentence) {
//     return normalize(sentence)
//         .split(" ")
//         .filter(w => w.length > 2 && !stopWordsCore.has(w));
// }

// /* =========================
//    امتیازدهی
// ========================= */

// function sentenceBoost(sentence, score) {
//     let boosted = score;

//     if (definitionPatterns.some(p => p.test(sentence))) {
//         boosted *= 1.8;
//     }

//     if (conclusionPatterns.some(p => p.test(sentence))) {
//         boosted *= 1.4;
//     }

//     if (emphasisPatterns.some(p => p.test(sentence))) {
//         boosted *= 1.6;
//     }

//     return boosted;
// }

// function scoreSentences(sentences) {
//     const freq = {};

//     sentences.forEach(s => {
//         getWords(s).forEach(w => {
//             freq[w] = (freq[w] || 0) + 1;
//         });
//     });

//     return sentences.map(sentence => {
//         let score = 0;
//         const words = getWords(sentence);

//         words.forEach(w => {
//             let weight = freq[w] || 0;
//             if (lowWeightWords.has(w)) weight *= LOW_WEIGHT;
//             score += weight;
//         });

//         score *= Math.log(words.length + 1);
//         score = sentenceBoost(sentence, score);

//         return { sentence, score };
//     });
// }

// /* =========================
//    اجرای اصلی
// ========================= */

// function processText() {
//     const text = inputText.value.trim();
//     if (!text) {
//         alert("متن وارد کن");
//         return;
//     }

//     const percent = percentInputEl.value / 100;
//     const sentences = splitSentences(text);
//     const scored = scoreSentences(sentences);

//     scored.sort((a, b) => b.score - a.score);

//     const targetCount = Math.max(3, Math.floor(scored.length * percent));
//     let selected = scored.slice(0, targetCount);

//     const threshold = selected[selected.length - 1].score * 0.85;
//     scored.forEach(s => {
//         if (s.score >= threshold) selected.push(s);
//     });

//     selected = [...new Map(selected.map(s => [s.sentence, s])).values()];
//     const selectedSet = new Set(selected.map(s => s.sentence));

//     render(sentences, selectedSet);
// }

// /* =========================
//    رندر
// ========================= */

// function render(sentences, selectedSet) {
//     content.innerHTML = sentences.map(s => {
//         return `<div class="sentence ${selectedSet.has(s) ? "highlight" : ""}">${s}</div>`;
//     }).join("");

//     mainPage.style.display = "none";
//     highlightPage.style.display = "block";
// }

// /* =========================
//    بازگشت
// ========================= */

// function goBack() {
//     highlightPage.style.display = "none";
//     mainPage.style.display = "block";
// }













































// /* =========================
//    تنظیمات
// ========================= */
// const stopWords = [
//     "و", "در", "به", "از", "که", "را", "برای", "این", "آن", "با",
//     "می", "شود", "شد", "است", "هم", "کرد", "کردن", "باشد"
// ];

// const percentInputEl = document.getElementById("percent");
// const percentLabel = document.getElementById("percentLabel");
// const pdfBtn = document.getElementById("pdfBtn");

// percentInputEl.oninput = () => {
//     percentLabel.innerText = percentInputEl.value + "%";
// };

// /* =========================
//    PDF به عنوان ورودی
// ========================= */
// document.getElementById("pdfFile").addEventListener("change", async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const arrayBuffer = await file.arrayBuffer();
//     const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;

//     let fullText = "";
//     for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items.map(item => item.str).join(" ");
//         fullText += pageText + "\n";
//     }

//     // جایگزین متن textarea
//     inputText.value = fullText;
//     alert("متن PDF استخراج شد، حالا می‌توانید نکات را جدا کنید.");
// });

// /* =========================
//    پردازش متن
// ========================= */
// function normalize(text) {
//     return text
//         .replace(/[^\u0600-\u06FF\s.!؟]/g, " ")
//         .replace(/\s+/g, " ")
//         .trim();
// }

// function splitSentences(text) {
//     return text.split(/(?<=[.!؟])/).map(s => s.trim()).filter(Boolean);
// }

// function getWords(text) {
//     return normalize(text)
//         .split(" ")
//         .filter(w => w.length > 2 && !stopWords.includes(w));
// }

// function scoreSentences(sentences) {
//     const allWords = getWords(sentences.join(" "));
//     const freq = {};
//     allWords.forEach(w => freq[w] = (freq[w] || 0) + 1);

//     return sentences.map(s => {
//         const words = getWords(s);
//         let score = 0;
//         words.forEach(w => score += freq[w] || 0);
//         score *= Math.log(words.length + 1);
//         return { s, score };
//     });
// }

// /* =========================
//    اجرای الگوریتم
// ========================= */
// function processText() {
//     const text = inputText.value.trim();
//     if (!text) { alert("متن وارد کن"); return; }

//     const percent = percentInputEl.value / 100;
//     const sentences = splitSentences(text);
//     const scored = scoreSentences(sentences);

//     scored.sort((a, b) => b.score - a.score);

//     let target = Math.max(3, Math.floor(scored.length * percent));
//     let selected = scored.slice(0, target);

//     const lastScore = selected[selected.length - 1].score;
//     const epsilon = lastScore * 0.85;
//     scored.forEach(x => { if (x.score >= epsilon) selected.push(x) });

//     selected = [...new Map(selected.map(x => [x.s, x])).values()];

//     const selectedSet = new Set(selected.map(x => x.s));
//     render(sentences, selectedSet);
// }

// /* =========================
//    رندر
// ========================= */
// function render(sentences, selected) {
//     content.innerHTML = sentences.map(s => {
//         if (selected.has(s)) {
//             return `<div class="sentence highlight">${s}</div>`;
//         }
//         return `<div class="sentence">${s}</div>`;
//     }).join("");

//     mainPage.style.display = "none";
//     highlightPage.style.display = "block";

//     preparePDFButton();
// }

// function goBack() {
//     highlightPage.style.display = "none";
//     mainPage.style.display = "block";
// }

// /* =========================
//    PDF نکات
// ========================= */
// function preparePDFButton() {
//     pdfBtn.disabled = false;
//     pdfBtn.innerText = "باز کردن PDF";
//     pdfBtn.onclick = createPDF;
// }

// async function createPDF() {
//     const element = document.getElementById("content");
//     const blob = await html2pdf().from(element).outputPdf("blob");

//     if (window.Capacitor && window.Capacitor.isNativePlatform()) {
//         const base64 = await blobToBase64(blob);
//         const file = await window.Capacitor.Plugins.Filesystem.writeFile({
//             path: "nokta.pdf",
//             data: base64,
//             directory: window.Capacitor.Plugins.Filesystem.Directory.Cache
//         });

//         await window.Capacitor.openUrl({ url: file.uri });
//     } else {
//         const url = URL.createObjectURL(blob);
//         window.open(url, "_blank");
//     }
// }

// function blobToBase64(blob) {
//     return new Promise(resolve => {
//         const reader = new FileReader();
//         reader.onloadend = () => resolve(reader.result.split(',')[1]);
//         reader.readAsDataURL(blob);
//     });
// }
