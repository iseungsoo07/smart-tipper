let noTipBtn = document.getElementById("noTipBtn");
let randTipBtn = document.getElementById("randTipBtn");
let maxTipBtn = document.getElementById("maxTipBtn");
let percentTipBtn = document.getElementById("percentTipBtn");
let darkModeBtn = document.getElementById("darkModeBtn");
let screenHeader = document.querySelector(".smart-tipper__header");
let mainScreen = document.querySelector(".smart-tipper__body");
let radioBtns = mainScreen.querySelector(".radio-btns");
let darkBtnBorder = document.querySelector(".dark-btn");
let inputNum = document.querySelectorAll(".show-result__input input");
let rateBar = document.querySelector(".rate-bar");
let rateText = document.querySelector(".tip-rate");

let darkCnt = 0; // 다크모드 체크여부를 확인하기 위한 변수

function isDark() {
   if (!darkCnt) {
      screenHeader.style.backgroundColor = "black";
      screenHeader.style.borderBottom = "1px solid white";
      mainScreen.style.backgroundColor = "black";
      mainScreen.style.color = "white";
      radioBtns.style.border = "1px dashed white";
      darkBtnBorder.style.border = "1px dashed white";
      inputNum.forEach(function (element) {
         element.style.backgroundColor = "black";
         element.style.borderBottom = "1px solid white";
         element.style.color = "white";
      });
      darkCnt = 1;
   } else {
      screenHeader.style.backgroundColor = "#005cc8";
      screenHeader.style.borderBottom = "1px solid black";
      mainScreen.style.backgroundColor = "white";
      mainScreen.style.color = "black";
      radioBtns.style.border = "1px dashed black";
      darkBtnBorder.style.border = "1px dashed black";
      inputNum.forEach(function (element) {
         element.style.backgroundColor = "white";
         element.style.borderBottom = "1px solid rgba(0, 0, 0, 0.4)";
         element.style.color = "black";
      });
      darkCnt = 0;
   }
}

function calculateTip() {
   let sales = inputNum[0].value;
   if (percentTipBtn.checked === true) {
      inputNum[1].value = (sales * rateBar.value) / 100;
      inputNum[2].value = Number(sales) + Number(inputNum[1].value);
   } else if (noTipBtn.checked === true) {
      inputNum[1].value = 0;
      inputNum[2].value = sales;
   }
}

function rateBarHandler() {
   rateText.innerHTML = `Rate: ${rateBar.value}%`;
   inputNum[1].value = (inputNum[0].value * rateBar.value) / 100;
   inputNum[2].value = Number(inputNum[1].value) + Number(inputNum[0].value);
}

function init() {
   darkModeBtn.addEventListener("click", isDark);
   inputNum.forEach(function (element) {
      element.addEventListener("input", calculateTip);
   });
   noTipBtn.addEventListener("click", calculateTip);
   randTipBtn.addEventListener("click", calculateTip);
   percentTipBtn.addEventListener("click", calculateTip);
   maxTipBtn.addEventListener("click", calculateTip);
   rateBar.addEventListener("input", rateBarHandler);
}

init();
