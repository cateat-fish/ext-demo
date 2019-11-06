/*
 Highcharts JS v7.2.1 (2019-10-31)

 Old IE (v6, v7, v8) module for Highcharts v6+.

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(e){"object"===typeof module&&module.exports?(e["default"]=e,module.exports=e):"function"===typeof define&&define.amd?define("highcharts/modules/oldie",["highcharts"],function(l){e(l);e.Highcharts=l;return e}):e("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(e){function l(f,e,l,y){f.hasOwnProperty(e)||(f[e]=y.apply(null,l))}e=e?e._modules:{};l(e,"modules/oldie.src.js",[e["parts/Globals.js"],e["parts/Utilities.js"]],function(f,e){var l=e.defined,y=e.discardElement,K=e.erase,
    r=e.extend,N=e.isArray,L=e.isNumber,E=e.isObject,z=e.pick,p=e.pInt;var m=f.Chart;var F=f.createElement,A=f.css,t=f.deg2rad,g=f.doc;var B=f.extendClass;e=f.merge;var M=f.noop,G=f.svg,v=f.SVGElement,u=f.SVGRenderer,q=f.win;f.getOptions().global.VMLRadialGradientURL="http://code.highcharts.com/7.2.1/gfx/vml-radial-gradient.png";g&&!g.defaultView&&(f.getStyle=function(a,b){var c={width:"clientWidth",height:"clientHeight"}[b];if(a.style[b])return p(a.style[b]);"opacity"===b&&(b="filter");if(c)return a.style.zoom=
    1,Math.max(a[c]-2*f.getStyle(a,"padding"),0);a=a.currentStyle[b.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()})];"filter"===b&&(a=a.replace(/alpha\(opacity=([0-9]+)\)/,function(a,b){return b/100}));return""===a?1:p(a)});G||(f.addEvent(v,"afterInit",function(){"text"===this.element.nodeName&&this.css({position:"absolute"})}),f.Pointer.prototype.normalize=function(a,b){a=a||q.event;a.target||(a.target=a.srcElement);b||(this.chartPosition=b=f.offset(this.chart.container));return r(a,{chartX:Math.round(Math.max(a.x,
    a.clientX-b.left)),chartY:Math.round(a.y)})},m.prototype.ieSanitizeSVG=function(a){return a=a.replace(/<IMG /g,"<image ").replace(/<(\/?)TITLE>/g,"<$1title>").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/ id=([^" >]+)/g,' id="$1"').replace(/class=([^" >]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(a){return a.toLowerCase()})},m.prototype.isReadyToRender=
    function(){var a=this;return G||q!=q.top||"complete"===g.readyState?!0:(g.attachEvent("onreadystatechange",function(){g.detachEvent("onreadystatechange",a.firstRender);"complete"===g.readyState&&a.firstRender()}),!1)},g.createElementNS||(g.createElementNS=function(a,b){return g.createElement(b)}),f.addEventListenerPolyfill=function(a,b){function c(a){a.target=a.srcElement||q;b.call(d,a)}var d=this;d.attachEvent&&(d.hcEventsIE||(d.hcEventsIE={}),b.hcKey||(b.hcKey=f.uniqueKey()),d.hcEventsIE[b.hcKey]=
    c,d.attachEvent("on"+a,c))},f.removeEventListenerPolyfill=function(a,b){this.detachEvent&&(b=this.hcEventsIE[b.hcKey],this.detachEvent("on"+a,b))},m={docMode8:g&&8===g.documentMode,init:function(a,b){var c=["<",b,' filled="f" stroked="f"'],d=["position: ","absolute",";"],h="div"===b;("shape"===b||h)&&d.push("left:0;top:0;width:1px;height:1px;");d.push("visibility: ",h?"hidden":"visible");c.push(' style="',d.join(""),'"/>');b&&(c=h||"span"===b||"img"===b?c.join(""):a.prepVML(c),this.element=F(c));
    this.renderer=a},add:function(a){var b=this.renderer,c=this.element,d=b.box,h=a&&a.inverted;d=a?a.element||a:d;a&&(this.parentGroup=a);h&&b.invertChild(c,d);d.appendChild(c);this.added=!0;this.alignOnAdd&&!this.deferUpdateTransform&&this.updateTransform();if(this.onAdd)this.onAdd();this.className&&this.attr("class",this.className);return this},updateTransform:v.prototype.htmlUpdateTransform,setSpanRotation:function(){var a=this.rotation,b=Math.cos(a*t),c=Math.sin(a*t);A(this.element,{filter:a?["progid:DXImageTransform.Microsoft.Matrix(M11=",
    b,", M12=",-c,", M21=",c,", M22=",b,", sizingMethod='auto expand')"].join(""):"none"})},getSpanCorrection:function(a,b,c,d,h){var H=d?Math.cos(d*t):1,e=d?Math.sin(d*t):0,f=z(this.elemHeight,this.element.offsetHeight);this.xCorr=0>H&&-a;this.yCorr=0>e&&-f;var k=0>H*e;this.xCorr+=e*b*(k?1-c:c);this.yCorr-=H*b*(d?k?c:1-c:1);h&&"left"!==h&&(this.xCorr-=a*c*(0>H?-1:1),d&&(this.yCorr-=f*c*(0>e?-1:1)),A(this.element,{textAlign:h}))},pathToVML:function(a){for(var b=a.length,c=[];b--;)L(a[b])?c[b]=Math.round(10*
    a[b])-5:"Z"===a[b]?c[b]="x":(c[b]=a[b],!a.isArc||"wa"!==a[b]&&"at"!==a[b]||(c[b+5]===c[b+7]&&(c[b+7]+=a[b+7]>a[b+5]?1:-1),c[b+6]===c[b+8]&&(c[b+8]+=a[b+8]>a[b+6]?1:-1)));return c.join(" ")||"x"},clip:function(a){var b=this;if(a){var c=a.members;K(c,b);c.push(b);b.destroyClip=function(){K(c,b)};a=a.getCSS(b)}else b.destroyClip&&b.destroyClip(),a={clip:b.docMode8?"inherit":"rect(auto)"};return b.css(a)},css:v.prototype.htmlCss,safeRemoveChild:function(a){a.parentNode&&y(a)},destroy:function(){this.destroyClip&&
    this.destroyClip();return v.prototype.destroy.apply(this)},on:function(a,b){this.element["on"+a]=function(){var a=q.event;a.target=a.srcElement;b(a)};return this},cutOffPath:function(a,b){a=a.split(/[ ,]/);var c=a.length;if(9===c||11===c)a[c-4]=a[c-2]=p(a[c-2])-10*b;return a.join(" ")},shadow:function(a,b,c){var d=[],h,e=this.element,f=this.renderer,w=e.style,k=e.path;k&&"string"!==typeof k.value&&(k="x");var g=k;if(a){var C=z(a.width,3);var n=(a.opacity||.15)/C;for(h=1;3>=h;h++){var m=2*C+1-2*h;
    c&&(g=this.cutOffPath(k.value,m+.5));var l=['<shape isShadow="true" strokeweight="',m,'" filled="false" path="',g,'" coordsize="10 10" style="',e.style.cssText,'" />'];var x=F(f.prepVML(l),null,{left:p(w.left)+z(a.offsetX,1),top:p(w.top)+z(a.offsetY,1)});c&&(x.cutOff=m+1);l=['<stroke color="',a.color||"#000000",'" opacity="',n*h,'"/>'];F(f.prepVML(l),null,null,x);b?b.element.appendChild(x):e.parentNode.insertBefore(x,e);d.push(x)}this.shadows=d}return this},updateShadows:M,setAttr:function(a,b){this.docMode8?
    this.element[a]=b:this.element.setAttribute(a,b)},getAttr:function(a){return this.docMode8?this.element[a]:this.element.getAttribute(a)},classSetter:function(a){(this.added?this.element:this).className=a},dashstyleSetter:function(a,b,c){(c.getElementsByTagName("stroke")[0]||F(this.renderer.prepVML(["<stroke/>"]),null,null,c))[b]=a||"solid";this[b]=a},dSetter:function(a,b,c){var d=this.shadows;a=a||[];this.d=a.join&&a.join(" ");c.path=a=this.pathToVML(a);if(d)for(c=d.length;c--;)d[c].path=d[c].cutOff?
    this.cutOffPath(a,d[c].cutOff):a;this.setAttr(b,a)},fillSetter:function(a,b,c){var d=c.nodeName;"SPAN"===d?c.style.color=a:"IMG"!==d&&(c.filled="none"!==a,this.setAttr("fillcolor",this.renderer.color(a,c,b,this)))},"fill-opacitySetter":function(a,b,c){F(this.renderer.prepVML(["<",b.split("-")[0],' opacity="',a,'"/>']),null,null,c)},opacitySetter:M,rotationSetter:function(a,b,c){c=c.style;this[b]=c[b]=a;c.left=-Math.round(Math.sin(a*t)+1)+"px";c.top=Math.round(Math.cos(a*t))+"px"},strokeSetter:function(a,
    b,c){this.setAttr("strokecolor",this.renderer.color(a,c,b,this))},"stroke-widthSetter":function(a,b,c){c.stroked=!!a;this[b]=a;L(a)&&(a+="px");this.setAttr("strokeweight",a)},titleSetter:function(a,b){this.setAttr(b,a)},visibilitySetter:function(a,b,c){"inherit"===a&&(a="visible");this.shadows&&this.shadows.forEach(function(c){c.style[b]=a});"DIV"===c.nodeName&&(a="hidden"===a?"-999em":0,this.docMode8||(c.style[b]=a?"visible":"hidden"),b="top");c.style[b]=a},xSetter:function(a,b,c){this[b]=a;"x"===
    b?b="left":"y"===b&&(b="top");this.updateClipping?(this[b]=a,this.updateClipping()):c.style[b]=a},zIndexSetter:function(a,b,c){c.style[b]=a},fillGetter:function(){return this.getAttr("fillcolor")||""},strokeGetter:function(){return this.getAttr("strokecolor")||""},classGetter:function(){return this.getAttr("className")||""}},m["stroke-opacitySetter"]=m["fill-opacitySetter"],f.VMLElement=m=B(v,m),m.prototype.ySetter=m.prototype.widthSetter=m.prototype.heightSetter=m.prototype.xSetter,m={Element:m,
    isIE8:-1<q.navigator.userAgent.indexOf("MSIE 8.0"),init:function(a,b,c){this.alignedObjects=[];var d=this.createElement("div").css({position:"relative"});var h=d.element;a.appendChild(d.element);this.isVML=!0;this.box=h;this.boxWrapper=d;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(b,c,!1);if(!g.namespaces.hcv){g.namespaces.add("hcv","urn:schemas-microsoft-com:vml");try{g.createStyleSheet().cssText="hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}catch(H){g.styleSheets[0].cssText+=
    "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "}}},isHidden:function(){return!this.box.offsetWidth},clipRect:function(a,b,c,d){var h=this.createElement(),e=E(a);return r(h,{members:[],count:0,left:(e?a.x:a)+1,top:(e?a.y:b)+1,width:(e?a.width:c)-1,height:(e?a.height:d)-1,getCSS:function(a){var b=a.element,c=b.nodeName,d=a.inverted,e=this.top-("shape"===c?b.offsetTop:0),h=this.left;b=h+this.width;var f=e+this.height;e={clip:"rect("+Math.round(d?
    h:e)+"px,"+Math.round(d?f:b)+"px,"+Math.round(d?b:f)+"px,"+Math.round(d?e:h)+"px)"};!d&&a.docMode8&&"DIV"===c&&r(e,{width:b+"px",height:f+"px"});return e},updateClipping:function(){h.members.forEach(function(a){a.element&&a.css(h.getCSS(a))})}})},color:function(a,b,c,d){var e=this,g=/^rgba/,m,w,k="none";a&&a.linearGradient?w="gradient":a&&a.radialGradient&&(w="pattern");if(w){var l,C,n=a.linearGradient||a.radialGradient,p,t,x,u,q="";a=a.stops;var v=[],y=function(){m=['<fill colors="'+v.join(",")+
    '" opacity="',t,'" o:opacity2="',p,'" type="',w,'" ',q,'focus="100%" method="any" />'];F(e.prepVML(m),null,null,b)};var r=a[0];var z=a[a.length-1];0<r[0]&&a.unshift([0,r[1]]);1>z[0]&&a.push([1,z[1]]);a.forEach(function(a,b){g.test(a[1])?(I=f.color(a[1]),l=I.get("rgb"),C=I.get("a")):(l=a[1],C=1);v.push(100*a[0]+"% "+l);b?(t=C,x=l):(p=C,u=l)});if("fill"===c)if("gradient"===w)c=n.x1||n[0]||0,a=n.y1||n[1]||0,r=n.x2||n[2]||0,n=n.y2||n[3]||0,q='angle="'+(90-180*Math.atan((n-a)/(r-c))/Math.PI)+'"',y();else{k=
    n.r;var A=2*k,B=2*k,E=n.cx,G=n.cy,J=b.radialReference,D;k=function(){J&&(D=d.getBBox(),E+=(J[0]-D.x)/D.width-.5,G+=(J[1]-D.y)/D.height-.5,A*=J[2]/D.width,B*=J[2]/D.height);q='src="'+f.getOptions().global.VMLRadialGradientURL+'" size="'+A+","+B+'" origin="0.5,0.5" position="'+E+","+G+'" color2="'+u+'" ';y()};d.added?k():d.onAdd=k;k=x}else k=l}else if(g.test(a)&&"IMG"!==b.tagName){var I=f.color(a);d[c+"-opacitySetter"](I.get("a"),c,b);k=I.get("rgb")}else k=b.getElementsByTagName(c),k.length&&(k[0].opacity=
    1,k[0].type="solid"),k=a;return k},prepVML:function(a){var b=this.isIE8;a=a.join("");b?(a=a.replace("/>",' xmlns="urn:schemas-microsoft-com:vml" />'),a=-1===a.indexOf('style="')?a.replace("/>",' style="display:inline-block;behavior:url(#default#VML);" />'):a.replace('style="','style="display:inline-block;behavior:url(#default#VML);')):a=a.replace("<","<hcv:");return a},text:u.prototype.html,path:function(a){var b={coordsize:"10 10"};N(a)?b.d=a:E(a)&&r(b,a);return this.createElement("shape").attr(b)},
    circle:function(a,b,c){var d=this.symbol("circle");E(a)&&(c=a.r,b=a.y,a=a.x);d.isCircle=!0;d.r=c;return d.attr({x:a,y:b})},g:function(a){var b;a&&(b={className:"highcharts-"+a,"class":"highcharts-"+a});return this.createElement("div").attr(b)},image:function(a,b,c,d,e){var h=this.createElement("img").attr({src:a});1<arguments.length&&h.attr({x:b,y:c,width:d,height:e});return h},createElement:function(a){return"rect"===a?this.symbol(a):u.prototype.createElement.call(this,a)},invertChild:function(a,
    b){var c=this;b=b.style;var d="IMG"===a.tagName&&a.style;A(a,{flip:"x",left:p(b.width)-(d?p(d.top):1),top:p(b.height)-(d?p(d.left):1),rotation:-90});[].forEach.call(a.childNodes,function(b){c.invertChild(b,a)})},symbols:{arc:function(a,b,c,d,e){var f=e.start,h=e.end,g=e.r||c||d;c=e.innerR;d=Math.cos(f);var k=Math.sin(f),l=Math.cos(h),m=Math.sin(h);if(0===h-f)return["x"];f=["wa",a-g,b-g,a+g,b+g,a+g*d,b+g*k,a+g*l,b+g*m];e.open&&!c&&f.push("e","M",a,b);f.push("at",a-c,b-c,a+c,b+c,a+c*l,b+c*m,a+c*d,b+
    c*k,"x","e");f.isArc=!0;return f},circle:function(a,b,c,d,e){e&&l(e.r)&&(c=d=2*e.r);e&&e.isCircle&&(a-=c/2,b-=d/2);return["wa",a,b,a+c,b+d,a+c,b+d/2,a+c,b+d/2,"e"]},rect:function(a,b,c,d,e){return u.prototype.symbols[l(e)&&e.r?"callout":"square"].call(0,a,b,c,d,e)}}},f.VMLRenderer=B=function(){this.init.apply(this,arguments)},B.prototype=e(u.prototype,m),f.Renderer=B);u.prototype.getSpanWidth=function(a,b){var c=a.getBBox(!0).width;!G&&this.forExport&&(c=this.measureSpanWidth(b.firstChild.data,a.styles));
    return c};u.prototype.measureSpanWidth=function(a,b){var c=g.createElement("span");a=g.createTextNode(a);c.appendChild(a);A(c,b);this.box.appendChild(c);b=c.offsetWidth;y(c);return b}});l(e,"masters/modules/oldie.src.js",[],function(){})});
    //# sourceMappingURL=oldie.js.map