const API = "http://localhost:3000/api";

let token = localStorage.getItem("auralia_token");

let products = [];
let orders = [];

const money = value =>
    Number(value || 0).toLocaleString("vi-VN") + "₫";


/* =========================
   API
========================= */

async function api(url, options = {}) {

    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {})
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(API + url, {
        ...options,
        headers
    });

    if (response.status === 401 || response.status === 403) {

        alert("Phiên đăng nhập không hợp lệ.");

        logout();

        return null;
    }

    const data = await response.json();

    if (!response.ok) {

        throw new Error(
            data.message || "Có lỗi xảy ra."
        );
    }

    return data;
}


/* =========================
   AUTH
========================= */

async function checkAdmin() {

    if (!token) {

        alert("Bạn cần đăng nhập tài khoản Admin.");

        window.location.href =
            "../frontend/index.html";

        return;

    }

    try {

        const data =
            await api("/auth/me");

        if (!data) return;

        if (data.user.role !== "admin") {

            alert("Tài khoản không có quyền Admin.");

            logout();

            return;

        }

        document.querySelector("#adminName")
            .textContent = data.user.name;

    } catch (error) {

        alert(error.message);

        logout();

    }

}


function logout() {

    localStorage.removeItem("auralia_token");

    token = null;

    window.location.href =
        "../frontend/index.html";

}


document
    .querySelector("#logoutBtn")
    .addEventListener("click", logout);


/* =========================
   NAVIGATION
========================= */

document
    .querySelectorAll(".nav-item")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.section
                );

            }
        );

    });


function showSection(section) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    document
        .getElementById(section)
        .classList.add("active");


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.remove("active");

            if (
                button.dataset.section === section
            ) {

                button.classList.add("active");

            }

        });


    const titles = {

        dashboard: "Dashboard",

        products: "Sản phẩm",

        orders: "Đơn hàng",

        revenue: "Doanh thu"

    };


    document
        .querySelector("#pageTitle")
        .textContent =
        titles[section] || "Dashboard";


    if (section === "products") {

        loadProducts();

    }


    if (section === "orders") {

        loadOrders();

    }


    if (section === "revenue") {

        renderRevenue();

    }

}


/* =========================
   PRODUCTS
========================= */

async function loadProducts() {

    try {

        const data =
            await api("/products/admin/all");

        if (!data) return;

        products = data.products;

        renderProducts();

        updateDashboardStats();

    } catch (error) {

        alert(error.message);

    }

}


