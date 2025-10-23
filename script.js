// ==================================================
// =============== IMPORTS ==========================
// ==================================================
import { getUserIds, getData, setData } from "./storage.js";
import { sortBookMarksByNewest, displayBookmarkList } from "./common.js";

// ==================================================
// =============== DOM ELEMENTS =====================
// ==================================================
const selectUser = document.getElementById("select-user");
const bookMarkList = document.getElementById("bookmarkList");
const bookMarkUrl = document.getElementById("url-input");
const title = document.getElementById("title-input");
const textArea = document.getElementById("textAreaField");
const form = document.getElementById("bookmarkForm");
const displayText = document.getElementById("display-text");

// ==================================================
// =============== HELPER FUNCTIONS =================
// ==================================================

//---function to populate select dropdown---
function selectDropDown(users) {
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.text = `User-${user}`;
    selectUser.add(option);
  });
}

// ==================================================
// =============== INITIALIZE APP ===================
// ==================================================
window.onload = function () {
  const users = getUserIds();
  selectDropDown(users);

  // display for first user by default
  const defaultUser = "0";
  displayBookmarkList(bookMarkList, defaultUser, getData, sortBookMarksByNewest);

  bookMarkList.textContent = "Select user to view or add Bookmark";
  bookMarkList.classList.remove("error-message");

  //display text to select user on page load
  displayText.textContent = "Select user to view or add Bookmark";
  displayText.style.display = "block";
};

// ==================================================
// =============== EVENT LISTENERS ==================
// ==================================================

//---event listener for drop down changes---
selectUser.addEventListener("change", (event) => {
  const selectedUser = event.target.value;
  displayText.style.display = "none";
  displayBookmarkList(bookMarkList, selectedUser, getData, sortBookMarksByNewest);
});

//--- event listener for Form (new bookmark) submission ---
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userId = selectUser.value;

  // validation controls before submitting
  if (!userId || userId === "0") {
    alert("Please select user.");
    return;
  }

  // Allows user to submit form by pressing enter
  textArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  //get current bookmarks or empty array
  const userData = getData(userId) || [];

  //create new bookmark
  const newBookMark = {
    url: bookMarkUrl.value,
    title: title.value,
    textArea: textArea.value,
    timeCreated: new Date().toISOString(),
  };

  //save bookmark to array
  userData.push(newBookMark);
  setData(userId, userData);

  // reset form and reload bookmarks
  form.reset();
  selectUser.value = userId;
  displayBookmarkList(bookMarkList, userId, getData, sortBookMarksByNewest);
});
