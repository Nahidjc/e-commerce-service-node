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
    dueDate: {
        type: Date,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("todos", todoSchema);