const CART_KEY = "shoppingCart";
const CUSTOMER_KEY = "customerInfo";
const DRAFT_KEY = "checkoutDraft";

const checkoutForm = document.querySelector("#checkoutForm");
const nameInput = document.querySelector("#customerName");
const phoneInput = document.querySelector("#customerPhone");
const addressInput = document.querySelector("#customerAddress");
const noteInput = document.querySelector("#customerNote");

const checkoutItems = document.querySelector("#checkoutItems");
const emptyCheckout = document.querySelector("#emptyCheckout");
const checkoutTotal = document.querySelector("#checkoutTotal");
const orderSuccess = document.querySelector("#orderSuccess");

function formatCurrency(price) {
  return price.toLocaleString("vi-VN") + " ₫";
}

function getCart() {
  try {
    const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

// Hiển thị sản phẩm trong đơn hàng
function renderCheckout() {
  const cart = getCart();

  if (cart.length === 0) {
    checkoutItems.innerHTML = "";
    emptyCheckout.classList.remove("hidden");
    checkoutForm.querySelector('button[type="submit"]').disabled = true;
    checkoutForm
      .querySelector('button[type="submit"]')
      .classList.add("opacity-50", "cursor-not-allowed");
    checkoutTotal.textContent = formatCurrency(0);
    return;
  }

  emptyCheckout.classList.add("hidden");
  checkoutForm.querySelector('button[type="submit"]').disabled = false;

  checkoutItems.innerHTML = cart
    .map(
      (item) => `
        <div class="flex gap-3 border-b pb-4">
            <img src="${item.image}" alt="${item.name}"
                class="w-16 h-16 rounded-lg object-cover">

            <div class="flex-1 min-w-0">
                <h4 class="font-semibold">${item.name}</h4>
                <p class="text-sm text-gray-500">Số lượng: ${item.quantity}</p>
                <p class="text-blue-600 font-semibold">
                    ${formatCurrency(item.price * item.quantity)}
                </p>
            </div>
        </div>
    `,
    )
    .join("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  checkoutTotal.textContent = formatCurrency(total);
}

// Điền lại thông tin khách hàng đã lưu
function loadCustomerInfo() {
  try {
    const customer = JSON.parse(localStorage.getItem(CUSTOMER_KEY));

    if (!customer) return;

    nameInput.value = customer.name || "";
    phoneInput.value = customer.phone || "";
    addressInput.value = customer.address || "";
  } catch {
    console.warn("Không thể đọc thông tin khách hàng.");
  }
}

// Khôi phục thông tin đang nhập trong phiên hiện tại
function loadCheckoutDraft() {
  try {
    const draft = JSON.parse(sessionStorage.getItem(DRAFT_KEY));

    if (!draft) return;

    nameInput.value = draft.name || nameInput.value;
    phoneInput.value = draft.phone || phoneInput.value;
    addressInput.value = draft.address || addressInput.value;
    noteInput.value = draft.note || "";
  } catch {
    console.warn("Không thể đọc dữ liệu thanh toán tạm thời.");
  }
}

// Lưu thông tin nhập vào sessionStorage
function saveCheckoutDraft() {
  const draft = {
    name: nameInput.value,
    phone: phoneInput.value,
    address: addressInput.value,
    note: noteInput.value,
  };

  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

// Theo dõi thay đổi của form
checkoutForm.addEventListener("input", saveCheckoutDraft);

// Xác nhận đặt hàng
checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const cart = getCart();

  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }

  if (!checkoutForm.checkValidity()) {
    checkoutForm.reportValidity();
    return;
  }

  const customer = {
    name: nameInput.value.trim(),
    phone: phoneInput.value.trim(),
    address: addressInput.value.trim(),
  };

  try {
    // Lưu thông tin khách hàng lâu dài
    localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));

    // Lưu thông tin đơn hàng vừa đặt
    const order = {
      customer,
      note: noteInput.value.trim(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      createdAt: new Date().toISOString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Xóa giỏ hàng và dữ liệu nhập tạm sau khi đặt hàng
    localStorage.removeItem(CART_KEY);
    sessionStorage.removeItem(DRAFT_KEY);

    orderSuccess.classList.remove("hidden");
    checkoutForm.reset();
    renderCheckout();
  } catch (error) {
    alert("Không thể lưu đơn hàng. Vui lòng thử lại!");
    console.error(error);
  }
});

// Khởi chạy
loadCustomerInfo();
loadCheckoutDraft();
renderCheckout();
