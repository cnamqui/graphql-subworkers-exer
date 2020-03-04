/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../interfaces/ControllerBase.interface';
import geoip from 'geoip-lite';

import dns from 'dns';

class GeoIpController implements ControllerBase {
    public path = '/geoip';
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
        this._index(req)
            .then((result: any) => {
                res.send(result);
                return next();
            })
            .catch((e: any) => {
                return next(e);
            });
    };
    private _index = (req: Request): Promise<any> => {
        const { address } = req.body;
        return new Promise<any>((resolve, reject) => {
            try {
                dns.lookup(address, (err: NodeJS.ErrnoException | null, result: string) => {
                    const geo = geoip.lookup(result);
                    resolve(geo);
                });
            } catch (e) {
                reject(e);
            }
        });
    };
}

export default GeoIpController;
