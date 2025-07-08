import Cart from "../models/Cart.js";

// Add item to cart
export const addToCart = async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update quantity
export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    await cart.save();

    res.json({ message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
