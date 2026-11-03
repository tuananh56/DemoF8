
const API_URL = "https://dummyjson.com/products";

const productList = document.querySelector("#productList");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const errorMessage = document.querySelector("#errorMessage");
const reloadBtn = document.querySelector("#reloadBtn");
const retryBtn = document.querySelector("#retryBtn");

const productDetail = document.querySelector("#productDetail");
const detailContent = document.querySelector("#detailContent");
const closeDetail = document.querySelector("#closeDetail");

function formatCurrency(price) {
    return "$" + price.toLocaleString("en-US");
}

// Lấy danh sách sản phẩm từ API
async function getProducts() {
    loading.classList.remove("hidden");
    error.classList.add("hidden");
    productList.innerHTML = "";

    try {
        const response = await fetch(`${API_URL}?limit=20`);

        if (!response.ok) {
            throw new Error("Không thể lấy dữ liệu sản phẩm.");
        }

        const data = await response.json();

        renderProducts(data.products);

    } catch (err) {
        error.classList.remove("hidden");
        errorMessage.textContent = err.message;
    } finally {
        loading.classList.add("hidden");
    }
}

// Hiển thị danh sách sản phẩm
function renderProducts(products) {
    if (!products || products.length === 0) {
        productList.innerHTML = `
            <p class="text-gray-500 col-span-full text-center">
                Không có sản phẩm nào.
            </p>
        `;
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">
            <img src="${product.thumbnail}"
                alt="${product.title}"
                class="w-full h-48 object-cover">

            <div class="p-5">
                <h3 class="font-bold text-lg line-clamp-2">
                    ${product.title}
                </h3>

                <p class="text-sm text-gray-500 mt-2">
                    ${product.category}
                </p>

                <p class="text-blue-600 font-bold text-xl mt-3">
                    ${formatCurrency(product.price)}
                </p>

                <button data-id="${product.id}"
                    class="detail-btn w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 mt-5">
                    Xem chi tiết
                </button>
            </div>
        </div>
    `).join("");
}

// Lấy chi tiết một sản phẩm
async function getProductDetail(id) {
    detailContent.innerHTML = `
        <p class="text-center py-10 text-blue-600">
            Đang tải chi tiết sản phẩm...
        </p>
    `;

    productDetail.classList.remove("hidden");

    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error("Không thể tải chi tiết sản phẩm.");
        }

        const product = await response.json();

        detailContent.innerHTML = `
            <img src="${product.thumbnail}"
                alt="${product.title}"
                class="w-full h-64 object-contain">

            <h2 class="text-2xl font-bold mt-4">
                ${product.title}
            </h2>

            <p class="text-gray-500 mt-2">
                ${product.description}
            </p>

            <p class="text-gray-600 mt-3">
                Danh mục: ${product.category}
            </p>

            <p class="text-gray-600 mt-2">
                Đánh giá: ${product.rating} / 5
            </p>

            <p class="text-blue-600 font-bold text-2xl mt-3">
                ${formatCurrency(product.price)}
            </p>
        `;

    } catch (err) {
        detailContent.innerHTML = `
            <p class="text-red-600 text-center py-10">
                ${err.message}
            </p>
        `;
    }
}

// Sự kiện xem chi tiết
productList.addEventListener("click", function(event) {
    const button = event.target.closest(".detail-btn");

    if (!button) return;

    getProductDetail(button.dataset.id);
});

// Đóng chi tiết sản phẩm
closeDetail.addEventListener("click", function() {
    productDetail.classList.add("hidden");
});

productDetail.addEventListener("click", function(event) {
    if (event.target === productDetail) {
        productDetail.classList.add("hidden");
    }
});

// Tải lại dữ liệu
reloadBtn.addEventListener("click", getProducts);
retryBtn.addEventListener("click", getProducts);

// Khởi chạy
getProducts();
