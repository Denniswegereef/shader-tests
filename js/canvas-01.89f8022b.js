(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["canvas-01"],{3e3:function(t,e,s){"use strict";var i=s("fa87"),n=s.n(i);n.a},cb9c:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"default"},[s("PageHeader",{attrs:{route:this.$route}}),s("canvas",{ref:"canvas",staticClass:"canvas"})],1)},n=[],a=s("36ad"),d=s("3191"),r=s.n(d),o=s("cffa"),h=o.gsap,c=s("8992"),u={name:"canvas-01",components:{PageHeader:a["a"]},data:function(){return{debug:!0,context:null,arrowX:0,arrowY:0,dimensionX:0,dimensionY:0,angle:0}},computed:{dimensions:function(){return{innerWidth:this.$store.getters.dimensions.innerWidth,innerHeight:this.$store.getters.dimensions.innerHeight}}},watch:{dimensions:function(){this.setSizes()}},mounted:function(){this.$data.context=this.$refs.canvas.getContext("2d"),this.debug&&this.showStats(),this.setSizes(),this.setUpEventListeners(),this.debug&&this.showGUI()},methods:{setUpEventListeners:function(){this.tickHandler()},setSizes:function(){var t=this.$store.getters.dimensions,e=t.innerWidth,s=t.innerHeight;this.$refs.canvas.width=e,this.$refs.canvas.height=s,this.$data.arrowX=e/2,this.$data.arrowY=s/2},update:function(){var t=this.$store.getters.dimensions,e=t.innerWidth,s=t.innerHeight,i=this.$data.context.createRadialGradient(75,50,5,90,60,s);i.addColorStop(0,"red"),i.addColorStop(1,"white"),this.$data.context.fillStyle=i,this.$data.context.fillRect(0,0,e,s)},render:function(){this.debug&&this.$data.stats.begin(),this.update(),this.debug&&this.$data.stats.end()},showStats:function(){this.$data.stats=new r.a,this.$data.stats.showPanel(0),document.body.appendChild(this.$data.stats.dom).id="stats"},showGUI:function(){this.$data.gui=new c.GUI({autoPlace:!0});var t=this.$data.gui.addFolder("Canvas");t.open()},tickHandler:function(){h.ticker.add(this.render)}},beforeDestroy:function(){h.ticker.remove(this.render),this.debug&&document.querySelector("#stats").remove(),this.$data.gui&&this.$data.gui.destroy()}},f=u,l=(s("3000"),s("0c7c")),g=Object(l["a"])(f,i,n,!1,null,"38ed292c",null);e["default"]=g.exports},fa87:function(t,e,s){}}]);
//# sourceMappingURL=canvas-01.89f8022b.js.map