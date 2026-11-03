import { useState } from "react";

import UserProfileCard from "./components/UserProfileCard";
import ProductList from "./components/ProductList";
import FaqList from "./components/FaqList";

import ip15pro from "./assets/imgs/ip15pro.jpg";
import ssglxs24 from "./assets/imgs/ssglxs24.jpg";
import mbA13 from "./assets/imgs/mbA13.jpg";
import ap22022 from "./assets/imgs/ap22022.jpg";

function App() {
  // STATE BÀI 2: GIỎ HÀNG
  const [cartCount, setCartCount] = useState(0);

  // STATE BÀI 3: CÂU HỎI ĐANG ĐƯỢC CHỌN
  const [selectedFaq, setSelectedFaq] = useState(null);

  // DỮ LIỆU BÀI 2: SẢN PHẨM
  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      image: ip15pro,
      price: 30000000,
      salePrice: 27000000,
      inStock: true,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24",
      image: ssglxs24,
      price: 22000000,
      salePrice: null,
      inStock: true,
    },
    {
      id: 3,
      name: "MacBook Air M3",
      image: mbA13,
      price: 28000000,
      salePrice: 25000000,
      inStock: false,
    },
    {
      id: 4,
      name: "AirPods Pro 2",
      image: ap22022,
      price: 6000000,
      salePrice: null,
      inStock: true,
    },
  ];

  // DỮ LIỆU BÀI 3: FAQ
  const faqData = [
    {
      id: 1,
      question: "React là gì?",
      answer:
        "React là một thư viện JavaScript dùng để xây dựng giao diện người dùng.",
      category: "React",
      isHot: true,
    },
    {
      id: 2,
      question: "Props trong React là gì?",
      answer:
        "Props là dữ liệu được truyền từ component cha xuống component con.",
      category: "React",
      isHot: true,
    },
    {
      id: 3,
      question: "State trong React là gì?",
      answer:
        "State là dữ liệu nội bộ của component. Khi state thay đổi, React sẽ cập nhật giao diện.",
      category: "React",
      isHot: false,
    },
    {
      id: 4,
      question: "useState dùng để làm gì?",
      answer:
        "useState là Hook giúp component quản lý và cập nhật state.",
      category: "Hooks",
      isHot: false,
    },
  ];

  // XỬ LÝ BÀI 2: THÊM SẢN PHẨM VÀO GIỎ
  const handleAddToCart = (product) => {
    setCartCount((prev) => prev + 1);
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  // XỬ LÝ BÀI 3: CHỌN CÂU HỎI
  const handleSelectFaq = (id) => {
    setSelectedFaq((prev) => (prev === id ? null : id));
  };

  return (
    <main className="space-y-16 bg-gray-100 p-8 min-h-screen">

      {/* BÀI 1: USER PROFILE */}
      <section>
        <h1 className="mb-8 font-bold text-3xl text-center">
          Bài 1: User Profile Card
        </h1>

        <div className="flex flex-wrap justify-center gap-6">
          <UserProfileCard
            avatar="https://i.pravatar.cc/150?img=12"
            fullName="Nguyễn Văn An"
            jobTitle="Frontend Developer"
            isOnline={true}
            skills={["React", "JavaScript", "Tailwind CSS"]}
          />

          <UserProfileCard
            avatar="https://i.pravatar.cc/150?img=32"
            fullName="Trần Thị Bình"
            jobTitle="Backend Developer"
            isOnline={false}
            skills={["Node.js", "Express", "MongoDB"]}
          />
        </div>
      </section>

      {/* BÀI 2: PRODUCT LIST */}
      <section>
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-bold text-3xl">
              Bài 2: Product List
            </h1>

            <div className="bg-blue-600 px-4 py-2 rounded-lg text-white">
              Giỏ hàng: {cartCount}
            </div>
          </div>

          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      {/* BÀI 3: FAQ */}
      <section>
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-8 font-bold text-3xl text-center">
            Bài 3: Frequently Asked Questions
          </h1>

          <FaqList
            faqData={faqData}
            onSelectFaq={handleSelectFaq}
            selectedFaq={selectedFaq}
          />
        </div>
      </section>

    </main>
  );
}

export default App;
