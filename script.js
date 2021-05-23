function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }
  return result;
}

let usdStr = loadFile("usd.txt").split("@");
let eurStr = loadFile("eur.txt").split("@");
let jpyStr = loadFile("jpy.txt").split("@");
let cnyStr = loadFile("cny.txt").split("@");

let usd = new Array();
let eur = new Array();
let jpy = new Array();
let cny = new Array();

for (let i = 0; i < 10; i++) {
  usd[i] = JSON.parse(usdStr[i]);
  eur[i] = JSON.parse(eurStr[i]);
  jpy[i] = JSON.parse(jpyStr[i]);
  cny[i] = JSON.parse(cnyStr[i]);
}

<<<<<<< HEAD
=======
console.log(usd);
>>>>>>> ba99e48938381651879d621db5b52a5c089cd7eb

//실시간 날짜, 시간, 분을 불러오는 function
function printDateTime() {
  let today = document.getElementById("todayDetail");
  let compare = document.getElementById("compareDetail");

  let now = new Date();

<<<<<<< HEAD
    if(document.getElementById("btnradio3").checked === true){
        compareStr = "송금보낼때, ";
    }
    else{
        compareStr = "송금받을때, ";
    }
=======
  let dateTime =
    now.getFullYear() +
    "년 " +
    (now.getMonth() + 1) +
    "월 " +
    now.getDate() +
    "일 " +
    now.getHours() +
    "시 " +
    now.getMinutes() +
    "분 기준";

  let todayStr, compareStr;

  if (document.getElementById("btnradio1").checked === true) {
    todayStr = "송금보낼때, ";
  } else {
    todayStr = "송금받을때, ";
  }
>>>>>>> ba99e48938381651879d621db5b52a5c089cd7eb

  if (document.getElementById("btnradio3").checked === true) {
    compareStr = "송금보낼때, ";
  } else if (document.getElementById("btnradio4").checked === true) {
    compareStr = "송금받을때, ";
  }

  todayStr += usd[0].DATE + ", 하나은행";
  compareStr += usd[0].DATE + ", 하나은행";

  today.innerText = todayStr;
  compare.innerText = compareStr;
}

//calculate 한 result를 보여준다.
function printCal() {
  let input = document.getElementById("inputCal").value;
  let option = type.options[type.selectedIndex].innerText;
  let result = "외화 종류를 선택해주세요.";

  if (option === "USD") {
    if (document.getElementById("btnradio1").checked === true) {
      result = input * usd[0].BUY;
    } else {
      result = input * usd[0].SELL;
    }

    result = result.toFixed(2);
  } else if (option === "JPY") {
    if (document.getElementById("btnradio1").checked === true) {
      result = input * jpy[0].BUY;
    } else {
      result = input * jpy[0].SELL;
    }

    result = result.toFixed(2);
  } else if (option === "CNY") {
    if (document.getElementById("btnradio1").checked === true) {
      result = input * cny[0].BUY;
    } else {
      result = input * cny[0].SELL;
    }
    result = result.toFixed(2);
  }

  document.getElementById("resultCal").innerText = result;
  document.getElementById("inputCal").value = "";
}

//현재 날짜를 기준으로 날짜를 선택할 수 있게 한다. 20210101~현재날짜까지 가능하도록 설정함.
function setMonthDay1() {
  let month = document.getElementById("Month");
  let now = new Date();

  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth() + 1;
  let nowDate = now.getDate();

  for (let i = 1; i <= nowMonth; i++) {
    let newMonth = document.createElement("option");
    newMonth.innerText = i;
    newMonth.setAttribute("value", i);
    month.append(newMonth);
  }
}

//월 선택하면 날짜를 선택할 수 있게 한다.
let month = document.getElementById("Month");
month.onchange = function () {
  console.log("month");
  let day = document.getElementById("Day");
  let option = month.options[month.selectedIndex].innerText;
  let dayArr = new Array();
  dayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let now = new Date();
  let nowMonth = now.getMonth() + 1;
  let nowDate = now.getDate();

  day.innerText = "";
  if (option == nowMonth) {
    for (let i = 1; i <= nowDate; i++) {
      let newMonth = document.createElement("option");
      newMonth.innerText = i;
      newMonth.setAttribute("value", i);
      day.append(newMonth);
    }
  } else {
    for (let i = 1; i <= dayArr[option - 1]; i++) {
      let newMonth = document.createElement("option");
      newMonth.innerText = i;
      newMonth.setAttribute("value", i);
      day.append(newMonth);
    }
  }
};

