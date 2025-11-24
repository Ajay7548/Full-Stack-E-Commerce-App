import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not authorized. Login again." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;   // <----- FIXED
        console.log("AUTH MIDDLEWARE DECODED ID ===>", decoded.id);
console.log("AUTH SET USERID ===>", req.userId);

        next();
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export default authUser;
