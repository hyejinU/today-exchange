function printDateTime() {
    let today = document.getElementById("todayDetail");
    let compare = document.getElementById("compareDetail");

    let now = new Date();

    let dateTime = now.getFullYear() + "년 " + (now.getMonth()+1) + "월 " + now.getDate() + "일 " + now.getHours() + "시 " + now.getMinutes() + "분 기준";

    let todayStr = "송금보낼때, " + dateTime + ", 하나은행";
    let compareStr = "일평균환율으로 계산, " + dateTime + ", 하나은행";


    today.innerText = todayStr;
    compare.innerText = compareStr;

}

window.addEventListener("load", () => {
    printDateTime();
});