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
   let tip = (sales * rateBar.value) / 100;
   let total = (Number(sales) + Number(tip)).toFixed(2);

   if (percentTipBtn.checked === true) {
      rateBar.disabled = false;
      inputNum[1].value = tip;
      inputNum[2].value = total;
   } else if (noTipBtn.checked === true) {
      inputNum[1].value = 0;
      inputNum[2].value = sales;
      rateText.innerText = `Rate: 0%`;
      rateBar.value = 0;
      rateBar.disabled = true;
   } else if (randTipBtn.checked === true) {
      let randNum = Math.floor(Math.random() * 31);
      rateBar.disabled = false;
      rateBar.value = randNum;
      rateText.innerText = `Rate: ${rateBar.value}%`;
      tip = (sales * rateBar.value) / 100;
      total = Number(sales) + Number(tip);
      inputNum[1].value = tip;
      inputNum[2].value = total;
   } else {
      rateBar.value = 30;
      rateBar.disabled = true;
      rateText.innerText = `Rate: 30%`;
      tip = (sales * 30) / 100;
      total = Number(sales) + Number(tip);
      inputNum[1].value = tip;
      inputNum[2].value = total;
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
   noTipBtn.addEventListener("input", calculateTip);
   randTipBtn.addEventListener("click", calculateTip);
   percentTipBtn.addEventListener("input", calculateTip);
   maxTipBtn.addEventListener("input", calculateTip);
   rateBar.addEventListener("input", rateBarHandler);
}

init();
