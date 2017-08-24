var superagent = require('superagent');
var fs=require('fs');
var file="./data/house.json";
var result=JSON.parse(fs.readFileSync(file));



var sk = '你的百度地图sk';

var addresses = result.simple;
var i = -1;
function change(){
	i++;
	superagent.get('http://api.map.baidu.com/geocoder/v2/')
	  .query({address: addresses[i].address})
	  .query({city: "贵阳市"})
	  .query({output: 'json'})
	  .query({ak: sk})
	  .end(function(err, sres) {
	  	var data = JSON.parse(sres.text);
	  	 if (data.status==0) {
	       addresses[i].location = data.result.location;
	     }else{
		   addresses[i].location = "";
		   console.log('none'+"名字为"+addresses[i].title);
		 }
		 console.log("这是第"+i+"次转化,转化地址为"+addresses[i].location);
		 if(i==addresses.length-1){
		 		var x = JSON.stringify(result);
				console.log("都转化完了");
				fs.appendFile('./data/newhouse.json', x, 'utf-8', function (err) {
		            if (err) {
		                console.log(err);
		            }
		        });
		 }else{
		 	change();
		 }
	  })  
}

change();