const { readFileSync } =  require('fs');
const path = require('path');
const rates = require('./rates.mongo');

const findMaxId = async () => {
    const latestRate = await rates.findOne().sort('-id');
  
    if(!latestRate || !(latestRate instanceof rates)){
      return 0;
    }
    return latestRate.id;
};

const saveRate = async(rate) => {
    try {
        let getRate = await rates.findOne({
            $or: [ {
                type: rate?.type,
                idType: rate?.idType
            }, { id: rate?.id } ]
        });

        if(getRate instanceof rates && getRate)
        {
            getRate.type = rate?.type ? rate.type : getRate.type;
            getRate.idType = rate?.idType ? rate.idType : getRate.idType;
            getRate.content = rate?.content ? rate.content : getRate.content;

            await getRate.save();
            return getRate;
        }
        else
        {
            getRate = await rates.create({
                id: Number(await findMaxId() + 1),
                type: rate.type,
                idType: rate.idType,
                content: rate.content
            })
            if(getRate instanceof rates && getRate)
                return getRate;
            throw new Error('Unable to create new Rate');
        }
    }catch(err){
        console.error(err.message);
    }
};
    
const initDataRate = async() => {
    console.log('Init rate started');  
    const json = readFileSync(
      path.join(__dirname, '../data/rate.json')
    );
    const readRates = JSON.parse(json.toString());
    for(const prop in readRates)
    {
        await saveRate(readRates[prop]);
    }
};

module.exports = {
    initDataRate,
    findMaxId,
    saveRate
}
