const database = require('../utils/database');
const jwt = require('jsonwebtoken');

module.exports.isAuth = function (req, res, next) {
    // Tiến hành bảo vệ các endpoint cần thiết
    // Tiến hành truy vấn với userId được đính kèm tại cookies
    // Nếu tồn tại user -> next sang tác vụ tiếp theo
    // Nếu không -> res về user is not authenticated
    try {
        let authorization = req.headers.authorization.split(' ');
        if (authorization.includes('Bearer') && authorization.length > 1) {
            let token = authorization[1];
            let decoded = jwt.verify(token, process.env.SECRET)

            let { userId } = decoded;
            console.log(userId);
            database.execute("SELECT * FROM tbl_users WHERE user_id=?", [userId])
                .then((data) => {
                    let [users] = data;
                    console.log(data);
                })
                .catch((err) => {
                    res.json({ err })
                })
        }
    } catch (error) {
        res.json({ error })
    }
}