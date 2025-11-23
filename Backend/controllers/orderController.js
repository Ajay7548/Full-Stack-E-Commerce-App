import orderModel from '../models/orderSchema.js'
import userModel from '../models/userModel.js'

const placeOrder = async (req, res) => {
  console.log("PLACE ORDER USERID ===>", req.userId);

  try {
    const userId = req.userId;
    const { items, address, amount, paymentMethod, date } = req.body;

    const newOrder = await orderModel.create({
      userId,
      items,
      address,
      amount,
      paymentMethod,
      date
    });

    // Clear user cart after placing order
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, order: newOrder });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    // Stripe payment integration logic here
    res.json({ success: true, message: "Stripe payment endpoint" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const placeOrderRazorpay = async (req, res) => {
  try {
    // Razorpay payment integration logic here
    res.json({ success: true, message: "Razorpay payment endpoint" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ success: true, orders });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    console.log('Update Status Request:', { orderId, status });

    if (!orderId || !status) {
      return res.json({ success: false, message: "Order ID and status are required" });
    }

    // Find the order first to see current state
    const currentOrder = await orderModel.findById(orderId);
    if (!currentOrder) {
        console.log('Order not found before update:', orderId);
        return res.json({ success: false, message: "Order not found" });
    }
    console.log('Current Order Status:', currentOrder.status);

    // Find and update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    console.log('Updated Order Status:', updatedOrder.status);

    if (!updatedOrder) {
      return res.json({ success: false, message: "Order not found during update" });
    }

    res.json({ success: true, message: "Status updated successfully", order: updatedOrder });

  } catch (error) {
    console.log('Update Status Error:', error);
    res.json({ success: false, message: error.message });
  }
}


export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, updateStatus, userOrders }