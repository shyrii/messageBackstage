const {allPromise, runPromise, md5} = require('../utils/sqlite')

const leaveMessage = async (userID, content) => {
    await runPromise('insert into message (userID, content,messageDate) values ($userID, $content,$messageDate)', {
      $userID: userID, $content: content,$messageDate: new Date().toISOString()
    })
  }

const deleteMessage = async (messageID) => {
    await runPromise('delete from message where messageID=$messageID', {
      $messageID: messageID,
    })
    
  }
  

  
  module.exports = {
    leaveMessage,deleteMessage
  }