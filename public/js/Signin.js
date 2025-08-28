document.addEventListener("DOMContentLoaded", () => {
    const email=document.getElementById("email");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm-password");
    const errorMessage = document.querySelector('.errorMessage');
    const button = document.getElementById("button");
    const ValidationError = require("/ValidationError");
    const emailInput = email.value;
    const passwordInput = password.value;
    const confirmInput = confirm.value;

    function confirmPassword() {
        const emailErr = ValidationError.getEmailError(emailInput.value);
        const passwordErr = ValidationError.getPasswordError(passwordInput.value);

        if (emailErr) {
            errorMessage.innerHTML = emailErr.value;
            errorMessage.classList.remove("hidden");
        } else if(passwordErr) {
            errorMessage.innerHTML = passwordErr.value;
            errorMessage.classList.remove("hidden");
        }
    };

    button.addEventListener("click", confirmPassword);

    console.log(ValidationError.getEmailError());
});

