 
let cart = JSON.parse(localStorage.getItem("cart")) || [];

 

const checkoutItems =
    document.getElementById("checkout-items");

const checkoutItemCount =
    document.getElementById("checkout-item-count");

const checkoutSubtotal =
    document.getElementById("checkout-subtotal");

const checkoutTotal =
    document.getElementById("checkout-total");

const cartCount =
    document.getElementById("cart-count");

const placeOrderBtn =
    document.getElementById("place-order-btn");

const orderSuccess =
    document.getElementById("order-success");

 

function displayCheckout() {

    checkoutItems.innerHTML = "";
 

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Add some products before checkout.
                </p>

                <a
                    href="index.html"
                    class="btn">
                    Start Shopping
                </a>

            </div>
        `;
 
        placeOrderBtn.disabled = true;

        placeOrderBtn.style.opacity = "0.5";

        placeOrderBtn.style.cursor =
            "not-allowed";


        updateSummary();

        return;
    }
 

    placeOrderBtn.disabled = false;

    placeOrderBtn.style.opacity = "1";

    placeOrderBtn.style.cursor =
        "pointer";

 
    cart.forEach(item => {

        const checkoutItem =
            document.createElement("div");


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.title}"
                class="checkout-item-image"
            >

            <div class="checkout-item-info">

                <h3>
                    ${item.title}
                </h3>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>

            <strong>
                $${(
                    item.price *
                    item.quantity
                ).toFixed(2)}
            </strong>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    updateSummary();
}

 

function updateSummary() {

    // Total quantity
    const totalItems =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    const subtotal =
        cart.reduce(
            (total, item) =>
                total +
                (
                    item.price *
                    item.quantity
                ),
            0
        );


    if (checkoutItemCount) {

        checkoutItemCount.textContent =
            totalItems;

    }

    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            `$${subtotal.toFixed(2)}`;

    }

    if (checkoutTotal) {

        checkoutTotal.textContent =
            `$${subtotal.toFixed(2)}`;

    }


    // Header cart count
    if (cartCount) {

        cartCount.textContent =
            totalItems;

    }
}

 
function validateCustomerDetails() {

    // Get customer fields
    const name =
        document
            .getElementById("full-name")
            .value
            .trim();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const phone =
        document
            .getElementById("phone")
            .value
            .trim();


    const address =
        document
            .getElementById("address")
            .value
            .trim();


    const city =
        document
            .getElementById("city")
            .value
            .trim();


    const postalCode =
        document
            .getElementById("postal-code")
            .value
            .trim();

 
    if (name === "") {

        alert(
            "Please enter your full name."
        );

        document
            .getElementById("full-name")
            .focus();

        return false;
    }

 

    if (email === "") {

        alert(
            "Please enter your email."
        );

        document
            .getElementById("email")
            .focus();

        return false;
    }


    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailPattern.test(email)) {

        alert(
            "Please enter a valid email address."
        );

        document
            .getElementById("email")
            .focus();

        return false;
    }

 

    if (phone === "") {

        alert(
            "Please enter your phone number."
        );

        document
            .getElementById("phone")
            .focus();

        return false;
    }
 
    if (address === "") {

        alert(
            "Please enter your address."
        );

        document
            .getElementById("address")
            .focus();

        return false;
    }

 
    if (city === "") {

        alert(
            "Please enter your city."
        );

        document
            .getElementById("city")
            .focus();

        return false;
    }

 
    if (postalCode === "") {

        alert(
            "Please enter your postal code."
        );

        document
            .getElementById("postal-code")
            .focus();

        return false;
    }


    return true;
}

 

placeOrderBtn.addEventListener(
    "click",
    function () {

      

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }

 

        const isValid =
            validateCustomerDetails();


        // Stop if validation fails
        if (!isValid) {

            return;

        }
 

        const customerDetails = {

            name:
                document
                    .getElementById("full-name")
                    .value
                    .trim(),

            email:
                document
                    .getElementById("email")
                    .value
                    .trim(),

            phone:
                document
                    .getElementById("phone")
                    .value
                    .trim(),

            address:
                document
                    .getElementById("address")
                    .value
                    .trim(),

            city:
                document
                    .getElementById("city")
                    .value
                    .trim(),

            postalCode:
                document
                    .getElementById("postal-code")
                    .value
                    .trim()

        };

 

        localStorage.setItem(
            "customerDetails",
            JSON.stringify(
                customerDetails
            )
        );

 

        localStorage.setItem(
            "lastOrder",
            JSON.stringify(cart)
        );

 

        localStorage.removeItem(
            "cart"
        );

        cart = [];

 
        const checkoutLayout =
            document.querySelector(
                ".checkout-layout"
            );


        if (checkoutLayout) {

            checkoutLayout.classList.add(
                "hidden"
            );

        }
 

        if (orderSuccess) {

            orderSuccess.classList.remove(
                "hidden"
            );

        }

 

        if (cartCount) {

            cartCount.textContent = "0";

        }

    }
);


 

displayCheckout();