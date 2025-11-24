import userModel from '../models/userModel.js'
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId, size } = req.body;

        const userData = await userModel.findById(userId);
        let cardData = userData.cardData;

        if (!cardData[itemId]) {
            cardData[itemId] = {};
        }

        cardData[itemId][size] = (cardData[itemId][size] || 0) + 1;

        await userModel.findByIdAndUpdate(userId, { cardData });

        res.json({ success: true, message: 'Added to cart' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { itemId, size, quantity } = req.body;

        const userData = await userModel.findById(userId);
        let cardData = userData.cardData;

        cardData[itemId][size] = quantity;

        await userModel.findByIdAndUpdate(userId, { cardData });

        res.json({ success: true, message: 'Cart Updated' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("BACKEND RECEIVED USERID: ", userId);

        const user = await userModel.findById(userId);
        const cardData = user.cardData || {};

        res.json({ success: true, cardData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};



export { addToCart, getUserCart, updateCart }