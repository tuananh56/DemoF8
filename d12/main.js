//Random màu nền bằng mã HEX
function generateRandomHexColor() {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  return color;
}

console.log(generateRandomHexColor());
console.log(generateRandomHexColor());
console.log(generateRandomHexColor());

function showRandomColor() {
  const color = generateRandomHexColor();
  document.getElementById("colorResult").textContent = color;
  document.getElementById("colorButton").style.backgroundColor = color;
  console.log(color);
}

// Bộ lọc và sắp xếp giỏ hàng

const products = [
  { id: 1, name: "iPhone 15", price: 22000000, category: "Điện thoại" },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 20000000,
    category: "Điện thoại",
  },
  { id: 3, name: "MacBook Air M2", price: 26000000, category: "Laptop" },
  { id: 4, name: "Dell XPS 13", price: 30000000, category: "Laptop" },
  { id: 5, name: "AirPods Pro", price: 6000000, category: "Phụ kiện" },
  { id: 6, name: "Apple Watch", price: 9000000, category: "Phụ kiện" },
];
// Lọc sản phẩm theo danh mục:
function getFilteredProducts(productList, category) {
  if (category === "Tất cả") return [...productList];
  return productList.filter((p) => p.category == category);
}
// Sắp xếp sản phẩm theo giá
function getSortedProducts(productList, sortItem) {
  if (sortItem == "default") return [...productList];
  if (sortItem == "asc")
    return [...productList].sort((a, b) => a.price - b.price);
  if (sortItem == "desc")
    return [...productList].sort((a, b) => b.price - a.price);
  return [...productList];
}
// Tạo mảng mô tả sản phẩm
function getProductDescriptions(productList) {
  return productList.map((p) => `${p.name} - ${p.category} - ${p.price}`);
}
// Tính tổng tiền
function calculateTotal(productList) {
  return productList.reduce((sum, p) => sum + p.price, 0);
}

function handleFilterSort() {
  const category = document.getElementById("category").value;
  const sortType = document.getElementById("sort").value;
  const filtered = getFilteredProducts(products, category);
  const sorted = getSortedProducts(filtered, sortType);
  const descriptions = getProductDescriptions(sorted);
  const total = calculateTotal(sorted);
  document.getElementById("result").textContent = descriptions.join("\n");
  document.getElementById("total").textContent = total.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  console.log("Danh sách", sorted);
  console.log("Tổng tiền", total);
}

// Tạo mã OTP ngẫu nhiên
function generateOTP() {
  return Math.floor(Math.random() * 900000) + 100000;
}
function showOTP() {
  const otp = generateOTP();
  document.getElementById("otpResult").textContent = otp;
  console.log(otp);
}
