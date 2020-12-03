/**
 * Created by trieu.ngoquang author on 12/3/20 - 10:38.
 * nodejs-jwt
 */
const debug = console.log.bind(console);

const friendList = (req, res) => {
    debug(`Xác thực token hợp lệ, thực hiện giả lập lấy danh sách bạn bè của user và trả về cho người dùng...`);

    const friends = [
        {name: 'Tran Van A'},
        {name: 'Tran Van B'},
        {name: 'Tran Van C'},
        {name: 'Tran Van D'},
    ];
    return res.status(200).json(friends);
}

module.exports = {
    friendList: friendList,
}