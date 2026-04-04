import { useEffect, useState } from "react";
import API from "../api/axios";
import { getCart } from "../utils/cart";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Checkout(){

  const [items,setItems]=useState([]);
  const navigate=useNavigate();

  useEffect(()=>{
    setItems(getCart());
  },[]);

  const total = items.reduce(
    (sum,i)=> sum + (i.price * (i.quantity || 1)), 0
  );

  const handlePayment = async () => {

    if(items.length === 0){
      Swal.fire({
        icon:"warning",
        title:"Your cart is empty",
        background:"#0f172a",
        color:"#fff"
      });
      return;
    }

    try{

      // Create Razorpay Order (backend)
      const { data } = await API.post("/payment/create-order", {
        amount: total
      });

      // Open Razorpay
      const options = {
        key: "rzp_test_SZQXDvhuvKa2Xk", // test key
        amount: data.amount,
        currency: "INR",
        name: "Marketplace",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {

          try {

            // Format items 
            const formattedItems = items.map(item => ({
              product: item._id,
              vendor: item.vendor?._id || item.vendor,
              title: item.title,
              price: item.price,
              quantity: item.quantity || 1,
              image: item.image
            }));

            // Save order AFTER payment
            await API.post("/orders", {
              items: formattedItems,
              total
            });

            localStorage.removeItem("cart");

            await Swal.fire({
              icon:"success",
              title:"Payment successful 🎉",
              text:"Order placed successfully!",
              background:"#0f172a",
              color:"#fff"
            });

            navigate("/");

          } catch (err) {
            console.log("Order save error:", err);
          }
        },

        theme: {
          color: "#6366f1"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch(err){
      console.log("Payment error:", err);

      Swal.fire({
        icon:"error",
        title:"Payment failed",
        background:"#0f172a",
        color:"#fff"
      });
    }
  };

  return(
    <div style={{padding:"60px 40px"}}>

      <h1>Checkout 💳</h1>

      <div style={{marginTop:20}}>
        {items.map((p,i)=>(
          <div key={i} className="card" style={{marginBottom:15,padding:15}}>
            <h3>{p.title}</h3>
            <p>₹ {p.price} × {p.quantity || 1}</p>
            <p>Subtotal: ₹ {p.price * (p.quantity || 1)}</p>
          </div>
        ))}
      </div>

      <h2 style={{marginTop:20}}>Total: ₹ {total}</h2>

      <button
        style={{marginTop:20}}
        onClick={handlePayment}
      >
        Pay Now 💳
      </button>

    </div>
  );
}