//get movie name from url

const addcomments = async (movie_name) => {
  const comments = document.getElementById("commentsid").value;
  const rate = document.getElementById("rate-select").value;
  const res = await fetch("/addcomment/" + movie_name, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      movie_name: movie_name,
      rate: rate,
      comments: comments,
    }),
  }).then((res) => {
    location.reload();
  });
};

const fetchcomments = async (movie_name) => {
  const res = await fetch("/fetchcomment/" + movie_name);
  const data = await res.json();
  const scomments = JSON.stringify(data);
  let idx;
  const obj = JSON.parse(scomments);
  for (idx = 0; idx < obj.length; ++idx) {
    if (obj[idx].hasOwnProperty("comments")) {
      const comments = obj[idx]["comments"];
      document.getElementById("allcomment").innerHTML +=
        "<div class='comment'>" + comments + "</div>";
    }
  }
};

const changeMovieTitle = (movie_name) => {
  document.getElementById("movieTitle").innerHTML = movie_name;
};

const relationship = {
  "DARK": "../images/1.png",
  "BENNY LOVES YOU": "../images/2.png"
// future relationship
}

const changeMoviePoster = (movie_name) => {
  // use relationship dictionary to get path.
  const image = document.getElementById("movieimage");
  image.src = imgLocation;
};

const changeMovieDescriptions = async (movie_name) => {
  const res = await fetch("/fetchdescription/" + movie_name);
  const data = await res.json();
  console.log(data);
  const sdescriptions = JSON.stringify(data);
  let idx;
  const obj = JSON.parse(sdescriptions);

  const introduction = obj["introduction"] ? obj["introduction"] : "N/A";
  document.getElementById("introduction").innerHTML = introduction;
  const director = obj["director"] ? obj["director"] : "N/A";
  document.getElementById("director").innerHTML = director;
  const starring = obj["starring"] ? obj["starring"] : "N/A";
  document.getElementById("starring").innerHTML = starring;
  const year = obj["year"];
  document.getElementById("year").innerHTML = year;
  const rate = obj["rate"].toFixed(1);
  document.getElementById("rate").innerHTML = rate;
  const like = obj["like"];
  document.getElementById("clicklike").innerHTML = like;
};

const GetRequest = () => {
  let url = window.location.href;
  console.log(url);
  let vars = url.split("/");
  let name = vars.pop();
  console.log(name);
  let movie_name_s = name.split("%20");
  let movie_name_j = movie_name_s.join(" ");
  console.log(movie_name_j);
  return movie_name_j;
};

const addlike = async (movie_name) => {
  const like = document.getElementById("clicklike").innerHTML;
  const res = await fetch("/addlike/" + movie_name, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ movie_name: movie_name, like: like }),
  }).then((res) => {
    location.reload();
  });
};

const movie_name = GetRequest();

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

document.getElementById("clicklike").addEventListener("click", (e) => {
  addlike(movie_name);
  e.preventDefault();
});
