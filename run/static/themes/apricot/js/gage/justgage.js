JustGage=function(B){var l=this;if(B===null||B===undefined){console.log("Make sure to pass options to the constructor.");return false}if(!B.id){console.log("Make sure to pass the id attribute to the constructor.");return false}var w=document.getElementById(B.id);var g=w.dataset?w.dataset:{};if(!w){console.log("No element with id : %s found",B.id);return false}l.config={id:B.id,parentNode:l.kvLookup("parentNode",B,g,null),width:l.kvLookup("width",B,g,null),height:l.kvLookup("height",B,g,null),title:l.kvLookup("title",B,g,""),titleFontColor:l.kvLookup("titleFontColor",B,g,"#999999"),value:l.kvLookup("value",B,g,0,"float"),valueFontColor:l.kvLookup("valueFontColor",B,g,"#010101"),symbol:l.kvLookup("symbol",B,g,""),min:l.kvLookup("min",B,g,0,"float"),max:l.kvLookup("max",B,g,100,"float"),humanFriendlyDecimal:l.kvLookup("humanFriendlyDecimal",B,g,0),textRenderer:l.kvLookup("textRenderer",B,g,null),gaugeWidthScale:l.kvLookup("gaugeWidthScale",B,g,1),gaugeColor:l.kvLookup("gaugeColor",B,g,"#edebeb"),label:l.kvLookup("label",B,g,""),labelFontColor:l.kvLookup("labelFontColor",B,g,"#b3b3b3"),shadowOpacity:l.kvLookup("shadowOpacity",B,g,0.2),shadowSize:l.kvLookup("shadowSize",B,g,5),shadowVerticalOffset:l.kvLookup("shadowVerticalOffset",B,g,3),levelColors:l.kvLookup("levelColors",B,g,["#a9d70b","#f9c802","#ff0000"],"array",","),startAnimationTime:l.kvLookup("startAnimationTime",B,g,700),startAnimationType:l.kvLookup("startAnimationType",B,g,">"),refreshAnimationTime:l.kvLookup("refreshAnimationTime",B,g,700),refreshAnimationType:l.kvLookup("refreshAnimationType",B,g,">"),donutStartAngle:l.kvLookup("donutStartAngle",B,g,90),valueMinFontSize:l.kvLookup("valueMinFontSize",B,g,16),titleMinFontSize:l.kvLookup("titleMinFontSize",B,g,10),labelMinFontSize:l.kvLookup("labelMinFontSize",B,g,10),minLabelMinFontSize:l.kvLookup("minLabelMinFontSize",B,g,10),maxLabelMinFontSize:l.kvLookup("maxLabelMinFontSize",B,g,10),hideValue:l.kvLookup("hideValue",B,g,false),hideMinMax:l.kvLookup("hideMinMax",B,g,false),hideInnerShadow:l.kvLookup("hideInnerShadow",B,g,false),humanFriendly:l.kvLookup("humanFriendly",B,g,false),noGradient:l.kvLookup("noGradient",B,g,false),donut:l.kvLookup("donut",B,g,false),relativeGaugeSize:l.kvLookup("relativeGaugeSize",B,g,false),counter:l.kvLookup("counter",B,g,false),decimals:l.kvLookup("decimals",B,g,0),customSectors:l.kvLookup("customSectors",B,g,[]),formatNumber:l.kvLookup("formatNumber",B,g,false)};var d,t,c,n,q,k,h,v,p,o,m,u,s,b,f,e,j,A,z,i,y,x;if(l.config.value>l.config.max){l.config.value=l.config.max}if(l.config.value<l.config.min){l.config.value=l.config.min}l.originalValue=l.kvLookup("value",B,g,-1,"int");if(l.config.id!==null&&(document.getElementById(l.config.id))!==null){l.canvas=Raphael(l.config.id,"100%","100%")}else{if(l.config.parentNode!==null){l.canvas=Raphael(l.config.parentNode,"100%","100%")}}if(l.config.relativeGaugeSize===true){l.canvas.setViewBox(0,0,200,150,true)}if(l.config.relativeGaugeSize===true){d=200;t=150}else{if(l.config.width!==null&&l.config.height!==null){d=l.config.width;t=l.config.height}else{if(l.config.parentNode!==null){l.canvas.setViewBox(0,0,200,150,true);d=200;t=150}else{d=getStyle(document.getElementById(l.config.id),"width").slice(0,-2)*1;t=getStyle(document.getElementById(l.config.id),"height").slice(0,-2)*1}}}if(l.config.donut===true){if(d>t){n=t;c=n}else{if(d<t){c=d;n=c;if(n>t){q=n/t;n=n/q;c=n/q}}else{c=d;n=c}}k=(d-c)/2;h=(t-n)/2;v=((n/8)>10)?(n/10):10;p=k+c/2;o=h+n/11;m=((n/6.4)>16)?(n/5.4):18;u=k+c/2;if(l.config.label!==""){s=h+n/1.85}else{s=h+n/1.7}b=((n/16)>10)?(n/16):10;f=k+c/2;e=s+b;j=((n/16)>10)?(n/16):10;A=k+(c/10)+(c/6.666666666666667*l.config.gaugeWidthScale)/2;z=e;i=((n/16)>10)?(n/16):10;y=k+c-(c/10)-(c/6.666666666666667*l.config.gaugeWidthScale)/2;x=e}else{if(d>t){n=t;c=n*1.25;if(c>d){q=c/d;c=c/q;n=n/q}}else{if(d<t){c=d;n=c/1.25;if(n>t){q=n/t;n=n/q;c=n/q}}else{c=d;n=c*0.75}}k=(d-c)/2;h=(t-n)/2;v=((n/8)>l.config.titleMinFontSize)?(n/10):l.config.titleMinFontSize;p=k+c/2;o=h+n/6.4;m=((n/6.5)>l.config.valueMinFontSize)?(n/6.5):l.config.valueMinFontSize;u=k+c/2;s=h+n/1.275;b=((n/16)>l.config.labelMinFontSize)?(n/16):l.config.labelMinFontSize;f=k+c/2;e=s+m/2+5;j=((n/16)>l.config.minLabelMinFontSize)?(n/16):l.config.minLabelMinFontSize;A=k+(c/10)+(c/6.666666666666667*l.config.gaugeWidthScale)/2;z=e;i=((n/16)>l.config.maxLabelMinFontSize)?(n/16):l.config.maxLabelMinFontSize;y=k+c-(c/10)-(c/6.666666666666667*l.config.gaugeWidthScale)/2;x=e}l.params={canvasW:d,canvasH:t,widgetW:c,widgetH:n,dx:k,dy:h,titleFontSize:v,titleX:p,titleY:o,valueFontSize:m,valueX:u,valueY:s,labelFontSize:b,labelX:f,labelY:e,minFontSize:j,minX:A,minY:z,maxFontSize:i,maxX:y,maxY:x};d,t,c,n,q,k,h,v,p,o,m,u,s,b,f,e,j,A,z,i,y,x=null;l.canvas.customAttributes.pki=function(P,Q,S,J,T,K,I,C,H){var F,L,O,G,E,M,U,R,D,N;if(H){F=(1-2*(P-Q)/(S-Q))*Math.PI;L=J/2-J/7;O=L-J/6.666666666666667*C;G=J/2+K;E=T/1.95+I;M=J/2+K+L*Math.cos(F);U=T-(T-E)-L*Math.sin(F);R=J/2+K+O*Math.cos(F);D=T-(T-E)-O*Math.sin(F);
    N="M"+(G-O)+","+E+" ";N+="L"+(G-L)+","+E+" ";if(P>((S-Q)/2)){N+="A"+L+","+L+" 0 0 1 "+(G+L)+","+E+" "}N+="A"+L+","+L+" 0 0 1 "+M+","+U+" ";N+="L"+R+","+D+" ";if(P>((S-Q)/2)){N+="A"+O+","+O+" 0 0 0 "+(G+O)+","+E+" "}N+="A"+O+","+O+" 0 0 0 "+(G-O)+","+E+" ";N+="Z ";return{path:N}}else{F=(1-(P-Q)/(S-Q))*Math.PI;L=J/2-J/10;O=L-J/6.666666666666667*C;G=J/2+K;E=T/1.25+I;M=J/2+K+L*Math.cos(F);U=T-(T-E)-L*Math.sin(F);R=J/2+K+O*Math.cos(F);D=T-(T-E)-O*Math.sin(F);N="M"+(G-O)+","+E+" ";N+="L"+(G-L)+","+E+" ";N+="A"+L+","+L+" 0 0 1 "+M+","+U+" ";N+="L"+R+","+D+" ";N+="A"+O+","+O+" 0 0 0 "+(G-O)+","+E+" ";N+="Z ";return{path:N}}F,L,O,G,E,M,U,R,D,N=null};l.gauge=l.canvas.path().attr({"stroke":"none","fill":l.config.gaugeColor,pki:[l.config.max,l.config.min,l.config.max,l.params.widgetW,l.params.widgetH,l.params.dx,l.params.dy,l.config.gaugeWidthScale,l.config.donut]});l.level=l.canvas.path().attr({"stroke":"none","fill":getColor(l.config.value,(l.config.value-l.config.min)/(l.config.max-l.config.min),l.config.levelColors,l.config.noGradient,l.config.customSectors),pki:[l.config.min,l.config.min,l.config.max,l.params.widgetW,l.params.widgetH,l.params.dx,l.params.dy,l.config.gaugeWidthScale,l.config.donut]});if(l.config.donut){l.level.transform("r"+l.config.donutStartAngle+", "+(l.params.widgetW/2+l.params.dx)+", "+(l.params.widgetH/1.95+l.params.dy))}l.txtTitle=l.canvas.text(l.params.titleX,l.params.titleY,l.config.title);l.txtTitle.attr({"font-size":l.params.titleFontSize,"font-weight":"normal","color":"#ffffff","text-transform":"uppercase","font-family":"Open Sans","fill":l.config.titleFontColor,"fill-opacity":"1"});setDy(l.txtTitle,l.params.titleFontSize,l.params.titleY);l.txtValue=l.canvas.text(l.params.valueX,l.params.valueY,0);l.txtValue.attr({"font-size":l.params.valueFontSize,"font-weight":"normal","color":"#ffffff","font-family":"Open Sans","fill":l.config.valueFontColor,"fill-opacity":"0"});setDy(l.txtValue,l.params.valueFontSize,l.params.valueY);l.txtLabel=l.canvas.text(l.params.labelX,l.params.labelY,l.config.label);l.txtLabel.attr({"font-size":l.params.labelFontSize,"font-weight":"normal","font-family":"Open Sans","text-transform":"uppercase","fill":l.config.labelFontColor,"fill-opacity":"0"});setDy(l.txtLabel,l.params.labelFontSize,l.params.labelY);l.txtMinimum=l.config.min;if(l.config.humanFriendly){l.txtMinimum=humanFriendlyNumber(l.config.min,l.config.humanFriendlyDecimal)}else{if(l.config.formatNumber){l.txtMinimum=formatNumber(l.config.min)}}l.txtMin=l.canvas.text(l.params.minX,l.params.minY,l.txtMinimum);l.txtMin.attr({"font-size":l.params.minFontSize,"font-weight":"normal","text-transform":"uppercase","font-family":"Open Sans","fill":l.config.labelFontColor,"fill-opacity":(l.config.hideMinMax||l.config.donut)?"0":"1"});setDy(l.txtMin,l.params.minFontSize,l.params.minY);l.txtMaximum=l.config.max;if(l.config.formatNumber){l.txtMaximum=formatNumber(l.txtMaximum)}else{if(l.config.humanFriendly){l.txtMaximum=humanFriendlyNumber(l.config.max,l.config.humanFriendlyDecimal)}}l.txtMax=l.canvas.text(l.params.maxX,l.params.maxY,l.txtMaximum);l.txtMax.attr({"font-size":l.params.maxFontSize,"font-weight":"normal","font-family":"Open Sans","fill":l.config.labelFontColor,"fill-opacity":(l.config.hideMinMax||l.config.donut)?"0":"1"});setDy(l.txtMax,l.params.maxFontSize,l.params.maxY);var a=l.canvas.canvas.childNodes[1];var r="http://www.w3.org/2000/svg";if(ie<9){onCreateElementNsReady(function(){l.generateShadow(r,a)})}else{l.generateShadow(r,a)}a,r=null;if(l.config.textRenderer){l.originalValue=l.config.textRenderer(l.originalValue)}else{if(l.config.humanFriendly){l.originalValue=humanFriendlyNumber(l.originalValue,l.config.humanFriendlyDecimal)+l.config.symbol}else{if(l.config.formatNumber){l.originalValue=formatNumber(l.originalValue)+l.config.symbol}else{l.originalValue=(l.originalValue*1).toFixed(l.config.decimals)+l.config.symbol}}}if(l.config.counter===true){eve.on("raphael.anim.frame."+(l.level.id),function(){var C=l.level.attr("pki");if(l.config.textRenderer){l.txtValue.attr("text",l.config.textRenderer(Math.floor(C[0])))}else{if(l.config.humanFriendly){l.txtValue.attr("text",humanFriendlyNumber(Math.floor(C[0]),l.config.humanFriendlyDecimal)+l.config.symbol)}else{if(l.config.formatNumber){l.txtValue.attr("text",formatNumber(Math.floor(C[0]))+l.config.symbol)}else{l.txtValue.attr("text",(C[0]*1).toFixed(l.config.decimals)+l.config.symbol)}}}setDy(l.txtValue,l.params.valueFontSize,l.params.valueY);C=null});eve.on("raphael.anim.finish."+(l.level.id),function(){l.txtValue.attr({"text":l.originalValue});setDy(l.txtValue,l.params.valueFontSize,l.params.valueY)})}else{eve.on("raphael.anim.start."+(l.level.id),function(){l.txtValue.attr({"text":l.originalValue});setDy(l.txtValue,l.params.valueFontSize,l.params.valueY)})}l.level.animate({pki:[l.config.value,l.config.min,l.config.max,l.params.widgetW,l.params.widgetH,l.params.dx,l.params.dy,l.config.gaugeWidthScale,l.config.donut]},l.config.startAnimationTime,l.config.startAnimationType);
    l.txtValue.animate({"fill-opacity":(l.config.hideValue)?"0":"1"},l.config.startAnimationTime,l.config.startAnimationType);l.txtLabel.animate({"fill-opacity":"1"},l.config.startAnimationTime,l.config.startAnimationType)};JustGage.prototype.kvLookup=function(e,b,h,d,f,c){var g=d;var a=false;if(!(e===null||e===undefined)){if(h!==null&&h!==undefined&&typeof h==="object"&&e in h){g=h[e];a=true}else{if(b!==null&&b!==undefined&&typeof b==="object"&&e in b){g=b[e];a=true}else{g=d}}if(a===true){if(f!==null&&f!==undefined){switch(f){case"int":g=parseInt(g,10);break;case"float":g=parseFloat(g);break;case"array":c=c?c:",";g=g.split(c);break;default:break}}}}return g};JustGage.prototype.refresh=function(e,a){var d=this;var c,b,a=a||null;if(a!==null){d.config.max=a;d.txtMaximum=d.config.max;if(d.config.humanFriendly){d.txtMaximum=humanFriendlyNumber(d.config.max,d.config.humanFriendlyDecimal)}else{if(d.config.formatNumber){d.txtMaximum=formatNumber(d.config.max)}}d.txtMax.attr({"text":d.txtMaximum});setDy(d.txtMax,d.params.maxFontSize,d.params.maxY)}c=e;if((e*1)>(d.config.max*1)){e=(d.config.max*1)}if((e*1)<(d.config.min*1)){e=(d.config.min*1)}b=getColor(e,(e-d.config.min)/(d.config.max-d.config.min),d.config.levelColors,d.config.noGradient,d.config.customSectors);if(d.config.textRenderer){c=d.config.textRenderer(c)}else{if(d.config.humanFriendly){c=humanFriendlyNumber(c,d.config.humanFriendlyDecimal)+d.config.symbol}else{if(d.config.formatNumber){c=formatNumber((c*1).toFixed(d.config.decimals))+d.config.symbol}else{c=(c*1).toFixed(d.config.decimals)+d.config.symbol}}}d.originalValue=c;d.config.value=e*1;if(!d.config.counter){d.txtValue.attr({"text":c});setDy(d.txtValue,d.params.valueFontSize,d.params.valueY)}d.level.animate({pki:[d.config.value,d.config.min,d.config.max,d.params.widgetW,d.params.widgetH,d.params.dx,d.params.dy,d.config.gaugeWidthScale,d.config.donut],"fill":b},d.config.refreshAnimationTime,d.config.refreshAnimationType);d,c,b,a=null};JustGage.prototype.generateShadow=function(g,e){var f=this;var i,j,h,d,c,b,a;i=document.createElementNS(g,"filter");i.setAttribute("id","inner-shadow");e.appendChild(i);j=document.createElementNS(g,"feOffset");j.setAttribute("dx",0);j.setAttribute("dy",f.config.shadowVerticalOffset);i.appendChild(j);h=document.createElementNS(g,"feGaussianBlur");h.setAttribute("result","offset-blur");h.setAttribute("stdDeviation",f.config.shadowSize);i.appendChild(h);d=document.createElementNS(g,"feComposite");d.setAttribute("operator","out");d.setAttribute("in","SourceGraphic");d.setAttribute("in2","offset-blur");d.setAttribute("result","inverse");i.appendChild(d);c=document.createElementNS(g,"feFlood");c.setAttribute("flood-color","black");c.setAttribute("flood-opacity",f.config.shadowOpacity);c.setAttribute("result","color");i.appendChild(c);b=document.createElementNS(g,"feComposite");b.setAttribute("operator","in");b.setAttribute("in","color");b.setAttribute("in2","inverse");b.setAttribute("result","shadow");i.appendChild(b);a=document.createElementNS(g,"feComposite");a.setAttribute("operator","over");a.setAttribute("in","shadow");a.setAttribute("in2","SourceGraphic");i.appendChild(a);if(!f.config.hideInnerShadow){f.canvas.canvas.childNodes[2].setAttribute("filter","url(#inner-shadow)");f.canvas.canvas.childNodes[3].setAttribute("filter","url(#inner-shadow)")}i,j,h,d,c,b,a=null};function getColor(w,c,d,a,s){var b,f,g,h,u,e,l,t,q,k,n,v,r,m;var a=a||s.length>0;if(s.length>0){for(var p=0;p<s.length;p++){if(w>s[p].lo&&w<=s[p].hi){return s[p].color}}}b=d.length;if(b===1){return d[0]}f=(a)?(1/b):(1/(b-1));g=[];for(p=0;p<d.length;p++){h=(a)?(f*(p+1)):(f*p);u=parseInt((cutHex(d[p])).substring(0,2),16);e=parseInt((cutHex(d[p])).substring(2,4),16);l=parseInt((cutHex(d[p])).substring(4,6),16);g[p]={pct:h,color:{r:u,g:e,b:l}}}if(c===0){return"rgb("+[g[0].color.r,g[0].color.g,g[0].color.b].join(",")+")"}for(var o=0;o<g.length;o++){if(c<=g[o].pct){if(a){return"rgb("+[g[o].color.r,g[o].color.g,g[o].color.b].join(",")+")"}else{t=g[o-1];q=g[o];k=q.pct-t.pct;n=(c-t.pct)/k;v=1-n;r=n;m={r:Math.floor(t.color.r*v+q.color.r*r),g:Math.floor(t.color.g*v+q.color.g*r),b:Math.floor(t.color.b*v+q.color.b*r)};return"rgb("+[m.r,m.g,m.b].join(",")+")"}}}}function setDy(b,c,a){if(!ie||ie>9){b.node.firstChild.attributes.dy.value=0}}function getRandomInt(b,a){return Math.floor(Math.random()*(a-b+1))+b}function cutHex(a){return(a.charAt(0)=="#")?a.substring(1,7):a}function humanFriendlyNumber(g,f){var e,c,a,b;e=Math.pow;c=e(10,f);a=7;while(a){b=e(10,a--*3);if(b<=g){g=Math.round(g*c/b)/c+"KMGTPE"[a]}}return g}function formatNumber(a){var b=a.toString().split(".");b[0]=b[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return b.join(".")}function getStyle(a,b){var c="";if(document.defaultView&&document.defaultView.getComputedStyle){c=document.defaultView.getComputedStyle(a,"").getPropertyValue(b)}else{if(a.currentStyle){b=b.replace(/\-(\w)/g,function(d,e){return e.toUpperCase()});c=a.currentStyle[b]}}return c}function onCreateElementNsReady(a){if(document.createElementNS!==undefined){a()
}else{setTimeout(function(){onCreateElementNsReady(a)},100)}}var ie=(function(){var c,a=3,d=document.createElement("div"),b=d.getElementsByTagName("i");while(d.innerHTML="<!--[if gt IE "+(++a)+"]><i></i><![endif]-->",b[0]){}return a>4?a:c}());