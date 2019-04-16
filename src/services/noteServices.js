/*******************************************************************************
 *  @Purpose        : To create note services that will perform CRUD operations.
 *  @file           : noteServices.js
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 *******************************************************************************/
import axios from "axios";
/**
 * @description:To create a new note
 * @param {*used to send data or note to server} data
 */
export function createNote(data) {
  console.log("create note data from front-end==>", data);
  var headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  };
  return axios.post("/createNote", data, {
    headers: headers
  });
}
/**
 * @description:To get the created notes
 */
export function getNotes() {
  console.log("Get notes in front end");
  return axios.get("/getNotes", {
    headers: {
      token: localStorage.getItem("token")
    }
  });
}
/**
 * @description: To update the background color of the note
 * @param {*color data to backend} data
 */
export function updateColor(data) {
  console.log("color data from front-end==>", data);
  var headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  };
  return axios.put("/updateColor", data, {
    headers: headers
  });
}

export function otherArray(notesData) {
  let otherArr = [];
  for (let i = 0; i < notesData.length; i++) {
    if (!notesData[i].archive && !notesData[i].trash) {
      otherArr.push(notesData[i]);
    }
  }
  return otherArr;
}
/**
 * @description: To set the reminder for the note
 * @param {*reminder data to backend} data
 */
export function setReminder(data) {
  console.log("reminder data from front-end==>", data);
  var headers = {
    token: localStorage.getItem("token")
  };
  return axios.put("/reminder", data, {
    headers: headers
  });
}
/**
 * @description: To update the archive status for the note
 * @param {*archive data to backend} data
 */
export function updateArchiveStatus(data) {
  console.log("archive data from front-end==>", data);
  var headers = {
    token: localStorage.getItem("token")
  };
  return axios.put("/isArchived", data, {
    headers: headers
  });
}
/**
 * @description: To update the trash status for the note
 * @param {*trash data to backend} data
 */
export function updateTrashStatus(data) {
  console.log("Trash data from front-end==>", data);
  var headers = {
    token: localStorage.getItem("token")
  };
  return axios.put("/isTrash", data, {
    headers: headers
  });
}
/**
 * @description: To update the title of the particular note
 * @param {*trash data to backend} data
 */
export function updateTitle(data) {
  console.log("updateNote data from front-end==>", data);
  var headers = {
    token: localStorage.getItem("token")
  };
  return axios.put("/updateTitle", data, {
    headers: headers
  });
}
/**
 * @description: To update the description of the particular note
 * @param {*trash data to backend} data
 */
export function updateDescription(data) {
  console.log("updateNote data from front-end==>", data);
  var headers = {
    token: localStorage.getItem("token")
  };
  return axios.put("/updateDescription", data, {
    headers: headers
  });
}
