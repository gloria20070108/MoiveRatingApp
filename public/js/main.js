function showBtn(user) {
  const signInBtn = document.getElementById("sign-in-btn");
  const signUpBtn = document.getElementById("sign-up-btn");
  const signOutBtn = document.getElementById("sign-out-btn");
  if (!user) {
    signInBtn.style.display = "inline-block";
    signUpBtn.style.display = "inline-block";
    signOutBtn.style.display = "none";
  } else {
    signInBtn.style.display = "none";
    signUpBtn.style.display = "none";
    signOutBtn.style.display = "inline-block";
  }
}

function signIn() {
  const username = document.getElementById("signInUsername").value;
  const password = document.getElementById("signInPassword").value;
  console.log(username, password);
  const errorMsgDiv = document.getElementById("sign-in-modal-error-msg");
  errorMsgDiv.innerHTML = "backend not implement yet";
}

function signOut() {
  console.log("sign out");
  const errorMsgDiv = document.getElementById("sign-out-modal-error-msg");
  errorMsgDiv.innerHTML = "backend not implement yet";
}

function signUp() {
  const username = document.getElementById("signUpUsername").value;
  const password = document.getElementById("signUpPassword").value;
  const confirmPassword = document.getElementById("signUpConfirmPassword")
    .value;
  console.log(username, password, confirmPassword);
  const errorMsgDiv = document.getElementById("sign-up-modal-error-msg");

  if (password !== confirmPassword) {
    errorMsgDiv.innerHTML = "password does not match!";
  } else {
    errorMsgDiv.innerHTML = "backend not implement yet";
  }
}

document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    console.log("ready!");

    // call backend to get the user
    showBtn(null);
  }
};
