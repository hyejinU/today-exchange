function printDateTime() {
  let today = document.getElementById("todayDetail");
  let compare = document.getElementById("compareDetail");

  let now = new Date();

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

  let todayStr = "송금보낼때, " + dateTime + ", 하나은행";
  let compareStr = "송금보낼때로 계산, " + dateTime + ", 하나은행";

  today.innerText = todayStr;
  compare.innerText = compareStr;
}

function printCal() {
  const input = document.getElementById("inputCal").value;
  document.getElementById("resultCal").innerText = input;
}

//현재 날짜를 기준으로 날짜를 선택할 수 있게 한다. 20210101~현재날짜까지 가능하도록 설정함.
function setMonthDay() {
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

let month = document.getElementById("Month");
month.onchange = function () {
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

  if (option === "USD") {
    moneytype.innerText = "$";
  } else if (option === "JPY") {
    moneytype.innerText = "¥(엔)";
  } else if (option === "CNY") {
    moneytype.innerText = "¥(위안)";
  }
};

window.addEventListener("load", () => {
  setMonthDay();
  printDateTime();
  loadRecords();
});

//////////////////////////////////

function setMonthDay() {
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
