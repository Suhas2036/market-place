import { useEffect, useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function Home(){

  const [products,setProducts]=useState([]);
  const [categoryFilter,setCategoryFilter]=useState("");

  const fetchProducts=async()=>{
    try{
      const res=await API.get("/products");
      console.log("Products:", res.data); 
      setProducts(res.data);
    }catch{
      Swal.fire({
        icon:"error",
        title:"Failed to load products",
        background:"#0f172a",
        color:"#fff",
        confirmButtonColor:"#ef4444"
      });
    }
  };

  useEffect(()=>{
    fetchProducts();
  },[]);

  const handleAddToCart = async (product) => {
    console.log("Adding product:", product); 
    const { addToCart } = await import("../utils/cart");
    addToCart(product);

    Swal.fire({
      toast:true,
      position:"top-end",
      icon:"success",
      title:"Added to cart 🛒",
      showConfirmButton:false,
      timer:1500,
      background:"#0f172a",
      color:"#fff"
    });
  };

  return(
    <div style={{padding:40}}>

      <h1 style={{marginBottom:30}}>Marketplace </h1>

      <select
       value={categoryFilter}
       onChange={(e) => setCategoryFilter(e.target.value)}
       style={{ marginBottom: 30 }}>
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Fashion">Fashion</option>
      <option value="Other">Other</option>
      </select>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
        gap:20
      }}>
        {products
         .filter(p=>!categoryFilter || p.category===categoryFilter)
         .map(p=>(

          <div key={p._id} className="card">

            {p.image && (
              <img
                src={`https://market-place-5ruh.onrender.com/uploads/${p.image}`}
                style={{
                  width:"100%",
                  height:180,
                  objectFit:"cover",
                  borderRadius:12,
                  marginBottom:10
                }}
              />
            )}

            <h3>{p.title}</h3>
            <p style={{opacity:.7}}>{p.description}</p>

            <h2 style={{marginTop:10}}>₹ {p.price}</h2>

            <button
              style={{marginTop:10}}
              onClick={()=>handleAddToCart(p)}
            >
              Add to Cart
            </button>

            {p.vendor && (
              <p style={{opacity:.5,marginTop:5}}>
                by {p.vendor.name}
              </p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}