let price;

function calculate() {
  const book = document.getElementById("title-book").value;
  price = document.getElementById("price").value;
  const discount = document.getElementById("discount").value;
  const tax = 0.1;
  let flag = price >= 0 && discount >= 0 && discount <= 100 ? true : false;
  if (flag) {
    bookPurchase(book, discount, tax);
  }
}

function bookPurchase(book, discount, tax) {
  let discountPrice = price * (discount / 100);
  let taxPrice = price * tax;
  let afterDiscount = price - discountPrice;
  let afterTax = afterDiscount + taxPrice;
  document.getElementById(
    "result"
  ).innerHTML = `Book Title : ${book} <br/>Percentage of Discount : ${discount} <br> Amount of Discount: ${discountPrice} <br> Price After Discount: ${afterDiscount} <br> Percentage of Tax: ${
    tax * 100
  }% <br> Amount of Tax: ${taxPrice} <br> Price After Tax: ${afterTax}`;
}
