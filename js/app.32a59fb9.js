(function(e){function n(n){for(var r,i,o=n[0],u=n[1],p=n[2],m=0,s=[];m<o.length;m++)i=o[m],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&s.push(a[i][0]),a[i]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);l&&l(n);while(s.length)s.shift()();return c.push.apply(c,p||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,i=1;i<t.length;i++){var o=t[i];0!==a[o]&&(r=!1)}r&&(c.splice(n--,1),e=u(u.s=t[0]))}return e}var r={},i={app:0},a={app:0},c=[];function o(e){return u.p+"js/"+({"canvas-01":"canvas-01","experiment-05":"experiment-05","experiment-06":"experiment-06","experiment-08":"experiment-08","experiment-09":"experiment-09","experiment-10":"experiment-10","experiment-11":"experiment-11","experiment-12":"experiment-12","experiment-13":"experiment-13",default:"default","experiment-01":"experiment-01","experiment-02":"experiment-02","experiment-03":"experiment-03","experiment-04":"experiment-04"}[e]||e)+"."+{"chunk-c856a108":"c3734ddb","chunk-2a09ef4d":"8b8980aa","canvas-01":"89f8022b","chunk-2d0d2bc3":"40193a04","chunk-f1cf1c80":"b1071f82","experiment-05":"f7d900cc","experiment-06":"4b69674f","experiment-08":"d82d1ad2","experiment-09":"691fb90f","experiment-10":"16d3d534","experiment-11":"1065c387","experiment-12":"c1cde61e","experiment-13":"2da34a8c",default:"00227234","experiment-01":"437fd422","experiment-02":"9452beee","experiment-03":"6775888f","experiment-04":"12502b31"}[e]+".js"}function u(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t={"chunk-c856a108":1,"canvas-01":1,"chunk-f1cf1c80":1,"experiment-05":1,"experiment-06":1,"experiment-08":1,"experiment-09":1,"experiment-10":1,"experiment-11":1,"experiment-12":1,"experiment-13":1,default:1,"experiment-01":1,"experiment-02":1,"experiment-03":1,"experiment-04":1};i[e]?n.push(i[e]):0!==i[e]&&t[e]&&n.push(i[e]=new Promise((function(n,t){for(var r="css/"+({"canvas-01":"canvas-01","experiment-05":"experiment-05","experiment-06":"experiment-06","experiment-08":"experiment-08","experiment-09":"experiment-09","experiment-10":"experiment-10","experiment-11":"experiment-11","experiment-12":"experiment-12","experiment-13":"experiment-13",default:"default","experiment-01":"experiment-01","experiment-02":"experiment-02","experiment-03":"experiment-03","experiment-04":"experiment-04"}[e]||e)+"."+{"chunk-c856a108":"379122e1","chunk-2a09ef4d":"31d6cfe0","canvas-01":"6eb39ebe","chunk-2d0d2bc3":"31d6cfe0","chunk-f1cf1c80":"0af64078","experiment-05":"d3ce61fe","experiment-06":"1f49c25b","experiment-08":"c7faedcf","experiment-09":"6fe8fe14","experiment-10":"bb40380e","experiment-11":"4954ca9a","experiment-12":"da0873cb","experiment-13":"eea752a0",default:"1aa31faf","experiment-01":"2344ee31","experiment-02":"56ac7969","experiment-03":"f96c3d2f","experiment-04":"059813a5"}[e]+".css",a=u.p+r,c=document.getElementsByTagName("link"),o=0;o<c.length;o++){var p=c[o],m=p.getAttribute("data-href")||p.getAttribute("href");if("stylesheet"===p.rel&&(m===r||m===a))return n()}var s=document.getElementsByTagName("style");for(o=0;o<s.length;o++){p=s[o],m=p.getAttribute("data-href");if(m===r||m===a)return n()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=n,l.onerror=function(n){var r=n&&n.target&&n.target.src||a,c=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");c.code="CSS_CHUNK_LOAD_FAILED",c.request=r,delete i[e],l.parentNode.removeChild(l),t(c)},l.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(l)})).then((function(){i[e]=0})));var r=a[e];if(0!==r)if(r)n.push(r[2]);else{var c=new Promise((function(n,t){r=a[e]=[n,t]}));n.push(r[2]=c);var p,m=document.createElement("script");m.charset="utf-8",m.timeout=120,u.nc&&m.setAttribute("nonce",u.nc),m.src=o(e);var s=new Error;p=function(n){m.onerror=m.onload=null,clearTimeout(l);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+e+" failed.\n("+r+": "+i+")",s.name="ChunkLoadError",s.type=r,s.request=i,t[1](s)}a[e]=void 0}};var l=setTimeout((function(){p({type:"timeout",target:m})}),12e4);m.onerror=m.onload=p,document.head.appendChild(m)}return Promise.all(n)},u.m=e,u.c=r,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)u.d(t,r,function(n){return e[n]}.bind(null,r));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/shader-tests/",u.oe=function(e){throw console.error(e),e};var p=window["webpackJsonp"]=window["webpackJsonp"]||[],m=p.push.bind(p);p.push=n,p=p.slice();for(var s=0;s<p.length;s++)n(p[s]);var l=m;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"37c7":function(e,n,t){},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),i=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{ref:"app",attrs:{id:"app"}},[t("router-view")],1)},a=[],c=t("f7fe"),o={mounted:function(){this.setViewportDimensions(),this.setUpEventListeners()},methods:{setUpEventListeners:function(){this.resizeHandler()},setViewportDimensions:function(){this.$store.commit("dimensions",{innerWidth:window.innerWidth,innerHeight:window.innerHeight})},resizeHandler:function(){window.addEventListener("resize",c(this.setViewportDimensions.bind(this),250))}}},u=o,p=(t("5c0b"),t("0c7c")),m=Object(p["a"])(u,i,a,!1,null,null,null),s=m.exports,l=(t("d3b7"),t("8c4f")),d=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"home"},[t("ul",{staticClass:"home__list"},[t("h2",{staticClass:"home__header"},[e._v("ThreeJS / OpenGL")]),e._l(e.routes,(function(n){return t("li",{key:n.path,staticClass:"home__item"},[t("router-link",{staticClass:"home__link",attrs:{to:n.path}},[e._v(e._s(n.name))])],1)}))],2),t("ul",{staticClass:"home__list"},[t("h2",{staticClass:"home__header"},[e._v("Canvas")]),e._l(e.canvasRoutes,(function(n){return t("li",{key:n.path,staticClass:"home__item"},[t("router-link",{staticClass:"home__link",attrs:{to:n.path}},[e._v(e._s(n.name))])],1)}))],2)])},h=[],f={route:"Home",data:function(){return{routes:[{name:"Default",path:"/default"},{name:"Mouse color movement",path:"/01"},{name:"Mouse blending colors",path:"/02"},{name:"Blending colors",path:"/03"},{name:"Moving spheres",path:"/04"},{name:"Displacement sphere",path:"/05"},{name:"Sun",path:"/06"},{name:"Submarine screen",path:"/07"},{name:"Fire",path:"/08"},{name:"Texture - rotating",path:"/09"},{name:"Texture - ripple",path:"/10"},{name:"Texture - ripple transistion",path:"/11"},{name:"Box to sphere transistion",path:"/12"},{name:"Explosion",path:"/13"}],canvasRoutes:[{name:"Arrow pointer",path:"/canvas-01"}]}}},x=f,b=(t("5f68"),Object(p["a"])(x,d,h,!1,null,"1e5c8293",null)),k=b.exports;r["a"].use(l["a"]);var v=[{path:"/",name:"Home",component:k},{path:"/default",name:"default",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("default")]).then(t.bind(null,"ca83"))}},{path:"/01",name:"01",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("experiment-01")]).then(t.bind(null,"4c9f"))}},{path:"/02",name:"02",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("experiment-02")]).then(t.bind(null,"71c2"))}},{path:"/03",name:"03",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("experiment-03")]).then(t.bind(null,"c2d0"))}},{path:"/04",name:"04",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("experiment-04")]).then(t.bind(null,"9ed2"))}},{path:"/05",name:"05",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-05")]).then(t.bind(null,"a39c"))}},{path:"/06",name:"06",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-06")]).then(t.bind(null,"c015"))}},{path:"/07",name:"07",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("chunk-f1cf1c80")]).then(t.bind(null,"fcdf"))}},{path:"/08",name:"08",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-08")]).then(t.bind(null,"0ce2"))}},{path:"/09",name:"09",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-09")]).then(t.bind(null,"b5da"))}},{path:"/10",name:"10",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-10")]).then(t.bind(null,"e847"))}},{path:"/11",name:"11",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-11")]).then(t.bind(null,"04d2"))}},{path:"/12",name:"12",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-12")]).then(t.bind(null,"a51d"))}},{path:"/13",name:"13",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2d0d2bc3"),t.e("chunk-2a09ef4d"),t.e("experiment-13")]).then(t.bind(null,"1355"))}},{path:"/canvas-01",name:"c-01",component:function(){return Promise.all([t.e("chunk-c856a108"),t.e("chunk-2a09ef4d"),t.e("canvas-01")]).then(t.bind(null,"cb9c"))}}],g=new l["a"]({mode:"history",base:"/shader-tests/",routes:v}),_=g,y=t("2f62");r["a"].use(y["a"]);var w=new y["a"].Store({state:{dimensions:{innerHeight:null,innerWidth:null}},getters:{dimensions:function(e){return e.dimensions}},mutations:{dimensions:function(e,n){e.dimensions.innerWidth=n.innerWidth,e.dimensions.innerHeight=n.innerHeight}}});r["a"].config.productionTip=!1,new r["a"]({router:_,store:w,render:function(e){return e(s)}}).$mount("#app")},"5c0b":function(e,n,t){"use strict";var r=t("37c7"),i=t.n(r);i.a},"5f68":function(e,n,t){"use strict";var r=t("d63c"),i=t.n(r);i.a},d63c:function(e,n,t){}});
//# sourceMappingURL=app.32a59fb9.js.map