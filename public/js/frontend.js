//get movie name from url

async function addcomments(movie_name) {
  const comments = document.getElementById("commentsid").value;
  console.log("comments in froneend :" + comments);
  const res = await fetch("http://localhost:3000/addcomment/" + movie_name, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie_name: movie_name, comments: comments }),
  }).then((res) => {
    location.reload();
  });
}

async function fetchcomments(movie_name) {
  const res = await fetch("http://localhost:3000/fetchcomment/" + movie_name);
  const data = await res.json();
  console.log(data);
  var scomments = JSON.stringify(data);
  var idx;
  var obj = JSON.parse(scomments);
  for (idx = 0; idx < obj.length; ++idx) {
    if (obj[idx].hasOwnProperty("comments")) {
      var comments = obj[idx]["comments"];
    }
    document.getElementById("allcomment").innerHTML += "<br>" + comments;
  }
}

function changeMovieTitle(movie_name) {
  document.getElementById("movieTitle").innerHTML = movie_name;
}

function changeMoviePoster(movie_name) {
  if (movie_name == "DARK") {
    imgLocation = "../images/1.png";
  } else if (movie_name == "BENNY LOVES YOU") {
    imgLocation = "../images/2.png";
  } else if (movie_name == "BREAKING BAD") {
    imgLocation = "../images/3.png";
  } else if (movie_name == "WESTWORLD") {
    imgLocation = "../images/4.png";
  } else if (movie_name == "NOMADLAND") {
    imgLocation = "../images/5.png";
  } else if (movie_name == "SOUL") {
    imgLocation = "../images/6.png";
  }
  var image = document.getElementById("movieimage");
  image.src = imgLocation;
}

async function changeMovieDescriptions(movie_name) {
  const res = await fetch(
    "http://localhost:3000/fetchdescription/" + movie_name
  );
  const data = await res.json();
  console.log(data);
  var sdescriptions = JSON.stringify(data);
  var idx;
  var obj = JSON.parse(sdescriptions);
  console.log(obj);

  var introduction = obj["introduction"];
  document.getElementById("introduction").innerHTML = introduction;
  var introduction = obj["director"];
  document.getElementById("director").innerHTML = introduction;
  var introduction = obj["starring"];
  document.getElementById("starring").innerHTML = introduction;
  var introduction = obj["year"];
  document.getElementById("year").innerHTML = introduction;
  var introduction = obj["rate"];
  document.getElementById("rate").innerHTML = introduction;
}

function GetRequest() {
  let url = window.location.href;
  console.log(url);
  let vars = url.split("/");
  let name = vars.pop();
  console.log(name);
  let movie_name_s = name.split("%20");
  let movie_name_j = movie_name_s.join(" ");
  console.log(movie_name_j);
  return movie_name_j;
}

var movie_name = GetRequest();

console.log(movie_name);

fetchcomments(movie_name);
changeMovieTitle(movie_name);
changeMoviePoster(movie_name);
changeMovieDescriptions(movie_name);

const thisForm = document.getElementById("myForm");
console.log(thisForm);
thisForm.addEventListener("submit", (e) => {
  addcomments(movie_name);
  e.preventDefault();
});
