import { Express, Request, Response, NextFunction } from 'express';

export default (app: Express) => {
    app.use((error: any, _request: Request, response: Response, next: NextFunction) => {
        if (error) {

            if (error.status === 401) {
                response.statusCode = 401;
                const msg = {
                    error: error.message || 'Unauthorized',
                };
                msg.error = error.name ? `${error.name}: ${error.message}` : error.message;
                response.end(JSON.stringify(msg));
            }
        }
        next();
    });
};
