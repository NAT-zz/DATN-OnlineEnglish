import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { saveRate } from '../../models/rates.model.js';

import { RATE_TYPE } from '../../utils/Constants.js';
import rates from '../../models/rates.mongo.js';
import users from '../../models/users.mongo.js';

const getRate = async (req, res) => {
    try {
        if (!req.params.type || !req.params.id)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type and id must be provided',
            });
        const type = req.params.type.toUpperCase();
        const id = req.params.id;
        if (!(type in RATE_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type not found',
            });
        const getRate = await saveRate({
            type,
            idType: id,
        });
        if (getRate instanceof rates && getRate) {
            let calRate = 0;
            getRate.content.forEach((val) => {
                calRate += val.rateCount;
            });
            return makeSuccessResponse(res, StatusCodes.OK, {
                data: (calRate / (getRate.content.length || 1)).toFixed(1),
            });
        }
        throw new Error('Something went wrong');
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: error.message,
        });
    }
};

const rate = async (req, res) => {
    try {
        if (!req.params.type || !req.params.id || !req.params.rateCount)
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type, id and rate must be provided',
            });
        const type = req.params.type.toUpperCase();
        const id = req.params.id;
        const rateCount = req.params.rateCount;
        if (!(type in RATE_TYPE))
            return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
                message: 'Type not found',
            });
        const reqUserName = req?.userData?.sub;
        const getUser = await users.findOne({ userName: reqUserName });
        if (getUser instanceof users && getUser) {
            const getRate = await saveRate({
                type,
                idType: id,
            });

            if (getRate instanceof rates && getRate) {
                if (getRate.content.find((val) => val.idUser == getUser.id)) {
                    getRate.content[
                        getRate.content.indexOf(
                            getRate.content.find(
                                (val) => val.idUser == getUser.id,
                            ),
                        )
                    ].rateCount = rateCount;
                } else {
                    getRate.content.push({
                        idUser: getUser.id,
                        rateCount,
                    });
                }
                await getRate.save();
                return makeSuccessResponse(res, StatusCodes.OK, {
                    message: `Your rate for this ${type.toLowerCase()} has been submitted`,
                });
            }
            throw new Error('Something went wrong');
        }
        return makeSuccessResponse(res, StatusCodes.FORBIDDEN, {
            message: 'No user found',
        });
    } catch (error) {
        console.log(error);
        return makeSuccessResponse(res, StatusCodes.BAD_REQUEST, {
            message: error.message,
        });
    }
};

export { getRate, rate };
