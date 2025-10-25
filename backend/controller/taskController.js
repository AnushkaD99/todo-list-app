const task = require("../db/models/task");
const user = require("../db/models/user");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createTask = catchAsync(async (req, res, next) => {
    const body = req.body;
    const userId = req.user.id;

    const newTask = await task.create({
        title: body.title,
        description: body.description,
        createdBy: userId,
    });

    return res.status(201).json({
        status: 'success',
        message: 'Successfully task created',
        data: newTask,
    });
});

const getTaskByUserId = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const result = await task.findAll({
        include: user,
        where: {createdBy: userId},
    });

    return res.json({
        status: 'success',
        data: result,
    })
});

const markAsDone = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    const result = await task.findOne({ where: { id: taskId, createdBy: userId } });

    if(!result) {
        return next(new AppError('Task not found', 404));
    }

    result.completed = true;
    await result.save();

    return res.json({
        status: 'success',
        message: 'Task marked as done'
    });
});

const deleteTask = catchAsync(async (req, res, next) => {
    const userId = req.user.id;
    const taskId = req.params.id;

    const result = await task.findOne({ where: { id: taskId, createdBy: userId } });

    if(!result) {
        return next(new AppError('Task not found', 404));
    }

    await result.destroy();

    return res.json({
        status: 'success',
        message: 'Task deleted'
    });
});

module.exports = {createTask, getTaskByUserId, markAsDone, deleteTask};