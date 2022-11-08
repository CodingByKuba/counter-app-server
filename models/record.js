const mongoose = require('mongoose')

//Zdefiniowanie schematu bazy danych notatek
const recordSchema = new mongoose.Schema(
    {
        day: {
            type: String,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        heigth: {
            type: Number,
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const record = mongoose.model('Record', recordSchema);

module.exports = record;