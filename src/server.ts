import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger' 

import PingController from './controllers/ping/ping.controller'
import GeoIpController from './controllers/geoip/geoip.controller'
import RDAPController from './controllers/rdap/rdap.controller'

const app = new App({
    port: Number(process.env.PORT) || 5000,
    controllers: [
        new PingController(),
        new GeoIpController(),
        new RDAPController()
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
})

app.listen()