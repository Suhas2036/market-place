import { useEffect, useState } from "react";
import API from "../api/axios";
import Swal from "sweetalert2";

export default function VendorDashboard(){

  const [title,setTitle]=useState("");
  const [price,setPrice]=useState("");
  const [category,setCategory]=useState("");
  const [description,setDescription]=useState("");
  const [image,setImage]=useState(null);
  const [products,setProducts]=useState([]);

  const fetchProducts=async()=>{
    try{
      const res=await API.get("/products/vendor");
      setProducts(res.data);
    }catch{
      Swal.fire("Error","Failed to load products","error");
    }
  };

  useEffect(()=>{
    fetchProducts();
  },[]);

  const addProduct=async()=>{
    if(!title || !price){
      Swal.fire("Missing fields","Title and price required","warning");
      return;
    }

    const formData=new FormData();
    formData.append("title",title);
    formData.append("price",price);
    formData.append("category",category);
    formData.append("description",description);
    if(image) formData.append("image",image);

    try{
      await API.post("/products",formData,{
        headers:{ "Content-Type":"multipart/form-data" }
      });

      Swal.fire({
        icon:"success",
        title:"Product Added 🚀",
        background:"#0f172a",
        color:"#fff",
        confirmButtonColor:"#6366f1"
      });

      setTitle("");setPrice("");setCategory("");setDescription("");setImage(null);
      fetchProducts();
    }catch{
      Swal.fire("Error","Failed to add product","error");
    }
  };

  const deleteProduct=async(id)=>{
    const result = await Swal.fire({
      title:"Delete this product?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:"#6366f1",
      cancelButtonColor:"#ef4444",
      background:"#0f172a",
      color:"#fff"
    });

    if(!result.isConfirmed) return;

    try{
      await API.delete(`/products/${id}`);
      fetchProducts();

      Swal.fire({
        icon:"success",
        title:"Deleted successfully",
        background:"#0f172a",
        color:"#fff",
        confirmButtonColor:"#6366f1"
      });

    }catch{
      Swal.fire("Error","Delete failed","error");
    }
  };

  return(
    <div style={{padding:40}}>

      <h1>Vendor Dashboard </h1>

      {/* FORM */}
      <div className="card" style={{maxWidth:420}}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />

        <input
          type="file"
          onChange={e=>setImage(e.target.files[0])}
        />

        <button onClick={addProduct}>
          Add Product
        </button>
      </div>

      {/* PRODUCT LIST */}
      <h2 style={{marginTop:40}}>Your Products</h2>

      <div style={{display:"grid",gap:20,marginTop:20}}>
        {products.map(p=>(
          <div key={p._id} className="card">

            {p.image && (
              <img
                src={p.image}
                style={{width:150,borderRadius:10,marginBottom:10}}
              />
            )}

            <h3>{p.title}</h3>
            <p>₹ {p.price}</p>

            <button onClick={()=>deleteProduct(p._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}