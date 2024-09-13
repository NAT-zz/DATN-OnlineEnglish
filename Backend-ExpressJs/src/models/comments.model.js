const { readFileSync } =  require('fs');
const path = require('path');
const comments = require('./comments.mongo');

const findMaxId = async () => {
    const lastestComment = await comments.findOne().sort('-id');
  
    if(!lastestComment && !(lastestComment instanceof comments)){
      return 0;
    }
    return lastestComment.id;
};

const saveComment = async(comment) => {
    try {
        let getComment = await comments.findOne({
            $or: [ {
                commentType: comment?.commentType,
                idType: comment?.idType
            }, { id: comment?.id } ]
        });

        if(getComment instanceof comments && getComment)
        {
            getComment.commentType = comment?.commentType ? comment.commentType : getComment.commentType;
            getComment.idType = comment?.idType ? comment.idType : getComment.idType;
            if(comment?.content)
            {
                comment.content.forEach(val => {
                    val.time = new Date(Date.now());
                });

                getComment.content = comment.content;
            }

            await getComment.save();
            return getComment;
        }
        else
        {
            comment.content.forEach(val => {
                val.time = new Date(Date.now());
            });

            getComment = await comments.create({
                id: Number(await findMaxId() + 1),
                commentType: comment.commentType,
                idType: comment.idType,
                content: comment?.content ? comment.content : []
            })
            if(getComment instanceof comments && getComment)
                return getComment;
            throw new Error('Unable to create new Comment');
        }
    }catch(err){
        console.error(err.message);
    }
};
    
const initDataComment = async() => {
    console.log('Init comment started');  
    const json = readFileSync(
      path.join(__dirname, '../data/comment.json')
    );
    const readComments = JSON.parse(json.toString());
    for(const prop in readComments)
    {
        await saveComment(readComments[prop]);
    }
};

module.exports = {
    initDataComment,
    findMaxId,
    saveComment
}
