const getUser = () => {
  ajaxRequest("GET", "/user", null, (status, responds) => {
    if (status === 200) {
      const greetingMsg = document.getElementById("greeting-msg");
      greetingMsg.innerHTML = "Hi " + JSON.parse(responds).username + "!";
    }
  });
};

const getMovies = (filters, updateYearsSelect) => {
  let url = "/movies";
  if (filters) {
    url += "?" + filters;
  }

  ajaxRequest("GET", url, null, (status, responds) => {
    if (status === 200) {
      const movies = JSON.parse(responds);
      const movieContainer = document.getElementById("movie-container");
      movieContainer.innerHTML = "";
      for (let i = 0; i < movies.length; i++) {
        let id = movies[i]._id;
        let src;
        if (
          id === 1 ||
          id === 2 ||
          id === 3 ||
          id === 4 ||
          id === 5 ||
          id === 6
        ) {
          src = "../images/" + id + ".png";
        } else {
          src = "../images/default.png";
        }

        movieContainer.innerHTML +=
          '<div class="movie-item"><img src="' +
          src +
          '" class="img-fluid" alt="movie gallery" onclick="myclick(\'' +
          movies[i].movie_name +
          "')\"/><div>" +
          movies[i].movie_name +
          " - " +
          movies[i].rate.toFixed(1) +
          "</div></div>";
      }

      if (updateYearsSelect) {
        // also update years options when needed
        const yearSelect = document.getElementById("year-select");
        yearSelect.innerHTML =
          '<option selected="selected" value="all">All years</option>';
        const allYears = [];
        for (let i = 0; i < movies.length; i++) {
          if (!allYears.includes(movies[i].year)) {
            allYears.push(movies[i].year);
          }
        }
<<<<<<< HEAD

=======
>>>>>>> 6f7e2b7... add create backend
        allYears.sort();
        for (let i = 0; i < allYears.length; i++) {
          yearSelect.innerHTML +=
            '<option value="' + allYears[i] + '">' + allYears[i] + "</option>";
        }
      }
    }
  });
};

const doFilters = (updateYearsSelect) => {
  const name = document.getElementById("name-filter").value;
  const year = document.getElementById("year-select").value;

  let filters = "name=" + name + "";
  if (year !== "all") {
    filters += "&year=" + year + "";
  }
  getMovies(filters, updateYearsSelect);
};

const createMovie = () => {
  event.preventDefault();
  const name = document.getElementById("create-movie-name").value;
  const year = document.getElementById("create-movie-year").value;
  ajaxRequest(
    "POST",
    "/movies",
    { name: name, year: year },
    (status, responds) => {
      if (status === 200) {
        doFilters(true); // refresh the movies with filters
        document.getElementById("create-movie-name").value = "";
        document.getElementById("create-movie-year").value = "";
        document.getElementById("create-movie-modal-close-btn").click();
      } else {
        const errorMsg = document.getElementById("create-movie-error-msg");
        errorMsg.innerHTML =
          "Could not create the movie. Please try again later.";
      }
    }
  );
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    getUser();
    getMovies(null, true); // get all the movies without a filter.
  }
};

const createMovieForm = document.getElementById("create-movie-form");
createMovieForm.addEventListener("submit", createMovie);
