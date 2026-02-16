const products = [
    {
        id: 1,
        name: "Розовая охапка",
        price: 5500,
        image: "https://via.placeholder.com/300x300",
        qty: 0
    },
    {
        id: 2,
        name: "Гвоздика кустовая",
        price: 2000,
        image: "https://via.placeholder.com/300x300",
        qty: 0
    }
];

const productsContainer = document.querySelector(".products");

function renderProducts() {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <div class="badge">Доставим завтра</div>
            <img src="${product.image}">
            <div class="title">${product.name}</div>
            <div class="price">${product.price} ₽</div>
            <div class="controls">
                <button onclick="changeQty(${product.id}, -1)">-</button>
                <span>${product.qty}</span>
                <button onclick="changeQty(${product.id}, 1)">+</button>
            </div>
        `;

        productsContainer.appendChild(card);
    });
}

function changeQty(id, delta) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    product.qty += delta;
    if (product.qty < 0) product.qty = 0;

    renderProducts();
    updateCart();
}

function updateCart() {
    const totalQty = products.reduce((sum, p) => sum + p.qty, 0);
    const totalPrice = products.reduce((sum, p) => sum + p.qty * p.price, 0);

    const cartBtn = document.querySelector(".cart-btn");
    if (!cartBtn) return;

    if (totalQty > 0) {
        cartBtn.innerText = `🛒 ${totalPrice} ₽`;
        cartBtn.style.display = "block";
    } else {
        cartBtn.style.display = "none";
    }
}

renderProducts();
