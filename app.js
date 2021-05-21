

//app.use(cors());

var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
const fs = require('fs');
app.use(cors({credentials: true}));


// express 는 함수이므로, 반환값을 변수에 저장한다.
// 3000 포트로 서버 오픈


const request = require("request"); // npm install request
const cheerio = require("cheerio"); // npm install cheerio-httpcli 를 해야함


scraped = {
    'DATE': '',
    'EXCHANGE RATE': '',
    'BUY': '',
    'SELL': ''
}
 var choice;
 var array = ["USD", "EUR", "JPY", "CNY"];
 
 choice = array[0]; // 여기를 고차면 index 0: USD, index 1: EUR, index 2: JPY, index 3: CNY


function getData() {

    switch (choice) {
        case "USD":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_USDKRW", function (err, res, body) {
        const $ = cheerio.load(body);
        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, ""); // 필요한 부분은 다 string에서 float로 바꿈
            scraped['EXCHANGE RATE'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(4)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(5)').text()).replace(/,/g, ""));
            console.log(scraped)

            var data = JSON.stringify(scraped);
            if(i===0){
            fs.writeFile('text1.txt', data, 'utf8', function(err) {
                console.log('비동기적 파일 쓰기 완료');
            });
            }
            else{
            fs.appendFileSync('text1.txt', data);
            }   

            });
        });
        break;
    case "EUR":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_EURKRW", function (err, res, body) {
        const $ = cheerio.load(body);
        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, "");
            scraped['EXCHANGE RATE'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(4)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(5)').text()).replace(/,/g, ""));
            console.log(scraped)
        });
        

    });
    break;
    case "JPY":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_JPYKRW", function (err, res, body) {
        const $ = cheerio.load(body);

        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, "");
            scraped['EXCHANGE RATE'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(4)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(5)').text()).replace(/,/g, ""));
            console.log(scraped)
        });
        

    });
    break;
    case "CNY":
            request("https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_CNYKRW", function (err, res, body) {
        const $ = cheerio.load(body);

        const bodyList = $(".tbl_exchange tbody tr").map(function (i, element) {
            scraped['DATE'] = String($(element).find('td:nth-of-type(1)').text()).replace(/,/g, "");
            scraped['EXCHANGE RATE'] =  parseFloat(String($(element).find('td:nth-of-type(2)').text()).replace(/,/g, ""));
            scraped['BUY'] =  parseFloat(String($(element).find('td:nth-of-type(4)').text()).replace(/,/g, ""));
            scraped['SELL'] =  parseFloat(String($(element).find('td:nth-of-type(5)').text()).replace(/,/g, ""));
            console.log(scraped)
        });
        

    });
    break;
   }
  
}

getData();


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
    console.log('Cupdate')
  })

