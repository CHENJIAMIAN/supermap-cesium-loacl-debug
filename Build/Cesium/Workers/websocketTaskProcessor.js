define(["./createTaskProcessorWorker","./when-b60132fc","./RuntimeError-4a5c8994","./getStringFromTypedArray-c37342c0","./Event-16a2dfbf","./Check-7b2a090c"],(function(e,t,r,i,s,n){"use strict";var a,f=1,o=3;function u(e,r,i){this._url=e,this._maximumActiveTasks=t.defaultValue(i.maximumActiveTasks,100),this._activeTasks=0,this._deferreds={},this._nextID=0,this._event=r,this._enableHeartCheck=t.defaultValue(i.enableHeartCheck,!1),this._heartTimeOut=t.defaultValue(i.heartTimeOut,1e4),this._createWS(r)}function c(e,r,i,s){var n;return-1!==r.indexOf("extratiles=")?(s.extratiles=!0,n={id:e,binaryType:t.defaultValue(i,"blob"),tileName:r.substring(0,r.indexOf("?")),extraTiles:r.substring(r.indexOf("extratiles=")+11)}):(s.extratiles=!1,n={id:e,binaryType:t.defaultValue(i,"blob"),tileName:r}),JSON.stringify(n)}return u.prototype.scheduleTask=function(e,r){var i=this;if(!this.isOpened()){var s=t.when.defer();return this._event.addEventListener((function(t){if(t===f){++i._activeTasks;var n=i,a=n._nextID++;n._deferreds[a]=s,s.binaryType=r;var o=c(a,e,r,s);n._ws.send(o),n._ws.send(o)}})),s.promise}if(!(this._activeTasks>=this._maximumActiveTasks)){++this._activeTasks;var n=this,a=n._nextID++;s=t.when.defer();n._deferreds[a]=s,s.binaryType=r;var o=c(a,e,r,s);return n._ws.send(o),s.promise}},u.prototype._createWS=function(e){this._ws=new WebSocket(this._url),this._ws.binaryType="arraybuffer";var s=this;this._ws.onopen=function(){e.raiseEvent(f)},this._ws.onclose=function(){e.raiseEvent(o)},this._ws.onerror=function(){error=new r.RuntimeError("open failure"),e.raiseEvent(error)},this._ws.onmessage=function(e){!function(e,r){if(r instanceof ArrayBuffer){--e._activeTasks;var s=new DataView(r).getInt32(0,!0);if(!t.defined(s))return;var n=e._deferreds,a=n[s];if(t.defined(a)){if("blob"===a.binaryType)4===r.byteLength?a.reject(404):a.resolve(new Blob([r.slice(4,r.byteLength)]));else if("arraybuffer"===a.binaryType)if(4===r.byteLength)a.reject(404);else{var f=r.slice(4,r.byteLength);a.extratiles?a.progress(f):a.resolve(f)}else{r=r.slice(4,r.byteLength);var o=new Uint8Array(r),u=i.getStringFromTypedArray(o);if("json"===a.binaryType){var c=JSON.parse(u);a.resolve(c)}else a.resolve(u)}!0!==a.extratiles&&delete n[s]}}}(s,e.data)}},u.prototype.isOpened=function(){return this._ws&&this._ws.readyState===f},u.prototype.close=function(){this._ws.close()},e((function(e,r){var i=e.data;if("init"==i)return a=new u(e.scpUrl,new s.Event,{}),!0;var n=t.when.defer(),f=e.dataType;if(t.defined(a)){var o=a.scheduleTask(i,f);if(!t.defined(o))return o;o.then((function(e){n.resolve(e)})).otherwise((function(e){n.reject(e)}))}return n.promise}))}));
