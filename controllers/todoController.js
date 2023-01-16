const todoModel = require("../models/todoModel");

exports.addTodo = async (req, res) => {
    try {
        const todo = await todoModel.create(req.body);
        res.send({
            todo,
            message: "Todo created Successfully",
        });
    } catch (e) {
        return res.status(500).json({
            error: e.response,
        });
    }
};

exports.getTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const todo = await todoModel.findTodoById(todoId)
        res.send({
            todo,
            message: "Todo fetched Successfully",
        });

    } catch (e) {
        return res.status(500).json({
            error: e.message,
        });
    }
}

exports.getAllTodo = async (req, res) => {
    try {
        const todos = await todoModel.getAllTodo();
        res.send({
            todos,
            message: "Todos fetched Successfully",
        });

    } catch (e) {
        return res.status(500).json({
            error: e.message,
        });
    }
}
exports.deleteTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        await todoModel.deleteTodo(todoId);
        res.send({
            message: "Todos deleted Successfully",
        });

    } catch (e) {
        return res.status(500).json({
            error: e.message,
        });
    }
}
exports.updateTodoById = async (req, res) => {
    try {
        const todoId = req.params.id;
        const data = req.body;
        const todo = await todoModel.updateTodo(todoId, data);
        res.send({
            todo,
            message: "Todos updated Successfully",
        });

    } catch (e) {
        return res.status(500).json({
            error: e.message,
        });
    }
}