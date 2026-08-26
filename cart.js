 
 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

 

const cartItemsContainer =
    document.getElementById("cart-items");

const cartCount =
    document.getElementById("cart-count");

const summaryItems =
    document.getElementById("summary-items");

const cartSubtotal =
    document.getElementById("cart-subtotal");

const cartTotal =
    document.getElementById("cart-total");

const checkoutBtn =
    document.getElementById("checkout-btn");


 

function displayCart() {

    cartItemsContainer.innerHTML = "";


    // Empty Cart
    if (cart.length === 0) {

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    You haven't added any products yet.
                </p>

                <a href="index.html" class="btn">
                    Start Shopping
                </a>

            </div>
        `;


        checkoutBtn.classList.add("disabled");

        updateSummary();

        return;
    }


    checkoutBtn.classList.remove("disabled");


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    class="cart-product-image"
                >

                <div class="cart-product-info">

                    <h3>
                        ${item.title}
                    </h3>

                    <p>
                        $${item.price.toFixed(2)}
                    </p>

                </div>

            </div>


            <div class="cart-actions">

                <div class="quantity-controls">

                    <button
                        class="quantity-btn"
                        onclick="decreaseQuantity(${item.id})">

                        −

                    </button>


                    <span class="quantity">
                        ${item.quantity}
                    </span>


                    <button
                        class="quantity-btn"
                        onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                </div>


                <strong class="item-total">
                    $${(
                        item.price * item.quantity
                    ).toFixed(2)}
                </strong>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${item.id})">

                    Remove

                </button>

            </div>

        `;


        cartItemsContainer.appendChild(cartItem);

    });


    updateSummary();
}

 

function increaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);


    if (item) {

        item.quantity += 1;

        saveCart();

        displayCart();

    }
}
 

function decreaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);


    if (!item) return;


    if (item.quantity > 1) {

        item.quantity -= 1;

    } else {

        // Remove when quantity reaches zero
        cart = cart.filter(
            item => item.id !== productId
        );

    }


    saveCart();

    displayCart();
}

 

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );


    saveCart();

    displayCart();

    showToast("Product removed from cart!");
}

 

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}

 

function updateSummary() {

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const subtotal =
        cart.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        );


    cartCount.textContent = totalItems;


    summaryItems.textContent = totalItems;


    cartSubtotal.textContent =
        `$${subtotal.toFixed(2)}`;

    cartTotal.textContent =
        `$${subtotal.toFixed(2)}`;
}

 

function showToast(message) {

    const oldToast =
        document.querySelector(".toast");


    if (oldToast) {
        oldToast.remove();
    }


    const toast =
        document.createElement("div");


    toast.className = "toast";

    toast.textContent = message;


    document.body.appendChild(toast);


    setTimeout(() => {

        toast.classList.add("hide");


        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 2000);
}
 

displayCart();