/*
 Copyright (c) 2011, Darafei Praliaskouski, Vladimir Agafonkin, Maksim Gurtovenko
 Kothic JS is a full-featured JavaScript map rendering engine using HTML5 Canvas.
 See http://github.com/kothic/kothic-js for more information.
*/
var Kothic={};
Kothic.render=function(){function a(A,a){return parseFloat(A.style["z-index"]||0)-parseFloat(a.style["z-index"]||0)}function e(A,y,u,m,g){var c=u.features,u=[],i,f,r,h,l,k;i=0;for(r=c.length;i<r;i++){l=h=c[i];k=m;var n=g,d=0;if(n)d=n.kothicId=n.kothicId||++b;var o=void 0,e=void 0,d=[MapCSS.currentStyle,d,JSON.stringify(l.properties),k,l.type].join(":");if(!j[d]){if(l.type=="Polygon"||l.type=="MultiPolygon")o="way",e="area";else if(l.type=="LineString"||l.type=="MultiLineString")o="way",e="line";else if(l.type==
"Point"||l.type=="MultiPoint")e=o="node";j[d]=MapCSS.restyle(l.properties,k,o,e);n&&n(j[d],l.properties,k,o,e)}l=j[d];for(f in l)if(l.hasOwnProperty(f)){k={};n=h;o=void 0;for(o in n)n.hasOwnProperty(o)&&(k[o]=n[o]);k.kothicId=i+1;k.style=l[f];u.push(k)}}u.sort(a);m=0;for(g=u.length;m<g;m++)f=u[m],c=parseFloat(f.properties.layer)||0,i=f.style["-x-mapnik-layer"],i=="top"&&(c=1E4),i=="bottom"&&(c=-1E4),c in A||(A[c]=[],y.push(c)),A[c].push(f);y.sort()}function f(A,a){for(var b in a)a.hasOwnProperty(b)&&
a[b]&&(A[b]=a[b])}function d(a,b,c){this.buffer=[];this.ctx=a;this.debugBoxes=b;this.debugChecks=c}function r(a,b,c,m,g,r,i,d){var j=b.style,h;a:switch(b.type){case "Point":h=b.coordinates;break;case "Polygon":h=b.reprpoint;break;case "LineString":h=b.coordinates[0];break;case "GeometryCollection":case "MultiPoint":case "MultiPolygon":case "MultiLineString":h=void 0;break a}if(h){h=[m*h[0],g*(r-h[1])];var l;if(d){l=MapCSS.getImage(j["icon-image"]);if(!l)return;if(c.checkPointWH(h,l.width,l.height,
b.kothicId))return}if(i){a.save();var i=j["text-halo-radius"]+2,k;k=j["font-family"];var n=j["font-size"];k=k||"";var n=n||9,e=k?k+", ":"";k=k.toLowerCase();var o=[];(k.indexOf("italic")!=-1||k.indexOf("oblique")!=-1)&&o.push("italic");k.indexOf("bold")!=-1&&o.push("bold");o.push(n+"px");e+=k.indexOf("serif")!=-1?"Georgia, serif":"Arial, Helvetica, sans-serif";o.push(e);k=o.join(" ");f(a,{lineWidth:i,font:k});i=j.text+"";n=a.measureText(i).width;e=n/i.length*2.5;o=j["text-offset"]||0;if(j["text-allow-overlap"]!=
"true"&&c.checkPointWH([h[0],h[1]+o],n,e,b.kothicId)){a.restore();return}var x=j["text-opacity"]||j.opacity||1,C=j["text-color"]||"#000000",F=j["text-halo-color"]||"#ffffff";k="text-halo-radius"in j;x<1&&(C=(new RGBColor(C,x)).toRGBA(),F=(new RGBColor(F,x)).toRGBA());f(a,{fillStyle:C,strokeStyle:F,textAlign:"center",textBaseline:"middle"});if(b.type=="Polygon"||b.type=="Point")k&&a.strokeText(i,h[0],h[1]+o),a.fillText(i,h[0],h[1]+o),m=parseFloat(j["-x-mapnik-min-distance"])||20,c.addPointWH([h[0],
h[1]+o],n,e,m,b.kothicId);else if(b.type=="LineString"){n=b.coordinates;e=[];o=0;for(x=n.length;o<x;o++)e.push([m*n[o][0],g*(r-n[o][1])]);Kothic.textOnPath(a,e,i,k,c)}a.restore()}d&&(a.drawImage(l,Math.floor(h[0]-l.width/2),Math.floor(h[1]-l.height/2)),m=parseFloat(j["-x-mapnik-min-distance"])||0,c.addPointWH(h,l.width,l.height,m,b.kothicId))}}var j={},g=!1,b=0,c={strokeStyle:"rgba(0,0,0,0.5)",fillStyle:"rgba(0,0,0,0.5)",lineWidth:1,lineCap:"round",lineJoin:"round"};d.prototype={addBox:function(a){this.buffer.push(a)},
addPointWH:function(a,b,c,g,f){a=this.getBoxFromPoint(a,b,c,g,f);this.buffer.push(a);if(this.debugBoxes)this.ctx.save(),this.ctx.strokeStyle="red",this.ctx.lineWidth="1",this.ctx.strokeRect(a[0],a[1],a[2]-a[0],a[3]-a[1]),this.ctx.restore()},checkBox:function(a){for(var b=0,c=this.buffer.length,g;b<c;b++)if(g=this.buffer[b],!(a[4]&&a[4]==g[4])&&g[0]<=a[2]&&g[1]<=a[3]&&g[2]>=a[0]&&g[3]>=a[1]){if(this.debugChecks)this.ctx.save(),this.ctx.strokeStyle="darkblue",this.ctx.lineWidth="1",this.ctx.strokeRect(a[0],
a[1],a[2]-a[0],a[3]-a[1]),this.ctx.restore();return!0}return!1},checkPointWH:function(a,b,c,g){return this.checkBox(this.getBoxFromPoint(a,b,c,0,g))},getBoxFromPoint:function(a,b,c,g,f){return[a[0]-b/2-g,a[1]-c/2-g,a[0]+b/2+g,a[1]+c/2+g,f]}};return function(a,b,j,m,v,q){var a=typeof a=="string"?document.getElementById(a):a,i=a.getContext("2d"),s=a.width,w=a.height,h=b.granularity,l=s/h,k=w/h,n={},B=[],o=new d,x,C,F=+new Date,G,H,I;if(q)x=document.createElement("canvas"),x.width=s,x.height=w,C=i,i=
x.getContext("2d");e(n,B,b,j,m);G=+new Date;f(i,c);var J=B.length,E,p,t,D,z,K;K=function(){o.addBox([0,0,s,0]);o.addBox([0,w,s,w]);o.addBox([s,0,s,w]);o.addBox([0,0,0,w]);for(E=J-1;E>=0;E--){t=n[B[E]];D=t.length;for(p=D-1;p>=0;p--)z=t[p].style,"icon-image"in z&&!z.text&&r(i,t[p],o,l,k,h,!1,!0);for(p=D-1;p>=0;p--)z=t[p].style,z.text&&z["text-position"]=="line"&&r(i,t[p],o,l,k,h,!0,!1);for(p=D-1;p>=0;p--)z=t[p].style,z.text&&z["text-position"]!="line"&&!("icon-image"in z)&&r(i,t[p],o,l,k,h,!0,!1);for(p=
D-1;p>=0;p--)z=t[p].style,"icon-image"in z&&z.text&&r(i,t[p],o,l,k,h,!0,!0)}I=+new Date;q&&C.drawImage(x,0,0);v({layersStyled:G-F,mapRendered:H-G,iconsAndTextRendered:I-H,total:I-F})};setTimeout(function(){var a=i,b=MapCSS.restyle({},j,"canvas","canvas")["default"];a.save();f(a,{fillStyle:b["fill-color"],globalAlpha:b["fill-opacity"]||b.opacity});a.fillRect(-1,-1,s+1,w+1);a.restore();for(E=0;E<J;E++){t=n[B[E]];D=t.length;for(p=0;p<D;p++)if(z=t[p].style,"fill-color"in z||"fill-image"in z){var a=i,
c=t[p],e=t[p+1],r=l,m=k,d=h,b=c.style;g||(g=!0,a.beginPath());Kothic.path(a,c,!1,!0,r,m,d);if(!e||e.style!==b){a.save();c=b["fill-opacity"]||b.opacity;"fill-color"in b&&(f(a,{fillStyle:b["fill-color"],globalAlpha:c}),a.fill());if("fill-image"in b&&(b=MapCSS.getImage(b["fill-image"])))f(a,{fillStyle:a.createPattern(b,"repeat"),globalAlpha:c}),a.fill();g=!1;a.restore()}}i.lineCap="butt";for(p=0;p<D;p++)if("casing-width"in t[p].style){var a=i,b=t[p],c=t[p+1],e=l,r=k,m=h,d=b.style,o=d["casing-dashes"]||
d.dashes||!1;g||(g=!0,a.beginPath());Kothic.path(a,b,o,!1,e,r,m);if(!c||c.style!==d)a.save(),f(a,{lineWidth:2*d["casing-width"]+("width"in d?d.width:0),strokeStyle:d["casing-color"]||d.color,lineCap:d["casing-linecap"]||d.linecap,lineJoin:d["casing-linejoin"]||d.linejoin,globalAlpha:d["casing-opacity"]||d.opacity}),g=!1,a.stroke(),a.restore()}i.lineCap="round";for(p=0;p<D;p++)if("width"in t[p].style&&(a=i,b=t[p],c=t[p+1],e=l,r=k,m=h,d=b.style,o=d.dashes,g||(g=!0,a.beginPath()),Kothic.path(a,b,o,!1,
e,r,m),!c||c.style!==d))a.save(),f(a,{lineWidth:d.width,strokeStyle:d.color,lineCap:d.linecap,lineJoin:d.linejoin,globalAlpha:d.opacity}),g=!1,a.stroke(),a.restore();H=+new Date}setTimeout(K,0)},0)}}();var MapCSS={styles:{},currentStyle:"",onError:function(){},onImagesLoad:function(){},e_min:function(){return Math.min.apply(null,arguments)},e_max:function(){return Math.max.apply(null,arguments)},e_any:function(){for(var a=0;a<arguments.length;a++)if(typeof arguments[a]!="undefined"&&arguments[a]!=="")return arguments[a];return""},e_num:function(a){return isNaN(parseFloat(a))?"":parseFloat(a)},e_str:function(a){return a},e_int:function(a){return parseInt(a,10)},e_tag:function(a,e){return e in a&&
a[e]!==null?a[e]:""},e_prop:function(a,e){return e in a&&a[e]!==null?a[e]:""},e_sqrt:function(a){return Math.sqrt(a)},e_boolean:function(a){return a=="0"||a=="false"||a===""?"false":"true"},e_boolean:function(a,e,f){return MapCSS.e_boolean(a)=="true"?e:f},e_metric:function(a){return/\d\s*mm$/.test(a)?1E3*parseInt(a,10):/\d\s*cm$/.test(a)?100*parseInt(a,10):/\d\s*dm$/.test(a)?10*parseInt(a,10):/\d\s*km$/.test(a)?0.0010*parseInt(a,10):/\d\s*in$/.test(a)?0.0254*parseInt(a,10):/\d\s*ft$/.test(a)?0.3048*
parseInt(a,10):parseInt(a,10)},e_zmetric:function(a){return MapCSS.metric(a)},loadStyle:function(a,e,f,d){MapCSS.styles[a]={restyle:e,images:f,external_images:d,textures:{}};if(!MapCSS.currentStyle)MapCSS.currentStyle=a},loadImages:function(a,e){var f=!e,d=!MapCSS.styles[a].external_images.length;if(d&&f)MapCSS.onImagesLoad();d||MapCSS._preloadExternalImages(a,function(){if((d=!0)&&f)MapCSS.onImagesLoad()});f||MapCSS._preloadSpriteImage(a,e,function(){f=!0;if(d&&f)MapCSS.onImagesLoad()})},_preloadSpriteImage:function(a,
e,f){var d=new Image;d.onload=function(){var e=MapCSS.styles[a].images,j;for(j in e)if(e.hasOwnProperty(j))e[j].sprite=d;f()};d.onerror=function(a){MapCSS.onError(a)};d.src=e},_preloadExternalImages:function(a,e){var f=MapCSS.styles[a].external_images;delete MapCSS.styles[a].external_images;for(var d=f.length,r=0,j=0;j<d;j++)(function(g){var b=new Image;b.onload=function(){r++;MapCSS.styles[a].images[g]={sprite:b,height:b.height,width:b.width,offset:0};r==d&&e()};b.onerror=function(){r++;r==d&&e()};
b.src=g})(f[j])},getImage:function(a){var e=MapCSS.styles[MapCSS.currentStyle],f=e.images[a];if(f.sprite){var d=document.createElement("canvas");d.width=f.width;d.height=f.height;d.getContext("2d").drawImage(f.sprite,0,f.offset,f.width,f.height,0,0,f.width,f.height);f=e.images[a]=d}return f},restyle:function(){return MapCSS.styles[MapCSS.currentStyle].restyle.apply(MapCSS,arguments)}};Kothic.path=function(){function a(a,f){d={pattern:f,seg:0,phs:0,x:a[0],y:a[1]}}function e(a,f){var g=d,b=f[0]-g.x,c=f[1]-g.y,e=Math.sqrt(b*b+c*c),y;a.save();a.translate(g.x,g.y);a.rotate(Math.atan2(c,b));a.moveTo(0,0);b=0;do{y=g.pattern[g.seg];b+=y-g.phs;c=b<e;if(!c)g.phs=y-(b-e),b=e;a[g.seg%2?"moveTo":"lineTo"](b,0);if(c)g.phs=0,g.seg=++g.seg%g.pattern.length}while(c);g.x=f[0];g.y=f[1];a.restore()}function f(a,d){return a[0]===0||a[0]==d||a[1]===0||a[1]==d}var d;return function(d,j,g,b,c,A,y){var u=
j.type,j=j.coordinates;u=="Polygon"&&(j=[j],u="MultiPolygon");u=="LineString"&&(j=[j],u="MultiLineString");var m,v,q,i,s=j.length,w,h,l,k,n;if(u=="MultiPolygon")for(m=0;m<s;m++){q=0;for(w=j[m].length;q<w;q++){i=j[m][q];h=i.length;l=i[0];for(v=0;v<=h;v++)k=i[v]||i[0],n=[c*k[0],A*(y-k[1])],v===0||!b&&f(k,y)&&f(l,y)?(l=n,n=g,d.moveTo(l[0],l[1]),n&&a(l,n)):b||!g?d.lineTo(n[0],n[1]):e(d,n),l=k}}if(u=="MultiLineString")for(m=0;m<s;m++){i=j[m];h=i.length;for(v=0;v<h;v++)k=i[v],n=[c*k[0],A*(y-k[1])],(v===
0||v==h-1)&&f(k,y),v===0?(b=n,u=g,d.moveTo(b[0],b[1]),u&&a(b,u)):g?e(d,n):d.lineTo(n[0],n[1])}}}();/*
 Use it if you like it
*/
function RGBColor(a,e){this.ok=!1;a.charAt(0)=="#"&&(a=a.substr(1,6));var a=a.replace(/ /g,""),a=a.toLowerCase(),f={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"00ffff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000000",blanchedalmond:"ffebcd",blue:"0000ff",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"00ffff",darkblue:"00008b",
darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dodgerblue:"1e90ff",feldspar:"d19275",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"ff00ff",
gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",
lightslateblue:"8470ff",lightslategray:"778899",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"00ff00",limegreen:"32cd32",linen:"faf0e6",magenta:"ff00ff",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",
oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",red:"ff0000",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",
slategray:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",violetred:"d02090",wheat:"f5deb3",white:"ffffff",whitesmoke:"f5f5f5",yellow:"ffff00",yellowgreen:"9acd32"};f[a]&&(a=f[a]);for(var f=[{re:/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,example:["rgb(123, 234, 45)","rgb(255,234,245)"],process:function(a){return[parseInt(a[1]),parseInt(a[2]),parseInt(a[3])]}},{re:/^(\w{2})(\w{2})(\w{2})$/,
example:["#00ff00","336699"],process:function(a){return[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16)]}},{re:/^(\w{1})(\w{1})(\w{1})$/,example:["#fb0","f0f"],process:function(a){return[parseInt(a[1]+a[1],16),parseInt(a[2]+a[2],16),parseInt(a[3]+a[3],16)]}}],d=0;d<f.length;d++){var r=f[d].process,j=f[d].re.exec(a);if(j)channels=r(j),this.r=channels[0],this.g=channels[1],this.b=channels[2],this.ok=!0}this.r=this.r<0||isNaN(this.r)?0:this.r>255?255:this.r;this.g=this.g<0||isNaN(this.g)?0:this.g>
255?255:this.g;this.b=this.b<0||isNaN(this.b)?0:this.b>255?255:this.b;this.a=e?e:1;this.toRGB=function(){return"rgb("+this.r+", "+this.g+", "+this.b+")"};this.toRGBA=function(){return"rgba("+this.r+", "+this.g+", "+this.b+", "+this.a+")"};this.toHex=function(){var a=this.r.toString(16),b=this.g.toString(16),c=this.b.toString(16);a.length==1&&(a="0"+a);b.length==1&&(b="0"+b);c.length==1&&(c="0"+c);return"#"+a+b+c}};Kothic.textOnPath=function(){function a(a,c){if(!g[c])g[c]=a.measureText(c).width;return g[c]}function e(a,c){return[a[1]+0.5*Math.cos(a[0])*c,a[2]+0.5*Math.sin(a[0])*c]}function f(b,c,d,f){var f=f||0,g=a(b,c),c=a(b,c.charAt(0))*1.5,m=d[0],b=Math.abs(Math.cos(m)*g)+Math.abs(Math.sin(m)*c),c=Math.abs(Math.sin(m)*g)+Math.abs(Math.cos(m)*c);return[e(d,g+2*f),b,c,0]}function d(b,c,d,g){var e,m=0;for(e=0;e<=d.length;e++){if(b.checkPointWH.apply(b,f(c,d.charAt(e),g,m)))return!0;m+=a(c,d.charAt(e))}return!1}
function r(b,c,d){var f=c[4],g=e(c,a(b,f));b.save();b.translate(Math.floor(g[0]),Math.floor(g[1]));b.rotate(c[0]);b[d?"strokeText":"fillText"](f,0,0);b.restore()}function j(a,c){var d=a.length,f,g,e,j,q,i=0;q=0;for(j=1;j<d;j++){q=a[j];e=a[j-1];f=q[0]-e[0];g=q[1]-e[1];q=Math.sqrt(f*f+g*g);if(i+q>=c)return j=c-i,d=e[0]+f*j/q,e=e[1]+g*j/q,f=Math.atan2(g,f),[f,d,e,q-j];i+=q}}var g;return function(b,c,e,y,u){g={};var m=b.measureText(e).width,v=e.length,q,i=c.length,s,w,h,l=0;for(h=1;h<i;h++)s=c[h],w=c[h-
1],q=w[0]-s[0],s=w[1]-s[1],l+=Math.sqrt(q*q+s*s);q=l;if(!(q<m)){for(var k,n=0,B,o=!1,x,C=Math.PI/6;n<2;){s=n?a(b,e.charAt(0)):(q-m)/2;B=0;w=null;k=[];for(i=0;i<v;i++){h=j(c,s);if(s>=q||!h){n++;k=[];o&&(c.reverse(),o=!1);break}w||(w=h[0]);l=e.charAt(i);x=a(b,l);if(d(u,b,l,h)||Math.abs(w-h[0])>C)s+=x,i=-1,k=[],B=0;else{for(;x<h[3]&&i<v;)if(i++,l+=e.charAt(i),x=a(b,l),d(u,b,l,h)||Math.abs(w-h[0])>C){i=0;s+=x;k=[];B=0;l=e.charAt(i);x=a(b,l);h=j(c,s);break}if(h){if(h[0]>Math.PI/2||h[0]<-Math.PI/2)B+=l.length;
w=h[0];h.push(l);k.push(h);s+=x}}}B>v/2&&(c.reverse(),k=[],o?(n++,c.reverse(),o=!1):o=!0);if(n>=2)return;if(k.length>0)break}c=k.length;for(i=0;y&&i<c;i++)r(b,k[i],!0);for(i=0;i<c;i++){h=k[i];r(b,h);y=u;e=b;m=h[4];v=h;h=void 0;for(h=q=0;h<=m.length;h++)y.addPointWH.apply(y,f(e,m.charAt(h),v,q)),q+=a(e,m.charAt(h))}}}}();