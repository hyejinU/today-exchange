



window.onload = function () {
function loadFile(filePath) {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();
	if (xmlhttp.status==200) {
	  result = xmlhttp.responseText;
	}
	return result;
}

let usdStr = loadFile("usd.txt").split('@');
let eurStr = loadFile("eur.txt").split('@');
let jpyStr = loadFile("jpy.txt").split('@');
let cnyStr = loadFile("cny.txt").split('@');

let usd = new Array();
let eur = new Array();
let jpy = new Array();
let cny = new Array();

for(let i=0; i<10; i++){
usd[i] = JSON.parse(usdStr[i]);
eur[i] = JSON.parse(eurStr[i]);
jpy[i] = JSON.parse(jpyStr[i]);
cny[i] = JSON.parse(cnyStr[i]);
}
var chartUSD = new CanvasJS.Chart("USDChart", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "미국 USD"
	},
	axisY: {
		labelFontSize: 10,
		labelFontColor: "dimGrey",
		stripLines: [{
			value: 
			(usd[0].ExchangeRate +
			 usd[1].ExchangeRate + 
			 usd[2].ExchangeRate + 
			 usd[3].ExchangeRate + 
			 usd[4].ExchangeRate + 
			 usd[5].ExchangeRate + 
			 usd[6].ExchangeRate + 
			 usd[7].ExchangeRate + 
			 usd[8].ExchangeRate + 
			 usd[9].ExchangeRate) / 10,
			label: "Average"
		}]

	},
	axisX: {
		labelAngle: -30
	},
	data: [{        
		type: "line",
      	indexLabelFontSize: 13,
			dataPoints: [				
				{ y: usd[9].ExchangeRate, label: usd[9].DATE },
				{ y: usd[8].ExchangeRate, label: usd[8].DATE },
				{ y: usd[7].ExchangeRate, label: usd[7].DATE },
				{ y: usd[6].ExchangeRate, label: usd[6].DATE },
				{ y: usd[5].ExchangeRate, label: usd[5].DATE },
				{ y: usd[4].ExchangeRate, label: usd[4].DATE },
				{ y: usd[3].ExchangeRate, label: usd[3].DATE },
				{ y: usd[2].ExchangeRate, label: usd[2].DATE },
				{ y: usd[1].ExchangeRate, label: usd[1].DATE },
				{ y: usd[0].ExchangeRate, label: usd[0].DATE }
			]
	}]
});


var chartJPY = new CanvasJS.Chart("JPYChart", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "일본 JPY"
	},
	axisY: {
		labelFontSize: 10,
		labelFontColor: "dimGrey",
		stripLines: [{
			value: 
			(jpy[0].ExchangeRate +
			 jpy[1].ExchangeRate + 
			 jpy[2].ExchangeRate + 
			 jpy[3].ExchangeRate + 
			 jpy[4].ExchangeRate + 
			 jpy[5].ExchangeRate + 
			 jpy[6].ExchangeRate + 
			 jpy[7].ExchangeRate + 
			 jpy[8].ExchangeRate + 
			 jpy[9].ExchangeRate) / 10,
			label: "Average"
		}]
	},
	axisX: {
		labelAngle: -30
	},
	data: [{        
		type: "line",
      	indexLabelFontSize: 13,
			dataPoints: [				
				{ y: jpy[9].ExchangeRate, label: jpy[9].DATE },
				{ y: jpy[8].ExchangeRate, label: jpy[8].DATE },
				{ y: jpy[7].ExchangeRate, label: jpy[7].DATE },
				{ y: jpy[6].ExchangeRate, label: jpy[6].DATE },
				{ y: jpy[5].ExchangeRate, label: jpy[5].DATE },
				{ y: jpy[4].ExchangeRate, label: jpy[4].DATE },
				{ y: jpy[3].ExchangeRate, label: jpy[3].DATE },
				{ y: jpy[2].ExchangeRate, label: jpy[2].DATE },
				{ y: jpy[1].ExchangeRate, label: jpy[1].DATE },
				{ y: jpy[0].ExchangeRate, label: jpy[0].DATE }
			]
	}]
});

var chartCNY = new CanvasJS.Chart("CNYChart", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "중국 CNY"
	},
	axisY: {
		labelFontSize: 10,
		labelFontColor: "dimGrey",
		stripLines: [{
			value: 
			(cny[0].ExchangeRate +
			 cny[1].ExchangeRate + 
			 cny[2].ExchangeRate + 
			 cny[3].ExchangeRate + 
			 cny[4].ExchangeRate + 
			 cny[5].ExchangeRate + 
			 cny[6].ExchangeRate + 
			 cny[7].ExchangeRate + 
			 cny[8].ExchangeRate + 
			 cny[9].ExchangeRate) / 10,
			label: "Average"
		}]
	},
	axisX: {
		labelAngle: -30
	},
	data: [{        
		type: "line",
      	indexLabelFontSize: 13,
			dataPoints: [				
				{ y: cny[9].ExchangeRate, label: cny[9].DATE },
				{ y: cny[8].ExchangeRate, label: cny[8].DATE },
				{ y: cny[7].ExchangeRate, label: cny[7].DATE },
				{ y: cny[6].ExchangeRate, label: cny[6].DATE },
				{ y: cny[5].ExchangeRate, label: cny[5].DATE },
				{ y: cny[4].ExchangeRate, label: cny[4].DATE },
				{ y: cny[3].ExchangeRate, label: cny[3].DATE },
				{ y: cny[2].ExchangeRate, label: cny[2].DATE },
				{ y: cny[1].ExchangeRate, label: cny[1].DATE },
				{ y: cny[0].ExchangeRate, label: cny[0].DATE }
			]
	}]
});


chartUSD.render();

chartJPY.render();

chartCNY.render();

}
