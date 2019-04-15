const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
        // here we will return a list of orders
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    
    res.status(201).json({
        message: 'Order was placed',
        order: order
    });
});


router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    if(id === "special") {
        res.status(200).json({
            message: 'You just found the special order ID',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'Here is order n°' + id + ' details',
            id: id
        })
    }

});


router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    res.status(200).json({
        message: 'Deleted order n°' + id + '!'
    })

});




module.exports = router;