let type = document.getElementById("moneyType");
type.onchange = function () {
  let option = type.options[type.selectedIndex].innerText;
  let moneytype = document.getElementById("addon-wrapping");
  let result = "";
  document.getElementById("resultCal").innerText = result;

  if (option === "USD") {
    moneytype.innerText = "$";
  } else if (option === "JPY") {
    moneytype.innerText = "¥(엔)";
  } else if (option === "CNY") {
    moneytype.innerText = "¥(위안)";
  }
};

window.addEventListener("load", () => {
  setMonthDay1();
  setMonthDay2();
  printDateTime();
  loadRecords();
});

//////////////////////////////////

function setMonthDay2() {
  let month = document.getElementById("record-Month");
  let now = new Date();

  let nowYear = now.getFullYear();
  let nowMonth = now.getMonth() + 1;
  let nowDate = now.getDate();

  for (let i = 1; i <= nowMonth; i++) {
    let newMonth = document.createElement("option");
    newMonth.innerText = i;
    newMonth.setAttribute("value", i);
    month.append(newMonth);
  }
}

let recordMonth = document.getElementById("record-Month");
recordMonth.onchange = function () {
  console.log("record-month");
  let day = document.getElementById("record-Day");
  let option = recordMonth.options[recordMonth.selectedIndex].innerText;
  let dayArr = new Array();
  dayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let now = new Date();
  let nowMonth = now.getMonth() + 1;
  let nowDate = now.getDate();

  day.innerText = "";
  if (option == nowMonth) {
    for (let i = 1; i <= nowDate; i++) {
      let newMonth = document.createElement("option");
      newMonth.innerText = i;
      newMonth.setAttribute("value", i);
      day.append(newMonth);
    }
  } else {
    for (let i = 1; i <= dayArr[option - 1]; i++) {
      let newMonth = document.createElement("option");
      newMonth.innerText = i;
      newMonth.setAttribute("value", i);
      day.append(newMonth);
    }
  }
};

let recordType = document.getElementById("record-moneyType");
recordType.onchange = function () {
  let option = recordType.options[recordType.selectedIndex].innerText;

  if (option === "USD") {
    document.getElementById("record-optionType").innerText = "$";
  } else if (option === "JPY") {
    document.getElementById("record-optionType").innerText = "¥(엔)";
  } else if (option === "CNY") {
    document.getElementById("record-optionType").innerText = "¥(위안)";
  }
};

//////////////

let records = [];
function saveRecords() {
  localStorage.setItem("records", JSON.stringify(records));
}

function loadRecords() {
  let lastRecords = localStorage.getItem("records");
  if (!lastRecords) return;

  records = JSON.parse(lastRecords);
  records.forEach(saveToTable);
}

let saveButton = document.getElementById("record-saveButton");
saveButton.addEventListener("click", () => {
  let saveType = recordType.options[recordType.selectedIndex].innerText;
  let saveInput = document.querySelector("#record-input");
  let text = parseFloat(saveInput.value);
  let saveMonth = document.querySelector("#record-Month");
  let month = saveMonth.options[saveMonth.selectedIndex].innerText;
  let saveDay = document.querySelector("#record-Day");
  let day = saveDay.options[saveDay.selectedIndex].innerText;

  if (isNaN(text)) return;
  if (isNaN(parseFloat(month))) return;

  let record = {
    type: saveType,
    input: text,
    month: month,
    day: day,
  };

  records.push(record);
  saveRecords();

  saveToTable(record);

  saveInput.value = "";
});

function saveToTable(record) {
  let row = `<tr> <td> ${record.month}.${record.day} </td> <td>${record.input}</td> </tr>`;

  if (record.type === "USD") {
    let type = document.getElementById("record-usd");
    type.innerHTML += row;
    let sum = document.getElementById("usd-sum");
    sum = parseFloat(sum.innerText);
    sum += record.input;
    document.getElementById("usd-sum").innerText = sum;
  } else if (record.type === "JPY") {
    let type = document.getElementById("record-jpy");
    type.innerHTML += row;
    let sum = document.getElementById("jpy-sum");
    sum = parseFloat(sum.innerText);
    sum += record.input;
    document.getElementById("jpy-sum").innerText = sum;
  } else if (record.type === "CNY") {
    let type = document.getElementById("record-cny");
    type.innerHTML += row;
    let sum = document.getElementById("cny-sum");
    sum = parseFloat(sum.innerText);
    sum += record.input;
    document.getElementById("cny-sum").innerText = sum;
  }
}

let clearButton = document.getElementById("record-clearButton");
clearButton.addEventListener("click", () => {
  localStorage.clear();
  location.reload(true);
});
