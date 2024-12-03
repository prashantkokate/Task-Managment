const { handleCreateSuccess, handleUpdateSuccess, handleErrors } = require('../helpers/general.helper') 
const { Task } = require('../models/index.model')

const createTask = async ( req, res, next ) => {
    try {
        const { title, description, status } = req.body
        const task = new Task({ title: title, description: description, status})
        await task.save()
        return handleCreateSuccess( res, 'Task created successfully', task )
    } catch (error) {
        next(error)
    }
}

const getAllTasks = async ( req, res, next ) => {
    try {
        const tasks = await Task.find()
        if(tasks.length == 0){
            return handleErrors( res, 'No tasks found', tasks )
        }
        return handleUpdateSuccess( res, 'Tasks retrieved successfully', tasks )
    } catch (error) {
        next(error)
    }
}

const updateTask = async ( req, res, next ) => {
    try {
        const { title, description, status } = req.body
        const { id } = req.params
        const task = await Task.findByIdAndUpdate(id, { title, description, status }, { new:false })
        if(!task){
            return handleErrors( res, 'Task not found')
        }
        return handleUpdateSuccess( res, 'Task updated successfully', task )
    } catch (error) {
        next(error)
    }
}

const deleteTask = async ( req, res, next ) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id)
        if(!task){
            return handleErrors( res, 'Task not found')
        }
        return handleUpdateSuccess( res, 'Task deleted successfully',{})
    } catch (error) {
        next(error)
    }
}

const filterTasks = async ( req, res, next ) => {
    try {
        const { status } = req.params
        const tasks = await Task.find({
            status: status
        })
        
        if( tasks.length == 0 ) {
            return handleErrors( res, 'No tasks found', tasks )
        }

        return handleUpdateSuccess( res, "Tasks filtered successfully", tasks )
    } catch (error) {
        next(error)
    }
}
  
module.exports = {
    createTask,
    updateTask,
    getAllTasks,
    deleteTask,
    filterTasks
}

