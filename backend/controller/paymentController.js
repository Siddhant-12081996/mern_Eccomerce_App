import asyncHandler from "express-async-handler";
import  Razorpay  from "razorpay";
import crypto  from "crypto";
import Payment  from "../model/paymentModel.js"

//secret data of Razorpay
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const checkout = asyncHandler(async (req, res, next) => {
  const options ={
    amount:Number(req.body.amount*100),
    currency:"INR",
    receipt: crypto.randomBytes(10).toString("hex"),
};
const order = await instance.orders.create(options);
console.log(order);
res.status(200).json({
    success:true,
    order
})
});

const paymentVerification = async(req,res) => {
  const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
   const body = razorpay_order_id + "|" +razorpay_payment_id;
   const expectedsgnature =crypto.createHmac('sha256',process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex')
   const isauth = expectedsgnature === razorpay_signature;
   if(isauth){
    await Payment.create({
        razorpay_order_id,razorpay_payment_id,razorpay_signature 
    })
    res.redirect(`http://localhost:5173/checkout-success?reference=${razorpay_payment_id}`)
   }
   else{
    res.status(400).json({success:false});
   }
};

const getKey = (req,res)=>{
  return res.status(200).json({key:process.env.RAZORPAY_KEY_ID })
}
export { checkout, paymentVerification,getKey };