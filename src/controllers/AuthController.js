/**
 * Created by trieu.ngoquang author on 12/3/20.
 * nodejs-jwt
 */
const jwtHelper = require('../helpers/jwt.helper');
const debug = console.log.bind(console);

const tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

/**
 * login
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const login = async (req, res) => {
    try {
        console.log(req.body)
        debug(`Đang giả lập hành động đăng nhập thành công với Email: ${req.body.email} và Password: ${req.body.password}`);

        const userFakeData = {
            _id: '123_@#fdsadas21312dd',
            name: 'trieu ngo quang',
            email: req.body.email,
        }

        debug(`Thực hiện tạo mã Token, [thời gian sống 1 giờ.]`);
        const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
        console.log('accessToken', accessToken)

        debug(`Thực hiện tạo mã Refresh Token, [thời gian sống 10 năm] =))`);
        const refreshToken = await jwtHelper.generateToken(userFakeData, refreshTokenSecret, refreshTokenLife);

        tokenList[refreshToken] = {accessToken, refreshToken};

        debug(`Gửi Token và Refresh Token về cho client...`);
        return res.status(200).json({accessToken, refreshToken});
    } catch (err) {
        return res.status(500).json(err);
    }
}

/**
 * refreshToken
 * @param req
 * @param res
 * @returns {Promise<this>}
 */
const refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;

    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const userFakeData = decoded.data;
            debug(`Thực hiện tạo mã Token trong bước gọi refresh Token, [thời gian sống vẫn là 1 giờ.]`);
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);

            return res.status(200).json({accessToken});
        } catch (err) {
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    }
}

module.exports = {
    login: login,
    refreshToken: refreshToken,
}