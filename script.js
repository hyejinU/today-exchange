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

let usdStr = loadFile("txt/usd.txt").split("@");
let jpyStr = loadFile("txt/jpy.txt").split("@");
let cnyStr = loadFile("txt/cny.txt").split("@");

let usd = new Array();
let jpy = new Array();
let cny = new Array();

for (let i = 0; i < 10; i++) {
  usd[i] = JSON.parse(usdStr[i]);
  jpy[i] = JSON.parse(jpyStr[i]);
  cny[i] = JSON.parse(cnyStr[i]);
}

//실시간 날짜, 시간, 분을 불러오는 function
let buy = 0;
function printDateTime() {
  let today = document.getElementById("todayDetail");
  let compare = document.getElementById("compareDetail");

  let now = new Date();
  let compareStr, todayStr;

  if (document.getElementById("btnradio1").checked === true) {
    todayStr = "송금보낼때, ";
    buy = 1;
  } else {
    todayStr = "송금받을때, ";
    buy = 0;
  }

  todayStr += usd[0].DATE + ", 하나은행";

  today.innerText = todayStr;
  compare.innerText = todayStr;
}

//calculate 한 result를 보여준다.
let calResult;
let compareOption;
let compareInput;
function printCal() {
  compareInput = document.getElementById("inputCal").value;
  compareOption = type.options[type.selectedIndex].innerText;
  calResult = "종류를 선택해주세요.";

  if (compareOption === "USD") {
    if (document.getElementById("btnradio1").checked === true) {
      calResult = compareInput * usd[0].BUY;
    } else {
      calResult = compareInput * usd[0].SELL;
    }

    calResult = calResult.toFixed(2);
  } else if (compareOption === "JPY") {
    if (document.getElementById("btnradio1").checked === true) {
      calResult = compareInput * jpy[0].BUY;
    } else {
      calResult = compareInput * jpy[0].SELL;
    }

    calResult = calResult.toFixed(2);
  } else if (compareOption === "CNY") {
    if (document.getElementById("btnradio1").checked === true) {
      calResult = compareInput * cny[0].BUY;
    } else {
      calResult = compareInput * cny[0].SELL;
    }
    calResult = calResult.toFixed(2);
  }

  document.getElementById("resultCal").innerText = calResult;
}

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

//compare한 result 를 보여준다.
let compareDate = document.getElementById("compare-date");
compareDate.onchange = function () {
  let dateOption = compareDate.options[compareDate.selectedIndex].innerText;
  let moneytypeOption = type.options[type.selectedIndex].innerText;
  let compareDateDetail = document.getElementById("compareDateDetail");
  let detailStr = " ";
  let resultStr = " ";
  let resultInt = "";
  let error = 0;

  let compareResult;

  if (dateOption === "선택") {
    resultInt = "날짜를 선택해주세요.";
    error = 1;
  } else if (
    moneytypeOption === "종류" ||
    calResult === "외화 종류를 선택해주세요."
  ) {
    resultInt = "먼저 외화종류를 선택해주세요.";
    error = 1;
  } else if (calResult === undefined) {
    resultInt = "먼저 금액을 입력해주세요.";
    error = 1;
  }

  if (error !== 1) {
    if (compareOption === "USD") {
      if (buy) {
        compareResult = usd[dateOption].BUY * compareInput;
      } else {
        compareResult = usd[dateOption].SELL * compareInput;
      }
    } else if (compareOption === "JPY") {
      if (buy) {
        compareResult = jpy[dateOption].BUY * compareInput;
      } else {
        compareResult = jpy[dateOption].SELL * compareInput;
      }
    } else if (compareOption === "CNY") {
      if (buy) {
        compareResult = cny[dateOption].BUY * compareInput;
      } else {
        compareResult = cny[dateOption].SELL * compareInput;
      }
    }

    resultInt = calResult - compareResult;

    let color1 = document.getElementById("compareResultInt");
    let color2 = document.getElementById("compareResultStr");

    if (0 <= resultInt) {
      resultStr = " 손해";
      color1.style.color = "red";
      color2.style.color = "red";
    } else {
      resultInt *= -1;
      resultStr = " 이득";
      color1.style.color = "blue";
      color2.style.color = "blue";
    }
    resultInt = resultInt.toFixed(2);

    detailStr = usd[dateOption].DATE + "기준(공휴일 및 주말 제외)";
    compareDateDetail.innerText = detailStr;
  }

  document.getElementById("compareResultInt").innerText = resultInt;
  document.getElementById("compareResultStr").innerText = resultStr;
};

window.addEventListener("load", () => {
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
  if (record.type === "USD") {
    let row = `<tr> <td> ${record.month}.${record.day} </td> <td>$${record.input}</td> </tr>`;
    let type = document.getElementById("record-usd");
    type.innerHTML += row;
    let sum = document.getElementById("usd-sum");
    sum = parseFloat(sum.innerText);
    sum += record.input;
    document.getElementById("usd-sum").innerText = sum;
  } else if (record.type === "JPY") {
    let row = `<tr> <td> ${record.month}.${record.day} </td> <td>¥${record.input}</td> </tr>`;
    let type = document.getElementById("record-jpy");
    type.innerHTML += row;
    let sum = document.getElementById("jpy-sum");
    sum = parseFloat(sum.innerText);
    sum += record.input;
    document.getElementById("jpy-sum").innerText = sum;
  } else if (record.type === "CNY") {
    let row = `<tr> <td> ${record.month}.${record.day} </td> <td>¥${record.input}</td> </tr>`;
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
