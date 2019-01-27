const {allPromise, runPromise, md5} = require('../utils/sqlite')

const addLike = async (userID,messageID) => {
    await runPromise('insert into like (userID, messageID) values ($userID, $messageID)', {
      $userID: userID,  $messageID: messageID
    })
  }

const deleteLike = async (userID,messageID) => {
    await runPromise('delete from like where messageID=$messageID and userID=$userID', {
      $userID: userID, $messageID: messageID,
    })
    
  }
  
  module.exports = {
    addLike,deleteLike
  }