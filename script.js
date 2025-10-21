// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData, setData } from "./storage.js";
import { sortBookMarksByNewest } from "./common.js";

// =======DOM ELEMENTS========
const selectUser = document.getElementById("select-user");
const bookMarkList = document.getElementById("bookmarkList");
const bookMarkUrl = document.getElementById("url-input");
const title = document.getElementById("title-input");
const textArea = document.getElementById("textAreaField");
const timeCreated = document.getElementById("timeCreated");
const form = document.getElementById("bookmarkForm");

// =========INITIALIZE APP=========
window.onload = function () {
  const users = getUserIds();
  selectDropDown(users);
  // display for first user by default
  const defaultUser = "0";
  displayBookmarkList(defaultUser);
};

//======EVENT LISTENERS==============
//---------event listener for drop down changes
selectUser.addEventListener("change", (event) => {
  const selectedUser = event.target.value;
  displayBookmarkList(selectedUser);
});

//-----event listener for new bookmark submission------
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userId = selectUser.value;

  // validation controls before submit
  if (!userId || userId === "0") {
    alert("Please select user.");
    return;
  }

  //get current bookmarks or empty array as fall back
  const userData = getData(userId) || [];

  const newBookMark = {
    url: bookMarkUrl.value,
    title: title.value,
    textArea: textArea.value,
    timeCreated: new Date().toISOString(),
  };

  //Add to array and persist
  userData.push(newBookMark);
  setData(userId, userData);

  // clear inputs and refresh form
  form.reset();

  //automatically select the last user you added a bookmark for (so it doesn’t reset to user 0)
  selectUser.value = userId;

  displayBookmarkList(userId);
});

// ========== FUNCTIONS ===================

//--------function to select populate select dropdown
function selectDropDown(users) {
  users.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.text = `User${user}`;
    selectUser.add(option);
  });
}

// ---function to display bookmarks------------
function displayBookmarkList(userId) {
  bookMarkList.innerHTML = "";

  // Always get an array, even if getData() returns null
  const userData = getData(userId) || [];

  if (!userData || userData.length === 0) {
    bookMarkList.textContent = `No Bookmark for selected user ${userId}. Please add a new Bookmark`;
    return;
  }

  //sort Bookmarks before displaying
  const sortedBookMarks = sortBookMarksByNewest(userData);

  //loop through each Bookmark and display them.
  sortedBookMarks.forEach((bookmark) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Title:</strong> ${bookmark.title}</p>
      <p><strong>URL:</strong> <a href= "${bookmark.url}" target="_blank">"${
      bookmark.url
    }" </a></p>
      <p><strong>Description: </strong> ${bookmark.textArea}</p>
      <p><em>Bookmark added on: ${new Date(
        bookmark.timeCreated
      ).toLocaleString()}</em></p>
      <hr>
      `;
    bookMarkList.appendChild(div);
  });
}
