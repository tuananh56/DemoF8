function xepLoaiHocLuc(toan, van, anh) {
  const diemTB = (toan + van + anh) / 3;
  const diemThapNhat = Math.min(toan, van, anh);

  if (diemTB >= 9 && diemThapNhat >= 8) {
    return "Xuất sắc";
  }

  if (diemTB >= 8 && diemThapNhat >= 6.5) {
    return "Giỏi";
  }

  if (diemTB >= 6.5 && diemThapNhat >= 5) {
    return "Khá";
  }

  if (diemTB >= 5 && diemThapNhat >= 3.5) {
    return "Trung bình";
  }

  return "Yếu";
}

function xuLyBai1() {
  const toan = Number(document.getElementById("toan").value);
  const van = Number(document.getElementById("van").value);
  const anh = Number(document.getElementById("anh").value);

  const ketQua = document.getElementById("ketQuaBai1");

  if (toan < 0 || toan > 10 || van < 0 || van > 10 || anh < 0 || anh > 10) {
    ketQua.textContent = "Dữ liệu không hợp lệ.";
    return;
  }

  const diemTB = (toan + van + anh) / 3;
  const hocLuc = xepLoaiHocLuc(toan, van, anh);

  ketQua.innerHTML = `
        Điểm trung bình: ${diemTB.toFixed(2)} <br>
        Học lực: ${hocLuc}
    `;
}
function xuLyBai2() {
  const number = Number(document.getElementById("thu").value);
  const ketQua = document.getElementById("ketQuaBai2");
  switch (number) {
    case 1:
      ketQua.textContent = "Chủ nhật";
      break;
    case 2:
      ketQua.textContent = "Thứ hai";
      break;
    case 3:
      ketQua.textContent = "Thứ ba";
      break;
    case 4:
      ketQua.textContent = "Thứ tư";
      break;
    case 5:
      ketQua.textContent = "Thứ năm";
      break;
    case 6:
      ketQua.textContent = "Thứ sáu";
      break;
    case 7:
      ketQua.textContent = "Thứ bảy";
      break;
    default:
      ketQua.textContent = "Không hợp lệ.";
  }
}
function tinhCuocTaxi(soKm) {
    let tienCuoc;

    if (soKm <= 1) {
        tienCuoc = 15000;
    } else if (soKm <= 5) {
        tienCuoc = 15000 + (soKm - 1) * 13500;
    } else {
        tienCuoc = 15000 + 4 * 13500 + (soKm - 5) * 11000;
    }

    // Đi trên 12 km được giảm 10%
    if (soKm > 12) {
        tienCuoc = tienCuoc * 0.9;
    }

    return tienCuoc;
}

function tinhCuocTaxi(soKm) {
    let tienCuoc;

    if (soKm <= 1) {
        tienCuoc = 15000;
    } else if (soKm <= 5) {
        tienCuoc = 15000 + (soKm - 1) * 13500;
    } else {
        tienCuoc = 15000 + 4 * 13500 + (soKm - 5) * 11000;
    }

    // Đi trên 12 km được giảm 10%
    if (soKm > 12) {
        tienCuoc = tienCuoc * 0.9;
    }

    return tienCuoc;
}

function xuLyBai3() {
    const soKm = Number(document.getElementById("soKm").value);
    const ketQua = document.getElementById("ketQuaBai3");

    if (!Number.isFinite(soKm) || soKm <= 0) {
        ketQua.textContent = "Số km không hợp lệ.";
        return;
    }

    const tienCuoc = tinhCuocTaxi(soKm);

    ketQua.textContent =
        `Tổng tiền cước: ${tienCuoc.toLocaleString("vi-VN")} VNĐ`;
}