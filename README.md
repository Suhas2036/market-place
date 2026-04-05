# MERN Multi-Vendor Marketplace

A full-stack **MERN Marketplace application** where multiple vendors can sell products and customers can browse, purchase, and track orders.

---

## 🚀 Live Demo

* 🌐 Frontend: https://market-place-git-main-suhas-s-projects-49b9ecc3.vercel.app
* ⚙️ Backend API: https://market-place-5ruh.onrender.com

---

## ✨ Features

### Authentication & Roles

* JWT-based authentication
* Role-based access:

  * **Customer**
  * **Vendor**
  * **Admin**

---

### Customer Features

* Browse products
* Filter by categories
* Add to cart
* Checkout & place orders
* Razorpay payment integration (Test Mode)
* View order history

---

### Vendor Features

* Add new products (with image upload)
* Manage products
* View vendor-specific orders
* Track revenue per order

---

### Admin Features

* Dashboard with:

  * Total users
  * Total products
  * Total orders
* Restricted access (admin-only routes)

---

### Payments

* Integrated with **Razorpay**
* Supports:

  * Test payments
  * Checkout flow
* Payment verification handled on backend

---

### Image Upload

* Implemented using **Multer**
* Images served via backend (`/uploads`)
* Note: Uses local storage (not persistent on Render)

---

## Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router
* SweetAlert2
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Multer
* Razorpay SDK

---

## 📁 Project Structure

```
root/
│
├── client/        # React frontend
│
└── server/        # Express backend
```


##  Deployment

* **Frontend**: Vercel
* **Backend**: Render
* **Database**: MongoDB Atlas

---

## ⚠️ Known Limitations

* Uploaded images are stored locally → **not persistent on Render**
* No cloud storage (yet)

---

## Future Improvements

* Cloudinary integration (for image storage)
* Order tracking system
* Admin analytics dashboard
* Product reviews & ratings
* Search & filtering improvements

---

## Key Learnings

* Full-stack MERN architecture
* Role-based authentication & authorization
* Payment gateway integration (Razorpay)
* Deployment (Vercel + Render)
* Debugging real-world production issues

---

## Author

**Suhas**

---

