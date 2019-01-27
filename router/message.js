const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// const multer = require('multer')
// const parser = multer()
const dao = require('../dao/message')

router.post('/api/message', bodyParser.json(), async (req, res) => {
    const userID = req.body.userID
    const content = req.body.content
    if (!userID || !content || content.trim() === '') {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
            try {
                const result = await dao.leaveMessage(userID, content)
                res.send({
                    error: 0
                })
            } catch (e) {
                console.log(e)
                res.status(403).send({
                    error: 1,
                    message: 'add message fail.'
                })
            }
        }
})

router.delete('/api/message/:messageID', bodyParser.json(), async (req, res) => {
    const messageID = req.params.messageID
    if (!messageID) {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
            try {
                const result = await dao.deleteMessage(messageID)
                res.send({
                    error: 0
                })
            } catch (e) {
                console.log(e)
                res.status(403).send({
                    error: 1,
                    message: 'delete fail.'
                })
            }
        }
})
module.exports = router