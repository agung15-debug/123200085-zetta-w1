function buyBook(title, author, price, discountPercent, stock, purchased) {
    const TAX_RATE = 0.1;

    //Var
    let hasDiscount = discountPercent > 0 ? true : false;
    let discountAmount = 0;
    let discountedPrice = 0;
    let taxAmount = 0;
    let priceAfterTax = 0;
    let total = 0;
    let stockLeft = stock - purchased;

    if (hasDiscount) {
        discountAmount = price * (discountPercent/100);
        discountedPrice = price - discountAmount;
    } else {
        discountedPrice = price;
    }

    taxAmount = discountedPrice * TAX_RATE;
    priceAfterTax = discountedPrice + taxAmount;

    //calculate total
    for(let i = 0; i < purchased; i++) {
    if(stockLeft >= 0) {
        total += priceAfterTax;
    } else {
        return {
            status : "false",
            message : "Out of stock"
        }
    }
}
    discountAmount = discountAmount.toFixed(2);
    discountedPrice = discountedPrice.toFixed(2);
    taxAmount = taxAmount.toFixed(2);
    priceAfterTax = priceAfterTax.toFixed(2);
    total = total.toFixed(2);

    return {
        status : "true",
        message : "Purchased Succesfully",
        data : {
            title : title,
            author : author,
            price : price,
            discountPercent : discountPercent,
            discountAmount : discountAmount,
            tax : TAX_RATE,
            taxAmount : taxAmount,
            priceAfterTax : priceAfterTax,
            stock : stock,
            stockLeft : stockLeft,
            total : total
        }
    }
}

const form = document.getElementById('purchased-book');
const result = document.getElementById('result');
const stockLeft = document.getElementById('stock-left');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const bookName = document.getElementById('book').value;
    const author = document.getElementById('author').value;
    const price = document.getElementById('price').value;
    const discount = document.getElementById('discount').value;
    const stock = document.getElementById('stock').value;
    const qty = document.getElementById('quantity').value;
    const buy = buyBook(bookName, author, price, discount, stock, qty);

    console.log(buy);

    if(buy.status === "true") {
        purchasedBook = buy.data;
        result.innerHTML = `
            <p>Book Name: ${purchasedBook.title}</p>
            <p>Author: ${purchasedBook.author}</p>
            <p>Price: ${purchasedBook.price}</p>
            <p>Discount: ${purchasedBook.discountPercent}%</p>
            <p>Discount Amount: ${purchasedBook.discountAmount}</p>
            <p>Tax: ${purchasedBook.tax}</p>
            <p>Tax Amount: ${purchasedBook.taxAmount}</p>
            <p>Price After Tax: ${purchasedBook.priceAfterTax}</p>
            <p>Total: ${purchasedBook.total}</p>
        `;
        stockLeft.innerHTML = `Stock Left: ${purchasedBook.stockLeft}`;
    } else {
        result.innerHTML = `
            <p>${buy.message}</p>
        `;
        //stockLeft.innerHTML = `Stock Left: ${result.stock}`;
    }

})