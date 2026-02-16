document.addEventListener("DOMContentLoaded", () => {

    const tg = window.Telegram.WebApp;
tg.ready();

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
                    <button class="minus">-</button>
                    <span>${product.qty}</span>
                    <button class="plus">+</button>
                </div>
            `;

            card.querySelector(".minus").onclick = () => changeQty(product.id, -1);
            card.querySelector(".plus").onclick = () => changeQty(product.id, 1);

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

    const badge = document.getElementById("cartCount");

    if (totalQty > 0) {
        badge.innerText = totalQty;
        badge.style.display = "inline-block";

        tg.MainButton.setText(`Оформить заказ · ${totalPrice} ₽`);
        tg.MainButton.show();
    } else {
        badge.style.display = "none";
        tg.MainButton.hide();
    }
}


    renderProducts();
});
