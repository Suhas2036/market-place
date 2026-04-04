#  MERN Multi-Vendor Marketplace

A full-stack MERN application where:

- Vendors can create and manage products
- Customers can browse and purchase products
- Vendors can track revenue per order
- Role-based authentication (Customer / Vendor)

---



Frontend:
- React (Vite)
- Axios
- SweetAlert2
- Framer Motion
- deployed link: https://market-place-git-main-suhas-s-projects-49b9ecc3.vercel.app/login

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- JWT Authentication
- Multer (Image Upload)
- deployed link: https://market-place-5ruh.onrender.com/

---

## Project Structure

root/
│
├── client/   → Frontend (React)
└── server/   → Backend (Express + MongoDB)

---

## How to Run Locally

### Backend

cd server  
npm install  

Create `.env` file:





### Frontend

cd client  
npm install  
npm run dev

---

## Roles

Customer:
- Browse products
- Add to cart
- Place orders

Vendor:
- Create products
- View vendor orders
- Track revenue
- Update order status
