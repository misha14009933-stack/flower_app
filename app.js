document.addEventListener("DOMContentLoaded", () => {

    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.MainButton.hide();

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

    // 🔒 Гарантируем контейнер
    let productsContainer = document.querySelector(".products");

    if (!productsContainer) {
        console.warn("Контейнер .products не найден — создаю вручную");

        productsContainer = document.createElement("div");
        productsContainer.className = "products";

        const content = document.querySelector(".content") || document.body;
        content.appendChild(productsContainer);
    }

    function renderProducts() {
        productsContainer.innerHTML = "";

        products.forEach(product => {
            const card = document.createElement("div");

            // временный forced-style (чтобы ТОЧНО было видно)
    card.className = "card";

            card.innerHTML = `
                <div class="badge">Доставим завтра</div>
                <img src="${product.image}" style="width:100%;height:100px;object-fit:cover">
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

tg.MainButton.onClick(() => {
    document.getElementById("orderForm").classList.remove("hidden");
    tg.MainButton.hide();
});

        tg.sendData(JSON.stringify(order));
    });

    console.log("Контейнер:", productsContainer);
    console.log("Карточки:", products.length);

    renderProducts();
});
document.getElementById("confirmOrder").onclick = () => {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (!name || !phone) {
        alert("Введите имя и телефон");
        return;
    }

    const order = {
        customer: { name, phone, comment },
        items: products.filter(p => p.qty > 0),
        total: products.reduce((s, p) => s + p.qty * p.price, 0)
    };

    tg.sendData(JSON.stringify(order));
};
