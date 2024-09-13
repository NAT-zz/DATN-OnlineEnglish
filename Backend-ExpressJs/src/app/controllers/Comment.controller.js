const { makeSuccessResponse } = require('../../utils/Response');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const comments = require('../../models/comments.mongo');
const users = require('../../models/users.mongo');
const { RATE_TYPE } = require('../../utils/Constants');
const { saveComment } = require('../../models/comments.model');

const getComment = async(req, res) => {
    try{
        if(!req.params.type || !req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type and id must be provided'
            });
        const type = req.params.type.toUpperCase();
        const id = req.params.id;
        if(!(type in RATE_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type not found'
            });

        const getCom = await comments.findOne({
            commentType: type,
            idType: id
        }, ("-_id -__v"));
        if(getCom instanceof comments && getCom)
        {
            const listBeauty = [];
            for(const val of getCom.content)
            {
                const getUser = await users.findOne({ id: val.idUser });
                if(getUser instanceof users && getUser)
                {
                    listBeauty.push({
                        username: getUser.userName,
                        avatar: getUser.avatar,
                        content: val.content
                    });   
                }
            }
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: listBeauty
            })
        }
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: `No comment found for type ${type} and id ${id}`
        });


    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message
        });
    }
};

const comment = async(req, res) => {
    try{
        if(!req.params.type || !req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type and id must be provided'
            });
        if(!req.body.data || !req.body.data.content)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'No data and or content found'
            });
        const type = req.params.type.toUpperCase();
        const id = req.params.id;
        const content = req.body.data.content;

        if(!(type in RATE_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type not found'
            });

        let initCom = await saveComment({
            commentType: type,
            idType: id,
        });
        if(initCom)
        {
            const getUser = await users.findOne({ userName: req.userData.sub });
            if(getUser instanceof users && getUser)
            {
                initCom.content.push({
                    idUser: getUser.id,
                    content
                })
                initCom = await saveComment(initCom);
                if(initCom)
                    return makeSuccessResponse(res, StatusCodes.OK, {});
                throw new Error('Something went wrong');
            }
            return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                message: 'You must login first'
            });

        }
        throw new Error('Something went wrong');
        
    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message
        });
    }

};

module.exports = {
    getComment,
    comment
}