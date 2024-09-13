const { makeSuccessResponse } = require('../../utils/Response');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');
const { streamUpload } = require('../../models/medias.model');
const { saveTip } = require('../../models/tips.model');
const tips = require('../../models/tips.mongo');
const users = require('../../models/users.mongo');

const getTipById = async(req, res) => {
    try{
        if(!req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Id must be provided'
            });
        const reqId = req.params.id;
        const getTip = await tips.findOne({ id: reqId }, ("-_id -__v"));
        if(getTip instanceof tips && getTip)
        {
            const getUser = await users.findOne({ id: getTip.idProvider });
            let listBeauty = {};
            Object.assign(listBeauty, {
                name: getTip.name,
                picture: getTip.picture,
                preview: getTip.preview,
                content: getTip.content
            });
            if(getUser instanceof users && getUser)
                Object.assign(listBeauty, {
                    provider: {
                        fullname: getUser.fullName,
                        avatar: getUser.avatar
                    }
                });
                
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: listBeauty
            });
        }
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: `Cannot find tip with id ${reqId}` 
        });

    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message
        });
    }
};

const getAllTip = async(req, res) => {
    try {
        const limit = req.query.limit || 0;
        const skip = req.query.skip || 0;

        const getTips = await tips.find({ }, ("-_id -__v -content"), {
            limit,
            skip: skip*limit
        });
        if(getTips.length >= 1)
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: getTips
            });
        return makeSuccessResponse(res, StatusCodes.OK,{
            message: 'No topics found',
        });

    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message
        }); 
    }
};

const createTip = async(req, res) => {
    try{
        if(!req.body)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'No data found'
            });
        const data = req.body;
        if(!data.name || !data.content || !data.preview || !req.file)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing required information'
            });
        data.content = JSON.parse(data.content.toString());
        if(data.content.length == 0 || !data.content.every(val => (val.title && val.content)))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Missing tilte or content'
            });
        if(!req.userData)
            return makeSuccessResponse(res, StatusCodes.UNAUTHORIZED, {
                message: 'You must login first'
            });
        const getUser = await users.findOne({ userName: req.userData.sub });
        if(getUser instanceof users && getUser)
        {   
            const uploadFile = await streamUpload(req.file);
            const tipId = await saveTip({
                name: data.name,
                picture: uploadFile.url,
                content: data.content,
                preview: data.preview,
                idProvider: getUser.id
            });
            if(tipId)
                return makeSuccessResponse(res, StatusCodes.OK, {
                    data: tipId
                });
            throw new Error("Something went wrong");
        }
        else 
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'User not found'
            });

    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message
        }); 
    }
};

const editTip = async(req, res) => {
    try{
        if(!req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Id must be provided'
            });
        const reqId = req.params.id;
        if(!req.body)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'No data found'
            });
        const data = req.body;
        if(data.content)
        {
            data.content = JSON.parse(data.content.toString());
            if(!data.content.every(val => (val.title && val.content)) || data.content.length === 0)
                return makeSuccessResponse(res, StatusCodes.BAD_GATEWAY, {
                    message: 'Content or title must be provided'
                });
        } 
        const tipId = await saveTip({
            id: reqId,
            picture: req?.file ? (await streamUpload(req.file)).url : null,
            ...data
        })
        if(tipId)
            return makeSuccessResponse(res, StatusCodes.OK, {
                        message: `Tip with id ${reqId} has been updated successfully`
                    });
        throw new Error('Something went wrong');
        
    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message
        });
    }
};

const deleteTip = async(req, res) => {
    try{
        if(!req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Id must be provided'
            });
        const reqId = req.params.id;
        const deletedCount = (await tips.deleteOne({ id: reqId })).deletedCount;
        if(deletedCount)
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: `Tip with id ${reqId} has been deleted successfully`
            });
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: `No tip found with id ${reqId}`
        });

    }catch(error)
    {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: error.message
        }); 
    }
};

module.exports = {
   getTipById,
   getAllTip,
   createTip,
   editTip,
   deleteTip
}