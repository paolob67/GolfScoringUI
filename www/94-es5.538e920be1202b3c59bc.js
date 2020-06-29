function _defineProperties(n,l){for(var e=0;e<l.length;e++){var t=l[e];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}function _createClass(n,l,e){return l&&_defineProperties(n.prototype,l),e&&_defineProperties(n,e),n}function _classCallCheck(n,l){if(!(n instanceof l))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[94],{"8k80":function(n,l,e){"use strict";e.r(l);var t=e("8Y7J"),u=function n(){_classCallCheck(this,n)},r=e("pMnS"),o=e("MKJQ"),a=e("sZkV"),i=e("SVse"),c=e("mrSG"),s=e("X+KH"),p=e("VRTQ"),b=function(){function n(l,e,t,u){_classCallCheck(this,n),this.alertCtrl=l,this.router=e,this.userData=t,this.restClient=u}return _createClass(n,[{key:"ngAfterViewInit",value:function(){this.getProfile()}},{key:"changeName",value:function(){return c.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l,e=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertCtrl.create({header:"Change Username",buttons:["Cancel",{text:"Ok",handler:function(n){e.profileData.firstName=n.firstName,e.profileData.lastName=n.lastName,e.updateProfile()}}],inputs:[{type:"text",name:"firstName",value:this.profileData.firstName,placeholder:"First Name"},{type:"text",name:"lastName",value:this.profileData.lastName,placeholder:"Last Name"}]});case 2:return l=n.sent,n.next=5,l.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"changeClub",value:function(){return c.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l,e=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertCtrl.create({header:"Change Club Name",buttons:["Cancel",{text:"Ok",handler:function(n){e.profileData.clubName=n.clubName,e.updateProfile()}}],inputs:[{type:"text",name:"clubName",value:this.profileData.clubName,placeholder:"Club Name"}]});case 2:return l=n.sent,n.next=5,l.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"changeCard",value:function(){return c.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l,e=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertCtrl.create({header:"Change Card Number",buttons:["Cancel",{text:"Ok",handler:function(n){e.profileData.card=n.card,e.updateProfile()}}],inputs:[{type:"text",name:"card",value:this.profileData.card,placeholder:"Card Number"}]});case 2:return l=n.sent,n.next=5,l.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"changeHandicap",value:function(){return c.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l,e=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertCtrl.create({header:"Change Handicap",buttons:["Cancel",{text:"Ok",handler:function(n){e.profileData.handicap=parseInt(n.handicap,10),e.updateProfile()}}],inputs:[{type:"number",name:"handicap",value:this.profileData.handicap,placeholder:"0"}]});case 2:return l=n.sent,n.next=5,l.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"changeGender",value:function(){return c.a(this,void 0,void 0,regeneratorRuntime.mark((function n(){var l,e=this;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertCtrl.create({header:"Change Gender",buttons:["Cancel",{text:"Ok",handler:function(n){console.log("the data",n),e.profileData.gender=n,e.updateProfile()}}],inputs:[{name:"male",type:"radio",label:"Male",value:"male",checked:"male"===this.profileData.gender},{name:"female",type:"radio",label:"Female",value:"female",checked:"female"===this.profileData.gender}]});case 2:return l=n.sent,n.next=5,l.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"getUsername",value:function(){var n=this;this.userData.getId().then((function(l){n.username=l}))}},{key:"getProfile",value:function(){var n=this;this.userData.getJwtToken().then((function(l){n.restClient.presentLoader(),n.restClient.me(l).subscribe((function(l){console.log("Me returned ",l),n.profileData=l,n.username=l.firstName}),(function(l){console.error("Me error",l.error.error),401===l.error.error.statusCode&&n.logout()}),(function(){console.log("Me success"),n.restClient.dismissLoader()}))}))}},{key:"updateProfile",value:function(){var n=this;this.userData.getJwtToken().then((function(l){n.restClient.updateUser(l,n.profileData).subscribe((function(n){console.log("UpdateUser returned ",n)}),(function(l){console.error("UpdateUser error",l.error.error),401===l.error.error.statusCode&&n.logout()}),(function(){return console.log("UpdateUser success")}))}))}},{key:"changePassword",value:function(){console.log("Clicked to change password")}},{key:"logout",value:function(){this.userData.logout(),this.router.navigateByUrl("/login")}},{key:"support",value:function(){this.router.navigateByUrl("/support")}}]),n}(),h=e("iInd"),f=t.nb({encapsulation:0,styles:[["img[_ngcontent-%COMP%]{max-width:140px;border-radius:50%}"]],data:{}});function m(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,62,"div",[["class","ion-padding-top ion-text-center"]],null,null,null,null,null)),(n()(),t.pb(1,0,null,null,0,"img",[["alt","avatar"],["src","https://www.gravatar.com/avatar?d=mm&s=140"]],null,null,null,null,null)),(n()(),t.pb(2,0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),t.Hb(3,null,["",""])),(n()(),t.pb(4,0,null,null,47,"ion-list",[["inset",""]],null,null,null,o.eb,o.s)),t.ob(5,49152,null,0,a.P,[t.h,t.k,t.x],{inset:[0,"inset"]},null),(n()(),t.pb(6,0,null,0,7,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.changeName()&&t),t}),o.bb,o.o)),t.ob(7,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.pb(8,0,null,0,2,"ion-label",[["color","primary"],["position","fixed"]],null,null,null,o.cb,o.r)),t.ob(9,49152,null,0,a.O,[t.h,t.k,t.x],{color:[0,"color"],position:[1,"position"]},null),(n()(),t.Hb(-1,0,["Name:"])),(n()(),t.Hb(11,0,[" "," "," "])),(n()(),t.pb(12,0,null,0,1,"ion-icon",[["name","create-outline"],["slot","end"]],null,null,null,o.X,o.m)),t.ob(13,49152,null,0,a.D,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(14,0,null,0,5,"ion-item",[],null,null,null,o.bb,o.o)),t.ob(15,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.pb(16,0,null,0,2,"ion-label",[["color","primary"],["position","fixed"]],null,null,null,o.cb,o.r)),t.ob(17,49152,null,0,a.O,[t.h,t.k,t.x],{color:[0,"color"],position:[1,"position"]},null),(n()(),t.Hb(-1,0,["Email:"])),(n()(),t.Hb(19,0,[" "," "])),(n()(),t.pb(20,0,null,0,7,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.changeClub()&&t),t}),o.bb,o.o)),t.ob(21,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.pb(22,0,null,0,2,"ion-label",[["color","primary"],["position","fixed"]],null,null,null,o.cb,o.r)),t.ob(23,49152,null,0,a.O,[t.h,t.k,t.x],{color:[0,"color"],position:[1,"position"]},null),(n()(),t.Hb(-1,0,["Club:"])),(n()(),t.Hb(25,0,[" "," "])),(n()(),t.pb(26,0,null,0,1,"ion-icon",[["name","create-outline"],["slot","end"]],null,null,null,o.X,o.m)),t.ob(27,49152,null,0,a.D,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(28,0,null,0,7,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.changeCard()&&t),t}),o.bb,o.o)),t.ob(29,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.pb(30,0,null,0,2,"ion-label",[["color","primary"],["position","fixed"]],null,null,null,o.cb,o.r)),t.ob(31,49152,null,0,a.O,[t.h,t.k,t.x],{color:[0,"color"],position:[1,"position"]},null),(n()(),t.Hb(-1,0,["Card number:"])),(n()(),t.Hb(33,0,[" "," "])),(n()(),t.pb(34,0,null,0,1,"ion-icon",[["name","create-outline"],["slot","end"]],null,null,null,o.X,o.m)),t.ob(35,49152,null,0,a.D,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(36,0,null,0,7,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.changeHandicap()&&t),t}),o.bb,o.o)),t.ob(37,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.pb(38,0,null,0,2,"ion-label",[["color","primary"],["position","fixed"]],null,null,null,o.cb,o.r)),t.ob(39,49152,null,0,a.O,[t.h,t.k,t.x],{color:[0,"color"],position:[1,"position"]},null),(n()(),t.Hb(-1,0,["Handicap:"])),(n()(),t.Hb(41,0,[" "," "])),(n()(),t.pb(42,0,null,0,1,"ion-icon",[["name","create-outline"],["slot","end"]],null,null,null,o.X,o.m)),t.ob(43,49152,null,0,a.D,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(44,0,null,0,7,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.changeGender()&&t),t}),o.bb,o.o)),t.ob(45,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.pb(46,0,null,0,2,"ion-label",[["color","primary"],["position","fixed"]],null,null,null,o.cb,o.r)),t.ob(47,49152,null,0,a.O,[t.h,t.k,t.x],{color:[0,"color"],position:[1,"position"]},null),(n()(),t.Hb(-1,0,["Gender:"])),(n()(),t.Hb(49,0,[" "," "])),(n()(),t.pb(50,0,null,0,1,"ion-icon",[["name","create-outline"],["slot","end"]],null,null,null,o.X,o.m)),t.ob(51,49152,null,0,a.D,[t.h,t.k,t.x],{name:[0,"name"]},null),(n()(),t.pb(52,0,null,null,10,"ion-list",[["inset",""]],null,null,null,o.eb,o.s)),t.ob(53,49152,null,0,a.P,[t.h,t.k,t.x],{inset:[0,"inset"]},null),(n()(),t.pb(54,0,null,0,2,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.changePassword()&&t),t}),o.bb,o.o)),t.ob(55,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.Hb(-1,0,["Change Password"])),(n()(),t.pb(57,0,null,0,2,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.support()&&t),t}),o.bb,o.o)),t.ob(58,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.Hb(-1,0,["Support"])),(n()(),t.pb(60,0,null,0,2,"ion-item",[],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.logout()&&t),t}),o.bb,o.o)),t.ob(61,49152,null,0,a.I,[t.h,t.k,t.x],null,null),(n()(),t.Hb(-1,0,["Logout"]))],(function(n,l){n(l,5,0,""),n(l,9,0,"primary","fixed"),n(l,13,0,"create-outline"),n(l,17,0,"primary","fixed"),n(l,23,0,"primary","fixed"),n(l,27,0,"create-outline"),n(l,31,0,"primary","fixed"),n(l,35,0,"create-outline"),n(l,39,0,"primary","fixed"),n(l,43,0,"create-outline"),n(l,47,0,"primary","fixed"),n(l,51,0,"create-outline"),n(l,53,0,"")}),(function(n,l){var e=l.component;n(l,3,0,e.profileData.firstName),n(l,11,0,e.profileData.firstName,e.profileData.lastName),n(l,19,0,e.profileData.email),n(l,25,0,e.profileData.clubName),n(l,33,0,e.profileData.card),n(l,41,0,e.profileData.handicap),n(l,49,0,e.profileData.gender)}))}function d(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,10,"ion-header",[],null,null,null,o.W,o.l)),t.ob(1,49152,null,0,a.C,[t.h,t.k,t.x],null,null),(n()(),t.pb(2,0,null,0,8,"ion-toolbar",[],null,null,null,o.vb,o.K)),t.ob(3,49152,null,0,a.Ab,[t.h,t.k,t.x],null,null),(n()(),t.pb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,o.P,o.e)),t.ob(5,49152,null,0,a.m,[t.h,t.k,t.x],null,null),(n()(),t.pb(6,0,null,0,1,"ion-menu-button",[],null,null,null,o.fb,o.v)),t.ob(7,49152,null,0,a.S,[t.h,t.k,t.x],null,null),(n()(),t.pb(8,0,null,0,2,"ion-title",[],null,null,null,o.tb,o.I)),t.ob(9,49152,null,0,a.yb,[t.h,t.k,t.x],null,null),(n()(),t.Hb(-1,0,["Account"])),(n()(),t.pb(11,0,null,null,3,"ion-content",[],null,null,null,o.U,o.j)),t.ob(12,49152,null,0,a.v,[t.h,t.k,t.x],null,null),(n()(),t.eb(16777216,null,0,1,null,m)),t.ob(14,16384,null,0,i.i,[t.M,t.J],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,14,0,l.component.username)}),null)}var k=t.lb("page-account",b,(function(n){return t.Jb(0,[(n()(),t.pb(0,0,null,null,1,"page-account",[],null,null,null,d,f)),t.ob(1,4243456,null,0,b,[a.b,h.m,s.a,p.a],null,null)],null,null)}),{},{},[]),g=function n(){_classCallCheck(this,n)};e.d(l,"AccountModuleNgFactory",(function(){return v}));var v=t.mb(u,[],(function(n){return t.yb([t.zb(512,t.j,t.X,[[8,[r.a,k]],[3,t.j],t.v]),t.zb(4608,i.k,i.j,[t.s,[2,i.r]]),t.zb(4608,a.c,a.c,[t.x,t.g]),t.zb(4608,a.Fb,a.Fb,[a.c,t.j,t.p]),t.zb(4608,a.Jb,a.Jb,[a.c,t.j,t.p]),t.zb(1073742336,i.b,i.b,[]),t.zb(1073742336,a.Cb,a.Cb,[]),t.zb(1073742336,h.q,h.q,[[2,h.v],[2,h.m]]),t.zb(1073742336,g,g,[]),t.zb(1073742336,u,u,[]),t.zb(1024,h.k,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);