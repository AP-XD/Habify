const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

const togglePassword = document.querySelector("#togglePassword");
const password1 = document.querySelector("#password");

togglePassword.addEventListener("click", function () {

  const type =
    password1.getAttribute("type") === "password" ? "text" : "password";
  password1.setAttribute("type", type);

  this.classList.toggle("bi-eye");
});

const togglePassword2 = document.querySelector("#togglePassword2");
const password2 = document.querySelector("#password2");

togglePassword2.addEventListener("click", function () {
  const type =
    password2.getAttribute("type") === "password" ? "text" : "password";
  password2.setAttribute("type", type);

  this.classList.toggle("bi-eye");
});

const togglePassword3 = document.querySelector("#togglePassword3");
const password3 = document.querySelector("#password3");

togglePassword3.addEventListener("click", function () {
  const type =
    password3.getAttribute("type") === "password" ? "text" : "password";
  password3.setAttribute("type", type);

  this.classList.toggle("bi-eye");
});

//Password Strength
let password = document.getElementById("password");
let passwordStrength = document.getElementById("password-strength");
let UpperCase = document.querySelector(".upper-case i");
let lowerCase = document.querySelector(".lower-case i");
let number = document.querySelector(".one-number i");
let SpecialChar = document.querySelector(".one-special-char i");
let eightChar = document.querySelector(".eight-character i");

let x = document.getElementById("stat");

password.addEventListener("keyup", function () {
  let pass = password.value;
  checkStrength(pass);
});

function checkStrength(password) {
  let strength = 0;

  if (password.match(/([A-Z])/)) {
    strength += 1;
  }

  if (password.match(/([a-z])/)) {
    strength += 1;
  } 

  if (password.match(/([0-9])/)) {
    strength += 1;
  } 

  if (password.match(/([!,%,&,@,#,$,^^*,?,_,|,'])/)) {
    strength += 1;
  }

  const box = document.getElementsByClassName("box");

  if (password.length < 7) {
    x.innerHTML = "Password Strength: WEAK";
    x.style.color = "#f00";
    x.style.fontSize = "1.5rem";
  }

  if (password.length < 10 && password.length >= 7) {
    x.innerHTML = "Password Strength: DECENT";
    x.style.color = "ffad00";
    x.style.fontSize = "1.5rem";
  }

  if (password.length >= 10 && password.length < 16 && strength==4) {
    x.innerHTML = "Password Strength: GOOD";
    x.style.color = "blue";
    x.style.fontSize = "1.5rem";
  }

  if (password.length >= 16 && strength == 4) {
    x.innerHTML = "Password Strength: BEST";
    x.style.color = "#0F0";
    x.style.fontSize = "1.5rem";
  }
}