# 📚 Shared Bookmarks

A simple JavaScript-only web application to create, store, and share bookmarks across different users.

## 🔗 Live Demo

View the live site on Netlify
👉 [Shared Bookmark App on Netlify](https://sharedbookmarkspiscine.netlify.app/)  

## 📚 Repository

You can find the full source code on GitHub:  
👉 [Shared-Bookmarks-Piscine](https://github.com/Priscilla-EM/Shared-Bookmarks-Piscine)

## 📂 Project Structure
shared-bookmarks/
├── index.html              # Main HTML page
├── script.js               # Main JavaScript logic (UI interactions and rendering)
├── storage.js              # Provided utility for localStorage access (get/set/clear data)
├── getValidBookmarks.js    # Module to safely get valid bookmark arrays
├── getValidBookmarks.test.js  # Unit tests for getValidBookmarks function
├── styles.css              # Optional: used only if needed, not required by project
├── README.md               # Project overview and documentation
├── .gitignore              # Standard gitignore (e.g. node_modules, etc.)

🧪 Running Unit Tests

To run tests for this project:

1. Open your terminal.
2. Navigate to the root directory of the project: cd shared-bookmarks
3. Make sure dependencies are installed: npm install
4. Run npm test
The tests are written using Jest, a simple JavaScript testing framework.
If jest is not installed globally, you can also run it via: npx jest

