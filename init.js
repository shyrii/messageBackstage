const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('user.sqlite')

db.run(`create table user (
    userID INTEGER PRIMARY KEY autoincrement,
    username TEXT UNIQUE, 
    password TEXT
  )`
)

db.run(`create table message (
  messageID INTEGER PRIMARY KEY autoincrement,
  userID INTEGER , 
  content TEXT,
  messageDate DATETIME ,
  FOREIGN KEY (userID) REFERENCES user(userID)
)`
)

db.run(`create table like (
  userID INTEGER ,
  messageID INTEGER ,
  FOREIGN KEY (userID) REFERENCES user(userID)
)`
)

db.run(`create table comment (
  commentID INTEGER PRIMARY KEY autoincrement,
  userID INTEGER ,
  messageID INTEGER ,
  content TEXT,
  commentDate DATETIME ,
  FOREIGN KEY (userID) REFERENCES user(userID) ,
  FOREIGN KEY (messageID) REFERENCES message(messageID)
)`
)