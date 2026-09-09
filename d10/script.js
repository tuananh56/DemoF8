// =========================
// BÀI 1
// =========================

function checkPrime() {
  let n = Number(document.getElementById("numberInput").value);
  let reult = "true";
  if (n <= 1) {
    return (reult = false);
  } else {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        reult = false;
        break;
      }
    }
  }
  document.getElementById("primeResult").textContent = reult;
}

// =========================
// BÀI 2
// =========================
function formatName() {
  let fullName = document.getElementById("nameInput").value;
  fullName = fullName.trim().toLowerCase();
  let words = fullName.split(" ");
  let result = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i] !== "") {
      result += words[i][0].toUpperCase() + words[i].slice(1) + " ";
    }
  }
  result = result.trim();
  document.getElementById("nameResult").textContent = result;
}
// =========================
// BÀI 3
// =========================
function hideEmail(){
    let email = document.getElementById("emailInput").value;
    let parts=email.split("@");
    let username=parts[0];
    let domain=parts[1];
    let result="";
    if(username.length>4){
        let firstPart=username.slice(0,2);
        let lastPart=username.slice(-2);
        let middlePart="*".repeat(username.length-4);
        result=firstPart+middlePart+lastPart+"@"+domain;
    }else{
        let first=username[0];
        let hidden="*".repeat(username.length-1);
        result=first+hidden+"@"+domain;
    }
    document.getElementById("emailResult").textContent=result;
}