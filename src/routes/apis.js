/**
* Created by trieu.ngoquang author on 12/3/20 - 10:47.
* nodejs-jwt
*/
const express = require('express');
const router = express.Router();
const AuthMiddleWare = require('../middleware/AuthMiddleWare');
const AuthController = require('../controllers/AuthController');
const FriendController = require('../controllers/FriendController');

const initAPTs = (app) => {
    router.post("/login", AuthController.login);
    router.post("/refresh-token", AuthController.refreshToken);

    // Sử dụng authMiddleware.isAuth trước những api cần xác thực
    router.use(AuthMiddleWare.isAuth);

    router.get("/friends", FriendController.friendList);

    return app.use("/", router);
}

module.exports = initAPTs;