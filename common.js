// ==================================================
// =============== BOOKMARK HELPER FUNCTIONS ========
// ==================================================

// --- Sort bookmarks from newest to oldest ---
export function sortBookMarksByNewest(userData) {
  return [...userData].sort(
    (a, b) => new Date(b.timeCreated) - new Date(a.timeCreated)
  );
}

//--- check if user bookmark exist ---
function checkUserBookmarkExist(bookMarkList, userId, getData) {
  const userData = getData(userId);
  
  if (!userData || userData.length === 0) {
    bookMarkList.textContent = `Bookmark not available for user ${userId}. Please add a new Bookmark`;
    bookMarkList.classList.add("error-message");
    return null;
  } else {
    bookMarkList.classList.remove("error-message");
    return userData;
  }
}

// ---  Display bookmarks on the page ---
export function displayBookmarkList(bookMarkList, userId, getData, sortBookMarksByNewest) {
  const userData = checkUserBookmarkExist(bookMarkList, userId, getData);
  if (!userData) return;

  bookMarkList.innerHTML = "";
  const sortedBookMarks = sortBookMarksByNewest(userData);

  //loop through each Bookmark and display it.
  sortedBookMarks.forEach((bookmark) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p><strong>Title:</strong> <a href= "${bookmark.url}" target="_blank"> ${bookmark.title}</a></p>
      <p><strong>Description: </strong> ${bookmark.textArea}</p>
      <p><em>Added on: ${new Date( bookmark.timeCreated).toLocaleString()}</em></p>
      <hr>
      `;
    bookMarkList.appendChild(div);
  });
}
