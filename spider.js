var request = require('request');
var iconv = require('iconv-lite');
var cheerio = require('cheerio');
var fs = require('fs');
var i = 0;
var house = {
	simple:[],
	tuhao:[]
}
function check(){
	i++;
	console.log('开始爬http://newhouse.gy.fang.com/house/s/b170-b9'+i);
	request.get({
			url:'http://newhouse.gy.fang.com/house/s/b170-b9'+i,
			gzip:true,
			encoding : null
		}, function (err,res,body) {
			var buf =  iconv.decode(body, 'gb2312');
			var $ = cheerio.load(buf);
			if($('.sslalone').length==0){
				$('.nl_con ul li').each(function(index,key){
					try{
						var obj = {
							title:$(key).find('.nlcd_name a').text().trim(),
							price:$(key).find('.nhouse_price span').text().trim(),
							address:$(key).find('.address a').attr('title').trim()
						}
						if(obj.price<1000){
							house.tuhao.push(obj)
						}else{
							house.simple.push(obj)
						}
					}catch(error){
						console.log('空');
					}
				})
			}else{
				$('.nl_con ul li').each(function(index,key){
					try{
						var obj = {
							title:$(key).find('.fl h4 a').text().trim(),
							price:$(key).find('.fr h5 span').text().trim(),
							address:$(key).find('.fl>a').text().trim()
						}
						if(obj.price<1000){
							house.tuhao.push(obj)
						}else{
							house.simple.push(obj)
						}
					}catch(error){
						console.log('空');
					}
				})
			}
			console.log('第'+i+'页爬完')
			if(i<100){
				check();
			}else{
				var x = JSON.stringify(house);
				x = x.replace(/\n/g, "");
				console.log("都爬完了");

				fs.appendFile('./data/house.json', x, 'utf-8', function (err) {
		            if (err) {
		                console.log(err);
		            }
		        });
			}
		}
	);
}
check();


