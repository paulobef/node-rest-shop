const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order')

router.get('/', (req, res, next) => {
    Order.find()
    .select('quantity _id product')
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc =>  {
                return {
                    _id: doc._id,
                    quantity: doc.quantity,
                    product: doc.product,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        res.status(500).json({
            erros: err
        })
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