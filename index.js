const submitBtn = document.getElementById("submit");
const searchInput = document.getElementById("search-input");
const postsContainer = document.getElementById("posts-container");

submitBtn.addEventListener("click", function () {
  const searchTerm = searchInput.value;
  // IMPORTANT: You need to get your own API key from https://www.omdbapi.com/apikey.aspx
  const apiKey = "ad431eff"; 

  if (!searchTerm) {
    postsContainer.innerHTML = "<p>Please enter a movie title to search.</p>";
    return;
  }

  submitBtn.classList.add("loading");
  postsContainer.innerHTML = ""; // Clear previous results

  fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True" && data.Search) {
        data.Search.forEach(movie => {
          const postDiv = document.createElement("div");
          postDiv.classList.add("movie"); // Add a class for styling

          const title = `<h2>${movie.Title}</h2>`;
          const year = `<p>Year: ${movie.Year}</p>`;
          const poster = movie.Poster !== "N/A" ? `<img src="${movie.Poster}" alt="${movie.Title} Poster">` : "<p>No poster available</p>";

          postDiv.innerHTML = `
            <div class="movie-poster">${poster}</div>
            <div class="movie-info">
              ${title}
              ${year}
            </div>
          `;
          postsContainer.appendChild(postDiv);
        });
      } else {
        postsContainer.innerHTML = `<p>${data.Error || "No movies found."}</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching posts:", error);
      postsContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    })
    .finally(() => {
      submitBtn.classList.remove("loading");
    });
});