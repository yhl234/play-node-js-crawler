const TelegramBot = require('node-telegram-bot-api'); 
const token ='629183766:AAEly16j_pBBO2VHtzsnxkeGnLJ5ZScrDGo';
// const bot = new TelegramBot(token, {polling: true});

let bot;

if (env === 'production') {
  const webHook = { port: process.env.PORT || 443 };
  const url = process.env.APP_URL || 'Your App URL.';

  bot = new TelegramBot(token, { webHook });
  bot.setWebHook(`${url}/bot${token}`); // In here for setting webHook
} else {
  bot = new TelegramBot(token, { polling: true }); // On devlopment mode
}

const fs = require('fs');
let bank = '國泰世華';
let rawData = fs.readFileSync('cathayBank.json');  
let currency = JSON.parse(rawData);

// start
bot.onText(/\/start/, (msg) => {
	bot.sendMessage(msg.chat.id, "Welcome "+ msg.from.first_name, {
		"reply_markup": {
			"keyboard": [["國泰世華","第一銀行","台灣銀行"],["USD", "CAD","CNY","JPY"]]
			}
		});
});
bot.on('message', (msg) => {
	
	if (msg.text.toString().includes('國泰世華')){
		bank = '國泰世華';
		rawData = fs.readFileSync('cathayBank.json');  
		currency = JSON.parse(rawData);  
		bot.sendMessage(msg.chat.id, "資料庫變更為國泰世華");
	} else if(msg.text.toString().includes('第一銀行')){
		bank = '第一銀行';
		rawData = fs.readFileSync('firstBank.json');  
		currency = JSON.parse(rawData); 
		bot.sendMessage(msg.chat.id, "資料庫變更為第一銀行");
 
	} else if(msg.text.toString().includes('台灣銀行')){
		bank = '台灣銀行';
		rawData = fs.readFileSync('bankOfTaiwan.json');  
		currency = JSON.parse(rawData);  
		bot.sendMessage(msg.chat.id, "資料庫變更為台灣銀行");

	}
	if(bank){
		var USD = "usd";
		if (msg.text.toString().toLowerCase().includes(USD))
		{
			bot.sendMessage(msg.chat.id, bank + "今天美金匯率是\n銀行買進\n" + currency[0].bankBuy +'\n銀行賣出\n'+ currency[0].bankSell);
		}
		var CAD = "cad";
		if (msg.text.toString().toLowerCase().includes(CAD))
		{
			bot.sendMessage(msg.chat.id, bank + "今天加幣匯率是\n銀行買進\n" + currency[1].bankBuy +'\n銀行賣出\n'+ currency[0].bankSell);
		}
		var CNY = "cny";
		if (msg.text.toString().toLowerCase().includes(CNY))
		{
			bot.sendMessage(msg.chat.id, bank + "今天人民幣匯率是\n銀行買進\n" + currency[2].bankBuy +'\n銀行賣出\n'+ currency[0].bankSell);
		}
		var JPY = "jpy";
		if (msg.text.toString().toLowerCase().includes(JPY))
		{
			bot.sendMessage(msg.chat.id, bank + "今天日幣匯率是\n銀行買進\n" + currency[3].bankBuy +'\n銀行賣出\n'+ currency[0].bankSell);
		}
	}else{
		bot.sendMessage(msg.chat.id,"請先選擇銀行");
	}
	
});