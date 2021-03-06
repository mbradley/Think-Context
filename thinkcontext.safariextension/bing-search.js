if (window.top === window) {
    if(document.baseURI.search("http://www.bing.com/search.*") >= 0){
	tc.debug("bing-search");


	sub = {

	    insertSubvertisements: function(message){
		//     var result= '';
		//     var tcstat = 'bss';
		//     if(message.data && message.data.length > 0){
		// 	var subvs = message.data;
		// 	var sel = [];
		// 	var x = 0;
		// 	if(subvs.length > 3){
		// 	    for(x=0;x<=2;x++){
		// 		var i = tc.random()% subvs.length ;
		// 		sel.push(subvs[i]);
		// 		subvs.splice(i,1);
		// 	    }
		// 	} else {
		// 	    sel = subvs;
		// 	}
		// 	result = sel.map(function(subv){ 
		// 	    var d = JSON.parse(subv.data);
		// 	    var link = subv.url;
		// 	    var name = d.name;
		// 	    var ds = d.desc.split(' ')
		// 	    var blurb = ds.slice(0,14).join(' ');
		// 	    if(ds.length > 14)
		// 		blurb += '...';
		// 	    var id = subv.id;
		// 	    var host = link.split('/')[0];
		// 	    return $("<li>", {class: "knavi"})
		// 		.append($("<h3>")
		// 			.append($("<a>", {tcstat: tcstat + id
		// 					, target: "_blank"
		// 					, href: "http://" + link
		// 					, text : name}).text(blurb))
		// 			.append($("<br>"))
		// 			.append($("<div>"))
		// 			.append($("<cite>").text(host))
		// 		       );
		// //	    return '<li class="knavi"><h3><a tcstat="' + tcstat + id + '" target="_blank" href="http://' + link + '">'+ name + '</a></h3>' + blurb + '<br><div><cite>'+ host + '</cite></div></li>'; }).join(' ');
		// 	}
		//     $("div#sidebar").map(function(){
		// 	if(result != ''){
		// 	    var subvDiv = document.createElement("div");
		// 	    subvDiv.setAttribute("subv",true);
		// 	    subvDiv.innerHTML = result;
		// 	    if(this.firstChild.getAttribute("subv") == null){
		// 		this.insertBefore(subvDiv,this.firstChild);
		// 	    } else {
		// 		this.replaceChild(subvDiv,this.firstChild);
		// 	    }
		// 	}});
		//     $("div#sidebar a[tcstat]").click(function(){
		// 	tc.sendMessage({'kind': 'sendstat'
		// 	 			      , 'key': this.attributes['tcstat'].value});
		//     });
	    }

	};

	tc.registerResponse('bing-text'
			    ,function(request){
				sub.insertSubvertisements(request);
			    });
	tc.registerResponse('link',
			    function(request){
				$("[sid=" + request.sid +"]").map(function(){
				    tc.sub[request.data.func](this,request.key,request.data);});
			    });

	tc.registerResponse('place'
			    , function(request){
				$("[sid=" + request.sid +"]").map(function(){
				    sub[request.data.func](this,request.key,request.data);});
			    });

	// query text
	var qt =  $("input[name=q]").val();
	//location
	var loc = $('ul.sw_tn > li:nth-child(3) > a').text()
	tc.sendMessage(
	    {'kind' : "bing-text"
	     , 'key' : qt
	     , 'location' : loc
	    });

	// result link
	$('div#results  li  div  div  h3  a').map(
	    function(){
		var sid = "gs" + tc.random();
		this.setAttribute("sid",sid);
		tc.sendMessage({'kind': 'link'
     				, 'sid': sid
     				, 'key': tc.sigURL(this.href).replace(/https?:\/\//,'').replace(/\/$/,'') });

	    }
	);

	// lid short link
	$("li.hip_htlnm a[href*='lid=']").map(
    	    function(){
    		if(!this.previousSibling || !this.previousSibling.getAttribute || !this.previousSibling.getAttribute('subv')){
		    var lid_regex = new RegExp('lid=([a-zA-Z0-9]+)');
    		    lid_res = lid_regex.exec(this.href);
		    if(lid_res[1]){
			var lid = lid_res[1];
			var sid = "gs" + tc.random();
			this.setAttribute("sid",sid);
			tc.sendMessage({'kind': 'place'
					,'type': 'bing'
					, 'sid': sid
					, 'key': lid  });
		    }
		}
	    }
	);

	// lid long link
	$("div h2 div a[href*='lid=']").map(
    	    function(){
		tc.debug("lid long link");
    		if(!this.previousSibling || !this.previousSibling.getAttribute || !this.previousSibling.getAttribute('subv')){
		    var lid_regex = new RegExp('lid=([a-zA-Z0-9]+)');
    		    lid_res = lid_regex.exec(this.href);
		    tc.debug(lid_res);
		    if(lid_res[1]){
			var lid = lid_res[1];
			var sid = "gs" + tc.random();
			this.setAttribute("sid",sid);
			tc.sendMessage({'kind': 'place'
					,'type': 'bing'
					, 'sid': sid
					, 'key': lid  });
		    }
		}
	    }
	);
	tc.registerResponse('reversehome', tc.reverseResponse);
	tc.reverseExamine();
	safari.self.addEventListener("message",tc.onResponse, false);
    }
}