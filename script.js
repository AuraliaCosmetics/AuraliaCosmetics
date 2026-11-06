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

        const plain = (post.content || "")
            .replace(/\[\[img:\d+\]\]/g, " ")
            .replace(/\s+/g, " ")
            .trim();

        const excerpt =
            plain.length > 120
                ? plain.slice(0, 120) + "..."
                : plain;

        const covers = getPostCovers(post);

        const image = covers.length
            ? `<img src="${covers[0]}" alt="${escapeHtml(post.title)}">`
            : "A";

        const adminBtns = isAdmin
            ? `<span class="blog-admin-btns">
                   <button class="blog-delete"
                           onclick="event.stopPropagation(); editBlogPost('${post.id}')">
                       Sửa
                   </button>
                   <button class="blog-delete"
                           onclick="event.stopPropagation(); deleteBlogPost('${post.id}')">
                       Xóa
                   </button>
               </span>`
            : "";

        const deleteBtn = adminBtns;

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


/* ---------- Trạng thái form bài viết ---------- */

let editingPostId = null;      // null = đăng bài mới, có id = đang sửa

let coverImages = [];          // mảng dataURL ảnh bìa

let savedRange = null;         // vị trí con trỏ trong trình soạn thảo

const MAX_POST_BYTES = 950000; // giới hạn 1MB của Firestore (chừa dư)


function getPostCovers(post) {

    if (Array.isArray(post.images) && post.images.length) {

        return post.images;

    }

    return post.image ? [post.image] : [];

}


function editorEl() {

    return document.getElementById("blogContent");

}


/* ---------- Mở / đóng form ---------- */

function resetBlogForm() {

    const form = document.getElementById("blogForm");

    form.reset();

    editorEl().innerHTML = "";

    coverImages = [];

    renderCoverPreview();

    editingPostId = null;

    document.getElementById("blogSubmitBtn").textContent = "ĐĂNG BÀI";

}


function newBlogPost() {

    const form = document.getElementById("blogForm");

    if (form.classList.contains("active") && editingPostId === null) {

        form.classList.remove("active");

        return;

    }

    resetBlogForm();

    form.classList.add("active");

}


function closeBlogForm() {

    document.getElementById("blogForm").classList.remove("active");

    resetBlogForm();

}


function toggleBlogForm() {

    newBlogPost();

}


/* ---------- Xử lý ảnh ---------- */

function resizeImage(file, maxSize, quality) {

    return new Promise(resolve => {

        const reader = new FileReader();

        reader.onload = function(e) {

            const img = new Image();

            img.onload = function() {

                const scale =
                    Math.min(1, maxSize / Math.max(img.width, img.height));

                const canvas = document.createElement("canvas");

                canvas.width = Math.round(img.width * scale);

                canvas.height = Math.round(img.height * scale);

                canvas
                    .getContext("2d")
                    .drawImage(img, 0, 0, canvas.width, canvas.height);

                resolve(canvas.toDataURL("image/jpeg", quality));

            };

            img.onerror = function() {

                alert("Không đọc được một ảnh, ảnh đó sẽ bị bỏ qua.");

                resolve("");

            };

            img.src = e.target.result;

        };

        reader.onerror = function() {

            alert("Không đọc được một ảnh, ảnh đó sẽ bị bỏ qua.");

            resolve("");

        };

        reader.readAsDataURL(file);

    });

}


/* ---------- Ảnh bìa (nhiều ảnh) ---------- */

async function addCoverImages(input) {

    const files = Array.from(input.files || []);

    for (const file of files) {

        const data = await resizeImage(file, 900, 0.7);

        if (data) coverImages.push(data);

    }

    input.value = "";

    renderCoverPreview();

}


function removeCoverImage(index) {

    coverImages.splice(index, 1);

    renderCoverPreview();

}


function moveCoverFirst(index) {

    const [item] = coverImages.splice(index, 1);

    coverImages.unshift(item);

    renderCoverPreview();

}


function renderCoverPreview() {

    const box = document.getElementById("coverPreview");

    box.innerHTML = coverImages.map((src, i) => `
        <div class="cover-thumb">
            <img src="${src}" alt="">
            ${i === 0
                ? `<span class="cover-badge">Ảnh chính</span>`
                : `<button type="button" class="cover-main"
                           onclick="moveCoverFirst(${i})">Đặt làm chính</button>`}
            <button type="button" class="cover-remove"
                    onclick="removeCoverImage(${i})">×</button>
        </div>
    `).join("");

}


/* ---------- Trình soạn thảo nội dung ---------- */

function saveSelection() {

    const sel = window.getSelection();

    if (sel.rangeCount && editorEl().contains(sel.anchorNode)) {

        savedRange = sel.getRangeAt(0).cloneRange();

    }

}


function restoreSelection() {

    const editor = editorEl();

    editor.focus();

    const sel = window.getSelection();

    sel.removeAllRanges();

    if (savedRange && editor.contains(savedRange.startContainer)) {

        sel.addRange(savedRange);

    } else {

        const range = document.createRange();

        range.selectNodeContents(editor);

        range.collapse(false);

        sel.addRange(range);

    }

}


function insertImageAtCaret(dataUrl) {

    restoreSelection();

    const sel = window.getSelection();

    const range = sel.getRangeAt(0);

    range.deleteContents();

    const img = document.createElement("img");

    img.src = dataUrl;

    img.className = "editor-img";

    const br = document.createElement("br");

    range.insertNode(br);

    range.insertNode(img);

    range.setStartAfter(br);

    range.collapse(true);

    sel.removeAllRanges();

    sel.addRange(range);

    savedRange = range.cloneRange();

}


