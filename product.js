 

const API_URL = "https://fakestoreapi.com/products";

 

const urlParams = new URLSearchParams(
    window.location.search
);

const productId = urlParams.get("id");


 

const productLoading =
    document.getElementById("product-loading");

const productError =
    document.getElementById("product-error");

const productDetails =
    document.getElementById("product-details");

const detailImage =
    document.getElementById("detail-image");

const detailCategory =
    document.getElementById("detail-category");

const detailTitle =
    document.getElementById("detail-title");

const detailRating =
    document.getElementById("detail-rating");

const detailDescription =
    document.getElementById("detail-description");

const detailPrice =
    document.getElementById("detail-price");

const detailAddCart =
    document.getElementById("detail-add-cart");

const cartCount =
    document.getElementById("cart-count");

 

async function fetchProduct() {

    try {

        productLoading.classList.remove("hidden");
        productError.classList.add("hidden");
        productDetails.classList.add("hidden");


        if (!productId) {
            throw new Error("Product ID is missing");
        }


        const response = await fetch(
            `${API_URL}/${productId}`
        );


        if (!response.ok) {
            throw new Error("Product not found");
        }


        const product = await response.json();


        displayProduct(product);

    } catch (error) {

        console.error(error);

        productError.classList.remove("hidden");

    } finally {

        productLoading.classList.add("hidden");

    }
}


function displayProduct(product) {

    detailImage.src = product.image;

    detailImage.alt = product.title;

    detailCategory.textContent =
        product.category;

    detailTitle.textContent =
        product.title;

    detailDescription.textContent =
        product.description;

    detailPrice.textContent =
        `$${product.price.toFixed(2)}`;

    detailRating.textContent =
        `⭐ ${product.rating.rate} / 5 (${product.rating.count} reviews)`;


    productDetails.classList.remove("hidden");


    detailAddCart.onclick = function () {

        addToCart(product);

    };
}


function addToCart(product) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const existingProduct =
        cart.find(item => item.id === product.id);


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

    showToast("Product added to cart!");

}

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const totalItems =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );


    if (cartCount) {
        cartCount.textContent = totalItems;
    }

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


fetchProduct();

updateCartCount();