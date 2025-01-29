"use strict";(self["webpackChunkvue_dashboard"]=self["webpackChunkvue_dashboard"]||[]).push([[969],{969:function(t,e,r){r.r(e),r.d(e,{default:function(){return h}});r(1454);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"missions-page"},[e("div",{staticClass:"missions-header"},[e("h1",{staticClass:"page-title"},[t._v("Missions")]),e("div",{staticClass:"header-controls"},[e("div",{staticClass:"search-filter-container"},[e("search-bar",{staticClass:"mission-search",attrs:{placeholder:"Search missions..."},model:{value:t.searchQuery,callback:function(e){t.searchQuery=e},expression:"searchQuery"}}),e("div",{staticClass:"filters"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.difficultyFilter,expression:"difficultyFilter"}],staticClass:"filter-select",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.difficultyFilter=e.target.multiple?r:r[0]}}},[e("option",{attrs:{value:""}},[t._v("All Difficulties")]),e("option",{attrs:{value:"easy"}},[t._v("Easy")]),e("option",{attrs:{value:"medium"}},[t._v("Medium")]),e("option",{attrs:{value:"hard"}},[t._v("Hard")])]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.statusFilter,expression:"statusFilter"}],staticClass:"filter-select",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.statusFilter=e.target.multiple?r:r[0]}}},[e("option",{attrs:{value:""}},[t._v("All Status")]),e("option",{attrs:{value:"available"}},[t._v("Available")]),e("option",{attrs:{value:"in-progress"}},[t._v("In Progress")]),e("option",{attrs:{value:"completed"}},[t._v("Completed")])])])],1)]),e("div",{staticClass:"missions-grid"},t._l(t.filteredMissions,(function(r){return e("div",{key:r.id,staticClass:"mission-card",class:r.status},[e("div",{staticClass:"mission-header"},[e("span",{staticClass:"mission-type",class:r.difficulty},[t._v(" "+t._s(r.difficulty)+" ")]),e("span",{staticClass:"mission-reward"},[e("i",{staticClass:"fas fa-coins"}),t._v(" $"+t._s(r.reward)+" ")])]),e("h3",{staticClass:"mission-title"},[t._v(t._s(r.title))]),e("p",{staticClass:"mission-description"},[t._v(t._s(r.description))]),e("div",{staticClass:"mission-details"},[e("div",{staticClass:"detail-item"},[e("i",{staticClass:"fas fa-clock"}),e("span",[t._v(t._s(r.duration))])]),e("div",{staticClass:"detail-item"},[e("i",{staticClass:"fas fa-calendar-alt"}),e("span",[t._v("Due: "+t._s(r.deadline))])]),e("div",{staticClass:"detail-item"},[e("i",{staticClass:"fas fa-user-friends"}),e("span",[t._v(t._s(r.teamSize)+" team members")])])]),e("div",{staticClass:"required-skills"},[e("h4",[t._v("Required Skills:")]),e("div",{staticClass:"skills-list"},t._l(r.skills,(function(r){return e("span",{key:r,staticClass:"skill-tag"},[t._v(" "+t._s(r)+" ")])})),0)]),e("div",{staticClass:"mission-footer"},["in-progress"===r.status?e("div",{staticClass:"mission-progress"},[e("div",{staticClass:"progress-bar"},[e("div",{staticClass:"progress",style:{width:`${r.progress}%`}})]),e("span",[t._v(t._s(r.progress)+"% Complete")])]):t._e(),e("button",{staticClass:"mission-action-btn",class:t.getActionButtonClass(r.status),on:{click:function(e){return t.handleMissionAction(r)}}},[t._v(" "+t._s(t.getActionButtonText(r.status))+" ")])])])})),0),0===t.filteredMissions.length?e("div",{staticClass:"empty-state"},[e("i",{staticClass:"fas fa-tasks"}),e("h3",[t._v("No missions found")]),e("p",[t._v("Try adjusting your search or filters")])]):t._e()])])},s=[],n=(r(8992),r(4520),function(){var t=this,e=t._self._c;return e("div",{staticClass:"search-container"},[e("div",{staticClass:"search-bar"},[e("i",{staticClass:"fas fa-search search-icon"}),e("input",{staticClass:"search-input",attrs:{type:"text",placeholder:t.placeholder},domProps:{value:t.value},on:{input:function(e){return t.$emit("input",e.target.value)}}}),t.value?e("button",{staticClass:"clear-button",on:{click:t.clearSearch}},[e("i",{staticClass:"fas fa-times"})]):t._e()])])}),a=[],o={name:"SearchBar",props:{value:{type:String,default:""},placeholder:{type:String,default:"Search..."}},methods:{clearSearch(){this.$emit("input","")}}},c=o,l=r(1656),u=(0,l.A)(c,n,a,!1,null,"261f8418",null),d=u.exports,f={name:"MissionsList",components:{SearchBar:d},data(){return{searchQuery:"",difficultyFilter:"",statusFilter:"",missions:[{id:1,title:"E-commerce API Integration",description:"Integrate payment gateway and shipping API for an e-commerce platform",difficulty:"hard",reward:1500,duration:"2 weeks",deadline:"2024-03-20",teamSize:3,status:"available",skills:["Node.js","API Integration","Payment Systems"],progress:0},{id:2,title:"UI Component Library",description:"Create reusable UI components with documentation",difficulty:"medium",reward:800,duration:"1 week",deadline:"2024-03-15",teamSize:2,status:"in-progress",skills:["Vue.js","CSS","Documentation"],progress:60},{id:3,title:"Bug Fixing Sprint",description:"Fix reported bugs in the mobile application",difficulty:"easy",reward:500,duration:"3 days",deadline:"2024-03-10",teamSize:1,status:"completed",skills:["Debugging","Mobile Development"],progress:100}]}},computed:{filteredMissions(){return this.missions.filter((t=>{const e=t.title.toLowerCase().includes(this.searchQuery.toLowerCase())||t.description.toLowerCase().includes(this.searchQuery.toLowerCase()),r=!this.difficultyFilter||t.difficulty===this.difficultyFilter,i=!this.statusFilter||t.status===this.statusFilter;return e&&r&&i}))}},methods:{getActionButtonClass(t){switch(t){case"available":return"accept-btn";case"in-progress":return"submit-btn";case"completed":return"completed-btn";default:return""}},getActionButtonText(t){switch(t){case"available":return"Accept Mission";case"in-progress":return"Submit Work";case"completed":return"View Details";default:return"Take Action"}},handleMissionAction(t){switch(t.status){case"available":console.log("Accepting mission:",t.id);break;case"in-progress":console.log("Submitting work for mission:",t.id);break;case"completed":console.log("Viewing details for mission:",t.id);break}}}},p=f,v=(0,l.A)(p,i,s,!1,null,"6a400ee0",null),h=v.exports},679:function(t,e,r){var i=r(1625),s=TypeError;t.exports=function(t,e){if(i(e,t))return t;throw new s("Incorrect invocation")}},6319:function(t,e,r){var i=r(8551),s=r(9539);t.exports=function(t,e,r,n){try{return n?e(i(r)[0],r[1]):e(r)}catch(a){s(t,"throw",a)}}},2211:function(t,e,r){var i=r(9039);t.exports=!i((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},2529:function(t){t.exports=function(t,e){return{value:t,done:e}}},4659:function(t,e,r){var i=r(3724),s=r(4913),n=r(6980);t.exports=function(t,e,r){i?s.f(t,e,n(0,r)):t[e]=r}},2106:function(t,e,r){var i=r(283),s=r(4913);t.exports=function(t,e,r){return r.get&&i(r.get,e,{getter:!0}),r.set&&i(r.set,e,{setter:!0}),s.f(t,e,r)}},6279:function(t,e,r){var i=r(6840);t.exports=function(t,e,r){for(var s in e)i(t,s,e[s],r);return t}},1767:function(t){t.exports=function(t){return{iterator:t,next:t.next,done:!1}}},397:function(t,e,r){var i=r(7751);t.exports=i("document","documentElement")},9539:function(t,e,r){var i=r(9565),s=r(8551),n=r(5966);t.exports=function(t,e,r){var a,o;s(t);try{if(a=n(t,"return"),!a){if("throw"===e)throw r;return r}a=i(a,t)}catch(c){o=!0,a=c}if("throw"===e)throw r;if(o)throw a;return s(a),r}},9462:function(t,e,r){var i=r(9565),s=r(2360),n=r(6699),a=r(6279),o=r(8227),c=r(1181),l=r(5966),u=r(7657).IteratorPrototype,d=r(2529),f=r(9539),p=o("toStringTag"),v="IteratorHelper",h="WrapForValidIterator",m=c.set,y=function(t){var e=c.getterFor(t?h:v);return a(s(u),{next:function(){var r=e(this);if(t)return r.nextHandler();if(r.done)return d(void 0,!0);try{var i=r.nextHandler();return r.returnHandlerResult?i:d(i,r.done)}catch(s){throw r.done=!0,s}},return:function(){var r=e(this),s=r.iterator;if(r.done=!0,t){var n=l(s,"return");return n?i(n,s):d(void 0,!0)}if(r.inner)try{f(r.inner.iterator,"normal")}catch(a){return f(s,"throw",a)}return s&&f(s,"normal"),d(void 0,!0)}})},g=y(!0),C=y(!1);n(C,p,"Iterator Helper"),t.exports=function(t,e,r){var i=function(i,s){s?(s.iterator=i.iterator,s.next=i.next):s=i,s.type=e?h:v,s.returnHandlerResult=!!r,s.nextHandler=t,s.counter=0,s.done=!1,m(this,s)};return i.prototype=e?g:C,i}},713:function(t,e,r){var i=r(9565),s=r(9306),n=r(8551),a=r(1767),o=r(9462),c=r(6319),l=o((function(){var t=this.iterator,e=n(i(this.next,t)),r=this.done=!!e.done;if(!r)return c(t,this.mapper,[e.value,this.counter++],!0)}));t.exports=function(t){return n(this),s(t),new l(a(this),{mapper:t})}},7657:function(t,e,r){var i,s,n,a=r(9039),o=r(4901),c=r(34),l=r(2360),u=r(2787),d=r(6840),f=r(8227),p=r(6395),v=f("iterator"),h=!1;[].keys&&(n=[].keys(),"next"in n?(s=u(u(n)),s!==Object.prototype&&(i=s)):h=!0);var m=!c(i)||a((function(){var t={};return i[v].call(t)!==t}));m?i={}:p&&(i=l(i)),o(i[v])||d(i,v,(function(){return this})),t.exports={IteratorPrototype:i,BUGGY_SAFARI_ITERATORS:h}},2360:function(t,e,r){var i,s=r(8551),n=r(6801),a=r(8727),o=r(421),c=r(397),l=r(4055),u=r(6119),d=">",f="<",p="prototype",v="script",h=u("IE_PROTO"),m=function(){},y=function(t){return f+v+d+t+f+"/"+v+d},g=function(t){t.write(y("")),t.close();var e=t.parentWindow.Object;return t=null,e},C=function(){var t,e=l("iframe"),r="java"+v+":";return e.style.display="none",c.appendChild(e),e.src=String(r),t=e.contentWindow.document,t.open(),t.write(y("document.F=Object")),t.close(),t.F},_=function(){try{i=new ActiveXObject("htmlfile")}catch(e){}_="undefined"!=typeof document?document.domain&&i?g(i):C():g(i);var t=a.length;while(t--)delete _[p][a[t]];return _()};o[h]=!0,t.exports=Object.create||function(t,e){var r;return null!==t?(m[p]=s(t),r=new m,m[p]=null,r[h]=t):r=_(),void 0===e?r:n.f(r,e)}},6801:function(t,e,r){var i=r(3724),s=r(8686),n=r(4913),a=r(8551),o=r(5397),c=r(1072);e.f=i&&!s?Object.defineProperties:function(t,e){a(t);var r,i=o(e),s=c(e),l=s.length,u=0;while(l>u)n.f(t,r=s[u++],i[r]);return t}},2787:function(t,e,r){var i=r(9297),s=r(4901),n=r(8981),a=r(6119),o=r(2211),c=a("IE_PROTO"),l=Object,u=l.prototype;t.exports=o?l.getPrototypeOf:function(t){var e=n(t);if(i(e,c))return e[c];var r=e.constructor;return s(r)&&e instanceof r?r.prototype:e instanceof l?u:null}},1072:function(t,e,r){var i=r(1828),s=r(8727);t.exports=Object.keys||function(t){return i(t,s)}},8111:function(t,e,r){var i=r(6518),s=r(4576),n=r(679),a=r(8551),o=r(4901),c=r(2787),l=r(2106),u=r(4659),d=r(9039),f=r(9297),p=r(8227),v=r(7657).IteratorPrototype,h=r(3724),m=r(6395),y="constructor",g="Iterator",C=p("toStringTag"),_=TypeError,w=s[g],b=m||!o(w)||w.prototype!==v||!d((function(){w({})})),x=function(){if(n(this,v),c(this)===v)throw new _("Abstract class Iterator not directly constructable")},k=function(t,e){h?l(v,t,{configurable:!0,get:function(){return e},set:function(e){if(a(this),this===v)throw new _("You can't redefine this property");f(this,t)?this[t]=e:u(this,t,e)}}):v[t]=e};f(v,C)||k(C,g),!b&&f(v,y)&&v[y]!==Object||k(y,x),x.prototype=v,i({global:!0,constructor:!0,forced:b},{Iterator:x})},2489:function(t,e,r){var i=r(6518),s=r(9565),n=r(9306),a=r(8551),o=r(1767),c=r(9462),l=r(6319),u=r(6395),d=c((function(){var t,e,r,i=this.iterator,n=this.predicate,o=this.next;while(1){if(t=a(s(o,i)),e=this.done=!!t.done,e)return;if(r=t.value,l(i,n,[r,this.counter++],!0))return r}}));i({target:"Iterator",proto:!0,real:!0,forced:u},{filter:function(t){return a(this),n(t),new d(o(this),{predicate:t})}})},1701:function(t,e,r){var i=r(6518),s=r(713),n=r(6395);i({target:"Iterator",proto:!0,real:!0,forced:n},{map:s})},8992:function(t,e,r){r(8111)},4520:function(t,e,r){r(2489)},1454:function(t,e,r){r(1701)}}]);
//# sourceMappingURL=969.d33fba80.js.map