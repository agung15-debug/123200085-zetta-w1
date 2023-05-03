const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const { response } = require("express");
let creditPayment =[];

const app = express();
app.use(cors());
app.use(bodyParser.json());

//basic-auth
app.use(basicAuth( { authorizer: myAuthorizer } ))

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, 'agung')
    const passwordMatches = basicAuth.safeCompare(password, 'agung123')

    return userMatches & passwordMatches
}

async function termOfCredit(month, totalPrice) {
    let perTerm = totalPrice / month;
    for(let i = 1; i <= month; i++) {
        let credit = {
            month: i,
            payment: perTerm
        }
        creditPayment.push(credit)
    }
}

const wtPrm = file => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fs.readFile(file, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }, 2000);
    })
});
}

const readFileNoPromise = file => {
    try{
        const data = fs.readFileSync(file, 'utf8');
        return data;
    }
    catch(err){
        console.error(err);
    }
}

app.post("/withPromise", async (req, res) => {
    const { bookTitle, bookAuthor, bookPrice, discountPercentage, stock, bookPurchase, month } = req.body;
    let textF = await wtPrm("textFile.txt");
    const isOutStock = stock - bookPurchase < 0;
        if (isOutStock) {
            return res.status(400).json({ message: 'Out of Stock' });
        }
    
        const discount = bookPrice * (discountPercentage / 100);
        const priceAfterDiscount = bookPrice - discount;
        const taxAmount = priceAfterDiscount * 0.1;
        const priceAfterTax = priceAfterDiscount + taxAmount;
        const totalPrice = priceAfterTax * bookPurchase;
        termOfCredit(month, totalPrice);

        
       let response = await res.status(200).json({
            status: 'success',
            message: 'Book purchase success',
            data: {
                bookTitle : bookTitle,
                bookAuthor : bookAuthor,
                bookPrice : bookPrice,
                discountPercentage : discountPercentage,
                discountTotal  : discount,
                priceAfterDiscount : priceAfterDiscount,
                taxAmount : taxAmount,
                priceAfterTax : priceAfterTax,
                stock : stock,
                bookPurchase : bookPurchase,
                totalPrice : totalPrice,
                creditPayment : creditPayment,
                text : textF
            }
        })
});

app.post("/noPromise", async (req, res) => {
    const { bookTitle, bookAuthor, bookPrice, discountPercentage, stock, bookPurchase, month } = req.body;
    let textfi = readFileNoPromise('textFile.txt') + ' with no promise';
    const isOutStock = stock - bookPurchase < 0;
        if (isOutStock) {
            return res.status(400).json({ message: 'Out of Stock' });
        }
    
        const discount = bookPrice * (discountPercentage / 100);
        const priceAfterDiscount = bookPrice - discount;
        const taxAmount = priceAfterDiscount * 0.1;
        const priceAfterTax = priceAfterDiscount + taxAmount;
        const totalPrice = priceAfterTax * bookPurchase;
        termOfCredit(month, totalPrice);

        
       let response = await res.status(200).json({
            status: 'success',
            message: 'Book purchase success',
            data: {
                bookTitle : bookTitle,
                bookAuthor : bookAuthor,
                bookPrice : bookPrice,
                discountPercentage : discountPercentage,
                discountTotal  : discount,
                priceAfterDiscount : priceAfterDiscount,
                taxAmount : taxAmount,
                priceAfterTax : priceAfterTax,
                stock : stock,
                bookPurchase : bookPurchase,
                totalPrice : totalPrice,
                creditPayment : creditPayment,
                text : textfi
            }
        })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});