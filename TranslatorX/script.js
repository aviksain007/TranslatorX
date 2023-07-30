const countries = {
    "en-GB": "English",
    "bn-IN": "Bengali",
    "hi-IN": "Hindi",
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "be-BY": "Bielarus",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bo-CN": "Tibetan",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "cs-CZ": "Czech",
    "cy-GB": "Welsh",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "de-DE": "German",
    "dv-MV": "Maldivian",
    "el-GR": "Greek",
    "es-ES": "Spanish",
    "et-EE": "Estonian",
    "eu-ES": "Basque",
    "fa-IR": "Persian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hr-HR": "Croatian",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "my-MM": "Burmese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "nl-NL": "Dutch",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "rn-BI": "Kirundi",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sq-AL": "Albanian",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
};

let selectTag = document.getElementsByClassName('form-select');
const outputText = document.getElementById('outputText');
const inputText = document.getElementById("inputText");
let icons = document.querySelectorAll(".icons span");
// let volume = document.getElementById('volume');
// let copy = document.getElementById('copy');

(() => {
    for(let code in countries){
        selectTag[0].innerHTML += `<option value="${code}">${countries[code]}</option>`;
        selectTag[1].innerHTML += `<option value="${code}">${countries[code]}</option>`;
    }
})();

inputText.addEventListener("keyup", () => {
    if(!inputText.value) {
        outputText.value = "";
    }
    outputText.setAttribute("placeholder", "Translate");
});



translateBtn.addEventListener("click",()=> {
    let text = inputText.value.trim();
    let tanslateFrom = selectTag[0].value;
    let translateTo = selectTag[1].value;
    if(!text) return;
    outputText.setAttribute("placeholder", "Translating...");
    let apiurl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${tanslateFrom}|${translateTo}`;
    fetch(apiurl).then(resp=> resp.json()).then((data)=>{
        console.log(data)
        if(data.responseStatus >= 200 && data.responseStatus < 300) {
            outputText.value = data.responseData.translatedText;
        } 
        else {
            alert("choose a input and a output language")
        }
    })
})




inputVolume.addEventListener("click", ()=> {
    if(!inputText.value) return;
    let utterance;
    utterance = new SpeechSynthesisUtterance(inputText.value);
    utterance.lang = selectTag[0].value;
    speechSynthesis.speak(utterance);
})
outputVolume.addEventListener("click", ()=> {
    if(!outputText.value) return;
    let utterance;
    utterance = new SpeechSynthesisUtterance(outputText.value);
    utterance.lang = selectTag[1].value;
    speechSynthesis.speak(utterance);
})

inputCopy.addEventListener("click", ()=>{
    if(!inputText.value) return;
    navigator.clipboard.writeText(inputText.value);
})
outputCopy.addEventListener("click", ()=>{
    if(!outputText.value) return;
    navigator.clipboard.writeText(outputText.value);
})




// icons.forEach(icon => {
//     icon.addEventListener("click", ({target}) => {
//         if(!inputText.value || !outputText.value) return;
//         if(target.classList.contains("copy")) {
//             if(target.classList.contains("input")) {
//                 navigator.clipboard.writeText(inputText.value);
//             } else {
//                 navigator.clipboard.writeText(outputText.value);
//             }
//         } else {
//             let utterance;
//             if(target.classList.contains("input")) {
//                 utterance = new SpeechSynthesisUtterance(inputText.value);
//                 utterance.lang = selectTag[0].value;
//             } else {
//                 utterance = new SpeechSynthesisUtterance(outputText.value);
//                 utterance.lang = selectTag[1].value;
//             }
//             speechSynthesis.speak(utterance);
//         }
//     });
// });



window.addEventListener("load", ()=>{
    inputText.value = "";
    outputText.value = "";
})





