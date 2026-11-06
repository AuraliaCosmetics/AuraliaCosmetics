/* =====================================================
   AURALIA COSMETICS
   SHOPPING CART
===================================================== */


/* ================= PRODUCTS ================= */

const products = [

    {
        id: 1,
        name: "Control Cushion",
        category: "skincare",
        categoryName: "CUSHION",
        price: 289000,
        description: "Dành Riêng Cho Da Dầu Và Da Hỗn Hợp Thiên Dầu.",
        image: "images/anh6.png"
    },

    {
        id: 2,
        name: "Lumi Tint",
        category: "lips",
        categoryName: "SON MÔI",
        price: 199000,
        description: "Một Chạm, Vạn Sắc.",
        image: "images/anh5.png"
    },

    {
        id: 3,
        name: "Rose Flame",
        category: "makeup",
        categoryName: "PHẤN MẮT",
        price: 229000,
        description: "Biến Hóa Trong Từng Ánh Nhìn .",
        image: "images/phanmat.png"
    },

    {
        id: 4,
        name: "Glow Hydrating Cushion",
        category: "skincare",
        categoryName: "CUSHION",
        price: 259000,
        description: " Thiết Kế Dành Cho Làn Da Khô Và Thiếu Ẩm.",
        image: "images/anh9.png"
    },

    {
        id: 5,
        name: "Velvet Cloud",
        category: "lips",
        categoryName: "SON MÔI",
        price: 179000,
        description: "Mềm Như Nhung, Đẹp Như Mơ.",
        image: "images/anh4.png"
    },

    {
        id: 6,
        name: "Blush Veil",
        category: "blusher",
        categoryName: "MÁ HỒNG",
        price: 219000,
        description: " Tươi Tắn, Rạng Rỡ.",
        image: "images/anh2.png"
    },

    {
        id: 7,
        name: "Mocha Aura",
        category: "makeup",
        categoryName: "PHẤN MẮT",
        price: 329000,
        description: "Chạm Sắc Trầm , Tỏa Khí Chất.",
        image: "images/anh10.png"
    },

    {
        id: 8,
        name: "Peach Bloom",
        category: "makeup",
        categoryName: "PHẤN MẮT",
        price: 239000,
        description: "Một Chút Đào ,Vạn Nét Xinh.",
        image: "images/anh11.png"
    },
    {
        id: 9,
        name: "Hydra Glow Essence",
        category: "blusher",
        categoryName: "MÁ HỒNG",
        price: 269000,
        description: "Căng Mịn, Tự Nhiên.",
        image: "images/anh8.png"
    },
    {
        id: 10,
        name: "Phấn Phủ Bột Auralia",
        category: "powder",
        categoryName: "PHẤN PHỦ",
        price: 189000,
        description: "Tạo hiệu ứng nền mịn, tự nhiên.",
        image: "images/anh12.png"
    },
    {
        id: 11,
        name: "Pure Matte",
        category: "lips",
        categoryName: "SON MÔI",
        price: 209000,
        description: "Sắc Lì Phủ Môi, Thần Thái Lên Ngôi.",
        image: "images/anh1.png"
    },
    {
        id: 12,
        name: "Clay Mood",
        category: "lips",
        categoryName: "SON MÔI",
        price: 199000,
        description: "Sắc Đất, Nét Riêng.",
        image: "images/anh3.png"
    },
   {
        id: 13,
        name: "Phấn Phủ Nén Auralia",
        category: "powder",
        categoryName: "PHẤN PHỦ",
        price: 189000,
        description: "Cho hiệu ứng da mịn, nhẹ và tự nhiên.",
        image: "images/anh7.png"
    },

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


/* ================= BLOG (Firebase) ================= */

const auth = firebase.auth();

let blogPosts = [];

let isAdmin = false;


function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


async function loadBlog() {

    try {

        const snap = await db
            .collection("posts")
            .orderBy("createdAt", "desc")
            .get();

        blogPosts = snap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

    } catch (error) {

        console.error(error);

        blogPosts = [];

    }

    renderBlog();

}


function renderBlog() {

    const grid = document.getElementById("blogGrid");

    if (!grid) return;

    if (blogPosts.length === 0) {

        grid.innerHTML = `
            <div class="blog-empty">
                Chưa có bài viết nào.
            </div>
        `;

        return;

    }

    grid.innerHTML = blogPosts.map(post => {

        const excerpt =
            post.content.length > 120
                ? post.content.slice(0, 120) + "..."
                : post.content;

        const image = post.image
            ? `<img src="${post.image}" alt="${escapeHtml(post.title)}">`
            : "A";

        const deleteBtn = isAdmin
            ? `<button class="blog-delete"
                       onclick="event.stopPropagation(); deleteBlogPost('${post.id}')">
                   Xóa
               </button>`
            : "";

        return `
            <article class="blog-card"
                     onclick="openBlogPost('${post.id}')">

                <div class="blog-card-image">
                    ${image}
                </div>

                <div class="blog-card-body">

                    <div class="blog-card-meta">
                        ${escapeHtml(post.author)} · ${escapeHtml(post.date)}
                    </div>

                    <h3>${escapeHtml(post.title)}</h3>

                    <p>${escapeHtml(excerpt)}</p>

                    <div class="blog-card-footer">
                        <span class="blog-card-meta">ĐỌC TIẾP →</span>
                        ${deleteBtn}
                    </div>

                </div>

            </article>
        `;

    }).join("");

}


function toggleBlogForm() {

    document
        .getElementById("blogForm")
        .classList.toggle("active");

}


function resizeImage(file, callback) {

    const reader = new FileReader();

    reader.onload = function(e) {

        const img = new Image();

        img.onload = function() {

            const max = 800;

            const scale =
                Math.min(1, max / Math.max(img.width, img.height));

            const canvas = document.createElement("canvas");

            canvas.width = img.width * scale;

            canvas.height = img.height * scale;

            canvas
                .getContext("2d")
                .drawImage(img, 0, 0, canvas.width, canvas.height);

            callback(canvas.toDataURL("image/jpeg", 0.75));

        };

        img.onerror = function() {

            alert("Không đọc được ảnh này, bài viết sẽ được đăng không kèm ảnh.");

            callback("");

        };

        img.src = e.target.result;

    };

    reader.onerror = function() {

        alert("Không đọc được ảnh này, bài viết sẽ được đăng không kèm ảnh.");

        callback("");

    };

    reader.readAsDataURL(file);

}


async function submitBlogPost(event) {

    event.preventDefault();

    const form = event.target;

    const file =
        document.getElementById("blogImageFile").files[0];

    const image = file
        ? await new Promise(resolve => resizeImage(file, resolve))
        : "";

    try {

        await db.collection("posts").add({

            title:
                document.getElementById("blogTitle").value.trim(),

            author:
                document.getElementById("blogAuthor").value.trim()
                || "Auralia Cosmetics",

            content:
                document.getElementById("blogContent").value.trim(),

            image: image,

            date: new Date().toLocaleDateString("vi-VN"),

            createdAt:
                firebase.firestore.FieldValue.serverTimestamp()

        });

        form.reset();

        form.classList.remove("active");

        await loadBlog();

    } catch (error) {

        console.error(error);

        alert("Không đăng được bài: " + error.message);

    }

}


async function deleteBlogPost(id) {

    if (!confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    try {

        await db.collection("posts").doc(id).delete();

        await loadBlog();

    } catch (error) {

        alert("Không xóa được bài: " + error.message);

    }

}


function openBlogPost(id) {

    window.location.href = "post.html?id=" + id;

}


/* ================= ADMIN LOGIN ================= */

function toggleLoginForm() {

    document
        .getElementById("loginForm")
        .classList.toggle("active");

}


function loginAdmin(event) {

    event.preventDefault();

    auth
        .signInWithEmailAndPassword(
            document.getElementById("loginEmail").value.trim(),
            document.getElementById("loginPassword").value
        )
        .then(() => {

            event.target.reset();

            event.target.classList.remove("active");

        })
        .catch(() => {

            alert("Email hoặc mật khẩu không đúng.");

        });

}


function logoutAdmin() {

    auth.signOut();

}


function updateAdminUI() {

    document.getElementById("blogWriteBtn").style.display =
        isAdmin ? "inline-block" : "none";

    document.getElementById("blogLogoutBtn").style.display =
        isAdmin ? "inline-block" : "none";

    document.getElementById("blogLoginBtn").style.display =
        isAdmin ? "none" : "inline-block";

    if (!isAdmin) {

        document.getElementById("blogForm").classList.remove("active");

    }

}


auth.onAuthStateChanged(function(user) {

    isAdmin = !!user;

    updateAdminUI();

    renderBlog();

});


document.addEventListener(
    "DOMContentLoaded",
    loadBlog
);


/* ================= START ================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCart();

        renderProducts();

        updateCart();

    }
);
