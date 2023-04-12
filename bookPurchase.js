const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const app = express();

//parse json response
app.use(bodyParser.json());

//basic auth
app.use(basicAuth( { authorizer: myAuthorizer } ))

function myAuthorizer(username, password) {
    const userMatches = basicAuth.safeCompare(username, 'agung')
    const passwordMatches = basicAuth.safeCompare(password, 'agung123')

    return userMatches & passwordMatches
}

app.post('/purchase', (req, res) => {
    const { bookTitle, bookAuthor, bookPrice, discountPercentage, stock, bookPurchase, creditTerm } = req.body;

    const isOutStock = stock - bookPurchase < 0;
        if (isOutStock) {
            return res.status(400).json({ message: 'Out of Stock' });
        }
        const discount = bookPrice * (discountPercentage / 100);
        const priceAfterDiscount = bookPrice - discount;
        const taxAmount = priceAfterDiscount * 0.1;
        const priceAfterTax = priceAfterDiscount + taxAmount;
        const totalPrice = priceAfterTax * bookPurchase;
        const pricePerTerm = totalPrice / creditTerm;
        let creditPayment = [];
        for (let i = 0; i < creditTerm; i++) {
            creditPayment.push(pricePerTerm);
        }

        return res.status(200).json({
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
                creditTerm : creditTerm,
                creditPayment : creditPayment,}
        })


    // bookPurchase : { async (req, res) => {
        
        
        // try {
        //     const {
        //         bookTitle, 
        //         bookAuthor, 
        //         bookPrice, 
        //         discountPercentage, 
        //         stock, 
        //         bookPurchase, 
        //         creditTerm,
        //     } = req.body;
        //     const isOutStock = stock - bookPurchase < 0;
        //     if (isOutStock) {
        //         return res.status(400).json({ message: 'Out of Stock' });
        //     }
        //     const discount = bookPrice * (discountPercentage / 100);
        //     const priceAfterDiscount = bookPrice - discount;
        //     const taxAmount = priceAfterDiscount * 0.1;
        //     const priceAfterTax = priceAfterDiscount + taxAmount;
        //     const totalPrice = priceAfterTax * bookPurchase;
        //     const pricePerTerm = totalPrice / creditTerm;
        //     let creditPayment = [];
        //     for (let i = 0; i < creditTerm; i++) {
        //         creditPayment.push(pricePerTerm);
        //     }

        //     return res.status(200).json({
        //         status: 'success',
        //         message: 'Book purchase success',
        //         data: {
        //             bookTitle : bookTitle,
        //             bookAuthor : bookAuthor,
        //             bookPrice : bookPrice,
        //             discountPercentage : discountPercentage,
        //             discountTotal  : discount,
        //             priceAfterDiscount : priceAfterDiscount,
        //             taxAmount : taxAmount,
        //             priceAfterTax : priceAfterTax,
        //             stock : stock,
        //             bookPurchase : bookPurchase,
        //             totalPrice : totalPrice,
        //             creditTerm : creditTerm,
        //             creditPayment : creditPayment,}
        //     })
        // }
        // catch (err) {
        //     console.log(err);
        //     res.status(500).json({ message: 'Internal Server Error' });
        // }
//     }
// }

});

app.listen(3000, () => console.log('Server started on port 3000'));