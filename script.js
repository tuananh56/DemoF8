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
// searchInput.addEventListener("keyup", function () {
//   const keyword = this.value.toLowerCase();
//   filteredWeeks = [];

//   allWeeks.forEach((week) => {
//     const header = week.querySelector(".week-header");
//     const day = header.querySelector(".day-number").innerText.toLowerCase();
//     const title = header.querySelector("h2").innerText.toLowerCase();
//     const desc = header.querySelector("p").innerText.toLowerCase();

//     const exercises = week.querySelectorAll(".exercise");
//     const matchExercise = Array.from(exercises).some(ex =>
//       ex.innerText.toLowerCase().includes(keyword)
//     );

//     if (
//       day.includes(keyword) ||
//       title.includes(keyword) ||
//       desc.includes(keyword) ||
//       matchExercise
//     ) {
//       filteredWeeks.push(week);
//     }
//   });

//   currentPage = 1;
//   setupPagination();
//   renderPage(currentPage);
// });


setupPagination();
renderPage(currentPage);