function renderProducts() {

    const tbody =
        document.querySelector("#productTable");

    tbody.innerHTML = "";


    const search =
        document
            .querySelector("#productSearch")
            .value
            .toLowerCase();


    const category =
        document
            .querySelector("#productCategory")
            .value;


    products
        .filter(product => {

            const matchSearch =
                product.name
                    .toLowerCase()
                    .includes(search);

            const matchCategory =
                category === "all" ||
                product.category === category;

            return (
                matchSearch &&
                matchCategory
            );

        })
        .forEach(product => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <div class="product-cell">

                        ${
                            product.image

                            ?

                            `<img
                                class="product-thumb"
                                src="${product.image}"
                                onerror="this.src=''"
                            >`

                            :

                            `<div class="product-thumb">
                                A
                            </div>`
                        }

                        <div>

                            <strong>
                                ${escapeHTML(product.name)}
                            </strong>

                            <small>
                                #${product.id}
                            </small>

                        </div>

                    </div>

                </td>


                <td>
                    ${categoryName(product.category)}
                </td>


                <td>
                    ${money(product.sale_price ?? product.price)}
                </td>


                <td>

                    <strong
                        class="${
                            product.stock < 10
                            ? "low-stock"
                            : ""
                        }"
                    >

                        ${product.stock}

                    </strong>

                </td>


                <td>

                    <span class="status ${
                        product.active
                        ? "completed"
                        : "cancelled"
                    }">

                        ${
                            product.active
                            ? "Đang bán"
                            : "Đã ẩn"
                        }

                    </span>

                </td>


                <td>

                    <button
                        class="action-btn"
                        onclick="editProduct(${product.id})"
                    >
                        Sửa
                    </button>


                    ${
                        product.active

                        ?

                        `<button
                            class="action-btn"
                            onclick="hideProduct(${product.id})"
                        >
                            Ẩn
                        </button>`

                        :

                        ""

                    }

                </td>

            `;


            tbody.appendChild(row);

        });

}


function categoryName(category) {

    const categories = {

        skincare: "Chăm sóc da",

        makeup: "Trang điểm",

        lips: "Son môi"

    };

    return categories[category] || category;

}


function escapeHTML(text) {

    return String(text || "")
        .replace(/[&<>"']/g, char => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        })[char]);

}


/* SEARCH */

document
    .querySelector("#productSearch")
    .addEventListener(
        "input",
        renderProducts
    );


document
    .querySelector("#productCategory")
    .addEventListener(
        "change",
        renderProducts
    );


/* =========================
   ADD PRODUCT
========================= */

function openProductModal(product = null) {

    const modal =
        document.querySelector("#productModal");

    document.querySelector("#productForm")
        .reset();


    document.querySelector("#productId")
        .value = "";


    document.querySelector("#productModalTitle")
        .textContent =
        product
        ? "Chỉnh sửa sản phẩm"
        : "Thêm sản phẩm";


    if (product) {

        document.querySelector("#productId")
            .value = product.id;

        document.querySelector("#productName")
            .value = product.name;

        document.querySelector("#productSlug")
            .value = product.slug;

        document.querySelector("#productDescription")
            .value = product.description || "";

        document.querySelector("#productPrice")
            .value = product.price;

        document.querySelector("#productSale")
            .value = product.sale_price || "";

        document.querySelector("#productCat")
            .value = product.category;

        document.querySelector("#productStock")
            .value = product.stock;

        document.querySelector("#productImage")
            .value = product.image || "";

        document.querySelector("#productActive")
            .checked = product.active;

    }


    modal.classList.add("show");

}


function closeProductModal() {

    document
        .querySelector("#productModal")
        .classList.remove("show");

}


async function saveProduct(event) {

    event.preventDefault();


    const id =
        document.querySelector("#productId").value;


    const product = {

        name:
            document.querySelector("#productName").value,

        slug:
            document.querySelector("#productSlug").value,

        description:
            document.querySelector("#productDescription").value,

        price:
            Number(
                document.querySelector("#productPrice").value
            ),

        sale_price:
            document.querySelector("#productSale").value
            ?
            Number(
                document.querySelector("#productSale").value
            )
            :
            null,

        category:
            document.querySelector("#productCat").value,

        stock:
            Number(
                document.querySelector("#productStock").value
            ),

        image:
            document.querySelector("#productImage").value,

        active:
            document.querySelector("#productActive").checked

    };


    try {

        await api(

            id
            ? `/products/${id}`
            : "/products",

            {

                method:
                    id
                    ? "PUT"
                    : "POST",

                body:
                    JSON.stringify(product)

            }

        );


        closeProductModal();

        await loadProducts();

        alert(
            id
            ? "Đã cập nhật sản phẩm."
            : "Đã thêm sản phẩm."
        );


    } catch (error) {

        alert(error.message);

    }

}


document
    .querySelector("#productForm")
    .addEventListener(
        "submit",
        saveProduct
    );


function editProduct(id) {

    const product =
        products.find(
            product => product.id === id
        );

    if (product) {

        openProductModal(product);

    }

}


async function hideProduct(id) {

    if (
        !confirm(
            "Bạn có chắc muốn ẩn sản phẩm này?"
        )
    ) {

        return;

    }


    try {

        await api(
            `/products/${id}`,
            {
                method: "DELETE"
            }
        );


        await loadProducts();

    } catch (error) {

        alert(error.message);

    }

}


/* =========================
   ORDERS
========================= */

async function loadOrders() {

    try {

        const data =
            await api("/orders");

        if (!data) return;

        orders = data.orders;

        renderOrders();

        updateDashboardStats();

    } catch (error) {

        alert(error.message);

    }

}


function renderOrders() {

    const tbody =
        document.querySelector("#ordersTable");

    tbody.innerHTML = "";


    const filter =
        document.querySelector("#orderFilter").value;


    orders

        .filter(order =>

            filter === "all" ||
            order.status === filter

        )

        .forEach(order => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>
                        #AUR${String(order.id).padStart(5, "0")}
                    </strong>
                </td>


                <td>
                    ${escapeHTML(order.customer_name)}
                </td>


                <td>
                    ${escapeHTML(order.phone)}
                </td>


                <td>
                    <strong>
                        ${money(order.total)}
                    </strong>
                </td>


                <td>
                    ${
                        order.payment_method === "cod"
                        ? "COD"
                        : "Chuyển khoản"
                    }
                </td>


                <td>

                    <select
                        onchange="
                            updateOrderStatus(
                                ${order.id},
                                this.value
                            )
                        "
                    >

                        ${statusOptions(order.status)}

                    </select>

                </td>


                <td>

                    <button
                        class="action-btn"
                        onclick="viewOrder(${order.id})"
                    >

                        Xem

                    </button>

                </td>

            `;


            tbody.appendChild(row);

        });

}


