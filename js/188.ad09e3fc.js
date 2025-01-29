"use strict";(self["webpackChunkvue_dashboard"]=self["webpackChunkvue_dashboard"]||[]).push([[188],{8188:function(t,e,a){a.r(e),a.d(e,{default:function(){return l}});a(1454);var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"feedback-page"},[e("div",{staticClass:"feedback-header"},[e("h1",{staticClass:"page-title"},[t._v("Feedback & Reviews")]),e("div",{staticClass:"feedback-stats"},[t._m(0),e("div",{staticClass:"stat-card"},[e("div",{staticClass:"stat-value"},[t._v(t._s(t.totalReviews))]),e("div",{staticClass:"stat-label"},[t._v("Total Reviews")])]),t._m(1)])]),e("div",{staticClass:"feedback-filters"},[e("div",{staticClass:"search-box"},[e("i",{staticClass:"fas fa-search"}),e("input",{directives:[{name:"model",rawName:"v-model",value:t.searchQuery,expression:"searchQuery"}],attrs:{type:"text",placeholder:"Search feedback..."},domProps:{value:t.searchQuery},on:{input:function(e){e.target.composing||(t.searchQuery=e.target.value)}}})]),e("div",{staticClass:"filter-controls"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.projectFilter,expression:"projectFilter"}],staticClass:"filter-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.projectFilter=e.target.multiple?a:a[0]}}},[e("option",{attrs:{value:""}},[t._v("All Projects")]),t._l(t.projects,(function(a){return e("option",{key:a,domProps:{value:a}},[t._v(" "+t._s(a)+" ")])}))],2),e("select",{directives:[{name:"model",rawName:"v-model",value:t.ratingFilter,expression:"ratingFilter"}],staticClass:"filter-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.ratingFilter=e.target.multiple?a:a[0]}}},[e("option",{attrs:{value:""}},[t._v("All Ratings")]),e("option",{attrs:{value:"5"}},[t._v("5 Stars")]),e("option",{attrs:{value:"4"}},[t._v("4 Stars")]),e("option",{attrs:{value:"3"}},[t._v("3 Stars")]),e("option",{attrs:{value:"2"}},[t._v("2 Stars")]),e("option",{attrs:{value:"1"}},[t._v("1 Star")])]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.sortBy,expression:"sortBy"}],staticClass:"filter-select",on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.sortBy=e.target.multiple?a:a[0]}}},[e("option",{attrs:{value:"newest"}},[t._v("Newest First")]),e("option",{attrs:{value:"oldest"}},[t._v("Oldest First")]),e("option",{attrs:{value:"highest"}},[t._v("Highest Rated")]),e("option",{attrs:{value:"lowest"}},[t._v("Lowest Rated")])])])]),e("div",{staticClass:"feedback-list"},t._l(t.filteredFeedback,(function(a){return e("div",{key:a.id,staticClass:"feedback-card",class:t.getRatingClass(a.rating)},[e("div",{staticClass:"feedback-header"},[e("div",{staticClass:"user-info"},[e("img",{staticClass:"user-avatar",attrs:{src:a.userAvatar,alt:a.userName}}),e("div",{staticClass:"user-details"},[e("h3",{staticClass:"user-name"},[t._v(t._s(a.userName))]),e("span",{staticClass:"project-name"},[t._v(t._s(a.project))])])]),e("div",{staticClass:"feedback-meta"},[e("div",{staticClass:"rating-stars"},t._l(5,(function(t){return e("i",{key:t,staticClass:"fas",class:t<=a.rating?"fa-star":"fa-star-o"})})),0),e("span",{staticClass:"feedback-date"},[t._v(t._s(t.formatDate(a.date)))])])]),e("div",{staticClass:"feedback-content"},[e("p",{staticClass:"feedback-text"},[t._v(t._s(a.comment))]),a.images&&a.images.length?e("div",{staticClass:"feedback-images"},t._l(a.images,(function(a,r){return e("img",{key:r,attrs:{src:a,alt:"Feedback attachment"},on:{click:function(e){return t.openImage(a)}}})})),0):t._e()]),e("div",{staticClass:"feedback-footer"},[e("div",{staticClass:"feedback-tags"},t._l(a.tags,(function(a){return e("span",{key:a,staticClass:"tag"},[t._v(" "+t._s(a)+" ")])})),0),e("div",{staticClass:"feedback-actions"},[e("button",{staticClass:"action-btn",on:{click:function(e){return t.handleReply(a)}}},[e("i",{staticClass:"fas fa-reply"}),t._v(" Reply ")]),e("button",{staticClass:"action-btn",class:{"helpful-active":a.isHelpful},on:{click:function(e){return t.toggleHelpful(a)}}},[e("i",{staticClass:"fas fa-thumbs-up"}),t._v(" Helpful ("+t._s(a.helpfulCount)+") ")])])]),a.replies&&a.replies.length?e("div",{staticClass:"replies-section"},t._l(a.replies,(function(a){return e("div",{key:a.id,staticClass:"reply-card"},[e("div",{staticClass:"reply-header"},[e("img",{staticClass:"reply-avatar",attrs:{src:a.userAvatar,alt:a.userName}}),e("div",{staticClass:"reply-details"},[e("span",{staticClass:"reply-name"},[t._v(t._s(a.userName))]),e("span",{staticClass:"reply-date"},[t._v(t._s(t.formatDate(a.date)))])])]),e("p",{staticClass:"reply-text"},[t._v(t._s(a.text))])])})),0):t._e()])})),0),0===t.filteredFeedback.length?e("div",{staticClass:"empty-state"},[e("i",{staticClass:"fas fa-comments"}),e("h3",[t._v("No feedback found")]),e("p",[t._v("Try adjusting your search or filters")])]):t._e()])},s=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"stat-card"},[e("div",{staticClass:"stat-value"},[e("span",{staticClass:"rating"},[t._v("4.8")]),e("div",{staticClass:"stars"},[e("i",{staticClass:"fas fa-star"}),e("i",{staticClass:"fas fa-star"}),e("i",{staticClass:"fas fa-star"}),e("i",{staticClass:"fas fa-star"}),e("i",{staticClass:"fas fa-star-half-alt"})])]),e("div",{staticClass:"stat-label"},[t._v("Average Rating")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"stat-card"},[e("div",{staticClass:"stat-value"},[t._v("92%")]),e("div",{staticClass:"stat-label"},[t._v("Satisfaction Rate")])])}],n=(a(8992),a(4520),{name:"FeedbackList",data(){return{searchQuery:"",projectFilter:"",ratingFilter:"",sortBy:"newest",projects:["Website Redesign","Mobile App","CRM Integration","E-commerce Platform"],feedback:[{id:1,userName:"John Doe",userAvatar:"path/to/avatar1.jpg",project:"Website Redesign",rating:5,date:"2024-01-25",comment:"Excellent work on the website redesign! The new interface is intuitive and user-friendly. Really impressed with the attention to detail.",tags:["UI/UX","Design","Responsive"],helpfulCount:12,isHelpful:!1,images:["path/to/image1.jpg","path/to/image2.jpg"],replies:[{id:1,userName:"Project Manager",userAvatar:"path/to/pm-avatar.jpg",date:"2024-01-26",text:"Thank you for your detailed feedback! We're glad you're satisfied with the results."}]}]}},computed:{totalReviews(){return this.feedback.length},filteredFeedback(){return this.feedback.filter((t=>{const e=t.comment.toLowerCase().includes(this.searchQuery.toLowerCase())||t.userName.toLowerCase().includes(this.searchQuery.toLowerCase()),a=!this.projectFilter||t.project===this.projectFilter,r=!this.ratingFilter||t.rating===parseInt(this.ratingFilter);return e&&a&&r})).sort(((t,e)=>{switch(this.sortBy){case"oldest":return new Date(t.date)-new Date(e.date);case"highest":return e.rating-t.rating;case"lowest":return t.rating-e.rating;default:return new Date(e.date)-new Date(t.date)}}))}},methods:{formatDate(t){return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})},getRatingClass(t){return t>=4?"high-rating":t>=3?"medium-rating":"low-rating"},handleReply(t){console.log("Reply to feedback:",t.id)},toggleHelpful(t){t.isHelpful=!t.isHelpful,t.helpfulCount+=t.isHelpful?1:-1},openImage(t){console.log("Open image:",t)}}}),i=n,o=a(1656),c=(0,o.A)(i,r,s,!1,null,"5208b49c",null),l=c.exports},679:function(t,e,a){var r=a(1625),s=TypeError;t.exports=function(t,e){if(r(e,t))return t;throw new s("Incorrect invocation")}},6319:function(t,e,a){var r=a(8551),s=a(9539);t.exports=function(t,e,a,n){try{return n?e(r(a)[0],a[1]):e(a)}catch(i){s(t,"throw",i)}}},2211:function(t,e,a){var r=a(9039);t.exports=!r((function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype}))},2529:function(t){t.exports=function(t,e){return{value:t,done:e}}},4659:function(t,e,a){var r=a(3724),s=a(4913),n=a(6980);t.exports=function(t,e,a){r?s.f(t,e,n(0,a)):t[e]=a}},2106:function(t,e,a){var r=a(283),s=a(4913);t.exports=function(t,e,a){return a.get&&r(a.get,e,{getter:!0}),a.set&&r(a.set,e,{setter:!0}),s.f(t,e,a)}},6279:function(t,e,a){var r=a(6840);t.exports=function(t,e,a){for(var s in e)r(t,s,e[s],a);return t}},1767:function(t){t.exports=function(t){return{iterator:t,next:t.next,done:!1}}},397:function(t,e,a){var r=a(7751);t.exports=r("document","documentElement")},9539:function(t,e,a){var r=a(9565),s=a(8551),n=a(5966);t.exports=function(t,e,a){var i,o;s(t);try{if(i=n(t,"return"),!i){if("throw"===e)throw a;return a}i=r(i,t)}catch(c){o=!0,i=c}if("throw"===e)throw a;if(o)throw i;return s(i),a}},9462:function(t,e,a){var r=a(9565),s=a(2360),n=a(6699),i=a(6279),o=a(8227),c=a(1181),l=a(5966),u=a(7657).IteratorPrototype,f=a(2529),d=a(9539),p=o("toStringTag"),v="IteratorHelper",h="WrapForValidIterator",g=c.set,m=function(t){var e=c.getterFor(t?h:v);return i(s(u),{next:function(){var a=e(this);if(t)return a.nextHandler();if(a.done)return f(void 0,!0);try{var r=a.nextHandler();return a.returnHandlerResult?r:f(r,a.done)}catch(s){throw a.done=!0,s}},return:function(){var a=e(this),s=a.iterator;if(a.done=!0,t){var n=l(s,"return");return n?r(n,s):f(void 0,!0)}if(a.inner)try{d(a.inner.iterator,"normal")}catch(i){return d(s,"throw",i)}return s&&d(s,"normal"),f(void 0,!0)}})},y=m(!0),C=m(!1);n(C,p,"Iterator Helper"),t.exports=function(t,e,a){var r=function(r,s){s?(s.iterator=r.iterator,s.next=r.next):s=r,s.type=e?h:v,s.returnHandlerResult=!!a,s.nextHandler=t,s.counter=0,s.done=!1,g(this,s)};return r.prototype=e?y:C,r}},713:function(t,e,a){var r=a(9565),s=a(9306),n=a(8551),i=a(1767),o=a(9462),c=a(6319),l=o((function(){var t=this.iterator,e=n(r(this.next,t)),a=this.done=!!e.done;if(!a)return c(t,this.mapper,[e.value,this.counter++],!0)}));t.exports=function(t){return n(this),s(t),new l(i(this),{mapper:t})}},7657:function(t,e,a){var r,s,n,i=a(9039),o=a(4901),c=a(34),l=a(2360),u=a(2787),f=a(6840),d=a(8227),p=a(6395),v=d("iterator"),h=!1;[].keys&&(n=[].keys(),"next"in n?(s=u(u(n)),s!==Object.prototype&&(r=s)):h=!0);var g=!c(r)||i((function(){var t={};return r[v].call(t)!==t}));g?r={}:p&&(r=l(r)),o(r[v])||f(r,v,(function(){return this})),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:h}},2360:function(t,e,a){var r,s=a(8551),n=a(6801),i=a(8727),o=a(421),c=a(397),l=a(4055),u=a(6119),f=">",d="<",p="prototype",v="script",h=u("IE_PROTO"),g=function(){},m=function(t){return d+v+f+t+d+"/"+v+f},y=function(t){t.write(m("")),t.close();var e=t.parentWindow.Object;return t=null,e},C=function(){var t,e=l("iframe"),a="java"+v+":";return e.style.display="none",c.appendChild(e),e.src=String(a),t=e.contentWindow.document,t.open(),t.write(m("document.F=Object")),t.close(),t.F},_=function(){try{r=new ActiveXObject("htmlfile")}catch(e){}_="undefined"!=typeof document?document.domain&&r?y(r):C():y(r);var t=i.length;while(t--)delete _[p][i[t]];return _()};o[h]=!0,t.exports=Object.create||function(t,e){var a;return null!==t?(g[p]=s(t),a=new g,g[p]=null,a[h]=t):a=_(),void 0===e?a:n.f(a,e)}},6801:function(t,e,a){var r=a(3724),s=a(8686),n=a(4913),i=a(8551),o=a(5397),c=a(1072);e.f=r&&!s?Object.defineProperties:function(t,e){i(t);var a,r=o(e),s=c(e),l=s.length,u=0;while(l>u)n.f(t,a=s[u++],r[a]);return t}},2787:function(t,e,a){var r=a(9297),s=a(4901),n=a(8981),i=a(6119),o=a(2211),c=i("IE_PROTO"),l=Object,u=l.prototype;t.exports=o?l.getPrototypeOf:function(t){var e=n(t);if(r(e,c))return e[c];var a=e.constructor;return s(a)&&e instanceof a?a.prototype:e instanceof l?u:null}},1072:function(t,e,a){var r=a(1828),s=a(8727);t.exports=Object.keys||function(t){return r(t,s)}},8111:function(t,e,a){var r=a(6518),s=a(4576),n=a(679),i=a(8551),o=a(4901),c=a(2787),l=a(2106),u=a(4659),f=a(9039),d=a(9297),p=a(8227),v=a(7657).IteratorPrototype,h=a(3724),g=a(6395),m="constructor",y="Iterator",C=p("toStringTag"),_=TypeError,b=s[y],w=g||!o(b)||b.prototype!==v||!f((function(){b({})})),k=function(){if(n(this,v),c(this)===v)throw new _("Abstract class Iterator not directly constructable")},x=function(t,e){h?l(v,t,{configurable:!0,get:function(){return e},set:function(e){if(i(this),this===v)throw new _("You can't redefine this property");d(this,t)?this[t]=e:u(this,t,e)}}):v[t]=e};d(v,C)||x(C,y),!w&&d(v,m)&&v[m]!==Object||x(m,k),k.prototype=v,r({global:!0,constructor:!0,forced:w},{Iterator:k})},2489:function(t,e,a){var r=a(6518),s=a(9565),n=a(9306),i=a(8551),o=a(1767),c=a(9462),l=a(6319),u=a(6395),f=c((function(){var t,e,a,r=this.iterator,n=this.predicate,o=this.next;while(1){if(t=i(s(o,r)),e=this.done=!!t.done,e)return;if(a=t.value,l(r,n,[a,this.counter++],!0))return a}}));r({target:"Iterator",proto:!0,real:!0,forced:u},{filter:function(t){return i(this),n(t),new f(o(this),{predicate:t})}})},1701:function(t,e,a){var r=a(6518),s=a(713),n=a(6395);r({target:"Iterator",proto:!0,real:!0,forced:n},{map:s})},8992:function(t,e,a){a(8111)},4520:function(t,e,a){a(2489)},1454:function(t,e,a){a(1701)}}]);
//# sourceMappingURL=188.ad09e3fc.js.map