const { allPromise, runPromise, md5 } = require('../utils/sqlite')

const userInfo = async (username, password) => {
  const result = await allPromise('select userID,username from user where username=$username and password=$password', {
    $username: username,
    $password: md5(password)
  })
  if (result.length === 0) {
    return null
  } else {
    return result[0]
  }
}

const likeMessage = async (username, password) => {
  const result = await allPromise('select messageID from user inner join like on user.userID=like.userID where username=$username and password=$password', {
    $username: username,
    $password: md5(password)
  })
  if (result.length === 0) {
    return null
  } else {
    return result
  }
}

const message = async (username, password) => {
  const result = await allPromise('select messageID from user inner join message on user.userID=message.userID where username=$username and password=$password', {
    $username: username,
    $password: md5(password)
  })
  if (result.length === 0) {
    return null
  } else {
    return result
  }
}

const register = async (username, password) => {
  await runPromise('insert into user (username, password) values ($username, $password)', {
    $username: username, $password: md5(password)
  })
}

const getIndex = async (userID) => {
  const result = await runPromise('select messageID, username, content, messageDate, likeUserID from (message left join user on message.userID = user.userID) left join (select userID as likeUserId, messageID as likeMessageID from `like` where userID = $userID) on likeMessageID = messageID', {
    $userID: userID
  })
  if (result.length === 0) {
    return null
  } else {
    return result
  }
}

const getLikeMessage = async (userID) => {
  const result = await allPromise('select messageID from user inner join like on user.userID=like.userID where user.userID=$userID', {
    $userID: userID
  })
  if (result.length === 0) {
    return null
  } else {
    return result
  }
}

const getMyMessage = async (userID) => {
  const result = await allPromise('select messageID from user inner join message on user.userID=message.userID where user.userID=$userID', {

    $userID: userID
  })
  if (result.length === 0) {
    return null
  } else {
    return result
  }
}
module.exports = {
  userInfo, likeMessage, message, register, getIndex, getLikeMessage, getMyMessage
}