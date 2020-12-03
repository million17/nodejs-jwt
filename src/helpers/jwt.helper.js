const jwt = require('jsonwebtoken');

/**
 * generateToken
 * @param user
 * @param secretSignature
 * @param tokenLife
 * @returns {Promise<unknown>}
 */
const generateToken = (user, secretSignature, tokenLife) => {
    return new Promise((resolve, reject) => {
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
        }
        // Generate
        jwt.sign(
            {data: userData},
            secretSignature,
            {
                algorithm: "HS256",
                expiresIn: tokenLife,
            },
            (err, token) => {
                if (err) {
                    return reject(err);
                }
                resolve(token);
            });
    });
}

/**
 * verifyToken
 * @param token
 * @param secretKey
 * @returns {Promise<unknown>}
 */
const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded)
        });
    });
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
}