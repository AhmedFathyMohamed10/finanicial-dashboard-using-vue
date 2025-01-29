"use strict";(self["webpackChunkvue_dashboard"]=self["webpackChunkvue_dashboard"]||[]).push([[0],{6e3:function(t,e,r){r.r(e),r.d(e,{default:function(){return l}});r(1454);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"projects-page"},[e("div",{staticClass:"projects-header"},[e("h1",{staticClass:"page-title"},[t._v("Projects")]),e("div",{staticClass:"header-controls"},[e("div",{staticClass:"controls-left"},[e("div",{staticClass:"search-container"},[e("i",{staticClass:"fas fa-search search-icon"}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchQuery,expression:"searchQuery"}],staticClass:"search-input",attrs:{type:"text",placeholder:"Search projects..."},domProps:{value:t.searchQuery},on:{input:function(e){e.target.composing||(t.searchQuery=e.target.value)}}}),t.searchQuery?e("button",{staticClass:"clear-search",on:{click:t.clearSearch}},[e("i",{staticClass:"fas fa-times"})]):t._e()]),e("div",{staticClass:"filters-container"},[e("div",{staticClass:"filter-group"},[e("label",[t._v("Status")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.statusFilter,expression:"statusFilter"}],staticClass:"filter-select",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.statusFilter=e.target.multiple?r:r[0]}}},[e("option",{attrs:{value:""}},[t._v("All Status")]),e("option",{attrs:{value:"active"}},[t._v("Active")]),e("option",{attrs:{value:"completed"}},[t._v("Completed")]),e("option",{attrs:{value:"on-hold"}},[t._v("On Hold")])])]),e("div",{staticClass:"filter-group"},[e("label",[t._v("Sort By")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.sortBy,expression:"sortBy"}],staticClass:"filter-select",on:{change:function(e){var r=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.sortBy=e.target.multiple?r:r[0]}}},[e("option",{attrs:{value:"newest"}},[t._v("Newest First")]),e("option",{attrs:{value:"oldest"}},[t._v("Oldest First")]),e("option",{attrs:{value:"deadline"}},[t._v("Deadline")])])])])]),t._m(0)])]),e("div",{staticClass:"projects-grid"},t._l(t.filteredProjects,(function(r){return e("div",{key:r.id,staticClass:"project-card",class:r.status.toLowerCase()},[e("div",{staticClass:"project-header"},[e("div",{staticClass:"project-status"},[t._v(t._s(r.status))]),t._m(1,!0)]),e("h3",{staticClass:"project-title"},[t._v(t._s(r.title))]),e("p",{staticClass:"project-description"},[t._v(t._s(r.description))]),e("div",{staticClass:"project-details"},[e("div",{staticClass:"detail-item"},[e("i",{staticClass:"fas fa-calendar"}),e("span",[t._v("Deadline: "+t._s(r.deadline))])]),e("div",{staticClass:"detail-item"},[e("i",{staticClass:"fas fa-tasks"}),e("span",[t._v("Tasks: "+t._s(r.completedTasks)+"/"+t._s(r.totalTasks))])]),e("div",{staticClass:"detail-item"},[e("i",{staticClass:"fas fa-dollar-sign"}),e("span",[t._v("Budget: $"+t._s(r.budget))])])]),e("div",{staticClass:"project-team"},[e("div",{staticClass:"team-members"},t._l(r.team,(function(t){return e("img",{key:t.id,attrs:{src:t.avatar,alt:t.name,title:t.name}})})),0),e("div",{staticClass:"progress-bar"},[e("div",{staticClass:"progress",class:t.getProgressClass(r.progress),style:{width:`${r.progress}%`}})])])])})),0),0===t.filteredProjects.length?e("div",{staticClass:"empty-state"},[e("i",{staticClass:"fas fa-project-diagram"}),e("h3",[t._v("No projects found")]),e("p",[t._v("Try adjusting your search or filters")])]):t._e()])},n=[function(){var t=this,e=t._self._c;return e("button",{staticClass:"new-project-btn"},[e("i",{staticClass:"fas fa-plus"}),e("span",[t._v("New Project")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"project-actions"},[e("button",{staticClass:"action-btn"},[e("i",{staticClass:"fas fa-edit"})]),e("button",{staticClass:"action-btn"},[e("i",{staticClass:"fas fa-trash"})])])}],s=(r(8992),r(4520),{name:"ProjectsList",data(){return{searchQuery:"",statusFilter:"",sortBy:"newest",projects:[{id:1,title:"E-commerce Website Redesign",description:"Redesigning the main e-commerce platform with modern UI/UX principles",status:"Active",deadline:"2024-03-15",completedTasks:8,totalTasks:15,budget:"12,000",progress:65,team:[{id:1,name:"John Doe",avatar:"path/to/avatar1.jpg"},{id:2,name:"Jane Smith",avatar:"path/to/avatar2.jpg"},{id:3,name:"Mike Johnson",avatar:"path/to/avatar3.jpg"}]},{id:2,title:"Mobile App Development",description:"Creating a new mobile application for iOS and Android platforms",status:"On Hold",deadline:"2024-04-20",completedTasks:3,totalTasks:12,budget:"20,000",progress:25,team:[{id:4,name:"Sarah Wilson",avatar:"path/to/avatar4.jpg"},{id:5,name:"Tom Brown",avatar:"path/to/avatar5.jpg"}]},{id:3,title:"CRM Integration",description:"Integrating new CRM system with existing infrastructure",status:"Completed",deadline:"2024-02-28",completedTasks:10,totalTasks:10,budget:"8,000",progress:100,team:[{id:6,name:"Alice Green",avatar:"path/to/avatar6.jpg"},{id:7,name:"Bob White",avatar:"path/to/avatar7.jpg"}]}]}},computed:{filteredProjects(){return this.projects.filter((t=>{const e=t.title.toLowerCase().includes(this.searchQuery.toLowerCase())||t.description.toLowerCase().includes(this.searchQuery.toLowerCase()),r=!this.statusFilter||t.status.toLowerCase()===this.statusFilter;return e&&r})).sort(((t,e)=>{switch(this.sortBy){case"oldest":return new Date(t.deadline)-new Date(e.deadline);case"deadline":return new Date(t.deadline)-new Date(e.deadline);default:return new Date(e.deadline)-new Date(t.deadline)}}))}},methods:{getProgressClass(t){return t<30?"low":t<70?"medium":"high"}}}),i=s,o=r(1656),c=(0,o.A)(i,a,n,!1,null,"37440b9a",null),l=c.exports},679:function(t,e,r){var a=r(1625),n=TypeError;t.exports=function(t,e){if(a(e,t))return t;throw new n("Incorrect invocation")}},6319:function(t,e,r){var a=r(8551),n=r(9539);t.exports=function(t,e,r,s){try{return s?e(a(r)[0],r[1]):e(r)}catch(i){n(t,"throw",i)}}},2211:function(t,e,r){var a=r(9039);t.exports=!a((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},2529:function(t){t.exports=function(t,e){return{value:t,done:e}}},4659:function(t,e,r){var a=r(3724),n=r(4913),s=r(6980);t.exports=function(t,e,r){a?n.f(t,e,s(0,r)):t[e]=r}},2106:function(t,e,r){var a=r(283),n=r(4913);t.exports=function(t,e,r){return r.get&&a(r.get,e,{getter:!0}),r.set&&a(r.set,e,{setter:!0}),n.f(t,e,r)}},6279:function(t,e,r){var a=r(6840);t.exports=function(t,e,r){for(var n in e)a(t,n,e[n],r);return t}},1767:function(t){t.exports=function(t){return{iterator:t,next:t.next,done:!1}}},397:function(t,e,r){var a=r(7751);t.exports=a("document","documentElement")},9539:function(t,e,r){var a=r(9565),n=r(8551),s=r(5966);t.exports=function(t,e,r){var i,o;n(t);try{if(i=s(t,"return"),!i){if("throw"===e)throw r;return r}i=a(i,t)}catch(c){o=!0,i=c}if("throw"===e)throw r;if(o)throw i;return n(i),r}},9462:function(t,e,r){var a=r(9565),n=r(2360),s=r(6699),i=r(6279),o=r(8227),c=r(1181),l=r(5966),u=r(7657).IteratorPrototype,d=r(2529),p=r(9539),f=o("toStringTag"),v="IteratorHelper",h="WrapForValidIterator",m=c.set,g=function(t){var e=c.getterFor(t?h:v);return i(n(u),{next:function(){var r=e(this);if(t)return r.nextHandler();if(r.done)return d(void 0,!0);try{var a=r.nextHandler();return r.returnHandlerResult?a:d(a,r.done)}catch(n){throw r.done=!0,n}},return:function(){var r=e(this),n=r.iterator;if(r.done=!0,t){var s=l(n,"return");return s?a(s,n):d(void 0,!0)}if(r.inner)try{p(r.inner.iterator,"normal")}catch(i){return p(n,"throw",i)}return n&&p(n,"normal"),d(void 0,!0)}})},C=g(!0),w=g(!1);s(w,f,"Iterator Helper"),t.exports=function(t,e,r){var a=function(a,n){n?(n.iterator=a.iterator,n.next=a.next):n=a,n.type=e?h:v,n.returnHandlerResult=!!r,n.nextHandler=t,n.counter=0,n.done=!1,m(this,n)};return a.prototype=e?C:w,a}},713:function(t,e,r){var a=r(9565),n=r(9306),s=r(8551),i=r(1767),o=r(9462),c=r(6319),l=o((function(){var t=this.iterator,e=s(a(this.next,t)),r=this.done=!!e.done;if(!r)return c(t,this.mapper,[e.value,this.counter++],!0)}));t.exports=function(t){return s(this),n(t),new l(i(this),{mapper:t})}},7657:function(t,e,r){var a,n,s,i=r(9039),o=r(4901),c=r(34),l=r(2360),u=r(2787),d=r(6840),p=r(8227),f=r(6395),v=p("iterator"),h=!1;[].keys&&(s=[].keys(),"next"in s?(n=u(u(s)),n!==Object.prototype&&(a=n)):h=!0);var m=!c(a)||i((function(){var t={};return a[v].call(t)!==t}));m?a={}:f&&(a=l(a)),o(a[v])||d(a,v,(function(){return this})),t.exports={IteratorPrototype:a,BUGGY_SAFARI_ITERATORS:h}},2360:function(t,e,r){var a,n=r(8551),s=r(6801),i=r(8727),o=r(421),c=r(397),l=r(4055),u=r(6119),d=">",p="<",f="prototype",v="script",h=u("IE_PROTO"),m=function(){},g=function(t){return p+v+d+t+p+"/"+v+d},C=function(t){t.write(g("")),t.close();var e=t.parentWindow.Object;return t=null,e},w=function(){var t,e=l("iframe"),r="java"+v+":";return e.style.display="none",c.appendChild(e),e.src=String(r),t=e.contentWindow.document,t.open(),t.write(g("document.F=Object")),t.close(),t.F},y=function(){try{a=new ActiveXObject("htmlfile")}catch(e){}y="undefined"!=typeof document?document.domain&&a?C(a):w():C(a);var t=i.length;while(t--)delete y[f][i[t]];return y()};o[h]=!0,t.exports=Object.create||function(t,e){var r;return null!==t?(m[f]=n(t),r=new m,m[f]=null,r[h]=t):r=y(),void 0===e?r:s.f(r,e)}},6801:function(t,e,r){var a=r(3724),n=r(8686),s=r(4913),i=r(8551),o=r(5397),c=r(1072);e.f=a&&!n?Object.defineProperties:function(t,e){i(t);var r,a=o(e),n=c(e),l=n.length,u=0;while(l>u)s.f(t,r=n[u++],a[r]);return t}},2787:function(t,e,r){var a=r(9297),n=r(4901),s=r(8981),i=r(6119),o=r(2211),c=i("IE_PROTO"),l=Object,u=l.prototype;t.exports=o?l.getPrototypeOf:function(t){var e=s(t);if(a(e,c))return e[c];var r=e.constructor;return n(r)&&e instanceof r?r.prototype:e instanceof l?u:null}},1072:function(t,e,r){var a=r(1828),n=r(8727);t.exports=Object.keys||function(t){return a(t,n)}},8111:function(t,e,r){var a=r(6518),n=r(4576),s=r(679),i=r(8551),o=r(4901),c=r(2787),l=r(2106),u=r(4659),d=r(9039),p=r(9297),f=r(8227),v=r(7657).IteratorPrototype,h=r(3724),m=r(6395),g="constructor",C="Iterator",w=f("toStringTag"),y=TypeError,_=n[C],j=m||!o(_)||_.prototype!==v||!d((function(){_({})})),b=function(){if(s(this,v),c(this)===v)throw new y("Abstract class Iterator not directly constructable")},x=function(t,e){h?l(v,t,{configurable:!0,get:function(){return e},set:function(e){if(i(this),this===v)throw new y("You can't redefine this property");p(this,t)?this[t]=e:u(this,t,e)}}):v[t]=e};p(v,w)||x(w,C),!j&&p(v,g)&&v[g]!==Object||x(g,b),b.prototype=v,a({global:!0,constructor:!0,forced:j},{Iterator:b})},2489:function(t,e,r){var a=r(6518),n=r(9565),s=r(9306),i=r(8551),o=r(1767),c=r(9462),l=r(6319),u=r(6395),d=c((function(){var t,e,r,a=this.iterator,s=this.predicate,o=this.next;while(1){if(t=i(n(o,a)),e=this.done=!!t.done,e)return;if(r=t.value,l(a,s,[r,this.counter++],!0))return r}}));a({target:"Iterator",proto:!0,real:!0,forced:u},{filter:function(t){return i(this),s(t),new d(o(this),{predicate:t})}})},1701:function(t,e,r){var a=r(6518),n=r(713),s=r(6395);a({target:"Iterator",proto:!0,real:!0,forced:s},{map:n})},8992:function(t,e,r){r(8111)},4520:function(t,e,r){r(2489)},1454:function(t,e,r){r(1701)}}]);
//# sourceMappingURL=0.1878912a.js.map