!function(n,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else if("object"==typeof exports)exports.JsCrypto=t();else{var r=t();for(var i in n.JsCrypto=n.JsCrypto||{},r)n.JsCrypto[i]=r[i]}}(this,(function(){return function(){"use strict";var n={6367:function(n,t,r){r.d(t,{Hmac:function(){return e}});var i=r(4768),e=function(){function n(n,t){this.t=n,"string"==typeof t&&(t=i.d.parse(t));var r=n.blockSize,e=4*r;t.nSigBytes>e&&(t=n.finalize(t)),t.clamp();for(var o=this.i=t.clone(),u=this.u=t.clone(),f=o.words,c=u.words,s=0;s<r;s++)f[s]^=1549556828,c[s]^=909522486;u.nSigBytes=e,o.nSigBytes=e,this.reset()}return n.prototype.reset=function(){this.t.reset(),this.t.update(this.u)},n.prototype.update=function(n){return this.t.update(n),this},n.prototype.finalize=function(n){var t=this.t.finalize(n);return this.t.reset(),this.t.finalize(this.i.clone().concat(t))},n}()},5561:function(n,t,r){r.d(t,{SHA256:function(){return v}});var i,e=r(1868),o=r(3354),u=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),f=[],c=[];function s(n){for(var t=Math.sqrt(n),r=2;r<=t;r++)if(!(n%r))return!1;return!0}function a(n){return 4294967296*(n-(0|n))|0}!function(){for(var n=2,t=0;t<64;)s(n)&&(t<8&&(f[t]=a(Math.pow(n,.5))),c[t]=a(Math.pow(n,1/3)),t++),n++}();var h=[],v=function(n){function t(t){var r=n.call(this,t)||this;return r.h=new o.e(f.slice(0)),r.v=t,t&&void 0!==t.hash&&(r.h=t.hash.clone()),r}return u(t,n),t.prototype.l=function(){this.h=new o.e(f.slice(0))},t.prototype.j=function(n,t){for(var r=this.h.words,i=r[0],e=r[1],o=r[2],u=r[3],f=r[4],s=r[5],a=r[6],v=r[7],w=0;w<64;w++){if(w<16)h[w]=0|n[t+w];else{var d=h[w-15],l=(d<<25|d>>>7)^(d<<14|d>>>18)^d>>>3,y=h[w-2],b=(y<<15|y>>>17)^(y<<13|y>>>19)^y>>>10;h[w]=l+h[w-7]+b+h[w-16]}var p=i&e^i&o^e&o,m=(i<<30|i>>>2)^(i<<19|i>>>13)^(i<<10|i>>>22),g=v+((f<<26|f>>>6)^(f<<21|f>>>11)^(f<<7|f>>>25))+(f&s^~f&a)+c[w]+h[w];v=a,a=s,s=f,f=u+g|0,u=o,o=e,e=i,i=g+(m+p)|0}r[0]=r[0]+i|0,r[1]=r[1]+e|0,r[2]=r[2]+o|0,r[3]=r[3]+u|0,r[4]=r[4]+f|0,r[5]=r[5]+s|0,r[6]=r[6]+a|0,r[7]=r[7]+v|0},t.prototype.A=function(){var n=this.O.words,t=8*this._,r=8*this.O.nSigBytes;return n[r>>>5]|=128<<24-r%32,n[14+(r+64>>>9<<4)]=Math.floor(t/4294967296),n[15+(r+64>>>9<<4)]=t,this.O.nSigBytes=4*n.length,this.I(),this.h},t.prototype.clone=function(){return new t({hash:this.h,blockSize:this.U,data:this.O,nBytes:this._})},t.hash=function(n,r){return new t(r).finalize(n)},t}(e.P)},3354:function(n,t,r){r.d(t,{e:function(){return o}});var i=r(5720),e=r(9054),o=function(){function n(t,r){if(Array.isArray(t)||!t)return this.N=Array.isArray(t)?t:[],void(this.S="number"==typeof r?r:4*this.N.length);if(t instanceof n)return this.N=t.words.slice(),void(this.S=t.nSigBytes);var i;try{t instanceof ArrayBuffer?i=new Uint8Array(t):(t instanceof Uint8Array||t instanceof Int8Array||t instanceof Uint8ClampedArray||t instanceof Int16Array||t instanceof Uint16Array||t instanceof Int32Array||t instanceof Uint32Array||t instanceof Float32Array||t instanceof Float64Array)&&(i=new Uint8Array(t.buffer,t.byteOffset,t.byteLength))}catch(n){throw new Error("Invalid argument")}if(!i)throw new Error("Invalid argument");for(var e=i.byteLength,o=[],u=0;u<e;u++)o[u>>>2]|=i[u]<<24-u%4*8;this.N=o,this.S=e}return Object.defineProperty(n.prototype,"nSigBytes",{get:function(){return this.S},set:function(n){this.S=n},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"words",{get:function(){return this.N},enumerable:!1,configurable:!0}),n.prototype.toString=function(n){return n?n.stringify(this):i.p.stringify(this)},n.prototype.toUint8Array=function(){for(var n=this.N,t=this.S,r=new Uint8Array(t),i=0;i<t;i++)r[i]=n[i>>>2]>>>24-i%4*8&255;return r},n.prototype.concat=function(n){var t=n.words.slice(),r=n.nSigBytes;if(this.clamp(),this.S%4)for(var i=0;i<r;i++){var e=t[i>>>2]>>>24-i%4*8&255;this.N[this.S+i>>>2]|=e<<24-(this.S+i)%4*8}else for(i=0;i<r;i+=4)this.N[this.S+i>>>2]=t[i>>>2];return this.S+=r,this},n.prototype.clamp=function(){var n=this.S;this.N[n>>>2]&=4294967295<<32-n%4*8,this.N.length=Math.ceil(n/4)},n.prototype.clone=function(){return new n(this.N.slice(),this.S)},n.random=function(t){for(var r=[],i=0;i<t;i+=4)r.push((0,e.M)());return new n(r,t)},n}()},7211:function(n,t,r){r.d(t,{C:function(){return o}});var i=r(3354),e=r(4768),o=function(){function n(n){this.F=0,this.U=0,this.v=n,this.O=n&&void 0!==n.data?n.data.clone():new i.e,this._=n&&"number"==typeof n.nBytes?n.nBytes:0}return Object.defineProperty(n.prototype,"blockSize",{get:function(){return this.U},enumerable:!1,configurable:!0}),n.prototype.reset=function(n,t){this.O=void 0!==n?n.clone():new i.e,this._="number"==typeof t?t:0},n.prototype.B=function(n){var t="string"==typeof n?e.d.parse(n):n;this.O.concat(t),this._+=t.nSigBytes},n.prototype.I=function(n){var t,r=this.O.words,e=this.O.nSigBytes,o=this.U,u=e/(4*this.U),f=(u=n?Math.ceil(u):Math.max((0|u)-this.F,0))*o,c=Math.min(4*f,e);if(f){for(var s=0;s<f;s+=o)this.j(r,s);t=r.splice(0,f),this.O.nSigBytes-=c}return new i.e(t,c)},n.prototype.j=function(n,t){throw new Error("Not implemented")},n}()},1868:function(n,t,r){r.d(t,{P:function(){return u}});var i,e=r(7211),o=(i=function(n,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(n,t)},function(n,t){function r(){this.constructor=n}i(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),u=function(n){function t(t){var r=n.call(this,t)||this;return r.U=16,r.v=t,t&&"number"==typeof t.blockSize&&(r.U=t.blockSize),r.reset(t?t.data:void 0,t?t.nBytes:void 0),r}return o(t,n),Object.defineProperty(t.prototype,"blockSize",{get:function(){return this.U},enumerable:!1,configurable:!0}),t.prototype.reset=function(t,r){n.prototype.reset.call(this,t,r),this.l()},t.prototype.update=function(n){return this.B(n),this.I(),this},t.prototype.finalize=function(n){return n&&this.B(n),this.A()},t.prototype.l=function(){throw new Error("Not implemented")},t.prototype.A=function(){throw new Error("Not implemented")},t}(e.C)},1756:function(n,t,r){r.d(t,{w:function(){return u}});var i,e="undefined"!=typeof navigator&&navigator.userAgent?navigator.userAgent.toLowerCase():"",o=(i=parseInt((/msie (\d+)/.exec(e)||[])[1],10),isNaN(i)?(i=parseInt((/trident\/.*; rv:(\d+)/.exec(e)||[])[1],10),!isNaN(i)&&i):i);function u(n,t){return!1!==o&&(!t||("<"===n?o<t:"<="===n?o<=t:">"===n?o>t:">="===n?o>=t:o===t))}},5720:function(n,t,r){r.d(t,{p:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push((o>>>4).toString(16)),i.push((15&o).toString(16))}return i.join("")},parse:function(n){var t=n.length;if(t%2!=0)throw new Error("Hex string count must be even");if(!/^[a-fA-F0-9]+$/.test(n))throw new Error("Invalid Hex string: "+n);for(var r=[],e=0;e<t;e+=2)r[e>>>3]|=parseInt(n.substr(e,2),16)<<24-e%8*4;return new i.e(r,t/2)}}},8702:function(n,t,r){r.d(t,{m:function(){return e}});var i=r(3354),e={stringify:function(n){for(var t=n.nSigBytes,r=n.words,i=[],e=0;e<t;e++){var o=r[e>>>2]>>>24-e%4*8&255;i.push(String.fromCharCode(o))}return i.join("")},parse:function(n){for(var t=n.length,r=[],e=0;e<t;e++)r[e>>>2]|=(255&n.charCodeAt(e))<<24-e%4*8;return new i.e(r,t)}}},4768:function(n,t,r){r.d(t,{d:function(){return e}});var i=r(8702),e={stringify:function(n){try{return decodeURIComponent(escape(i.m.stringify(n)))}catch(n){throw new Error("Malformed UTF-8 data")}},parse:function(n){return i.m.parse(unescape(encodeURIComponent(n)))}}},9054:function(n,t,r){r.d(t,{M:function(){return e}});var i=r(1756);var e=function(){if("undefined"!=typeof window){var n=window.crypto||window.msCrypto;if(!n){if((0,i.w)("<",11))return console.warn("IE <= 10 uses insecure random generator. Please consider to use IE11 or another modern browser"),function(){return Math.floor(512*Math.random())%256};throw new Error("Crypto module not found")}return function(){return n.getRandomValues(new Uint32Array(1))[0]}}return void 0!==r.g&&r.g.crypto?function(){return r.g.crypto.randomBytes(4).readInt32LE()}:function(){return require("crypto").randomBytes(4).readInt32LE()}}()}},t={};function r(i){var e=t[i];if(void 0!==e)return e.exports;var o=t[i]={exports:{}};return n[i](o,o.exports,r),o.exports}r.d=function(n,t){for(var i in t)r.o(t,i)&&!r.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:t[i]})},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),r.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},r.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"H",{value:!0})};var i={};return function(){r.r(i),r.d(i,{PBKDF2:function(){return c}});var n,t=r(5561),e=r(6367),o=r(3354),u=function(){function n(n){this.v=n}return n.prototype.compute=function(n,t){throw new Error("Not implemented")},n.getKey=function(n,t,r){throw new Error("Not implemented")},n}(),f=(n=function(t,r){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])})(t,r)},function(t,r){function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}),c=function(n){function r(r){var i=n.call(this,r)||this;return i.k=4,i.T=t.SHA256,i.R=1e4,r&&(i.k=void 0!==r.keySize?r.keySize:i.k,i.T=void 0!==r.Hasher?r.Hasher:i.T,i.R=void 0!==r.iterations?r.iterations:i.R),i}return f(r,n),r.prototype.compute=function(n,t){for(var r=new e.Hmac(new this.T,n),i=new o.e,u=new o.e([1]),f=i.words,c=u.words,s=this.k,a=this.R;f.length<s;){var h=r.update(t).finalize(u);r.reset();for(var v=h.words,w=v.length,d=h,l=1;l<a;l++){d=r.finalize(d),r.reset();for(var y=d.words,b=0;b<w;b++)v[b]^=y[b]}i.concat(h),c[0]++}return i.nSigBytes=4*s,i},r.getKey=function(n,t,i){return new r(i).compute(n,t)},r}(u)}(),i}()}));