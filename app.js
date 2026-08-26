 
const API_URL = "https://fakestoreapi.com/products";

let allProducts = [];
let filteredProducts = [];

 

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");
const cartCount = document.getElementById("cart-count");

 

async function fetchProducts() {

    try {

        loading.classList.remove("hidden");
        errorMessage.classList.add("hidden");

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await response.json();

        allProducts = products;
        filteredProducts = products;

        displayProducts(filteredProducts);
        loadCategories(products);

    } catch (error) {

        console.error(error);

        errorMessage.classList.remove("hidden");

    } finally {

        loading.classList.add("hidden");
    }
}

 
function displayProducts(products) {

    productContainer.innerHTML = "";

    if (products.length === 0) {

        productContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
            </div>
        `;

        return;
    }


    products.forEach(product => {

        const productCard = document.createElement("div");

        productCard.className = "product-card";

        productCard.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.title}"
                class="product-image"
            >

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3 class="product-title">
                    ${product.title}
                </h3>

                <p class="product-price">
                    $${product.price.toFixed(2)}
                </p>

                <div class="product-buttons">

                    <a
                        href="product.html?id=${product.id}"
                        class="details-btn"
                    >
                        Details
                    </a>

                    <button
                        class="add-cart-btn"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productContainer.appendChild(productCard);

    });
}

 
function loadCategories(products) {

    const categories = [
        ...new Set(products.map(product => product.category))
    ];

    categoryFilter.innerHTML = `
        <option value="all">All Categories</option>
    `;

    categories.forEach(category => {

        const option = document.createElement("option");

        option.value = category;
        option.textContent = formatCategory(category);

        categoryFilter.appendChild(option);

    });
}

 

function formatCategory(category) {

    return category
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

 

searchInput.addEventListener("input", filterProducts);

 
categoryFilter.addEventListener("change", filterProducts);
 

function filterProducts() {

    const searchValue = searchInput.value
        .toLowerCase()
        .trim();

    const selectedCategory = categoryFilter.value;


    filteredProducts = allProducts.filter(product => {

        const matchesSearch =
            product.title
                .toLowerCase()
                .includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;

    });


    displayProducts(filteredProducts);
}

 

function addToCart(productId) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        const product = allProducts.find(
            item => item.id === productId
        );

        if (!product) return;

        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }


    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    showToast("Product added to cart!");
}

 

function updateCartCount() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

 

function showToast(message) {

    const existingToast =
        document.querySelector(".toast");

    if (existingToast) {
        existingToast.remove();
    }


    const toast = document.createElement("div");

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
 

fetchProducts();

updateCartCount();