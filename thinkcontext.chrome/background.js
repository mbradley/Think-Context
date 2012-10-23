function onRequest(request, sender, callback) {
    var key = request.key;
    var data;
    //console.log(request);
    switch(request.kind){
    case 'link': 
	tc.lookupResult(key, request, callback);
	break;
    case 'place':
        tc.lookupPlace(key,request,callback);
	break;
    case 'places':
        tc.lookupPlaces(request,callback);
	break;
    case 'yahoo-text':
    case 'gs-text':
    case 'bing-text':
	tc.lookupSubvert(request.key, request, callback);
	break;
    case 'reverse':
        tc.lookupReverse(request.key,request,callback);
        break;
    case 'reversehome':
        tc.lookupReverseHome(request.key,request,callback);
        break;
    case 'sendstat':
        tc.sendStat(request.key);
        break;
    }
};

//console.log("background.html");

//tc.db.replicate.from('http://127.0.0.1/reverse',function(err,response){console.log(response)})