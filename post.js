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

        ${post.image
            ? `<img class="post-cover" src="${post.image}" alt="${escapeHtml(post.title)}">`
            : ""}

        <div class="post-body">${escapeHtml(post.content)}</div>
    `;

}

document.addEventListener("DOMContentLoaded", renderPost);
