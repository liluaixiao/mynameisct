var http = require('http');
var ak = 'VF9LNVjmCBi1gZU5rdkUTtGfDMS6GWLg';
var address = '北京市海淀区上地十街10号';
var url = require('url').parse('http://api.map.baidu.com/geocoder/v2/?address='+address+'&output=json&ak='+ak+'&callback=showLocation');
function hu(){
    http.get(url,function(res){
    	var result = '';
    	console.log(res);
        res.on('data',function(chunck){
        	console.log(chunck);
        	result+=chunck;
        });
        res.on('end',function(){
        	//console.log(result);
        })
    })
}

hu();