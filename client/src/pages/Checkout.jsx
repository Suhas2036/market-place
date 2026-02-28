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

  const placeOrder=async()=>{

    if(items.length===0){
      Swal.fire({
        icon:"warning",
        title:"Your cart is empty",
        background:"#0f172a",
        color:"#fff",
        confirmButtonColor:"#6366f1"
      });
      return;
    }

    try{

      
      const formattedItems = items.map(item => ({
        product: item._id,
        vendor: item.vendor?._id || item.vendor,   
        title: item.title,
        price: item.price,
        quantity: item.quantity || 1,
        image: item.image
      }));

      await API.post("/orders",{
        items: formattedItems,
        total
      });

      localStorage.removeItem("cart");

      await Swal.fire({
        icon:"success",
        title:"Order placed successfully 🎉",
        text:"Thank you for your purchase!",
        background:"#0f172a",
        color:"#fff",
        confirmButtonColor:"#6366f1"
      });

      navigate("/");

    }catch(err){

      console.log("Checkout error:", err?.response?.data || err.message);

      Swal.fire({
        icon:"error",
        title:"Checkout failed",
        background:"#0f172a",
        color:"#fff",
        confirmButtonColor:"#ef4444"
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
        onClick={placeOrder}
      >
        Place Order
      </button>

    </div>
  );
}