
const handleCreateSuccess = (res, messsage, data) => {
    return res.status(201).json({
        status:true,
        message: messsage,
        data:data
    })

}

const handleUpdateSuccess = (res, messsage, data) => {
    return res.status(200).json({
        status:true,
        message: messsage,
        data:data
    })

}

const handleErrors = (res, messsage) => {
    res.status(400).json({
        status: false,
        message: messsage,
        data: {},
    })
    return
}

module.exports = {
    handleCreateSuccess,
    handleUpdateSuccess,
    handleErrors,
}