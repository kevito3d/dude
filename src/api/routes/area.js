const express = require("express");
const Areas = require('../models/area')
const {hasRoleAdmin} = require('../auth');

const router = express.Router();


router.post('/',hasRoleAdmin, (req, res) => {
    Areas.create(req.body)
        .then(x => res.status(201).send(x));
})

router.get('/', (req, res) => {
    Areas.find()
        .exec()
        .then(x => res.status(200).send(x));
});

router.get('/:id', (req, res) => {
    Areas.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x));
})

router.put('/:id',hasRoleAdmin, (req, res) => {
    Areas.findOneAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204));
});


router.delete('/:id',hasRoleAdmin,  (req, res) => {
    Areas.findOneAndDelete(req.params.id)
        .exec()
        .then(() => res.sendStatus(204));
});


module.exports = router;