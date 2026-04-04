import { useEffect, useState } from "react";
import {
  getCart,
  increaseQty,
  decreaseQty,
  removeFromCart
} from "../utils/cart";
import { Link } from "react-router-dom";

export default function Cart(){

  const [items,setItems]=useState([]);

  const load=()=>{
    setItems(getCart());
  };

  useEffect(()=>{
    load();
  },[]);

  const total = items.reduce(
    (sum,i)=> sum + (i.price * i.quantity),
    0
  );

  return(
    <div style={{padding:40}}>

      <h1>Your Cart 🛒</h1>

      {items.length===0 ? (
        <p style={{marginTop:20,opacity:.6}}>
          Your cart is empty 
        </p>
      ) : (
        <>
          <div style={{display:"grid",gap:20,marginTop:20}}>
            {items.map((p)=>(
              <div key={p._id} className="card">

                {p.image && (
                  <img
                    src={`https://market-place-5ruh.onrender.com/uploads/${p.image}`}
                    style={{width:150,borderRadius:10}}
                  />
                )}

                <h3>{p.title}</h3>
                <p>₹ {p.price}</p>

                {/* Quantity Controls */}
                <div style={{display:"flex",gap:10,alignItems:"center",marginTop:10}}>
                  <button onClick={()=>{ decreaseQty(p._id); load(); }}>
                    -
                  </button>

                  <span>{p.quantity}</span>

                  <button onClick={()=>{ increaseQty(p._id); load(); }}>
                    +
                  </button>
                </div>

                <p style={{marginTop:10}}>
                  Subtotal: ₹ {p.price * p.quantity}
                </p>

                <button
                  style={{marginTop:10}}
                  onClick={()=>{ removeFromCart(p._id); load(); }}
                >
                  Remove
                </button>

              </div>
            ))}
          </div>

          <h2 style={{marginTop:30}}>Total: ₹ {total}</h2>

          <Link to="/checkout">
            <button style={{marginTop:20}}>
              Proceed to Checkout 💳
            </button>
          </Link>
        </>
      )}

    </div>
  );
}