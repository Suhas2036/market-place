import { useEffect, useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function Orders(){

  const [orders,setOrders]=useState([]);

  const fetchOrders = async()=>{
    try{
      const res = await API.get("/orders/my");
      setOrders(res.data);
    }catch{
      Swal.fire({
        icon:"error",
        title:"Failed to load orders",
        background:"#0f172a",
        color:"#fff"
      });
    }
  };

  useEffect(()=>{
    fetchOrders();
  },[]);

  return(
    <div style={{padding:40}}>

      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (
        <p style={{marginTop:20,opacity:.6}}>
          You have no orders yet.
        </p>
      ) : (
        <div style={{marginTop:30,display:"grid",gap:30}}>
          {orders.map(order=>(
            <div key={order._id} className="card">

              <h3>Order ID: {order._id.slice(-6)}</h3>
              <p style={{opacity:.6}}>
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <div style={{marginTop:15}}>
                {order.items.map((item,i)=>(
                  <div key={i} style={{marginBottom:10}}>
                    <p><strong>{item.title}</strong></p>
                    <p>₹ {item.price}</p>
                  </div>
                ))}
              </div>

              <h4 style={{marginTop:15}}>
                Total: ₹ {order.total}
              </h4>

              <p style={{marginTop:5}}>
                Status: {order.status}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}