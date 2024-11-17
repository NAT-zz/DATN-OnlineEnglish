import express from 'express';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import route from '../../routes/index.js';
import cookieParser from 'cookie-parser';
import { CONFIG } from '../../utils/Constants.js';

const __dirname = path.resolve();
const app = express();

app.use(
    cors({
        origin: `${CONFIG.DOMAIN_CLIENT}`,
        credentials: true,
    }),
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use('/audios', express.static('audios'));

// if (process.env.NODE_ENV.trim() == 'production') {
//     app.use(express.static(path.join(__dirname, 'FrontEnd-ReactJs', 'dist')));

//     app.get('*', (req, res) => {
//         res.sendFile(
//             path.resolve(
//                 path.join(__dirname, 'FrontEnd-ReactJs', 'dist', 'index.html'),
//             ),
//         );
//     });
// }

app.get('/test/chat', (req, res) => {
    res.sendFile(
        path.resolve(path.join(__dirname, 'src', 'test index 3.html')),
    );
});
process.on('warning', (e) => console.warn(e.stack));
route(app);
export default app;
