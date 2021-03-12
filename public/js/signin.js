const signin = () => {
  event.preventDefault();
  const username = document.getElementById("sign-in-username").value;
  const password = document.getElementById("sign-in-password").value;

  const errorMsg = document.getElementById("error-msg");
  ajaxRequest(
    "POST",
    "/signin",
    { username: username, password: password },
    (status, res) => {
      if (status !== 200) {
        errorMsg.innerHTML =
          "Could not sign current user in. Please try again.";
      } else {
        window.location.href = "/home";
      }
    }
  );
};

const signInForm = document.getElementById("sign-in-form");
signInForm.addEventListener("submit", signin);
