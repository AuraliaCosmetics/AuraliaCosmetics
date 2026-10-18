/* =====================================================
   AURALIA COSMETICS
   SHOPPING CART
===================================================== */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Glow Beauty Serum",
        category: "skincare",
        categoryName: "CHĂM SÓC DA",
        price: 289000,
        description: "Serum dưỡng sáng và cấp ẩm cho làn da.",
        image: "images/product-01.jpg"
    },

    {
        id: 2,
        name: "Velvet Lip Cream",
        category: "lips",
        categoryName: "SON MÔI",
        price: 199000,
        description: "Son kem lì mềm mịn với màu sắc trẻ trung.",
        image: "images/product-02.jpg"
    },

    {
        id: 3,
        name: "Soft Blush",
        category: "makeup",
        categoryName: "TRANG ĐIỂM",
        price: 229000,
        description: "Má hồng mịn nhẹ tạo hiệu ứng tự nhiên.",
        image: "images/product-03.jpg"
    },

    {
        id: 4,
        name: "Daily Moisture Cream",
        category: "skincare",
        categoryName: "CHĂM SÓC DA",
        price: 259000,
        description: "Kem dưỡng ẩm nhẹ dịu sử dụng hàng ngày.",
        image: "images/product-04.jpg"
    },

    {
        id: 5,
        name: "Nude Lip Gloss",
        category: "lips",
        categoryName: "SON MÔI",
        price: 179000,
        description: "Son bóng trong trẻo cho đôi môi căng mọng.",
        image: "images/product-02.jpg"
    },

    {
        id: 6,
        name: "Pure Skin Toner",
        category: "skincare",
        categoryName: "CHĂM SÓC DA",
        price: 219000,
        description: "Toner cân bằng và làm dịu làn da.",
        image: "images/product-01.jpg"
    },

    {
        id: 7,
        name: "Silky Foundation",
        category: "makeup",
        categoryName: "TRANG ĐIỂM",
        price: 329000,
        description: "Kem nền mỏng nhẹ với độ che phủ tự nhiên.",
        image: "images/product-03.jpg"
    },

    {
        id: 8,
        name: "Rose Blush",
        category: "makeup",
        categoryName: "TRANG ĐIỂM",
        price: 239000,
        description: "Phấn má sắc hồng nhẹ nhàng và nữ tính.",
        image: "images/product-03.jpg"
    }

];


/* ================= CART ================= */

let cart = [];


/* ================= PRICE ================= */

function money(number) {

    return number.toLocaleString("vi-VN") + "₫";

}


/* ================= LOAD ================= */

function loadCart() {

    const saved =
        localStorage.getItem("AuraliaCosmeticsCart");

    if (saved) {

        cart = JSON.parse(saved);

    }

}


/* ================= SAVE ================= */

function saveCart() {

    localStorage.setItem(
        "AuraliaCosmeticsCart",
        JSON.stringify(cart)
    );

}


/* ================= PRODUCTS ================= */

