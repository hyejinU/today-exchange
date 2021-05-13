
function printDateTime() {
    let today = document.getElementById("todayDetail");
    let compare = document.getElementById("compareDetail");

    let now = new Date();

    let dateTime = now.getFullYear() + "년 " + (now.getMonth()+1) + "월 " + now.getDate() + "일 " + now.getHours() + "시 " + now.getMinutes() + "분 기준";

    let todayStr = "송금보낼때, " + dateTime + ", 하나은행";
    let compareStr = "송금보낼때로 계산, " + dateTime + ", 하나은행";


    today.innerText = todayStr;
    compare.innerText = compareStr;

}

//현재 날짜를 기준으로 날짜를 선택할 수 있게 한다. 20210101~현재날짜까지 가능하도록 설정함.
function setMonthDay(){
    let month = document.getElementById("Month");
    let now = new Date();

    let nowYear = now.getFullYear();
    let nowMonth = now.getMonth() + 1;
    let nowDate = now.getDate();

    for(let i=1; i<=nowMonth; i++){
        let newMonth = document.createElement("option");
        newMonth.innerText = i;
        newMonth.setAttribute("value", i);
        month.append(newMonth);
    }
}

let month = document.getElementById("Month");
month.onchange = function(){
    let day = document.getElementById("Day");
    let option = month.options[month.selectedIndex].innerText;
    let dayArr = new Array();
    dayArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    
    let now = new Date();
    let nowMonth = now.getMonth() + 1;
    let nowDate = now.getDate();

    day.innerText = "";
    if(option == nowMonth){
        for(let i=1; i<=nowDate; i++){
            let newMonth = document.createElement("option");
            newMonth.innerText = i;
            newMonth.setAttribute("value", i);
            day.append(newMonth);
        }
    }
    else{
        for(let i=1; i<=dayArr[option-1]; i++){
            let newMonth = document.createElement("option");
            newMonth.innerText = i;
            newMonth.setAttribute("value", i);
            day.append(newMonth);
        }
    }

}

let type = document.getElementById("moneyType");
type.onchange = function(){
    let option = type.options[type.selectedIndex].innerText;
    let moneytype = document.getElementById("addon-wrapping");

    if(option ==="USD"){
        moneytype.innerText = "$";
    }
    else if(option ==="JPY"){
        moneytype.innerText = "¥(엔)";
    }
    else if(option ==="CNY"){
        moneytype.innerText = "¥(위안)";
    }
}



window.addEventListener("load", () => {
    setMonthDay();
    printDateTime();
});