function statusOptions(current) {

    const statuses = {

        pending: "Chờ xác nhận",

        confirmed: "Đã xác nhận",

        shipping: "Đang giao",

        completed: "Hoàn thành",

        cancelled: "Đã hủy"

    };


    return Object
        .entries(statuses)
        .map(
            ([key, value]) => `

                <option
                    value="${key}"
                    ${key === current ? "selected" : ""}
                >

                    ${value}

                </option>

            `
        )
        .join("");

}


document
    .querySelector("#orderFilter")
    .addEventListener(
        "change",
        renderOrders
    );


async function updateOrderStatus(
    id,
    status
) {

    try {

        await api(
            `/orders/${id}/status`,
            {

                method: "PUT",

                body:
                    JSON.stringify({
                        status
                    })

            }
        );


        await loadOrders();


    } catch (error) {

        alert(error.message);

    }

}


/* =========================
   ORDER DETAIL
========================= */

function viewOrder(id) {

    const order =
        orders.find(
            order => order.id === id
        );


    if (!order) return;


    const modal =
        document.querySelector("#orderModal");


    const detail =
        document.querySelector("#orderDetail");


    detail.innerHTML = `

        <div class="order-detail">

            <div class="detail-box">

                <h3>
                    Đơn #AUR${String(order.id).padStart(5, "0")}
                </h3>

                <p>
                    <strong>
                        Khách hàng:
                    </strong>

                    ${escapeHTML(order.customer_name)}

                </p>

                <p>
                    <strong>
                        SĐT:
                    </strong>

                    ${escapeHTML(order.phone)}

                </p>

                <p>
                    <strong>
                        Địa chỉ:
                    </strong>

                    ${escapeHTML(order.address)}

                </p>

                <p>
                    <strong>
                        Ghi chú:
                    </strong>

                    ${escapeHTML(order.note || "Không có")}

                </p>

            </div>


            <div class="detail-box">

                <h3>
                    Sản phẩm
                </h3>


                ${
                    order.items
                    .map(item => `

                        <div class="detail-item">

                            <span>

                                ${escapeHTML(item.name)}

                                × ${item.quantity}

                            </span>

                            <strong>

                                ${money(item.subtotal)}

                            </strong>

                        </div>

                    `)
                    .join("")
                }


                <div class="detail-item">

                    <strong>
                        Tổng cộng
                    </strong>

                    <strong>
                        ${money(order.total)}
                    </strong>

                </div>

            </div>


            <div class="detail-box">

                <h3>
                    Trạng thái
                </h3>

                <select
                    onchange="
                        updateOrderStatus(
                            ${order.id},
                            this.value
                        )
                    "
                >

                    ${statusOptions(order.status)}

                </select>

            </div>

        </div>

    `;


    modal.classList.add("show");

}


function closeOrderModal() {

    document
        .querySelector("#orderModal")
        .classList.remove("show");

}


/* =========================
   DASHBOARD
========================= */

