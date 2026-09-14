const cart = {
  items: [
    {
      id: 1,
      name: "Laptop",
      price: 15000000,
      quantity: 1,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Mouse",
      price: 300000,
      quantity: 2,
      category: "Electronics",
    },
  ],
  _discountRate: 0,
  validCoupons: {
    WELCOME10: 0.1,
    SUMMER20: 0.2,
    VIP30: 0.3,
  },

  // Trả về tổng sản phẩm trong giỏ
  get totalQuantity() {
    return this.items.reduce((sum, items) => sum + items.quantity, 0);
    // Write your code here
  },
  // Tính tổng tiền hàng (chưa áp dụng mã giảm giá)
  get subtotal() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    // Write your code here
  },

  // Áp dụng mã giảm giá bằng cách truyền tên coupon
  // Nếu coupon có trong `validCoupons`, gán `_discountRate`. Nếu không, in thông báo lỗi và không gán.
  set applyCoupon(code) {
    if (this.validCoupons[code]) {
      this._discountRate = this.validCoupons[code];
      console.log(
        `Áp dụng coupon ${code} với mức giảm ${this._discountRate * 100}%`,
      );
    } else {
      console.log("Coupon không hợp lệ!");
    }
    // Write your code here
  },

  // Tính tổng tiền thực tế phải trả
  get totalPrice() {
    return this.subtotal - this.subtotal * this._discountRate;
    // Write your code here
  },

  // Thêm nhiều sản phẩm cùng lúc
  // - Nếu item đã tồn tại (dựa vào id): cộng dồn quantity.
  // - Nếu chưa có: kiểm tra xem item truyền vào có mặc định `quantity` chưa, nếu chưa thì gán mặc định bằng 1 rồi mới push.
  addItems(...newItems) {
    newItems.forEach((newItem) => {
      const existing = this.items.find((item) => item.id === newItem.id);
      if (existing) {
        existing.quantity += newItem.quantity || 1;
      } else {
        if (!newItem.quantity) newItem.quantity = 1;
        this.items.push(newItem);
      }
    });
    // Write your code here
  },

  // Cập nhật số lượng sản phẩm theo id
  // Nếu newQuantity <= 0 thì tự động xoá sản phẩm đó khỏi giỏ.
  updateQuantity(id, newQuantity) {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      console.error(`Không tìm thấy sản phẩm với id = ${id}`);
      return;
    }
    if (newQuantity <= 0) {
      this.removeItem(id);
    } else {
      item.quantity = newQuantity;
    }
    // Write your code here
  },

  // Xoá sản phẩm theo id
  removeItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    // Write your code here
  },

  // Lọc danh sách sản phẩm theo danh mục (category)
  getItemsByCategory(category) {
    return this.items.filter((item) => item.category === category);
    // Write your code here
  },

  // In hoá đơn chi tiết ra console
  printInvoice() {
    console.log("================ HOÁ ĐƠN BAN HÀNG ================");
    this.items.forEach((item) => {
      const total = item.price * item.quantity;
      console.log(`${item.name} - ${item.price} - ${item.quantity} = ${total}`);
    });
    console.log(`Tổng tiền hàng: ${this.subtotal}`);
    console.log(
      `Giảm giá: ${this._discountRate * 100}% (-${this.subtotal * this._discountRate})`,
    );
    console.log(`Tổng thanh toán: ${this.totalPrice}`);
    // In danh sách từng dòng: Tên - Đơn giá - Số lượng - Thành tiền
    // In Tổng tiền hàng (Subtotal)
    // In Giảm giá (% và số tiền giảm)
    // In Tổng thanh toán (Total Price)
    console.log("==================================================");
  },
};
// Ví dụ chạy thử
console.log(cart.totalQuantity); // 3
console.log(cart.subtotal); // 15600000
cart.applyCoupon = "WELCOME10";
cart.applyCoupon = "SUMMER20";
cart.applyCoupon = "VIP30";
cart.printInvoice();
// function testCart() {
//   // Thêm sản phẩm mới
//   cart.addItems(
//     { id: 3, name: "Keyboard", price: 700000, category: "Electronics" },
//     {
//       id: 2,
//       name: "Mouse",
//       price: 300000,
//       quantity: 1,
//       category: "Electronics",
//     },
//   );

//   // Áp dụng coupon
//   cart.applyCoupon = "WELCOME10";

//   // Cập nhật số lượng Laptop
//   cart.updateQuantity(1, 3);

//   // Xoá sản phẩm Mouse nếu quantity <= 0
//   cart.updateQuantity(2, 0);

//   // In hoá đơn
//   cart.printInvoice();

//   // Test getter
//   console.log("Tổng số lượng sản phẩm:", cart.totalQuantity);
//   console.log("Subtotal:", cart.subtotal);
//   console.log("Total Price sau giảm giá:", cart.totalPrice);

//   // Test lọc theo category
//   console.log("Sản phẩm Electronics:", cart.getItemsByCategory("Electronics"));
// }
