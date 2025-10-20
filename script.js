// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getUserIds } from "./storage.js";



const users = getUserIds();

// =======DOM ELEMENTS========
const selectUser = document.getElementById("select-user")


//======EVENT LISTENERS==============
selectUser.addEventListener("change", ()=>{
  
})


//======HELPER FUNCTIONS=========

function selectDropDown(users){
  users.forEach((user) => {
    let option = document.createElement("option")
    option.text = `User${user}`
    selectUser.add(option)
  })
};

console.log(selectDropDown(users));

window.onload = function () {
  const users = getUserIds();
  // document.querySelector("body").innerText = `There are ${users.length} users`;
};
