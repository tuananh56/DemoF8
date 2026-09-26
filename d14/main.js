// bài 1
const userA_searches = [
  "áo thun",
  "quần jeans",
  "áo khoác",
  "áo thun",
  "giày cừu",
];
const userB_searches = ["quần jeans", "mũ bảo hiểm", "giày cừu", "balo"];

function getUniqueTags(arr) {
  const seen = new Set();
  const result = [];
  for (let tag of arr) {
    if (!seen.has(tag)) {
      seen.add(tag);
      result.push(tag);
    }
  }
  return result;
}
console.log(getUniqueTags(userA_searches));

function getCommonTags(arr1, arr2) {
  const unique1 = getUniqueTags(arr1);
  const unique2 = new Set(getUniqueTags(arr2));
  return unique1.filter((tag) => unique2.has(tag));
}

document.getElementById("result1").innerText =
  "Bài 1: Lọc trùng và tìm giao điểm tag sản phẩm" +
  JSON.stringify(getCommonTags(userA_searches, userB_searches));

console.log(getCommonTags(userA_searches, userB_searches));
console.log(getCommonTags(["áo thun", "áo thun", "balo"], ["áo thun"]));
console.log(getCommonTags(["áo thun"], ["balo"]));
console.log(getUniqueTags([]));

// bài 2
const cart = new Map();
function addToCart(productId, productInfo) {
  // Nếu sản phẩm chưa có trong cart, thêm sản phẩm với quantity = 1.
  if (!cart.has(productId)) {
    cart.set(productId, { ...productInfo, quantity: 1 });
  }
  // Nếu sản phẩm đã có, tăng quantity thêm 1, giữ nguyên tên và đơn giá đang lưu trong giỏ.
  else {
    const existing = cart.get(productId);
    existing.quantity += 1;
  }
}
addToCart(101, { name: "Áo thun", price: 150000 });
addToCart(102, { name: "Quần jeans", price: 300000 });
addToCart(101, { name: "Áo thun", price: 150000 });

console.log(cart.size);
console.log(cart.get(101));
console.log(cart.get(102));

// Duyệt các sản phẩm trong cart để tính và trả về tổng tiền trước giảm giá.

// Tiền mỗi sản phẩm bằng price * quantity.

// Nếu giỏ hàng rỗng, trả về 0.

function getTotalPrice() {
  let total = 0;
  for (let item of cart.values()) {
    total += item.price * item.quantity;
  }
  return total;
}
console.log(getTotalPrice());

const voucherMap = new Map([
  ["SALE10", 10],
  ["SALE20", 20],
]);

function applyVoucher(voucherMap) {
  const total = getTotalPrice();
  // Nếu giỏ hàng rỗng, kết quả là 0.
  if (total == 0) return 0;
  // dùng prompt() trên trình duyệt để người dùng nhập mã voucher.
  const code = prompt("Nhập mã giảm giá: ");
  //  Nếu mã tồn tại, trả về tổng tiền sau giảm giá theo công thức: tổng tiền trước giảm giá * (1 - phần trăm giảm giá / 100)
  if (code && voucherMap.has(code)) {
    const discount = voucherMap.get(code);
    return total * (1 - discount / 100);
  }
  return total;
}
// console.log(applyVoucher(voucherMap));

document.getElementById("btnVoucher").addEventListener("click", () => {
  const afterDiscount = applyVoucher(voucherMap);
  document.getElementById("result2").innerText =
    "Giỏ hàng có: " +
    cart.size +
    "\n" +
    "Trước giảm giá:" +
    getTotalPrice() +
    "\n" +
    "Sau giảm giá:" +
    afterDiscount;
});
// bài 3
const salesReport = {
  branch: "Hà Nội",
  revenue: 500,
  subBranches: [
    {
      branch: "Cầu Giấy",
      revenue: 200,
      subBranches: [{ branch: "Cầu Giấy 1", revenue: 50, subBranches: [] }],
    },
    {
      branch: "Đống Đa",
      revenue: 150,
      subBranches: [],
    },
  ],
};

function calculateTotalRevenue(report) {
  let total = report.revenue;
  for (let sub of report.subBranches) {
    total += calculateTotalRevenue(sub);
  }
  return total;
}
console.log(calculateTotalRevenue(salesReport));
console.log(
  calculateTotalRevenue({
    branch: "Hải Phòng",
    revenue: 100,
    subBranches: [],
  }),
);

document.getElementById("result3").innerText =
  "Bài 3: Tính tổng doanh thu tất cả chi nhánh " +
  calculateTotalRevenue(salesReport);
