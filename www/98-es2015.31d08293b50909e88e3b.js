(window.webpackJsonp=window.webpackJsonp||[]).push([[98],{"/yGZ":function(l,n,u){"use strict";u.r(n);var o=u("8Y7J");class e{}var i=u("pMnS"),t=u("MKJQ"),r=u("sZkV"),s=u("s7LF"),a=u("X+KH"),b=u("VRTQ");class d{constructor(l,n,u){this.userData=l,this.restClient=n,this.router=u,this.login={username:"",password:""},this.submitted=!1,this.invalidCredentials=!1,this.jwtToken=""}onLogin(l){this.submitted=!0,l.valid&&(this.restClient.presentLoader(),this.restClient.login(this.login.username,this.login.password).subscribe(l=>{this.jwtToken=l.token,console.log("Login returned ",this.jwtToken),this.restClient.me(this.jwtToken).subscribe(l=>{this.userData.login(l.id,this.jwtToken),this.router.navigateByUrl("/app/tabs/leaderboard-list")},l=>{console.error("Me error",l.error.error),this.restClient.dismissLoader()},()=>{this.restClient.dismissLoader(),console.log("Me success")})},l=>{this.restClient.dismissLoader(),console.error("Login error",l.error.error),this.invalidCredentials=!0},()=>{this.restClient.dismissLoader(),console.log("Login success")}))}onSignup(){this.router.navigateByUrl("/signup")}}var g=u("iInd"),c=o.nb({encapsulation:0,styles:[[".login-logo[_ngcontent-%COMP%]{padding:20px 0;min-height:200px;text-align:center}.login-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:300px}.list[_ngcontent-%COMP%]{margin-bottom:0}"]],data:{}});function p(l){return o.Jb(0,[(l()(),o.pb(0,0,null,null,10,"ion-header",[],null,null,null,t.W,t.l)),o.ob(1,49152,null,0,r.C,[o.h,o.k,o.x],null,null),(l()(),o.pb(2,0,null,0,8,"ion-toolbar",[],null,null,null,t.vb,t.K)),o.ob(3,49152,null,0,r.Ab,[o.h,o.k,o.x],null,null),(l()(),o.pb(4,0,null,0,3,"ion-buttons",[["slot","start"]],null,null,null,t.P,t.e)),o.ob(5,49152,null,0,r.m,[o.h,o.k,o.x],null,null),(l()(),o.pb(6,0,null,0,1,"ion-menu-button",[],null,null,null,t.fb,t.v)),o.ob(7,49152,null,0,r.S,[o.h,o.k,o.x],null,null),(l()(),o.pb(8,0,null,0,2,"ion-title",[],null,null,null,t.tb,t.I)),o.ob(9,49152,null,0,r.yb,[o.h,o.k,o.x],null,null),(l()(),o.Hb(-1,0,["Login"])),(l()(),o.pb(11,0,null,null,62,"ion-content",[],null,null,null,t.U,t.j)),o.ob(12,49152,null,0,r.v,[o.h,o.k,o.x],null,null),(l()(),o.pb(13,0,null,0,1,"div",[["class","login-logo"]],null,null,null,null,null)),(l()(),o.pb(14,0,null,null,0,"img",[["alt","Ionic logo"],["src","assets/img/golfscoring-logo.svg"]],null,null,null,null,null)),(l()(),o.pb(15,0,null,0,58,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,u){var e=!0;return"submit"===n&&(e=!1!==o.Bb(l,17).onSubmit(u)&&e),"reset"===n&&(e=!1!==o.Bb(l,17).onReset()&&e),e}),null,null)),o.ob(16,16384,null,0,s.m,[],null,null),o.ob(17,4210688,[["loginForm",4]],0,s.h,[[8,null],[8,null]],null,null),o.Eb(2048,null,s.a,null,[s.h]),o.ob(19,16384,null,0,s.g,[[4,s.a]],null,null),(l()(),o.pb(20,0,null,null,41,"ion-list",[],null,null,null,t.eb,t.s)),o.ob(21,49152,null,0,r.P,[o.h,o.k,o.x],null,null),(l()(),o.pb(22,0,null,0,13,"ion-item",[],null,null,null,t.bb,t.o)),o.ob(23,49152,null,0,r.I,[o.h,o.k,o.x],null,null),(l()(),o.pb(24,0,null,0,2,"ion-label",[["color","primary"],["position","stacked"]],null,null,null,t.cb,t.r)),o.ob(25,49152,null,0,r.O,[o.h,o.k,o.x],{color:[0,"color"],position:[1,"position"]},null),(l()(),o.Hb(-1,0,["Username"])),(l()(),o.pb(27,0,null,0,8,"ion-input",[["autocapitalize","off"],["name","username"],["required",""],["spellcheck","false"],["type","text"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var e=!0,i=l.component;return"ionBlur"===n&&(e=!1!==o.Bb(l,30)._handleBlurEvent(u.target)&&e),"ionChange"===n&&(e=!1!==o.Bb(l,30)._handleInputEvent(u.target)&&e),"ngModelChange"===n&&(e=!1!==(i.login.username=u)&&e),e}),t.Y,t.n)),o.ob(28,16384,null,0,s.j,[],{required:[0,"required"]},null),o.Eb(1024,null,s.c,(function(l){return[l]}),[s.j]),o.ob(30,16384,null,0,r.Mb,[o.k],null,null),o.Eb(1024,null,s.d,(function(l){return[l]}),[r.Mb]),o.ob(32,671744,[["username",4]],0,s.i,[[2,s.a],[6,s.c],[8,null],[6,s.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),o.Eb(2048,null,s.e,null,[s.i]),o.ob(34,16384,null,0,s.f,[[4,s.e]],null,null),o.ob(35,49152,null,0,r.H,[o.h,o.k,o.x],{autocapitalize:[0,"autocapitalize"],name:[1,"name"],required:[2,"required"],spellcheck:[3,"spellcheck"],type:[4,"type"]},null),(l()(),o.pb(36,0,null,0,3,"ion-text",[["color","danger"]],null,null,null,t.rb,t.G)),o.ob(37,49152,null,0,r.vb,[o.h,o.k,o.x],{color:[0,"color"]},null),(l()(),o.pb(38,0,null,0,1,"p",[["class","ion-padding-start"]],[[8,"hidden",0]],null,null,null,null)),(l()(),o.Hb(-1,null,[" Username is required "])),(l()(),o.pb(40,0,null,0,13,"ion-item",[],null,null,null,t.bb,t.o)),o.ob(41,49152,null,0,r.I,[o.h,o.k,o.x],null,null),(l()(),o.pb(42,0,null,0,2,"ion-label",[["color","primary"],["position","stacked"]],null,null,null,t.cb,t.r)),o.ob(43,49152,null,0,r.O,[o.h,o.k,o.x],{color:[0,"color"],position:[1,"position"]},null),(l()(),o.Hb(-1,0,["Password"])),(l()(),o.pb(45,0,null,0,8,"ion-input",[["name","password"],["required",""],["type","password"]],[[1,"required",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var e=!0,i=l.component;return"ionBlur"===n&&(e=!1!==o.Bb(l,48)._handleBlurEvent(u.target)&&e),"ionChange"===n&&(e=!1!==o.Bb(l,48)._handleInputEvent(u.target)&&e),"ngModelChange"===n&&(e=!1!==(i.login.password=u)&&e),e}),t.Y,t.n)),o.ob(46,16384,null,0,s.j,[],{required:[0,"required"]},null),o.Eb(1024,null,s.c,(function(l){return[l]}),[s.j]),o.ob(48,16384,null,0,r.Mb,[o.k],null,null),o.Eb(1024,null,s.d,(function(l){return[l]}),[r.Mb]),o.ob(50,671744,[["password",4]],0,s.i,[[2,s.a],[6,s.c],[8,null],[6,s.d]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),o.Eb(2048,null,s.e,null,[s.i]),o.ob(52,16384,null,0,s.f,[[4,s.e]],null,null),o.ob(53,49152,null,0,r.H,[o.h,o.k,o.x],{name:[0,"name"],required:[1,"required"],type:[2,"type"]},null),(l()(),o.pb(54,0,null,0,3,"ion-text",[["color","danger"]],null,null,null,t.rb,t.G)),o.ob(55,49152,null,0,r.vb,[o.h,o.k,o.x],{color:[0,"color"]},null),(l()(),o.pb(56,0,null,0,1,"p",[["class","ion-padding-start"]],[[8,"hidden",0]],null,null,null,null)),(l()(),o.Hb(-1,null,[" Password is required "])),(l()(),o.pb(58,0,null,0,3,"ion-text",[["color","danger"]],null,null,null,t.rb,t.G)),o.ob(59,49152,null,0,r.vb,[o.h,o.k,o.x],{color:[0,"color"]},null),(l()(),o.pb(60,0,null,0,1,"p",[["class","ion-padding-start"]],[[8,"hidden",0]],null,null,null,null)),(l()(),o.Hb(-1,null,[" You provided an invalid username or password "])),(l()(),o.pb(62,0,null,null,11,"ion-row",[],null,null,null,t.ib,t.x)),o.ob(63,49152,null,0,r.hb,[o.h,o.k,o.x],null,null),(l()(),o.pb(64,0,null,0,4,"ion-col",[],null,null,null,t.T,t.i)),o.ob(65,49152,null,0,r.u,[o.h,o.k,o.x],null,null),(l()(),o.pb(66,0,null,0,2,"ion-button",[["expand","block"],["type","submit"]],null,[[null,"click"]],(function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.onLogin(o.Bb(l,17))&&e),e}),t.O,t.d)),o.ob(67,49152,null,0,r.l,[o.h,o.k,o.x],{expand:[0,"expand"],type:[1,"type"]},null),(l()(),o.Hb(-1,0,["Login"])),(l()(),o.pb(69,0,null,0,4,"ion-col",[],null,null,null,t.T,t.i)),o.ob(70,49152,null,0,r.u,[o.h,o.k,o.x],null,null),(l()(),o.pb(71,0,null,0,2,"ion-button",[["color","light"],["expand","block"]],null,[[null,"click"]],(function(l,n,u){var o=!0;return"click"===n&&(o=!1!==l.component.onSignup()&&o),o}),t.O,t.d)),o.ob(72,49152,null,0,r.l,[o.h,o.k,o.x],{color:[0,"color"],expand:[1,"expand"]},null),(l()(),o.Hb(-1,0,["Signup"]))],(function(l,n){var u=n.component;l(n,25,0,"primary","stacked"),l(n,28,0,""),l(n,32,0,"username",u.login.username),l(n,35,0,"off","username","","false","text"),l(n,37,0,"danger"),l(n,43,0,"primary","stacked"),l(n,46,0,""),l(n,50,0,"password",u.login.password),l(n,53,0,"password","","password"),l(n,55,0,"danger"),l(n,59,0,"danger"),l(n,67,0,"block","submit"),l(n,72,0,"light","block")}),(function(l,n){var u=n.component;l(n,15,0,o.Bb(n,19).ngClassUntouched,o.Bb(n,19).ngClassTouched,o.Bb(n,19).ngClassPristine,o.Bb(n,19).ngClassDirty,o.Bb(n,19).ngClassValid,o.Bb(n,19).ngClassInvalid,o.Bb(n,19).ngClassPending),l(n,27,0,o.Bb(n,28).required?"":null,o.Bb(n,34).ngClassUntouched,o.Bb(n,34).ngClassTouched,o.Bb(n,34).ngClassPristine,o.Bb(n,34).ngClassDirty,o.Bb(n,34).ngClassValid,o.Bb(n,34).ngClassInvalid,o.Bb(n,34).ngClassPending),l(n,38,0,o.Bb(n,32).valid||0==u.submitted),l(n,45,0,o.Bb(n,46).required?"":null,o.Bb(n,52).ngClassUntouched,o.Bb(n,52).ngClassTouched,o.Bb(n,52).ngClassPristine,o.Bb(n,52).ngClassDirty,o.Bb(n,52).ngClassValid,o.Bb(n,52).ngClassInvalid,o.Bb(n,52).ngClassPending),l(n,56,0,o.Bb(n,50).valid||0==u.submitted),l(n,60,0,!u.invalidCredentials)}))}function h(l){return o.Jb(0,[(l()(),o.pb(0,0,null,null,1,"page-login",[],null,null,null,p,c)),o.ob(1,49152,null,0,d,[a.a,b.a,g.m],null,null)],null,null)}var m=o.lb("page-login",d,h,{},{},[]),k=u("SVse");class C{}u.d(n,"LoginModuleNgFactory",(function(){return v}));var v=o.mb(e,[],(function(l){return o.yb([o.zb(512,o.j,o.X,[[8,[i.a,m]],[3,o.j],o.v]),o.zb(4608,k.k,k.j,[o.s,[2,k.r]]),o.zb(4608,s.l,s.l,[]),o.zb(4608,r.c,r.c,[o.x,o.g]),o.zb(4608,r.Fb,r.Fb,[r.c,o.j,o.p]),o.zb(4608,r.Jb,r.Jb,[r.c,o.j,o.p]),o.zb(1073742336,k.b,k.b,[]),o.zb(1073742336,s.k,s.k,[]),o.zb(1073742336,s.b,s.b,[]),o.zb(1073742336,r.Cb,r.Cb,[]),o.zb(1073742336,g.q,g.q,[[2,g.v],[2,g.m]]),o.zb(1073742336,C,C,[]),o.zb(1073742336,e,e,[]),o.zb(1024,g.k,(function(){return[[{path:"",component:d}]]}),[])])}))}}]);