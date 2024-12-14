import { streamUpload } from '../../services/fileUpload.js';
import { StatusCodes } from 'http-status-codes';
import { makeSuccessResponse } from '../../utils/Response.js';

const uploadFile = async (req, res, next) => {
    try {
        if (req.file) {
            const { mimetype } = req.file;
            let fileType = mimetype.split('/')[0].trim();
            if (fileType === 'application') fileType = 'raw';
            else if (fileType !== 'image' && fileType !== 'video')
                fileType = 'auto';
            console.log(fileType);

            const fileUrl = await streamUpload(fileType, req.file, 'file');

            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'File uploaded',
                data: fileUrl,
            });
        } else {
            return makeSuccessResponse(res, StatusCodes.NOT_FOUND, {
                message: 'No file found',
            });
        }
    } catch (error) {
        console.log('Error in uploadFile: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

export { uploadFile };
