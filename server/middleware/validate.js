const Joi = require('joi');
const database = require("../utils/database");


const checkIsEmpty = (field) => {
    if (field === undefined || field === null || field === "") return true;
    else return false;
}

module.exports.validateData = (req, res, next) => {
    const { id,
        first_name,
        last_name,
        username,
        email,
        password,
        gender,
        birthday, } = req.body;
    if (checkIsEmpty(id) || checkIsEmpty(first_name) || checkIsEmpty(last_name) || checkIsEmpty(username) ||
        checkIsEmpty(email) || checkIsEmpty(password) || checkIsEmpty(gender) || checkIsEmpty(birthday)) {
        return res.status(404).json({
            message: "Input blank"
        })
    }
    next();
}

module.exports.validateSignUpInput = (req, res, next) => {
    let { email, username, password } = req.body
    let validateSchema = Joi.object({
        email: Joi.string().email({
            minDomainSegments: 2,
            // tlds: {
            //     allow: ['com', 'net']
            // }
        }),
        username: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    })
    let validateResult = validateSchema.validate({ email, username, password });
    if (!validateResult.error) next()
    else res.json({ message: validateResult.error.details[0].message })
}
// Kiểm tra xem đã có người dùng nào sử dụng email/username đó để đăng ký hay chưa
module.exports.checkExistUser = async (req, res, next) => {
    const { username, email } = req.body;
    console.log(username, email);
    try {
        // Thực hiện truy vấn để kiểm tra email hoặc username tồn tại
        const query = 'SELECT * FROM tbl_users WHERE email = ? OR username = ?';
        let data = await database.execute(query, [email, username])
        let [findUser] = data;
        if (findUser.length === 0) {
            next();
        } else {
            // Nếu username hoặc email đã tồn tại
            return res.status(404).json({ error: "Email or username exists" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "An error occurred while checking" });
    }
};
// Kiểm tra thông tin login
module.exports.validateDataLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (checkIsEmpty(email) || checkIsEmpty(password)) {
        return res.status(404).json({
            message: "Input blank"
        })
    }
    next();
}
// Kiểm tra khi người dùng log-in: có tồn tại username đó hay không
module.exports.checkEmailLogin = async (req, res, next) => {
    let { email } = req.body;
    try {
        let data = await database.execute('SELECT * FROM tbl_users WHERE email = ?', [email]);
        let [findEmail] = data;
        console.log(findEmail);
        if (findEmail.length === 0) {
            res.json({
                message: "The email address you entered is not connected to an account"
            });
        } else if (findEmail[0].verify===0){
            res.json({
                message: "Please activate your email to start"
            });
        } else {
            next();
        }
    } catch (error) {
        res.json({
            error: error.message
        });
    }
};

