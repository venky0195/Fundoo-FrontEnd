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
  notesData.forEach(function(value) {
    if (!value.pinned && !value.archive && !value.trash) {
      otherArr.push(value);
    }
  });
  return otherArr;
}
export function archiveArray(notesData) {
  let archiveArr = [];
  notesData.forEach(function(value) {
    if (value.archive && !value.trash) {
      archiveArr.push(value);
    }
  });
  return archiveArr;
}
export function trashArray(notesData) {
  let trashArr = [];
  notesData.forEach(function(value) {
    if (value.trash) {
      trashArr.push(value);
    }
  });
  return trashArr;
}
export function reminderArray(notesData) {
  let reminderArr = [];
  notesData.forEach(function(value) {
    if (value.reminder && !value.trash && !value.archive) {
      reminderArr.push(value);
    }
  });
  return reminderArr;
}
export function pinArray(notesData) {
  let pinArr = [];
  notesData.forEach(function(value) {
    if (value.pinned) {
      pinArr.push(value);
    }
  });
  return pinArr;
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
 * @description: To delete the note forever
 * @param {*note data to backend} data
 */
export function deleteNoteForever(data) {
  console.log("delete note data from front-end==>", data);
  var headers = {
    "Content-Type": "application/json",
    token: localStorage.getItem("token")
  };
  return axios.post("/deleteNote", data, {
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
/**
 * @description: To update the pin status of the particular note
 * @param {*pin data to backend} data
 */
export function updatePin(data) {
  console.log("pinned data from front-end==>", data);
  var headers = {
    token: localStorage.getItem("token")
  };
  return axios.put("/isPinned", data, {
    headers: headers
  });
}

export function pushNotification(data) {
  console.log("Data from front to back ===>", data);
  var headers = {
    token: localStorage.getItem("token")
  };
  return axios.post("/pushNotification", data, {
    headers: headers
  });
}

export function addLabel(data){
  console.log("Data from frontend to back in addLabel==>",data);
  var headers={
    token: localStorage.getItem("token")
  };
  return axios.post("/addLabel", data,{
    headers: headers
  });
}
