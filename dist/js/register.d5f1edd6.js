(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register"],{"058a":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("header",[a("router-link",{attrs:{to:"",event:"[]"},nativeOn:{click:function(t){return e.back(t)}}},[a("svg-icon",{attrs:{name:"back"}})],1),a("span",{staticClass:"title"},[e._v(e._s(e.headerTitle))]),e.hasBtn?e._t("btn"):a("span",{staticClass:"right"})],2),a("div",{staticClass:"empty"})])},i=[],r=a("d225"),s=a("b0b4"),o=a("308d"),u=a("6bb5"),c=a("4e2b"),l=a("9ab4"),d=a("60a3"),p=function(e){function t(){return Object(r["a"])(this,t),Object(o["a"])(this,Object(u["a"])(t).apply(this,arguments))}return Object(c["a"])(t,e),Object(s["a"])(t,[{key:"back",value:function(){return this.backPathName?this.$router.push({name:this.backPathName}):this.$router.go(-1)}},{key:"hasBtn",get:function(){return!!this.$slots.btn}}]),t}(d["c"]);Object(l["a"])([Object(d["b"])({default:""})],p.prototype,"headerTitle",void 0),Object(l["a"])([Object(d["b"])({default:""})],p.prototype,"backPathName",void 0),p=Object(l["a"])([d["a"]],p);var m=p,v=m,h=(a("a881"),a("2877")),b=Object(h["a"])(v,n,i,!1,null,"04180cb2",null);t["a"]=b.exports},"4e90":function(e,t,a){},"5f22":function(e,t,a){},6572:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"registerdiv"}},[a("general-header",{attrs:{"header-title":"注册","back-path-name":"login"}}),a("form",{attrs:{method:"get",action:"#"},on:{submit:function(e){e.preventDefault()}}},[a("div",{attrs:{id:"tx"}},[a("input",{ref:"uploadFile",attrs:{id:"file",type:"file"},on:{change:function(t){return e.upload(t)}}})]),a("div",{staticClass:"inputdiv"},[a("label",[e._v("昵称：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.nickname,expression:"nickname"}],attrs:{type:"text",placeholder:"请输入您的昵称",name:"nickname"},domProps:{value:e.nickname},on:{input:function(t){t.target.composing||(e.nickname=t.target.value)}}})]),a("div",{staticClass:"inputdiv"},[a("label",[e._v("姓名：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{type:"text",placeholder:"请输入您的姓名",name:"name"},domProps:{value:e.name},on:{input:function(t){t.target.composing||(e.name=t.target.value)}}})]),a("div",{staticClass:"inputdiv"},[a("label",[e._v("密码：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.password,expression:"password"}],attrs:{type:"password",placeholder:"请输入您的密码",name:"password"},domProps:{value:e.password},on:{input:function(t){t.target.composing||(e.password=t.target.value)}}})]),a("div",{staticClass:"inputdiv1"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",checked:"","aria-checked":"男",value:"男"},domProps:{checked:e._q(e.sex,"男")},on:{change:function(t){e.sex="男"}}}),e._v("男 "),a("input",{directives:[{name:"model",rawName:"v-model",value:e.sex,expression:"sex"}],attrs:{type:"radio",checked:"",value:"女"},domProps:{checked:e._q(e.sex,"女")},on:{change:function(t){e.sex="女"}}}),e._v("女\n\t\t")]),a("div",{staticClass:"inputdiv"},[a("label",[e._v("年龄：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.age,expression:"age"}],attrs:{type:"text",placeholder:"请输入您的年龄",name:"age"},domProps:{value:e.age},on:{input:function(t){t.target.composing||(e.age=t.target.value)}}})]),a("my-button",{attrs:{disabled:e.button.disabled,value:e.button.value,"btn-style":e.button.btnStyle},nativeOn:{click:function(t){return e.register(t)}}})],1)],1)},i=[],r=(a("7f7f"),a("96cf"),a("3b8d")),s=a("d225"),o=a("b0b4"),u=a("308d"),c=a("6bb5"),l=a("4e2b"),d=a("9ab4"),p=a("60a3"),m=a("058a"),v=function(e){function t(){var e;return Object(s["a"])(this,t),e=Object(u["a"])(this,Object(c["a"])(t).apply(this,arguments)),e.nickname="",e.name="",e.password="",e.sex="",e.age="",e.uploadImg="",e.headerImg="",e.button={disabled:!1,value:"注册",btnStyle:{width:"7.75rem",height:"1.175rem",fontSize:"0.5rem"}},e}return Object(l["a"])(t,e),Object(o["a"])(t,[{key:"register",value:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(){var t,a=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t={nickname:this.nickname,username:this.name,password:this.password,sex:this.sex,age:this.age,headimg:"1"},t.headimg=this.headerImg,this.registerModule.$assignParams(t),this.button.disabled=!0,e.next=6,this.registerModule.userRegister();case 6:if(setTimeout((function(){a.button.disabled=!1}),1e3),0!==this.registerModule.res.code){e.next=9;break}return e.abrupt("return",this.$router.push({name:"login",query:{nickname:t.nickname}}));case 9:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"clickUpload",value:function(){this.$refs.uploadFile.click()}},{key:"upload",value:function(e){var t=this,a=(this.headerImg,e.target.files[0]),n=new FileReader;n.readAsDataURL(a),n.onload=function(){t.headerImg=n.result}}},{key:"registerModule",get:function(){return this.$store.user.userRegister}}]),t}(p["c"]);v=Object(d["a"])([Object(p["a"])({components:{GeneralHeader:m["a"]}})],v);var h=v,b=h,f=(a("e8f9"),a("2877")),g=Object(f["a"])(b,n,i,!1,null,"3578e531",null);t["default"]=g.exports},a881:function(e,t,a){"use strict";var n=a("5f22"),i=a.n(n);i.a},e8f9:function(e,t,a){"use strict";var n=a("4e90"),i=a.n(n);i.a}}]);