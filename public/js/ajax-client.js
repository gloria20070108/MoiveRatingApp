const ajaxRequest = (action, url, body, cb) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4) {
      if (cb) {
        cb(xhttp.status, xhttp.response);
      }
    }
  };

  if (action === "GET") {
    xhttp.open("GET", url, true);
    xhttp.send();
  } else if (action === "POST") {
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(body));
  } else {
    throw Error("unknown action: " + action);
  }
};
