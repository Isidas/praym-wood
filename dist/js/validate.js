// validate title
export const validateTitle = (title, invalidText) => {
  const value = title.value;
  if (value.trim() === "") {
    invalidText[0].classList.remove("hide");
    title.classList.add("error");
    return false;
  } else {
    invalidText[0].classList.add("hide");
    title.classList.remove("error");
    return value;
  }
};
// validate price
export const validatePrice = (priseValue, invalidText) => {
  const value = priseValue.value;
  if (value.trim() === "" || +value < 0 || value === "e") {
    invalidText[1].classList.remove("hide");
    priseValue.classList.add("error");
    return false;
  } else {
    let price = parseFloat(priseValue.value).toFixed(2);
    invalidText[1].classList.add("hide");
    priseValue.classList.remove("error");
    return price;
  }
};
// validate date
export const validateDate = (inputDate, invalidText) => {
  const dateTime = inputDate.value.trim();
  if (!isValidDateTime(dateTime)) {
    invalidText[2].classList.remove("hide");
    inputDate.classList.add("error");
    return false;
  } else {
    invalidText[2].classList.add("hide");
    inputDate.classList.remove("error");
    const parts = dateTime.split(" ");
    const [date, time] = parts;
    const [day, month, year] = date.split(".");
    const [hours, minutes, seconds] = time.split(":");
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
  }
};
// validate pattern date
function isValidDateTime(dateTime) {
  const dateTimeRegex =
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4} (0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  return dateTimeRegex.test(dateTime);
}
