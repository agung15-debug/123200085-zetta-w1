let bookTitle = document.getElementById("bookTitle");
let bookAuthor = document.getElementById("bookAuthor");
let bookPrice = document.getElementById("price");
let discountPercentage = document.getElementById("discount");
let stock = document.getElementById("stock");
let bookPurchase = document.getElementById("book-purchase");
let month = document.getElementById("month");
let submit = document.getElementById("submit");
let submit2 = document.getElementById("submit2");


submit.addEventListener("click", async () => {
    let response = await fetch("http://localhost:3000/withPromise", {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + btoa('agung:agung123'),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bookTitle: bookTitle.value,
            bookAuthor: bookAuthor.value,
            bookPrice: bookPrice.value,
            discountPercentage: discountPercentage.value,
            stock: stock.value,
            bookPurchase: bookPurchase.value,
            month: month.value,
        }),
    });
    let result = await response.json();
    console.log(result.data.text);
});

submit2.addEventListener("click", async () => {
    let response = await fetch("http://localhost:3000/noPromise", {
        method: "POST",
        headers: {
            'Authorization': 'Basic ' + btoa('agung:agung123'),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            bookTitle: bookTitle.value,
            bookAuthor: bookAuthor.value,
            bookPrice: bookPrice.value,
            discountPercentage: discountPercentage.value,
            stock: stock.value,
            bookPurchase: bookPurchase.value,
            month: month.value,
        }),
    });
    let result = await response.json();
    console.log(result.data.text);
});