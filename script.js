// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.
/*
import { getUserIds } from "./storage.js";

window.onload = function () {
  const users = getUserIds();
  document.querySelector("body").innerText = `There are ${users.length} users`;
};
*/

import { getUserIds, getData } from "./storage.js";

const userSelect = document.getElementById("user-select");
const bookmarkContainer = document.getElementById("bookmark-container");


function populateUserDropdown() {
  // Get all user IDs from storage
  const userIds = getUserIds();

  // Add each user as an option in the dropdown
  userIds.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

// Render bookmarks in reverse order
function renderBookmarks(bookmarks) {
  // Clear old content
  bookmarkContainer.innerHTML = "";

  if (!bookmarks || bookmarks.length === 0) {
    bookmarkContainer.textContent = "No bookmarks found for this user.";
    return;
  }

  // Sort bookmarks by timestamp from newest to oldest
  const sorted = [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);

  // Create a list (ul) element
  const list = document.createElement("ul");

  // Loop through sorted bookmarks and build the list
  sorted.forEach((bookmark) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank"; // opens in a new tab

    const description = document.createElement("p");
    description.textContent =
      bookmark.description || "No description provided.";

    const timestamp = document.createElement("small");
    const date = new Date(bookmark.timestamp); // convert number to Date
    timestamp.textContent = `Saved on: ${date.toLocaleString()}`;

    li.appendChild(link);
    li.appendChild(description);
    li.appendChild(timestamp);
    list.appendChild(li);
  });

  // Add the list to the page
  bookmarkContainer.appendChild(list);
}

// When a user is selected from dropdown
userSelect.addEventListener("change", () => {
  const userId = userSelect.value;
  const bookmarks = getData(userId);
  renderBookmarks(bookmarks);
});

window.onload = function () {
  populateUserDropdown();
};
