const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const authRouter = require('./route/authRoute');
const taskRouter = require('./route/taskRoute');
const catchAsync = require('./utils/catchAsync');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.json());

// all routes will be here
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/task', taskRouter);

app.use(catchAsync(async (req, res, next) => {
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
}));

// error handling
app.use(globalErrorHandler);

const PORT = process.env.APP_PORT || 5000;

app.listen(PORT, () => {
    console.log("Server up and running", PORT);
});
