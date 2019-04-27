const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const firstBank = function(){
	request({
		url: "https://ibank.firstbank.com.tw/NetBank/7/0201.html",
		method: "GET"
	}, function(error, response, body){
		if(error || !body){
			return;
		}else{
			const $ = cheerio.load(body);
			const result = [];
			const table_tr = $("#table1 tbody tr");
			var array = [1,11,21,13]
			for(var i=0; i<array.length;i++){
				const table_td = table_tr.eq(array[i]).find('td');
				const country = table_td.eq(0).text().trim();
				const bankBuy = table_td.eq(2).text().trim();
				const bankSell = table_td.eq(3).text().trim(); 
				result.push(Object.assign({country,bankBuy,bankSell}))
			}
			console.log(result);
			fs.writeFileSync("firstBank.json", JSON.stringify(result));

		}
	})
}
firstBank();