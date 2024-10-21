import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import route from '../../routes/index.js';
import cookieParser from 'cookie-parser';
import { CONFIG } from '../../utils/Constants.js';
import { app } from '../../services/socket.js';

const __dirname = path.resolve();

app.use(
    cors({
        origin: `${CONFIG.DOMAIN_CLIENT}`,
        credentials: true,
    }),
);
app.use(morgan('combined'));
app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV.trim() == 'production') {
    app.use(express.static(path.join(__dirname, 'FrontEnd-ReactJs', 'dist')));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(
                path.join(__dirname, 'FrontEnd-ReactJs', 'dist', 'index.html'),
            ),
        );
    });
}
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', '..', '..', 'public', 'index.html'))
// })

route(app);
export default app;
