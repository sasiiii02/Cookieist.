// controllers/orderController.js
import orderModel from "../models/orderModel.js";
import userModel from "../models/user.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// --------------------- PLACE ORDER ---------------------
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const userId = req.userId; // ✅ From auth middleware
    const { items, amount, address } = req.body;

    // 1️⃣ Save order
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: false,
    });
    await newOrder.save();

    // 2️⃣ Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe uses smallest currency unit
      },
      quantity: item.quantity,
    }));

    // Delivery fee
    line_items.push({
      price_data: {
        currency: "lkr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 300 * 100,
      },
      quantity: 1,
    });

    // 3️⃣ Create Stripe session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
      metadata: {
        orderId: newOrder._id.toString(),
        userId: userId.toString(),
      },
    });

    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.json({ success: false, message: "Error placing order" });
  }
};



// --------------------- VERIFY ORDER 
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      // ✅ Update order payment status
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );

      if (!updatedOrder) {
        return res.json({ success: false, message: "Order not found" });
      }

      // ✅ Clear user's cart in backend
      try {
        const user = await userModel.findById(updatedOrder.userId);
        if (user) {
          // Adjust this field name according to your schema: cartData or cartItems
          user.cartData = {}; 
          await user.save();
        }
      } catch (err) {
        console.error("Failed to clear user cart:", err);
      }

      return res.json({ success: true, message: "Payment successful, cart cleared" });
    } else {
      // Payment failed → delete order
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Payment failed, order removed" });
    }
  } catch (error) {
    console.error("Verify order error:", error);
    return res.json({ success: false, message: "Server error during verification" });
  }
};
const userOrders = async (req, res) => {
  try {
    // Use userId from auth middleware
    const orders = await orderModel
      .find({ userId: req.userId })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Fetch user orders error:", error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};


//listing orders for admin panel

const listOrders = async(req,res)=>{
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }

}


//update the status of order


// UPDATE ORDER STATUS (ADMIN)
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res.json({
        success: false,
        message: "Order ID and status are required",
      });
    }

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Update status error:", error);
    res.json({
      success: false,
      message: "Error updating order status",
    });
  }
};

export { placeOrder, verifyOrder,userOrders, listOrders , updateStatus};
