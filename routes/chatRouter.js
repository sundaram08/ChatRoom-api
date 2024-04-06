const express = require('express')
const router  = express.Router()

const {
    getAllMessages,
    createMessage
} = require('../controllers/chatControl')

router.route('/').get(getAllMessages).post(createMessage)

module.exports=router;