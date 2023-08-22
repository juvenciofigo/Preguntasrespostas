const btn = document.querySelector(".abrirRespoder");
const resBtn = document.querySelector(".areaResposta");
const textarea = document.getElementById("meuTextarea");
console.log(textarea)


textarea.addEventListener("input", () => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
});
