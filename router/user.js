const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const multer = require('multer')
const parser = multer()
const dao = require('../dao/user')



// const middle1 = (req, res, next) => {
//     res.status(300)
//     console.log(1)
//     next()
// }

router.post('/api/login', bodyParser.json(), async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (!username || username.trim() === '' || !password || password.trim() === '') {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
        const result1 = await dao.userInfo(username, password)
        // const result2 = await dao.likeMessage(username, password)
        // const result3 = await dao.message(username, password)

        if (result1 === null) {
            res.status(404).send({
                error: 1,
                message: 'User not exsist or password is not correct.'
            })
        } else {
            req.session.user = result1.userID
            res.send({
                error: 0,
                userInfo: result1,
                // likeMessageID: result2,
                // messageID: result3
            })
        }
    }
})

router.post('/api/register', bodyParser.json(), async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    // const checkPassword = req.body.checkPassword
    if (!username || username.trim() === '' || !password || password.trim() === '') {
        res.status(400).send({
            error: 1,
            message: 'Bad Request.'
        })
    } else {
        try {
            const result = await dao.register(username, password)
            res.send({
                error: 0
            })
        } catch (e) {
            console.log(e)
            res.status(403).send({
                error: 1,
                message: 'Register fail: the username has already registered.'
            })
        }
    }
})

router.get('/api/index/:userID', bodyParser.json(), async (req, res) => {
    const userID = req.params.userID
    if (req.session.user === parseInt(userID)) {
        const result = await dao.getIndex(userID)
        if (result === null) {
            res.status(404).send({
                error: 1,
                message: 'message not exsist.'
            })
        } else {
            res.send({
                error: 0,
                messages: result
            })
        }
    } else {
        res.status(401).send({
            error: 1,
            message: 'Unauthorized.'
        })
    }

})

router.get('/api/myMessage/:userID', bodyParser.json(), async (req, res) => {
    const userID = req.params.userID
    const result = await dao.getMyMessage(userID)
    if (result === null) {
        res.status(404).send({
            error: 1,
            message: 'error.'
        })
    } else {
        res.send({
            error: 0,
            myMessages: result
        })
    }
})

router.get('/api/myLikeMessage/:userID', bodyParser.json(), async (req, res) => {
    const userID = req.params.userID
    const result = await dao.getLikeMessage(userID)
    if (result === null) {
        res.status(404).send({
            error: 1,
            message: 'error.'
        })
    } else {
        res.send({
            error: 0,
            likeMessageID: result
        })
    }
})

router.get('/api/logout',bodyParser.json(),async(req,res) => {
    req.session.destroy();
    res.send({
        error: 0,
    })
})
module.exports = router