export {}
const { ExtractJwt, Strategy } = require('passport-jwt');
const { users, user_types,system_modules,
    package_modules,packages,hospitals } 	    = require('../auth_models');

import {CONFIG} from "../config/config";
const {too}          = require('../services/util.service');
const Logger = require("../logger");

interface options {
    jwtFromRequest?: string 
    secretOrKey?: string;
  }

module.exports = function(passport){
    let opts:options={};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use(new Strategy(opts, async function(jwt_payload, done){
        let err, user;
        [err, user] = await too(users.findOne({where:{id:jwt_payload.id},
            //  include:[
            // { model: users, attributes: ["id", "name"] },
            // {
            //     model: hospitals, attributes: ["id", "fullName", "logo", "packageId"]
            //     , include: [
            //         {
            //             model: packages, attributes: ["name", "details", "cost", "duration", "status"]

            //             , include: [
            //                 {
            //                     model: package_modules,
            //                     include: [
            //                         {
            //                             model: system_modules,
            //                             attributes: {
            //                                 exclude: ["createdAt", "updatedAt", "deletedAt"],
            //                             },
            //                             //where:{status:'hold'}
            //                         },
            //                     ],
            //                     attributes: {
            //                         exclude: ["createdAt", "updatedAt", "deletedAt"],
            //                     },
            //                 },
            //             ],
            //         }

                // ]
            },
        ]}));
        Logger.info("666666666666",user);
        if(err) return done(err, false);
        if(user) {
            return done(null, user);
        }else{
            return done(null, false);
        }
    }));
}