async function insertImageFiles(files) {

    for (const file of files) {

        if (!file.type.startsWith("image/")) continue;

        const data = await resizeImage(file, 800, 0.7);

        if (data) insertImageAtCaret(data);

    }

}


async function insertImagesFromInput(input) {

    const files = Array.from(input.files || []);

    await insertImageFiles(files);

    input.value = "";

}


function setupEditor() {

    const editor = editorEl();

    if (!editor) return;

    ["keyup", "mouseup", "blur", "input"].forEach(evt =>
        editor.addEventListener(evt, saveSelection)
    );

    editor.addEventListener("paste", function(e) {

        const clip = e.clipboardData;

        if (!clip) return;

        const imageFiles = Array.from(clip.files || [])
            .filter(f => f.type.startsWith("image/"));

        if (imageFiles.length) {

            e.preventDefault();

            insertImageFiles(imageFiles);

            return;

        }

        // Dán văn bản thuần để không mang theo định dạng lạ
        const text = clip.getData("text/plain");

        if (text) {

            e.preventDefault();

            document.execCommand("insertText", false, text);

        }

    });

    editor.addEventListener("drop", function(e) {

        const files = Array.from(e.dataTransfer.files || [])
            .filter(f => f.type.startsWith("image/"));

        if (files.length) {

            e.preventDefault();

            insertImageFiles(files);

        }

    });

}


/* Chuyển nội dung editor -> { content (văn bản có [[img:N]]), contentImages } */

function serializeEditor() {

    const editor = editorEl();

    const contentImages = [];

    let text = "";

    function ensureNewline() {

        if (text && !text.endsWith("\n")) text += "\n";

    }

    function walk(node) {

        node.childNodes.forEach(child => {

            if (child.nodeType === Node.TEXT_NODE) {

                text += child.textContent;

            } else if (child.nodeName === "IMG") {

                contentImages.push(child.getAttribute("src"));

                text += "[[img:" + (contentImages.length - 1) + "]]";

            } else if (child.nodeName === "BR") {

                text += "\n";

            } else if (child.nodeType === Node.ELEMENT_NODE) {

                const block = /^(DIV|P|H[1-6]|LI)$/.test(child.nodeName);

                if (block) ensureNewline();

                walk(child);

                if (block) ensureNewline();

            }

        });

    }

    walk(editor);

    text = text.replace(/\n{3,}/g, "\n\n").trim();

    return { content: text, contentImages };

}


/* Chuyển content lưu trong Firestore -> HTML cho editor */

function contentToEditorHtml(content, contentImages) {

    return escapeHtml(content || "")
        .replace(/\[\[img:(\d+)\]\]/g, function(_, n) {

            const src = (contentImages || [])[Number(n)];

            return src
                ? `<img class="editor-img" src="${src}">`
                : "";

        })
        .replace(/\n/g, "<br>");

}


/* ---------- Đăng / sửa bài ---------- */

async function submitBlogPost(event) {

    event.preventDefault();

    const form = event.target;

    const { content, contentImages } = serializeEditor();

    if (!content && contentImages.length === 0) {

        alert("Vui lòng nhập nội dung bài viết.");

        return;

    }

    const data = {

        title:
            document.getElementById("blogTitle").value.trim(),

        author:
            document.getElementById("blogAuthor").value.trim()
            || "Auralia Cosmetics",

        content: content,

        contentImages: contentImages,

        images: coverImages,

        image: coverImages[0] || ""

    };

    const size = JSON.stringify(data).length;

    if (size > MAX_POST_BYTES) {

        alert(
            "Bài viết có quá nhiều ảnh (" +
            Math.round(size / 1024) +
            " KB, tối đa khoảng 930 KB). Hãy bớt ảnh bìa hoặc ảnh trong nội dung rồi thử lại."
        );

        return;

    }

    const submitBtn = document.getElementById("blogSubmitBtn");

    submitBtn.disabled = true;

    try {

        if (editingPostId) {

            data.updatedAt =
                firebase.firestore.FieldValue.serverTimestamp();

            await db.collection("posts").doc(editingPostId).update(data);

        } else {

            data.date = new Date().toLocaleDateString("vi-VN");

            data.createdAt =
                firebase.firestore.FieldValue.serverTimestamp();

            await db.collection("posts").add(data);

        }

        closeBlogForm();

        await loadBlog();

    } catch (error) {

        console.error(error);

        alert("Không lưu được bài: " + error.message);

    } finally {

        submitBtn.disabled = false;

    }

}


function editBlogPost(id) {

    const post = blogPosts.find(p => p.id === id);

    if (!post) return;

    resetBlogForm();

    editingPostId = id;

    document.getElementById("blogTitle").value = post.title || "";

    document.getElementById("blogAuthor").value = post.author || "";

    coverImages = getPostCovers(post).slice();

    renderCoverPreview();

    editorEl().innerHTML =
        contentToEditorHtml(post.content, post.contentImages);

    document.getElementById("blogSubmitBtn").textContent = "LƯU THAY ĐỔI";

    const form = document.getElementById("blogForm");

    form.classList.add("active");

    form.scrollIntoView({ behavior: "smooth", block: "start" });

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

        setupEditor();

        renderProducts();

        updateCart();

    }
);
