const { tasks } = require('../controllers/index.controller') 
const { validateTaskCreate, validateTaskUpdate, validateDeleteTask } = require('../services/validation.service')  
const express = require('express')
const taskRouter = express.Router()                      
// task routes
taskRouter.post('/tasks', validateTaskCreate, tasks.createTask) 
taskRouter.get('/tasks', tasks.getAllTasks) 
taskRouter.put('/tasks/:id', validateTaskUpdate,  tasks.updateTask)
taskRouter.delete('/tasks/:id', validateDeleteTask,  tasks.deleteTask)
taskRouter.get('/tasks/status/:status', tasks.filterTasks)

module.exports = taskRouter 

