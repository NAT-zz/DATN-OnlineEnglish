import cloudinary from 'cloudinary';
import stream from 'stream';

cloudinary.config({
    cloud_name: 'natscloud',
    api_key: '669999992192735',
    api_secret: '7-zbW0Pat43_axsYVZ2ULRTe5zY',
    secure: true,
});

import streamifier from 'streamifier';

const streamUpload = (file, folderName) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    return new Promise((resolve, reject) => {
        let streamUL = cloudinary.v2.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: folderName,
                use_filename: true,
            },
            (error, result) => {
                if (result) {
                    resolve(result.secure_url);
                } else {
                    reject(error);
                    throw error;
                }
            },
        );
        bufferStream.pipe(streamUL);
        bufferStream.end();
    });
};

export { streamUpload };
