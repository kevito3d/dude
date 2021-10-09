const express = require("express");
const Institution = require('../models/institution')

const router = express.Router();


router.post('/', (req, res) => {
    Institution.create(req.body)
        .then(x => res.status(201).send(x));
})

router.get('/', (req, res) => {
    Institution.find()
        .exec()
        .then(x => res.status(200).send(x));
});

router.get('/:id', (req, res) => {
    Institution.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x));
})

router.put('/:id', (req, res) => {
    Institution.findOneAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204));
});


router.delete('/:id', (req, res) => {
    Institution.findOneAndDelete(req.params.id)
        .exec()
        .then(() => res.sendStatus(204));
});


module.exports = router;