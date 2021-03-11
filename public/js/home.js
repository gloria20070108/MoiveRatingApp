document.onreadystatechange = function () {
  if (document.readyState == "complete") {
    ajaxRequest("GET", "/user", null, (status, responds) => {
      console.log(status, responds);
      if (status === 200) {
        const greetingMsg = document.getElementById("greeting-msg");
        greetingMsg.innerHTML = "Hi " + JSON.parse(responds).username + "!";
      }
    });
  }
};
