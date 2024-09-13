const { readFileSync } =  require('fs');
const path = require('path');
const topics = require('./topics.mongo');

const findMaxId = async () => {
    const latestTopic = await topics.findOne().sort('-id');
  
    if(!latestTopic && !(latestTopic instanceof topics)){
      return 0;
    }
    return latestTopic.id;
};

const saveTopic = async(topic) => {
    try {
        let getTopic = await topics.findOne({
            name: topic?.name,
            topicSkill: topic?.topicSkill
        });

        if(getTopic instanceof topics && getTopic)
        {
            getTopic.name = topic?.name ? topic.name : getTopic.name;
            getTopic.preview = topic?.preview ? topic.preview : getTopic.preview;
            getTopic.topicSkill = topic?.topicSkill ? topic.topicSkill : getTopic.topicSkill;
            getTopic.level = topic?.level ? topic.level : getTopic.level;
            getTopic.instruction = topic?.instruction ? topic.instruction : getTopic.instruction;
            getTopic.preparationTask = topic?.preparationTask ? topic.preparationTask : getTopic.preparationTask;
            getTopic.tasks = topic?.tasks ? topic.tasks : getTopic.tasks;
            getTopic.media = topic?.media ? topic.media : getTopic.media;
            getTopic.idProvider = topic?.idProvider ? topic.idProvider : getTopic.idProvider;

            await getTopic.save();
            return getTopic.id;
        }
        else
        {
            getTopic = await topics.create({
                id: Number(await findMaxId() + 1),
                name: topic.name,
                preview: topic.preview,
                topicSkill: topic.topicSkill,
                level: topic.level,
                titlePicture: topic.titlePicture,
                instruction: topic.instruction,
                preparationTask: topic.preparationTask,
                tasks: topic.tasks,
                media: topic.media,
                idProvider: topic?.idProvider ? topic.idProvider : 1
            })
            if(getTopic instanceof topics && getTopic)
                return getTopic.id;
            throw new Error('Unable to create new Topic!');
        }
    }catch(err){
        console.error(err.message);
    }
};
    
const initDatatopic = async() => {
    console.log('Init topic started');  
    const json = readFileSync(
      path.join(__dirname, '../data/topic.json')
    );
    const readtopics = JSON.parse(json.toString());
    for(const prop in readtopics)
    {
        await saveTopic(readtopics[prop]);
    }
};

module.exports = {
    initDatatopic,
    findMaxId,
    saveTopic
}
