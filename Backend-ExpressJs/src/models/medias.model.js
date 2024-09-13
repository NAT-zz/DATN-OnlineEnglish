const { readFileSync } =  require('fs');
const path = require('path');
const medias = require('./medias.mongo');
const multer = require('multer');

const { CLOUDINARY_URL } = require('../utils/Constants');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'natscloud', 
  api_key: '669999992192735', 
  api_secret: '7-zbW0Pat43_axsYVZ2ULRTe5zY',
  secure: true,
});

const streamifier = require('streamifier');

const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream({ resource_type: "auto" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
      streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const findMaxId = async () => {
    const latestMedia = await medias.findOne().sort('-id');
  
    if(!latestMedia && !(latestMedia instanceof medias)){
      return 0;
    }
    return latestMedia.id;
};

const saveMedia = async(media) => {
    try {
        let getMedia = await medias.findOne({
            titlePicture: media?.titlePicture,
        });

        if(getMedia instanceof medias && getMedia)
        {
            getMedia.audio = media?.audio ? media.audio : getMedia.audio;
            getMedia.transcript = media?.transcript ? media.transcript : getMedia.transcript;

            await getMedia.save();
            return getMedia.id;
        }
        else
        {
            getMedia = await medias.create({
                id: Number(await findMaxId() + 1),
                titlePicture: media.titlePicture,
                transcript: media.transcript,
                audio: media.audio
            })
            if(getMedia instanceof medias && getMedia)
                return getMedia.id;
            throw new Error('Unable to create new Media!');
        }
    }catch(err){
        console.error(err.message);
    }
};
    
const initDataMedia = async() => {
    console.log('Init media started');  
    const json = readFileSync(
      path.join(__dirname, '../data/media.json')
    );
    const readmedias = JSON.parse(json.toString());
    for(const prop in readmedias)
    {
        await saveMedia(readmedias[prop]);
    }
};

module.exports = {
    initDataMedia,
    findMaxId,
    streamUpload,
    saveMedia
}
