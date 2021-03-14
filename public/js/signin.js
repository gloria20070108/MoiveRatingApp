const signin = async () => {
  event.preventDefault();
  const username = document.getElementById("sign-in-username").value;
  const password = document.getElementById("sign-in-password").value;

  const errorMsg = document.getElementById("error-msg");
  const responds = await fetch("/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  console.log(responds);
  if (responds.status !== 200) {
    errorMsg.innerHTML = "Could not sign current user in. Please try again.";
  } else {
    window.location.href = "/home";
  }
};

const signInForm = document.getElementById("sign-in-form");
signInForm.addEventListener("submit", signin);
