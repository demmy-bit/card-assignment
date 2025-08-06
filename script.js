// JavaScript for form functionality using your class names and structure

const cardName = document.getElementById("card-name");
const cardNumber = document.getElementById("card-number");
const cardExp = document.getElementById("card-exp");
const cardCvc = document.getElementById("card-cvc");

const inputName = document.getElementById("input-name");
const inputNumber = document.getElementById("input-number");
const inputMM = document.getElementById("input-mm");
const inputYY = document.getElementById("input-yy");
const inputCvc = document.getElementById("input-cvc");

const confirmBtn = document.getElementById("confirm-btn");
const continueBtn = document.getElementById("continue-btn");

const formSection = document.getElementById("form-section");
const successScreen = document.getElementById("success-screen");

// Error elements
const errorName = document.getElementById("error-name");
const errorNumber = document.getElementById("error-number");
const errorMM = document.getElementById("error-mm");
const errorYY = document.getElementById("error-yy");
const errorCvc = document.getElementById("error-cvc");

inputNumber.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").substring(0, 16);
  value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  inputNumber.value = value;
  cardNumber.textContent = value || "0000 0000 0000 0000";
});

inputName.addEventListener("input", () => {
  cardName.textContent = inputName.value || "Jane Appleseed";
});

inputMM.addEventListener("input", updateExpiry);
inputYY.addEventListener("input", updateExpiry);

function updateExpiry() {
  const mm = inputMM.value.padStart(2, "0");
  const yy = inputYY.value.padStart(2, "0");
  cardExp.textContent = `${mm}/${yy}`;
}

inputCvc.addEventListener("input", () => {
  cardCvc.textContent = inputCvc.value || "000";
});

confirmBtn.addEventListener("click", () => {
  let hasError = false;

  // Reset error messages and borders
  document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  document.querySelectorAll("input").forEach(input => input.classList.remove("input-error"));

  // Validate Name
  if (inputName.value.trim() === "") {
    errorName.textContent = "Can't be blank";
    inputName.classList.add("input-error");
    hasError = true;
  }

  // Validate Card Number
  const cardNum = inputNumber.value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(cardNum)) {
    errorNumber.textContent = cardNum === "" ? "Can't be blank" : "Wrong format, numbers only";
    inputNumber.classList.add("input-error");
    hasError = true;
  }

  // Validate Expiry MM
  if (!/^\d{2}$/.test(inputMM.value)) {
    errorMM.textContent = "Can't be blank";
    inputMM.classList.add("input-error");
    hasError = true;
  }

  // Validate Expiry YY
  if (!/^\d{2}$/.test(inputYY.value)) {
    errorYY.textContent = "Can't be blank";
    inputYY.classList.add("input-error");
    hasError = true;
  }

  // Validate CVC
  if (!/^\d{3}$/.test(inputCvc.value)) {
    errorCvc.textContent = "Can't be blank";
    inputCvc.classList.add("input-error");
    hasError = true;
  }

  if (hasError) return;

  formSection.classList.add("hidden");
  successScreen.classList.remove("hidden");
});

continueBtn.addEventListener("click", () => {
  inputName.value = "";
  inputNumber.value = "";
  inputMM.value = "";
  inputYY.value = "";
  inputCvc.value = "";

  cardName.textContent = "Jane Appleseed";
  cardNumber.textContent = "0000 0000 0000 0000";
  cardExp.textContent = "00/00";
  cardCvc.textContent = "000";

  document.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  document.querySelectorAll("input").forEach(input => input.classList.remove("input-error"));

  successScreen.classList.add("hidden");
  formSection.classList.remove("hidden");
});
