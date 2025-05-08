const form = document.querySelector('form');
const emailInput = document.getElementById('exampleInputEmail1');
const passwordInput = document.getElementById('exampleInputPassword1');
const SECRET_KEY = "9f0a1c2d7b3e5a12f0fdd65c0b1ac9129f7e013f23a97c56b87c3fce56d2eabe";



form.addEventListener('submit', function(event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  emailInput.classList.remove('is-invalid');
  passwordInput.classList.remove('is-invalid');

  let valid = true;


  

  if (email === '' || !validateEmail(email)) {
    emailInput.classList.add('is-invalid');
    valid = false;
  }

  if (password === '' || password.length < 6) {
    passwordInput.classList.add('is-invalid');
    valid = false;
  }

  if (!valid)
  {
  return;
  }
    

  const storedUser = JSON.parse(localStorage.getItem('userData'));

  if (!storedUser) {
    alert('No registered user found. Please register first.');
    return;
  }

  if (storedUser.email !== email) {
    emailInput.classList.add('is-invalid');
    return;
  }

  const bytes = CryptoJS.AES.decrypt(storedUser.password, SECRET_KEY);
  const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

  if (decryptedPassword !== password) {
    passwordInput.classList.add('is-invalid');
    return;
  }

  window.location.replace("examPage.html");
  form.reset();

  
 
});

function validateEmail(email) {

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

