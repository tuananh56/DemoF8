/*code chạy trên browser*/

 function showTotalSalary() {
  const employees = [
    new Developer(1, "Nguyễn Văn A", 12000000, 10),
    new Developer(2, "Trần Thị B", 15000000, 5),
    new Manager(3, "Lê Văn C", 20000000, 5000000),
    new Manager(4, "Phạm Thị D", 18000000, 3000000),
  ];

  const output = document.getElementById("salaryOutput");
  let html = "<h3>Danh sách nhân viên</h3><ul>";

  employees.forEach((emp) => {
    let role = emp instanceof Developer ? "Developer" : "Manager";
    let extra = "";
    if (emp instanceof Developer) {
      extra = `, Overtime: ${emp.overtimeHours} giờ`;
    } else if (emp instanceof Manager) {
      extra = `, Bonus: ${emp.bonus.toLocaleString("vi-VN")} VND`;
    }
    html += `<li>${emp.name} (${role}) → Lương: ${emp.calculateSalary().toLocaleString("vi-VN")} VND${extra}</li>`;
  });

  html += "</ul>";

  const totalSalary = calculateTotalSalary(employees);
  html += `<p><strong>Tổng lương: ${totalSalary.toLocaleString("vi-VN")} VND</strong></p>`;

  output.innerHTML = html;
}

function showTimeAgo() {
  const testDate = "2026-09-19T14:30:00+07:00";
  const result = timeAgo(testDate);

  const dateObj = new Date(testDate);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

  document.getElementById("timeAgoOutput").innerText =
    `Ngày ${formattedDate} → ${result}`;
}

function startCountdownDemo() {
  const now = new Date();
  const targetDate = new Date(now.getTime() + 5000); // 5s
  const output = document.getElementById("countdownOutput");

  const timer = setInterval(() => {
    const countdown = getCountdown(targetDate.toISOString());
    output.innerText = `${countdown.days} ngày ${countdown.hours} giờ ${countdown.minutes} phút ${countdown.seconds} giây`;
    if (
      countdown.days === 0 &&
      countdown.hours === 0 &&
      countdown.minutes === 0 &&
      countdown.seconds === 0
    ) {
      clearInterval(timer);
      output.innerText = "Countdown finished!";

      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
      });
    }
  }, 1000);
}

function checkWeekend() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const dateString = `${day}/${month}/${year}`;
  const result = isWeekend(now.toISOString().split("T")[0]);
  document.getElementById("weekendOutput").innerText =
    `${dateString} → ${result ? "Cuối tuần" : "Ngày thường"}`;
}
