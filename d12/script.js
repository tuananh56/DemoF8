// const numbers=[1,2,3,4,5];
// const arr = ["Hồ", "Tuấn", "Anh", "Huy"];
// console.log(arr.length);
// console.log(arr[1])
// console.log(arr[arr.length-1])
// arr.push("Vũ"); //thêm cuối
// arr.pop("Hồ"); //xoá cuối
// arr.unshift("An"); //thêm đầu
// arr.shift(); //xoá đầu
// arr.splice(1, 0, "Phương", "Trân"); //thêm giữa
// console.log(arr);

//duyệt mảng
// const points = [7, 9, 8, 7, 5, 6, 10];
// let result = 0;
// for (let i = 0; i < points.length; i++) {
//   if (points[i] >= 9) {
//     result++;
//   }
// }
// console.log(result);

// for (let point of points) {
//     if(point>=9){
//         result++;
//     }
// }

// points.forEach((point) => {
//   if (point >= 9) {
//     result++;
//   }
// });
// console.log(result);

// const errorPoint = [8, 7, null, undefined, 9, 10, null, undefined];
// const index = errorPoint.indexOf(null);
// errorPoint.splice(index, 2); // tìm index đầu

// const lastIndex = errorPoint.lastIndexOf(null);
// errorPoint.splice(lastIndex, 2); // tìm kiếm index cuối

// const emails = ["john@example.com", "jane@example.com", "bob@example.com"];
// const isExist = emails.includes("john@example.com");
// console.log(isExist); //tìm kiến tồn tại

// //tìm kiếm đk
// const pointOfUser=[7,8,9,9];
// const isExcellent=pointOfUser.some((point)=>{
//     return point===10;
// });
// console.log(isExcellent);//ko đc hs excellent

// const pointOfUser1=[7,8,9,9];
// const isExcellent1=pointOfUser1.every((point)=>{
//     return point>=7;
// });
// console.log(isExcellent1);//đc hs excellent

//tìm đúng phần tử theo yêu cầu
// const username = ["john", "jack", " ", "alice", "burno", " "];
// const emptyUsername = username.find((username, index) => {
//   console.log(index);
//   return username === " ";
// });
// console.log(emptyUsername);

//lọc
const products = [
  "iphone 18",
  "iphone 17",
  "iphone 16",
  "iphone duo",
  "samsum",
  "redmi",
];
const keyword = "iphone";
const searchProducts = products.filter((product) => {
  return product.includes(keyword);
});
console.log(searchProducts);

//map
const score = [3, 5, 7, 9];
const newScore = score.map((score) => {
  return score * 2;
});
console.log(newScore);

//filler + map
const product = [
  "iphone 18",
  "iphone 17",
  "iphone 16",
  "iphone duo",
  "samsum",
  "redmi",
];
const keyword1 = "iphone";

const searchProduct2 = products.filter((product) => {
  return product.toLowerCase().includes(keyword1.toLowerCase());
});

console.log(searchProduct2);

//sắp xếp
// const product3 = [
//   { name: "iphone 17", price: 200 },
//   { name: "iphone 18", price: 300 },
//   { name: "iphone 19", price: 400 },
// ];
// function sortProductBỵ(products, key, order="asc"){{
//     if(key==="name"){
//         if(order==="asc"){
//             products.sort((a,b)=>{
//                 if(a.name<b.name) return -1
//             })
//         }
//     }
// }}
const name=["Hồ", "Tuấn", "Anh", "Huy"];
const name2=[1,2,10,20];
console.log(name.sort());
console.log(name2.sort((a,b)=>a-b)); //tăng dần
console.log(name2.sort((a,b)=>b-a)); //giảm dần

//tách, nối, copy
const name3=[1,2,3,4,5,6,7,8,9,10];