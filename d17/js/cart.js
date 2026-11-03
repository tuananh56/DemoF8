
const CART_KEY = "shoppingCart";

// Danh sách sản phẩm mẫu
const products = [
    {
        id: "A",
        name: "Sản phẩm A",
        price: 100000,
        image: "https://placehold.co/400x300/e0f2fe/2563eb?text=Product+A"
    },
    {
        id: "B",
        name: "Sản phẩm B",
        price: 50000,
        image: "https://placehold.co/400x300/dcfce7/15803d?text=Product+B"
    },
    {
        id: "C",
        name: "Sản phẩm C",
        price: 150000,
        image: "https://placehold.co/400x300/fef3c7/b45309?text=Product+C"
    },
    {
        id: "D",
        name: "Sản phẩm D",
        price: 200000,
        image: "https://placehold.co/400x300/fce7f3/be185d?text=Product+D"
    }
];

const formatCurrency = (price) => {
    return price.toLocaleString("vi-VN") + " ₫";
};


function getCart() {
    try {
        const data = localStorage.getItem(CART_KEY);

        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Lỗi đọc giỏ hàng:", error);
        return [];
    }
}


function saveCart(cart) {
    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );
}

function renderProducts() {
    const productList = document.querySelector("#productList");

    productList.innerHTML = products.map(product => `
        <div class="bg-white rounded-xl shadow-sm overflow-hidden">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="w-full h-48 object-cover"
            >

            <div class="p-5">

                <p class="text-sm text-gray-400">
                    Mã sản phẩm: ${product.id}
                </p>

                <h3 class="font-bold text-lg mt-2">
                    ${product.name}
                </h3>

                <p class="text-blue-600 font-bold text-xl mt-3">
                    ${formatCurrency(product.price)}
                </p>

                <button
                    data-action="add"
                    data-id="${product.id}"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 mt-5 font-semibold transition"
                >
                    Thêm vào giỏ hàng
                </button>

            </div>

        </div>
    `).join("");
}

function addToCart(productId) {

    const cart = getCart();

    // Tìm sản phẩm trong danh sách
    const product = products.find(
        item => item.id === productId
    );

    if (!product) return;

    // Kiểm tra sản phẩm đã có trong giỏ chưa
    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        // Nếu đã có thì tăng số lượng
        existingProduct.quantity++;

    } else {

        // Nếu chưa có thì thêm mới
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });

    }

    saveCart(cart);

    renderCart();
}


function increaseQuantity(productId) {

    const cart = getCart();

    const product = cart.find(
        item => item.id === productId
    );

    if (!product) return;

    product.quantity++;

    saveCart(cart);

    renderCart();
}


function decreaseQuantity(productId) {

    const cart = getCart();

    const product = cart.find(
        item => item.id === productId
    );

    if (!product) return;

    // Không cho số lượng nhỏ hơn 1
    if (product.quantity > 1) {

        product.quantity--;

    }

    saveCart(cart);

    renderCart();
}



function removeFromCart(productId) {

    const cart = getCart();

    const newCart = cart.filter(
        item => item.id !== productId
    );

    saveCart(newCart);

    renderCart();
}

function renderCart() {

    const cart = getCart();

    const cartItems = document.querySelector("#cartItems");
    const emptyCart = document.querySelector("#emptyCart");

    const cartCount = document.querySelector("#cartCount");
    const totalQuantity = document.querySelector("#totalQuantity");
    const totalPrice = document.querySelector("#totalPrice");

    // Tính tổng số lượng
    const quantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    // Tính tổng tiền
    const price = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // Cập nhật tổng số lượng và tiền
    cartCount.textContent = `${quantity} sản phẩm`;
    totalQuantity.textContent = quantity;
    totalPrice.textContent = formatCurrency(price);

    // Kiểm tra giỏ hàng rỗng
    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.classList.remove("hidden");

        return;
    }

    emptyCart.classList.add("hidden");

    // Render từng sản phẩm
    cartItems.innerHTML = cart.map(item => `

        <div class="border-b pb-4">

            <div class="flex gap-3">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="w-20 h-20 rounded-lg object-cover"
                >

                <div class="flex-1 min-w-0">

                    <h3 class="font-semibold">
                        ${item.name}
                    </h3>

                    <p class="text-blue-600 font-semibold mt-1">
                        ${formatCurrency(item.price)}
                    </p>

                    <p class="text-sm text-gray-500 mt-1">
                        Thành tiền:
                        ${formatCurrency(item.price * item.quantity)}
                    </p>

                </div>

            </div>

            <div class="flex justify-between items-center mt-4">

                <div class="flex items-center gap-3">

                    <button
                        data-action="decrease"
                        data-id="${item.id}"
                        ${item.quantity === 1 ? "disabled" : ""}
                        class="w-8 h-8 rounded border disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-100"
                        aria-label="Giảm số lượng"
                    >
                        -
                    </button>

                    <span class="font-semibold">
                        ${item.quantity}
                    </span>

                    <button
                        data-action="increase"
                        data-id="${item.id}"
                        class="w-8 h-8 rounded border hover:bg-gray-100"
                        aria-label="Tăng số lượng"
                    >
                        +
                    </button>

                </div>

                <button
                    data-action="remove"
                    data-id="${item.id}"
                    class="text-red-500 hover:text-red-700 text-sm font-semibold"
                >
                    Xóa
                </button>

            </div>

        </div>

    `).join("");
}

// Sử dụng Event Delegation
document.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const action = button.dataset.action;
    const productId = button.dataset.id;

    switch (action) {

        case "add":
            addToCart(productId);
            break;

        case "increase":
            increaseQuantity(productId);
            break;

        case "decrease":
            decreaseQuantity(productId);
            break;

        case "remove":
            removeFromCart(productId);
            break;

    }

});


function initCart() {

    renderProducts();

    renderCart();

}

initCart();
