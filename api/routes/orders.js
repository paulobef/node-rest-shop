const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
        // here we will return a list of orders
    });
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    });

    order.save()
    .then(result => {
        res.status(201).json({
            message: 'Order for ' + order.quantity + ' of Product ref°' + order.product + ' was placed',
            order: result
        });
    })
    .catch(err => {
        res.status(500).json({ error : err });
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