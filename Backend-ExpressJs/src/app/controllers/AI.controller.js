import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import ollama from 'ollama';

const generate = async (req, res) => {
    try {
        const { content } = req.body;

        const response = await ollama.chat({
            model: 'llama3.2:1b',
            messages: [{ role: 'user', content: content }],
            temperature: 0.9,
            max_tokens: 50,
            n: 1,
            stop: ['</s>'],
            stream: true,
        });

        return makeSuccessResponse(res, StatusCodes.OK, {
            data: response.message.content,
        });
    } catch (error) {
        console.log('Error in generate: ', error.message);
        return makeSuccessResponse(res, StatusCodes.INTERNAL_SERVER_ERROR, {
            message: 'Server error, please try again later!',
        });
    }
};

export { generate };
