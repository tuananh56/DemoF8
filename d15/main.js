// Toggle  theme
const toggle = document.getElementById("toggleTheme");
const thumb = document.getElementById("thumb");
toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  if (document.documentElement.classList.contains("dark")) {
    thumb.style.left = "calc(100% - 2.75rem)";
    thumb.textContent = "🌙";
  } else {
    thumb.style.left = "0.25rem";
    thumb.textContent = "🌞";
  }
});
// Toggle Password
const passInput = document.getElementById("password");
const passBtn = document.getElementById("togglePass");
passBtn.addEventListener("click", () => {
  if (passInput.type === "password") {
    passInput.type = "text";
    passBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7
                 a10.05 10.05 0 012.042-3.362m3.362-2.042A10.05 10.05 0 0112 5
                 c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.658 2.658M15 12
                 a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3l18 18"/>
      </svg>`;
  } else {
    passInput.type = "password";
    passBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5
                 c4.477 0 8.268 2.943 9.542 7
                 -1.274 4.057-5.065 7-9.542 7
                 -4.477 0-8.268-2.943-9.542-7z"/>
      </svg>`;
  }
});
// Gallery
document.addEventListener("DOMContentLoaded", () => {
  const mainImage = document.getElementById("mainImage");
  const thumbnails = document.querySelectorAll("#gallery .flex img");
  let currentIndex = 0;

  function changeImage(index) {
    const thumb = thumbnails[index];
    mainImage.src = thumb.src;
    mainImage.alt = thumb.alt;
    thumbnails.forEach((t) => t.classList.remove("border-red-500"));
    thumb.classList.add("border-red-500");
  }

  thumbnails.forEach((thumb, idx) => {
    thumb.addEventListener("click", () => {
      currentIndex = idx;
      changeImage(currentIndex);
    });
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    changeImage(currentIndex);
  }, 2000);
});
