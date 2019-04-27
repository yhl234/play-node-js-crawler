const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const bankOfTaiwan = function(){
	request({
		url: "https://rate.bot.com.tw/xrt?Lang=zh-TW",
		method: "GET"
	}, function(error, response, body){
		if(error || !body){
			return;
		}else{
			const $ = cheerio.load(body);
			const result = [];
			const table_tr = $("main table tbody tr");
			var array = [0,4,18,7]
			for(var i=0; i<array.length;i++){
				const table_td = table_tr.eq(array[i]).find('td');
				const country = table_td.eq(0).find( "div[style]") .text().trim();
				const bankBuy = table_td.eq(3).text(); 
				const bankSell = table_td.eq(4).text(); 
				result.push(Object.assign({country,bankBuy,bankSell}))
			}
			console.log(result);
			fs.writeFileSync("bankOfTaiwan.json", JSON.stringify(result));

		}
	})
}
bankOfTaiwan();