const { addTodo, getAllTodo, getTodoById, deleteTodoById, updateTodoById } = require("../controllers/todoController");
const router = require("express").Router();


router.post("/add", addTodo);
router.get("/all", getAllTodo);
router.get("/:id", getTodoById);
router.delete("/:id", deleteTodoById);
router.patch("/:id", updateTodoById);



module.exports = router;