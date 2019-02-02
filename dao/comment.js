const {allPromise, runPromise, md5} = require('../utils/sqlite')

const addComment = async (userID,messageID,content) => {
    await runPromise('insert into comment (userID, messageID, content, commentDate) values ($userID, $messageID, $content, $commentDate)', {
      $userID: userID,  $messageID: messageID, $content: content, $commentDate: new Date().toISOString()
    })
  }

const deleteComment = async (commentID) => {
    await runPromise('delete from comment where commentID=$commentID', {
      $commentID: commentID,
    })
    
  }
  
const getComment = async (messageID) => {
    const result = await runPromise('select commentID,username,content,commentDate from comment inner join user on user.userID=comment.userID where messageID=$messageID',{
        $messageID: messageID
    })
    if (result.length === 0) {
        return null
      } else {
        return result
      }
}
  
  module.exports = {
    addComment,deleteComment,getComment
  }