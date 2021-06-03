# Today-Exchange

## 프로젝트 진행 계기 

 올해 2021년부터 주식을 향한 관심이 급등하였고, 자연스럽게 테슬라 같은 해외 주식에도 이목
이 쏠리고 있다. 이제 주식은 경제 전문가들을 위한 전유물이 아닌 일반인들의 취미로 다가왔다. 
이에 발맞춰 경제 관련 지식이 부족한 일반인들을 위한 많은 정보들이 소개되고 있지만 복잡해
보이는 그래프는 여전히 우리의 머리를 어지럽게 만든다. 특히나 환율까지 신경 써야 하는 해외
주식의 경우는 더욱 그렇다. 그리하여, 환율이 낯선 사람들에게 쉽게 환전을 도와줄 수 있는 웹 사이트를 개발해보고자 'Today-Exchange' 프로젝트를 기획하였다. 

## 최신 버전 (Latest Release) - 2021.05.24

현재 최신 버전은 [v.1.2.0](https://github.com/hyejinU/today-exchange/releases)이다.


## 설치 방법 (Installation guide)

> NOTE : 설치하기 이전 javascript 파일을 실행시키기 위해 [node.js](https://nodejs.org/en/)를 설치할 것을 권장한다. 또한 원활한 실행을 위해 node module 중 [cheerio](https://www.npmjs.com/package/cheerio), [cheerio-httpcli](https://www.npmjs.com/package/cheerio-httpcli), [cors](https://www.npmjs.com/package/cors), [request](https://www.npmjs.com/package/request), [express](https://www.npmjs.com/package/express) 를 설치하길 바란다.

```
$ node app.js
```
먼저 깃허브 속 코드를 다운받거나 git clone을 한 뒤 위 명령어를 cmd 혹은 Terminal에서 실행시킨다. 그 뒤, 브라우저(Chrome 권장)에서 http://localhost:3000/ 에 접속한다.   
또한 [깃허브 홈페이지](https://hyejinu.github.io/today-exchange/) 에서도 Test homepage를 볼 수 있다. (단, 웹크롤링으로 환율을 업데이트하는 것이 안된다. 깃허브에 나와있는 txt파일로 정보를 끌어온다.)


## Today-Exchange 사이트 및 기능 소개 (Overview)

### Today-Exchange 사이트 예시 이미지

<img width="1095" alt="localhost_3000_ (2)" src="https://user-images.githubusercontent.com/80032256/119377079-a7050480-bcf7-11eb-9117-efeefc07c962.png">


### Today-Exchange 기능 소개   
  
- **환율 그래프**    
 네이버 환율페이지에서 USD, CNY, JPY의 환율 정보를 크롤링해와 이를 그래프로 표시한다. Slide 형식으로 넘겨서 볼 수 있도록 하였으며 average 값을 그래프에 표시해 보기 편하도록 하였다.
   
- **환전 계산기**       
송금보낼때, 송금받을때 총 두 가지의 옵션으로 나누어 종류(USD, CNY, JPY)를 선택하고 금액을 입력하면 입력한 금액으로 바꾸기 위한 KRW 값이 표시된다.
  - 다른날과 비교    
   1~9일 전 중 원하는 날짜를 선택해 위(오늘 환전하면?)에서 바꾼 KRW 값과 선택한 날짜의 환율로 바꾼 KRW 값이 얼마나 차이나는지 표시해준다.  
    
- **외화 보유량 기록**   
종류(USD, JPY, CNY)를 선택하고 금액(+/-), 그리고 월/일을 선택해 SAVE 하면 선택한 종류의 표에 금액 및 날짜를 표기한다. 이렇게 표기한 값들은 localstorage에 저장된다.



## 사용 예시 및 시나리오 (Demo & Usage Scenario)

- 예상 사용자: USD/JPY/CNY 중 환전을 하려는 사람

- 예상 사용 시나리오:    
  1. 사이트에 접속하여 환율그래프를 보고 환율 변화를 한 눈에 확인한다.    
  2. 외화 종류를 선택하고 금액을 입력하여 필요한 원화를 확인한다.   
  3. 특정 날짜와 오늘을 비교해 위에서 입력한 정보를 기준으로 손해/이득을 따져준다.   
  4. 상단 메뉴에서 원하는 사이트를 눌러 포털 사이트로 들어가 환전을 진행할 수 있다.    
  5. 사용자가 환전한 외화 종류, 날짜, 금액을 기록하면, 그동안 기록한 데이터를 총합해 외화 별 보유량을
표로 보여준다.

사용 데모는 [유튜브](https://youtu.be/06LmnSUSd_M) 를 확인하길 바란다.

## 파일 및 스크립트 관련 설명 (Description of file)

- `index.html`     
  웹사이트의 전반적인 디자인 및 텍스트 정보가 저장되어있다. 서버를 실행시 index.html를 기본으로 불러오도록 하였다.

- `script.js`     
  환율계산기, 외화 보유량 기록 기능을 구현하는 자바스크립트 파일이다.

- `app.js`   
  express 를 통해 서버를 구축하고 서버에 `index.html`을 불러온다. 또한, 환율을 웹크롤링해와 이를 txt 파일 (`cny.txt, jpy.txt, usd.txt`)에 저장한다.

- `gph.js`     
  환율그래프에 들어가는 그래프를 기록하는 자바스크립트 파일이다. 

- `style.css`    
  `index.html` 속 style 속성을 나타낸 css 파일이다. 

## 책임자 (Maintainers)

김 산 @kimsan1120  ks20001120@gmail.com

박지윤 @cho-to nicole2974@naver.com

유혜진 @hyejinU trashgeun@gmail.com


## Contrbuting

[Github issue](https://github.com/hyejinU/today-exchange/issues)

## 개선사항 (Tasks to improve)

- 서버를 구축할 때 웹크롤링한 정보를 txt에 담아 저장한 것은 CORS 에러 때문이다. CORS 에러를 핸들링하기 위해 관련 모듈도 설치해보고 Respones-header도 바꾸어보려고 했지만 잘 되지 않았다. 현재 이렇게 웹 크롤링한 정보를 가져오는 방식은 만약 다량의 정보를 가져올시 시간적인 문제가 발생할 수 있고 서버를 실행할 때에만 불러온다는 단점이 존재한다. 따라서 추후 시간을 내어 이러한 CORS 에러를 핸들링하는 방안을 찾아볼 것이다.





## 참고 (Reference)

- Dependencies    
[cheerio](https://www.npmjs.com/package/cheerio), [cheerio-httpcli](https://www.npmjs.com/package/cheerio-httpcli), [cors](https://www.npmjs.com/package/cors), [request](https://www.npmjs.com/package/request), [express](https://www.npmjs.com/package/express)

- 환율 정보   
[USD](https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_USDKRW)    
[JPY](https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_JPYKRW)   
[CNY](https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_CNYKRW)

- 기타   
[Bootstrap](https://getbootstrap.com/)


## License
MIT


