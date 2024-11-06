import { makeSuccessResponse } from '../../utils/Response.js';
import { StatusCodes } from 'http-status-codes';
import ollama from 'ollama';

const model = 'Ebot_v1:latest';
let messages = [];

const generateChat = async (req, res) => {
    try {
        const { content } = req.body;
        messages.push({ role: 'user', content: content });

        const response = await ollama.chat({
            model,
            messages,
            stream: true,
        });

        for await (const part of response) {
            process.stdout.write(part.message?.content);
        }

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

export { generateChat };
