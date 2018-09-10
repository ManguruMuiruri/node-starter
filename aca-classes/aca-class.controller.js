const express = require('express');
const router = express.Router();
const acaClassService = require('./aca-class.service');

// routes
router.post('/add', addAcaClass);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function addAcaClass(req, res, next) {
    acaClassService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    acaClassService.getAll()
        .then(aca_classes => res.json(aca_classes))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    acaClassService.getById(req.aca_class.sub)
        .then(aca_class => aca_class ? res.json(aca_class) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    acaClassService.getById(req.params.id)
        .then(aca_class => aca_class ? res.json(aca_class) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    acaClassService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    acaClassService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}