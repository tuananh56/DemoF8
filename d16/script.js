// Trang chủ: hiển thị BOM và gắn Fingerprinting
function loadHomeInfo() {
  const infoDiv = document.getElementById("info");
  if (infoDiv) {
    navigator.geolocation.getCurrentPosition((pos) => {
      const coords = `Lat: ${pos.coords.latitude}, Lng: ${pos.coords.longitude}`;
      renderInfo(coords);
    });

    function renderInfo(coords) {
      const online = navigator.onLine
        ? '<span class="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>Online'
        : '<span class="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>Offline';
      const data = [
        { label: "Vị trí", value: coords },
        { label: "Trạng thái", value: online },
        { label: "Trình duyệt", value: navigator.userAgent },
        { label: "Hệ điều hành", value: navigator.platform },
        { label: "Ngôn ngữ", value: navigator.languages.join(", ") },
        {
          label: "Kích thước màn hình",
          value: `${screen.width}x${screen.height}`,
        },
        { label: "Hướng màn hình", value: screen.orientation.type },
      ];
      infoDiv.innerHTML = data
        .map(
          (d) => `
        <div class="p-4 bg-white rounded-lg shadow hover:shadow-md transition">
          <strong>${d.label}:</strong> ${d.value}
        </div>`,
        )
        .join("");
    }
  }

  // Fingerprinting navigation
  const btn = document.getElementById("goFingerprint");
  if (btn) {
    btn.addEventListener("click", () => {
      const state = {
        browser: navigator.userAgent,
        os: navigator.platform,
        lang: navigator.languages.join(", "),
        screen: `${screen.width}x${screen.height}`,
        online: navigator.onLine ? "Online" : "Offline",
        time: new Date().toLocaleString(),
      };
      history.pushState(state, "Fingerprinting", "fingerprint.html");
      showFingerprint(state);
    });
  }

  // Lắng nghe sự kiện Back/Forward
  window.addEventListener("popstate", (e) => {
    if (location.pathname.endsWith("fingerprint.html")) {
      showFingerprint(e.state);
    }
  });
}

// Fingerprinting
function showFingerprint(state) {
  const div = document.getElementById("fingerprintData");
  if (!div) return;
  if (!state) {
    state = {
      browser: navigator.userAgent,
      os: navigator.platform,
      lang: navigator.languages.join(", "),
      screen: `${screen.width}x${screen.height}`,
      online: navigator.onLine ? "Online" : "Offline",
      time: new Date().toLocaleString(),
    };
  }
  const fingerprint = `${state.browser}-${state.os}-${state.lang}-${state.screen}-${state.online}`;
  div.innerHTML = `
    <p><strong>Fingerprint:</strong> ${fingerprint}</p>
    <p class="mt-4 text-gray-600">Thời gian tạo: ${state.time}</p>
  `;
}

// Trang campaign
function loadCampaign() {
  const div = document.getElementById("campaignInfo");
  if (!div) return;
  const params = new URLSearchParams(location.search);
  if (!params.has("utm_source")) {
    div.innerHTML =
      "<p class='text-red-500 font-semibold'>Không có tham số quảng cáo</p>";
    return;
  }
  div.innerHTML = `
    <p><strong>Nguồn:</strong> ${params.get("utm_source")}</p>
    <p><strong>Chiến dịch:</strong> ${params.get("utm_campaign")}</p>
    <p class="mt-4">Nội dung quảng cáo:</p>
    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" 
         class="mt-2 rounded-lg shadow hover:scale-105 transition-transform">
  `;
}

// Khởi chạy
loadHomeInfo();
loadCampaign();
