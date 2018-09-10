const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_globals/database');
const ACAClass = db.ACAClass;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await ACAClass.find();
}

async function getById(id) {
    return await ACAClass.findById(id);
}

async function create(acaClassParam) {
    // validate
    if (await ACAClass.findOne({ name: acaClassParam.name })) {
        throw 'Name "' + acaClassParam.name + '" already exists.';
    }

    const aca_class = new ACAClass(acaClassParam);

    // save aca_class
    await aca_class.save();
}

async function update(id, acaClassParam) {
    const aca_class = await ACAClass.findById(id);

    // validate
    if (!aca_class) throw 'ACAClass not found';
    if (aca_class.name !== acaClassParam.name && await ACAClass.findOne({ name: acaClassParam.name })) {
        throw 'Name "' + acaClassParam.name + '" is already taken';
    }

    // copy acaClassParam properties to aca_class
    Object.assign(aca_class, acaClassParam);

    await aca_class.save();
}

async function _delete(id) {
    await ACAClass.findByIdAndRemove(id);
}