const Product = require("../models/Product");
const router = require("express").Router();
const auth = require("../middleware/auth");

/* multer upload */
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });


/* ================= GET ALL PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


/* ================= CREATE PRODUCT (WITH IMAGE) ================= */
router.post(
  "/",
  auth,
  upload.single("image"),
  async (req,res)=>{
    try{
      const product = await Product.create({
        title:req.body.title,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        vendor:req.user.id,
        image: req.file ? req.file.path : null
      });

      res.json(product);
    }catch(err){
      res.status(500).json({msg:err.message});
    }
  }
);


/* ================= GET VENDOR PRODUCTS ================= */
router.get("/vendor", auth, async (req,res)=>{
  try{
    const products=await Product.find({vendor:req.user.id});
    res.json(products);
  }catch(err){
    res.status(500).json({msg:"Server error"});
  }
});


/* ================= DELETE PRODUCT ================= */
router.delete("/:id", auth, async (req,res)=>{
  try{
    const product=await Product.findById(req.params.id);

    if(!product) return res.status(404).json({msg:"Not found"});

    if(product.vendor.toString()!==req.user.id)
      return res.status(401).json({msg:"Not allowed"});

    await product.deleteOne();
    res.json({msg:"Deleted"});
  }catch(err){
    res.status(500).json({msg:"Server error"});
  }
});


/* ================= UPDATE PRODUCT ================= */
router.put("/:id", auth, async (req,res)=>{
  try{
    const product=await Product.findById(req.params.id);

    if(!product) return res.status(404).json({msg:"Not found"});

    if(product.vendor.toString()!==req.user.id)
      return res.status(401).json({msg:"Not allowed"});

    const updated=await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    );

    res.json(updated);
  }catch(err){
    res.status(500).json({msg:"Server error"});
  }
});


module.exports = router;