/* eslint-disable @typescript-eslint/no-explicit-any */
import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import ControllerBase from '../../interfaces/ControllerBase.interface';
import whois from 'whois-rdap';

import dns from 'dns';

class RDAPController implements ControllerBase {
    public path = '/rdap';
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
        dns.lookup(address, function(err, result) {
            const w = new whois();
            w.check(result)
                .then((rdap: any) => {
                    res.send(rdap.rdap);
                })
                .catch((e: any) => {
                    next(e);
                });
        });
    };
}

export default RDAPController;
