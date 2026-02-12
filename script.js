/*Login view*/

const loginView = document.getElementById("loginView");
const formContainer = document.querySelector(".form-container");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginButton = document.querySelector(".btn-login");
const registerButton = document.querySelector(".btn-register");

/*Welcome view*/

const welcomeView = document.getElementById("welcomeView");
const welcomeTitle = document.getElementById("welcomeTitle");
const loggedInName = document.getElementById("loggedInName");
const logoutButton = document.querySelector(".btn-logout");

/*Register view*/

const registerView = document.getElementById("registerView");
const registerContainer = document.querySelector(".register-container");
const regUsername = document.getElementById("regUsername");
const regPassword = document.getElementById("regPassword");
const registerSubmitButton = document.querySelector(".btn-register-submit");
const backButton = document.querySelector(".btn-back");

/*Storage keys*/

const USERS_KEY = "users";
const LOGGED_IN_KEY = "loggedInUser";

/*Local storage, session storage*/

/*Hämtar users från sessionStorage*/
function getUsers() {
  return JSON.parse(sessionStorage.getItem(USERS_KEY)) || [];
}
/*Sparar users i sessionStorage*/
function saveUsers(users) {
  sessionStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/*Error messages*/

const loginErrorMsg = document.createElement("p");
loginErrorMsg.classList.add("error", "hidden");
formContainer.appendChild(loginErrorMsg);

const registerErrorMsg = document.createElement("p");
registerErrorMsg.classList.add("error", "hidden");
registerContainer.appendChild(registerErrorMsg);

function showError(text) {
  const registerIsVisible = !registerView.classList.contains("hidden");

  if (registerIsVisible) {
    registerErrorMsg.textContent = text;
    registerErrorMsg.classList.remove("hidden");
  } else {
    loginErrorMsg.textContent = text;
    loginErrorMsg.classList.remove("hidden");
  }
}

function hideError() {
  loginErrorMsg.textContent = "";
  loginErrorMsg.classList.add("hidden");

  registerErrorMsg.textContent = "";
  registerErrorMsg.classList.add("hidden");
}

/* Change view funktioner*/

function showRegister() {
  hideError();
  loginView.classList.add("hidden");
  welcomeView.classList.add("hidden");
  registerView.classList.remove("hidden");
  regUsername.focus();
}

function showLogin() {
  hideError();
  registerView.classList.add("hidden");
  welcomeView.classList.add("hidden");
  loginView.classList.remove("hidden");
  username.focus();
}

function showWelcome(name) {
  hideError();

  loginView.classList.add("hidden");
  registerView.classList.add("hidden");
  welcomeView.classList.remove("hidden");

  document.body.classList.add("logged-in");

  loggedInName.textContent = name;
  welcomeTitle.textContent = `Trevligt att se dig, ${name}!`;
}

/*LOGIN*/

function tryLogin() {
  const enteredUsername = username.value.trim();
  const enteredPassword = password.value;

/*Tomma fält*/
  if (!enteredUsername || !enteredPassword) {
    showError("Fyll i användarnamn och lösenord.");
    return;
  }

  const users = getUsers();

/*Inga användare*/
  if (users.length === 0) {
    showError("Det finns inga användare ännu. Börja med att skapa ett konto.");
    return;
  }

  /*Letar efter en matchning*/
  const userByUsername = users.find(u => u.username === enteredUsername);
  const userByPassword = users.find(u => u.password === enteredPassword);

/*Fel användarnamn och lösenord*/
  if (!userByUsername && !userByPassword) {
    showError("Användarnamn och lösenord stämmer inte. Försök igen eller skapa en ny användare.");
    return;
  }

  /*Fel användarnamn men lösenordet finns*/
  if (!userByUsername && userByPassword) {
    showError("Användarnamnet stämmer inte.");
    return;
  }

/*Fel lösenord men användarnamnet finns*/
  if (userByUsername && userByUsername.password !== enteredPassword) {
    showError("Lösenordet stämmer inte.");
    return;
  }

/*Matchning, loggar in*/
  password.value = ""; /*Rensa lösenordsfältet*/
  localStorage.setItem(LOGGED_IN_KEY, userByUsername.username); /*sparar inloggning*/
  showWelcome(userByUsername.username);
}

/*REGISTER*/
function registerUser() {
  const newUsername = regUsername.value.trim();
  const newPassword = regPassword.value;

  if (!newUsername || !newPassword) {
    showError("Fyll i både användarnamn och lösenord för att skapa ett konto.");
    return;
  }

  const users = getUsers();

  /*förhindra dubbletter*/
  const alreadyExists = users.some(u => u.username === newUsername);
  if (alreadyExists) {
    showError("Användarnamnet är redan taget. Välj ett annat.");
    return;
  }

  /*spara i sessionStorage*/
  users.push({ username: newUsername, password: newPassword });
  saveUsers(users);

  /*logga in direkt*/
  localStorage.setItem(LOGGED_IN_KEY, newUsername);

  /*Rensa registerfält*/
  regUsername.value = "";
  regPassword.value = "";

  showWelcome(newUsername);
}

/*LOGOUT*/

function logout() {
  localStorage.removeItem(LOGGED_IN_KEY);

  welcomeView.classList.add("hidden");
  registerView.classList.add("hidden");
  loginView.classList.remove("hidden");

  document.body.classList.remove("logged-in");

    /*Rensa loginfälten*/
  username.value = "";
  password.value = "";

  hideError();
  username.focus();
}

/*AUTO-LOGIN*/
/*Om det finns en inloggad användare sparad, hoppa direkt till welcome. */

function autoLogin() {
  const savedUser = localStorage.getItem(LOGGED_IN_KEY);
  if (savedUser) {
    showWelcome(savedUser);
  }
}

/*EVENTS*/

autoLogin();

/*Enter i lösenordsfältet på login*/
password.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    tryLogin();
  }
});

/*Klick: login / visa register / logout*/
loginButton.addEventListener("click", tryLogin);
registerButton.addEventListener("click", showRegister);
logoutButton.addEventListener("click", logout);

/*Klick: skapa konto / tillbaka*/
registerSubmitButton.addEventListener("click", registerUser);
backButton.addEventListener("click", showLogin);

/*När man skriver i fälten: göm fel*/
username.addEventListener("input", hideError);
password.addEventListener("input", hideError);
regUsername.addEventListener("input", hideError);
regPassword.addEventListener("input", hideError);

