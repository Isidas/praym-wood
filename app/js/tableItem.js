export function initData(arr) {
  // clearing the list before adding new items
  const list = document.querySelector(".table__items-list");
  list.textContent = "";
  function sortData(arr) {
    return arr.sort((a, b) => new Date(a.date) - new Date(b.date));
  }
  // sorting an array of elements
  const sortedArr = sortData(arr);

  // adding each element to the page
  sortedArr.forEach((item, index) => {
    // creating an element
    const wrapper = document.createElement("div");
    const itemNumber = document.createElement("span");
    const itemTitle = document.createElement("span");
    const itemPrice = document.createElement("span");
    const itemDate = document.createElement("span");

    // assigning classes
    wrapper.classList.add("table__item");
    itemNumber.classList.add("table__number");
    itemTitle.classList.add("items__text");
    itemPrice.classList.add("items__text");
    itemDate.classList.add("items__text");

    // we fill it with content
    itemNumber.textContent = index + 1;
    itemTitle.textContent = item.title;
    itemPrice.textContent = item.price;
    itemDate.textContent = item.date;

    // adding an element to the page
    wrapper.append(itemNumber, itemTitle, itemPrice, itemDate);
    list.append(wrapper);
  });
}
