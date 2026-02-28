const router = require("express").Router();
const Order = require("../models/Order");
const auth = require("../middleware/auth");

/* ================= CREATE ORDER ================= */
router.post("/", auth, async (req, res) => {
  try {
    const { items, total } = req.body;

    const formattedItems = items.map(item => ({
      product: item.product,
      vendor: item.vendor,  
      title: item.title,
      price: item.price,
      quantity: item.quantity || 1,
      image: item.image
    }));

    const order = await Order.create({
      customer: req.user.id,
      items: formattedItems,
      total
    });

    res.json(order);

  } catch (err) {
    res.status(500).json({ msg: "Order failed" });
  }
});


/* ================= CUSTOMER ORDER HISTORY ================= */
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate("items.product", "title price image")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching orders" });
  }
});


/* ================= VENDOR SALES ================= */
router.get("/vendor", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      "items.vendor": req.user.id
    })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching vendor orders" });
  }
});

/* UPDATE ORDER STATUS (Vendor/Admin) */
router.put("/:id/status", auth, async(req,res)=>{
  try{
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if(!order) return res.status(404).json({msg:"Order not found"});

    order.status = status;
    await order.save();

    res.json(order);
  }catch(err){
    res.status(500).json({msg:"Status update failed"});
  }
});

/* ADMIN VIEW ALL ORDERS */
router.get("/admin", auth, async(req,res)=>{
  try{
    if(req.user.role !== "admin")
      return res.status(403).json({msg:"Access denied"});

    const orders = await Order.find()
      .populate("customer","name email")
      .sort({createdAt:-1});

    res.json(orders);
  }catch(err){
    res.status(500).json({msg:"Admin fetch failed"});
  }
});

module.exports = router;