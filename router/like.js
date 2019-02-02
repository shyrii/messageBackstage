const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const dao = require('../dao/like')

router.post('/api/like/:userID', bodyParser.json(), async (req, res) => {
    const userID = req.params.userID
    const messageID = req.body.messageID
    if (req.session.user === parseInt(userID)) {
        if (!userID || !messageID) {
            res.status(400).send({
                error: 1,
                message: 'Bad Request.'
            })
        } else {
            try {
                const result = await dao.addLike(userID, messageID)
                res.send({
                    error: 0
                })
            } catch (e) {
                console.log(e)
                res.status(403).send({
                    error: 1,
                    message: 'add like fail.'
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

router.delete('/api/cancel/:userID', bodyParser.json(), async (req, res) => {
    const userID = req.params.userID
    const messageID = req.body.messageID
    if (!messageID || !userID) {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
        try {
            const result = await dao.deleteLike(userID, messageID)
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