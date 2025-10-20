// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds, getData } from "./storage.js";

// =======DOM ELEMENTS========
const selectUser = document.getElementById("select-user")
const bookMarkList = document.getElementById("bookmarkList");

// =========INITIALIZE APP=========
window.onload = function () {
  const users = getUserIds();
  selectDropDown(users);
  // display for first user by default
  let selectUserValue =  "0";
  displayBookmarkList(selectUserValue);
}
//======EVENT LISTENERS==============
//---------event listener for drop down changes
selectUser.addEventListener("change", (event)=> {
  const selectedUser = event.target.value;
  displayBookmarkList(selectedUser);
})


//--------function to select populate select dropdown
function selectDropDown(users){
  users.forEach((user) => {
    let option = document.createElement("option")
    option.value = user
    option.text = `User${user}`
    selectUser.add(option)
  })
};

// ---function to display bookmarks------------
function displayBookmarkList(userId){
  bookMarkList.innerHTML = ""
  const userData = getData(userId);
  if(!userData || userData.length === 0){
    bookMarkList.textContent = `No Bookmark available. Please add a new Bookmark`;
    return;
  }
}

//-----function to fetch all Bookmarks


// window.onload = function () {
//   // const users = getUserIds();
//   // document.querySelector("body").innerText = `There are ${users.length} users`;
// };
