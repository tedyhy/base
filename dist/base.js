define("arale/base/1.1.0/base",["arale/class/1.0.0/class","arale/events/1.1.0/events","./aspect","./attribute"],function(t,r,e){var n=t("arale/class/1.0.0/class"),i=t("arale/events/1.1.0/events"),a=t("./aspect"),s=t("./attribute");e.exports=n.create({Implements:[i,a,s],initialize:function(t){this.initAttrs(t)},destroy:function(){this.off();for(var t in this)this.hasOwnProperty(t)&&delete this[t]}})}),define("arale/base/1.1.0/aspect",[],function(t,r){function e(t,r,e,s){for(var o,c,u=r.split(a);o=u.shift();)c=n(this,o),c.__isAspected||i.call(this,o),this.on(t+":"+o,e,s);return this}function n(t,r){var e=t[r];if(!e)throw Error("Invalid method name: "+r);return e}function i(t){var r=this[t];this[t]=function(){var e=Array.prototype.slice.call(arguments),n=["before:"+t].concat(e);if(this.trigger.apply(this,n)!==!1){var i=r.apply(this,arguments);return this.trigger("after:"+t,i),i}},this[t].__isAspected=!0}r.before=function(t,r,n){return e.call(this,"before",t,r,n)},r.after=function(t,r,n){return e.call(this,"after",t,r,n)};var a=/\s+/}),define("arale/base/1.1.0/attribute",[],function(t,r){function e(t){return"[object String]"===O.call(t)}function n(t){return"[object Function]"===O.call(t)}function i(t){return null!=t&&t==t.window}function a(t){if(!t||"[object Object]"!==O.call(t)||t.nodeType||i(t))return!1;try{if(t.constructor&&!A.call(t,"constructor")&&!A.call(t.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}for(var e in t);return void 0===e||A.call(t,e)}function s(t){for(var r in t)if(t.hasOwnProperty(r))return!1;return!0}function o(t,r){var e,n;for(e in r)if(r.hasOwnProperty(e)){if(n=r[e],w(n))n=n.slice();else if(a(n)){var i=t[e];a(i)||(i={}),n=o(i,n)}t[e]=n}return t}function c(t){return t.charAt(0).toUpperCase()+t.substring(1)}function u(t,r){for(var e=[],n=t.constructor.prototype;n;)n.hasOwnProperty("attrs")||(n.attrs={}),f(r,n.attrs,n),s(n.attrs)||e.unshift(n.attrs),n=n.constructor.superclass;for(var i={},a=0,c=e.length;c>a;a++)i=o(i,g(e[a]));return i}function f(t,r,e,n){for(var i=0,a=t.length;a>i;i++){var s=t[i];e.hasOwnProperty(s)&&(r[s]=n?r.get(s):e[s])}}function l(t,r){for(var e in r)if(r.hasOwnProperty(e)){var n="_onChange"+c(e);t[n]&&t.on("change:"+e,t[n])}}function h(t,r){for(var e in r)if(r.hasOwnProperty(e)){var i,a=r[e].value;n(a)&&(i=e.match(j))&&(t[i[1]](v(i[2]),a),delete r[e])}}function v(t){var r=t.match(P),e=r[1]?"change:":"";return e+=r[2].toLowerCase()+r[3]}function p(t,r,e){var n={silent:!0};t.__initializingAttrs=!0;for(var i in e)e.hasOwnProperty(i)&&r[i].setter&&t.set(i,e[i].value,n);delete t.__initializingAttrs}function g(t,r){t=o({},t);for(var e in t){var n=t[e];a(n)&&!r&&y(n,m)||(t[e]={value:n})}return t}function y(t,r){for(var e=0,n=r.length;n>e;e++)if(t.hasOwnProperty(r[e]))return!0;return!1}function b(t){return null==t||(e(t)||w(t))&&0===t.length||a(t)&&s(t)}function d(t,r){if(t===r)return!0;if(b(t)&&b(r))return!0;var e=O.call(t);if(e!=O.call(r))return!1;switch(e){case"[object String]":return t==r+"";case"[object Number]":return t!=+t?r!=+r:0==t?1/t==1/r:t==+r;case"[object Date]":case"[object Boolean]":return+t==+r;case"[object RegExp]":return t.source==r.source&&t.global==r.global&&t.multiline==r.multiline&&t.ignoreCase==r.ignoreCase;case"[object Array]":var n=""+t,i=""+r;return-1===n.indexOf("[object")&&-1===i.indexOf("[object")&&n===i}if("object"!=typeof t||"object"!=typeof r)return!1;if(a(t)&&a(r)){if(!d(_(t),_(r)))return!1;for(var s in t)if(t[s]!==r[s])return!1;return!0}return!1}r.initAttrs=function(t){var r,e=this.propsInAttrs||[],n=u(this,e),i=o({},n);t&&(r=g(t,!0),o(i,r)),l(this,i),this.attrs=i,p(this,i,r),h(this,i),f(e,this,this.attrs,!0)},r.get=function(t){var r=this.attrs[t]||{},e=r.value;return r.getter?r.getter.call(this,e,t):e},r.set=function(t,r,n){var i={};e(t)?i[t]=r:(i=t,n=r),n||(n={});var s=n.silent,c=n.override,u=this.attrs,f=this.__changedAttrs||(this.__changedAttrs={});for(t in i)if(i.hasOwnProperty(t)){var l=u[t]||(u[t]={});if(r=i[t],l.readOnly)throw Error("This attribute is readOnly: "+t);l.setter&&(r=l.setter.call(this,r,t));var h=this.get(t);!c&&a(h)&&a(r)&&(r=o(o({},h),r)),u[t].value=r,this.__initializingAttrs||d(h,r)||(s?f[t]=[r,h]:this.trigger("change:"+t,r,h,t))}return this},r.change=function(){var t=this.__changedAttrs;if(t){for(var r in t)if(t.hasOwnProperty(r)){var e=t[r];this.trigger("change:"+r,e[0],e[1],r)}delete this.__changedAttrs}return this};var O=Object.prototype.toString,A=Object.prototype.hasOwnProperty,w=Array.isArray||function(t){return"[object Array]"===O.call(t)},_=Object.keys;_||(_=function(t){var r=[];for(var e in t)t.hasOwnProperty(e)&&r.push(e);return r});var j=/^(on|before|after)([A-Z].*)$/,P=/^(Change)?([A-Z])(.*)/,m=["value","getter","setter","readOnly"]});
