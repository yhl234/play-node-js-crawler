const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const currency = function(){
	request({
		url: "https://www.cathaybk.com.tw/cathaybk/personal/exchange/product/currency-billboard/?indexwidget",
		method: "GET"
	}, function(error, response, body){
		if(error || !body){
			return;
		}else{
			const $ = cheerio.load(body);
			const result = [];
			const table_tr = $("#content-first-tab-01 table tbody tr");
			for(var i=0; i<table_tr.length;i++){
				const table_td = table_tr.eq(i).find('td');
				const country = table_td.eq(0).text().trim();
				const bankBuy = table_td.eq(1).text(); 
				const bankSell = table_td.eq(2).text(); 
				result.push(Object.assign({country,bankBuy,bankSell}))
			}
			console.log(result);
		}
	})
}
currency();