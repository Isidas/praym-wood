// imports
import { validatePrice, validateTitle, validateDate } from "./validate";
import { initData } from "./tableItem";

//variables
const burger = document.querySelector(".burger");
const btnAdd = document.querySelector(".btn-add");
const dialog = document.querySelector("#modal");
const addItem = document.querySelector(".add-item");
const closeDialog = document.querySelectorAll(".close-dialog");
const inputTitle = document.querySelector(".input-title");
const inputPrise = document.querySelector(".input-price");
const inputDate = document.querySelector(".input-date");
const invalidText = document.querySelectorAll(".dialog__invalid-text");

const itemArray = [];
const id = new Date().getTime();

//actions

burger.addEventListener("click", () => {
  alert("Some kind of menu");
});
btnAdd.addEventListener("click", () => {
  dialog.showModal();
});
closeDialog.forEach((item) => {
  item.addEventListener("click", () => {
    dialog.close();
  });
});
const clearInput = () => {
  inputTitle.value = "";
  inputPrise.value = "";
  inputDate.value = "";
};

addItem.addEventListener("click", () => {
  const itemTitle = validateTitle(inputTitle, invalidText);
  const itemPrice = validatePrice(inputPrise, invalidText);
  const itemDate = validateDate(inputDate, invalidText);
  if (!itemTitle || !itemPrice || !itemDate) {
    return null;
  } else {
    const item = {
      id: id,
      title: itemTitle,
      price: itemPrice,
      date: itemDate,
    };
    itemArray.push(item);
    clearInput();
    dialog.close();
    initData(itemArray);
  }
});
