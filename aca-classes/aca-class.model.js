const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    programType: { type: String, required: true },
    level: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    frequency: { type: String },
    charges: { type: String, required: true },
    promo: { type: String },
    location: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ACAClass', schema);