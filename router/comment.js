const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dao = require('../dao/comment')

router.post('/api/comment/:messageID', bodyParser.json(), async (req, res) => {
    const userID = req.body.userID
    const content = req.body.content
    const messageID = req.params.messageID
    if (!userID || !content || content.trim() === '' ||!messageID) {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
            try {
                const result1 = await dao.addComment(userID,messageID,content)
                const result2 = await dao.getComment(messageID)
                res.send({
                    error: 0,
                    comments: result2
                })
            } catch (e) {
                console.log(e)
                res.status(403).send({
                    error: 1,
                    message: 'add comment fail.'
                })
            }
        }
})

router.delete('/api/comment/:commentID', bodyParser.json(), async (req, res) => {
    const commentID = req.params.commentID
    if (!commentID) {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
            try {
                const result = await dao.deleteComment(commentID)
                const result2 = await dao.getComment(messageID)
                res.send({
                    error: 0,
                    comments: result2
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

router.get('/api/comment/:messageID', bodyParser.json(), async (req, res) => {
    const messageID = req.params.messageID
    if (!messageID) {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
        const result = await dao.getComment(messageID)
        if (result === null) {
            res.status(404).send({
                error: 1,
                message: 'comment not exsist.'
            })
        } else {
            res.send({
                error: 0,
                comments: result
            })
        }
    }
})

module.exports = router