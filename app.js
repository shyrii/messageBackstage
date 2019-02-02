const express = require('express')
const user = require('./router/user')
const message = require('./router/message')
const comment = require('./router/comment')
const like = require('./router/like')
const app = express()
const session = require('express-session')


app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuratioin: 5 * 60 * 1000,
}))
app.use(user)
app.use(message)
app.use(comment)
app.use(like)
app.listen(8080)

console.log('App is running on 8080')
