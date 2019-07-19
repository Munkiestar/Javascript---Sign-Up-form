// input fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const email = document.getElementById("email");

// Form
const form = document.getElementById("myForm");

// validation colors
const green = "#4caf50";
const red = "#f44336";

// Handle Form for successful validation
form.addEventListener("submit", e => {
  // prevent default behaviour
  e.preventDefault();

  if (
    validateFirstName() &&
    validateLastName() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateEmail()
  ) {
    // user login
    const name = firstName.value;
    const container = document.querySelector("div.container");
    const loader = document.createElement("div");
    loader.className = "progress"; // from Materialize
    const loadingBar = document.createElement("div");
    loadingBar.className = "indeterminate"; // from Materialize
    loader.appendChild(loadingBar);
    container.appendChild(loader);

    // mimics Async Code
    setTimeout(() => {
      const loaderDiv = document.querySelector("div.progress");
      const panel = document.createElement("div");
      panel.className = "card-panel green";
      const text = document.createElement("span");
      text.className = "white-text";
      text.appendChild(
        document.createTextNode(
          `Sign up successful, welcome to Monkey Casino ${name}`
        )
      );
      panel.appendChild(text);
      container.replaceChild(panel, loaderDiv);
    }, 1000);
  }
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// validation functions
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function validateFirstName() {
  // check if empty
  if (checkIfEmpty(firstName)) {
    return true;
  }
  // check if has only letter
  if (!checkIfOnlyLetters(firstName)) {
    return false;
  } else {
    return true;
  }
}

function validateLastName() {
  // check if empty
  if (checkIfEmpty(lastName)) {
    return;
  }
  // check if has only letter
  if (!checkIfOnlyLetters(lastName)) {
    return false;
  } else {
    return true;
  }
}

function validatePassword() {
  // if not empty
  if (checkIfEmpty(password)) {
    return;
  }
  // must have at least 6 characters
  if (!meetLength(password, 6, 100)) {
    return;
  }
  // check password - for a character set
  // 1) - a
  // 2) - a 1
  // 3) - A a 1
  // 4) - A a 1 @
  if (!containsCharacters(password, 1)) {
    return;
  }

  return true;
}

// password check
function validateConfirmPassword() {
  // first if password match
  if (password.className !== "valid") {
    setInvalid(confirmPassword, "Password must be valid");
    return;
  }
  // if they match
  if (password.value !== confirmPassword.value) {
    setInvalid(confirmPassword, "Passwords must match");
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}

// email check
function validateEmail() {
  // if empty
  if (checkIfEmpty(email)) {
    return;
  }
  if (!containsCharacters(email, 5)) {
    return;
  }
  return true;
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Utility functions
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// check if has white space
function checkIfEmpty(input) {
  if (isEmpty(input.value.trim())) {
    // set input invalid
    setInvalid(input, `${input.name} must not be empty`);
    return true;
  } else {
    // set input valid
    setValid(input);
    return false;
  }
}

function isEmpty(value) {
  if (value === "") {
    return true;
  } else {
    return false;
  }
}

function setInvalid(input, message) {
  input.className = "invalid"; // Materialize makes RED for us
  input.nextElementSibling.innerHTML = message;
  input.nextElementSibling.style.color = red;
}

function setValid(input) {
  input.className = "valid"; // Materialize makes GREEN for us
  input.nextElementSibling.innerHTML = "";
}

// check if name has only letters
function checkIfOnlyLetters(input) {
  if (/^[a-zA-Z ]+$/.test(input.value)) {
    setValid(input);
    return true;
  } else {
    setInvalid(input, `${input.name} must contain only letters`);
    return false;
  }
}

function meetLength(input, minLength, maxLength) {
  if (input.value.length >= minLength && input.value.length < maxLength) {
    setValid(input);
    return true;
  } else if (input.value.length < minLength) {
    setInvalid(
      input,
      `${input.name} must be at least ${minLength} characters long`
    );
    return false;
  } else {
    setInvalid(
      input,
      `${input.name} must be shorter than ${maxLength} characters`
    );
    return false;
  }
}

function containsCharacters(input, num) {
  let regEx;

  switch (num) {
    //  At least one letter (any case)
    case 1:
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, input, "Must contain at least one letter");

    // At least one letter and one number
    case 2:
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(
        regEx,
        input,
        "Must contain at least one letter and one number"
      );

    // At least one uppercase letter, one lowercase letter and one number
    case 3:
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(
        regEx,
        input,
        "Must contain at least one uppercase, one lowercase letter and one number"
      );

    // At least one uppercase letter, one lowercase letter, one number and one special character (symbol)
    case 4:
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(
        regEx,
        input,
        "Must contain at least one uppercase, one lowercase letter and one number and one special character"
      );

    // Email regular expression pattern
    case 5:
      regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return matchWithRegEx(regEx, input, "Must be a valid email address");

    default:
      return false;
  }
}

function matchWithRegEx(regEx, input, message) {
  if (input.value.match(regEx)) {
    setValid(input);
    return true;
  } else {
    setInvalid(input, message);
    return false;
  }
}
