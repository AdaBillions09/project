const continueBtn = document.querySelector(".continue-btn");
// const formSection = document.querySelector(".form-section");
const completeState = document.querySelector(".complete-state");

continueBtn.addEventListener("click", function () {

    // Hide thank you state
    completeState.classList.add("hidden");

    // Show the form again
    cardForm.classList.remove("hidden");

    // Reset form fields
    cardForm.reset();

    // Reset card preview
    cardNumberDisplay.textContent = "0000 0000 0000 0000";
    cardHolderDisplay.textContent = "JANE APPLESEED";
    cardExpiryDisplay.textContent = "00/00";
    cardCvcDisplay.textContent = "000";

    // Clear error messages
    document.querySelectorAll(".error-msg").forEach(msg => msg.textContent = "");

    // Remove red borders
    document.querySelectorAll("input").forEach(input => input.classList.remove("error"));

});

// Select inputs
const cardHolderInput = document.getElementById('card-holder');
const cardNumberInput = document.getElementById('card-number');
const expMonthInput = document.getElementById('exp-month');
const expYearInput = document.getElementById('exp-year');
const cvcInput = document.getElementById('cvc');

// Card display spans
const cardNumberDisplay = document.querySelector('.card-number');
const cardHolderDisplay = document.querySelector('.card-holder');
const cardExpiryDisplay = document.querySelector('.card-expiry');
const cardCvcDisplay = document.querySelector('.card-cvc');

// Error spans
const errorCardHolder = document.getElementById('error-card-holder');
const errorCardNumber = document.getElementById('error-card-number');
const errorExpMonth = document.getElementById('error-exp-month');
const errorExpYear = document.getElementById('error-exp-year');
const errorCvc = document.getElementById('error-cvc');

// Form
const cardForm = document.getElementById('card-form');

// ----- Real-time updates -----
cardHolderInput.addEventListener('input', () => {
    cardHolderDisplay.textContent = cardHolderInput.value || 'JANE APPLESEED';
});

cardNumberInput.addEventListener('input', () => {
    let value = cardNumberInput.value.replace(/\s/g, ''); // remove non-digits

    // limit to 16 digits
    value = value.substring(0, 16);
    // add space every 4 digits
    value = value.replace(/(.{4})/g, '$1 ').trim();

    cardNumberInput.value = value;

    cardNumberDisplay.textContent = value || '0000 0000 0000 0000';
});

expMonthInput.addEventListener('input', () => {
    let value = expMonthInput.value.replace(/\D/g, '');
    value = value.substring(0, 2);
    expMonthInput.value = value;
    updateExpiry();
});

expYearInput.addEventListener('input', () => {
    let value = expYearInput.value.replace(/\D/g, '');
    value = value.substring(0, 2);
    expYearInput.value = value;
    updateExpiry();
});

function updateExpiry() {
    const month = expMonthInput.value || '00';
    const year = expYearInput.value || '00';
    cardExpiryDisplay.textContent = `${month}/${year}`;
}

cvcInput.addEventListener('input', () => {
    const value = cvcInput.value.replace(/\D/g, '');
    cvcInput.value = value;
    cardCvcDisplay.textContent = value || '000';
});

// ----- Validation on submit -----
cardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors
    [errorCardHolder, errorCardNumber, errorExpMonth, errorExpYear, errorCvc].forEach(el => el.textContent = '');
    [cardHolderInput, cardNumberInput, expMonthInput, expYearInput, cvcInput].forEach(input => input.classList.remove('error'));

    // Cardholder name required
    if (!cardHolderInput.value.trim()) {
        errorCardHolder.textContent = "Can't be blank";
        cardHolderInput.classList.add('error');
        isValid = false;
    }

    // Card number: 16 digits
    const rawCardNumber = cardNumberInput.value;
const cardNumDigits = rawCardNumber.replace(/\s/g, '');

if (!rawCardNumber.trim()) {
    errorCardNumber.textContent = "Can't be blank";
    cardNumberInput.classList.add('error');
    isValid = false;

} else if (/[^0-9\s]/.test(rawCardNumber)) {
    errorCardNumber.textContent = "Wrong format, numbers only";
    cardNumberInput.classList.add('error');
    isValid = false;

} else if (!/^\d{16}$/.test(cardNumDigits)) {
    errorCardNumber.textContent = "Card number must be 16 digits";
    cardNumberInput.classList.add('error');
    isValid = false;
}

const month = expMonthInput.value.trim();
const year = expYearInput.value.trim();

errorExpMonth.textContent = "";
errorExpYear.textContent = "";

let expiryValid = true;

if (!month) {
    errorExpMonth.textContent = "Can't be blank";
    expMonthInput.classList.add("error");
    expiryValid = false;
} else if (!/^(0[1-9]|1[0-2])$/.test(month)) {
    errorExpMonth.textContent = "Invalid month";
    expMonthInput.classList.add("error");
    expiryValid = false;
}

if (!year) {
    errorExpYear.textContent = "Can't be blank";
    expYearInput.classList.add("error");
    expiryValid = false;
} else if (!/^\d{2}$/.test(year)) {
    errorExpYear.textContent = "Invalid year";
    expYearInput.classList.add("error");
    expiryValid = false;
}

if (!expiryValid) {
    isValid = false;
}
    
    // CVC: 3 digits
    if (!cvcInput.value) {
        errorCvc.textContent = "Can't be blank";
        cvcInput.classList.add('error');
        isValid = false;
    } else if (!/^\d{3}$/.test(cvcInput.value)) {
        errorCvc.textContent = "Invalid CVC";
        cvcInput.classList.add('error');
        isValid = false;
    }

    // If all valid, show success state
    if (isValid) {
        cardForm.classList.add('hidden');
        document.querySelector('.complete-state').classList.remove('hidden');
    }
});

