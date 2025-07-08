import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "orderItems.product"
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "id name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
