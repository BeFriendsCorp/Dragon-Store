
/* ==================================================
   DRAGON STORE
   PRODUITS
================================================== */

const products = [

    {
        name: "Advanced Combat System",
        category: "script",
        price: 0,
        description: "Advanced Roblox combat system ready for your game.",
        icon: "🧩",
        image: "",
        link: "https://discord.gg/sDBFbwN6UB"
    },

    {
        name: "Quantum Onyx Project",
        category: "script",
        price: 0,
        description: "Best script for Blox fruits",
        icon: "⚔️",
        image: "",
        link: "https://discord.gg/7uxfCKCN7t"
    },

    {
        name: "Futuristic Building Pack",
        category: "asset",
        price: 150,
        description: "Premium futuristic buildings and props.",
        icon: "🧱",
        image: "",
        link: "https://discord.gg/rjwkfeS2fV"
    },

    {
        name: "UI Pack",
        category: "asset",
        price: 50,
        description: "UI elements for Roblox games.",
        icon: "🎨",
        image: "",
        link: "https://discord.gg/rjwkfeS2fV"
    }

];



/* ==================================================
   PRODUITS
================================================== */

const productsContainer =
    document.getElementById(
        "products-container"
    );

const noProducts =
    document.getElementById(
        "no-products"
    );


function getCategoryClass(category) {
    return category + "-image";
}


function createProduct(product) {

    const card =
        document.createElement("div");

    card.className =
        "product-card";

    card.dataset.category =
        product.category;

    let imageContent = "";

    if (
        product.image &&
        product.image.trim() !== ""
    ) {

        imageContent = `
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >
        `;

    } else {

        imageContent = `
            <span>${product.icon}</span>
        `;
    }

    card.innerHTML = `

        <div class="product-image ${getCategoryClass(product.category)}">
            ${imageContent}
        </div>

        <div class="product-info">

            <div class="product-category">
                ${product.category.toUpperCase()}
            </div>

            <h3>
                ${product.name}
            </h3>

            <p>
                ${product.description}
            </p>

            <div class="product-bottom">

                <div class="price">
                    <span>R$</span> ${product.price}
                </div>

                <button
                    class="buy"
                    onclick="buyProduct('${product.link}')">
                    BUY →
                </button>

            </div>

        </div>

    `;

    return card;
}


/* ==================================================
   AFFICHER LES PRODUITS
================================================== */

function renderProducts() {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        const card =
            createProduct(product);

        productsContainer.appendChild(card);

    });

    updateNoProducts();
}


/* ==================================================
   FILTRE
================================================== */

function filterProducts(category, button) {

    const cards =
        document.querySelectorAll(
            ".product-card"
        );

    const buttons =
        document.querySelectorAll(
            ".category"
        );

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    let visibleProducts = 0;

    cards.forEach(card => {

        if (
            category === "all" ||
            card.dataset.category === category
        ) {

            card.style.display = "";
            visibleProducts++;

        } else {

            card.style.display = "none";
        }

    });

    if (visibleProducts === 0) {
        noProducts.style.display = "block";
    } else {
        noProducts.style.display = "none";
    }
}


/* ==================================================
   NO PRODUCTS
================================================== */

function updateNoProducts() {

    const cards =
        document.querySelectorAll(
            ".product-card"
        );

    if (cards.length === 0) {
        noProducts.style.display = "block";
    } else {
        noProducts.style.display = "none";
    }
}


/* ==================================================
   CATÉGORIES
================================================== */

document
    .querySelectorAll(".category")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                filterProducts(
                    button.dataset.category,
                    button
                );

            }
        );

    });


/* ==================================================
   NAVIGATION
================================================== */

document
    .querySelectorAll("[data-nav-category]")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const category =
                    link.dataset.navCategory;

                const button =
                    document.querySelector(
                        `.category[data-category="${category}"]`
                    );

                filterProducts(
                    category,
                    button
                );

            }
        );

    });


/* ==================================================
   SCROLL
================================================== */

function scrollToStore() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* ==================================================
   BUY
================================================== */

function buyProduct(url) {

    if (
        !url ||
        url === "https://www.roblox.com/"
    ) {

        alert(
            "Le lien Roblox de ce produit n'est pas encore configuré."
        );

        return;
    }

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );
}


/* ==================================================
   LOADING SCREEN
================================================== */

let progress = 0;

const percent =
    document.getElementById("percent");

const loadingProgress =
    document.querySelector(
        ".loading-progress"
    );

const loadingScreen =
    document.getElementById(
        "loading-screen"
    );

const store =
    document.getElementById("store");

document.body.style.overflow =
    "hidden";


const loading =
    setInterval(() => {

        progress++;

        percent.textContent =
            progress;

        loadingProgress.style.width =
            progress + "%";

        if (progress >= 100) {

            clearInterval(loading);

            setTimeout(() => {

                loadingScreen.style.opacity =
                    "0";

                setTimeout(() => {

                    loadingScreen.style.display =
                        "none";

                    store.style.display =
                        "block";

                    document.body.style.overflow =
                        "auto";

                }, 500);

            }, 300);
        }

    }, 25);


/* ==================================================
   INITIALISATION
================================================== */

renderProducts();



