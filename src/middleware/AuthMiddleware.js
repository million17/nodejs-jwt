/**
 * Created by trieu.ngoquang author on 12/3/20 - 09:54.
 * nodejs-jwt
 */
const jwtHelper = require('../helpers/jwt.helper');
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

/**
 * isAuth
 * @param req
 * @param res
 * @param next
 * @returns {Promise<this>}
 */
const isAuth = async (req, res, next) => {
    //Check token tren header
    const tokenFromClient = req.body.token || req.query.token || req.headers['x-access-token'];

    if (tokenFromClient) {
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

            req.jwtDecoded = decoded;

            next();
        } catch (err) {
            debug('error while verify token', err);
            return res.status(401).json({
                message: 'Unauthorized',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No Token Provided. ',
        })
    }
}

module.exports = {
    isAuth: isAuth,
}