function updateDashboardStats() {

    const completed =
        orders.filter(
            order => order.status === "completed"
        );


    const revenue =
        completed.reduce(
            (sum, order) =>
                sum + Number(order.total),
            0
        );


    document.querySelector("#totalRevenue")
        .textContent = money(revenue);


    document.querySelector("#revenueTotal")
        .textContent = money(revenue);


    document.querySelector("#totalOrders")
        .textContent = orders.length;


    document.querySelector("#totalProducts")
        .textContent =
        products.filter(
            product => product.active
        ).length;


    const average =
        completed.length
        ?
        revenue / completed.length
        :
        0;


    document.querySelector("#averageOrder")
        .textContent = money(average);


    renderOrderStats();

    renderRecentOrders();

    renderRevenue();

}


/* =========================
   ORDER STATS
========================= */

function renderOrderStats() {

    const container =
        document.querySelector("#orderStats");


    const status = [

        ["pending", "Chờ xác nhận"],

        ["confirmed", "Đã xác nhận"],

        ["shipping", "Đang giao"],

        ["completed", "Hoàn thành"],

        ["cancelled", "Đã hủy"]

    ];


    container.innerHTML = "";


    status.forEach(
        ([key, label]) => {

            const count =
                orders.filter(
                    order =>
                        order.status === key
                ).length;


            const percent =
                orders.length
                ?
                count / orders.length * 100
                :
                0;


            container.innerHTML += `

                <div class="order-stat">

                    <div class="order-stat-top">

                        <span>
                            ${label}
                        </span>

                        <strong>
                            ${count}
                        </strong>

                    </div>

                    <div class="progress">

                        <div
                            style="
                                width:${percent}%
                            "
                        ></div>

                    </div>

                </div>

            `;

        }
    );

}


/* =========================
   RECENT ORDERS
========================= */

function renderRecentOrders() {

    const tbody =
        document.querySelector("#recentOrders");


    tbody.innerHTML = "";


    orders
        .slice(0, 5)
        .forEach(order => {

            tbody.innerHTML += `

                <tr>

                    <td>

                        <strong>
                            #AUR${String(order.id).padStart(5, "0")}
                        </strong>

                    </td>

                    <td>
                        ${escapeHTML(order.customer_name)}
                    </td>

                    <td>
                        ${money(order.total)}
                    </td>

                    <td>

                        <span class="status ${order.status}">

                            ${statusLabel(order.status)}

                        </span>

                    </td>

                    <td>

                        ${formatDate(order.created_at)}

                    </td>

                </tr>

            `;

        });

}


function statusLabel(status) {

    const map = {

        pending: "Chờ xác nhận",

        confirmed: "Đã xác nhận",

        shipping: "Đang giao",

        completed: "Hoàn thành",

        cancelled: "Đã hủy"

    };


    return map[status] || status;

}


/* =========================
   REVENUE
========================= */

function renderRevenue() {

    const completed =
        orders.filter(
            order =>
                order.status === "completed"
        );


    const days = 14;

    const data = [];


    for (
        let i = days - 1;
        i >= 0;
        i--
    ) {

        const date =
            new Date();

        date.setDate(
            date.getDate() - i
        );


        const key =
            date.toISOString()
                .slice(0, 10);


        const revenue =
            completed

                .filter(order =>

                    order.created_at
                        .slice(0, 10) === key

                )

                .reduce(
                    (sum, order) =>
                        sum + Number(order.total),
                    0
                );


        data.push({

            date,
            revenue

        });

    }


    renderBars(
        document.querySelector("#chartBars"),
        data
    );


    renderBars(
        document.querySelector("#revenueBars"),
        data
    );

}


function renderBars(container, data) {

    if (!container) return;


    container.innerHTML = "";


    const max =
        Math.max(
            ...data.map(x => x.revenue),
            1
        );


    data.forEach(item => {

        const height =
            Math.max(
                3,
                item.revenue / max * 100
            );


        const bar =
            document.createElement("div");


        bar.className = "bar";


        bar.style.height =
            height + "%";


        bar.title =
            `${formatDate(item.date)}
${money(item.revenue)}`;


        bar.innerHTML = `

            <span>
                ${item.date.getDate()}/${item.date.getMonth() + 1}
            </span>

        `;


        container.appendChild(bar);

    });

}


/* =========================
   UTILITY
========================= */

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            "vi-VN"
        );

}


/* =========================
   INIT
========================= */

async function init() {

    await checkAdmin();

    await Promise.all([

        loadProducts(),

        loadOrders()

    ]);

}


init();
