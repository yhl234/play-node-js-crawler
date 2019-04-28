const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const cathayBank = function(){
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
			const dataTime = $("#layout_0_rightcontent_1_firsttab01_0_tab_rate_realtime p").text();
			var array = [0,10,2,13]
			for(var i=0; i<array.length;i++){
				const table_td = table_tr.eq(array[i]).find('td');
				const country = table_td.eq(0).text().trim();
				const bankBuy = table_td.eq(1).text(); 
				const bankSell = table_td.eq(2).text(); 
				result.push(Object.assign({country,bankBuy,bankSell}))
			}
			console.log(dataTime);
			console.log(result);
			fs.writeFileSync("cathayBank.json", JSON.stringify(result));

		}
	})
}
cathayBank();
setInterval(cathayBank, 60 * 60 * 1000);