(function(){var H,x,d,A,y,J,e,W,m,P,U,S,G,V,X,b,L,D,z,O,g,o,q,M,t,s,Q,K,w,l,p,E,a,h,r,F,C,v,N,T,R,u,n,k,I,j,c,B=[].slice,Y={}.hasOwnProperty,f=function(ac,aa){for(var Z in aa){if(Y.call(aa,Z)){ac[Z]=aa[Z]}}function ab(){this.constructor=ac}ab.prototype=aa.prototype;ac.prototype=new ab();ac.__super__=aa.prototype;return ac},i=[].indexOf||function(ab){for(var aa=0,Z=this.length;aa<Z;aa++){if(aa in this&&this[aa]===ab){return aa}}return -1};O={catchupTime:500,initialRate:0.03,minTime:500,ghostTime:500,maxProgressPerFrame:10,easeFactor:1.25,startOnPageLoad:true,restartOnPushState:true,restartOnRequestAfter:500,target:"body",elements:{checkInterval:100,selectors:["body"]},eventLag:{minSamples:10,sampleCount:3,lagThreshold:3},ajax:{trackMethods:["GET"],trackWebSockets:false}};K=function(){var Z;return(Z=typeof performance!=="undefined"&&performance!==null?typeof performance.now==="function"?performance.now():void 0:void 0)!=null?Z:+(new Date)};l=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;z=window.cancelAnimationFrame||window.mozCancelAnimationFrame;if(l==null){l=function(Z){return setTimeout(Z,50)};z=function(Z){return clearTimeout(Z)}}E=function(aa){var ab,Z;ab=K();Z=function(){var ac;ac=K()-ab;if(ac>=33){ab=K();return aa(ac,function(){return l(Z)})}else{return setTimeout(Z,33-ac)}};return Z()};p=function(){var Z,aa,ab;ab=arguments[0],aa=arguments[1],Z=3<=arguments.length?B.call(arguments,2):[];if(typeof ab[aa]==="function"){return ab[aa].apply(ab,Z)}else{return ab[aa]}};g=function(){var ac,ab,ae,aa,af,ad,Z;ab=arguments[0],aa=2<=arguments.length?B.call(arguments,1):[];for(ad=0,Z=aa.length;ad<Z;ad++){ae=aa[ad];if(ae){for(ac in ae){if(!Y.call(ae,ac)){continue}af=ae[ac];if((ab[ac]!=null)&&typeof ab[ac]==="object"&&(af!=null)&&typeof af==="object"){g(ab[ac],af)}else{ab[ac]=af}}}}return ab};b=function(Z){var ad,ac,ab,ae,aa;ac=ad=0;for(ae=0,aa=Z.length;ae<aa;ae++){ab=Z[ae];ac+=Math.abs(ab);ad++}return ac/ad};q=function(aa,Z){var ac,ad,ab;if(aa==null){aa="options"}if(Z==null){Z=true}ab=document.querySelector("[data-pace-"+aa+"]");if(!ab){return}ac=ab.getAttribute("data-pace-"+aa);if(!Z){return ac}try{return JSON.parse(ac)}catch(ae){ad=ae;return typeof console!=="undefined"&&console!==null?console.error("Error parsing inline pace options",ad):void 0}};e=(function(){function Z(){}Z.prototype.on=function(ae,ad,aa,ac){var ab;if(ac==null){ac=false}if(this.bindings==null){this.bindings={}}if((ab=this.bindings)[ae]==null){ab[ae]=[]}return this.bindings[ae].push({handler:ad,ctx:aa,once:ac})};Z.prototype.once=function(ac,ab,aa){return this.on(ac,ab,aa,true)};Z.prototype.off=function(ad,ac){var ab,ae,aa;if(((ae=this.bindings)!=null?ae[ad]:void 0)==null){return}if(ac==null){return delete this.bindings[ad]}else{ab=0;aa=[];while(ab<this.bindings[ad].length){if(this.bindings[ad][ab].handler===ac){aa.push(this.bindings[ad].splice(ab,1))}else{aa.push(ab++)}}return aa}};Z.prototype.trigger=function(){var ag,ai,aa,ah,af,ab,ae,ad,ac;aa=arguments[0],ag=2<=arguments.length?B.call(arguments,1):[];if((ae=this.bindings)!=null?ae[aa]:void 0){af=0;ac=[];while(af<this.bindings[aa].length){ad=this.bindings[aa][af],ah=ad.handler,ai=ad.ctx,ab=ad.once;ah.apply(ai!=null?ai:this,ag);if(ab){ac.push(this.bindings[aa].splice(af,1))}else{ac.push(af++)}}return ac}};return Z})();if(window.Pace==null){window.Pace={}}g(Pace,e.prototype);w=Pace.options=g({},O,window.paceOptions,q());I=["ajax","document","eventLag","elements"];for(R=0,n=I.length;R<n;R++){r=I[R];if(w[r]===true){w[r]=O[r]}}m=(function(Z){f(aa,Z);function aa(){j=aa.__super__.constructor.apply(this,arguments);return j}return aa})(Error);x=(function(){function Z(){this.progress=0}Z.prototype.getElement=function(){var aa;if(this.el==null){aa=document.querySelector(w.target);if(!aa){throw new m}this.el=document.createElement("div");this.el.className="pace pace-active";document.body.className=document.body.className.replace("pace-done","");document.body.className+=" pace-running";this.el.innerHTML='<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>';if(aa.firstChild!=null){aa.insertBefore(this.el,aa.firstChild)}else{aa.appendChild(this.el)}}return this.el};Z.prototype.finish=function(){var aa;aa=this.getElement();aa.className=aa.className.replace("pace-active","");aa.className+=" pace-inactive";document.body.className=document.body.className.replace("pace-running","");return document.body.className+=" pace-done"};Z.prototype.update=function(aa){this.progress=aa;return this.render()};Z.prototype.destroy=function(){try{this.getElement().parentNode.removeChild(this.getElement())}catch(aa){m=aa}return this.el=void 0};Z.prototype.render=function(){var ab,aa;if(document.querySelector(w.target)==null){return false}ab=this.getElement();ab.children[0].style.width=""+this.progress+"%";if(!this.lastRenderedProgress||this.lastRenderedProgress|0!==this.progress|0){ab.children[0].setAttribute("data-progress-text",""+(this.progress|0)+"%");
    if(this.progress>=100){aa="99"}else{aa=this.progress<10?"0":"";aa+=this.progress|0}ab.children[0].setAttribute("data-progress",""+aa)}return this.lastRenderedProgress=this.progress};Z.prototype.done=function(){return this.progress>=100};return Z})();W=(function(){function Z(){this.bindings={}}Z.prototype.trigger=function(ac,af){var ae,ad,ab,ag,aa;if(this.bindings[ac]!=null){ag=this.bindings[ac];aa=[];for(ad=0,ab=ag.length;ad<ab;ad++){ae=ag[ad];aa.push(ae.call(this,af))}return aa}};Z.prototype.on=function(aa,ac){var ab;if((ab=this.bindings)[aa]==null){ab[aa]=[]}return this.bindings[aa].push(ac)};return Z})();T=window.XMLHttpRequest;N=window.XDomainRequest;v=window.WebSocket;o=function(af,ae){var ab,aa,ad,Z;Z=[];for(aa in ae.prototype){try{ad=ae.prototype[aa];if((af[aa]==null)&&typeof ad!=="function"){Z.push(af[aa]=ad)}else{Z.push(void 0)}}catch(ac){ab=ac}}return Z};s=[];Pace.ignore=function(){var aa,ab,Z;ab=arguments[0],aa=2<=arguments.length?B.call(arguments,1):[];s.unshift("ignore");Z=ab.apply(null,aa);s.shift();return Z};Pace.track=function(){var aa,ab,Z;ab=arguments[0],aa=2<=arguments.length?B.call(arguments,1):[];s.unshift("track");Z=ab.apply(null,aa);s.shift();return Z};h=function(aa){var Z;if(aa==null){aa="GET"}if(s[0]==="track"){return"force"}if(!s.length&&w.ajax){if(aa==="socket"&&w.ajax.trackWebSockets){return true}else{if(Z=aa.toUpperCase(),i.call(w.ajax.trackMethods,Z)>=0){return true}}}return false};P=(function(Z){f(aa,Z);function aa(){var ab,ac=this;aa.__super__.constructor.apply(this,arguments);ab=function(ae){var ad;ad=ae.open;return ae.open=function(ah,af,ag){if(h(ah)){ac.trigger("request",{type:ah,url:af,request:ae})}return ad.apply(ae,arguments)}};window.XMLHttpRequest=function(ad){var ae;ae=new T(ad);ab(ae);return ae};o(window.XMLHttpRequest,T);if(N!=null){window.XDomainRequest=function(){var ad;ad=new N;ab(ad);return ad};o(window.XDomainRequest,N)}if((v!=null)&&w.ajax.trackWebSockets){window.WebSocket=function(ad,af){var ae;ae=new v(ad,af);if(h("socket")){ac.trigger("request",{type:"socket",url:ad,protocols:af,request:ae})}return ae};o(window.WebSocket,v)}}return aa})(W);u=null;M=function(){if(u==null){u=new P}return u};M().on("request",function(Z){var ad,aa,ac,ab;ab=Z.type,ac=Z.request;if(!Pace.running&&(w.restartOnRequestAfter!==false||h(ab)==="force")){aa=arguments;ad=w.restartOnRequestAfter||0;if(typeof ad==="boolean"){ad=0}return setTimeout(function(){var ag,ah,af,aj,ai,ae;if(ab==="socket"){ag=ac.readyState<2}else{ag=(0<(aj=ac.readyState)&&aj<4)}if(ag){Pace.restart();ai=Pace.sources;ae=[];for(ah=0,af=ai.length;ah<af;ah++){r=ai[ah];if(r instanceof H){r.watch.apply(r,aa);break}else{ae.push(void 0)}}return ae}},ad)}});H=(function(){function Z(){var aa=this;this.elements=[];M().on("request",function(){return aa.watch.apply(aa,arguments)})}Z.prototype.watch=function(aa){var ad,ac,ab;ab=aa.type,ad=aa.request;if(ab==="socket"){ac=new G(ad)}else{ac=new V(ad)}return this.elements.push(ac)};return Z})();V=(function(){function Z(af){var ae,ab,ad,aa,ac,ah,ag=this;this.progress=0;if(window.ProgressEvent!=null){ab=null;af.addEventListener("progress",function(ai){if(ai.lengthComputable){return ag.progress=100*ai.loaded/ai.total}else{return ag.progress=ag.progress+(100-ag.progress)/2}});ah=["load","abort","timeout","error"];for(ad=0,aa=ah.length;ad<aa;ad++){ae=ah[ad];af.addEventListener(ae,function(){return ag.progress=100})}}else{ac=af.onreadystatechange;af.onreadystatechange=function(){var ai;if((ai=af.readyState)===0||ai===4){ag.progress=100}else{if(af.readyState===3){ag.progress=50}}return typeof ac==="function"?ac.apply(null,arguments):void 0}}}return Z})();G=(function(){function Z(ad){var ac,ab,aa,af,ae=this;this.progress=0;af=["error","open"];for(ab=0,aa=af.length;ab<aa;ab++){ac=af[ab];ad.addEventListener(ac,function(){return ae.progress=100})}}return Z})();A=(function(){function Z(ac){var aa,ad,ab,ae;if(ac==null){ac={}}this.elements=[];if(ac.selectors==null){ac.selectors=[]}ae=ac.selectors;for(ad=0,ab=ae.length;ad<ab;ad++){aa=ae[ad];this.elements.push(new y(aa))}}return Z})();y=(function(){function Z(aa){this.selector=aa;this.progress=0;this.check()}Z.prototype.check=function(){var aa=this;if(document.querySelector(this.selector)){return this.done()}else{return setTimeout((function(){return aa.check()}),w.elements.checkInterval)}};Z.prototype.done=function(){return this.progress=100};return Z})();d=(function(){Z.prototype.states={loading:0,interactive:50,complete:100};function Z(){var aa,ac,ab=this;this.progress=(ac=this.states[document.readyState])!=null?ac:100;aa=document.onreadystatechange;document.onreadystatechange=function(){if(ab.states[document.readyState]!=null){ab.progress=ab.states[document.readyState]}return typeof aa==="function"?aa.apply(null,arguments):void 0}}return Z})();J=(function(){function Z(){var ae,aa,ad,ac,ab,af=this;this.progress=0;ae=0;ab=[];ac=0;ad=K();aa=setInterval(function(){var ag;ag=K()-ad-50;ad=K();ab.push(ag);if(ab.length>w.eventLag.sampleCount){ab.shift()}ae=b(ab);
    if(++ac>=w.eventLag.minSamples&&ae<w.eventLag.lagThreshold){af.progress=100;return clearInterval(aa)}else{return af.progress=100*(3/(ae+3))}},50)}return Z})();S=(function(){function Z(aa){this.source=aa;this.last=this.sinceLastUpdate=0;this.rate=w.initialRate;this.catchup=0;this.progress=this.lastProgress=0;if(this.source!=null){this.progress=p(this.source,"progress")}}Z.prototype.tick=function(ab,ac){var aa;if(ac==null){ac=p(this.source,"progress")}if(ac>=100){this.done=true}if(ac===this.last){this.sinceLastUpdate+=ab}else{if(this.sinceLastUpdate){this.rate=(ac-this.last)/this.sinceLastUpdate}this.catchup=(ac-this.progress)/w.catchupTime;this.sinceLastUpdate=0;this.last=ac}if(ac>this.progress){this.progress+=this.catchup*ab}aa=1-Math.pow(this.progress/100,w.easeFactor);this.progress+=aa*this.rate*ab;this.progress=Math.min(this.lastProgress+w.maxProgressPerFrame,this.progress);this.progress=Math.max(0,this.progress);this.progress=Math.min(100,this.progress);this.lastProgress=this.progress;return this.progress};return Z})();F=null;a=null;L=null;C=null;X=null;D=null;Pace.running=false;t=function(){if(w.restartOnPushState){return Pace.restart()}};if(window.history.pushState!=null){k=window.history.pushState;window.history.pushState=function(){t();return k.apply(window.history,arguments)}}if(window.history.replaceState!=null){c=window.history.replaceState;window.history.replaceState=function(){t();return c.apply(window.history,arguments)}}U={ajax:H,elements:A,document:d,eventLag:J};(Q=function(){var ac,ad,ab,aa,Z,ag,af,ae;Pace.sources=F=[];ag=["ajax","elements","document","eventLag"];for(ad=0,aa=ag.length;ad<aa;ad++){ac=ag[ad];if(w[ac]!==false){F.push(new U[ac](w[ac]))}}ae=(af=w.extraSources)!=null?af:[];for(ab=0,Z=ae.length;ab<Z;ab++){r=ae[ab];F.push(new r(w))}Pace.bar=L=new x;a=[];return C=new S})();Pace.stop=function(){Pace.trigger("stop");Pace.running=false;L.destroy();D=true;if(X!=null){if(typeof z==="function"){z(X)}X=null}return Q()};Pace.restart=function(){Pace.trigger("restart");Pace.stop();return Pace.start()};Pace.go=function(){Pace.running=true;L.render();D=false;return X=E(function(aj,aa){var an,ag,am,ac,ak,ap,ao,al,ah,ai,af,ae,ab,Z,ar,aq,ad;al=100-L.progress;ag=ae=0;am=true;for(ap=ab=0,ar=F.length;ab<ar;ap=++ab){r=F[ap];ai=a[ap]!=null?a[ap]:a[ap]=[];ak=(ad=r.elements)!=null?ad:[r];for(ao=Z=0,aq=ak.length;Z<aq;ao=++Z){ac=ak[ao];ah=ai[ao]!=null?ai[ao]:ai[ao]=new S(ac);am&=ah.done;if(ah.done){continue}ag++;ae+=ah.tick(aj)}}an=ae/ag;L.update(C.tick(aj,an));af=K();if(L.done()||am||D){L.update(100);Pace.trigger("done");return setTimeout(function(){L.finish();Pace.running=false;return Pace.trigger("hide")},Math.max(w.ghostTime,Math.min(w.minTime,K()-af)))}else{return aa()}})};Pace.start=function(Z){g(w,Z);Pace.running=true;try{L.render()}catch(aa){m=aa}if(!document.querySelector(".pace")){return setTimeout(Pace.start,50)}else{Pace.trigger("start");return Pace.go()}};if(typeof define==="function"&&define.amd){define(function(){return Pace})}else{if(typeof exports==="object"){module.exports=Pace}else{if(w.startOnPageLoad){Pace.start()}}}}).call(this);