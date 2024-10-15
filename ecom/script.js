// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to the cart
function addToCart(product) {
    const exists = cart.find(item => item.id === product.id);
    if (exists) {
        exists.quantity++;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}

// Remove product from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Update product quantity in the cart
function updateQuantity(id, quantity) {
    const product = cart.find(item => item.id === id);
    if (product) {
        product.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
}

// Render the cart items
function renderCart() {
    const cartContainer = document.querySelector('#cart-container');
    const totalContainer = document.querySelector('#total-price');
    cartContainer.innerHTML = '';

    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p>Your cart is currently empty. Start adding items to your cart!</p>`;
        totalContainer.innerHTML = '';
        return;
    }

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        cartContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <h5>${item.name}</h5>
                <p>Price: ৳${item.price}</p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>`;
    });

    totalContainer.innerHTML = `Total: ৳${totalPrice}`;
}

// Confirm order function
function confirmOrder() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order confirmed! Thank you for shopping with us.');
    cart = []; // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Refresh the cart
}

// Clear cart function
function clearCart() {
    cart = []; // Clear the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart(); // Refresh the cart
}

// Initialize the cart on the cart.html page
if (window.location.pathname.includes('cart.html')) {
    renderCart();
}

// Add event listeners for cart buttons on the home page
const productButtons = document.querySelectorAll('.cart-btn');
productButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.pro');
        const product = {
            id: parseInt(productElement.dataset.id),
            name: productElement.querySelector('h5').textContent,
            price: parseFloat(productElement.querySelector('h4').textContent.slice(1)),
            image: productElement.querySelector('img').src
        };
        addToCart(product);
    });
});

// Function to handle the login process
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Retrieve saved user data from localStorage
    const savedUser = JSON.parse(localStorage.getItem('user'));

    // Check if the user exists and passwords match
    if (savedUser && savedUser.email === email && savedUser.password === password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', JSON.stringify({ email: savedUser.email }));
        window.location.href = 'home.html'; // Redirect to the home page
    } else {
        document.getElementById('login-error').innerText = 'Invalid email or password. Please try again.';
    }
});

// Function to handle the signup process
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    // Save user data to localStorage
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));

    document.getElementById('signup-success').innerText = 'Signup successful! You can now log in.';
    document.getElementById('signup-form').reset(); // Clear the signup form
});

// Handle feedback form submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Here you can implement the logic to send feedback to your server
    // For demonstration, we just show a success message

    document.getElementById('feedback-success').innerText = 'Thank you for your feedback! We will contact you soon.';
    document.getElementById('contact-form').reset(); // Clear the contact form
});
