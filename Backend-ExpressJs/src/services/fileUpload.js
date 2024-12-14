import cloudinary from 'cloudinary';
import { StatusCodes } from 'http-status-codes';
import stream from 'stream';

cloudinary.config({
    cloud_name: 'natscloud',
    api_key: '669999992192735',
    api_secret: '7-zbW0Pat43_axsYVZ2ULRTe5zY',
    secure: true,
});

const streamUpload = (type, file, folderName) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    return new Promise((resolve, reject) => {
        let streamUL = cloudinary.v2.uploader.upload_stream(
            {
                resource_type: type,
                folder: folderName,
                use_filename: true,
            },
            (error, result) => {
                if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(error);
                }
            },
        );
        bufferStream.pipe(streamUL);
        bufferStream.end();
    });
};

import multer from 'multer';
import path from 'path';
import { makeSuccessResponse } from '../utils/Response.js';
const __dirname = path.resolve();

// Set up storage configuration for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Destination folder to store uploaded files
        cb(null, path.join(__dirname, `src/uploads/`)); // Make sure the 'uploads' folder exists in your project
    },
    filename: (req, file, cb) => {
        // Save the file with original name (you can also add timestamp or random string)
        cb(null, Date.now() + path.extname(file.originalname)); // For unique filenames
    },
});

// Set up multer without file filtering (accept any file)
const fileUploadExt = multer({
    storage: storage,
});

const uploadFileExt = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }

    const filePath = path.join(__dirname, `src/uploads/${req.file.filename}`);
    await cloudinary.v2.uploader.upload(
        filePath,
        { resource_type: 'raw' },
        function (error, result) {
            if (error) {
                console.log('Error in uploadFile: ', error.message);
                return makeSuccessResponse(
                    res,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    {
                        message: 'Server error, please try again later!',
                    },
                );
            }
            return makeSuccessResponse(res, StatusCodes.OK, {
                message: 'File uploaded',
                data: result.secure_url,
            });
        },
    );
};

export { streamUpload, fileUploadExt, uploadFileExt };
