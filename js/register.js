const form = document.getElementById('registerForm');


const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

//////////////////////////////////////////////////////////////////////////
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const SECRET_KEY = "9f0a1c2d7b3e5a12f0fdd65c0b1ac9129f7e013f23a97c56b87c3fce56d2eabe";

form.addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();

    let isValid = true;


    firstNameInput.classList.remove('is-invalid');
    lastNameInput.classList.remove('is-invalid');
    usernameInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
    confirmPasswordInput.classList.remove('is-invalid');
/////////////////////////////////////////////////////////
    const nameReg = /^[A-Za-z]{3,}$/;  
    const usernameReg = /^[A-Za-z0-9_]{3,}$/;  
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    const passwordReg = /^.{6,}$/;  

    /////////////////////////////////////////////////////////
    if (firstNameInput.value.trim() === '') {
        firstNameError.textContent = 'First name is required.';
        firstNameInput.classList.add('is-invalid');
        isValid = false;
    } else if (!nameReg.test(firstNameInput.value.trim())) {
        firstNameError.textContent = 'First name must be at least 3 characters long and contain only letters.';
        firstNameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        firstNameError.textContent = '';
        firstNameInput.classList.remove('is-invalid');
    }

    /////////////////////////////////////////////////////////
    if (lastNameInput.value.trim() === '') {
        lastNameError.textContent = 'Last name is required.';
        lastNameInput.classList.add('is-invalid');
        isValid = false;
    } else if (!nameReg.test(lastNameInput.value.trim())) {
        lastNameError.textContent = 'Last name must be at least 3 characters long and contain only letters.';
        lastNameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        lastNameError.textContent = '';
        lastNameInput.classList.remove('is-invalid');
    }

 /////////////////////////////////////////////////////////
    if (usernameInput.value.trim() === '') {
        usernameError.textContent = 'Username is required.';
        usernameInput.classList.add('is-invalid');
        isValid = false;
    } else if (!usernameReg.test(usernameInput.value.trim())) {
        usernameError.textContent = 'Username must be at least 3 characters long and contain only letters, numbers, and underscores.';
        usernameInput.classList.add('is-invalid');
        isValid = false;
    } else {
        usernameError.textContent = '';
        usernameInput.classList.remove('is-invalid');
    }

  /////////////////////////////////////////////////////////
    if (emailInput.value.trim() === '') {
        emailError.textContent = 'Email is required.';
        emailInput.classList.add('is-invalid');
        isValid = false;
    } else if (!emailReg.test(emailInput.value.trim())) {
        emailError.textContent = 'Invalid email format.';
        emailInput.classList.add('is-invalid');
        isValid = false;
    } else {
        emailError.textContent = '';
        emailInput.classList.remove('is-invalid');
    }


    if (passwordInput.value.trim() === '') {
        passwordError.textContent = 'Password is required.';
        passwordInput.classList.add('is-invalid');
        isValid = false;
    } else if (!passwordReg.test(passwordInput.value.trim())) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        passwordInput.classList.add('is-invalid');
        isValid = false;
    } else {
        passwordError.textContent = '';
        passwordInput.classList.remove('is-invalid');
    }

    /////////////////////////////////////////////////////////
    if (confirmPasswordInput.value.trim() === '') {
        confirmPasswordError.textContent = 'Confirm your password.';
        confirmPasswordInput.classList.add('is-invalid');
        isValid = false;
    } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordInput.classList.add('is-invalid');
        isValid = false;
    } else {
        confirmPasswordError.textContent = '';
        confirmPasswordInput.classList.remove('is-invalid');
    }

/////////////////////////////////////////////////////////
if (isValid) {
    const encryptedPassword = CryptoJS.AES.encrypt(passwordInput.value.trim(), SECRET_KEY).toString();

    const userData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      password: encryptedPassword,
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    form.reset();
    window.location.replace("../examWebsite/exam/html1/login.html");
  }
   
});
