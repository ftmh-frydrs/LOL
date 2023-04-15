"use strict";(self.webpackChunklib=self.webpackChunklib||[]).push([[5617],{1277:function(e,t,n){var r=n(8657),o=n(3966),s=n(5209);const c="personalizer.io";function i(e,t){(0,o.uN)("lsUserID",e||""),(0,o.uN)("lsEncUserID",t||"");try{(0,s.d8)("lsUserID",e||"",365,c),(0,s.d8)("lsEncUserID",t||"",365,c)}catch{}}(0,r.XN)(((e,t,n,s)=>{switch(e){case"GetUserID":n({UserID:(0,o.jy)("lsUserID"),EncUserID:(0,o.jy)("lsEncUserID")});break;case"SyncUserID":const e=(0,o.jy)("lsUserID"),s=(0,o.jy)("lsEncUserID");e&&s&&+e!=+t.UserID?function(e,t,n){!function(e,t,n,o,s,c){t=r.Mj+t,s||(s=function(r,o,s){let c=r.responseText;if(void 0!==c)try{const e=JSON.parse(c);void 0!==e&&(c=e.Message)}catch(e){}else s?19===s.code?c="Method is undefined or Web API Server is not accessible at "+t:s.message&&(c=s.message):c="Unknown error!";const i=new Date,a=i.toTimeString().substr(0,8)+i.getMilliseconds().toString();n?console.error(`\n          ${a} [${e} ${t} ${JSON.stringify(n)}] - ${r.status} - ${c}`):console.error(`\n          ${a} [${e} ${t}] - ${r.status} - ${c}`)});const i=new XMLHttpRequest;i.onreadystatechange=function(){4===i.readyState&&(200===i.status?o&&o(JSON.parse(i.responseText)):204===i.status?o&&o():s(i,i.statusText,i.errorThrown))},c||(t=t+(t.indexOf("?")<0?"?":"&")+(new Date).getTime().toString());i.open(e,t,!0),i.setRequestHeader("X-Personalizer-Context-ID",r.Do.ContextID),i.setRequestHeader("Content-Type","application/json"),n?i.send(JSON.stringify(n)):i.send()}("PUT",t&&"undefined"!==t&&"null"!==t?"/v1/users?encConnectingUserID="+t:"/v1/users?connectingUserID="+e,null,(t=>{+t.UserID!=+e&&i(t.UserID,t.EncUserID),n({UserID:t.UserID,EncUserID:t.EncUserID})}))}(e,s,n):(i(t.UserID,t.EncUserID),n(null))}}))},8657:function(e,t,n){let r,o;n.d(t,{Do:function(){return o},Mj:function(){return r},XN:function(){return c}});const s={};function c(e){s.handleRequest=e}window.addEventListener("message",(e=>{if(!e||!e.data||"function"!=typeof e.data.indexOf||e.data.indexOf("LimeSpot")<0)return;const t=JSON.parse(e.data);if("*"===t.Target){if("SyncContext"===t.Command)r=t.ApiServerUrl,o=t.Context;return}if(t.Target!==function(e,t){void 0===t&&(t=location.search);if(e=new RegExp("[?&]"+encodeURIComponent(e)+"=([^&]*)").exec(t))return decodeURIComponent(e[1])}("channelID"))return;let n=e.origin;n&&"null"!==n||(n="*"),s.handleRequest(t.Method,t.Params,(e=>{parent.postMessage(JSON.stringify({Owner:"LimeSpot",CallbackID:t.SuccessCallbackID,Target:t.Source,Result:e}),n)}),((e,o,s)=>{const c=function(e,t,n){let o=e.responseText;if(o)try{o=JSON.parse(o).Message||""}catch(e){}else n?19===n.code?o="Method is undefined or Web API Server is not accessible at "+r:n.message&&(o=n.message):o="Unknown error!";return e.status+" - "+o}(e,0,s);c&&console.error(`LimeSpot ${t.Method}: ${c}`),parent.postMessage(JSON.stringify({Owner:"LimeSpot",CallbackID:t.ErrorCallbackID,Target:t.Source,Result:{Xhr:e,TextStatus:o,ErrorThrown:s}}),n)}))}),!1)},3966:function(e,t,n){n.d(t,{I:function(){return l},_o:function(){return u},jy:function(){return c},uN:function(){return s},v8:function(){return a}});var r=n(5209);function o(){try{return"object"==typeof window.localStorage&&"function"==typeof window.localStorage.getItem}catch(e){return!1}}function s(e,t,n){!n||t?o()?localStorage.setItem(e,t):(0,r.d8)(e,t):l(e)}function c(e,t){let n=null;return n=o()?localStorage.getItem(e):(0,r.ej)(e),t&&n&&l(e),n}function i(e){let t=null;return t=o()?sessionStorage.getItem(e):(0,r.ej)(e),t}function a(e,t,n){!n||t?o()?sessionStorage.setItem(e,t):(0,r.d8)(e,t):u(e)}function u(e){return o()?sessionStorage.removeItem(e):(0,r.nJ)(e)}function l(e){return o()?localStorage.removeItem(e):(0,r.nJ)(e)}t.ZP={isLocalStorageSupported:o,setLocalStorageValue:s,getLocalStorageValue:c,setLocalStorageObject:function(e,t){if(t){s(e,JSON.stringify(t))}else l(e)},getLocalStorageObject:function(e,t){const n=c(e,t);if(!n)return null;try{return JSON.parse(n)}catch(e){return console.error(e),null}},removeLocalStorageValue:l,setSessionStorageValue:a,getSessionStorageValue:i,setSessionStorageObject:function(e,t){if(t){a(e,JSON.stringify(t))}else u(e)},getSessionStorageObject:function(e,t){const n=i(e);if(!n)return null;try{return JSON.parse(n)}catch(e){return console.error(e),null}},removeSessionStorageValue:u}},5209:function(e,t,n){function r(e,t,n,r){const o=new Date;o.setDate(o.getDate()+n);let s=escape(t)+(null==n||void 0===n?"":"; expires="+o.toUTCString());s+="; Path=/; SameSite=None; Secure",r&&(s+="; Domain="+r),document.cookie=e+"="+s}function o(e){let t,n,r;const o=document.cookie.split(";");for(t=0;t<o.length;t++)if(n=o[t].substr(0,o[t].indexOf("=")),r=o[t].substr(o[t].indexOf("=")+1),n=n.replace(/^\s+|\s+$/g,""),n===e)return unescape(r)}function s(e){document.cookie=e+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"}n.d(t,{d8:function(){return r},ej:function(){return o},nJ:function(){return s}}),t.ZP={setCookie:r,getCookie:o,removeCookie:s}}},function(e){var t;t=1277,e(e.s=t)}]);