function buyBook(title, author, price, discountPercent, stock, purchased, month, interest) {
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
    totalFinal  = total*(1+(interest/100))**month;
    creditPerMonth = (totalFinal/month).toFixed(2);

    const creaditDueArray = Array.from({length: month}, (v, i) => ({
        month : i+1,
        credit : creditPerMonth
    }));

    discountAmount = discountAmount.toFixed(2);
    discountedPrice = discountedPrice.toFixed(2);
    taxAmount = taxAmount.toFixed(2);
    priceAfterTax = priceAfterTax.toFixed(2);
    total = total.toFixed(2);
    totalFinal = totalFinal.toFixed(2);

    return {
        status : "true",
        message : "Purchased Succesfully",
        data : {
            title : title,
            author : author,
            price : price,
            discountPercent : discountPercent,
            discountAmount : discountAmount,
            discountedPrice : discountedPrice,
            tax : TAX_RATE,
            taxAmount : taxAmount,
            priceAfterTax : priceAfterTax,
            stock : stock,
            stockLeft : stockLeft,
            total : total,
            totalFinal : totalFinal,
            creditDue : creaditDueArray
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
    const month = document.getElementById('credit-term').value;
    const interest = document.getElementById('interest').value;
    const buy = buyBook(bookName, author, price, discount, stock, qty, month, interest);

    console.log(buy);

    if(buy.status === "true") {
        purchasedBook = buy.data;
        result.innerHTML = `
            <p>Book Name: ${purchasedBook.title}</p>
            <p>Author: ${purchasedBook.author}</p>
            <p>Price: ${purchasedBook.price}</p>
            <p>Discount: ${purchasedBook.discountPercent}%</p>
            <p>Discount Amount: ${purchasedBook.discountAmount}</p>
            <p>Discounted Price: ${purchasedBook.discountedPrice}</p>
            <p>Tax: ${purchasedBook.tax}</p>
            <p>Tax Amount: ${purchasedBook.taxAmount}</p>
            <p>Price After Tax: ${purchasedBook.priceAfterTax}</p>
            <p>Total: ${purchasedBook.total}</p>
            <p>Total After Interest: ${purchasedBook.totalFinal}</p>
            <p>Credit Due:</p>
            <ul>
                ${purchasedBook.creditDue.map(credit => `<li>Month ${credit.month}: ${credit.credit}</li>`).join('')}
            </ul>
        `;
        stockLeft.innerHTML = `Stock Left: ${purchasedBook.stockLeft}`;

    } else {
        result.innerHTML = `
            <p>${buy.message}</p>
        `;
    }

})