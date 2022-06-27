import http from 'http';
import 'reflect-metadata';
import HTTPRouter from './router/HTTPRouter';

const port = 3031;

const httpServer = http.createServer((req, res) => HTTPRouter.router(req, res));

httpServer.listen(port, () => {
    console.info(`http server running at http://localhost:${port}`);
});
