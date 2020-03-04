import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../interfaces/ControllerBase.interface';
import tcpp from 'tcp-ping';

class PingController implements ControllerBase {
    public path = '/ping';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes(): void {
        this.router.post(this.path + '/', this.index);
        this.router.get(this.path + '/', this.testRoute);
    }

    testRoute = (req: Request, res: Response, next: NextFunction): void => {
        req.body.address = 'google.com';
        this.index(req, res, next);
    };

    index = (req: Request, res: Response, next: NextFunction): void => {
        const { address } = req.body;

        tcpp.ping({ address }, function(err, data) {
            if (err) {
                // console.log(`An Error has occured: ${err}`);
                // console.log(err);
                return next(err);
            } else {
                res.send(data);
                next();
            }
        });
    };
}

export default PingController;
