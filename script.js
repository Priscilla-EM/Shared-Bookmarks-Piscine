import { getUserIds, getData, setData } from "./storage.js";
import { getValidBookmarks } from "./getValidBookmarks.js";


const userSelect = document.getElementById("user-select");
const bookmarkContainer = document.getElementById("bookmark-container");
const form = document.getElementById("bookmark-form");

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

  if (!Array.isArray(bookmarks)) {
    console.error("Invalid bookmarks data.");
    bookmarks = [];
  }

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
    const date = new Date(bookmark.timestamp); // convert number to Date object
    timestamp.textContent = `Saved on: ${date.toLocaleString()}`; // turns timestamp into a readable format

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
  const bookmarks = getValidBookmarks(userId); // Load bookmarks for the selected user
  renderBookmarks(bookmarks);
});
// Populate the user dropdown on page load
populateUserDropdown();

// Handle form submission to add a new bookmark
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent page reload

  const userId = userSelect.value;
  if (!userId) {
    alert("Please select a user first.");
    return;
  }

  const url = document.getElementById("url").value.trim();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  // Validate URL and Title
  if (!url || !title) {
    alert("URL and Title are required!");
    return;
  }

  // Create a new bookmark object
  const newBookmark = {
    url,
    title,
    description,
    timestamp: Date.now(),
  };

  const existingBookmarks = getValidBookmarks(userId); // Load existing bookmarks 
  const updatedBookmarks = [...existingBookmarks, newBookmark]; // Add the new bookmark to the existing ones

  setData(userId, updatedBookmarks); // Save updated bookmarks back to storage
  alert("Bookmark saved successfully!"); // Notify user of success
  renderBookmarks(updatedBookmarks); // Render the updated bookmarks

  form.reset(); // clear the form fields
});
