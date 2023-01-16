const TodoModel = require("../schema/todoSchema");

exports.create = data => {
    const todo = new TodoModel(data);
    return todo.save();
};
exports.findTodoById = async id => {
    const todo = await TodoModel.findById(id);
    return todo;
};
exports.getAllTodo = async () => {
    const todos = await TodoModel.find()
    return todos
};

exports.deleteTodo = async (id) => {
    await TodoModel.deleteOne({ _id: id });
};
exports.updateTodo = async (id, data) => {
    await TodoModel.findOneAndUpdate({ _id: id }, data);
    const todo = await TodoModel.findById(id);
    return todo;
};