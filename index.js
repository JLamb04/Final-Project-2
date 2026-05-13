const submitBtn = document.getElementById("submit");

submitBtn.addEventListener("click", function () {
  submitBtn.classList.add("loading");

  setTimeout(() => {
    submitBtn.classList.remove("loading");
  }, 2000);
});

// Get the container element where posts will be displayed
const postsContainer = document.getElementById('posts');

// Use the Fetch API to get data from the JSONPlaceholder API
fetch('https://www.omdbapi.com/')
  .then(response => response.json()) // Convert the response to JSON format
  .then(posts => {
    // Loop through each post and display it on the page
    posts.forEach(post => {
      // Create a new div element for each post
      const postDiv = document.createElement('div');
      postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
      `;
      // Append the new div to the container
      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => console.error('Error fetching posts:', error));

