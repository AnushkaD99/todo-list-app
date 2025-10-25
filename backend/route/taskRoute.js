const { authentication } = require('../controller/authController');
const { createTask, getTaskByUserId, markAsDone, deleteTask } = require('../controller/taskController');

const router = require('express').Router();

router.route('/').post(authentication, createTask);
router.route('/').get(authentication, getTaskByUserId);
router.route('/:id').patch(authentication, markAsDone);
router.route('/:id').delete(authentication, deleteTask);

module.exports = router;