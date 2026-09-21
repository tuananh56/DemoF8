const searchInput = document.getElementById("searchInput");
const allWeeks = Array.from(document.querySelectorAll(".week"));
let filteredWeeks = [...allWeeks];
const itemsPerPage = 5;
let currentPage = 1;

function renderPage(page) {
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  filteredWeeks.forEach((week, index) => {
    if (index >= start && index < end) {
      week.style.display = "block"; // hoặc "flex" tùy layout
    } else {
      week.style.display = "none";
    }
  });

  // highlight nút trang hiện tại
  document.querySelectorAll(".page-btn").forEach((btn, idx) => {
    btn.classList.toggle("active", idx + 1 === page);
  });
}

function setupPagination() {
  const totalPages = Math.ceil(filteredWeeks.length / itemsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  if (totalPages === 0) {
    pagination.innerHTML = "<p>Không tìm thấy kết quả</p>";
    return;
  }

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.classList.add("page-btn");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderPage(currentPage);
    });
    pagination.appendChild(btn);
  }
}

let typingTimer;
const typingDelay = 500;

searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase().trim();
  const keywords = keyword.split(/\s+/);
  filteredWeeks = [];

  allWeeks.forEach((week) => {
    const day =
      week.querySelector(".day-number")?.innerText.toLowerCase() || "";
    const title =
      week.querySelector(".week-title")?.innerText.toLowerCase() || "";
    const desc =
      week.querySelector(".week-desc")?.innerText.toLowerCase() || "";
    const exercises = week.querySelectorAll(".exercise");
    const exerciseText = Array.from(exercises)
      .map((ex) => ex.innerText.toLowerCase())
      .join(" ");

    const combinedText = `${day} ${title} ${desc} ${exerciseText}`;
    const match = keywords.every((k) => combinedText.includes(k));

    if (match) filteredWeeks.push(week);
  });

  const container = document.querySelector(".week-list");
  const searchBox = container.querySelector(".search-box");

  // chỉ xoá các week, không xoá search-box
  container.querySelectorAll(".week").forEach((week) => week.remove());

  // giữ nguyên search-box, không cần innerHTML = ""
  filteredWeeks.forEach((week) => container.appendChild(week));

  currentPage = 1;
  setupPagination();
  renderPage(currentPage);
});

// Khởi tạo ban đầu
setupPagination();
renderPage(currentPage);