function renderProducts(list = products) {

    const grid =
        document.getElementById("productGrid");


    grid.innerHTML = "";


    list.forEach(product => {

        const card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="
                        this.style.display='none';
                        this.nextElementSibling.style.display='flex';
                    "
                >

                <div
                    class="product-placeholder"
                    style="display:none;"
                >
                    A
                </div>

            </div>


            <div class="product-info">

                <div class="product-category">

                    ${product.categoryName}

                </div>


                <h3 class="product-name">

                    ${product.name}

                </h3>


                <p class="product-description">

                    ${product.description}

                </p>


                <div class="product-bottom">

                    <strong class="product-price">

                        ${money(product.price)}

                    </strong>


                    <button
                        class="add-btn"
                        onclick="addToCart(${product.id})"
                    >

                        +

                    </button>

                </div>

            </div>

        `;


        grid.appendChild(card);

    });

}


/* ================= FILTER ================= */

function filterProducts(category, button) {

    document
        .querySelectorAll(".filter")
        .forEach(item => {

            item.classList.remove("active");

        });


    button.classList.add("active");


    if (category === "all") {

        renderProducts();

        return;

    }


    const filtered =
        products.filter(
            product =>
                product.category === category
        );


    renderProducts(filtered);

}


/* ================= ADD ================= */

function addToCart(id) {

    const product =
        products.find(
            product => product.id === id
        );


    if (!product) return;


    const existing =
        cart.find(
            item => item.id === id
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            id: product.id,

            name: product.name,

            price: product.price,

            quantity: 1

        });

    }


    saveCart();

    updateCart();

    openCart();

}


/* ================= UPDATE ================= */

function updateCart() {

    const count =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    document
        .getElementById("cartCount")
        .textContent = count;


    renderCart();

}


/* ================= RENDER CART ================= */

function renderCart() {

    const container =
        document.getElementById("cartItems");


    const totalElement =
        document.getElementById("cartTotal");


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty">

                <div>

                    🛍

                    <br><br>

                    Giỏ hàng đang trống.

                </div>

            </div>

        `;


        totalElement.textContent =
            "0₫";


        return;

    }


    let total = 0;


    container.innerHTML = "";


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        const div =
            document.createElement("div");


        div.className =
            "cart-item";


        div.innerHTML = `

            <div class="cart-item-top">

                <div class="cart-item-name">

                    ${item.name}

                </div>

                <div class="cart-item-price">

                    ${money(item.price)}

                </div>

            </div>


            <div class="cart-item-bottom">

                <div class="quantity">

                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            -1
                        )"
                    >
                        −
                    </button>


                    <span>

                        ${item.quantity}

                    </span>


                    <button
                        onclick="changeQuantity(
                            ${item.id},
                            1
                        )"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove"
                    onclick="removeItem(${item.id})"
                >

                    Xóa

                </button>

            </div>

        `;


        container.appendChild(div);

    });


    totalElement.textContent =
        money(total);

}


/* ================= QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(
            item => item.id === id
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                item => item.id !== id
            );

    }


    saveCart();

    updateCart();

}


/* ================= REMOVE ================= */

function removeItem(id) {

    cart =
        cart.filter(
            item => item.id !== id
        );


    saveCart();

    updateCart();

}


/* ================= OPEN CART ================= */

function openCart() {

    document
        .getElementById("cart")
        .classList.add("active");


    document
        .getElementById("overlay")
        .classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cart")
        .classList.remove("active");


    document
        .getElementById("overlay")
        .classList.remove("active");

}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {

        alert(
            "Giỏ hàng của bạn đang trống."
        );

        return;

    }


    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


/* ================= CLOSE CHECKOUT ================= */

function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}


/* ================= ORDER ================= */

function submitOrder(event) {

    event.preventDefault();


    const order = {

        name:
            document.getElementById("name").value,

        phone:
            document.getElementById("phone").value,

        address:
            document.getElementById("address").value,

        note:
            document.getElementById("note").value,

        products:
            [...cart],

        total:
            cart.reduce(
                (sum, item) =>
                    sum +
                    item.price *
                    item.quantity,
                0
            ),

        time:
            new Date().toLocaleString("vi-VN")

    };


    /*
       LƯU ĐƠN HÀNG DEMO
    */

    localStorage.setItem(
        "AuraliaCosmeticsLastOrder",
        JSON.stringify(order)
    );


    console.log(
        "AuraliaCosmetics Order:",
        order
    );


    cart = [];


    saveCart();

    updateCart();

    closeCheckout();

    closeCart();


    document
        .getElementById("success")
        .classList.add("active");


    event.target.reset();

}


/* ================= SUCCESS ================= */

function closeSuccess() {

    document
        .getElementById("success")
        .classList.remove("active");

}


/* ================= NEWSLETTER ================= */

function subscribe(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("email")
            .value;


    localStorage.setItem(
        "AuraliaCosmeticsEmail",
        email
    );


    alert(
        "Cảm ơn bạn đã đăng ký cùng AuraliaCosmetics!"
    );


    event.target.reset();

}


/* ================= MOBILE MENU ================= */

function toggleMenu() {

    document
        .getElementById("mobileMenu")
        .classList.toggle("active");

}


function closeMenu() {

    document
        .getElementById("mobileMenu")
        .classList.remove("active");

}


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCart();

        renderProducts();

        updateCart();

    }
);
