tc = {

    db: Pouch('idb://reverse')

    , lookupReverse: function(key,request,callback){
    }

    , lookupReverseHome: function(key,request,callback){
    }

    , sendStat: function(key){
	$.get('http://thinkcontext.org/s/?' + key);
    }
};

// function map(doc) {
//   if(doc.title) {
//     emit(doc.title, null);
//   }
// }
// db.query({map: map}, {reduce: false}, function(err, response){console.log(response)})
// http://127.0.0.1:5984/reverse/_design/think/_view/by_revhost_date?endkey=%5B%22nytimes.com%22,0%5D&startkey=%5B%22nytimes.com%22,1350946844994%5D&descending=true&limit=4

//tc.db.query({map:function(doc){if(doc.reverse_host == 'nytimes.com')emit(doc.reverse_link,doc)}},{reduce:false},function(err,response){console.log(response)})

//tc.db.query({map:by_revhost_date},{reduce:false,limit:4,startkey: ['whitehouse.gov',0],endkey: ['whitehouse.gov',Date.now()]},function(err,response){console.log(response)})