// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

function loadCart() {
  const cartData = sessionStorage.getItem('cart');
  if (cartData) {
    return JSON.parse(cartData);
  }
  return [];
}

function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
		const button = li.querySelector('button');
	    button.addEventListener('click', () => {
	    const cart = loadCart();
	    cart.push(product);
	      saveCart(cart);
	      renderCart(cart);
    });
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart(cart) {
	cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
	const product = products.find(p => p.id === productId);
  if (product) {
    const cart = loadCart();
    cart.push(product);
    saveCart(cart);
    renderCart(cart);
  }
}

// Remove item from cart
// function removeFromCart(productId) {
	
// }

// Clear cart
function clearCart() {
	sessionStorage.removeItem('cart');
  renderCart([]);
}
clearCartBtn.addEventListener('click', clearCart);
// Initial render
renderProducts();
renderCart(loadCart());
