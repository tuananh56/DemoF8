//Bài 1
class Employee {
  constructor(id, name, baseSalary) {
    this.id = id;
    this.name = name;
    this.baseSalary = baseSalary;
  }
  calculateSalary() {
    return this.baseSalary;
  }
}
// const employee = new Employee(1, "Nguyễn Văn A", 10000000);
// console.log(employee.calculateSalary());

class Developer extends Employee {
  constructor(id, name, baseSalary, overtimeHours) {
    super(id, name, baseSalary);
    this.overtimeHours = overtimeHours;
  }
  calculateSalary() {
    return this.baseSalary + this.overtimeHours * 200000;
  }
}
// const developer = new Developer(2, "Trần Thị B", 12000000, 10);
// console.log(developer.calculateSalary());

class Manager extends Employee {
  constructor(id, name, baseSalary, bonus) {
    super(id, name, baseSalary);
    this.bonus = bonus;
  }
  calculateSalary() {
    return this.baseSalary + this.bonus;
  }
}
// const manager = new Manager(3, "Lê Văn C", 20000000, 5000000);
// console.log(manager.calculateSalary());

function calculateTotalSalary(employeeList) {
  return employeeList.reduce(
    (total, employee) => total + employee.calculateSalary(),
    0,
  );
}

// const employees = [
//   new Developer(1, "Nguyễn Văn A", 12000000, 10),
//   new Developer(2, "Trần Thị B", 15000000, 5),
//   new Manager(3, "Lê Văn C", 20000000, 5000000),
//   new Manager(4, "Phạm Thị D", 18000000, 3000000),
// ];

// const totalSalary = calculateTotalSalary(employees);
// console.log(totalSalary);

//  Bài 2
function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const difMs = now - date;
  const difMinutes = Math.floor(difMs / (1000 * 60));
  const difHours = Math.floor(difMs / (1000 * 60 * 60));
  const diffDays = Math.floor(difMs / (1000 * 60 * 60 * 24));
  if (difMinutes < 1) {
    return "Vừa xong";
  } else if (difMinutes < 60) {
    return `${difMinutes} phút trước`;
  } else if (difHours < 24) {
    return `${difHours} giờ trước`;
  } else {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
console.log(timeAgo("2026-09-20T14:59:30+07:00"));
console.log(timeAgo("2026-09-20T14:30:00+07:00"));
console.log(timeAgo("2026-09-20T10:00:00+07:00"));
console.log(timeAgo("2026-09-18T08:00:00+07:00"));

// Hàm getCountdown(targetDateString)

function getCountdown(targetDateString) {
  const now = new Date();
  const targetDate = new Date(targetDateString);

  let diffMs = targetDate - now;
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const seconds = Math.floor((diffMs / 1000) % 60);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return { days, hours, minutes, seconds };
}

function startCountdown(targetDateString) {
  const timer = setInterval(() => {
    const countdown = getCountdown(targetDateString);
    console.log(countdown);
    if (
      countdown.days === 0 &&
      countdown.hours === 0 &&
      countdown.minutes === 0 &&
      countdown.seconds === 0
    ) {
      clearInterval(timer);
      console.log("Countdown finished!");
    }
  }, 1000);
}
const now = new Date();
const targetDate = new Date(now.getTime() + 5 * 1000); // 5s
startCountdown(targetDate.toISOString());

// Hàm isWeekend(dateString)

function isWeekend(dateString) {
  const date = new Date(dateString);
  const day = date.getDay();
  return day === 0 || day === 6;
}
console.log(isWeekend("2026-09-19")); // Thứ Bảy → true
console.log(isWeekend("2026-09-20")); // Chủ Nhật → true
console.log(isWeekend("2026-09-21")); // Thứ Hai → false



