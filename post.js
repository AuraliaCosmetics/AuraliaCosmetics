/* Trang chi tiết bài viết: post.html?id=... (đọc từ Firebase) */

function escapeHtml(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

async function renderPost() {

    const box = document.getElementById("postContent");

    const id = new URLSearchParams(location.search).get("id");

    box.innerHTML = `<div class="post-notfound">Đang tải bài viết...</div>`;

    let post = null;

    try {

        if (id) {

            const doc = await db.collection("posts").doc(id).get();

            if (doc.exists) post = doc.data();

        }

    } catch (error) {

        console.error(error);

    }

    if (!post) {

        box.innerHTML = `
            <div class="post-notfound">
                Không tìm thấy bài viết này (có thể đã bị xóa).
            </div>
        `;

        return;

    }

    document.title = post.title + " | AuraliaCosmetics";

    box.innerHTML = `
        <div class="post-meta">
            ${escapeHtml(post.author)} · ${escapeHtml(post.date)}
        </div>

        <h1 class="post-title">${escapeHtml(post.title)}</h1>

        ${renderGallery(post)}

        <div class="post-body">${renderContent(post)}</div>
    `;

}

function getCovers(post) {

    if (Array.isArray(post.images) && post.images.length) return post.images;

    return post.image ? [post.image] : [];

}

function renderGallery(post) {

    const covers = getCovers(post);

    if (!covers.length) return "";

    const alt = escapeHtml(post.title);

    if (covers.length === 1) {

        return `<img class="post-cover" src="${covers[0]}" alt="${alt}">`;

    }

    const thumbs = covers.map((src, i) => `
        <img class="gallery-thumb${i === 0 ? " active" : ""}"
             src="${src}" alt="${alt}"
             onclick="showCover(${i})">
    `).join("");

    return `
        <div class="post-gallery">
            <img id="galleryMain" class="post-cover" src="${covers[0]}" alt="${alt}">
            <div class="gallery-thumbs">${thumbs}</div>
        </div>
    `;

}

function showCover(index) {

    const thumbs = document.querySelectorAll(".gallery-thumb");

    document.getElementById("galleryMain").src = thumbs[index].src;

    thumbs.forEach((t, i) => t.classList.toggle("active", i === index));

}

function renderContent(post) {

    const images = post.contentImages || [];

    return escapeHtml(post.content || "").replace(
        /\[\[img:(\d+)\]\]/g,
        function(_, n) {

            const src = images[Number(n)];

            return src
                ? `<img class="post-inline-img" src="${src}" alt="">`
                : "";

        }
    );

}

document.addEventListener("DOMContentLoaded", renderPost);
