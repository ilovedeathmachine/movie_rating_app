$(document).ready(function() {
    
    const movies = [];
  
    function displayMovies() {
      const movieList = $("#movieList");
      movieList.empty();
      for (const movie of movies) {
        const listItem = $("<li></li>");
        const removeButton = $("<button>Remove</button>");

        removeButton.addClass("btn");
  
        removeButton.click(function() {
          const index = movies.indexOf(movie);
          if (index !== -1) {
            movies.splice(index, 1);
            displayMovies();
          }
        });
  
        listItem.text(`${movie.title} (Rating: ${movie.rating})`);
        listItem.append(removeButton);
        movieList.append(listItem);
      }
    }
  
    function addMovie(title, rating) {
      movies.push({ title, rating });
      saveToLocalStorage();
      displayMovies();
    }

    function saveToLocalStorage() {
        localStorage.setItem('movies', JSON.stringify(movies));
    }

    function loadFromLocalStorage() {
        const storedMovie = localStorage.getItem('movies');
        if (storedMovie) {
            movies.push(...JSON.parse(storedMovie));
            displayMovies();
        }
    }
  
    $("#movieForm").submit(function(event) {
      event.preventDefault();
      const titleInput = $("#movieTitle");
      const ratingInput = $("#movieRating");
      const title = titleInput.val().trim();
      const rating = parseInt(ratingInput.val().trim());
  
      if (title.length >= 2 && !isNaN(rating) && rating >= 0 && rating <= 10) {
        addMovie(title, rating);
  
        titleInput.val("");
        ratingInput.val("");
      } else {
        alert("Invalid entry. Title must have at least 2 characters, and rating must be between 0 and 10.");
      }
    });
  
    $("#sortTitleAsc").click(function() {
      movies.sort((a, b) => a.title.localeCompare(b.title));
      displayMovies();
    });
  
    $("#sortTitleDesc").click(function() {
      movies.sort((a, b) => b.title.localeCompare(a.title));
      displayMovies();
    });
  
    $("#sortRatingAsc").click(function() {
      movies.sort((a, b) => a.rating - b.rating);
      displayMovies();
    });
  
    $("#sortRatingDesc").click(function() {
      movies.sort((a, b) => b.rating - a.rating);
      displayMovies();
    });

    loadFromLocalStorage();

  });
  
