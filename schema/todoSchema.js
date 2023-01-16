const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    todo: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("todos", todoSchema);