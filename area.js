var superagent = require('superagent');
var fs=require('fs');
var file="./data/housepro.json";
var result=JSON.parse(fs.readFileSync(file));



var sk = 'VF9LNVjmCBi1gZU5rdkUTtGfDMS6GWLg';

var addresses = result.simple;
var i = -1;
function change(){
	i++;
	superagent.get('http://api.map.baidu.com/geocoder/v2/')
	  .query({location: addresses[i].location.lat+","+addresses[i].location.lng})
	  .query({output: 'json'})
	  .query({pois: 1})
	  .query({ak: sk})
	  .end(function(err, sres) {
	  	var data = JSON.parse(sres.text);
	  	 if (data.status==0) {
	       addresses[i].addressComponent = data.result.addressComponent;
	     }
		 console.log("这是第"+i+"次转化");
		 if(i==addresses.length-1){
		 		var x = JSON.stringify(result);
				console.log("都转化完了");
				fs.appendFile('./data/newhousepro.json', x, 'utf-8', function (err) {
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