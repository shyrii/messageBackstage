const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
// const multer = require('multer')
// const parser = multer()
const daoMessage = require('../dao/message')
const daoUser = require('../dao/user')

router.post('/api/message', bodyParser.json(), async (req, res) => {
    const userID = req.body.userID
    const content = req.body.content
    if (req.session.user === parseInt(userID)) {
        if (!userID || !content || content.trim() === '') {
            res.status(400).send({
                error: 1,
                message: 'Bad Request.'
            })
        } else {
            try {
                const result1 = await daoMessage.leaveMessage(userID, content)
                const result2 = await daoUser.getIndex()
                // const result3 = await daoUser.getMyMessage(userID)
                res.send({
                    error: 0,
                    messages: result2,
                    // myMessages: result3,
                })
            } catch (e) {
                console.log(e)
                res.status(403).send({
                    error: 1,
                    message: 'add message fail.'
                })
            }
        }
    } else {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
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
            const result1 = await daoMessage.deleteMessage(messageID)
            const result2 = await daoUser.getIndex()
            // const result3 = await daoUser.getMyMessage(userID)
            res.send({
                error: 0,
                messages: result2,
                // myMessages: result3,
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