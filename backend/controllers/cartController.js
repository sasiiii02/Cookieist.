import userModel from "../models/user.js";

const addToCart = async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "itemId is required" });
    }

    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Safe way - get current value or 0
    const currentQty = Number(user.cartData?.[itemId] || 0);
    const newQty = currentQty + Number(quantity);

    // Update using $set to avoid race condition problems better
    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { 
        $set: { [`cartData.${itemId}`]: newQty > 0 ? newQty : undefined }
      },
      { new: true, runValidators: true }
    );

    // Clean up zero or negative values
    if (newQty <= 0) {
      await userModel.findByIdAndUpdate(req.userId, {
        $unset: { [`cartData.${itemId}`]: "" }
      });
    }

    return res.json({
      success: true,
      message: quantity > 0 ? "Added to cart" : "Updated cart",
      cartData: updatedUser.cartData || {}
    });

  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).json({ success: false, message: "itemId is required" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.userId,
      { $inc: { [`cartData.${itemId}`]: -1 } },
      { new: true }
    );

    // Clean up if <= 0
    if (updatedUser.cartData?.[itemId] <= 0) {
      await userModel.findByIdAndUpdate(req.userId, {
        $unset: { [`cartData.${itemId}`]: "" }
      });
    }

    const finalUser = await userModel.findById(req.userId);

    return res.json({
      success: true,
      message: "Removed from cart",
      cartData: finalUser.cartData || {}
    });

  } catch (error) {
    console.error("removeFromCart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      cartData: user.cartData || {}
    });

  } catch (error) {
    console.error("getCart error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};




export { addToCart, removeFromCart, getCart };