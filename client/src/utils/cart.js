export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product) => {
  const cart = getCart();

  const existing = cart.find(item => item._id === product._id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      _id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,

      //
      vendor: product.vendor?._id || product.vendor
    });
  }

  saveCart(cart);
};

export const increaseQty = (id) => {
  const cart = getCart();
  const item = cart.find(i => i._id === id);
  if (item) item.quantity += 1;
  saveCart(cart);
};

export const decreaseQty = (id) => {
  let cart = getCart();
  const item = cart.find(i => i._id === id);

  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i._id !== id);
    }
  }

  saveCart(cart);
};

export const removeFromCart = (id) => {
  const cart = getCart().filter(i => i._id !== id);
  saveCart(cart);
};