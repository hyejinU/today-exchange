
//app.use(cors());

var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
const fs = require('fs');
app.use(cors({credentials: true}));


const request = require("request"); // npm install request
const cheerio = require("cheerio"); // npm install cheerio-httpcli 를 해야함


scraped = {
    'DATE': '',
    'ExchangeRate': '',
    'BUY': '',
    'SELL': ''
}


function getData(choice) {

    switch (choice) {
        case "USD":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_USDKRW", function (err, res, body) {
        const $ = cheerio.load(body);
        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, ""); // 필요한 부분은 다 string에서 float로 바꿈
            scraped['ExchangeRate'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(6)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(7)').text()).replace(/,/g, ""));
            var data = JSON.stringify(scraped);
            if(i===0){
                data += "@";
                fs.writeFileSync('txt/usd.txt', data, 'utf8'); // 동기적 파일쓰기, 왜? 비동기적하면 하면서 다른것도 씀 -> 순서가 뒤틀림
            }
            else{
                if(i!==9) data += "@";
                fs.appendFileSync('txt/usd.txt', data); // 비동기적 파일 쓰기
            }   
            });
        });
        break;
    case "EUR":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_EURKRW", function (err, res, body) {
        const $ = cheerio.load(body);
        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, "");
            scraped['ExchangeRate'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(6)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(7)').text()).replace(/,/g, ""));
            var data = JSON.stringify(scraped);
            if(i===0){
                data += "@";
                fs.writeFileSync('txt/eur.txt', data, 'utf8'); 
            }
            else{
                if(i!==9) data += "@";
                fs.appendFileSync('txt/eur.txt', data); 
            }   
        });
        

    });
    break;
    case "JPY":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_JPYKRW", function (err, res, body) {
        const $ = cheerio.load(body);

        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, "");
            scraped['ExchangeRate'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(6)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(7)').text()).replace(/,/g, ""));
            var data = JSON.stringify(scraped);
            if(i===0){
                data += "@";
                fs.writeFileSync('txt/jpy.txt', data, 'utf8'); 
            }
            else{
                if(i!==9) data += "@";
                fs.appendFileSync('txt/jpy.txt', data); 
            }   
        });
        

    });
    break;
    case "CNY":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_CNYKRW", function (err, res, body) {
        const $ = cheerio.load(body);

        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, "");
            scraped['ExchangeRate'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(6)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(7)').text()).replace(/,/g, ""));
            var data = JSON.stringify(scraped);
            if(i===0){
                data += "@";
                fs.writeFileSync('txt/cny.txt', data, 'utf8'); 
            }
            else{
                if(i!==9) data += "@";
                fs.appendFileSync('txt/cny.txt', data); 
            }   
        });
        

    });
    break;
   }
  
}

getData("USD");
getData("EUR");
getData("JPY");
getData("CNY");

// request 와 response 라는 인자를 줘서 콜백 함수를 만든다.
// localhost:3000 브라우저에 res.sendFile() 내부의 파일이 띄워진다.

app.use(express.static(path.join(__dirname,'/')));

app.get('/', function(req,res) {
    //res.type('html');

    res.sendFile(__dirname + "/index.html");
});

// localhost:3000/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.get('/main', function(req,res) {
    
    //res.send(scraped);
    //res.type('html');
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, function () {
    console.log('Server opened!')
  })

