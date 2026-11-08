(()=>{var zm=Object.create;var ff=Object.defineProperty;var km=Object.getOwnPropertyDescriptor;var Gm=Object.getOwnPropertyNames;var Hm=Object.getPrototypeOf,Vm=Object.prototype.hasOwnProperty;var hn=(i,e,t)=>()=>{if(t)throw t[0];try{return i&&(e=i(i=0)),e}catch(n){throw t=[n],n}};var na=(i,e)=>()=>{try{return e||i((e={exports:{}}).exports,e),e.exports}catch(t){throw e=0,t}};var Wm=(i,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Gm(e))!Vm.call(i,s)&&s!==t&&ff(i,s,{get:()=>e[s],enumerable:!(n=km(e,s))||n.enumerable});return i};var Hr=(i,e,t)=>(t=i!=null?zm(Hm(i)):{},Wm(e||!i||!i.__esModule?ff(t,"default",{value:i,enumerable:!0}):t,i));var Tc=na((gS,mf)=>{"use strict";function Xm(){return typeof window<"u"&&window.ZOVO||{}}function sa(i){return"/t/"+encodeURIComponent(i)+"/"}function qm(i,e,t){return i+sa(e)+"f/"+encodeURIComponent(t)}function df(i,e,t){let n;try{n=new URL(i,e+"/")}catch{return!1}return n.origin===e&&n.pathname.startsWith(sa(t)+"f/")&&!n.search}async function pf(i,e,t=8388608){let n=await i(e+"?offset=0&length="+t);if(!n.ok)return n;let s=Number(n.headers.get("X-File-Size")),r=new Uint8Array(await n.arrayBuffer());if(!Number.isFinite(s)||s<r.length)throw new Error("The viewer got no file size for "+e+".");let o=r.length,a=!1,l=new ReadableStream({async pull(c){if(!a&&(a=!0,r.length)){c.enqueue(r);return}if(o>=s){c.close();return}let h=Math.min(t,s-o),u=await i(e+"?offset="+o+"&length="+h);if(!u.ok){c.error(new Error("Could not read bytes "+o+" to "+(o+h)+" (HTTP "+u.status+")."));return}let f=new Uint8Array(await u.arrayBuffer());if(f.length!==h){c.error(new Error("Short read at "+o+": wanted "+h+" bytes, got "+f.length+"."));return}o+=f.length,c.enqueue(f)}});return new Response(l,{status:200,headers:{"Content-Length":String(s),"Content-Type":n.headers.get("Content-Type")||"application/octet-stream"}})}function Ym(i,e){let t=i.fetch.bind(i),n=i.location.origin;return i.fetch=(s,r)=>{let o=typeof s=="string"?s:s&&s.url;if(String(r&&r.method||s&&typeof s=="object"&&s.method||"GET").toUpperCase()!=="GET"||!df(o,n,e))return t(s,r);let l=new URL(o,n+"/");return pf(t,l.pathname)},t}async function Zm(i,e,t,n){let s=await i(sa(e)+t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n||{})}),r=await s.text(),o;try{o=JSON.parse(r)}catch{o={error:r}}if(!s.ok)throw new Error(o.error||"HTTP "+s.status);return o}function bc(i){return!Number.isFinite(i)||i<0?"?":i<1024?`${i} B`:i<1048576?`${(i/1024).toFixed(1)} KB`:i<1073741824?`${(i/1048576).toFixed(1)} MB`:`${(i/1073741824).toFixed(1)} GB`}var ia=1024;function Km(i){return i>ia*1048576?{load:!1,limitMB:ia,message:`This file is ${bc(i)}. STL Viewer opens files up to ${bc(ia*1048576)} so the IDE stays responsive. The file was not read.`}:{load:!0,limitMB:ia}}function jm(i){let e="";for(let t=0;t<i.length;t+=32768)e+=String.fromCharCode.apply(null,i.subarray(t,t+32768));return btoa(e)}mf.exports={CHUNK:8388608,cfg:Xm,tokenPath:sa,modelSrc:qm,isFileUrl:df,rangedResponse:pf,patchFetch:Ym,post:Zm,fmtSize:bc,sizePlan:Km,bytesToBase64:jm}});var Ec=na((_S,_f)=>{"use strict";var gf={glb:"glb",gltf:"gltf",stl:"stl",obj:"obj",ply:"ply","3mf":"3mf"},$m={glb:"m",gltf:"m","3mf":"mm"};function Jm(i){let e=/\.([a-z0-9]+)$/i.exec(String(i||""));return e&&gf[e[1].toLowerCase()]||null}function Ac(i){return!Number.isFinite(i)||i<0?"?":i<1024?`${i} B`:i<1048576?`${(i/1024).toFixed(1)} KB`:i<1024*1048576?`${(i/1048576).toFixed(1)} MB`:`${(i/(1024*1048576)).toFixed(1)} GB`}function Qm(i,e){let t=Number.isFinite(e)&&e>0?Math.min(e,4096):1024;return i>t*1048576?{load:!1,limitMB:t,message:`This file is ${Ac(i)}. 3D Model Viewer opens files up to ${Ac(t*1048576)} so VS Code stays responsive (setting modelViewer.maxFileMB). The file was not read.`}:{load:!0,limitMB:t}}var eg=i=>i instanceof Uint8Array,tg=(i,e)=>typeof i=="string"&&i.length<=e;function ng(i){if(!i||typeof i!="object"||typeof i.type!="string")return{ok:!1};switch(i.type){case"ready":case"needBytes":return{ok:!0,msg:{type:i.type}};case"rendered":return{ok:!0,msg:{type:"rendered"}};case"failed":return{ok:!0,msg:{type:"failed"}};case"screenshot":return!eg(i.data)||i.data.length<8||i.data.length>200*1048576?{ok:!1}:[137,80,78,71,13,10,26,10].every((t,n)=>i.data[n]===t)?{ok:!0,msg:{type:"screenshot",data:i.data}}:{ok:!1};case"copy":return tg(i.text,1e5)?{ok:!0,msg:{type:"copy",text:i.text}}:{ok:!1};default:return{ok:!1}}}function wc(i,e){let t="";for(let n=0;n<Math.min(e,i.length);n++)t+=String.fromCharCode(i[n]);return t}function ig(i,e){let t=i instanceof Uint8Array?i:new Uint8Array(i);if(t.length===0)return{ok:!1,reason:"The file is empty."};let n=wc(t,512);n.startsWith("\xEF\xBB\xBF")&&(n=n.slice(3));let s=new DataView(t.buffer,t.byteOffset,t.byteLength);switch(e){case"glb":{if(n.slice(0,4)!=="glTF")return/^\s*\{/.test(n)?{ok:!0,detail:"json"}:{ok:!1,reason:'This is not a GLB file: it does not start with "glTF".'};let r=t.length>=8?s.getUint32(4,!0):0;if(r!==2)return{ok:!1,reason:`This GLB file is version ${r}. Only glTF 2.0 is supported.`};let o=t.length>=12?s.getUint32(8,!0):0;return o>t.length?{ok:!1,reason:`The GLB file is cut off: the header says ${o} bytes and the file has ${t.length}.`}:{ok:!0,detail:"binary"}}case"gltf":return n.slice(0,4)==="glTF"?{ok:!0,detail:"binary"}:/^\s*\{/.test(n)?{ok:!0,detail:"json"}:{ok:!1,reason:"This is not a glTF file: it is not JSON."};case"stl":{if(t.length>=84){let r=s.getUint32(80,!0);if(84+r*50===t.length)return{ok:!0,detail:"binary",triangles:r}}return/^\s*solid[\s\S]*facet/i.test(wc(t,4096))||/^\s*solid\b/i.test(n)?{ok:!0,detail:"ascii"}:t.length>=84?{ok:!0,detail:"binary",warning:"The triangle count in the header does not match the file size."}:{ok:!1,reason:'This is not an STL file: it is too short for binary STL and does not start with "solid".'}}case"ply":{if(!/^ply\r?\n/.test(n))return{ok:!1,reason:'This is not a PLY file: it does not start with "ply".'};let r=/format\s+(ascii|binary_little_endian|binary_big_endian)/.exec(n);if(!r)return{ok:!1,reason:"The PLY header has no known format line."};if(!/end_header/.test(wc(t,65536)))return{ok:!1,reason:"The PLY header has no end_header line."};let o=/element\s+vertex\s+(\d+)/.exec(n),a=/element\s+face\s+(\d+)/.exec(n);return{ok:!0,detail:r[1],vertices:o?Number(o[1]):0,faces:a?Number(a[1]):0}}case"3mf":return n.slice(0,2)!=="PK"?{ok:!1,reason:'This is not a 3MF file: 3MF files are ZIP packages and this one does not start with "PK".'}:{ok:!0};case"obj":{let r=0;for(let o=0;o<Math.min(t.length,4096);o++)t[o]===0&&r++;return r>0?{ok:!1,reason:"This is not an OBJ file: it contains binary data."}:{ok:!0}}default:return{ok:!1,reason:"Unknown file type."}}}function sg(i){let e=[],t=/^\s*mtllib\s+(.+?)\s*$/gm,n;for(;(n=t.exec(i))&&e.length<8;){let s=n[1].trim();s&&!/^[a-z][a-z0-9+.-]*:/i.test(s)&&!s.startsWith("/")&&!s.split(/[\\/]/).includes("..")&&e.push(s.replace(/\\/g,"/"))}return e}_f.exports={MB:1048576,FORMATS:gf,UNITS:$m,formatOf:Jm,fmtSize:Ac,sizePlan:Qm,validateWebviewMessage:ng,sniff:ig,mtlLibs:sg}});var Ic=na((xS,vf)=>{"use strict";var Rc=Ec(),ps=Tc();Rc.UNITS.stl="mm";var Ys=ps.cfg(),ra=Ys.token,rg=ps.patchFetch(window,ra),Vr=(i,e)=>ps.post(rg,ra,i,e),qs=i=>window.dispatchEvent(new MessageEvent("message",{data:i})),Cc=!1,xf=!1;async function yf(i){let e=Rc.validateWebviewMessage(i);if(!e.ok)return;let t=e.msg;try{switch(t.type){case"ready":{let n=Number(Ys.size)||0;qs({type:"init",name:Ys.name,format:Rc.formatOf(Ys.name),size:n,sizeText:ps.fmtSize(n),plan:ps.sizePlan(n),src:ps.modelSrc(window.location.origin,ra,Ys.name),background:"theme",upAxis:"auto"});return}case"needBytes":qs({type:"error",message:"The file could not be read. It may have been moved or deleted. Close the tab and open the file again."});return;case"rendered":if(xf=!0,!Cc){Cc=!0;let n=await Vr("rendered",{});n&&n.showRate&&og()}return;case"failed":return;case"copy":await Vr("copy",{text:t.text}),qs({type:"copied"});return;case"screenshot":{let n=String(Ys.name||"model").replace(/\.[^.]+$/,"")||"model",s=await Vr("save",{name:n+".png",kind:"base64",data:ps.bytesToBase64(t.data),filters:["png"]});s.cancelled?qs({type:"saved",cancelled:!0}):qs({type:"saved",path:s.file,bytes:s.bytes});return}}}catch(n){qs({type:"error",message:n&&n.message||String(n),soft:t.type!=="ready"})}}window.acquireVsCodeApi=()=>({postMessage:i=>(Promise.resolve().then(()=>yf(i)),!0),getState:()=>null,setState:i=>i});function og(){let i=document.getElementById("zovo-rate");if(i){i.hidden=!1;let e=i.nextElementSibling;e&&(e.hidden=!1)}}function ag(){let i=document.getElementById("zovo-more"),e=document.querySelector("aside.side");i&&e&&(e.append(i),i.hidden=!1)}document.addEventListener("click",i=>{let e=i.target&&i.target.closest&&i.target.closest("a[href]");if(!e)return;let t=e.getAttribute("href");if(i.preventDefault(),t==="#rate"){Vr("rate",{}).catch(()=>{});return}if(t==="#more"){let n=document.querySelector("aside.side"),s=document.querySelector(".toolbar .grow + button");n&&n.hidden&&s&&s.click();let r=document.getElementById("zovo-more");r&&r.scrollIntoView({block:"end"});return}/^https:\/\//.test(t)&&Vr("open",{url:t}).catch(()=>{})},!0);window.zovoShim=()=>({token:!!ra,rendered:xf,counted:Cc,rateShown:!!(document.getElementById("zovo-rate")&&!document.getElementById("zovo-rate").hidden)});vf.exports={placeMoreTools:ag,handle:yf}});function lg(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function cg(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function ur(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xd(){let i=ur("canvas");return i.style.display="block",i}function io(...i){let e="THREE."+i.shift();fr?fr("log",e,...i):console.log(e,...i)}function qd(i){let e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function He(...i){i=qd(i);let e="THREE."+i.shift();if(fr)fr("warn",e,...i);else{let t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ze(...i){i=qd(i);let e="THREE."+i.shift();if(fr)fr("error",e,...i);else{let t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ms(...i){let e=i.join(" ");e in Mf||(Mf[e]=!0,He(...i))}function Yd(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function di(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[t&63|128]+tn[t>>8&255]+"-"+tn[t>>16&255]+tn[t>>24&255]+tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]).toLowerCase()}function rt(i,e,t){return Math.max(e,Math.min(t,i))}function Fh(i,e){return(i%e+e)%e}function hg(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function ug(i,e,t){return i!==e?(t-i)/(e-i):0}function eo(i,e,t){return(1-t)*i+t*e}function fg(i,e,t,n){return eo(i,e,1-Math.exp(-t*n))}function dg(i,e=1){return e-Math.abs(Fh(i,e*2)-e)}function pg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function mg(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function gg(i,e){return i+Math.floor(Math.random()*(e-i+1))}function _g(i,e){return i+Math.random()*(e-i)}function xg(i){return i*(.5-Math.random())}function yg(i){i!==void 0&&(Sf=i);let e=Sf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function vg(i){return i*Qr}function Mg(i){return i*Ts}function Sg(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function bg(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Oh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Tg(i,e,t,n,s){let r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),f=o((e-n)/2),d=r((n-e)/2),g=o((n-e)/2);switch(s){case"XYX":i.set(a*h,l*u,l*f,a*c);break;case"YZY":i.set(l*f,a*h,l*u,a*c);break;case"ZXZ":i.set(l*u,l*f,a*h,a*c);break;case"XZX":i.set(a*h,l*g,l*d,a*c);break;case"YXY":i.set(l*d,a*h,l*g,a*c);break;case"ZYZ":i.set(l*g,l*d,a*h,a*c);break;default:He("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Wl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Bh(i,e){if(e.constructor===Float32Array)return i;let t=Wl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function zh(i,e){if(e.constructor===Float32Array)return i;let t=Wl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}function wg(){let i={enabled:!0,workingColorSpace:pn,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===vt&&(s.r=Ai(s.r),s.g=Ai(s.g),s.b=Ai(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===vt&&(s.r=lr(s.r),s.g=lr(s.g),s.b=lr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Bi?no:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[o].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[pn]:{primaries:e,whitePoint:n,transfer:no,toXYZ:Tf,fromXYZ:wf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:dt},outputColorSpaceConfig:{drawingBufferColorSpace:dt}},[dt]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:Tf,fromXYZ:wf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:dt}}}),i}function Ai(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function lr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}function Dc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ka.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}function Fc(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}function Wc(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){gs.fromArray(i,r);let a=s.x*Math.abs(gs.x)+s.y*Math.abs(gs.y)+s.z*Math.abs(gs.z),l=e.dot(gs),c=t.dot(gs),h=n.dot(gs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}function Nf(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=di()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}function Gg(i,e,t,n,s,r,o,a){let l;if(e.side===$t?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,e.side===Hn,a),l===null)return null;va.copy(a),va.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(va);return c<t.near||c>t.far?null:{distance:c,point:va.clone(),object:i}}function Ma(i,e,t,n,s,r,o,a,l,c){i.getVertexPosition(a,ga),i.getVertexPosition(l,_a),i.getVertexPosition(c,xa);let h=Gg(i,e,t,n,ga,_a,xa,Of);if(h){let u=new B;Ji.getBarycoord(Of,ga,_a,xa,u),s&&(h.uv=Ji.getInterpolatedAttribute(s,a,l,c,u,new Ge)),r&&(h.uv1=Ji.getInterpolatedAttribute(r,a,l,c,u,new Ge)),o&&(h.normal=Ji.getInterpolatedAttribute(o,a,l,c,u,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let f={a,b:l,c,normal:new B,materialIndex:0};Ji.getNormal(ga,_a,xa,f.normal),h.face=f,h.barycoord=u}return h}function Aa(i,e,t,n,s,r,o){let a=i.geometry.attributes.position;if(Wa.fromBufferAttribute(a,s),Xa.fromBufferAttribute(a,r),t.distanceSqToSegment(Wa,Xa,Jc,Yf)>n)return;Jc.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Jc);if(!(c<e.near||c>e.far))return{distance:c,point:Yf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}function $f(i,e,t,n,s,r,o){let a=ih.distanceSqToPoint(i);if(a<t){let l=new B;ih.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}function ks(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];if(Jf(s))s.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(Jf(s[0])){let r=[];for(let o=0,a=s.length;o<a;o++)r[o]=s[o].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function rn(i){let e={};for(let t=0;t<i.length;t++){let n=ks(i[t]);for(let s in n)e[s]=n[s]}return e}function Jf(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function qg(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function kh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}function $i(i,e){return!i||i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Jr(i){return i!==void 0&&i.inTangents!==void 0&&i.outTangents!==void 0}function Kg(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Qf(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let l=0;l!==e;++l)s[o++]=i[a+l]}return s}function jg(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=i[s++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=i[s++];while(r!==void 0)}function $d(i,e,t,n,s){let r=1-i;return r*r*r*e+3*r*r*i*t+3*r*i*i*n+i*i*i*s}function $g(i,e,t,n,s){let r=1-i;return 3*r*r*(t-e)+6*r*i*(n-t)+3*i*i*(s-n)}function Jg(i,e,t,n,s){let r=(i-e)/(s-e);for(let o=0;o<8;o++){let a=$d(r,e,t,n,s)-i;if(Math.abs(a)<1e-10)break;let l=$g(r,e,t,n,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-a/l))}return r}function ed(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]+=e}function td(i,e){for(let t=0,n=i.length;t!==n;t+=2)i[t]*=e}function Qg(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Di;case"vector":case"vector2":case"vector3":case"vector4":return ts;case"color":return vo;case"quaternion":return Ni;case"bool":case"boolean":return Li;case"string":return Ui}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function e0(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Qg(i.type);if(i.times===void 0){let n=[],s=[];jg(i.keys,n,s,"value"),i.times=n,i.values=s}let t;return e.parse!==void 0?t=e.parse(i):t=new e(i.name,i.times,i.values,i.interpolation),Jr(i.settings)&&(t.settings={inTangents:$i(i.settings.inTangents,Float32Array),outTangents:$i(i.settings.outTangents,Float32Array)}),t}function nd(i){try{let e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}function ld(i,e){return i.distance-e.distance}function ch(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let o=0,a=r.length;o<a;o++)ch(r[o],e,t,!0)}}function Vh(i,e,t,n){let s=h0(n);switch(t){case Rh:return i*e;case cl:return i*e/s.components*s.byteLength;case hl:return i*e/s.components*s.byteLength;case ss:return i*e*2/s.components*s.byteLength;case ul:return i*e*2/s.components*s.byteLength;case Ch:return i*e*3/s.components*s.byteLength;case Vn:return i*e*4/s.components*s.byteLength;case fl:return i*e*4/s.components*s.byteLength;case No:case Uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Fo:case Oo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case pl:case gl:return Math.max(i,16)*Math.max(e,8)/4;case dl:case ml:return Math.max(i,8)*Math.max(e,8)/2;case _l:case xl:case vl:case Ml:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case yl:case Bo:case Sl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case bl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Tl:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case wl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Al:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case El:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Rl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Il:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Pl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Nl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ul:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Fl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ol:case Bl:case zl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case kl:case Gl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case zo:case Hl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function h0(i){switch(i){case Sn:case Th:return{byteLength:1,components:1};case Rr:case wh:case ii:return{byteLength:2,components:1};case al:case ll:return{byteLength:2,components:4};case ni:case ol:case Dn:return{byteLength:4,components:1};case Ah:case Eh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}var ns,is,cd,uh,hd,Po,ud,Tr,Hn,$t,gn,Us,wr,fh,dh,ph,fd,Fs,dd,pd,md,gd,_d,xd,yd,vd,mh,gh,Md,Sd,bd,Td,wd,Ad,Ed,Rd,Cd,Da,Na,Ua,cr,Fa,Oa,Ba,za,Lo,Id,Pd,fi,_h,xh,yh,vh,Mh,Sh,Do,th,Ld,bh,Os,Ar,il,sl,dn,fn,Ei,Rt,rl,Bs,Ct,Er,_n,Sn,Th,wh,Rr,ol,ni,Dn,ii,al,ll,zs,Ah,Eh,Rh,Ch,Vn,Ri,Oi,cl,hl,ss,ul,fl,No,Uo,Fo,Oo,dl,pl,ml,gl,_l,xl,yl,vl,Ml,Bo,Sl,bl,Tl,wl,Al,El,Rl,Cl,Il,Pl,Ll,Dl,Nl,Ul,Fl,Ol,Bl,zl,kl,Gl,zo,Hl,Dd,Nd,Ud,Ss,bs,Pa,nh,ys,vs,to,Vl,Fd,Ih,ko,Cr,Od,Ir,Bd,Bi,dt,pn,no,vt,La,zd,kd,Gd,Hd,Ph,Vd,Wd,Lh,Dh,Nh,Uh,zn,hr,Mf,fr,Zd,kn,tn,Sf,Qr,Ts,rs,Ge,Nt,B,Pc,bf,Ke,Lc,Tf,wf,et,Zs,ka,Ag,dr,Eg,Nc,qt,St,Ga,Cn,so,Ha,qe,Ks,jn,Rg,Cg,qi,oa,An,Af,Ef,Qn,pr,Ig,Rf,js,vi,aa,Wr,Pg,Lg,Cf,If,Pf,Lf,Dg,$s,Uc,Et,Lt,Ng,mr,Kd,Yi,la,we,nn,ws,$n,Mi,Oc,Si,Js,Qs,Df,Bc,zc,kc,Gc,Hc,Vc,Ji,Kt,bi,Jn,ca,er,tr,nr,Zi,Ki,ms,Xr,ha,ua,gs,Ft,fa,Ug,pt,ro,oo,ao,As,lo,Es,Je,Fg,qr,Xc,yn,Og,Bn,qc,ir,En,Yr,Xt,at,gr,un,_r,Yc,Bg,zg,Rn,kg,zt,Ti,Zc,da,pa,ci,Gn,Uf,_s,ma,Ff,ga,_a,xa,Kc,ya,Of,va,ht,Zr,Bf,zf,Hg,kf,Sa,jc,Gf,$c,co,xr,yr,Hf,Vg,ho,Ci,sr,Vf,ba,Wf,Wg,Kr,jr,Rs,xs,Xg,Ta,Qi,Xf,Va,jt,Wa,Xa,qf,$r,wa,Jc,Yf,Ii,Zf,Kf,In,uo,Pn,jf,ih,Ea,Ra,ei,fo,Pi,po,mo,es,go,_o,Cs,jd,Yg,Zg,hi,qa,vn,mn,Ln,xo,Ya,Za,ui,Ka,yo,ja,$a,Mn,Li,vo,Di,Ja,Ni,Ui,ts,Is,li,vr,Xl,Dt,wi,sh,sn,rr,Qa,Fi,Ps,Mo,Qc,id,sd,Mr,Ca,Ia,ai,So,ji,rd,od,Bt,rh,bo,oh,Ls,Ds,ah,Ns,ti,eh,To,or,ar,Sr,el,tl,Gh,t0,Hh,n0,i0,s0,r0,o0,a0,l0,lh,Tt,nl,c0,wo,ad,Ao,br,hh,Eo,Ro,Co,Io,Wh=hn(()=>{ns={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},is={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},cd=0,uh=1,hd=2,Po=1,ud=2,Tr=3,Hn=0,$t=1,gn=2,Us=0,wr=1,fh=2,dh=3,ph=4,fd=5,Fs=100,dd=101,pd=102,md=103,gd=104,_d=200,xd=201,yd=202,vd=203,mh=204,gh=205,Md=206,Sd=207,bd=208,Td=209,wd=210,Ad=211,Ed=212,Rd=213,Cd=214,Da=0,Na=1,Ua=2,cr=3,Fa=4,Oa=5,Ba=6,za=7,Lo=0,Id=1,Pd=2,fi=0,_h=1,xh=2,yh=3,vh=4,Mh=5,Sh=6,Do=7,th="attached",Ld="detached",bh=300,Os=301,Ar=302,il=303,sl=304,dn=1e3,fn=1001,Ei=1002,Rt=1003,rl=1004,Bs=1005,Ct=1006,Er=1007,_n=1008,Sn=1009,Th=1010,wh=1011,Rr=1012,ol=1013,ni=1014,Dn=1015,ii=1016,al=1017,ll=1018,zs=1020,Ah=35902,Eh=35899,Rh=1021,Ch=1022,Vn=1023,Ri=1026,Oi=1027,cl=1028,hl=1029,ss=1030,ul=1031,fl=1033,No=33776,Uo=33777,Fo=33778,Oo=33779,dl=35840,pl=35841,ml=35842,gl=35843,_l=36196,xl=37492,yl=37496,vl=37488,Ml=37489,Bo=37490,Sl=37491,bl=37808,Tl=37809,wl=37810,Al=37811,El=37812,Rl=37813,Cl=37814,Il=37815,Pl=37816,Ll=37817,Dl=37818,Nl=37819,Ul=37820,Fl=37821,Ol=36492,Bl=36494,zl=36495,kl=36283,Gl=36284,zo=36285,Hl=36286,Dd=2200,Nd=2201,Ud=2202,Ss=2300,bs=2301,Pa=2302,nh=2303,ys=2400,vs=2401,to=2402,Vl=2500,Fd=2501,Ih=0,ko=1,Cr=2,Od=3200,Ir=0,Bd=1,Bi="",dt="srgb",pn="srgb-linear",no="linear",vt="srgb",La=7680,zd=519,kd=512,Gd=513,Hd=514,Ph=515,Vd=516,Wd=517,Lh=518,Dh=519,Nh=35044,Uh="300 es",zn=2e3,hr=2001;Mf={},fr=null;Zd={[Da]:Da,[Ua]:Ba,[Fa]:Fa,[cr]:Oa,[Na]:Na,[Ba]:Ua,[za]:za,[Oa]:cr},kn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let s=n[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sf=1234567,Qr=Math.PI/180,Ts=180/Math.PI;rs={DEG2RAD:Qr,RAD2DEG:Ts,generateUUID:di,clamp:rt,euclideanModulo:Fh,mapLinear:hg,inverseLerp:ug,lerp:eo,damp:fg,pingpong:dg,smoothstep:pg,smootherstep:mg,randInt:gg,randFloat:_g,randFloatSpread:xg,seededRandom:yg,degToRad:vg,radToDeg:Mg,isPowerOfTwo:Sg,ceilPowerOfTwo:bg,floorPowerOfTwo:Oh,setQuaternionFromProperEuler:Tg,normalize:zh,denormalize:Bh},Ge=class{static{this.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Nt=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],f=r[o+0],d=r[o+1],g=r[o+2],x=r[o+3];if(u!==x||l!==f||c!==d||h!==g){let _=l*f+c*d+h*g+u*x;_<0&&(f=-f,d=-d,g=-g,x=-x,_=-_);let m=1-a;if(_<.9995){let w=Math.acos(_),M=Math.sin(w);m=Math.sin(m*w)/M,a=Math.sin(a*w)/M,l=l*m+f*a,c=c*m+d*a,h=h*m+g*a,u=u*m+x*a}else{l=l*m+f*a,c=c*m+d*a,h=h*m+g*a,u=u*m+x*a;let w=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=w,c*=w,h*=w,u*=w}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],g=r[o+3];return e[t]=a*g+h*u+l*d-c*f,e[t+1]=l*g+h*f+c*u-a*d,e[t+2]=c*g+h*d+a*f-l*u,e[t+3]=h*g-a*u-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),f=l(n/2),d=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"YXZ":this._x=f*h*u+c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"ZXY":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u-f*d*g;break;case"ZYX":this._x=f*h*u-c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u+f*d*g;break;case"YZX":this._x=f*h*u+c*d*g,this._y=c*d*u+f*h*g,this._z=c*h*g-f*d*u,this._w=c*h*u-f*d*g;break;case"XZY":this._x=f*h*u-c*d*g,this._y=c*d*u-f*h*g,this._z=c*h*g+f*d*u,this._w=c*h*u+f*d*g;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){let d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-l)*d,this._y=(r-c)*d,this._z=(o-s)*d}else if(n>a&&n>u){let d=2*Math.sqrt(1+n-a-u);this._w=(h-l)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+c)/d}else if(a>u){let d=2*Math.sqrt(1+a-n-u);this._w=(r-c)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,s=-s,r=-r,o=-o,a=-a);let l=1-t;if(a<.9995){let c=Math.acos(a),h=Math.sin(c);l=Math.sin(l*c)/h,t=Math.sin(t*c)/h,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class{static{this.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(bf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(bf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pc.copy(this).projectOnVector(e),this.sub(Pc)}reflect(e){return this.sub(Pc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(rt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Pc=new B,bf=new Nt,Ke=class{static{this.prototype.isMatrix3=!0}constructor(e,t,n,s,r,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c)}set(e,t,n,s,r,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],d=n[5],g=n[8],x=s[0],_=s[3],m=s[6],w=s[1],M=s[4],v=s[7],A=s[2],b=s[5],p=s[8];return r[0]=o*x+a*w+l*A,r[3]=o*_+a*M+l*b,r[6]=o*m+a*v+l*p,r[1]=c*x+h*w+u*A,r[4]=c*_+h*M+u*b,r[7]=c*m+h*v+u*p,r[2]=f*x+d*w+g*A,r[5]=f*_+d*M+g*b,r[8]=f*m+d*v+g*p,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,f=a*l-h*r,d=c*r-o*l,g=t*u+n*f+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(s*c-h*n)*x,e[2]=(a*n-s*o)*x,e[3]=f*x,e[4]=(h*t-s*l)*x,e[5]=(s*r-a*t)*x,e[6]=d*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return Ms("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Lc.makeScale(e,t)),this}rotate(e){return Ms("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Lc.makeRotation(-e)),this}translate(e,t){return Ms("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Lc.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Lc=new Ke,Tf=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wf=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);et=wg();ka=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Zs===void 0&&(Zs=ur("canvas")),Zs.width=e.width,Zs.height=e.height;let s=Zs.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=Zs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ur("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ai(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ai(t[n]/255)*255):t[n]=Ai(t[n]);return{data:t,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Ag=0,dr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Dc(s[o].image)):r.push(Dc(s[o]))}else r=Dc(s);n.url=r}return t||(e.images[this.uuid]=n),n}};Eg=0,Nc=new B,qt=class i extends kn{constructor(e=i.DEFAULT_IMAGE,t=i.DEFAULT_MAPPING,n=fn,s=fn,r=Ct,o=_n,a=Vn,l=Sn,c=i.DEFAULT_ANISOTROPY,h=Bi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eg++}),this.uuid=di(),this.name="",this.source=new dr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Nc).x}get height(){return this.source.getSize(Nc).y}get depth(){return this.source.getSize(Nc).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){He(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dn:e.x=e.x-Math.floor(e.x);break;case fn:e.x=e.x<0?0:1;break;case Ei:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dn:e.y=e.y-Math.floor(e.y);break;case fn:e.y=e.y<0?0:1;break;case Ei:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};qt.DEFAULT_IMAGE=null;qt.DEFAULT_MAPPING=bh;qt.DEFAULT_ANISOTROPY=1;St=class{static{this.prototype.isVector4=!0}constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],d=l[5],g=l[9],x=l[2],_=l[6],m=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-x)<.01&&Math.abs(g-_)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+x)<.1&&Math.abs(g+_)<.1&&Math.abs(c+d+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let M=(c+1)/2,v=(d+1)/2,A=(m+1)/2,b=(h+f)/4,p=(u+x)/4,y=(g+_)/4;return M>v&&M>A?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=b/n,r=p/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=b/s,r=y/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=p/r,s=y/r),this.set(n,s,r,t),this}let w=Math.sqrt((_-g)*(_-g)+(u-x)*(u-x)+(f-h)*(f-h));return Math.abs(w)<.001&&(w=1),this.x=(_-g)/w,this.y=(u-x)/w,this.z=(f-h)/w,this.w=Math.acos((c+d+m-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=rt(this.x,e.x,t.x),this.y=rt(this.y,e.y,t.y),this.z=rt(this.z,e.z,t.z),this.w=rt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=rt(this.x,e,t),this.y=rt(this.y,e,t),this.z=rt(this.z,e,t),this.w=rt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(rt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ga=class extends kn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new St(0,0,e,t),this.scissorTest=!1,this.viewport=new St(0,0,e,t),this.textures=[];let s=n.count;for(let r=0;r<s;r++)this.textures[r]=new qt({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new dr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cn=class extends Ga{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},so=class extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ha=class extends qt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},qe=class i{static{this.prototype.isMatrix4=!0}constructor(e,t,n,s,r,o,a,l,c,h,u,f,d,g,x,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,l,c,h,u,f,d,g,x,_)}set(e,t,n,s,r,o,a,l,c,h,u,f,d,g,x,_){let m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=f,m[3]=d,m[7]=g,m[11]=x,m[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,s=1/Ks.setFromMatrixColumn(e,0).length(),r=1/Ks.setFromMatrixColumn(e,1).length(),o=1/Ks.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let f=o*h,d=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=d+g*c,t[5]=f-x*c,t[9]=-a*l,t[2]=x-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){let f=l*h,d=l*u,g=c*h,x=c*u;t[0]=f+x*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=d*a-g,t[6]=x+f*a,t[10]=o*l}else if(e.order==="ZXY"){let f=l*h,d=l*u,g=c*h,x=c*u;t[0]=f-x*a,t[4]=-o*u,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*h,t[9]=x-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let f=o*h,d=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-d,t[8]=f*c+x,t[1]=l*u,t[5]=x*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let f=o*l,d=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-f*u,t[8]=g*u+d,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=d*u+g,t[10]=f-x*u}else if(e.order==="XZY"){let f=o*l,d=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+x,t[5]=o*h,t[9]=d*u-g,t[2]=g*u-d,t[6]=a*h,t[10]=x*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Rg,e,Cg)}lookAt(e,t,n){let s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),qi.crossVectors(n,An),qi.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),qi.crossVectors(n,An)),qi.normalize(),oa.crossVectors(An,qi),s[0]=qi.x,s[4]=oa.x,s[8]=An.x,s[1]=qi.y,s[5]=oa.y,s[9]=An.y,s[2]=qi.z,s[6]=oa.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],d=n[13],g=n[2],x=n[6],_=n[10],m=n[14],w=n[3],M=n[7],v=n[11],A=n[15],b=s[0],p=s[4],y=s[8],I=s[12],R=s[1],P=s[5],F=s[9],z=s[13],C=s[2],W=s[6],X=s[10],q=s[14],ae=s[3],Z=s[7],se=s[11],le=s[15];return r[0]=o*b+a*R+l*C+c*ae,r[4]=o*p+a*P+l*W+c*Z,r[8]=o*y+a*F+l*X+c*se,r[12]=o*I+a*z+l*q+c*le,r[1]=h*b+u*R+f*C+d*ae,r[5]=h*p+u*P+f*W+d*Z,r[9]=h*y+u*F+f*X+d*se,r[13]=h*I+u*z+f*q+d*le,r[2]=g*b+x*R+_*C+m*ae,r[6]=g*p+x*P+_*W+m*Z,r[10]=g*y+x*F+_*X+m*se,r[14]=g*I+x*z+_*q+m*le,r[3]=w*b+M*R+v*C+A*ae,r[7]=w*p+M*P+v*W+A*Z,r[11]=w*y+M*F+v*X+A*se,r[15]=w*I+M*z+v*q+A*le,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],d=e[14],g=e[3],x=e[7],_=e[11],m=e[15],w=l*d-c*f,M=a*d-c*u,v=a*f-l*u,A=o*d-c*h,b=o*f-l*h,p=o*u-a*h;return t*(x*w-_*M+m*v)-n*(g*w-_*A+m*b)+s*(g*M-x*A+m*p)-r*(g*v-x*b+_*p)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],o=e[5],a=e[9],l=e[2],c=e[6],h=e[10];return t*(o*h-a*c)-n*(r*h-a*l)+s*(r*c-o*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],d=e[11],g=e[12],x=e[13],_=e[14],m=e[15],w=t*a-n*o,M=t*l-s*o,v=t*c-r*o,A=n*l-s*a,b=n*c-r*a,p=s*c-r*l,y=h*x-u*g,I=h*_-f*g,R=h*m-d*g,P=u*_-f*x,F=u*m-d*x,z=f*m-d*_,C=w*z-M*F+v*P+A*R-b*I+p*y;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let W=1/C;return e[0]=(a*z-l*F+c*P)*W,e[1]=(s*F-n*z-r*P)*W,e[2]=(x*p-_*b+m*A)*W,e[3]=(f*b-u*p-d*A)*W,e[4]=(l*R-o*z-c*I)*W,e[5]=(t*z-s*R+r*I)*W,e[6]=(_*v-g*p-m*M)*W,e[7]=(h*p-f*v+d*M)*W,e[8]=(o*F-a*R+c*y)*W,e[9]=(n*R-t*F-r*y)*W,e[10]=(g*b-x*v+m*w)*W,e[11]=(u*v-h*b-d*w)*W,e[12]=(a*I-o*P-l*y)*W,e[13]=(t*P-n*I+s*y)*W,e[14]=(x*M-g*A-_*w)*W,e[15]=(h*A-u*M+f*w)*W,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,h=o+o,u=a+a,f=r*c,d=r*h,g=r*u,x=o*h,_=o*u,m=a*u,w=l*c,M=l*h,v=l*u,A=n.x,b=n.y,p=n.z;return s[0]=(1-(x+m))*A,s[1]=(d+v)*A,s[2]=(g-M)*A,s[3]=0,s[4]=(d-v)*b,s[5]=(1-(f+m))*b,s[6]=(_+w)*b,s[7]=0,s[8]=(g+M)*p,s[9]=(_-w)*p,s[10]=(1-(f+x))*p,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let o=Ks.set(s[0],s[1],s[2]).length(),a=Ks.set(s[4],s[5],s[6]).length(),l=Ks.set(s[8],s[9],s[10]).length();r<0&&(o=-o),jn.copy(this);let c=1/o,h=1/a,u=1/l;return jn.elements[0]*=c,jn.elements[1]*=c,jn.elements[2]*=c,jn.elements[4]*=h,jn.elements[5]*=h,jn.elements[6]*=h,jn.elements[8]*=u,jn.elements[9]*=u,jn.elements[10]*=u,t.setFromRotationMatrix(jn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,s,r,o,a=zn,l=!1){let c=this.elements,h=2*r/(t-e),u=2*r/(n-s),f=(t+e)/(t-e),d=(n+s)/(n-s),g,x;if(l)g=r/(o-r),x=o*r/(o-r);else if(a===zn)g=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===hr)g=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=zn,l=!1){let c=this.elements,h=2/(t-e),u=2/(n-s),f=-(t+e)/(t-e),d=-(n+s)/(n-s),g,x;if(l)g=1/(o-r),x=o/(o-r);else if(a===zn)g=-2/(o-r),x=-(o+r)/(o-r);else if(a===hr)g=-1/(o-r),x=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=u,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ks=new B,jn=new qe,Rg=new B(0,0,0),Cg=new B(1,1,1),qi=new B,oa=new B,An=new B,Af=new qe,Ef=new Nt,Qn=class i{constructor(e=0,t=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(t){case"XYZ":this._y=Math.asin(rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(rt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Af.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Af,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ef.setFromEuler(this),this.setFromQuaternion(Ef,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";pr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},Ig=0,Rf=new B,js=new Nt,vi=new qe,aa=new B,Wr=new B,Pg=new B,Lg=new Nt,Cf=new B(1,0,0),If=new B(0,1,0),Pf=new B(0,0,1),Lf={type:"added"},Dg={type:"removed"},$s={type:"childadded",child:null},Uc={type:"childremoved",child:null},Et=class i extends kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ig++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let e=new B,t=new Qn,n=new Nt,s=new B(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ke}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.multiply(js),this}rotateOnWorldAxis(e,t){return js.setFromAxisAngle(e,t),this.quaternion.premultiply(js),this}rotateX(e){return this.rotateOnAxis(Cf,e)}rotateY(e){return this.rotateOnAxis(If,e)}rotateZ(e){return this.rotateOnAxis(Pf,e)}translateOnAxis(e,t){return Rf.copy(e).applyQuaternion(this.quaternion),this.position.add(Rf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cf,e)}translateY(e){return this.translateOnAxis(If,e)}translateZ(e){return this.translateOnAxis(Pf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?aa.copy(e):aa.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Wr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Wr,aa,this.up):vi.lookAt(aa,Wr,this.up),this.quaternion.setFromRotationMatrix(vi),s&&(vi.extractRotation(s.matrixWorld),js.setFromRotationMatrix(vi),this.quaternion.premultiply(js.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ze("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lf),$s.child=e,this.dispatchEvent($s),$s.child=null):Ze("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dg),Uc.child=e,this.dispatchEvent(Uc),Uc.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vi.multiply(e.parent.matrixWorld)),e.applyMatrix4(vi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lf),$s.child=e,this.dispatchEvent($s),$s.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,e,Pg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wr,Lg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let r=this.children;for(let o=0,a=r.length;o<a;o++)r[o].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Et.DEFAULT_UP=new B(0,1,0);Et.DEFAULT_MATRIX_AUTO_UPDATE=!0;Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Lt=class extends Et{constructor(){super(),this.isGroup=!0,this.type="Group"}},Ng={type:"move"},mr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let _=t.getJointPose(x,n),m=this._getHandJoint(c,x);_!==null&&(m.matrix.fromArray(_.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=_.radius),m.visible=_!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.quaternion,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ng)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Lt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Kd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yi={h:0,s:0,l:0},la={h:0,s:0,l:0};we=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Fh(e,1),t=rt(t,0,1),n=rt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Fc(o,r,e+1/3),this.g=Fc(o,r,e),this.b=Fc(o,r,e-1/3)}return et.colorSpaceToWorking(this,s),this}setStyle(e,t=dt){function n(r){r!==void 0&&parseFloat(r)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:He("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=dt){let n=Kd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ai(e.r),this.g=Ai(e.g),this.b=Ai(e.b),this}copyLinearToSRGB(e){return this.r=lr(e.r),this.g=lr(e.g),this.b=lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=dt){return et.workingToColorSpace(nn.copy(this),e),Math.round(rt(nn.r*255,0,255))*65536+Math.round(rt(nn.g*255,0,255))*256+Math.round(rt(nn.b*255,0,255))}getHexString(e=dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.workingToColorSpace(nn.copy(this),t);let n=nn.r,s=nn.g,r=nn.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.workingToColorSpace(nn.copy(this),t),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=dt){et.workingToColorSpace(nn.copy(this),e);let t=nn.r,n=nn.g,s=nn.b;return e!==dt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Yi),this.setHSL(Yi.h+e,Yi.s+t,Yi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Yi),e.getHSL(la);let n=eo(Yi.h,la.h,t),s=eo(Yi.s,la.s,t),r=eo(Yi.l,la.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},nn=new we;we.NAMES=Kd;ws=class extends Et{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},$n=new B,Mi=new B,Oc=new B,Si=new B,Js=new B,Qs=new B,Df=new B,Bc=new B,zc=new B,kc=new B,Gc=new St,Hc=new St,Vc=new St,Ji=class i{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),$n.subVectors(e,t),s.cross($n);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){$n.subVectors(s,t),Mi.subVectors(n,t),Oc.subVectors(e,t);let o=$n.dot($n),a=$n.dot(Mi),l=$n.dot(Oc),c=Mi.dot(Mi),h=Mi.dot(Oc),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,d=(c*l-a*h)*f,g=(o*h-a*l)*f;return r.set(1-d-g,g,d)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Si)===null?!1:Si.x>=0&&Si.y>=0&&Si.x+Si.y<=1}static getInterpolation(e,t,n,s,r,o,a,l){return this.getBarycoord(e,t,n,s,Si)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Si.x),l.addScaledVector(o,Si.y),l.addScaledVector(a,Si.z),l)}static getInterpolatedAttribute(e,t,n,s,r,o){return Gc.setScalar(0),Hc.setScalar(0),Vc.setScalar(0),Gc.fromBufferAttribute(e,t),Hc.fromBufferAttribute(e,n),Vc.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Gc,r.x),o.addScaledVector(Hc,r.y),o.addScaledVector(Vc,r.z),o}static isFrontFacing(e,t,n,s){return $n.subVectors(n,t),Mi.subVectors(e,t),$n.cross(Mi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $n.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),$n.cross(Mi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return i.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return i.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return i.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return i.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return i.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,o,a;Js.subVectors(s,n),Qs.subVectors(r,n),Bc.subVectors(e,n);let l=Js.dot(Bc),c=Qs.dot(Bc);if(l<=0&&c<=0)return t.copy(n);zc.subVectors(e,s);let h=Js.dot(zc),u=Qs.dot(zc);if(h>=0&&u<=h)return t.copy(s);let f=l*u-h*c;if(f<=0&&l>=0&&h<=0&&l-h>0)return o=l/(l-h),t.copy(n).addScaledVector(Js,o);kc.subVectors(e,r);let d=Js.dot(kc),g=Qs.dot(kc);if(g>=0&&d<=g)return t.copy(r);let x=d*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Qs,a);let _=h*g-d*u;if(_<=0&&u-h>=0&&d-g>=0)return Df.subVectors(r,s),a=(u-h)/(u-h+(d-g)),t.copy(s).addScaledVector(Df,a);let m=1/(_+x+f);return o=x*m,a=f*m,t.copy(n).addScaledVector(Js,o).addScaledVector(Qs,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Kt=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Jn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Jn):Jn.fromBufferAttribute(r,o),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ca.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ca.copy(n.boundingBox)),ca.applyMatrix4(e.matrixWorld),this.union(ca)}let s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Xr),ha.subVectors(this.max,Xr),er.subVectors(e.a,Xr),tr.subVectors(e.b,Xr),nr.subVectors(e.c,Xr),Zi.subVectors(tr,er),Ki.subVectors(nr,tr),ms.subVectors(er,nr);let t=[0,-Zi.z,Zi.y,0,-Ki.z,Ki.y,0,-ms.z,ms.y,Zi.z,0,-Zi.x,Ki.z,0,-Ki.x,ms.z,0,-ms.x,-Zi.y,Zi.x,0,-Ki.y,Ki.x,0,-ms.y,ms.x,0];return!Wc(t,er,tr,nr,ha)||(t=[1,0,0,0,1,0,0,0,1],!Wc(t,er,tr,nr,ha))?!1:(ua.crossVectors(Zi,Ki),t=[ua.x,ua.y,ua.z],Wc(t,er,tr,nr,ha))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},bi=[new B,new B,new B,new B,new B,new B,new B,new B],Jn=new B,ca=new Kt,er=new B,tr=new B,nr=new B,Zi=new B,Ki=new B,ms=new B,Xr=new B,ha=new B,ua=new B,gs=new B;Ft=new B,fa=new Ge,Ug=0,pt=class extends kn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ug++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Nh,this.updateRanges=[],this.gpuType=Dn,this.version=0,this._normalizationScale=e!==void 0?Wl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fa.fromBufferAttribute(this,t),fa.applyMatrix3(e),this.setXY(t,fa.x,fa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix3(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Bh(e,this.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):zh(e,this.array)}},ro=class extends pt{constructor(e,t,n){super(new Int8Array(e),t,n)}},oo=class extends pt{constructor(e,t,n){super(new Uint8Array(e),t,n)}},ao=class extends pt{constructor(e,t,n){super(new Int16Array(e),t,n)}},As=class extends pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}},lo=class extends pt{constructor(e,t,n){super(new Int32Array(e),t,n)}},Es=class extends pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Je=class extends pt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Fg=new Kt,qr=new B,Xc=new B,yn=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):Fg.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qr.subVectors(e,this.center);let t=qr.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(qr,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Xc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(qr.copy(e.center).add(Xc)),this.expandByPoint(qr.copy(e.center).sub(Xc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Og=0,Bn=new qe,qc=new Et,ir=new B,En=new Kt,Yr=new Kt,Xt=new B,at=class i extends kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Og++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lg(e)?Es:As)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ke().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Bn.makeRotationFromQuaternion(e),this.applyMatrix4(Bn),this}rotateX(e){return Bn.makeRotationX(e),this.applyMatrix4(Bn),this}rotateY(e){return Bn.makeRotationY(e),this.applyMatrix4(Bn),this}rotateZ(e){return Bn.makeRotationZ(e),this.applyMatrix4(Bn),this}translate(e,t,n){return Bn.makeTranslation(e,t,n),this.applyMatrix4(Bn),this}scale(e,t,n){return Bn.makeScale(e,t,n),this.applyMatrix4(Bn),this}lookAt(e){return qc.lookAt(e),qc.updateMatrix(),this.applyMatrix4(qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ir).negate(),this.translate(ir.x,ir.y,ir.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Je(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Kt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];En.setFromBufferAttribute(r),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,En.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,En.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(En.min),this.boundingBox.expandByPoint(En.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(En.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];Yr.setFromBufferAttribute(a),this.morphTargetsRelative?(Xt.addVectors(En.min,Yr.min),En.expandByPoint(Xt),Xt.addVectors(En.max,Yr.max),En.expandByPoint(Xt)):(En.expandByPoint(Yr.min),En.expandByPoint(Yr.max))}En.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Xt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Xt.fromBufferAttribute(a,c),l&&(ir.fromBufferAttribute(e,c),Xt.add(ir)),s=Math.max(s,n.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv,o=this.getAttribute("tangent");(o===void 0||o.count!==n.count)&&(o=new pt(new Float32Array(4*n.count),4),this.setAttribute("tangent",o));let a=[],l=[],c=new Uint8Array(n.count);for(let I=0;I<n.count;I++)a[I]=new B,l[I]=new B;let h=new B,u=new B,f=new B,d=new Ge,g=new Ge,x=new Ge,_=new B,m=new B;function w(I,R,P){c[I]=c[R]=c[P]=1,h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,R),f.fromBufferAttribute(n,P),d.fromBufferAttribute(r,I),g.fromBufferAttribute(r,R),x.fromBufferAttribute(r,P),u.sub(h),f.sub(h),g.sub(d),x.sub(d);let F=1/(g.x*x.y-x.x*g.y);isFinite(F)&&(_.copy(u).multiplyScalar(x.y).addScaledVector(f,-g.y).multiplyScalar(F),m.copy(f).multiplyScalar(g.x).addScaledVector(u,-x.x).multiplyScalar(F),a[I].add(_),a[R].add(_),a[P].add(_),l[I].add(m),l[R].add(m),l[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let I=0,R=M.length;I<R;++I){let P=M[I],F=P.start,z=P.count;for(let C=F,W=F+z;C<W;C+=3)w(e.getX(C+0),e.getX(C+1),e.getX(C+2))}let v=new B,A=new B,b=new B,p=new B;function y(I){b.fromBufferAttribute(s,I),p.copy(b);let R=a[I];v.copy(R),v.sub(b.multiplyScalar(b.dot(R))).normalize(),A.crossVectors(p,R);let F=A.dot(l[I])<0?-1:1;o.setXYZW(I,v.x,v.y,v.z,F)}for(let I=0,R=n.count;I<R;++I)c[I]&&y(I);this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new pt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);let s=new B,r=new B,o=new B,a=new B,l=new B,c=new B,h=new B,u=new B;if(e)for(let f=0,d=e.count;f<d;f+=3){let g=e.getX(f+0),x=e.getX(f+1),_=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,x),o.fromBufferAttribute(t,_),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,_),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(_,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Xt.fromBufferAttribute(e,t),Xt.normalize(),e.setXYZ(t,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,f=new c.constructor(l.length*h),d=0,g=0;for(let x=0,_=l.length;x<_;x++){a.isInterleavedBufferAttribute?d=l[x]*a.data.stride+a.offset:d=l[x]*h;for(let m=0;m<h;m++)f[g++]=c[d++]}return new pt(f,h,u)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=e(l,n);t.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let f=c[h],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){let d=c[u];h.push(d.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},gr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Nh,this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Nf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);let n=new this.array.constructor(e.arrayBuffers[t]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});let t=Nf(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));let n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}};un=new B,_r=class i{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s,this._normalizationScale=e!==void 0?Wl(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyMatrix4(e),this.setXYZ(t,un.x,un.y,un.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.applyNormalMatrix(e),this.setXYZ(t,un.x,un.y,un.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)un.fromBufferAttribute(this,t),un.transformDirection(e),this.setXYZ(t,un.x,un.y,un.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){io("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new pt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new i(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){io("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){let t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Bh(e,this.data.array)}_normalize(e){let t=this._normalizationScale;return t!==void 0?Math.round(e*t):zh(e,this.data.array)}},Yc=new B,Bg=new B,zg=new Ke,Rn=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Yc.subVectors(n,t).cross(Bg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let s=e.delta(Yc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let o=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(o<0||o>1)?null:t.copy(e.start).addScaledVector(s,o)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||zg.getNormalMatrix(e),s=this.coplanarPoint(Yc).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},kg=0,zt=class extends kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=di(),this.name="",this.type="Material",this.blending=wr,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mh,this.blendDst=gh,this.blendEquation=Fs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=cr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=zd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=La,this.stencilZFail=La,this.stencilZPass=La,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){He(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){He(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(t){let r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new we().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Rn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ge().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ge().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Ti=new B,Zc=new B,da=new B,pa=new B,ci=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,t),Ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Zc.copy(e).add(t).multiplyScalar(.5),da.copy(t).sub(e).normalize(),pa.copy(this.origin).sub(Zc);let r=e.distanceTo(t)*.5,o=-this.direction.dot(da),a=pa.dot(this.direction),l=-pa.dot(da),c=pa.lengthSq(),h=Math.abs(1-o*o),u,f,d,g;if(h>0)if(u=o*l-a,f=o*a-l,g=r*h,u>=0)if(f>=-g)if(f<=g){let x=1/h;u*=x,f*=x,d=u*(u+o*f+2*a)+f*(o*u+f+2*l)+c}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),d=f*(f+2*l)+c):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-l),r),d=-u*u+f*(f+2*l)+c);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Zc).addScaledVector(da,f),d}intersectSphere(e,t){if(e.radius<0)return null;Ti.subVectors(e.center,this.origin);let n=Ti.dot(this.direction),s=Ti.dot(Ti)-n*n,r=e.radius*e.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,t,n,s,r){let o=this.origin,a=this.direction,l=a.x,c=a.y,h=a.z,u=e.x-o.x,f=e.y-o.y,d=e.z-o.z,g=t.x-o.x,x=t.y-o.y,_=t.z-o.z,m=n.x-o.x,w=n.y-o.y,M=n.z-o.z,v=Math.abs(l),A=Math.abs(c),b=Math.abs(h),p,y,I,R,P,F,z,C,W,X,q,ae;if(v>=A&&v>=b?(I=l,F=u,W=g,ae=m,l>=0?(p=c,y=h,R=f,P=d,z=x,C=_,X=w,q=M):(p=h,y=c,R=d,P=f,z=_,C=x,X=M,q=w)):A>=b?(I=c,F=f,W=x,ae=w,c>=0?(p=h,y=l,R=d,P=u,z=_,C=g,X=M,q=m):(p=l,y=h,R=u,P=d,z=g,C=_,X=m,q=M)):(I=h,F=d,W=_,ae=M,h>=0?(p=l,y=c,R=u,P=f,z=g,C=x,X=m,q=w):(p=c,y=l,R=f,P=u,z=x,C=g,X=w,q=m)),I===0)return null;let Z=p/I,se=y/I,le=1/I,Le=R-Z*F,Ue=P-se*F,ee=z-Z*W,Me=C-se*W,Pe=X-Z*ae,Ve=q-se*ae,D=Pe*Me-Ve*ee,N=Le*Ve-Ue*Pe,$=ee*Ue-Me*Le;if(s){if(D<0||N<0||$<0)return null}else if((D<0||N<0||$<0)&&(D>0||N>0||$>0))return null;let G=D+N+$;if(G===0)return null;let j=le*(D*F+N*W+$*ae);return(G>0?j<0:j>0)?null:this.at(j/G,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Gn=class extends zt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Lo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Uf=new qe,_s=new ci,ma=new yn,Ff=new B,ga=new B,_a=new B,xa=new B,Kc=new B,ya=new B,Of=new B,va=new B,ht=class extends Et{constructor(e=new at,t=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let a=this.morphTargetInfluences;if(r&&a){ya.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(Kc.fromBufferAttribute(u,e),o?ya.addScaledVector(Kc,h):ya.addScaledVector(Kc.sub(t),h))}t.add(ya)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(r),_s.copy(e.ray).recast(e.near),!(ma.containsPoint(_s.origin)===!1&&(_s.intersectSphere(ma,Ff)===null||_s.origin.distanceToSquared(Ff)>(e.far-e.near)**2))&&(Uf.copy(r).invert(),_s.copy(e.ray).applyMatrix4(Uf),!(n.boundingBox!==null&&_s.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,_s)))}_computeIntersections(e,t,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let _=f[g],m=o[_.materialIndex],w=Math.max(_.start,d.start),M=Math.min(a.count,Math.min(_.start+_.count,d.start+d.count));for(let v=w,A=M;v<A;v+=3){let b=a.getX(v),p=a.getX(v+1),y=a.getX(v+2);s=Ma(this,m,e,n,c,h,u,b,p,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),x=Math.min(a.count,d.start+d.count);for(let _=g,m=x;_<m;_+=3){let w=a.getX(_),M=a.getX(_+1),v=a.getX(_+2);s=Ma(this,o,e,n,c,h,u,w,M,v),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=f.length;g<x;g++){let _=f[g],m=o[_.materialIndex],w=Math.max(_.start,d.start),M=Math.min(l.count,Math.min(_.start+_.count,d.start+d.count));for(let v=w,A=M;v<A;v+=3){let b=v,p=v+1,y=v+2;s=Ma(this,m,e,n,c,h,u,b,p,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=_.materialIndex,t.push(s))}}else{let g=Math.max(0,d.start),x=Math.min(l.count,d.start+d.count);for(let _=g,m=x;_<m;_+=3){let w=_,M=_+1,v=_+2;s=Ma(this,o,e,n,c,h,u,w,M,v),s&&(s.faceIndex=Math.floor(_/3),t.push(s))}}}};Zr=new St,Bf=new St,zf=new St,Hg=new St,kf=new qe,Sa=new B,jc=new yn,Gf=new qe,$c=new ci,co=class extends ht{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=th,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Kt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Sa),this.boundingBox.expandByPoint(Sa)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new yn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Sa),this.boundingSphere.expandByPoint(Sa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jc.copy(this.boundingSphere),jc.applyMatrix4(s),e.ray.intersectsSphere(jc)!==!1&&(Gf.copy(s).invert(),$c.copy(e.ray).applyMatrix4(Gf),!(this.boundingBox!==null&&$c.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,$c)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new St,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===th?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Ld?this.bindMatrixInverse.copy(this.bindMatrix).invert():He("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;Bf.fromBufferAttribute(s.attributes.skinIndex,e),zf.fromBufferAttribute(s.attributes.skinWeight,e),t.isVector4?(Zr.copy(t),t.set(0,0,0,0)):(Zr.set(t.x,t.y,t.z,1),t.set(0,0,0)),Zr.applyMatrix4(this.bindMatrix);for(let r=0;r<4;r++){let o=zf.getComponent(r);if(o!==0){let a=Bf.getComponent(r);kf.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Hg.copy(Zr).applyMatrix4(kf),o)}}return t.isVector4&&(t.w=Zr.w),t.applyMatrix4(this.bindMatrixInverse)}},xr=class extends Et{constructor(){super(),this.isBone=!0,this.type="Bone"}},yr=class extends qt{constructor(e=null,t=1,n=1,s,r,o,a,l,c=Rt,h=Rt,u,f){super(null,o,a,l,c,h,s,r,u,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Hf=new qe,Vg=new qe,ho=class i{constructor(e=[],t=[]){this.uuid=di(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.previousBoneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){He("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new qe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:Vg;Hf.multiplyMatrices(a,t[r]),Hf.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new i(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new yr(t,e,e,Vn,Dn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null),this.previousBoneTexture!==null&&(this.previousBoneTexture.dispose(),this.previousBoneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],o=t[r];o===void 0&&(He("Skeleton: No bone found with UUID:",r),o=new xr),this.bones.push(o),this.boneInverses.push(new qe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let o=t[s];e.bones.push(o.uuid);let a=n[s];e.boneInverses.push(a.toArray())}return e}},Ci=class extends pt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},sr=new qe,Vf=new qe,ba=[],Wf=new Kt,Wg=new qe,Kr=new ht,jr=new yn,Rs=class extends ht{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ci(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Wg)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Kt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),Wf.copy(e.boundingBox).applyMatrix4(sr),this.boundingBox.union(Wf)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,sr),jr.copy(e.boundingSphere).applyMatrix4(sr),this.boundingSphere.union(jr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Kr.geometry=this.geometry,Kr.material=this.material,Kr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jr.copy(this.boundingSphere),jr.applyMatrix4(n),e.ray.intersectsSphere(jr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,sr),Vf.multiplyMatrices(n,sr),Kr.matrixWorld=Vf,Kr.raycast(e,ba);for(let o=0,a=ba.length;o<a;o++){let l=ba[o];l.instanceId=r,l.object=this,t.push(l)}ba.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ci(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new yr(new Float32Array(s*this.count),s,this.count,cl,Dn));let r=this.morphTexture.source.data.data,o=0;for(let c=0;c<n.length;c++)o+=n[c];let a=this.geometry.morphTargetsRelative?1:1-o,l=s*e;return r[l]=a,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},xs=new yn,Xg=new Ge(.5,.5),Ta=new B,Qi=class{constructor(e=new Rn,t=new Rn,n=new Rn,s=new Rn,r=new Rn,o=new Rn){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn,n=!1){let s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],h=r[4],u=r[5],f=r[6],d=r[7],g=r[8],x=r[9],_=r[10],m=r[11],w=r[12],M=r[13],v=r[14],A=r[15];if(s[0].setComponents(c-o,d-h,m-g,A-w).normalize(),s[1].setComponents(c+o,d+h,m+g,A+w).normalize(),s[2].setComponents(c+a,d+u,m+x,A+M).normalize(),s[3].setComponents(c-a,d-u,m-x,A-M).normalize(),n)s[4].setComponents(l,f,_,v).normalize(),s[5].setComponents(c-l,d-f,m-_,A-v).normalize();else if(s[4].setComponents(c-l,d-f,m-_,A-v).normalize(),t===zn)s[5].setComponents(c+l,d+f,m+_,A+v).normalize();else if(t===hr)s[5].setComponents(l,f,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),xs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),xs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(xs)}intersectsSprite(e){xs.center.set(0,0,0);let t=Xg.distanceTo(e.center);return xs.radius=.7071067811865476+t,xs.applyMatrix4(e.matrixWorld),this.intersectsSphere(xs)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Ta.x=s.normal.x>0?e.max.x:e.min.x,Ta.y=s.normal.y>0?e.max.y:e.min.y,Ta.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ta)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Xf=new qe,Va=class i{constructor(){this.coordinateSystem=zn,this._frustums=[],this._count=0}setFromArrayCamera(e){let t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){let r=t[s];Xf.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new Qi),n[s].setFromProjectionMatrix(Xf,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){let t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;let t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Qi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new i().copy(this)}},jt=class extends zt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Wa=new B,Xa=new B,qf=new qe,$r=new ci,wa=new yn,Jc=new B,Yf=new B,Ii=class extends Et{constructor(e=new at,t=new jt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Wa.fromBufferAttribute(t,s-1),Xa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Wa.distanceTo(Xa);e.setAttribute("lineDistance",new Je(n,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(s),wa.radius+=r,e.ray.intersectsSphere(wa)===!1)return;qf.copy(s).invert(),$r.copy(e.ray).applyMatrix4(qf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){let d=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=d,_=g-1;x<_;x+=c){let m=h.getX(x),w=h.getX(x+1),M=Aa(this,e,$r,l,m,w,x);M&&t.push(M)}if(this.isLineLoop){let x=h.getX(g-1),_=h.getX(d),m=Aa(this,e,$r,l,x,_,g-1);m&&t.push(m)}}else{let d=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=d,_=g-1;x<_;x+=c){let m=Aa(this,e,$r,l,x,x+1,x);m&&t.push(m)}if(this.isLineLoop){let x=Aa(this,e,$r,l,g-1,d,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Zf=new B,Kf=new B,In=class extends Ii{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Zf.fromBufferAttribute(t,s),Kf.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Zf.distanceTo(Kf);e.setAttribute("lineDistance",new Je(n,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},uo=class extends Ii{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},Pn=class extends zt{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},jf=new qe,ih=new ci,Ea=new yn,Ra=new B,ei=class extends Et{constructor(e=new at,t=new Pn){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ea.copy(n.boundingSphere),Ea.applyMatrix4(s),Ea.radius+=r,e.ray.intersectsSphere(Ea)===!1)return;jf.copy(s).invert(),ih.copy(e.ray).applyMatrix4(jf);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let f=Math.max(0,o.start),d=Math.min(c.count,o.start+o.count);for(let g=f,x=d;g<x;g++){let _=c.getX(g);Ra.fromBufferAttribute(u,_),$f(Ra,_,l,s,e,t,this)}}else{let f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let g=f,x=d;g<x;g++)Ra.fromBufferAttribute(u,g),$f(Ra,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};fo=class extends qt{constructor(e=[],t=Os,n,s,r,o,a,l,c,h){super(e,t,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Pi=class extends qt{constructor(e,t,n=ni,s,r,o,a=Rt,l=Rt,c,h=Ri,u=1){if(h!==Ri&&h!==Oi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let f={width:e,height:t,depth:u};super(f,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new dr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},po=class extends Pi{constructor(e,t=ni,n=Os,s,r,o=Rt,a=Rt,l,c=Ri){let h={width:e,height:e,depth:1},u=[h,h,h,h,h,h];super(e,e,t,n,s,r,o,a,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},mo=class extends qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},es=class i extends at{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2));function g(x,_,m,w,M,v,A,b,p,y,I){let R=v/p,P=A/y,F=v/2,z=A/2,C=b/2,W=p+1,X=y+1,q=0,ae=0,Z=new B;for(let se=0;se<X;se++){let le=se*P-z;for(let Le=0;Le<W;Le++){let Ue=Le*R-F;Z[x]=Ue*w,Z[_]=le*M,Z[m]=C,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[_]=0,Z[m]=b>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Le/p),u.push(1-se/y),q+=1}}for(let se=0;se<y;se++)for(let le=0;le<p;le++){let Le=f+le+W*se,Ue=f+le+W*(se+1),ee=f+(le+1)+W*(se+1),Me=f+(le+1)+W*se;l.push(Le,Ue,Me),l.push(Ue,ee,Me),ae+=6}a.addGroup(d,ae,I),d+=ae,f+=q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}},go=class i extends at{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],d=[],g=0,x=[],_=n/2,m=0;w(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new Je(u,3)),this.setAttribute("normal",new Je(f,3)),this.setAttribute("uv",new Je(d,2));function w(){let v=new B,A=new B,b=0,p=(t-e)/n;for(let y=0;y<=r;y++){let I=[],R=y/r,P=R*(t-e)+e;for(let F=0;F<=s;F++){let z=F/s,C=z*l+a,W=Math.sin(C),X=Math.cos(C);A.x=P*W,A.y=-R*n+_,A.z=P*X,u.push(A.x,A.y,A.z),v.set(W,p,X).normalize(),f.push(v.x,v.y,v.z),d.push(z,1-R),I.push(g++)}x.push(I)}for(let y=0;y<s;y++)for(let I=0;I<r;I++){let R=x[I][y],P=x[I+1][y],F=x[I+1][y+1],z=x[I][y+1];(e>0||I!==0)&&(h.push(R,P,z),b+=3),(t>0||I!==r-1)&&(h.push(P,F,z),b+=3)}c.addGroup(m,b,0),m+=b}function M(v){let A=g,b=new Ge,p=new B,y=0,I=v===!0?e:t,R=v===!0?1:-1;for(let F=1;F<=s;F++)u.push(0,_*R,0),f.push(0,R,0),d.push(.5,.5),g++;let P=g;for(let F=0;F<=s;F++){let C=F/s*l+a,W=Math.cos(C),X=Math.sin(C);p.x=I*X,p.y=_*R,p.z=I*W,u.push(p.x,p.y,p.z),f.push(0,R,0),b.x=W*.5+.5,b.y=X*.5*R+.5,d.push(b.x,b.y),g++}for(let F=0;F<s;F++){let z=A+F,C=P+F;v===!0?h.push(C,C+1,z):h.push(C+1,C,z),y+=3}c.addGroup(m,y,v===!0?1:2),m+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},_o=class i extends at{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=e/a,f=t/l,d=[],g=[],x=[],_=[];for(let m=0;m<h;m++){let w=m*f-o;for(let M=0;M<c;M++){let v=M*u-r;g.push(v,-w,0),x.push(0,0,1),_.push(M/a),_.push(1-m/l)}}for(let m=0;m<l;m++)for(let w=0;w<a;w++){let M=w+c*m,v=w+c*(m+1),A=w+1+c*(m+1),b=w+1+c*m;d.push(M,v,b),d.push(v,A,b)}this.setIndex(d),this.setAttribute("position",new Je(g,3)),this.setAttribute("normal",new Je(x,3)),this.setAttribute("uv",new Je(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.width,e.height,e.widthSegments,e.heightSegments)}},Cs=class i extends at{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new B,f=new B,d=[],g=[],x=[],_=[];for(let m=0;m<=n;m++){let w=[],M=m/n,v=o+M*a,A=e*Math.cos(v),b=Math.sqrt(e*e-A*A),p=0;m===0&&o===0?p=.5/t:m===n&&l===Math.PI&&(p=-.5/t);for(let y=0;y<=t;y++){let I=y/t,R=s+I*r;u.x=-b*Math.cos(R),u.y=A,u.z=b*Math.sin(R),g.push(u.x,u.y,u.z),f.copy(u).normalize(),x.push(f.x,f.y,f.z),_.push(I+p,1-M),w.push(c++)}h.push(w)}for(let m=0;m<n;m++)for(let w=0;w<t;w++){let M=h[m][w+1],v=h[m][w],A=h[m+1][w],b=h[m+1][w+1];(m!==0||o>0)&&d.push(M,v,b),(m!==n-1||l<Math.PI)&&d.push(v,A,b)}this.setIndex(d),this.setAttribute("position",new Je(g,3)),this.setAttribute("normal",new Je(x,3)),this.setAttribute("uv",new Je(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new i(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};jd={clone:ks,merge:rn},Yg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,hi=class extends zt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Yg,this.fragmentShader=Zg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ks(e.uniforms),this.uniformsGroups=qg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new we().setHex(s.value);break;case"v2":this.uniforms[n].value=new Ge().fromArray(s.value);break;case"v3":this.uniforms[n].value=new B().fromArray(s.value);break;case"v4":this.uniforms[n].value=new St().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Ke().fromArray(s.value);break;case"m4":this.uniforms[n].value=new qe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},qa=class extends hi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},vn=class extends zt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new we(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ir,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},mn=class extends vn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ge(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return rt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new we(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new we(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new we(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return Ms('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){Ms('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ln=class extends zt{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new we(16777215),this.specular=new we(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ir,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Lo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},xo=class extends zt{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new we(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ir,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Lo,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ya=class extends zt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Od,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Za=class extends zt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};ui=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<s)){for(let a=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=t[++n],e<s)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let o=0;o!==s;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Ka=class extends ui{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ys,endingEnd:ys}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,o=e+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case vs:r=e,a=2*t-n;break;case to:r=s.length-2,a=t+s[r]-s[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case vs:o=e,l=2*n-t;break;case to:o=1,l=n+s[1]-s[0];break;default:o=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,d=this._weightNext,g=(n-t)/(s-t),x=g*g,_=x*g,m=-f*_+2*f*x-f*g,w=(1+f)*_+(-1.5-2*f)*x+(-.5+f)*g+1,M=(-1-d)*_+(1.5+d)*x+.5*g,v=d*_-d*x;for(let A=0;A!==a;++A)r[A]=m*o[h+A]+w*o[c+A]+M*o[l+A]+v*o[u+A];return r}},yo=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(s-t),u=1-h;for(let f=0;f!==a;++f)r[f]=o[c+f]*u+o[l+f]*h;return r}},ja=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},$a=class extends ui{interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(n-t)/(s-t),x=1-g;for(let _=0;_!==a;++_)r[_]=o[c+_]*x+o[l+_]*g;return r}let f=a*2,d=e-1;for(let g=0;g!==a;++g){let x=o[c+g],_=o[l+g],m=d*f+g*2,w=u[m],M=u[m+1],v=e*f+g*2,A=h[v],b=h[v+1],p=Jg(n,t,w,A,s);r[g]=$d(p,x,M,b,_)}return r}};Mn=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=$i(t,this.TimeBufferType),this.values=$i(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:$i(e.times,Array),values:$i(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s),Jr(e.settings)&&(n.settings={inTangents:$i(e.settings.inTangents,Array),outTangents:$i(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ja(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new yo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ka(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new $a(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ss:t=this.InterpolantFactoryMethodDiscrete;break;case bs:t=this.InterpolantFactoryMethodLinear;break;case Pa:t=this.InterpolantFactoryMethodSmooth;break;case nh:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return He("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ss;case this.InterpolantFactoryMethodLinear:return bs;case this.InterpolantFactoryMethodSmooth:return Pa;case this.InterpolantFactoryMethodBezier:return nh}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e;Jr(this.settings)&&(ed(this.settings.inTangents,e),ed(this.settings.outTangents,e))}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e;Jr(this.settings)&&(td(this.settings.inTangents,e),td(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Ze("KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(Ze("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){Ze("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Ze("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(s!==void 0&&cg(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){Ze("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Pa,r=e.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(s)l=!0;else{let u=a*n,f=u-n,d=u+n;for(let g=0;g!==n;++g){let x=t[u+g];if(x!==t[f+g]||x!==t[d+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*n,f=o*n;for(let d=0;d!==n;++d)t[f+d]=t[u+d]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,Jr(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};Mn.prototype.ValueTypeName="";Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=bs;Li=class extends Mn{constructor(e,t,n){super(e,t,n)}};Li.prototype.ValueTypeName="bool";Li.prototype.ValueBufferType=Array;Li.prototype.DefaultInterpolation=Ss;Li.prototype.InterpolantFactoryMethodLinear=void 0;Li.prototype.InterpolantFactoryMethodSmooth=void 0;vo=class extends Mn{constructor(e,t,n,s){super(e,t,n,s)}};vo.prototype.ValueTypeName="color";Di=class extends Mn{constructor(e,t,n,s){super(e,t,n,s)}};Di.prototype.ValueTypeName="number";Ja=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(s-t),c=e*a;for(let h=c+a;c!==h;c+=4)Nt.slerpFlat(r,0,o,c-a,o,c,l);return r}},Ni=class extends Mn{constructor(e,t,n,s){super(e,t,n,s)}InterpolantFactoryMethodLinear(e){return new Ja(this.times,this.values,this.getValueSize(),e)}};Ni.prototype.ValueTypeName="quaternion";Ni.prototype.InterpolantFactoryMethodSmooth=void 0;Ui=class extends Mn{constructor(e,t,n){super(e,t,n)}};Ui.prototype.ValueTypeName="string";Ui.prototype.ValueBufferType=Array;Ui.prototype.DefaultInterpolation=Ss;Ui.prototype.InterpolantFactoryMethodLinear=void 0;Ui.prototype.InterpolantFactoryMethodSmooth=void 0;ts=class extends Mn{constructor(e,t,n,s){super(e,t,n,s)}};ts.prototype.ValueTypeName="vector";Is=class{constructor(e="",t=-1,n=[],s=Vl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=di(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(e0(n[o]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Mn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);let h=Kg(l);l=Qf(l,1,h),c=Qf(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new Di(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){let c=e[a],h=c.name.match(r);if(h&&h.length>1){let u=h[1],f=s[u];f||(s[u]=f=[]),f.push(c)}}let o=[];for(let a in s)o.push(this.CreateFromMorphTargetSequence(a,s[a],t,n));return o}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};li={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(nd(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!nd(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};vr=class{constructor(e,t,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=c.length;u<f;u+=2){let d=c[u],g=c[u+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Xl=new vr,Dt=class{constructor(e){this.manager=e!==void 0?e:Xl,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}setPriority(e){return this.priority=e,this}setCache(e){return this.cache=e,this}abort(){return this}};Dt.DEFAULT_MATERIAL_NAME="__DEFAULT";wi={},sh=class extends Error{constructor(e,t){super(e),this.response=t}},sn=class extends Dt{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=li.get(`file:${e}`);if(r!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0);return}if(wi[e]!==void 0){wi[e].push({onLoad:t,onProgress:n,onError:s});return}wi[e]=[],wi[e].push({onLoad:t,onProgress:n,onError:s});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",priority:this.priority,cache:this.cache,signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&He("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=wi[e],u=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),d=f?parseInt(f):0,g=d!==0,x=0,_=new ReadableStream({start(m){w();function w(){u.read().then(({done:M,value:v})=>{if(M)m.close();else{x+=v.byteLength;let A=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:d});for(let b=0,p=h.length;b<p;b++){let y=h[b];y.onProgress&&y.onProgress(A)}m.enqueue(v),w()}},M=>{m.error(M)})}}});return new Response(_)}else throw new sh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a==="")return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),f=u&&u[1]?u[1].toLowerCase():void 0,d=new TextDecoder(f);return c.arrayBuffer().then(g=>d.decode(g))}}}).then(c=>{li.add(`file:${e}`,c);let h=wi[e];delete wi[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onLoad&&d.onLoad(c)}}).catch(c=>{let h=wi[e];if(h===void 0)throw this.manager.itemError(e),c;delete wi[e];for(let u=0,f=h.length;u<f;u++){let d=h[u];d.onError&&d.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},rr=new WeakMap,Qa=class extends Dt{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=li.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=rr.get(o);u===void 0&&(u=[],rr.set(o,u)),u.push({onLoad:t,onError:s})}return o}let a=ur("img");function l(){h(),t&&t(this);let u=rr.get(this)||[];for(let f=0;f<u.length;f++){let d=u[f];d.onLoad&&d.onLoad(this)}rr.delete(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),li.remove(`image:${e}`);let f=rr.get(this)||[];for(let d=0;d<f.length;d++){let g=f[d];g.onError&&g.onError(u)}rr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),li.add(`image:${e}`,a),r.manager.itemStart(e),a.fetchPriority=this.priority,a.src=e,a}},Fi=class extends Dt{constructor(e){super(e)}load(e,t,n,s){let r=new qt,o=new Qa(this.manager);return o.setPriority(this.priority),o.setCache(this.cache),o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},Ps=class extends Et{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new we(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Mo=class extends Ps{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.groundColor=new we(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Qc=new qe,id=new B,sd=new B,Mr=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.mapType=Sn,this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qi,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new St(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;id.setFromMatrixPosition(e.matrixWorld),t.position.copy(id),sd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){Qc.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Qc,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,o=s?s.z/r.x:1,a=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===hr||e.reversedDepth?t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,1,0,0,0,0,1):t.set(.5*o,0,0,.5*o+l,0,.5*a,0,.5*a+c,0,0,.5,.5,0,0,0,1),t.multiply(Qc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ca=new B,Ia=new Nt,ai=new B,So=class extends Et{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=zn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ca,Ia,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Ia,ai.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ca,Ia,ai),ai.x===1&&ai.y===1&&ai.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ca,Ia,ai.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ji=new B,rd=new Ge,od=new Ge,Bt=class extends So{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ts*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Qr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ts*2*Math.atan(Math.tan(Qr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ji.x,ji.y).multiplyScalar(-e/ji.z),ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ji.x,ji.y).multiplyScalar(-e/ji.z)}getViewSize(e,t){return this.getViewBounds(e,rd,od),t.subVectors(od,rd)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Qr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},rh=class extends Mr{constructor(){super(new Bt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Ts*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){let e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}},bo=class extends Ps{constructor(e,t,n=0,s=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new rh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},oh=class extends Mr{constructor(){super(new Bt(90,1,.5,500)),this.isPointLightShadow=!0}},Ls=class extends Ps{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new oh}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Ds=class extends So{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,o=n+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},ah=class extends Mr{constructor(){super(new Ds(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ns=class extends Ps{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Et.DEFAULT_UP),this.updateMatrix(),this.target=new Et,this.shadow=new ah}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ti=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},eh=new WeakMap,To=class extends Dt{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&He("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&He("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=li.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{eh.has(o)===!0?(s&&s(eh.get(o)),r.manager.itemError(e),r.manager.itemEnd(e)):(t&&t(c),r.manager.itemEnd(e))});return}setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);return}let a={};a.credentials=this.withCredentials||this.crossOrigin!=="anonymous"?"include":"same-origin",a.headers=this.requestHeader,a.priority=this.priority,a.cache=this.cache,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign({},r.options,{colorSpaceConversion:"none"}))}).then(function(c){return li.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),eh.set(l,c),li.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});li.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},or=-90,ar=1,Sr=class extends Et{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Bt(or,ar,e,t);s.layers=this.layers,this.add(s);let r=new Bt(or,ar,e,t);r.layers=this.layers,this.add(r);let o=new Bt(or,ar,e,t);o.layers=this.layers,this.add(o);let a=new Bt(or,ar,e,t);a.layers=this.layers,this.add(a);let l=new Bt(or,ar,e,t);l.layers=this.layers,this.add(l);let c=new Bt(or,ar,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,l]=t;for(let c of t)this.remove(c);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===hr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=x,e.setRenderTarget(n,5,s),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(u,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},el=class extends Bt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}},tl=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,o;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,s=this.valueSize,r=e*s+s,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==s;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,s)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let l=t*this._origIndex;this._mixBufferRegion(n,s,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,s);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,o=s;r!==o;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,s){Nt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){let o=this._workIndex*r;Nt.multiplyQuaternionsFlat(e,o,e,t,e,n),Nt.slerpFlat(e,t,e,t,e,o,s)}_lerp(e,t,n,s,r){let o=1-s;for(let a=0;a!==r;++a){let l=t+a;e[l]=e[l]*o+e[n+a]*s}}_lerpAdditive(e,t,n,s,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*s}}},Gh="\\[\\]\\.:\\/",t0=new RegExp("["+Gh+"]","g"),Hh="[^"+Gh+"]",n0="[^"+Gh.replace("\\.","")+"]",i0=/((?:WC+[\/:])*)/.source.replace("WC",Hh),s0=/(WCOD+)?/.source.replace("WCOD",n0),r0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hh),o0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hh),a0=new RegExp("^"+i0+s0+r0+o0+"$"),l0=["material","materials","bones","map"],lh=class{constructor(e,t,n){let s=n||Tt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Tt=class i{constructor(e,t,n){this.path=t,this.parsedPath=n||i.parseTrackName(t),this.node=i.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new i.Composite(e,t,n):new i(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(t0,"")}static parseTrackName(e){let t=a0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);l0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let l=n(a.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=i.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){He("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Ze("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Ze("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Ze("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Ze("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Ze("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Ze("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[s];if(o===void 0){let c=t.nodeName;Ze("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Ze("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Tt.Composite=lh;Tt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Tt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Tt.prototype.GetterByBindingType=[Tt.prototype._getValue_direct,Tt.prototype._getValue_array,Tt.prototype._getValue_arrayElement,Tt.prototype._getValue_toArray];Tt.prototype.SetterByBindingTypeAndVersioning=[[Tt.prototype._setValue_direct,Tt.prototype._setValue_direct_setNeedsUpdate,Tt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_array,Tt.prototype._setValue_array_setNeedsUpdate,Tt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_arrayElement,Tt.prototype._setValue_arrayElement_setNeedsUpdate,Tt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Tt.prototype._setValue_fromArray,Tt.prototype._setValue_fromArray_setNeedsUpdate,Tt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];nl=class{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;let r=t.tracks,o=r.length,a=new Array(o),l={endingStart:ys,endingEnd:ys};for(let c=0;c!==o;++c){let h=r[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=Nd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let s=this._clip.duration,r=e._clip.duration,o=r/s,a=s/r;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let s=this._mixer,r=s.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=s._lendControlInterpolant(),this._timeScaleInterpolant=a);let l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Fd:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case Vl:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(s,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,s=this.time+e,r=this._loopCount,o=n===Ud;if(e===0)return r===-1?s:o&&(r&1)===1?t-s:s;if(n===Dd){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),s>=t||s<0){let a=Math.floor(s/t);s-=t*a,r+=Math.abs(a);let l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){let c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this._loopCount=r,this.time=s;if(o&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){let s=this._interpolantSettings;n?(s.endingStart=vs,s.endingEnd=vs):(e?s.endingStart=this.zeroSlopeAtStart?vs:ys:s.endingStart=to,t?s.endingEnd=this.zeroSlopeAtEnd?vs:ys:s.endingEnd=to)}_scheduleFading(e,t,n){let s=this._mixer,r=s.time,o=this._weightInterpolant;o===null&&(o=s._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}},c0=new Float32Array(1),wo=class extends kn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){let n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName,h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){let f=s[u],d=f.name,g=h[d];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,d));continue}let x=t&&t._propertyBindings[u].binding.parsedPath;g=new tl(Tt.create(n,d,x),f.ValueTypeName,f.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,d),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let s=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=s.length,s.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,f=(e._localRoot||this._root).uuid;delete u[f],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let s=this._bindingsByRootAndName,r=this._bindings,o=s[t];o===void 0&&(o={},s[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[s],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[s]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new yo(new Float32Array(2),new Float32Array(2),1,c0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let s=t||this._root,r=s.uuid,o=typeof e=="string"?Is.findByName(s,e):e,a=o!==null?o.uuid:e,l=this._actionsByClip[a],c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=Vl),l!==void 0){let u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;let h=new nl(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,s=n.uuid,r=typeof e=="string"?Is.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[s]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(s,e,r,o);let a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){let o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){let c=o[a];this._deactivateAction(c);let h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete s[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}let s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},ad=new qe,Ao=class{constructor(e,t,n=0,s=1/0){this.ray=new ci(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new pr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Ze("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ad.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ad),this}intersectObject(e,t=!0,n=[]){return ch(e,this,n,t),n.sort(ld),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)ch(e[s],this,n,t);return n.sort(ld),n}};br=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=rt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(rt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},hh=class{static{this.prototype.isMatrix2=!0}constructor(e,t,n,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=s,this}},Eo=class extends In{constructor(e=10,t=10,n=4473924,s=8947848){n=new we(n),s=new we(s);let r=t/2,o=e/t,a=e/2,l=[],c=[];for(let f=0,d=0,g=-a;f<=t;f++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);let x=f===r?n:s;x.toArray(c,d),d+=3,x.toArray(c,d),d+=3,x.toArray(c,d),d+=3,x.toArray(c,d),d+=3}let h=new at;h.setAttribute("position",new Je(l,3)),h.setAttribute("color",new Je(c,3));let u=new jt({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Ro=class extends In{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),s=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new at;r.setIndex(new pt(n,1)),r.setAttribute("position",new Je(s,3)),super(r,new jt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Co=class extends In{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new at;s.setAttribute("position",new Je(t,3)),s.setAttribute("color",new Je(n,3));let r=new jt({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(e,t,n){let s=new we,r=this.geometry.attributes.color.array;return s.set(e),s.toArray(r,0),s.toArray(r,3),s.set(t),s.toArray(r,6),s.toArray(r,9),s.set(n),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}},Io=class extends kn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187")});function yp(){let i=null,e=!1,t=null,n=null;function s(r,o){n=i.requestAnimationFrame(s),t(r,o)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function f0(i){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,h),a.onUploadCallback();let d;if(c instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=i.SHORT;else if(c instanceof Uint32Array)d=i.UNSIGNED_INT;else if(c instanceof Int32Array)d=i.INT;else if(c instanceof Int8Array)d=i.BYTE;else if(c instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,a),u.length===0)i.bufferSubData(c,0,h);else{u.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<u.length;d++){let g=u[f],x=u[d];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++f,u[f]=x)}u.length=f+1;for(let d=0,g=u.length;d<g;d++){let x=u[d];i.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}function Yx(i,e,t,n,s,r){let o=new we(0),a=s===!0?0:1,l,c,h=null,u=0,f=null;function d(w){let M=w.isScene===!0?w.background:null;if(M&&M.isTexture){let v=w.backgroundBlurriness>0;M=e.get(M,v)}return M}function g(w){let M=!1,v=d(w);v===null?_(o,a):v&&v.isColor&&(_(v,1),M=!0);let A=i.xr.getEnvironmentBlendMode();A==="additive"?t.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function x(w,M){let v=d(M);v&&v.isCubeTexture?(c===void 0&&(c=new ht(new es(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:ks(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,b,p){this.matrixWorld.copyPosition(p.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qx.makeRotationFromEuler(M.backgroundRotation)).transpose(),v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(vp),c.material.toneMapped=et.getTransfer(v.colorSpace)!==vt,(h!==v||u!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ht(new _o(2,2),new hi({name:"BackgroundMaterial",uniforms:ks(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=et.getTransfer(v.colorSpace)!==vt,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||u!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,u=v.version,f=i.toneMapping),l.layers.enableAll(),w.unshift(l,l.geometry,l.material,0,0,null))}function _(w,M){w.getRGB(ql,kh(i)),t.buffers.color.setClear(ql.r,ql.g,ql.b,M,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(w,M=1){o.set(w),a=M,_(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(w){a=w,_(o,a)},render:g,addToRenderList:x,dispose:m}}function Zx(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,o=!1;function a(P,F,z,C,W){let X=!1,q=u(P,C,z,F);r!==q&&(r=q,c(r.object)),X=d(P,C,z,W),X&&g(P,C,z,W),W!==null&&e.update(W,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(P,F,z,C),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(W).buffer))}function l(){return i.createVertexArray()}function c(P){return i.bindVertexArray(P)}function h(P){return i.deleteVertexArray(P)}function u(P,F,z,C){let W=C.wireframe===!0,X=n[F.id];X===void 0&&(X={},n[F.id]=X);let q=P.isInstancedMesh===!0?P.id:0,ae=X[q];ae===void 0&&(ae={},X[q]=ae);let Z=ae[z.id];Z===void 0&&(Z={},ae[z.id]=Z);let se=Z[W];return se===void 0&&(se=f(l()),Z[W]=se),se}function f(P){let F=[],z=[],C=[];for(let W=0;W<t;W++)F[W]=0,z[W]=0,C[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:z,attributeDivisors:C,object:P,attributes:{},index:null}}function d(P,F,z,C){let W=r.attributes,X=F.attributes,q=0,ae=z.getAttributes();for(let Z in ae)if(ae[Z].location>=0){let le=W[Z],Le=X[Z];if(Le===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(Le=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(Le=P.instanceColor)),le===void 0||le.attribute!==Le||Le&&le.data!==Le.data)return!0;q++}return r.attributesNum!==q||r.index!==C}function g(P,F,z,C){let W={},X=F.attributes,q=0,ae=z.getAttributes();for(let Z in ae)if(ae[Z].location>=0){let le=X[Z];le===void 0&&(Z==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),Z==="instanceColor"&&P.instanceColor&&(le=P.instanceColor));let Le={};Le.attribute=le,le&&le.data&&(Le.data=le.data),W[Z]=Le,q++}r.attributes=W,r.attributesNum=q,r.index=C}function x(){let P=r.newAttributes;for(let F=0,z=P.length;F<z;F++)P[F]=0}function _(P){m(P,0)}function m(P,F){let z=r.newAttributes,C=r.enabledAttributes,W=r.attributeDivisors;z[P]=1,C[P]===0&&(i.enableVertexAttribArray(P),C[P]=1),W[P]!==F&&(i.vertexAttribDivisor(P,F),W[P]=F)}function w(){let P=r.newAttributes,F=r.enabledAttributes;for(let z=0,C=F.length;z<C;z++)F[z]!==P[z]&&(i.disableVertexAttribArray(z),F[z]=0)}function M(P,F,z,C,W,X,q){q===!0?i.vertexAttribIPointer(P,F,z,W,X):i.vertexAttribPointer(P,F,z,C,W,X)}function v(P,F,z,C){x();let W=C.attributes,X=z.getAttributes(),q=F.defaultAttributeValues;for(let ae in X){let Z=X[ae];if(Z.location>=0){let se=W[ae];if(se===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(se=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(se=P.instanceColor)),se!==void 0){let le=se.normalized,Le=se.itemSize,Ue=e.get(se);if(Ue===void 0)continue;let ee=Ue.buffer,Me=Ue.type,Pe=Ue.bytesPerElement,Ve=Me===i.INT||Me===i.UNSIGNED_INT||se.gpuType===ol;if(se.isInterleavedBufferAttribute){let D=se.data,N=D.isInterleavedBuffer===!0?D.stride:D.itemSize,$=se.offset;if(D.isInstancedInterleavedBuffer||D.isInstancedBufferAttribute){for(let G=0;G<Z.locationSize;G++)m(Z.location+G,D.meshPerAttribute);P.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let G=0;G<Z.locationSize;G++)_(Z.location+G);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let G=0;G<Z.locationSize;G++)M(Z.location+G,Le/Z.locationSize,Me,le,N*Pe,($+Le/Z.locationSize*G)*Pe,Ve)}else{if(se.isInstancedBufferAttribute){for(let D=0;D<Z.locationSize;D++)m(Z.location+D,se.meshPerAttribute);P.isInstancedMesh!==!0&&C._maxInstanceCount===void 0&&(C._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let D=0;D<Z.locationSize;D++)_(Z.location+D);i.bindBuffer(i.ARRAY_BUFFER,ee);for(let D=0;D<Z.locationSize;D++)M(Z.location+D,Le/Z.locationSize,Me,le,Le*Pe,Le/Z.locationSize*D*Pe,Ve)}}else if(q!==void 0){let le=q[ae];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(Z.location,le);break;case 3:i.vertexAttrib3fv(Z.location,le);break;case 4:i.vertexAttrib4fv(Z.location,le);break;default:i.vertexAttrib1fv(Z.location,le)}}}}w()}function A(){I();for(let P in n){let F=n[P];for(let z in F){let C=F[z];for(let W in C){let X=C[W];for(let q in X)h(X[q].object),delete X[q];delete C[W]}}delete n[P]}}function b(P){if(n[P.id]===void 0)return;let F=n[P.id];for(let z in F){let C=F[z];for(let W in C){let X=C[W];for(let q in X)h(X[q].object),delete X[q];delete C[W]}}delete n[P.id]}function p(P){for(let F in n){let z=n[F];for(let C in z){let W=z[C];if(W[P.id]===void 0)continue;let X=W[P.id];for(let q in X)h(X[q].object),delete X[q];delete W[P.id]}}}function y(P){for(let F in n){let z=n[F],C=P.isInstancedMesh===!0?P.id:0,W=z[C];if(W!==void 0){for(let X in W){let q=W[X];for(let ae in q)h(q[ae].object),delete q[ae];delete W[X]}delete z[C],Object.keys(z).length===0&&delete n[F]}}}function I(){R(),o=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:I,resetDefaultState:R,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfObject:y,releaseStatesOfProgram:p,initAttributes:x,enableAttribute:_,disableUnusedAttributes:w}}function Kx(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function o(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),t.update(c,n,h))}function a(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let f=0;for(let d=0;d<h;d++)f+=c[d];t.update(f,n,1)}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a}function jx(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let p=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(p.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(p){return!(p!==Vn&&n.convert(p)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(p){let y=p===ii&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(p!==Sn&&p!==Dn&&!y&&n.convert(p)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(p){if(p==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";p="mediump"}return p==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(He("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&He("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),w=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=i.getParameter(i.MAX_SAMPLES),b=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:w,maxVaryings:M,maxFragmentUniforms:v,maxSamples:A,samples:b}}function $x(i){let e=this,t=null,n=0,s=!1,r=!1,o=new Rn,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,d){let g=u.clippingPlanes,x=u.clipIntersection,_=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!_)r?h(null):c();else{let w=r?0:n,M=w*4,v=m.clippingState||null;l.value=v,v=h(g,f,M,d);for(let A=0;A!==M;++A)v[A]=t[A];m.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=w}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,d,g){let x=u!==null?u.length:0,_=null;if(x!==0){if(_=l.value,g!==!0||_===null){let m=d+x*4,w=f.matrixWorldInverse;a.getNormalMatrix(w),(_===null||_.length<m)&&(_=new Float32Array(m));for(let M=0,v=d;M!==x;++M,v+=4)o.copy(u[M]).applyMatrix4(w,a),o.normal.toArray(_,v),_[v+3]=o.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,_}}function Qd(i,e,t){return new Vo(i,{minFilter:_n,generateMipmaps:e,type:ii,colorSpace:pn,depthBuffer:t})}function Wo(i,e,t){return new hi({name:i,uniforms:e,vertexShader:st.cube_vert,fragmentShader:t,side:$t,blending:Us,depthTest:!1,depthWrite:!1})}function iy(){return Wo("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Mp}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function sy(){return Wo("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Sp}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function ry(){return Wo("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Qx}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function ep(){return Wo("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function tp(){return Wo("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function oy(i){let e=new WeakMap,t=new WeakMap,n=null;function s(f,d=!1){return f==null?null:d?o(f):r(f)}function r(f){if(f&&f.isTexture){let d=f.mapping;if(d===il||d===sl)if(e.has(f)){let g=e.get(f).texture;return a(g,f.mapping)}else{let g=f.image;if(g&&g.height>0){let x=new Vo(g.height);return x.fromEquirectangularTexture(i,f),e.set(f,x),f.addEventListener("dispose",c),a(x.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture&&f.isPMREMTexture!==!0){let d=f.mapping,g=d===il||d===sl,x=d===Os||d===Ar;if(g||x){let _=t.get(f),m=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==m)return n===null&&(n=new Lr(i)),_=g?n.fromEquirectangular(f,_):n.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),_.texture;if(_!==void 0)return _.texture;{let w=f.image;return g&&w&&w.height>0||x&&w&&l(w)?(n===null&&(n=new Lr(i)),_=g?n.fromEquirectangular(f):n.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),f.addEventListener("dispose",h),_.texture):null}}}return f}function a(f,d){return d===il?f.mapping=Os:d===sl&&(f.mapping=Ar),f}function l(f){let d=0,g=6;for(let x=0;x<g;x++)f[x]!==void 0&&d++;return d===g}function c(f){let d=f.target;d.removeEventListener("dispose",c);let g=e.get(d);g!==void 0&&(e.delete(d),g.dispose())}function h(f){let d=f.target;d.removeEventListener("dispose",h);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:u}}function ay(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&Ms("WebGLRenderer: "+n+" extension not supported."),s}}}function ly(i,e,t,n){let s={},r=new WeakMap,o=new FinalizationRegistry(g=>delete s[g]);function a(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(let _ in g.attributes)e.remove(g.attributes[_]);g.removeEventListener("dispose",a),delete s[g.id],o.unregister(g);let x=r.get(g);x&&(e.remove(x),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,x){return s[x.id]!==void 0||(x.addEventListener("dispose",a),s[x.id]=new WeakRef(x),o.register(x,x.id,x),t.memory.geometries++),x}function h(g){let x=g.attributes;for(let _ in x)e.update(x[_],i.ARRAY_BUFFER)}function u(g){let x=g.index,_=g.attributes.position,m=0;if(_===void 0)return;let w=x!==null?x.array.length:_.array.length/3-1,M=_.count>=65535?Es:As,v=new M(Math.ceil(w/3)*6,1),A=v.array;if(x!==null){let p=x.array;m=x.version;for(let y=0,I=0;y<w;y+=3){let R=p[y+0],P=p[y+1],F=p[y+2];A[I++]=R,A[I++]=P,A[I++]=P,A[I++]=F,A[I++]=F,A[I++]=R}}else{m=_.version;for(let p=0,y=0;p<w;p+=3){let I=p+0,R=p+1,P=p+2;A[y++]=I,A[y++]=R,A[y++]=R,A[y++]=P,A[y++]=P,A[y++]=I}}v.version=m;let b=r.get(g);b&&e.remove(b),r.set(g,v)}function f(g){let x=r.get(g);if(x){let _=g.index;_!==null&&x.version<_.version&&u(g)}else u(g);return r.get(g)}function d(){for(let g in s){let x=s[g].deref();x!==void 0&&l(x)}}return{get:c,update:h,getWireframeAttribute:f,dispose:d}}function cy(i,e,t){let n;function s(u){n=u}let r,o;function a(u){r=u.type,o=u.bytesPerElement}function l(u,f){i.drawElements(n,f,r,u*o),t.update(f,n,1)}function c(u,f,d){d!==0&&(i.drawElementsInstanced(n,f,r,u*o,d),t.update(f,n,d))}function h(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,u,0,d);let x=0;for(let _=0;_<d;_++)x+=f[_];t.update(x,n,1)}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function hy(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:Ze("WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function uy(i,e,t){let n=new WeakMap,s=new St;function r(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,f=n.get(a);if(f===void 0||f.count!==u){let I=function(){p.dispose(),n.delete(a),a.removeEventListener("dispose",I)};f!==void 0&&f.texture.dispose();let d=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,_=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],w=a.morphAttributes.color||[],M=0;d===!0&&(M=1),g===!0&&(M=2),x===!0&&(M=3);let v=a.attributes.position.count*M,A=1;v>e.maxTextureSize&&(A=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let b=new Float32Array(v*A*4*u),p=new so(b,v,A,u);p.type=Dn,p.needsUpdate=!0;let y=M*4;for(let R=0;R<u;R++){let P=_[R],F=m[R],z=w[R],C=v*A*4*R;for(let W=0;W<P.count;W++){let X=W*y;d===!0&&(s.fromBufferAttribute(P,W),b[C+X+0]=s.x,b[C+X+1]=s.y,b[C+X+2]=s.z,b[C+X+3]=0),g===!0&&(s.fromBufferAttribute(F,W),b[C+X+4]=s.x,b[C+X+5]=s.y,b[C+X+6]=s.z,b[C+X+7]=0),x===!0&&(s.fromBufferAttribute(z,W),b[C+X+8]=s.x,b[C+X+9]=s.y,b[C+X+10]=s.z,b[C+X+11]=z.itemSize===4?s.w:1)}}f={count:u,texture:p,size:new Ge(v,A)},n.set(a,f),a.addEventListener("dispose",I)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let d=0;for(let x=0;x<c.length;x++)d+=c[x];let g=a.morphTargetsRelative?1:1-d;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function fy(i,e,t,n,s){let r=new WeakMap;function o(c){let h=s.render.frame,u=c.geometry,f=e.get(c,u);if(r.get(f)!==h&&(e.update(f),r.set(f,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;r.get(d)!==h&&(d.update(),r.set(d,h))}return f}function a(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:o,dispose:a}}function py(i,e,t,n,s,r){let o=new Cn(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),a=null,l=null,c=null,h=new at;h.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Je([0,2,0,0,2,0],2));let u=new qa({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new ht(h,u),d=new Ds(-1,1,1,-1,0,1),g=null,x=null,_=!1,m,w=null,M=[],v=!1;this.setSize=function(A,b){o.setSize(A,b),a!==null&&a.setSize(A,b),l!==null&&l.setSize(A,b);for(let p=0;p<M.length;p++){let y=M[p];y.setSize&&y.setSize(A,b)}},this.setEffects=function(A){M=A,v=M.length>0&&M[0].isRenderPass===!0;let b=o.width,p=o.height;M.length>0&&a===null&&(a=new Cn(b,p,{type:ii,depthBuffer:!1,stencilBuffer:!1}),l=new Cn(b,p,{type:ii,depthBuffer:!1,stencilBuffer:!1}));let y=s===!0&&M.some(I=>I.needsDepthTexture===!0);y!==(o.depthTexture!==null)&&(y===!0&&c===null&&(c=new Pi(b,p),r===!0&&(c.format=Oi,c.type=zs)),o.dispose(),o.depthTexture=y?c:null,o.resolveDepthBuffer=y,o.storeMultisampledDepthBuffer=y);for(let I=0;I<M.length;I++){let R=M[I];R.setSize&&R.setSize(b,p),y&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(A,b){if(_||A.toneMapping===fi&&M.length===0)return!1;if(w=b,b!==null){let p=b.width,y=b.height;(o.width!==p||o.height!==y)&&this.setSize(p,y)}return v===!1&&A.setRenderTarget(o),m=A.toneMapping,A.toneMapping=fi,!0},this.hasRenderPass=function(){return v},this.end=function(A,b){A.toneMapping=m,_=!0;let p=o,y=a;for(let I=0;I<M.length;I++){let R=M[I];R.enabled!==!1&&(R.render(A,y,p,b),R.needsSwap!==!1&&(p=y,y=y===a?l:a))}if(g!==A.outputColorSpace||x!==A.toneMapping){g=A.outputColorSpace,x=A.toneMapping,u.defines={},et.getTransfer(g)===vt&&(u.defines.SRGB_TRANSFER="");let I=dy[x];I&&(u.defines[I]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=p.texture,A.setRenderTarget(w),A.render(f,d),w=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){o.dispose(),a!==null&&a.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}function Dr(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=np[s];if(r===void 0&&(r=new Float32Array(s),np[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Kl(i,e){let t=ip[e];t===void 0&&(t=new Int32Array(e),ip[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function my(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function gy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),Gt(t,e)}}function _y(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),Gt(t,e)}}function xy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),Gt(t,e)}}function yy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;op.set(n),i.uniformMatrix2fv(this.addr,!1,op),Gt(t,n)}}function vy(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;rp.set(n),i.uniformMatrix3fv(this.addr,!1,rp),Gt(t,n)}}function My(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Gt(t,e)}else{if(kt(t,n))return;sp.set(n),i.uniformMatrix4fv(this.addr,!1,sp),Gt(t,n)}}function Sy(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function by(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),Gt(t,e)}}function Ty(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),Gt(t,e)}}function wy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),Gt(t,e)}}function Ay(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ey(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),Gt(t,e)}}function Ry(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),Gt(t,e)}}function Cy(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),Gt(t,e)}}function jl(i){return i.version===0&&(i.compareFunction=Dh,i.needsUpdate=!0),i}function Iy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=jl(Tp):r=bp,t.setTexture2D(e||r,s)}function Py(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ep,s)}function Ly(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=jl(wp):r=Rp,t.setTextureCube(e||r,s)}function Dy(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Ap,s)}function Ny(i){switch(i){case 5126:return my;case 35664:return gy;case 35665:return _y;case 35666:return xy;case 35674:return yy;case 35675:return vy;case 35676:return My;case 5124:case 35670:return Sy;case 35667:case 35671:return by;case 35668:case 35672:return Ty;case 35669:case 35673:return wy;case 5125:return Ay;case 36294:return Ey;case 36295:return Ry;case 36296:return Cy;case 35678:case 36198:case 36298:case 36306:case 35682:return Iy;case 35679:case 36299:case 36307:return Py;case 35680:case 36300:case 36308:case 36293:return Ly;case 36289:case 36303:case 36311:case 36292:return Dy}}function Uy(i,e){i.uniform1fv(this.addr,e)}function Fy(i,e){let t=Dr(e,this.size,2);i.uniform2fv(this.addr,t)}function Oy(i,e){let t=Dr(e,this.size,3);i.uniform3fv(this.addr,t)}function By(i,e){let t=Dr(e,this.size,4);i.uniform4fv(this.addr,t)}function zy(i,e){let t=Dr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ky(i,e){let t=Dr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gy(i,e){let t=Dr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Hy(i,e){i.uniform1iv(this.addr,e)}function Vy(i,e){i.uniform2iv(this.addr,e)}function Wy(i,e){i.uniform3iv(this.addr,e)}function Xy(i,e){i.uniform4iv(this.addr,e)}function qy(i,e){i.uniform1uiv(this.addr,e)}function Yy(i,e){i.uniform2uiv(this.addr,e)}function Zy(i,e){i.uniform3uiv(this.addr,e)}function Ky(i,e){i.uniform4uiv(this.addr,e)}function jy(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));let o;this.type===i.SAMPLER_2D_SHADOW?o=jl(Tp):o=bp;for(let a=0;a!==s;++a)t.setTexture2D(e[a]||o,r[a])}function $y(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Ep,r[o])}function Jy(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));let o;this.type===i.SAMPLER_CUBE_SHADOW?o=jl(wp):o=Rp;for(let a=0;a!==s;++a)t.setTextureCube(e[a]||o,r[a])}function Qy(i,e,t){let n=this.cache,s=e.length,r=Kl(t,s);kt(n,r)||(i.uniform1iv(this.addr,r),Gt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Ap,r[o])}function ev(i){switch(i){case 5126:return Uy;case 35664:return Fy;case 35665:return Oy;case 35666:return By;case 35674:return zy;case 35675:return ky;case 35676:return Gy;case 5124:case 35670:return Hy;case 35667:case 35671:return Vy;case 35668:case 35672:return Wy;case 35669:case 35673:return Xy;case 5125:return qy;case 36294:return Yy;case 36295:return Zy;case 36296:return Ky;case 35678:case 36198:case 36298:case 36306:case 35682:return jy;case 35679:case 36299:case 36307:return $y;case 35680:case 36300:case 36308:case 36293:return Jy;case 36289:case 36303:case 36311:case 36292:return Qy}}function ap(i,e){i.seq.push(e),i.map[e.id]=e}function tv(i,e,t){let n=i.name,s=n.length;for(Xh.lastIndex=0;;){let r=Xh.exec(n),o=Xh.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){ap(t,c===void 0?new Yh(a,i,e):new Zh(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Kh(a),ap(t,u)),t=u}}}function lp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}function sv(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function rv(i){et._getMatrix(cp,et.workingColorSpace,i);let e=`mat3( ${cp.elements.map(t=>t.toFixed(4))} )`;switch(et.getTransfer(i)){case no:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function hp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+sv(i.getShaderSource(e),a)}else return r}function ov(i,e){let t=rv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}function lv(i,e){let t=av[e];return t===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function cv(){et.getLuminanceCoefficients(Yl);let i=Yl.x.toFixed(4),e=Yl.y.toFixed(4),t=Yl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ho).join(`
`)}function uv(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function fv(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Ho(i){return i!==""}function up(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function fp(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function jh(i){return i.replace(dv,pv)}function pv(i,e){let t=st[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return jh(t)}function dp(i){return i.replace(mv,gv)}function gv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pp(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function xv(i){return _v[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function vv(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":yv[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}function Sv(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Mv[i.combine]||"ENVMAP_BLENDING_NONE"}function bv(i,e,t,n){let s=i.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,l=xv(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=vv(t),u=Sv(t),f=hv(t),d=uv(r),g=s.createProgram(),x,_,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(x=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Ho).join(`
`),x.length>0&&(x+=`
`),_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d].filter(Ho).join(`
`),_.length>0&&(_+=`
`)):(x=[pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ho).join(`
`),_=[pp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,d,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fi?"#define TONE_MAPPING":"",t.toneMapping!==fi?st.tonemapping_pars_fragment:"",t.toneMapping!==fi?lv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,ov("linearToOutputTexel",t.outputColorSpace),cv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ho).join(`
`)),o=jh(o),o=up(o,t),o=fp(o,t),a=jh(a),a=up(a,t),a=fp(a,t),o=dp(o),a=dp(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,x=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,_=["#define varying in",t.glslVersion===Uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let w=m+x+o,M=m+_+a,v=lp(s,s.VERTEX_SHADER,w),A=lp(s,s.FRAGMENT_SHADER,M);s.attachShader(g,v),s.attachShader(g,A),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function b(R){if(i.debug.checkShaderErrors){let P=s.getProgramInfoLog(g)||"",F=s.getShaderInfoLog(v)||"",z=s.getShaderInfoLog(A)||"",C=P.trim(),W=F.trim(),X=z.trim(),q=!0,ae=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,v,A);else{let Z=hp(s,v,"vertex"),se=hp(s,A,"fragment");Ze("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+C+`
`+Z+`
`+se)}else C!==""?He("WebGLProgram: Program Info Log:",C):(W===""||X==="")&&(ae=!1);ae&&(R.diagnostics={runnable:q,programLog:C,vertexShader:{log:W,prefix:x},fragmentShader:{log:X,prefix:_}})}s.deleteShader(v),s.deleteShader(A),p=new Pr(s,g),y=fv(s,g)}let p;this.getUniforms=function(){return p===void 0&&b(this),p};let y;this.getAttributes=function(){return y===void 0&&b(this),y};let I=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=s.getProgramParameter(g,nv)),I},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=iv++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=v,this.fragmentShader=A,this}function wv(i){return i===ss||i===Bo||i===zo}function Av(i,e,t,n,s,r){let o=new pr,a=new $h,l=new Set,c=[],h=new Map,u=n.logarithmicDepthBuffer,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function d(p){return l.add(p),p===0?"uv":`uv${p}`}function g(p,y,I,R,P,F){let z=R.fog,C=P.geometry,W=p.isMeshStandardMaterial||p.isMeshLambertMaterial||p.isMeshPhongMaterial?R.environment:null,X=p.isMeshStandardMaterial||p.isMeshLambertMaterial&&!p.envMap||p.isMeshPhongMaterial&&!p.envMap,q=e.get(p.envMap||W,X),ae=f[p.type],Z=n.precision;p.precision!==null&&(Z=n.getMaxPrecision(p.precision),Z!==p.precision&&He("WebGLProgram.getParameters:",p.precision,"not supported, using",Z,"instead."));let se=C.morphAttributes.position||C.morphAttributes.normal||C.morphAttributes.color,le=se!==void 0?se.length:0,Le=0;C.morphAttributes.position!==void 0&&(Le=1),C.morphAttributes.normal!==void 0&&(Le=2),C.morphAttributes.color!==void 0&&(Le=3);let Ue,ee,Me,Pe;if(ae){let Ae=mi[ae];Ue=Ae.vertexShader,ee=Ae.fragmentShader}else{Ue=p.vertexShader,ee=p.fragmentShader;let Ae=a.getVertexShaderStage(p),Mt=a.getFragmentShaderStage(p);a.update(p,Ae,Mt),Me=Ae.id,Pe=Mt.id}let Ve=i.getRenderTarget(),D=i.state.buffers.depth.getReversed(),N=P.isInstancedMesh===!0,$=P.isBatchedMesh===!0,G=!!p.map,j=!!p.matcap,Y=!!q,J=Y&&q.isPMREMTexture===!0,he=!!p.aoMap,oe=!!p.lightMap,ue=!!p.bumpMap&&p.wireframe===!1,Re=!!p.normalMap,pe=!!p.displacementMap,$e=!!p.emissiveMap,tt=!!p.metalnessMap,ut=!!p.roughnessMap,mt=p.anisotropy>0,U=p.clearcoat>0,Ce=p.diffuseRoughness>0,De=p.dispersion>0,Ye=p.retroreflectivity>0,ge=p.iridescence>0,gt=p.sheen>0,Be=p.transmission>0,ke=mt&&!!p.anisotropyMap,E=U&&!!p.clearcoatMap,S=U&&!!p.clearcoatNormalMap,H=U&&!!p.clearcoatRoughnessMap,fe=Ce&&!!p.diffuseRoughnessMap,re=ge&&!!p.iridescenceMap,_e=ge&&!!p.iridescenceThicknessMap,be=gt&&!!p.sheenColorMap,te=gt&&!!p.sheenRoughnessMap,ne=!!p.specularMap,ye=!!p.specularColorMap,L=!!p.specularIntensityMap,ie=Be&&!!p.transmissionMap,Q=Be&&!!p.thicknessMap,ve=!!p.gradientMap,me=!!p.alphaMap,xe=p.alphaTest>0,We=!!p.alphaHash,it=!!p.extensions,de=fi;p.toneMapped&&(Ve===null||Ve.isXRRenderTarget===!0)&&(de=i.toneMapping);let Xe=J?q.isCompressedCubeTexture?q.image[0].mipmaps:q.mipmaps:null,nt={shaderID:ae,shaderType:p.type,shaderName:p.name,vertexShader:Ue,fragmentShader:ee,defines:p.defines,customVertexShaderID:Me,customFragmentShaderID:Pe,isRawShaderMaterial:p.isRawShaderMaterial===!0,glslVersion:p.glslVersion,precision:Z,batching:$,batchingColor:$&&P._colorsTexture!==null,instancing:N,instancingColor:N&&P.instanceColor!==null,instancingMorph:N&&P.morphTexture!==null,outputColorSpace:Ve===null?i.outputColorSpace:Ve.isXRRenderTarget===!0?Ve.texture.colorSpace:et.workingColorSpace,alphaToCoverage:!!p.alphaToCoverage,map:G,matcap:j,envMap:Y,envMapMode:Y&&q.mapping,envMapPMREM:J,envMapMaxLod:J?Xe.length-1:null,envMapSize:J?Xe[0].width:null,aoMap:he,lightMap:oe,bumpMap:ue,normalMap:Re,displacementMap:pe,emissiveMap:$e,normalMapObjectSpace:Re&&p.normalMapType===Bd,normalMapTangentSpace:Re&&p.normalMapType===Ir,packedNormalMap:Re&&p.normalMapType===Ir&&wv(p.normalMap.format),metalnessMap:tt,roughnessMap:ut,anisotropy:mt,anisotropyMap:ke,clearcoat:U,clearcoatMap:E,clearcoatNormalMap:S,clearcoatRoughnessMap:H,diffuseRoughness:Ce,diffuseRoughnessMap:fe,dispersion:De,retroreflection:Ye,iridescence:ge,iridescenceMap:re,iridescenceThicknessMap:_e,sheen:gt,sheenColorMap:be,sheenRoughnessMap:te,specularMap:ne,specularColorMap:ye,specularIntensityMap:L,transmission:Be,transmissionMap:ie,thicknessMap:Q,gradientMap:ve,opaque:p.transparent===!1&&p.blending===wr&&p.alphaToCoverage===!1,alphaMap:me,alphaTest:xe,alphaHash:We,combine:p.combine,mapUv:G&&d(p.map.channel),aoMapUv:he&&d(p.aoMap.channel),lightMapUv:oe&&d(p.lightMap.channel),bumpMapUv:ue&&d(p.bumpMap.channel),normalMapUv:Re&&d(p.normalMap.channel),displacementMapUv:pe&&d(p.displacementMap.channel),emissiveMapUv:$e&&d(p.emissiveMap.channel),metalnessMapUv:tt&&d(p.metalnessMap.channel),roughnessMapUv:ut&&d(p.roughnessMap.channel),anisotropyMapUv:ke&&d(p.anisotropyMap.channel),clearcoatMapUv:E&&d(p.clearcoatMap.channel),clearcoatNormalMapUv:S&&d(p.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&d(p.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:fe&&d(p.diffuseRoughnessMap.channel),iridescenceMapUv:re&&d(p.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&d(p.iridescenceThicknessMap.channel),sheenColorMapUv:be&&d(p.sheenColorMap.channel),sheenRoughnessMapUv:te&&d(p.sheenRoughnessMap.channel),specularMapUv:ne&&d(p.specularMap.channel),specularColorMapUv:ye&&d(p.specularColorMap.channel),specularIntensityMapUv:L&&d(p.specularIntensityMap.channel),transmissionMapUv:ie&&d(p.transmissionMap.channel),thicknessMapUv:Q&&d(p.thicknessMap.channel),alphaMapUv:me&&d(p.alphaMap.channel),vertexTangents:!!C.attributes.tangent&&(Re||mt),vertexNormals:!!C.attributes.normal,vertexColors:p.vertexColors,vertexAlphas:p.vertexColors===!0&&!!C.attributes.color&&C.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!C.attributes.uv&&(G||me),fog:!!z,useFog:p.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:p.wireframe===!1&&(p.flatShading===!0||C.attributes.normal===void 0&&Re===!1&&(p.isMeshLambertMaterial||p.isMeshPhongMaterial||p.isMeshStandardMaterial||p.isMeshPhysicalMaterial)),sizeAttenuation:p.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:D,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:C.attributes.position!==void 0,morphTargets:C.morphAttributes.position!==void 0,morphNormals:C.morphAttributes.normal!==void 0,morphColors:C.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Le,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:F.filter(Ae=>Ae.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:p.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,decodeVideoTexture:G&&p.map.isVideoTexture===!0&&et.getTransfer(p.map.colorSpace)===vt,decodeVideoTextureEmissive:$e&&p.emissiveMap.isVideoTexture===!0&&et.getTransfer(p.emissiveMap.colorSpace)===vt,premultipliedAlpha:p.premultipliedAlpha,doubleSided:p.side===gn,flipSided:p.side===$t,useDepthPacking:p.depthPacking>=0,depthPacking:p.depthPacking||0,index0AttributeName:p.index0AttributeName,extensionClipCullDistance:it&&p.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(it&&p.extensions.multiDraw===!0||$)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:p.customProgramCacheKey()};return nt.vertexUv1s=l.has(1),nt.vertexUv2s=l.has(2),nt.vertexUv3s=l.has(3),l.clear(),nt}function x(p){let y=[];if(p.shaderID?y.push(p.shaderID):(y.push(p.customVertexShaderID),y.push(p.customFragmentShaderID)),p.defines!==void 0)for(let I in p.defines)y.push(I),y.push(p.defines[I]);return p.isRawShaderMaterial===!1&&(_(y,p),m(y,p),y.push(i.outputColorSpace)),y.push(p.customProgramCacheKey),y.join()}function _(p,y){p.push(y.precision),p.push(y.outputColorSpace),p.push(y.envMapMode),p.push(y.envMapPMREM),p.push(y.envMapMaxLod),p.push(y.envMapSize),p.push(y.mapUv),p.push(y.alphaMapUv),p.push(y.lightMapUv),p.push(y.aoMapUv),p.push(y.bumpMapUv),p.push(y.normalMapUv),p.push(y.displacementMapUv),p.push(y.emissiveMapUv),p.push(y.metalnessMapUv),p.push(y.roughnessMapUv),p.push(y.anisotropyMapUv),p.push(y.clearcoatMapUv),p.push(y.clearcoatNormalMapUv),p.push(y.clearcoatRoughnessMapUv),p.push(y.diffuseRoughnessMapUv),p.push(y.iridescenceMapUv),p.push(y.iridescenceThicknessMapUv),p.push(y.sheenColorMapUv),p.push(y.sheenRoughnessMapUv),p.push(y.specularMapUv),p.push(y.specularColorMapUv),p.push(y.specularIntensityMapUv),p.push(y.transmissionMapUv),p.push(y.thicknessMapUv),p.push(y.combine),p.push(y.fogExp2),p.push(y.sizeAttenuation),p.push(y.morphTargetsCount),p.push(y.numSunLights),p.push(y.numDirLights),p.push(y.numPointLights),p.push(y.numSpotLights),p.push(y.numSpotLightMaps),p.push(y.numHemiLights),p.push(y.numRectAreaLights),p.push(y.numSunLightShadows),p.push(y.numDirLightShadows),p.push(y.numPointLightShadows),p.push(y.numSpotLightShadows),p.push(y.numSpotLightShadowsWithMaps),p.push(y.numLightProbes),p.push(y.numLightProbeGrids),p.push(y.shadowMapType),p.push(y.toneMapping),p.push(y.numClippingPlanes),p.push(y.numClipIntersection),p.push(y.depthPacking)}function m(p,y){o.disableAll(),y.instancing&&o.enable(0),y.instancingColor&&o.enable(1),y.instancingMorph&&o.enable(2),y.matcap&&o.enable(3),y.envMap&&o.enable(4),y.normalMapObjectSpace&&o.enable(5),y.normalMapTangentSpace&&o.enable(6),y.clearcoat&&o.enable(7),y.iridescence&&o.enable(8),y.alphaTest&&o.enable(9),y.vertexColors&&o.enable(10),y.vertexAlphas&&o.enable(11),y.vertexUv1s&&o.enable(12),y.vertexUv2s&&o.enable(13),y.vertexUv3s&&o.enable(14),y.vertexTangents&&o.enable(15),y.anisotropy&&o.enable(16),y.alphaHash&&o.enable(17),y.batching&&o.enable(18),y.dispersion&&o.enable(19),y.retroreflection&&o.enable(24),y.diffuseRoughness&&o.enable(25),y.batchingColor&&o.enable(20),y.gradientMap&&o.enable(21),y.packedNormalMap&&o.enable(22),y.vertexNormals&&o.enable(23),p.push(o.mask),o.disableAll(),y.fog&&o.enable(0),y.useFog&&o.enable(1),y.flatShading&&o.enable(2),y.logarithmicDepthBuffer&&o.enable(3),y.reversedDepthBuffer&&o.enable(4),y.skinning&&o.enable(5),y.morphTargets&&o.enable(6),y.morphNormals&&o.enable(7),y.morphColors&&o.enable(8),y.premultipliedAlpha&&o.enable(9),y.shadowMapEnabled&&o.enable(10),y.doubleSided&&o.enable(11),y.flipSided&&o.enable(12),y.useDepthPacking&&o.enable(13),y.dithering&&o.enable(14),y.transmission&&o.enable(15),y.sheen&&o.enable(16),y.opaque&&o.enable(17),y.pointsUvs&&o.enable(18),y.decodeVideoTexture&&o.enable(19),y.decodeVideoTextureEmissive&&o.enable(20),y.alphaToCoverage&&o.enable(21),y.numLightProbeGrids>0&&o.enable(22),y.hasPositionAttribute&&o.enable(23),p.push(o.mask)}function w(p){let y=f[p.type],I;if(y){let R=mi[y];I=jd.clone(R.uniforms)}else I=p.uniforms;return I}function M(p,y){let I=h.get(y);return I!==void 0?++I.usedTimes:(I=new bv(i,y,p,s),c.push(I),h.set(y,I)),I}function v(p){if(--p.usedTimes===0){let y=c.indexOf(p);c[y]=c[c.length-1],c.pop(),h.delete(p.cacheKey),p.destroy()}}function A(p){a.remove(p)}function b(){a.dispose()}return{getParameters:g,getProgramCacheKey:x,getUniforms:w,acquireProgram:M,releaseProgram:v,releaseShaderCache:A,programs:c,dispose:b}}function Ev(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Rv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function mp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function gp(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(f){let d=0;return f.isInstancedMesh&&(d+=2),f.isSkinnedMesh&&(d+=1),d}function a(f,d,g,x,_,m){let w=i[e];return w===void 0?(w={id:f.id,object:f,geometry:d,material:g,materialVariant:o(f),groupOrder:x,renderOrder:f.renderOrder,z:_,group:m},i[e]=w):(w.id=f.id,w.object=f,w.geometry=d,w.material=g,w.materialVariant=o(f),w.groupOrder=x,w.renderOrder=f.renderOrder,w.z=_,w.group=m),e++,w}function l(f,d,g,x,_,m,w){w.reversedDepth===!0&&(_=-_);let M=a(f,d,g,x,_,m);g.transmission>0?n.push(M):g.transparent===!0?s.push(M):t.push(M)}function c(f,d,g,x,_,m){let w=a(f,d,g,x,_,m);g.transmission>0?n.unshift(w):g.transparent===!0?s.unshift(w):t.unshift(w)}function h(f,d){t.length>1&&t.sort(f||Rv),n.length>1&&n.sort(d||mp),s.length>1&&s.sort(d||mp)}function u(){for(let f=e,d=i.length;f<d;f++){let g=i[f];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function Cv(){let i=new WeakMap;function e(n,s){let r=i.get(n),o;return r===void 0?(o=new gp,i.set(n,[o])):s>=r.length?(o=new gp,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Iv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new B,color:new we};break;case"SpotLight":t={position:new B,direction:new B,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new we,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new we,groundColor:new we};break;case"RectAreaLight":t={color:new we,position:new B,halfWidth:new B,halfHeight:new B};break}return i[e.id]=t,t}}}function Pv(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}function Dv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Nv(i){let e=new Iv,t=Pv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new B);let s=new B,r=new qe,o=new qe;function a(c){let h=0,u=0,f=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let d=0,g=0,x=0,_=0,m=0,w=0,M=0,v=0,A=0,b=0,p=0,y=0,I=0,R=0;c.sort(Dv);for(let F=0,z=c.length;F<z;F++){let C=c[F],W=C.color,X=C.intensity,q=C.distance,ae=null;if(C.shadow&&C.shadow.map&&(C.shadow.map.texture.format===ss?ae=C.shadow.map.texture:ae=C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)h+=W.r*X,u+=W.g*X,f+=W.b*X;else if(C.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(C.sh.coefficients[Z],X);R++}else if(C.isSunLight){let Z=e.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let se=C.shadow,le=t.get(C);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize.copy(se.mapSize).multiply(se.getFrameExtents()),n.sunShadow[g]=le,n.sunShadowMap[g]=ae;let Le=se.getViewportCount();for(let Ue=0;Ue<Le;Ue++)n.sunShadowMatrix[x+Ue]=se.getMatrix(Ue),n.sunShadowCascade[x+Ue]=se._cascadeData[Ue];x+=Le,g++}n.sun[d]=Z,d++}else if(C.isDirectionalLight){let Z=e.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let se=C.shadow,le=t.get(C);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize=se.mapSize,n.directionalShadow[_]=le,n.directionalShadowMap[_]=ae,n.directionalShadowMatrix[_]=C.shadow.matrix,A++}n.directional[_]=Z,_++}else if(C.isSpotLight){let Z=e.get(C);Z.position.setFromMatrixPosition(C.matrixWorld),Z.color.copy(W).multiplyScalar(X),Z.distance=q,Z.coneCos=Math.cos(C.angle),Z.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),Z.decay=C.decay,n.spot[w]=Z;let se=C.shadow;if(C.map&&(n.spotLightMap[y]=C.map,y++,se.updateMatrices(C),C.castShadow&&I++),n.spotLightMatrix[w]=se.matrix,C.castShadow){let le=t.get(C);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize=se.mapSize,n.spotShadow[w]=le,n.spotShadowMap[w]=ae,p++}w++}else if(C.isRectAreaLight){let Z=e.get(C);Z.color.copy(W).multiplyScalar(X),Z.halfWidth.set(C.width*.5,0,0),Z.halfHeight.set(0,C.height*.5,0),n.rectArea[M]=Z,M++}else if(C.isPointLight){let Z=e.get(C);if(Z.color.copy(C.color).multiplyScalar(C.intensity),Z.distance=C.distance,Z.decay=C.decay,C.castShadow){let se=C.shadow,le=t.get(C);le.shadowIntensity=se.intensity,le.shadowBias=se.bias,le.shadowNormalBias=se.normalBias,le.shadowRadius=se.radius,le.shadowMapSize=se.mapSize,le.shadowCameraNear=se.camera.near,le.shadowCameraFar=se.camera.far,n.pointShadow[m]=le,n.pointShadowMap[m]=ae,n.pointShadowMatrix[m]=C.shadow.matrix,b++}n.point[m]=Z,m++}else if(C.isHemisphereLight){let Z=e.get(C);Z.skyColor.copy(C.color).multiplyScalar(X),Z.groundColor.copy(C.groundColor).multiplyScalar(X),n.hemi[v]=Z,v++}}M>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ee.LTC_FLOAT_1,n.rectAreaLTC2=Ee.LTC_FLOAT_2):(n.rectAreaLTC1=Ee.LTC_HALF_1,n.rectAreaLTC2=Ee.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;let P=n.hash;(P.sunLength!==d||P.directionalLength!==_||P.pointLength!==m||P.spotLength!==w||P.rectAreaLength!==M||P.hemiLength!==v||P.numSunShadows!==g||P.numDirectionalShadows!==A||P.numPointShadows!==b||P.numSpotShadows!==p||P.numSpotMaps!==y||P.numLightProbes!==R)&&(n.sun.length=d,n.directional.length=_,n.spot.length=w,n.rectArea.length=M,n.point.length=m,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=x,n.sunShadowCascade.length=x,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.directionalShadowMatrix.length=A,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=p,n.spotShadowMap.length=p,n.spotLightMatrix.length=p+y-I,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=I,n.numLightProbes=R,P.sunLength=d,P.directionalLength=_,P.pointLength=m,P.spotLength=w,P.rectAreaLength=M,P.hemiLength=v,P.numSunShadows=g,P.numDirectionalShadows=A,P.numPointShadows=b,P.numSpotShadows=p,P.numSpotMaps=y,P.numLightProbes=R,n.version=Lv++)}function l(c,h){let u=0,f=0,d=0,g=0,x=0,_=0,m=h.matrixWorldInverse;for(let w=0,M=c.length;w<M;w++){let v=c[w];if(v.isSunLight){let A=n.sun[u];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(m),u++}else if(v.isDirectionalLight){let A=n.directional[f];A.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),f++}else if(v.isSpotLight){let A=n.spot[g];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(m),A.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),A.direction.sub(s),A.direction.transformDirection(m),g++}else if(v.isRectAreaLight){let A=n.rectArea[x];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(m),o.identity(),r.copy(v.matrixWorld),r.premultiply(m),o.extractRotation(r),A.halfWidth.set(v.width*.5,0,0),A.halfHeight.set(0,v.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),x++}else if(v.isPointLight){let A=n.point[d];A.position.setFromMatrixPosition(v.matrixWorld),A.position.applyMatrix4(m),d++}else if(v.isHemisphereLight){let A=n.hemi[_];A.direction.setFromMatrixPosition(v.matrixWorld),A.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function _p(i){let e=new Nv(i),t=[],n=[],s=[];function r(u){h.camera=u,t.length=0,n.length=0,s.length=0}function o(u){u.isLightProbeGrid?s.push(u):t.push(u)}function a(u){n.push(u)}function l(){e.setup(t),s.sort((u,f)=>u.priority-f.priority||u.id-f.id)}function c(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Uv(i){let e=new WeakMap;function t(s,r=0){let o=e.get(s),a;return o===void 0?(a=new _p(i),e.set(s,[a])):r>=o.length?(a=new _p(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function kv(i,e,t){let n=new Qi,s=new Ge,r=new Ge,o=new St,a=new Ya,l=new Za,c={},h=t.maxTextureSize,u={[Hn]:$t,[$t]:Hn,[gn]:gn},f=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:Fv,fragmentShader:Ov}),d=f.clone();d.defines.HORIZONTAL_PASS=1;let g=new at;g.setAttribute("position",new pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new ht(g,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Po;let m=this.type;this.render=function(b,p,y){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||b.length===0)return;this.type===ud&&(He("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Po);let I=i.getRenderTarget(),R=i.getActiveCubeFace(),P=i.getActiveMipmapLevel(),F=i.state;F.setBlending(Us),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let z=m!==this.type;z&&p.traverse(function(C){C.material&&(Array.isArray(C.material)?C.material.forEach(W=>W.needsUpdate=!0):C.material.needsUpdate=!0)});for(let C=0,W=b.length;C<W;C++){let X=b[C],q=X.shadow;if(q===void 0){He("WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let ae=q.getFrameExtents();s.multiply(ae),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/ae.x),s.x=r.x*ae.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/ae.y),s.y=r.y*ae.y,q.mapSize.y=r.y));let Z=i.state.buffers.depth.getReversed();if(q.camera._reversedDepth=Z,q.map===null||z===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===Tr){if(X.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new Cn(s.x,s.y,{format:ss,type:ii,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),q.map.texture.name=X.name+".shadowMap",q.map.depthTexture=new Pi(s.x,s.y,Dn),q.map.depthTexture.name=X.name+".shadowMapDepth",q.map.depthTexture.format=Ri,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Rt,q.map.depthTexture.magFilter=Rt}else X.isPointLight?(q.map=new Vo(s.x),q.map.depthTexture=new po(s.x,ni)):(q.map=new Cn(s.x,s.y),q.map.depthTexture=new Pi(s.x,s.y,ni)),q.map.depthTexture.name=X.name+".shadowMap",q.map.depthTexture.format=Ri,this.type===Po?(q.map.depthTexture.compareFunction=Z?Lh:Ph,q.map.depthTexture.minFilter=Ct,q.map.depthTexture.magFilter=Ct):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=Rt,q.map.depthTexture.magFilter=Rt);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let se=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();X.isPointLight!==!0&&q.updateMatrices(X,y);let le=(q.camera.layers.mask&4294967294)!==0?q.camera.layers:y.layers;for(let Le=0;Le<se;Le++){let Ue=q.getCamera(Le);if(X.isPointLight){let ee=q.camera,Me=q.matrix,Pe=X.distance||ee.far;Pe!==ee.far&&(ee.far=Pe,ee.updateProjectionMatrix()),Go.setFromMatrixPosition(X.matrixWorld),ee.position.copy(Go),qh.copy(ee.position),qh.add(Bv[Le]),ee.up.copy(zv[Le]),ee.lookAt(qh),ee.updateMatrixWorld(),Me.makeTranslation(-Go.x,-Go.y,-Go.z),xp.multiplyMatrices(ee.projectionMatrix,ee.matrixWorldInverse),q._frustum.setFromProjectionMatrix(xp,ee.coordinateSystem,ee.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)i.setRenderTarget(q.map,Le),i.clear();else{Le===0&&(i.setRenderTarget(q.map),i.clear());let ee=q.getViewport(Le);o.set(r.x*ee.x,r.y*ee.y,r.x*ee.z,r.y*ee.w),F.viewport(o)}n=q.getFrustum(Le),v(p,y,Ue,X,le,this.type)}q.isPointLightShadow!==!0&&this.type===Tr&&w(q,y),q.needsUpdate=!1}m=this.type,_.needsUpdate=!1,i.setRenderTarget(I,R,P)};function w(b,p){let y=e.update(x);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,d.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),b.mapPass===null?b.mapPass=new Cn(s.x,s.y,{format:ss,type:ii}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),f.uniforms.shadow_pass.value=b.map.depthTexture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(p,null,y,f,x,null),d.uniforms.shadow_pass.value=b.mapPass.texture,d.uniforms.resolution.value.set(b.map.width,b.map.height),d.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(p,null,y,d,x,null)}function M(b,p,y,I){let R=null,P=y.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(P!==void 0)R=P;else if(R=y.isPointLight===!0?l:a,i.localClippingEnabled&&p.clipShadows===!0&&Array.isArray(p.clippingPlanes)&&p.clippingPlanes.length!==0||p.displacementMap&&p.displacementScale!==0||p.alphaMap&&p.alphaTest>0||p.map&&p.alphaTest>0||p.alphaToCoverage===!0){let F=R.uuid,z=p.uuid,C=c[F];C===void 0&&(C={},c[F]=C);let W=C[z];W===void 0&&(W=R.clone(),C[z]=W,p.addEventListener("dispose",A)),R=W}if(R.visible=p.visible,R.wireframe=p.wireframe,I===Tr?R.side=p.shadowSide!==null?p.shadowSide:p.side:R.side=p.shadowSide!==null?p.shadowSide:u[p.side],R.alphaMap=p.alphaMap,R.alphaTest=p.alphaToCoverage===!0?.5:p.alphaTest,R.map=p.map,R.clipShadows=p.clipShadows,R.clippingPlanes=p.clippingPlanes,R.clipIntersection=p.clipIntersection,R.displacementMap=p.displacementMap,R.displacementScale=p.displacementScale,R.displacementBias=p.displacementBias,R.wireframeLinewidth=p.wireframeLinewidth,R.linewidth=p.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let F=i.properties.get(R);F.light=y}return R}function v(b,p,y,I,R,P){if(b.visible===!1)return;if(b.layers.test(R)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===Tr)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,b.matrixWorld);let C=e.update(b),W=b.material;if(Array.isArray(W)){let X=C.groups;for(let q=0,ae=X.length;q<ae;q++){let Z=X[q],se=W[Z.materialIndex];if(se&&se.visible){let le=M(b,se,I,P);b.onBeforeShadow(i,b,p,y,C,le,Z),i.renderBufferDirect(y,null,C,le,b,Z),b.onAfterShadow(i,b,p,y,C,le,Z)}}}else if(W.visible){let X=M(b,W,I,P);b.onBeforeShadow(i,b,p,y,C,X,null),i.renderBufferDirect(y,null,C,X,b,null),b.onAfterShadow(i,b,p,y,C,X,null)}}let z=b.children;for(let C=0,W=z.length;C<W;C++)v(z[C],p,y,I,R,P)}function A(b){b.target.removeEventListener("dispose",A);for(let y in c){let I=c[y],R=b.target.uuid;R in I&&(I[R].dispose(),delete I[R])}}}function Gv(i,e){function t(){let L=!1,ie=new St,Q=null,ve=new St(0,0,0,0);return{setMask:function(me){Q!==me&&!L&&(i.colorMask(me,me,me,me),Q=me)},setLocked:function(me){L=me},setClear:function(me,xe,We,it,de){de===!0&&(me*=it,xe*=it,We*=it),ie.set(me,xe,We,it),ve.equals(ie)===!1&&(i.clearColor(me,xe,We,it),ve.copy(ie))},reset:function(){L=!1,Q=null,ve.set(-1,0,0,0)}}}function n(){let L=!1,ie=!1,Q=null,ve=null,me=null;return{setReversed:function(xe){if(ie!==xe){let We=e.get("EXT_clip_control");xe?We.clipControlEXT(We.LOWER_LEFT_EXT,We.ZERO_TO_ONE_EXT):We.clipControlEXT(We.LOWER_LEFT_EXT,We.NEGATIVE_ONE_TO_ONE_EXT),ie=xe;let it=me;me=null,this.setClear(it)}},getReversed:function(){return ie},setTest:function(xe){xe?D(i.DEPTH_TEST):N(i.DEPTH_TEST)},setMask:function(xe){Q!==xe&&!L&&(i.depthMask(xe),Q=xe)},setFunc:function(xe){if(ie&&(xe=Zd[xe]),ve!==xe){switch(xe){case Da:i.depthFunc(i.NEVER);break;case Na:i.depthFunc(i.ALWAYS);break;case Ua:i.depthFunc(i.LESS);break;case cr:i.depthFunc(i.LEQUAL);break;case Fa:i.depthFunc(i.EQUAL);break;case Oa:i.depthFunc(i.GEQUAL);break;case Ba:i.depthFunc(i.GREATER);break;case za:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=xe}},setLocked:function(xe){L=xe},setClear:function(xe){me!==xe&&(me=xe,ie&&(xe=1-xe),i.clearDepth(xe))},reset:function(){L=!1,Q=null,ve=null,me=null,ie=!1}}}function s(){let L=!1,ie=null,Q=null,ve=null,me=null,xe=null,We=null,it=null,de=null;return{setTest:function(Xe){L||(Xe?D(i.STENCIL_TEST):N(i.STENCIL_TEST))},setMask:function(Xe){ie!==Xe&&!L&&(i.stencilMask(Xe),ie=Xe)},setFunc:function(Xe,nt,Ae){(Q!==Xe||ve!==nt||me!==Ae)&&(i.stencilFunc(Xe,nt,Ae),Q=Xe,ve=nt,me=Ae)},setOp:function(Xe,nt,Ae){(xe!==Xe||We!==nt||it!==Ae)&&(i.stencilOp(Xe,nt,Ae),xe=Xe,We=nt,it=Ae)},setLocked:function(Xe){L=Xe},setClear:function(Xe){de!==Xe&&(i.clearStencil(Xe),de=Xe)},reset:function(){L=!1,ie=null,Q=null,ve=null,me=null,xe=null,We=null,it=null,de=null}}}let r=new t,o=new n,a=new s,l={},c=new WeakMap,h={},u={},f={},d=new WeakMap,g=[],x=null,_=!1,m=null,w=null,M=null,v=null,A=null,b=null,p=null,y=new we(0,0,0),I=0,R=!1,P=null,F=null,z=null,C=null,W=null,X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,ae=0,Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(Z)[1]),q=ae>=1):Z.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),q=ae>=2);let se=null,le={},Le=i.getParameter(i.SCISSOR_BOX),Ue=i.getParameter(i.VIEWPORT),ee=new St().fromArray(Le),Me=new St().fromArray(Ue);function Pe(L,ie,Q,ve){let me=new Uint8Array(4),xe=i.createTexture();i.bindTexture(L,xe),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let We=0;We<Q;We++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ie,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,me):i.texImage2D(ie+We,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,me);return xe}let Ve={};Ve[i.TEXTURE_2D]=Pe(i.TEXTURE_2D,i.TEXTURE_2D,1),Ve[i.TEXTURE_CUBE_MAP]=Pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ve[i.TEXTURE_2D_ARRAY]=Pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ve[i.TEXTURE_3D]=Pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),D(i.DEPTH_TEST),o.setFunc(cr),ue(!1),Re(uh),D(i.CULL_FACE),he(Us);function D(L){h[L]!==!0&&(i.enable(L),h[L]=!0)}function N(L){h[L]!==!1&&(i.disable(L),h[L]=!1)}function $(L,ie){return f[L]!==ie?(i.bindFramebuffer(L,ie),f[L]=ie,L===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=ie),L===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=ie),!0):!1}function G(L,ie){let Q=g,ve=!1;if(L){Q=d.get(ie),Q===void 0&&(Q=[],d.set(ie,Q));let me=L.textures;if(Q.length!==me.length||Q[0]!==i.COLOR_ATTACHMENT0){for(let xe=0,We=me.length;xe<We;xe++)Q[xe]=i.COLOR_ATTACHMENT0+xe;Q.length=me.length,ve=!0}}else Q[0]!==i.BACK&&(Q[0]=i.BACK,ve=!0);ve&&i.drawBuffers(Q)}function j(L){return x!==L?(i.useProgram(L),x=L,!0):!1}let Y={[Fs]:i.FUNC_ADD,[dd]:i.FUNC_SUBTRACT,[pd]:i.FUNC_REVERSE_SUBTRACT};Y[md]=i.MIN,Y[gd]=i.MAX;let J={[_d]:i.ZERO,[xd]:i.ONE,[yd]:i.SRC_COLOR,[mh]:i.SRC_ALPHA,[wd]:i.SRC_ALPHA_SATURATE,[bd]:i.DST_COLOR,[Md]:i.DST_ALPHA,[vd]:i.ONE_MINUS_SRC_COLOR,[gh]:i.ONE_MINUS_SRC_ALPHA,[Td]:i.ONE_MINUS_DST_COLOR,[Sd]:i.ONE_MINUS_DST_ALPHA,[Ad]:i.CONSTANT_COLOR,[Ed]:i.ONE_MINUS_CONSTANT_COLOR,[Rd]:i.CONSTANT_ALPHA,[Cd]:i.ONE_MINUS_CONSTANT_ALPHA};function he(L,ie,Q,ve,me,xe,We,it,de,Xe){if(L===Us){_===!0&&(N(i.BLEND),_=!1);return}if(_===!1&&(D(i.BLEND),_=!0),L!==fd){if(L!==m||Xe!==R){if((w!==Fs||A!==Fs)&&(i.blendEquation(i.FUNC_ADD),w=Fs,A=Fs),Xe)switch(L){case wr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fh:i.blendFunc(i.ONE,i.ONE);break;case dh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ph:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ze("WebGLState: Invalid blending: ",L);break}else switch(L){case wr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fh:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case dh:Ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case ph:Ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ze("WebGLState: Invalid blending: ",L);break}M=null,v=null,b=null,p=null,y.set(0,0,0),I=0,m=L,R=Xe}return}me=me||ie,xe=xe||Q,We=We||ve,(ie!==w||me!==A)&&(i.blendEquationSeparate(Y[ie],Y[me]),w=ie,A=me),(Q!==M||ve!==v||xe!==b||We!==p)&&(i.blendFuncSeparate(J[Q],J[ve],J[xe],J[We]),M=Q,v=ve,b=xe,p=We),(it.equals(y)===!1||de!==I)&&(i.blendColor(it.r,it.g,it.b,de),y.copy(it),I=de),m=L,R=!1}function oe(L,ie){L.side===gn?N(i.CULL_FACE):D(i.CULL_FACE);let Q=L.side===$t;ie&&(Q=!Q),ue(Q),L.blending===wr&&L.transparent===!1?he(Us):he(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);let ve=L.stencilWrite;a.setTest(ve),ve&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),$e(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?D(i.SAMPLE_ALPHA_TO_COVERAGE):N(i.SAMPLE_ALPHA_TO_COVERAGE)}function ue(L){P!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),P=L)}function Re(L){L!==cd?(D(i.CULL_FACE),L!==F&&(L===uh?i.cullFace(i.BACK):L===hd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):N(i.CULL_FACE),F=L}function pe(L){L!==z&&(q&&i.lineWidth(L),z=L)}function $e(L,ie,Q){L?(D(i.POLYGON_OFFSET_FILL),(C!==ie||W!==Q)&&(C=ie,W=Q,o.getReversed()&&(ie=-ie,Q=-Q),i.polygonOffset(ie,Q))):N(i.POLYGON_OFFSET_FILL)}function tt(L){L?D(i.SCISSOR_TEST):N(i.SCISSOR_TEST)}function ut(L){L===void 0&&(L=i.TEXTURE0+X-1),se!==L&&(i.activeTexture(L),se=L)}function mt(L,ie,Q){Q===void 0&&(se===null?Q=i.TEXTURE0+X-1:Q=se);let ve=le[Q];ve===void 0&&(ve={type:void 0,texture:void 0},le[Q]=ve),(ve.type!==L||ve.texture!==ie)&&(se!==Q&&(i.activeTexture(Q),se=Q),i.bindTexture(L,ie||Ve[L]),ve.type=L,ve.texture=ie)}function U(){let L=le[se];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Ce(){try{i.compressedTexImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function De(){try{i.compressedTexImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function Ye(){try{i.texSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ge(){try{i.texSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function gt(){try{i.compressedTexSubImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function Be(){try{i.compressedTexSubImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function ke(){try{i.texStorage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function E(){try{i.texStorage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function S(){try{i.texImage2D(...arguments)}catch(L){Ze("WebGLState:",L)}}function H(){try{i.texImage3D(...arguments)}catch(L){Ze("WebGLState:",L)}}function fe(L){return u[L]!==void 0?u[L]:i.getParameter(L)}function re(L,ie){u[L]!==ie&&(i.pixelStorei(L,ie),u[L]=ie)}function _e(L){ee.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),ee.copy(L))}function be(L){Me.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Me.copy(L))}function te(L,ie){let Q=c.get(ie);Q===void 0&&(Q=new WeakMap,c.set(ie,Q));let ve=Q.get(L);ve===void 0&&(ve=i.getUniformBlockIndex(ie,L.name),i.uniformBlockBinding(ie,ve,ve),Q.set(L,ve))}function ne(L,ie,Q){let me=c.get(ie).get(L);l[me]!==Q&&(i.bindBufferBase(i.UNIFORM_BUFFER,me,Q),l[me]=Q)}function ye(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},u={},se=null,le={},f={},l={},d=new WeakMap,g=[],x=null,_=!1,m=null,w=null,M=null,v=null,A=null,b=null,p=null,y=new we(0,0,0),I=0,R=!1,P=null,F=null,z=null,C=null,W=null,ee.set(0,0,i.canvas.width,i.canvas.height),Me.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:D,disable:N,bindFramebuffer:$,drawBuffers:G,useProgram:j,setBlending:he,setMaterial:oe,setFlipSided:ue,setCullFace:Re,setLineWidth:pe,setPolygonOffset:$e,setScissorTest:tt,activeTexture:ut,bindTexture:mt,unbindTexture:U,compressedTexImage2D:Ce,compressedTexImage3D:De,texImage2D:S,texImage3D:H,pixelStorei:re,getParameter:fe,updateUBOMapping:te,uniformBlockBinding:ne,texStorage2D:ke,texStorage3D:E,texSubImage2D:Ye,texSubImage3D:ge,compressedTexSubImage2D:gt,compressedTexSubImage3D:Be,scissor:_e,viewport:be,reset:ye}}function Hv(i,e,t,n,s,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ge,h=new WeakMap,u=new Set,f,d=new WeakMap,g=new Set,x=new FinalizationRegistry(E=>g.delete(E)),_=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,S){return _?new OffscreenCanvas(E,S):ur("canvas")}function w(E,S,H){let fe=1,re=ke(E);if((re.width>H||re.height>H)&&(fe=H/Math.max(re.width,re.height)),fe<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let _e=Math.floor(fe*re.width),be=Math.floor(fe*re.height);f===void 0&&(f=m(_e,be));let te=S?m(_e,be):f;return te.width=_e,te.height=be,te.getContext("2d").drawImage(E,0,0,_e,be),He("WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+_e+"x"+be+")."),te}else return"data"in E&&He("WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),E;return E}function M(E){return E.generateMipmaps}function v(E){i.generateMipmap(E)}function A(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(E,S,H,fe,re,_e=!1){if(E!==null){if(i[E]!==void 0)return i[E];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let be;fe&&(be=e.get("EXT_texture_norm16"),be||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let te=S;if(S===i.RED&&(H===i.FLOAT&&(te=i.R32F),H===i.HALF_FLOAT&&(te=i.R16F),H===i.UNSIGNED_BYTE&&(te=i.R8),H===i.UNSIGNED_SHORT&&be&&(te=be.R16_EXT),H===i.SHORT&&be&&(te=be.R16_SNORM_EXT)),S===i.RED_INTEGER&&(H===i.UNSIGNED_BYTE&&(te=i.R8UI),H===i.UNSIGNED_SHORT&&(te=i.R16UI),H===i.UNSIGNED_INT&&(te=i.R32UI),H===i.BYTE&&(te=i.R8I),H===i.SHORT&&(te=i.R16I),H===i.INT&&(te=i.R32I)),S===i.RG&&(H===i.FLOAT&&(te=i.RG32F),H===i.HALF_FLOAT&&(te=i.RG16F),H===i.UNSIGNED_BYTE&&(te=i.RG8),H===i.UNSIGNED_SHORT&&be&&(te=be.RG16_EXT),H===i.SHORT&&be&&(te=be.RG16_SNORM_EXT)),S===i.RG_INTEGER&&(H===i.UNSIGNED_BYTE&&(te=i.RG8UI),H===i.UNSIGNED_SHORT&&(te=i.RG16UI),H===i.UNSIGNED_INT&&(te=i.RG32UI),H===i.BYTE&&(te=i.RG8I),H===i.SHORT&&(te=i.RG16I),H===i.INT&&(te=i.RG32I)),S===i.RGB_INTEGER&&(H===i.UNSIGNED_BYTE&&(te=i.RGB8UI),H===i.UNSIGNED_SHORT&&(te=i.RGB16UI),H===i.UNSIGNED_INT&&(te=i.RGB32UI),H===i.BYTE&&(te=i.RGB8I),H===i.SHORT&&(te=i.RGB16I),H===i.INT&&(te=i.RGB32I)),S===i.RGBA_INTEGER&&(H===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),H===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),H===i.UNSIGNED_INT&&(te=i.RGBA32UI),H===i.BYTE&&(te=i.RGBA8I),H===i.SHORT&&(te=i.RGBA16I),H===i.INT&&(te=i.RGBA32I)),S===i.RGB&&(H===i.UNSIGNED_SHORT&&be&&(te=be.RGB16_EXT),H===i.SHORT&&be&&(te=be.RGB16_SNORM_EXT),H===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),H===i.UNSIGNED_INT_10F_11F_11F_REV&&(te=i.R11F_G11F_B10F)),S===i.RGBA){let ne=_e?no:et.getTransfer(re);H===i.FLOAT&&(te=i.RGBA32F),H===i.HALF_FLOAT&&(te=i.RGBA16F),H===i.UNSIGNED_BYTE&&(te=ne===vt?i.SRGB8_ALPHA8:i.RGBA8),H===i.UNSIGNED_SHORT&&be&&(te=be.RGBA16_EXT),H===i.SHORT&&be&&(te=be.RGBA16_SNORM_EXT),H===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),H===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function p(E,S){let H;return E?S===null||S===ni||S===zs?H=i.DEPTH24_STENCIL8:S===Dn?H=i.DEPTH32F_STENCIL8:S===Rr&&(H=i.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ni||S===zs?H=i.DEPTH_COMPONENT24:S===Dn?H=i.DEPTH_COMPONENT32F:S===Rr&&(H=i.DEPTH_COMPONENT16),H}function y(E,S){return M(E)===!0||E.isFramebufferTexture&&E.minFilter!==Rt&&E.minFilter!==Ct?Math.log2(Math.max(S.width,S.height))+1:E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?S.mipmaps.length:1}function I(E){let S=new WeakRef(E);n.get(E).__ref=S,g.add(S),x.register(E,S,S)}function R(E){let S=n.get(E).__ref;S!==void 0&&(g.delete(S),x.unregister(S))}function P(E){z(E.target)}function F(E){C(E.target)}function z(E){E.removeEventListener("dispose",P),R(E),X(E),E.isVideoTexture&&h.delete(E),E.isHTMLTexture&&u.delete(E)}function C(E){E.removeEventListener("dispose",F),R(E),ae(E)}function W(){for(let E of g){let S=E.deref();S!==void 0&&(S.isRenderTarget===!0?C(S):z(S))}g.clear(),u.clear()}function X(E){let S=n.get(E);if(S.__webglInit===void 0)return;let H=E.source,fe=d.get(H);if(fe){let re=fe[S.__cacheKey];re.usedTimes--,re.usedTimes===0&&q(E),Object.keys(fe).length===0&&d.delete(H)}n.remove(E)}function q(E){let S=n.get(E);i.deleteTexture(S.__webglTexture);let H=E.source,fe=d.get(H);delete fe[S.__cacheKey],o.memory.textures--}function ae(E){let S=n.get(E);S.__depthDisposeCallback&&S.__depthDisposeCallback();let H=E.depthTexture;if(H&&H.renderTarget===E&&z(H),E.isWebGLCubeRenderTarget)for(let re=0;re<6;re++){if(Array.isArray(S.__webglFramebuffer[re]))for(let _e=0;_e<S.__webglFramebuffer[re].length;_e++)i.deleteFramebuffer(S.__webglFramebuffer[re][_e]);else i.deleteFramebuffer(S.__webglFramebuffer[re]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[re])}else{if(Array.isArray(S.__webglFramebuffer))for(let re=0;re<S.__webglFramebuffer.length;re++)i.deleteFramebuffer(S.__webglFramebuffer[re]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let re=0;re<S.__webglColorRenderbuffer.length;re++)S.__webglColorRenderbuffer[re]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[re]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let fe=E.textures;for(let re=0,_e=fe.length;re<_e;re++){let be=n.get(fe[re]);be.__webglTexture&&(i.deleteTexture(be.__webglTexture),o.memory.textures--),n.remove(fe[re])}n.remove(E)}let Z=0;function se(){Z=0}function le(){return Z}function Le(E){Z=E}function Ue(){let E=Z;return E>=s.maxTextures&&He("WebGLTextures: Trying to use "+(E+1)+" texture units while this GPU supports only "+s.maxTextures),Z+=1,E}function ee(E){let S=[];return S.push(E.wrapS),S.push(E.wrapT),S.push(E.wrapR||0),S.push(E.magFilter),S.push(E.minFilter),S.push(E.anisotropy),S.push(E.internalFormat),S.push(E.format),S.push(E.type),S.push(E.generateMipmaps),S.push(E.mipmapsAutoUpdate),S.push(E.premultiplyAlpha),S.push(E.flipY),S.push(E.unpackAlignment),S.push(E.colorSpace),S.join()}function Me(E,S){let H=n.get(E);if(E.isVideoTexture&&gt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&H.__version!==E.version){let fe=E.image;if(fe===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(fe.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{oe(H,E,S);return}}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,H.__webglTexture,i.TEXTURE0+S)}function Pe(E,S){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){oe(H,E,S);return}else E.isExternalTexture&&(H.__webglTexture=E.sourceTexture?E.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,H.__webglTexture,i.TEXTURE0+S)}function Ve(E,S){let H=n.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&H.__version!==E.version){oe(H,E,S);return}t.bindTexture(i.TEXTURE_3D,H.__webglTexture,i.TEXTURE0+S)}function D(E,S){let H=n.get(E);if(E.version>0&&H.__version!==E.version){ue(H,E,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,H.__webglTexture,i.TEXTURE0+S)}let N={[dn]:i.REPEAT,[fn]:i.CLAMP_TO_EDGE,[Ei]:i.MIRRORED_REPEAT},$={[Rt]:i.NEAREST,[rl]:i.NEAREST_MIPMAP_NEAREST,[Bs]:i.NEAREST_MIPMAP_LINEAR,[Ct]:i.LINEAR,[Er]:i.LINEAR_MIPMAP_NEAREST,[_n]:i.LINEAR_MIPMAP_LINEAR},G={[kd]:i.NEVER,[Dh]:i.ALWAYS,[Gd]:i.LESS,[Ph]:i.LEQUAL,[Hd]:i.EQUAL,[Lh]:i.GEQUAL,[Vd]:i.GREATER,[Wd]:i.NOTEQUAL};function j(E,S){if(S.type===Dn&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Ct||S.magFilter===Er||S.magFilter===Bs||S.magFilter===_n||S.minFilter===Ct||S.minFilter===Er||S.minFilter===Bs||S.minFilter===_n)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,N[S.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,N[S.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,N[S.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,$[S.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,$[S.minFilter]),S.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,G[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Rt||S.minFilter!==Bs&&S.minFilter!==_n||S.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Y(E,S){let H=!1;E.__webglInit===void 0&&(E.__webglInit=!0,S.addEventListener("dispose",P),I(S));let fe=S.source,re=d.get(fe);re===void 0&&(re={},d.set(fe,re));let _e=ee(S);if(_e!==E.__cacheKey){re[_e]===void 0&&(re[_e]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,H=!0),re[_e].usedTimes++;let be=re[E.__cacheKey];be!==void 0&&(re[E.__cacheKey].usedTimes--,be.usedTimes===0&&q(S)),E.__cacheKey=_e,E.__webglTexture=re[_e].texture}return H}function J(E,S,H){return Math.floor(Math.floor(E/H)/S)}function he(E,S,H,fe){let _e=E.updateRanges;if(_e.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,H,fe,S.data);else{_e.sort((L,ie)=>L.start-ie.start);let be=0;for(let L=1;L<_e.length;L++){let ie=_e[be],Q=_e[L],ve=ie.start+ie.count,me=J(Q.start,S.width,4),xe=J(ie.start,S.width,4);Q.start<=ve+1&&me===xe&&J(Q.start+Q.count-1,S.width,4)===me?ie.count=Math.max(ie.count,Q.start+Q.count-ie.start):(++be,_e[be]=Q)}_e.length=be+1;let te=t.getParameter(i.UNPACK_ROW_LENGTH),ne=t.getParameter(i.UNPACK_SKIP_PIXELS),ye=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let L=0,ie=_e.length;L<ie;L++){let Q=_e[L],ve=Math.floor(Q.start/4),me=Math.ceil(Q.count/4),xe=ve%S.width,We=Math.floor(ve/S.width),it=me,de=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,We),t.texSubImage2D(i.TEXTURE_2D,0,xe,We,it,de,H,fe,S.data)}E.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,te),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ne),t.pixelStorei(i.UNPACK_SKIP_ROWS,ye)}}function oe(E,S,H){let fe=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(fe=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(fe=i.TEXTURE_3D);let re=Y(E,S),_e=S.source;t.bindTexture(fe,E.__webglTexture,i.TEXTURE0+H);let be=n.get(_e);if(_e.version!==be.__version||re===!0){if(t.activeTexture(i.TEXTURE0+H),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let de=et.getPrimaries(et.workingColorSpace),Xe=S.colorSpace===Bi?null:et.getPrimaries(S.colorSpace),nt=S.colorSpace===Bi||de===Xe?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt)}t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment);let ne=w(S.image,!1,s.maxTextureSize);ne=Be(S,ne);let ye=r.convert(S.format,S.colorSpace),L=r.convert(S.type),ie=b(S.internalFormat,ye,L,S.normalized,S.colorSpace,S.isVideoTexture);j(fe,S);let Q,ve=S.mipmaps,me=S.isVideoTexture!==!0,xe=be.__version===void 0||re===!0,We=_e.dataReady,it=y(S,ne);if(S.isDepthTexture)ie=p(S.format===Oi,S.type),xe&&(me?t.texStorage2D(i.TEXTURE_2D,1,ie,ne.width,ne.height):t.texImage2D(i.TEXTURE_2D,0,ie,ne.width,ne.height,0,ye,L,null));else if(S.isDataTexture)if(ve.length>0){me&&xe&&t.texStorage2D(i.TEXTURE_2D,it,ie,ve[0].width,ve[0].height);for(let de=0,Xe=ve.length;de<Xe;de++)Q=ve[de],me?We&&t.texSubImage2D(i.TEXTURE_2D,de,0,0,Q.width,Q.height,ye,L,Q.data):t.texImage2D(i.TEXTURE_2D,de,ie,Q.width,Q.height,0,ye,L,Q.data);S.generateMipmaps=!1}else me?(xe&&t.texStorage2D(i.TEXTURE_2D,it,ie,ne.width,ne.height),We&&he(S,ne,ye,L)):t.texImage2D(i.TEXTURE_2D,0,ie,ne.width,ne.height,0,ye,L,ne.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){me&&xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,it,ie,ve[0].width,ve[0].height,ne.depth);for(let de=0,Xe=ve.length;de<Xe;de++)if(Q=ve[de],S.format!==Vn)if(ye!==null)if(me){if(We)if(S.layerUpdates.size>0){let nt=Vh(Q.width,Q.height,S.format,S.type);for(let Ae of S.layerUpdates){let Mt=Q.data.subarray(Ae*nt/Q.data.BYTES_PER_ELEMENT,(Ae+1)*nt/Q.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,Ae,Q.width,Q.height,1,ye,Mt)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,0,Q.width,Q.height,ne.depth,ye,Q.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,de,ie,Q.width,Q.height,ne.depth,0,Q.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else me?We&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,de,0,0,0,Q.width,Q.height,ne.depth,ye,L,Q.data):t.texImage3D(i.TEXTURE_2D_ARRAY,de,ie,Q.width,Q.height,ne.depth,0,ye,L,Q.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{me&&xe&&t.texStorage2D(i.TEXTURE_2D,it,ie,ve[0].width,ve[0].height);for(let de=0,Xe=ve.length;de<Xe;de++)Q=ve[de],S.format!==Vn?ye!==null?me?We&&t.compressedTexSubImage2D(i.TEXTURE_2D,de,0,0,Q.width,Q.height,ye,Q.data):t.compressedTexImage2D(i.TEXTURE_2D,de,ie,Q.width,Q.height,0,Q.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):me?We&&t.texSubImage2D(i.TEXTURE_2D,de,0,0,Q.width,Q.height,ye,L,Q.data):t.texImage2D(i.TEXTURE_2D,de,ie,Q.width,Q.height,0,ye,L,Q.data)}else if(S.isDataArrayTexture)if(me){if(xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,it,ie,ne.width,ne.height,ne.depth),We)if(S.layerUpdates.size>0){let de=Vh(ne.width,ne.height,S.format,S.type);for(let Xe of S.layerUpdates){let nt=ne.data.subarray(Xe*de/ne.data.BYTES_PER_ELEMENT,(Xe+1)*de/ne.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Xe,ne.width,ne.height,1,ye,L,nt)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,ye,L,ne.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ie,ne.width,ne.height,ne.depth,0,ye,L,ne.data);else if(S.isData3DTexture)me?(xe&&t.texStorage3D(i.TEXTURE_3D,it,ie,ne.width,ne.height,ne.depth),We&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,ye,L,ne.data)):t.texImage3D(i.TEXTURE_3D,0,ie,ne.width,ne.height,ne.depth,0,ye,L,ne.data);else if(S.isFramebufferTexture){if(xe)if(me)t.texStorage2D(i.TEXTURE_2D,it,ie,ne.width,ne.height);else{let de=ne.width,Xe=ne.height;for(let nt=0;nt<it;nt++)t.texImage2D(i.TEXTURE_2D,nt,ie,de,Xe,0,ye,L,null),de>>=1,Xe>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in i){let de=i.canvas;if(de.hasAttribute("layoutsubtree")||de.setAttribute("layoutsubtree","true"),ne.parentNode!==de){de.appendChild(ne),u.add(S),de.onpaint=Xe=>{let nt=Xe.changedElements;for(let Ae of u)nt.includes(Ae.image)&&(Ae.needsUpdate=!0)},de.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ne);else{let nt=i.RGBA,Ae=i.RGBA,Mt=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,nt,Ae,Mt,ne)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ve.length>0){if(me&&xe){let de=ke(ve[0]);t.texStorage2D(i.TEXTURE_2D,it,ie,de.width,de.height)}for(let de=0,Xe=ve.length;de<Xe;de++)Q=ve[de],me?We&&t.texSubImage2D(i.TEXTURE_2D,de,0,0,ye,L,Q):t.texImage2D(i.TEXTURE_2D,de,ie,ye,L,Q);S.generateMipmaps=!1}else if(me){if(xe){let de=ke(ne);t.texStorage2D(i.TEXTURE_2D,it,ie,de.width,de.height)}We&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ye,L,ne)}else t.texImage2D(i.TEXTURE_2D,0,ie,ye,L,ne);M(S)&&S.mipmapsAutoUpdate===!0&&v(fe),be.__version=_e.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function ue(E,S,H){if(S.image.length!==6)return;let fe=Y(E,S),re=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+H);let _e=n.get(re);if(re.version!==_e.__version||fe===!0){t.activeTexture(i.TEXTURE0+H);let be=et.getPrimaries(et.workingColorSpace),te=S.colorSpace===Bi?null:et.getPrimaries(S.colorSpace),ne=S.colorSpace===Bi||be===te?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);let ye=S.isCompressedTexture||S.image[0].isCompressedTexture,L=S.image[0]&&S.image[0].isDataTexture,ie=[];for(let Ae=0;Ae<6;Ae++)!ye&&!L?ie[Ae]=w(S.image[Ae],!0,s.maxCubemapSize):ie[Ae]=L?S.image[Ae].image:S.image[Ae],ie[Ae]=Be(S,ie[Ae]);let Q=ie[0],ve=r.convert(S.format,S.colorSpace),me=r.convert(S.type),xe=b(S.internalFormat,ve,me,S.normalized,S.colorSpace),We=S.isVideoTexture!==!0,it=_e.__version===void 0||fe===!0,de=re.dataReady,Xe=y(S,Q);j(i.TEXTURE_CUBE_MAP,S);let nt;if(S.isDepthTexture){if(xe=p(S.format===Oi,S.type),it)if(We)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,xe,Q.width,Q.height);else for(let Ae=0;Ae<6;Ae++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,xe,Q.width,Q.height,0,ve,me,null)}else if(ye){We&&it&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Xe,xe,Q.width,Q.height);for(let Ae=0;Ae<6;Ae++){nt=ie[Ae].mipmaps;for(let Mt=0;Mt<nt.length;Mt++){let Vt=nt[Mt];S.format!==Vn?ve!==null?We?de&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt,0,0,Vt.width,Vt.height,ve,Vt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt,xe,Vt.width,Vt.height,0,Vt.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):We?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt,0,0,Vt.width,Vt.height,ve,me,Vt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt,xe,Vt.width,Vt.height,0,ve,me,Vt.data)}}}else{if(nt=S.mipmaps,We&&it){nt.length>0&&Xe++;let Ae=ke(ie[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Xe,xe,Ae.width,Ae.height)}for(let Ae=0;Ae<6;Ae++)if(L){We?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,ie[Ae].width,ie[Ae].height,ve,me,ie[Ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,xe,ie[Ae].width,ie[Ae].height,0,ve,me,ie[Ae].data);for(let Mt=0;Mt<nt.length;Mt++){let Wi=nt[Mt].image[Ae].image;We?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt+1,0,0,Wi.width,Wi.height,ve,me,Wi.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt+1,xe,Wi.width,Wi.height,0,ve,me,Wi.data)}}else{We?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,ve,me,ie[Ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,xe,ve,me,ie[Ae]);for(let Mt=0;Mt<nt.length;Mt++){let Vt=nt[Mt];We?de&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt+1,0,0,ve,me,Vt.image[Ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,Mt+1,xe,ve,me,Vt.image[Ae])}}}M(S)&&S.mipmapsAutoUpdate===!0&&v(i.TEXTURE_CUBE_MAP),_e.__version=re.version,S.onUpdate&&S.onUpdate(S)}E.__version=S.version}function Re(E,S,H,fe,re,_e){let be=r.convert(H.format,H.colorSpace),te=r.convert(H.type),ne=b(H.internalFormat,be,te,H.normalized,H.colorSpace),ye=n.get(S),L=n.get(H);if(L.__renderTarget=S,!ye.__hasExternalTextures){let ie=Math.max(1,S.width>>_e),Q=Math.max(1,S.height>>_e);re===i.TEXTURE_3D||re===i.TEXTURE_2D_ARRAY?t.texImage3D(re,_e,ne,ie,Q,S.depth,0,be,te,null):t.texImage2D(re,_e,ne,ie,Q,0,be,te,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),ge(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,fe,re,L.__webglTexture,0,Ye(S)):(re===i.TEXTURE_2D||re>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,fe,re,L.__webglTexture,_e),t.bindFramebuffer(i.FRAMEBUFFER,null)}function pe(E,S,H){if(i.bindRenderbuffer(i.RENDERBUFFER,E),S.depthBuffer){let fe=S.depthTexture,re=fe&&fe.isDepthTexture?fe.type:null,_e=p(S.stencilBuffer,re),be=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;ge(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ye(S),_e,S.width,S.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye(S),_e,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,_e,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,be,i.RENDERBUFFER,E)}else{let fe=S.textures;for(let re=0;re<fe.length;re++){let _e=fe[re],be=r.convert(_e.format,_e.colorSpace),te=r.convert(_e.type),ne=b(_e.internalFormat,be,te,_e.normalized,_e.colorSpace);ge(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ye(S),ne,S.width,S.height):H?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ye(S),ne,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,ne,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function $e(E,S,H){let fe=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,E),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let re=n.get(S.depthTexture);re.__renderTarget=S;let _e=fe?S.depthTexture.image[0]:S.depthTexture.image;(!re.__webglTexture||_e.width!==S.width||_e.height!==S.height)&&(_e.width=S.width,_e.height=S.height,S.depthTexture.needsUpdate=!0),fe?D(S.depthTexture,0):Me(S.depthTexture,0);let be=re.__webglTexture,te=Ye(S),ne=fe?i.TEXTURE_CUBE_MAP_POSITIVE_X+H:i.TEXTURE_2D,ye=S.depthTexture.format===Oi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ri)ge(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,ne,be,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,ye,ne,be,0);else if(S.depthTexture.format===Oi)ge(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ye,ne,be,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,ye,ne,be,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function tt(E){let S=n.get(E),H=E.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==E.depthTexture){let fe=E.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),fe){let re=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,fe.removeEventListener("dispose",re)};fe.addEventListener("dispose",re),S.__depthDisposeCallback=re}S.__boundDepthTexture=fe}if(E.depthTexture&&!S.__autoAllocateDepthBuffer)if(H)for(let fe=0;fe<6;fe++)$e(S.__webglFramebuffer[fe],E,fe);else E.texture.mipmaps.length>0?$e(S.__webglFramebuffer[0],E,0):$e(S.__webglFramebuffer,E,0);else if(H){S.__webglDepthbuffer=[];for(let fe=0;fe<6;fe++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[fe]),S.__webglDepthbuffer[fe]===void 0)S.__webglDepthbuffer[fe]=i.createRenderbuffer(),pe(S.__webglDepthbuffer[fe],E,!1);else{let re=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=S.__webglDepthbuffer[fe];i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,_e)}}else if(E.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),pe(S.__webglDepthbuffer,E,!1);else{let re=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_e),i.framebufferRenderbuffer(i.FRAMEBUFFER,re,i.RENDERBUFFER,_e)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function ut(E,S,H){let fe=n.get(E);S!==void 0&&Re(fe.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),H!==void 0&&tt(E)}function mt(E){let S=E.texture,H=n.get(E),fe=n.get(S);E.addEventListener("dispose",F),I(E);let re=E.textures,_e=E.isWebGLCubeRenderTarget===!0,be=re.length>1;if(be||(fe.__webglTexture===void 0&&(fe.__webglTexture=i.createTexture()),fe.__version=S.version,o.memory.textures++),_e){H.__webglFramebuffer=[];for(let te=0;te<6;te++)if(S.mipmaps.length>0){H.__webglFramebuffer[te]=[];for(let ne=0;ne<S.mipmaps.length;ne++)H.__webglFramebuffer[te][ne]=i.createFramebuffer()}else H.__webglFramebuffer[te]=i.createFramebuffer()}else{if(S.mipmaps.length>0){H.__webglFramebuffer=[];for(let te=0;te<S.mipmaps.length;te++)H.__webglFramebuffer[te]=i.createFramebuffer()}else H.__webglFramebuffer=i.createFramebuffer();if(be)for(let te=0,ne=re.length;te<ne;te++){let ye=n.get(re[te]);ye.__webglTexture===void 0&&(ye.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&ge(E)===!1){H.__webglMultisampledFramebuffer=i.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let te=0;te<re.length;te++){let ne=re[te];H.__webglColorRenderbuffer[te]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,H.__webglColorRenderbuffer[te]);let ye=r.convert(ne.format,ne.colorSpace),L=r.convert(ne.type),ie=b(ne.internalFormat,ye,L,ne.normalized,ne.colorSpace,E.isXRRenderTarget===!0),Q=Ye(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,ie,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+te,i.RENDERBUFFER,H.__webglColorRenderbuffer[te])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(H.__webglDepthRenderbuffer=i.createRenderbuffer(),pe(H.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(_e){t.bindTexture(i.TEXTURE_CUBE_MAP,fe.__webglTexture),j(i.TEXTURE_CUBE_MAP,S);for(let te=0;te<6;te++)if(S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)Re(H.__webglFramebuffer[te][ne],E,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,ne);else Re(H.__webglFramebuffer[te],E,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+te,0);M(S)?v(i.TEXTURE_CUBE_MAP):S.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}else if(be){for(let te=0,ne=re.length;te<ne;te++){let ye=re[te],L=n.get(ye),ie=i.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,L.__webglTexture),j(ie,ye),Re(H.__webglFramebuffer,E,ye,i.COLOR_ATTACHMENT0+te,ie,0),M(ye)&&v(ie)}t.unbindTexture()}else{let te=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(te=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(te,fe.__webglTexture),j(te,S),S.mipmaps.length>0)for(let ne=0;ne<S.mipmaps.length;ne++)Re(H.__webglFramebuffer[ne],E,S,i.COLOR_ATTACHMENT0,te,ne);else Re(H.__webglFramebuffer,E,S,i.COLOR_ATTACHMENT0,te,0);M(S)?v(te):S.mipmaps.length>0&&i.texParameteri(te,i.TEXTURE_MAX_LEVEL,S.mipmaps.length-1),t.unbindTexture()}E.depthBuffer&&tt(E)}function U(E){let S=E.textures;for(let H=0,fe=S.length;H<fe;H++){let re=S[H];if(M(re)&&re.mipmapsAutoUpdate===!0){let _e=A(E),be=n.get(re).__webglTexture;t.bindTexture(_e,be),v(_e),t.unbindTexture()}}}let Ce=[];function De(E){if(E.samples>0){if(ge(E)===!1){let S=E.textures,H=E.width,fe=E.height,re=i.COLOR_BUFFER_BIT,_e=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,be=n.get(E),te=S.length>1;if(te)for(let ye=0;ye<S.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer),E.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ye=0;ye<S.length;ye++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(re|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(re|=i.STENCIL_BUFFER_BIT)),te){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);let L=n.get(S[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,L,0)}i.blitFramebuffer(0,0,H,fe,0,0,H,fe,re,i.NEAREST),l===!0&&(Ce.length=0,Ce.push(i.COLOR_ATTACHMENT0+ye),E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&Ce.push(_e),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ce))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),te)for(let ye=0;ye<S.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,be.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,be.__webglColorRenderbuffer[ye]);let L=n.get(S[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,be.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,L,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.storeMultisampledDepthBuffer===!1&&l){let S=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function Ye(E){return Math.min(s.maxSamples,E.samples)}function ge(E){let S=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function gt(E){let S=o.render.frame;h.get(E)!==S&&(h.set(E,S),E.update())}function Be(E,S){let H=E.colorSpace,fe=E.format,re=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||H!==pn&&H!==Bi&&(et.getTransfer(H)===vt?(fe!==Vn||re!==Sn)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ze("WebGLTextures: Unsupported texture color space:",H)),S}function ke(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=Ue,this.resetTextureUnits=se,this.getTextureUnits=le,this.setTextureUnits=Le,this.setTexture2D=Me,this.setTexture2DArray=Pe,this.setTexture3D=Ve,this.setTextureCube=D,this.rebindTextures=ut,this.setupRenderTarget=mt,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=ge,this.dispose=W}function Vv(i,e){function t(n,s=Bi){let r,o=et.getTransfer(s);if(n===Sn)return i.UNSIGNED_BYTE;if(n===al)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ll)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ah)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Eh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Th)return i.BYTE;if(n===wh)return i.SHORT;if(n===Rr)return i.UNSIGNED_SHORT;if(n===ol)return i.INT;if(n===ni)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===ii)return i.HALF_FLOAT;if(n===Rh)return i.ALPHA;if(n===Ch)return i.RGB;if(n===Vn)return i.RGBA;if(n===Ri)return i.DEPTH_COMPONENT;if(n===Oi)return i.DEPTH_STENCIL;if(n===cl)return i.RED;if(n===hl)return i.RED_INTEGER;if(n===ss)return i.RG;if(n===ul)return i.RG_INTEGER;if(n===fl)return i.RGBA_INTEGER;if(n===No||n===Uo||n===Fo||n===Oo)if(o===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===No)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===No)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Fo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===dl||n===pl||n===ml||n===gl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===dl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ml)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===gl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===_l||n===xl||n===yl||n===vl||n===Ml||n===Bo||n===Sl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===_l||n===xl)return o===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===vl)return r.COMPRESSED_R11_EAC;if(n===Ml)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Bo)return r.COMPRESSED_RG11_EAC;if(n===Sl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===bl||n===Tl||n===wl||n===Al||n===El||n===Rl||n===Cl||n===Il||n===Pl||n===Ll||n===Dl||n===Nl||n===Ul||n===Fl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===bl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Tl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===wl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Al)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===El)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Rl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Cl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Il)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Pl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ll)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Dl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Nl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ul)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fl)return o===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ol||n===Bl||n===zl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ol)return o===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Bl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===zl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===kl||n===Gl||n===zo||n===Hl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===kl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Gl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===zo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Hl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}function Yv(i,e){function t(_,m){_.matrixAutoUpdate===!0&&_.updateMatrix(),m.value.copy(_.matrix)}function n(_,m){m.color.getRGB(_.fogColor.value,kh(i)),m.isFog?(_.fogNear.value=m.near,_.fogFar.value=m.far):m.isFogExp2&&(_.fogDensity.value=m.density)}function s(_,m,w,M,v){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(_,m):m.isMeshLambertMaterial?(r(_,m),m.envMap&&(_.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(_,m),u(_,m)):m.isMeshPhongMaterial?(r(_,m),h(_,m),m.envMap&&(_.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(_,m),f(_,m),m.isMeshPhysicalMaterial&&d(_,m,v)):m.isMeshMatcapMaterial?(r(_,m),g(_,m)):m.isMeshDepthMaterial?r(_,m):m.isMeshDistanceMaterial?(r(_,m),x(_,m)):m.isMeshNormalMaterial?r(_,m):m.isLineBasicMaterial?(o(_,m),m.isLineDashedMaterial&&a(_,m)):m.isPointsMaterial?l(_,m,w,M):m.isSpriteMaterial?c(_,m):m.isShadowMaterial?(_.color.value.copy(m.color),_.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(_,m){_.opacity.value=m.opacity,m.color&&_.diffuse.value.copy(m.color),m.emissive&&_.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.bumpMap&&(_.bumpMap.value=m.bumpMap,t(m.bumpMap,_.bumpMapTransform),_.bumpScale.value=m.bumpScale,m.side===$t&&(_.bumpScale.value*=-1)),m.normalMap&&(_.normalMap.value=m.normalMap,t(m.normalMap,_.normalMapTransform),_.normalScale.value.copy(m.normalScale),m.side===$t&&_.normalScale.value.negate()),m.displacementMap&&(_.displacementMap.value=m.displacementMap,t(m.displacementMap,_.displacementMapTransform),_.displacementScale.value=m.displacementScale,_.displacementBias.value=m.displacementBias),m.emissiveMap&&(_.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,_.emissiveMapTransform)),m.specularMap&&(_.specularMap.value=m.specularMap,t(m.specularMap,_.specularMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest);let w=e.get(m),M=w.envMap,v=w.envMapRotation;M&&(_.envMap.value=M,_.envMapRotation.value.setFromMatrix4(qv.makeRotationFromEuler(v)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(Cp),_.reflectivity.value=m.reflectivity,_.ior.value=m.ior,_.refractionRatio.value=m.refractionRatio),m.lightMap&&(_.lightMap.value=m.lightMap,_.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,_.lightMapTransform)),m.aoMap&&(_.aoMap.value=m.aoMap,_.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,_.aoMapTransform))}function o(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform))}function a(_,m){_.dashSize.value=m.dashSize,_.totalSize.value=m.dashSize+m.gapSize,_.scale.value=m.scale}function l(_,m,w,M){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.size.value=m.size*w,_.scale.value=M*.5,m.map&&(_.map.value=m.map,t(m.map,_.uvTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function c(_,m){_.diffuse.value.copy(m.color),_.opacity.value=m.opacity,_.rotation.value=m.rotation,m.map&&(_.map.value=m.map,t(m.map,_.mapTransform)),m.alphaMap&&(_.alphaMap.value=m.alphaMap,t(m.alphaMap,_.alphaMapTransform)),m.alphaTest>0&&(_.alphaTest.value=m.alphaTest)}function h(_,m){_.specular.value.copy(m.specular),_.shininess.value=Math.max(m.shininess,1e-4)}function u(_,m){m.gradientMap&&(_.gradientMap.value=m.gradientMap)}function f(_,m){_.metalness.value=m.metalness,m.metalnessMap&&(_.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,_.metalnessMapTransform)),_.roughness.value=m.roughness,m.roughnessMap&&(_.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,_.roughnessMapTransform)),m.envMap&&(_.envMapIntensity.value=m.envMapIntensity)}function d(_,m,w){_.ior.value=m.ior,m.diffuseRoughness>0&&(_.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(_.diffuseRoughnessMap.value=m.diffuseRoughnessMap,t(m.diffuseRoughnessMap,_.diffuseRoughnessMapTransform))),m.sheen>0&&(_.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),_.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(_.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,_.sheenColorMapTransform)),m.sheenRoughnessMap&&(_.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,_.sheenRoughnessMapTransform))),m.clearcoat>0&&(_.clearcoat.value=m.clearcoat,_.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(_.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,_.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(_.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===$t&&_.clearcoatNormalScale.value.negate())),m.dispersion>0&&(_.dispersion.value=m.dispersion),m.retroreflectivity>0&&(_.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(_.iridescence.value=m.iridescence,_.iridescenceIOR.value=m.iridescenceIOR,_.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,_.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(_.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,_.iridescenceMapTransform)),m.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),m.transmission>0&&(_.transmission.value=m.transmission,_.transmissionSamplerMap.value=w.texture,_.transmissionSamplerSize.value.set(w.width,w.height),m.transmissionMap&&(_.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,_.transmissionMapTransform)),_.thickness.value=m.thickness,m.thicknessMap&&(_.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=m.attenuationDistance,_.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(_.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(_.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=m.specularIntensity,_.specularColor.value.copy(m.specularColor),m.specularColorMap&&(_.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,_.specularColorMapTransform)),m.specularIntensityMap&&(_.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,m){m.matcap&&(_.matcap.value=m.matcap)}function x(_,m){let w=e.get(m).light;_.referencePosition.value.setFromMatrixPosition(w.matrixWorld),_.nearDistance.value=w.shadow.camera.near,_.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Zv(i,e,t,n){let s={},r={};function o(w,M){let v=M.program;n.uniformBlockBinding(w,v,s[w.id])}function a(w,M){let v=s[w.id];v===void 0&&(g(w),v=l(w),s[w.id]=v,w.addEventListener("dispose",_));let A=M.program;n.updateUBOMapping(w,A);let b=e.render.frame;r[w.id]!==b&&(c(w),r[w.id]=b)}function l(w){let M=i.createBuffer(),v=w.__size,A=w.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,v,A),i.bindBuffer(i.UNIFORM_BUFFER,null),M}function c(w){let M=s[w.id],v=w.uniforms,A=w.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let b=0,p=v.length;b<p;b++){let y=v[b];if(Array.isArray(y))for(let I=0,R=y.length;I<R;I++)h(y[I],b,I,A);else h(y,b,0,A)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(w,M,v,A){if(f(w,M,v,A)===!0){let b=w.__offset,p=w.value;if(Array.isArray(p)){let y=0;for(let I=0;I<p.length;I++){let R=p[I],P=x(R,!0);u(R,w.__data,y),y+=P.storage/Float32Array.BYTES_PER_ELEMENT}}else u(p,w.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,b,w.__data)}}function u(w,M,v){typeof w=="number"||typeof w=="boolean"?M[v]=w:w.isMatrix3?(M[v]=w.elements[0],M[v+1]=w.elements[1],M[v+2]=w.elements[2],M[v+3]=0,M[v+4]=w.elements[3],M[v+5]=w.elements[4],M[v+6]=w.elements[5],M[v+7]=0,M[v+8]=w.elements[6],M[v+9]=w.elements[7],M[v+10]=w.elements[8],M[v+11]=0):ArrayBuffer.isView(w)?M.set(w.subarray(0,M.length-v),v):w.toArray(M,v)}function f(w,M,v,A){let b=w.value,p=M+"_"+v;if(Array.isArray(b)){A[p]===void 0&&(A[p]=[]);let y=A[p],I=!1;for(let R=0;R<b.length;R++)d(b[R],y,R)===!0&&(I=!0);return I}return d(b,A,p)}function d(w,M,v){if(M[v]===void 0)return typeof w=="number"||typeof w=="boolean"?M[v]=w:ArrayBuffer.isView(w)?M[v]=w.slice():M[v]=w.clone(),!0;{let A=M[v];if(typeof w=="number"||typeof w=="boolean"){if(A!==w)return M[v]=w,!0}else{if(ArrayBuffer.isView(w))return!0;if(A.equals(w)===!1)return A.copy(w),!0}}return!1}function g(w){let M=w.uniforms,v=0,A=16;for(let p=0,y=M.length;p<y;p++){let I=Array.isArray(M[p])?M[p]:[M[p]];for(let R=0,P=I.length;R<P;R++){let F=I[R],z=Array.isArray(F.value)?F.value:[F.value],C=Array.isArray(M[p])||Array.isArray(F.value),W=v;for(let q=0,ae=z.length;q<ae;q++){let Z=z[q],se=x(Z,C),le=v%A,Le=le%se.boundary,Ue=le+Le;v+=Le,Ue!==0&&A-Ue<se.storage&&(v+=A-Ue),q===0&&(W=v),v+=se.storage}let X=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new X((v-W)/Float32Array.BYTES_PER_ELEMENT),F.__offset=W}}let b=v%A;return b>0&&(v+=A-b),w.__size=v,w.__cache={},this}function x(w,M){let v={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(v.boundary=4,v.storage=4):w.isVector2?(v.boundary=8,v.storage=8):w.isVector3||w.isColor?(v.boundary=16,v.storage=12):w.isVector4?(v.boundary=16,v.storage=16):w.isMatrix3?(v.boundary=16,v.storage=48):w.isMatrix4?(v.boundary=16,v.storage=64):w.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(w)?(v.boundary=16,v.storage=w.byteLength):He("WebGLRenderer: Unsupported uniform value type.",w),M===!0&&(v.boundary=16,v.storage=Math.ceil(v.storage/16)*16),v}function _(w){let M=w.target;M.removeEventListener("dispose",_),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function m(){for(let w in s)i.deleteBuffer(s[w]);s={},r={}}return{bind:o,update:a,dispose:m}}function jv(){return pi===null&&(pi=new yr(Kv,16,16,ss,ii),pi.name="DFG_LUT",pi.minFilter=Ct,pi.magFilter=Ct,pi.wrapS=fn,pi.wrapT=fn,pi.generateMipmaps=!1,pi.needsUpdate=!0),pi}var d0,p0,m0,g0,_0,x0,y0,v0,M0,S0,b0,T0,w0,A0,E0,R0,C0,I0,P0,L0,D0,N0,U0,F0,O0,B0,z0,k0,G0,H0,V0,W0,X0,q0,Y0,Z0,K0,j0,$0,J0,Q0,e_,t_,n_,i_,s_,r_,o_,a_,l_,c_,h_,u_,f_,d_,p_,m_,g_,__,x_,y_,v_,M_,S_,b_,T_,w_,A_,E_,R_,C_,I_,P_,L_,D_,N_,U_,F_,O_,B_,z_,k_,G_,H_,V_,W_,X_,q_,Y_,Z_,K_,j_,$_,J_,Q_,ex,tx,nx,ix,sx,rx,ox,ax,lx,cx,hx,ux,fx,dx,px,mx,gx,_x,xx,yx,vx,Mx,Sx,bx,Tx,wx,Ax,Ex,Rx,Cx,Ix,Px,Lx,Dx,Nx,Ux,Fx,Ox,Bx,zx,kx,Gx,Hx,Vx,Wx,Xx,st,Ee,mi,ql,qx,vp,Vo,Jd,Jx,Qx,Mp,Sp,ey,ty,ny,Lr,dy,bp,Tp,wp,Ap,Ep,Rp,np,ip,sp,rp,op,Yh,Zh,Kh,Xh,Pr,nv,iv,cp,av,Yl,dv,mv,_v,yv,Mv,Tv,$h,Jh,Lv,Fv,Ov,Bv,zv,xp,Go,qh,Wv,Xv,Qh,eu,qv,Cp,Kv,pi,Zl,Wn=hn(()=>{Wh();Wh();d0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,p0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,m0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,g0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,x0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,y0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,v0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,M0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,S0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,b0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,T0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,w0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,A0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,E0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,R0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,C0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,I0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,P0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,L0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,D0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,N0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,U0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,F0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,O0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,B0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,z0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,k0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,G0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,H0="gl_FragColor = linearToOutputTexel( gl_FragColor );",V0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,W0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,X0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,q0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Y0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Z0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,K0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,j0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,J0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Q0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,e_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,t_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,n_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,i_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,s_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,r_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,o_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,a_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,l_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,c_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,h_=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,u_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,f_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,d_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,p_=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,m_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,g_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,__=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,y_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,v_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,S_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,b_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,A_=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,E_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,C_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,P_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,L_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,U_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,F_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,O_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,B_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,z_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,k_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,H_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,V_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,W_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,X_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,q_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Z_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,K_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,j_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,$_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,J_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Q_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ex=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,nx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ix=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ox=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ax=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,lx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ux=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,fx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,px=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mx=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_x=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,yx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,vx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Mx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ax=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ex=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Cx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Px=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Dx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Nx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ux=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Ox=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Gx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Wx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Xx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,st={alphahash_fragment:d0,alphahash_pars_fragment:p0,alphamap_fragment:m0,alphamap_pars_fragment:g0,alphatest_fragment:_0,alphatest_pars_fragment:x0,aomap_fragment:y0,aomap_pars_fragment:v0,batching_pars_vertex:M0,batching_vertex:S0,begin_vertex:b0,beginnormal_vertex:T0,bsdfs:w0,iridescence_fragment:A0,bumpmap_pars_fragment:E0,clipping_planes_fragment:R0,clipping_planes_pars_fragment:C0,clipping_planes_pars_vertex:I0,clipping_planes_vertex:P0,color_fragment:L0,color_pars_fragment:D0,color_pars_vertex:N0,color_vertex:U0,common:F0,defaultnormal_vertex:O0,displacementmap_pars_vertex:B0,displacementmap_vertex:z0,emissivemap_fragment:k0,emissivemap_pars_fragment:G0,colorspace_fragment:H0,colorspace_pars_fragment:V0,envmap_fragment:W0,envmap_common_pars_fragment:X0,envmap_pars_fragment:q0,envmap_pars_vertex:Y0,envmap_physical_pars_fragment:s_,envmap_vertex:Z0,fog_vertex:K0,fog_pars_vertex:j0,fog_fragment:$0,fog_pars_fragment:J0,gradientmap_pars_fragment:Q0,lightmap_pars_fragment:e_,lights_lambert_fragment:t_,lights_lambert_pars_fragment:n_,lights_pars_begin:i_,lights_toon_fragment:r_,lights_toon_pars_fragment:o_,lights_phong_fragment:a_,lights_phong_pars_fragment:l_,lights_physical_fragment:c_,lights_physical_pars_fragment:h_,lights_fragment_begin:u_,lights_fragment_maps:f_,lights_fragment_end:d_,lightprobes_pars_fragment:p_,logdepthbuf_fragment:m_,logdepthbuf_pars_fragment:g_,logdepthbuf_pars_vertex:__,logdepthbuf_vertex:x_,map_fragment:y_,map_pars_fragment:v_,map_particle_fragment:M_,map_particle_pars_fragment:S_,metalnessmap_fragment:b_,metalnessmap_pars_fragment:T_,morphinstance_vertex:w_,morphcolor_vertex:A_,morphnormal_vertex:E_,morphtarget_pars_vertex:R_,morphtarget_vertex:C_,normal_fragment_begin:I_,normal_fragment_maps:P_,normal_pars_fragment:L_,normal_pars_vertex:D_,normal_vertex:N_,normalmap_pars_fragment:U_,clearcoat_normal_fragment_begin:F_,clearcoat_normal_fragment_maps:O_,clearcoat_pars_fragment:B_,iridescence_pars_fragment:z_,opaque_fragment:k_,packing:G_,premultiplied_alpha_fragment:H_,project_vertex:V_,dithering_fragment:W_,dithering_pars_fragment:X_,roughnessmap_fragment:q_,roughnessmap_pars_fragment:Y_,shadowmap_pars_fragment:Z_,shadowmap_pars_vertex:K_,shadowmap_vertex:j_,shadowmask_pars_fragment:$_,skinbase_vertex:J_,skinning_pars_vertex:Q_,skinning_vertex:ex,skinnormal_vertex:tx,specularmap_fragment:nx,specularmap_pars_fragment:ix,tonemapping_fragment:sx,tonemapping_pars_fragment:rx,transmission_fragment:ox,transmission_pars_fragment:ax,uv_pars_fragment:lx,uv_pars_vertex:cx,uv_vertex:hx,worldpos_vertex:ux,background_vert:fx,background_frag:dx,backgroundCube_vert:px,backgroundCube_frag:mx,cube_vert:gx,cube_frag:_x,depth_vert:xx,depth_frag:yx,distance_vert:vx,distance_frag:Mx,equirect_vert:Sx,equirect_frag:bx,linedashed_vert:Tx,linedashed_frag:wx,meshbasic_vert:Ax,meshbasic_frag:Ex,meshlambert_vert:Rx,meshlambert_frag:Cx,meshmatcap_vert:Ix,meshmatcap_frag:Px,meshnormal_vert:Lx,meshnormal_frag:Dx,meshphong_vert:Nx,meshphong_frag:Ux,meshphysical_vert:Fx,meshphysical_frag:Ox,meshtoon_vert:Bx,meshtoon_frag:zx,points_vert:kx,points_frag:Gx,shadow_vert:Hx,shadow_frag:Vx,sprite_vert:Wx,sprite_frag:Xx},Ee={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},mi={basic:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:rn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:rn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:rn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new we(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:rn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:rn([Ee.points,Ee.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:rn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:rn([Ee.common,Ee.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:rn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:rn([Ee.sprite,Ee.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distance:{uniforms:rn([Ee.common,Ee.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distance_vert,fragmentShader:st.distance_frag},shadow:{uniforms:rn([Ee.lights,Ee.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};mi.physical={uniforms:rn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Ke},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};ql={r:0,b:0,g:0},qx=new qe,vp=new Ke;vp.set(-1,0,0,0,1,0,0,0,1);Vo=class extends Cn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new fo(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new es(5,5,5),r=new hi({name:"CubemapFromEquirect",uniforms:ks(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:Us});r.uniforms.tEquirect.value=t;let o=new ht(s,r),a=t.minFilter;return t.minFilter===_n&&(t.minFilter=Ct),new Sr(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}},Jd=256,Jx=3,Qx=20,Mp=256,Sp=16,ey=3,ty=new B,ny=new we,Lr=class i{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Sr(1,10,null),this._boxMesh=new ht(new es(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){let{size:o=256,position:a=ty}=r,l=this._renderer;this._setSize(o);let c=this._allocateTarget(),h=this._getSourceTarget(!0);t>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,f=l.autoClearColor,d=l.autoClearDepth,g=l.autoClearStencil,x=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(e.background=l.getClearColor(ny));let _=new Sr(n,s,h);return _.position.copy(a),_.update(l,e),l.autoClear=u,l.autoClearColor=f,l.autoClearDepth=d,l.autoClearStencil=g,e.background=x,t>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=tp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ep(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(Jd,Oh(e))}_fromTexture(e,t){e.mapping===Os||e.mapping===Ar?this._setSize(e.image.length===0?Jd:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);let n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){let e=this._cubeSize,t=Qd(e,!1,!1),n=Math.log2(e)-Jx;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){let t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Qd(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){let s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;let o=e.width>>t;e.viewport.set(0,0,o,o),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Os||e.mapping===Ar?(this._cubemapMaterial===null&&(this._cubemapMaterial=tp()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=ep()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=iy(),this._integrationMaterial=sy());let t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Sp);for(let o=0;o<=n;o++){let a=i.lodToRoughness(o,n);if(o>n-ey)r.roughness.value=a,this._renderCube(e,o,this._integrationMaterial);else{let l=a>0?Math.log2(t)+.5*Math.log2(6/(Mp*Math.pow(a,4)))+.5:0;s.roughness.value=a,s.lodBias.value=l,this._renderCube(e,o,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=ry());let n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}};dy={[_h]:"LINEAR_TONE_MAPPING",[xh]:"REINHARD_TONE_MAPPING",[yh]:"CINEON_TONE_MAPPING",[vh]:"ACES_FILMIC_TONE_MAPPING",[Sh]:"AGX_TONE_MAPPING",[Do]:"NEUTRAL_TONE_MAPPING",[Mh]:"CUSTOM_TONE_MAPPING"};bp=new qt,Tp=new Pi(1,1),wp=new po(1),Ap=new so,Ep=new Ha,Rp=new fo,np=[],ip=[],sp=new Float32Array(16),rp=new Float32Array(9),op=new Float32Array(4);Yh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ny(t.type)}},Zh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ev(t.type)}},Kh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(e,t[a.id],n)}}},Xh=/(\w+)(\])?(\[|\.)?/g;Pr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){let a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);tv(a,l,this)}let s=[],r=[];for(let o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(o):r.push(o);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){let a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let o=e[s];o.id in t&&n.push(o)}return n}};nv=37297,iv=0;cp=new Ke;av={[_h]:"Linear",[xh]:"Reinhard",[yh]:"Cineon",[vh]:"ACESFilmic",[Sh]:"AgX",[Do]:"Neutral",[Mh]:"Custom"};Yl=new B;dv=/^[ \t]*#include +<([\w\d./]+)>/gm;mv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;_v={[Po]:"SHADOWMAP_TYPE_PCF",[Tr]:"SHADOWMAP_TYPE_VSM"};yv={[Ar]:"ENVMAP_MODE_REFRACTION"};Mv={[Lo]:"ENVMAP_BLENDING_MULTIPLY",[Id]:"ENVMAP_BLENDING_MIX",[Pd]:"ENVMAP_BLENDING_ADD"};Tv=0,$h=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Jh(e),t.set(e,n)),n}},Jh=class{constructor(e){this.id=Tv++,this.code=e,this.usedTimes=0}};Lv=0;Fv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ov=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Bv=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],zv=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],xp=new qe,Go=new B,qh=new B;Wv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Qh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new mo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new hi({vertexShader:Wv,fragmentShader:Xv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ht(new _o(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},eu=class extends kn{constructor(e,t){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,f=null,d=null,g=null,x=typeof XRWebGLBinding<"u",_=new Qh,m={},w=t.getContextAttributes(),M=null,v=null,A=[],b=[],p=new Ge,y=null,I=null,R=new Bt;R.viewport=new St;let P=new Bt;P.viewport=new St;let F=[R,P],z=new el,C=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let Me=A[ee];return Me===void 0&&(Me=new mr,A[ee]=Me),Me.getTargetRaySpace()},this.getControllerGrip=function(ee){let Me=A[ee];return Me===void 0&&(Me=new mr,A[ee]=Me),Me.getGripSpace()},this.getHand=function(ee){let Me=A[ee];return Me===void 0&&(Me=new mr,A[ee]=Me),Me.getHandSpace()};function X(ee){let Me=b.indexOf(ee.inputSource);if(Me===-1)return;let Pe=A[Me];Pe!==void 0&&(Pe.update(ee.inputSource,ee.frame,c||o),Pe.dispatchEvent({type:ee.type,data:ee.inputSource}))}function q(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",ae);for(let ee=0;ee<A.length;ee++){let Me=b[ee];Me!==null&&(b[ee]=null,A[ee].disconnect(Me))}C=null,W=null,_.reset();for(let ee in m)delete m[ee];if(e.setRenderTarget(M),d=null,f=null,u=null,s=null,v=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(p.width,p.height,!1),I!==null){let ee=I.camera;ee.fov=I.fov,ee.zoom=I.zoom,ee.updateProjectionMatrix(),I=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,n.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){a=ee,n.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,t)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(M=e.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",q),s.addEventListener("inputsourceschange",ae),w.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(p),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let Pe=null,Ve=null,D=null;w.depth&&(D=w.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Pe=w.stencil?Oi:Ri,Ve=w.stencil?zs:ni);let N={colorFormat:t.RGBA8,depthFormat:D,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(N),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Cn(f.textureWidth,f.textureHeight,{format:Vn,type:Sn,depthTexture:new Pi(f.textureWidth,f.textureHeight,Ve,void 0,void 0,void 0,void 0,void 0,void 0,Pe),stencilBuffer:w.stencil,colorSpace:e.outputColorSpace,samples:w.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let Pe={antialias:w.antialias,alpha:!0,depth:w.depth,stencil:w.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,t,Pe),s.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new Cn(d.framebufferWidth,d.framebufferHeight,{format:Vn,type:Sn,colorSpace:e.outputColorSpace,stencilBuffer:w.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ue.setContext(s),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ae(ee){for(let Me=0;Me<ee.removed.length;Me++){let Pe=ee.removed[Me],Ve=b.indexOf(Pe);Ve>=0&&(b[Ve]=null,A[Ve].disconnect(Pe))}for(let Me=0;Me<ee.added.length;Me++){let Pe=ee.added[Me],Ve=b.indexOf(Pe);if(Ve===-1){for(let N=0;N<A.length;N++)if(N>=b.length){b.push(Pe),Ve=N;break}else if(b[N]===null){b[N]=Pe,Ve=N;break}if(Ve===-1)break}let D=A[Ve];D&&D.connect(Pe)}}function Z(ee,Me){Me===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(Me.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let Me=ee.near,Pe=ee.far;_.texture!==null&&(_.depthNear>0&&(Me=_.depthNear),_.depthFar>0&&(Pe=_.depthFar)),z.near=P.near=R.near=Me,z.far=P.far=R.far=Pe,(C!==z.near||W!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),C=z.near,W=z.far),z.layers.mask=ee.layers.mask|6,R.layers.mask=z.layers.mask&-5,P.layers.mask=z.layers.mask&-3;let Ve=ee.parent,D=z.cameras;Z(z,Ve);for(let N=0;N<D.length;N++)Z(D[N],Ve);z.projectionMatrix.copy(R.projectionMatrix),z.projectionMatrixInverse.copy(R.projectionMatrixInverse),I===null&&ee.isPerspectiveCamera&&(I={camera:ee,fov:ee.fov,zoom:ee.zoom}),se(ee,z,Ve)};function se(ee,Me,Pe){Pe===null?ee.matrix.copy(Me.matrixWorld):(ee.matrix.copy(Pe.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(Me.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(Me.projectionMatrix),ee.projectionMatrixInverse.copy(Me.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Ts*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function(ee){l=ee,f!==null&&(f.fixedFoveation=ee),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=ee)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(z)},this.getCameraTexture=function(ee){return m[ee]};let le=null;function Le(ee,Me){if(h=Me.getViewerPose(c||o),g=Me,h!==null){let Pe=h.views;d!==null&&(e.setRenderTargetFramebuffer(v,d.framebuffer),e.setRenderTarget(v));let Ve=!1;Pe.length!==z.cameras.length&&(z.cameras.length=0,Ve=!0);for(let G=0;G<Pe.length;G++){let j=Pe[G],Y=null;if(d!==null)Y=d.getViewport(j);else{let he=u.getViewSubImage(f,j);Y=he.viewport,G===0&&(e.setRenderTargetTextures(v,he.colorTexture,he.depthStencilTexture),e.setRenderTarget(v))}let J=F[G];J===void 0&&(J=new Bt,J.layers.enable(G),J.viewport=new St,F[G]=J),J.matrix.fromArray(j.transform.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale),J.projectionMatrix.fromArray(j.projectionMatrix),J.projectionMatrixInverse.copy(J.projectionMatrix).invert(),J.viewport.set(Y.x,Y.y,Y.width,Y.height),G===0&&(z.matrix.copy(J.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Ve===!0&&z.cameras.push(J)}let D=s.enabledFeatures;if(D&&D.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=n.getBinding();let G=u.getDepthInformation(Pe[0]);G&&G.isValid&&G.texture&&_.init(G,s.renderState)}if(D&&D.includes("camera-access")&&x){e.state.unbindTexture(),u=n.getBinding();for(let G=0;G<Pe.length;G++){let j=Pe[G].camera;if(j){let Y=m[j];Y||(Y=new mo,m[j]=Y);let J=u.getCameraImage(j);Y.sourceTexture=J}}}}for(let Pe=0;Pe<A.length;Pe++){let Ve=b[Pe],D=A[Pe];Ve!==null&&D!==void 0&&D.update(Ve,Me,c||o)}le&&le(ee,Me),Me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Me}),g=null}let Ue=new yp;Ue.setAnimationLoop(Le),this.setAnimationLoop=function(ee){le=ee},this.dispose=function(){}}},qv=new qe,Cp=new Ke;Cp.set(-1,0,0,0,1,0,0,0,1);Kv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),pi=null;Zl=class{constructor(e={}){let{canvas:t=Xd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1,outputBufferType:d=Sn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;let x=d,_=new Set([fl,ul,hl]),m=new Set([Sn,ni,Rr,zs,al,ll]),w=new Uint32Array(4),M=new Int32Array(4),v={textures:[],min:[],max:[],resolution:[]},A=null,b=null,p=[],y=[],I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,P=!1,F=null,z=null,C=null,W=null;this._outputColorSpace=dt;let X=0,q=0,ae=null,Z=-1,se=null,le=new St,Le=new St,Ue=null,ee=new we(0),Me=0,Pe=t.width,Ve=t.height,D=1,N=null,$=null,G=new St(0,0,Pe,Ve),j=new St(0,0,Pe,Ve),Y=!1,J=new Qi,he=new Va,oe=!1,ue=!1,Re=new qe,pe=new B,$e=new St,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ut=!1;function mt(){return ae===null?D:1}let U=n;function Ce(T,O){return t.getContext(T,O)}let De,Ye,ge,gt,Be,ke,E,S,H,fe,re,_e,be,te,ne,ye,L,ie,Q,ve,me,xe,We;try{let T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"187"}`),t.addEventListener("webglcontextlost",Xe,!1),t.addEventListener("webglcontextrestored",nt,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),U===null){let O="webgl2";if(U=Ce(O,T),U===null)throw Ce(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}it()}catch(T){throw t.removeEventListener("webglcontextlost",Xe,!1),t.removeEventListener("webglcontextrestored",nt,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),Ze("WebGLRenderer: "+T.message),T}function it(){De=new ay(U),De.init(),me=new Vv(U,De),Ye=new jx(U,De,e,me),ge=new Gv(U,De),Ye.reversedDepthBuffer&&f&&ge.buffers.depth.setReversed(!0),z=U.createFramebuffer(),C=U.createFramebuffer(),W=U.createFramebuffer(),gt=new hy(U),Be=new Ev,ke=new Hv(U,De,ge,Be,Ye,me,gt),E=new oy(R),S=new f0(U),xe=new Zx(U,S),H=new ly(U,S,gt,xe),fe=new fy(U,H,S,xe,gt),ie=new uy(U,Ye,ke),ne=new $x(Be),re=new Av(R,E,De,Ye,xe,ne),_e=new Yv(R,Be),be=new Cv,te=new Uv(De),L=new Yx(R,E,ge,fe,g,l),ye=new kv(R,fe,Ye),We=new Zv(U,gt,Ye,ge),Q=new Kx(U,De,gt),ve=new cy(U,De,gt),gt.programs=re.programs,R.capabilities=Ye,R.extensions=De,R.properties=Be,R.renderLists=be,R.shadowMap=ye,R.state=ge,R.info=gt}x!==Sn&&(I=new py(x,t.width,t.height,a,s,r));let de=new eu(R,U);this.xr=de,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){let T=De.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=De.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return D},this.setPixelRatio=function(T){T!==void 0&&(D=T,this.setSize(Pe,Ve,!1))},this.getSize=function(T){return T.set(Pe,Ve)},this.setSize=function(T,O,K=!0){if(de.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}Pe=T,Ve=O,t.width=Math.floor(T*D),t.height=Math.floor(O*D),K===!0&&(t.style.width=T+"px",t.style.height=O+"px"),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(Pe*D,Ve*D).floor()},this.setDrawingBufferSize=function(T,O,K){Pe=T,Ve=O,D=K,t.width=Math.floor(T*K),t.height=Math.floor(O*K),this.setViewport(0,0,T,O)},this.setEffects=function(T){if(x===Sn){Ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let O=0;O<T.length;O++)if(T[O].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}I.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(le)},this.getViewport=function(T){return T.copy(G)},this.setViewport=function(T,O,K,k){T.isVector4?G.set(T.x,T.y,T.z,T.w):G.set(T,O,K,k),ge.viewport(le.copy(G).multiplyScalar(mt()).round())},this.getScissor=function(T){return T.copy(j)},this.setScissor=function(T,O,K,k){T.isVector4?j.set(T.x,T.y,T.z,T.w):j.set(T,O,K,k),ge.scissor(Le.copy(j).multiplyScalar(mt()).round())},this.getScissorTest=function(){return Y},this.setScissorTest=function(T){ge.setScissorTest(Y=T)},this.setOpaqueSort=function(T){N=T},this.setTransparentSort=function(T){$=T},this.getClearColor=function(T){return T.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(T=!0,O=!0,K=!0){let k=0;if(T){let V=!1;if(ae!==null){let Te=ae.texture.format;V=_.has(Te)}if(V){let Te=ae.texture.type,Ne=m.has(Te),Se=L.getClearColor(),Ie=L.getClearAlpha(),ze=Se.r,Qe=Se.g,lt=Se.b;Ne?(w[0]=ze,w[1]=Qe,w[2]=lt,w[3]=Ie,U.clearBufferuiv(U.COLOR,0,w)):(M[0]=ze,M[1]=Qe,M[2]=lt,M[3]=Ie,U.clearBufferiv(U.COLOR,0,M))}else k|=U.COLOR_BUFFER_BIT}O&&(k|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),F=T},this.dispose=function(){t.removeEventListener("webglcontextlost",Xe,!1),t.removeEventListener("webglcontextrestored",nt,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),L.dispose(),be.dispose(),te.dispose(),ke.dispose(),Be.dispose(),E.dispose(),fe.dispose(),H.dispose(),xe.dispose(),We.dispose(),re.dispose(),de.dispose(),de.removeEventListener("sessionstart",tf),de.removeEventListener("sessionend",nf),us.stop()};function Xe(T){T.preventDefault(),io("WebGLRenderer: Context Lost."),P=!0}function nt(){io("WebGLRenderer: Context Restored."),P=!1;let T=gt.autoReset,O=ye.enabled,K=ye.autoUpdate,k=ye.needsUpdate,V=ye.type;it(),gt.autoReset=T,ye.enabled=O,ye.autoUpdate=K,ye.needsUpdate=k,ye.type=V}function Ae(T){Ze("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Mt(T){let O=T.target;O.removeEventListener("dispose",Mt),Vt(O)}function Vt(T){Wi(T),Be.remove(T)}function Wi(T){let O=Be.get(T).programs;O!==void 0&&(O.forEach(function(K){re.releaseProgram(K)}),T.isShaderMaterial&&re.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,K,k,V,Te){O===null&&(O=tt);let Ne=V.isMesh&&V.matrixWorld.determinantAffine()<0,Se=Fm(T,O,K,k,V);ge.setMaterial(k,Ne);let Ie=K.index,ze=1;if(k.wireframe===!0){if(Ie=H.getWireframeAttribute(K),Ie===void 0)return;ze=2}let Qe=K.drawRange,lt=K.attributes.position,Fe=Qe.start*ze,ct=(Qe.start+Qe.count)*ze;Te!==null&&(Fe=Math.max(Fe,Te.start*ze),ct=Math.min(ct,(Te.start+Te.count)*ze)),Ie!==null?(Fe=Math.max(Fe,0),ct=Math.min(ct,Ie.count)):lt!=null&&(Fe=Math.max(Fe,0),ct=Math.min(ct,lt.count));let Ut=ct-Fe;if(Ut<0||Ut===1/0)return;xe.setup(V,k,Se,K,Ie);let At,wt=Q;if(Ie!==null&&(At=S.get(Ie),wt=ve,wt.setIndex(At)),V.isMesh)k.wireframe===!0?(ge.setLineWidth(k.wireframeLinewidth*mt()),wt.setMode(U.LINES)):wt.setMode(U.TRIANGLES);else if(V.isLine){let Qt=k.linewidth;Qt===void 0&&(Qt=1),ge.setLineWidth(Qt*mt()),V.isLineSegments?wt.setMode(U.LINES):V.isLineLoop?wt.setMode(U.LINE_LOOP):wt.setMode(U.LINE_STRIP)}else V.isPoints?wt.setMode(U.POINTS):V.isSprite&&wt.setMode(U.TRIANGLES);if(V.isBatchedMesh)if(De.get("WEBGL_multi_draw"))wt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let Qt=V._multiDrawStarts,Oe=V._multiDrawCounts,cn=V._multiDrawCount,_t=Ie?S.get(Ie).bytesPerElement:1,fs=Be.get(k).currentProgram.getUniforms();for(let en=0;en<cn;en++)fs.setValue(U,"_gl_DrawID",en),wt.render(Qt[en]/_t,Oe[en])}else if(V.isInstancedMesh)wt.renderInstances(Fe,Ut,V.count);else if(K.isInstancedBufferGeometry){let Qt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Oe=Math.min(K.instanceCount,Qt);wt.renderInstances(Fe,Ut,Oe)}else wt.render(Fe,Ut)};function ef(T,O,K,k){F!==null&&T.isNodeMaterial&&F.setObject(k,T),oe===!0&&ne.setState(T,K,!1),T.transparent===!0&&T.side===gn&&T.forceSinglePass===!1?(T.side=$t,T.needsUpdate=!0,Gr(T,O,k),T.side=Hn,T.needsUpdate=!0,Gr(T,O,k),T.side=gn):Gr(T,O,k)}this.compile=function(T,O,K=null){K===null&&(K=T),F!==null&&F.renderStart(T,O,K),b=te.get(K),b.init(O),y.push(b),K.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),T!==K&&T.traverseVisible(function(V){V.isLight&&V.layers.test(O.layers)&&(b.pushLight(V),V.castShadow&&b.pushShadow(V))}),b.setupLights(),F!==null&&F.updateLights(b.state.lightsArray),ue=this.localClippingEnabled,oe=ne.init(this.clippingPlanes,ue),oe===!0&&ne.setGlobalState(this.clippingPlanes,O),F!==null&&ye.render(b.state.shadowsArray,K,O);let k=new Set;return T.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let Te=V.material;if(Te)if(Array.isArray(Te))for(let Ne=0;Ne<Te.length;Ne++){let Se=Te[Ne];ef(Se,K,O,V),k.add(Se)}else ef(Te,K,O,V),k.add(Te)}),b=y.pop(),F!==null&&F.renderEnd(),k},this.compileAsync=function(T,O,K=null){let k=this.compile(T,O,K);return new Promise(V=>{function Te(){if(k.forEach(function(Ne){let Ie=Be.get(Ne).currentProgram;(Ie===void 0||Ie.isReady())&&k.delete(Ne)}),k.size===0){V(T);return}setTimeout(Te,10)}De.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Mc=null;function Nm(T){Mc&&Mc(T)}function tf(){us.stop()}function nf(){us.start()}let us=new yp;us.setAnimationLoop(Nm),typeof self<"u"&&us.setContext(self),this.setAnimationLoop=function(T){Mc=T,de.setAnimationLoop(T),T===null?us.stop():us.start()},de.addEventListener("sessionstart",tf),de.addEventListener("sessionend",nf),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){Ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;F!==null&&F.renderStart(T,O);let K=de.enabled===!0&&de.isPresenting===!0,k=I!==null&&(ae===null||K)&&I.begin(R,ae);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),de.enabled===!0&&de.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(de.cameraAutoUpdate===!0&&de.updateCamera(O),O=de.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,O,ae),b=te.get(T,y.length),b.init(O),b.state.textureUnits=ke.getTextureUnits(),y.push(b),Re.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),O.isArrayCamera?he.setFromArrayCamera(O):J.setFromProjectionMatrix(Re,zn,O.reversedDepth),ue=this.localClippingEnabled,oe=ne.init(this.clippingPlanes,ue),A=be.get(T,p.length),A.init(),p.push(A),this.info.render.frame++,de.enabled===!0&&de.isPresenting===!0){let Ne=R.xr.getDepthSensingMesh();Ne!==null&&Sc(Ne,O,-1/0,R.sortObjects)}Sc(T,O,0,R.sortObjects),A.finish(),F!==null&&F.updateLights(b.state.lightsArray),R.sortObjects===!0&&A.sort(N,$),ut=de.enabled===!1||de.isPresenting===!1||de.hasDepthSensing()===!1,ut&&L.addToRenderList(A,T),this.info.autoReset===!0&&this.info.reset(),oe===!0&&ne.beginShadows();let V=b.state.shadowsArray;if(ye.render(V,T,O),oe===!0&&ne.endShadows(),(k&&I.hasRenderPass())===!1){let Ne=A.opaque,Se=A.transmissive;if(b.setupLights(),O.isArrayCamera){let Ie=O.cameras;if(Se.length>0)for(let ze=0,Qe=Ie.length;ze<Qe;ze++){let lt=Ie[ze];rf(Ne,Se,T,lt)}ut&&L.render(T);for(let ze=0,Qe=Ie.length;ze<Qe;ze++){let lt=Ie[ze];sf(A,T,lt,lt.viewport)}}else Se.length>0&&rf(Ne,Se,T,O),ut&&L.render(T),sf(A,T,O)}ae!==null&&q===0&&(ke.updateMultisampleRenderTarget(ae),ke.updateRenderTargetMipmap(ae)),k&&I.end(R),T.isScene===!0&&T.onAfterRender(R,T,O),xe.resetDefaultState(),Z=-1,se=null,y.pop(),y.length>0?(b=y[y.length-1],ke.setTextureUnits(b.state.textureUnits),oe===!0&&ne.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,p.pop(),p.length>0?A=p[p.length-1]:A=null,F!==null&&F.renderEnd()};function Sc(T,O,K,k){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)K=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLight)b.pushLight(T),T.castShadow&&b.pushShadow(T);else if(T.isSprite){let Ne=O.isArrayCamera?he:J;if(!T.frustumCulled||T.intersectsFrustum(Ne)){k&&$e.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Re);let Se=fe.update(T),Ie=T.material;Ie.visible&&A.push(T,Se,Ie,K,$e.z,null,O)}}else if(T.isMesh||T.isLine||T.isPoints){let Ne=O.isArrayCamera?he:J;if(!T.frustumCulled||T.intersectsFrustum(Ne)){let Se=fe.update(T),Ie=T.material;if(k&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),$e.copy(T.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),$e.copy(Se.boundingSphere.center)),$e.applyMatrix4(T.matrixWorld).applyMatrix4(Re)),Array.isArray(Ie)){let ze=Se.groups;for(let Qe=0,lt=ze.length;Qe<lt;Qe++){let Fe=ze[Qe],ct=Ie[Fe.materialIndex];ct&&ct.visible&&A.push(T,Se,ct,K,$e.z,Fe,O)}}else Ie.visible&&A.push(T,Se,Ie,K,$e.z,null,O)}}}let Te=T.children;for(let Ne=0,Se=Te.length;Ne<Se;Ne++)Sc(Te[Ne],O,K,k)}function sf(T,O,K,k){let{opaque:V,transmissive:Te,transparent:Ne}=T;b.setupLightsView(K),oe===!0&&ne.setGlobalState(R.clippingPlanes,K),k&&ge.viewport(le.copy(k)),V.length>0&&ea(V,O,K),Te.length>0&&ea(Te,O,K),Ne.length>0&&ea(Ne,O,K),ge.buffers.depth.setTest(!0),ge.buffers.depth.setMask(!0),ge.buffers.color.setMask(!0),ge.setPolygonOffset(!1)}function rf(T,O,K,k){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[k.id]===void 0){let Fe=De.has("EXT_color_buffer_half_float")||De.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[k.id]=new Cn(1,1,{generateMipmaps:!0,type:Fe?ii:Sn,minFilter:_n,samples:Math.max(4,Ye.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:et.workingColorSpace})}let Te=b.state.transmissionRenderTarget[k.id],Ne=k.viewport||le;Te.setSize(Ne.z*R.transmissionResolutionScale,Ne.w*R.transmissionResolutionScale);let Se=R.getRenderTarget(),Ie=R.getActiveCubeFace(),ze=R.getActiveMipmapLevel();R.setRenderTarget(Te),R.getClearColor(ee),Me=R.getClearAlpha(),Me<1&&R.setClearColor(16777215,.5),R.clear(),ut&&L.render(K);let Qe=R.toneMapping;R.toneMapping=fi;let lt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),b.setupLightsView(k),oe===!0&&ne.setGlobalState(R.clippingPlanes,k),ea(T,K,k),ke.updateMultisampleRenderTarget(Te),ke.updateRenderTargetMipmap(Te),De.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let ct=0,Ut=O.length;ct<Ut;ct++){let At=O[ct],{object:wt,geometry:Qt,material:Oe,group:cn}=At;if(Oe.side===gn&&wt.layers.test(k.layers)){let _t=Oe.side;Oe.side=$t,Oe.needsUpdate=!0,of(wt,K,k,Qt,Oe,cn),Oe.side=_t,Oe.needsUpdate=!0,Fe=!0}}Fe===!0&&(ke.updateMultisampleRenderTarget(Te),ke.updateRenderTargetMipmap(Te))}R.setRenderTarget(Se,Ie,ze),R.setClearColor(ee,Me),lt!==void 0&&(k.viewport=lt),R.toneMapping=Qe}function ea(T,O,K){let k=O.isScene===!0?O.overrideMaterial:null;for(let V=0,Te=T.length;V<Te;V++){let Ne=T[V],{object:Se,geometry:Ie,group:ze}=Ne,Qe=Ne.material;Qe.allowOverride===!0&&k!==null&&(Qe=k),Se.layers.test(K.layers)&&of(Se,O,K,Ie,Qe,ze)}}function of(T,O,K,k,V,Te){F!==null&&V.isNodeMaterial&&F.setObject(T,V),T.onBeforeRender(R,O,K,k,V,Te),T.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),V.onBeforeRender(R,O,K,k,T,Te),V.transparent===!0&&V.side===gn&&V.forceSinglePass===!1?(V.side=$t,V.needsUpdate=!0,R.renderBufferDirect(K,O,k,V,T,Te),V.side=Hn,V.needsUpdate=!0,R.renderBufferDirect(K,O,k,V,T,Te),V.side=gn):R.renderBufferDirect(K,O,k,V,T,Te),T.onAfterRender(R,O,K,k,V,Te)}function af(T){let O=0;for(let K of T)K.texture!==null&&O++;return O}function Gr(T,O,K){O.isScene!==!0&&(O=tt);let k=Be.get(T),V=b.state.lights,Te=b.state.shadowsArray,Ne=V.state.version,Se=re.getParameters(T,V.state,Te,O,K,b.state.lightProbeGridArray),Ie=re.getProgramCacheKey(Se),ze=k.programs;k.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?O.environment:null,k.fog=O.fog;let Qe=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;k.envMap=E.get(T.envMap||k.environment,Qe),k.envMapRotation=k.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,ze===void 0&&(T.addEventListener("dispose",Mt),ze=new Map,k.programs=ze,k.programVariants=new Map);let lt=ze.get(Ie);if(lt!==void 0){if(k.currentProgram===lt&&k.lightsStateVersion===Ne)return cf(T,Se),lt}else Se.uniforms=re.getUniforms(T),F!==null&&T.isNodeMaterial&&F.build(T,K,Se),T.onBeforeCompile(Se,R),lt=re.acquireProgram(Se,Ie),ze.set(Ie,lt),k.uniforms=Se.uniforms;let Fe=k.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Fe.clippingPlanes=ne.uniform),cf(T,Se),k.needsLights=Bm(T),k.lightsStateVersion=Ne,k.needsLights&&(Fe.ambientLightColor.value=V.state.ambient,Fe.lightProbe.value=V.state.probe,Fe.sunLights.value=V.state.sun,Fe.sunLightShadows.value=V.state.sunShadow,Fe.directionalLights.value=V.state.directional,Fe.directionalLightShadows.value=V.state.directionalShadow,Fe.spotLights.value=V.state.spot,Fe.spotLightShadows.value=V.state.spotShadow,Fe.rectAreaLights.value=V.state.rectArea,Fe.ltc_1.value=V.state.rectAreaLTC1,Fe.ltc_2.value=V.state.rectAreaLTC2,Fe.pointLights.value=V.state.point,Fe.pointLightShadows.value=V.state.pointShadow,Fe.hemisphereLights.value=V.state.hemi,Fe.sunShadowMatrix.value=V.state.sunShadowMatrix,Fe.sunShadowCascade.value=V.state.sunShadowCascade,Fe.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Fe.spotLightMatrix.value=V.state.spotLightMatrix,Fe.spotLightMap.value=V.state.spotLightMap,Fe.pointShadowMatrix.value=V.state.pointShadowMatrix),k.numLightProbeGrids=af(b.state.lightProbeGridArray),k.currentProgram=lt,k.uniformsList=null,lt}function Um(T,O,K,k,V){let Te=Be.get(T),Ne=Te.currentProgram.id+","+k+","+V,Se=Te.programVariants.get(Ne);return Se===void 0?(Se=Gr(T,O,K),Te.programVariants.set(Ne,Se)):(Te.currentProgram=Se,Te.uniformsList=null,Te.outputColorSpace=k,Te.toneMapping=V),Se}function lf(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=Pr.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function cf(T,O){let K=Be.get(T);K.outputColorSpace=O.outputColorSpace,K.batching=O.batching,K.batchingColor=O.batchingColor,K.instancing=O.instancing,K.instancingColor=O.instancingColor,K.instancingMorph=O.instancingMorph,K.skinning=O.skinning,K.morphTargets=O.morphTargets,K.morphNormals=O.morphNormals,K.morphColors=O.morphColors,K.morphTargetsCount=O.morphTargetsCount,K.numClippingPlanes=O.numClippingPlanes,K.numIntersection=O.numClipIntersection,K.vertexAlphas=O.vertexAlphas,K.vertexTangents=O.vertexTangents,K.toneMapping=O.toneMapping}function Fm(T,O,K,k,V){O.isScene!==!0&&(O=tt),ke.resetTextureUnits();let Te=O.fog,Ne=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?O.environment:null,Se=ae===null?R.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:et.workingColorSpace,Ie=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,ze=E.get(k.envMap||Ne,Ie),Qe=k.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,lt=!!K.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Fe=!!K.morphAttributes.position,ct=!!K.morphAttributes.normal,Ut=!!K.morphAttributes.color,At=fi;k.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(At=R.toneMapping);let wt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Qt=wt!==void 0?wt.length:0,Oe=Be.get(k),cn=b.state.lights;if(oe===!0&&(ue===!0||T!==se)){let It=T===se&&k.id===Z;ne.setState(k,T,It)}let _t=!1,fs=!1;k.version===Oe.__version?Oe.needsLights&&Oe.lightsStateVersion!==cn.state.version||V.isBatchedMesh&&Oe.batching===!1||!V.isBatchedMesh&&Oe.batching===!0||V.isBatchedMesh&&Oe.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Oe.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Oe.instancing===!1||!V.isInstancedMesh&&Oe.instancing===!0||V.isSkinnedMesh&&Oe.skinning===!1||!V.isSkinnedMesh&&Oe.skinning===!0||V.isInstancedMesh&&Oe.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Oe.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Oe.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Oe.instancingMorph===!1&&V.morphTexture!==null||Oe.envMap!==ze||k.fog===!0&&Oe.fog!==Te||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ne.numPlanes||Oe.numIntersection!==ne.numIntersection)||Oe.vertexAlphas!==Qe||Oe.vertexTangents!==lt||Oe.morphTargets!==Fe||Oe.morphNormals!==ct||Oe.morphColors!==Ut||Oe.morphTargetsCount!==Qt||Oe.numLightProbeGrids!==af(b.state.lightProbeGridArray)?_t=!0:(Oe.outputColorSpace!==Se||Oe.toneMapping!==At)&&(fs=!0):(_t=!0,Oe.__version=k.version);let en=Oe.currentProgram;(_t===!0||fs===!0)&&(en=fs===!0?Um(k,O,V,Se,At):Gr(k,O,V),F&&k.isNodeMaterial&&F.onUpdateProgram(k,en,Oe));let ta=!1,Xi=!1,ds=!1,ft=en.getUniforms(),Zt=Oe.uniforms;if(ge.useProgram(en.program)&&(ta=!0,Xi=!0,ds=!0),k.id!==Z&&(Z=k.id,Xi=!0),ta||se!==T){ge.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),ft.setValue(U,"projectionMatrix",T.projectionMatrix),ft.setValue(U,"viewMatrix",T.matrixWorldInverse);let Wt=ft.map.cameraPosition;Wt!==void 0&&Wt.setValue(U,pe.setFromMatrixPosition(T.matrixWorld)),Ye.logarithmicDepthBuffer&&ft.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ft.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),se!==T&&(se=T,Xi=!0,ds=!0)}if(Oe.needsLights&&(cn.state.sunShadowMap.length>0&&ft.setValue(U,"sunShadowMap",cn.state.sunShadowMap,ke),cn.state.directionalShadowMap.length>0&&ft.setValue(U,"directionalShadowMap",cn.state.directionalShadowMap,ke),cn.state.spotShadowMap.length>0&&ft.setValue(U,"spotShadowMap",cn.state.spotShadowMap,ke),cn.state.pointShadowMap.length>0&&ft.setValue(U,"pointShadowMap",cn.state.pointShadowMap,ke)),V.isSkinnedMesh){ft.setOptional(U,V,"bindMatrix"),ft.setOptional(U,V,"bindMatrixInverse");let It=V.skeleton;It&&(It.boneTexture===null&&It.computeBoneTexture(),ft.setValue(U,"boneTexture",It.boneTexture,ke))}V.isBatchedMesh&&(ft.setOptional(U,V,"batchingTexture"),ft.setValue(U,"batchingTexture",V._matricesTexture,ke),ft.setOptional(U,V,"batchingIdTexture"),ft.setValue(U,"batchingIdTexture",V._indirectTexture,ke),ft.setOptional(U,V,"batchingColorTexture"),V._colorsTexture!==null&&ft.setValue(U,"batchingColorTexture",V._colorsTexture,ke));let Kn=K.morphAttributes;if((Kn.position!==void 0||Kn.normal!==void 0||Kn.color!==void 0)&&ie.update(V,K,en),(Xi||Oe.receiveShadow!==V.receiveShadow)&&(Oe.receiveShadow=V.receiveShadow,ft.setValue(U,"receiveShadow",V.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&O.environment!==null&&(Zt.envMapIntensity.value=O.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=jv()),Xi){if(ft.setValue(U,"toneMappingExposure",R.toneMappingExposure),Oe.needsLights&&Om(Zt,ds),Te&&k.fog===!0&&_e.refreshFogUniforms(Zt,Te),_e.refreshMaterialUniforms(Zt,k,D,Ve,b.state.transmissionRenderTarget[T.id]),Oe.needsLights&&Oe.numLightProbeGrids>0){let It=v,Wt=0;for(let yi of b.state.lightProbeGridArray)yi.texture!==null&&(It.textures[Wt]=yi.texture,It.min[Wt]=yi.boundingBox.min,It.max[Wt]=yi.boundingBox.max,It.resolution[Wt]=yi.resolution,Wt++);for(let yi in It)It[yi].length=Wt;Zt.probesSH.value=It.textures,Zt.probesMin.value=It.min,Zt.probesMax.value=It.max,Zt.probesResolution.value=It.resolution}Pr.upload(U,lf(Oe),Zt,ke)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Pr.upload(U,lf(Oe),Zt,ke),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ft.setValue(U,"center",V.center),ft.setValue(U,"modelViewMatrix",V.modelViewMatrix),ft.setValue(U,"normalMatrix",V.normalMatrix),ft.setValue(U,"modelMatrix",V.matrixWorld),k.uniformsGroups!==void 0){let It=k.uniformsGroups;for(let Wt=0,yi=It.length;Wt<yi;Wt++){let uf=It[Wt];We.update(uf,en),We.bind(uf,en)}}return en}function Om(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.sunLights.needsUpdate=O,T.sunLightShadows.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function Bm(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(T,O,K){let k=Be.get(T);k.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Be.get(T.texture).__webglTexture=O,Be.get(T.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:K,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,O){let K=Be.get(T);K.__webglFramebuffer=O,K.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,K=0){ae=T,X=O,q=K;let k=null,V=!1,Te=!1;if(T){let Se=Be.get(T);if(Se.__useDefaultFramebuffer!==void 0){ge.bindFramebuffer(U.FRAMEBUFFER,Se.__webglFramebuffer),le.copy(T.viewport),Le.copy(T.scissor),Ue=T.scissorTest,ge.viewport(le),ge.scissor(Le),ge.setScissorTest(Ue),Z=-1;return}else if(Se.__webglFramebuffer===void 0)ke.setupRenderTarget(T);else if(Se.__hasExternalTextures)ke.rebindTextures(T,Be.get(T.texture).__webglTexture,Be.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Qe=T.depthTexture;if(Se.__boundDepthTexture!==Qe){if(Qe!==null&&Be.has(Qe)&&(T.width!==Qe.image.width||T.height!==Qe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(T)}}let Ie=T.texture;(Ie.isData3DTexture||Ie.isDataArrayTexture||Ie.isCompressedArrayTexture)&&(Te=!0);let ze=Be.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[O])?k=ze[O][K]:k=ze[O],V=!0):T.samples>0&&ke.useMultisampledRTT(T)===!1?k=Be.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?k=ze[K]:k=ze,le.copy(T.viewport),Le.copy(T.scissor),Ue=T.scissorTest}else le.copy(G).multiplyScalar(D).floor(),Le.copy(j).multiplyScalar(D).floor(),Ue=Y;if(K!==0&&(k=z),ge.bindFramebuffer(U.FRAMEBUFFER,k)&&ge.drawBuffers(T,k),ge.viewport(le),ge.scissor(Le),ge.setScissorTest(Ue),V){let Se=Be.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+O,Se.__webglTexture,K)}else if(Te){let Se=O;for(let Ie=0;Ie<T.textures.length;Ie++){let ze=Be.get(T.textures[Ie]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ie,ze.__webglTexture,K,Se)}}else if(T!==null&&K!==0){let Se=Be.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Se.__webglTexture,K)}Z=-1};function hf(T){let O=Be.get(T);return(O.__readFormat!==T.format||O.__readType!==T.type)&&(O.__readFormat=T.format,O.__readType=T.type,O.__formatReadable=Ye.textureFormatReadable(T.format),O.__typeReadable=Ye.textureTypeReadable(T.type)),O}this.readRenderTargetPixels=function(T,O,K,k,V,Te,Ne,Se=0){if(!(T&&T.isWebGLRenderTarget)){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ie=Be.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ne!==void 0&&(Ie=Ie[Ne],Array.isArray(Ie)&&(Ie=Ie[0])),Ie){ge.bindFramebuffer(U.FRAMEBUFFER,Ie);try{let ze=T.textures[Se],Qe=ze.format,lt=ze.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Se);let Fe=hf(ze);if(Fe.__formatReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Fe.__typeReadable===!1){Ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-k&&K>=0&&K<=T.height-V&&U.readPixels(O,K,k,V,me.convert(Qe),me.convert(lt),Te)}finally{let ze=ae!==null?Be.get(ae).__webglFramebuffer:null;ge.bindFramebuffer(U.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(T,O,K,k,V,Te,Ne,Se=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ie=Be.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ne!==void 0&&(Ie=Ie[Ne],Array.isArray(Ie)&&(Ie=Ie[0])),Ie)if(O>=0&&O<=T.width-k&&K>=0&&K<=T.height-V){ge.bindFramebuffer(U.FRAMEBUFFER,Ie);let ze=T.textures[Se],Qe=ze.format,lt=ze.type;T.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Se);let Fe=hf(ze);if(Fe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Fe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ct=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,ct),U.bufferData(U.PIXEL_PACK_BUFFER,Te.byteLength,U.STREAM_READ),U.readPixels(O,K,k,V,me.convert(Qe),me.convert(lt),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);let Ut=ae!==null?Be.get(ae).__webglFramebuffer:null;ge.bindFramebuffer(U.FRAMEBUFFER,Ut);let At=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Yd(U,At,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,ct),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Te),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(ct),U.deleteSync(At),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,O=null,K=0){let k=Math.pow(2,-K),V=Math.floor(T.image.width*k),Te=Math.floor(T.image.height*k),Ne=O!==null?O.x:0,Se=O!==null?O.y:0;ke.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,K,0,0,Ne,Se,V,Te),ge.unbindTexture()},this.copyTextureToTexture=function(T,O,K=null,k=null,V=0,Te=0){let Ne,Se,Ie,ze,Qe,lt,Fe,ct,Ut,At=T.isCompressedTexture?T.mipmaps[Te]:T.image;if(K!==null)Ne=K.max.x-K.min.x,Se=K.max.y-K.min.y,Ie=K.isBox3?K.max.z-K.min.z:1,ze=K.min.x,Qe=K.min.y,lt=K.isBox3?K.min.z:0;else{let ft=Math.pow(2,-V);Ne=Math.floor(At.width*ft),Se=Math.floor(At.height*ft),T.isDataArrayTexture?Ie=At.depth:T.isData3DTexture?Ie=Math.floor(At.depth*ft):Ie=1,ze=0,Qe=0,lt=0}k!==null?(Fe=k.x,ct=k.y,Ut=k.z):(Fe=0,ct=0,Ut=0);let wt=me.convert(O.format),Qt=me.convert(O.type),Oe;O.isData3DTexture?(ke.setTexture3D(O,0),Oe=U.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(ke.setTexture2DArray(O,0),Oe=U.TEXTURE_2D_ARRAY):(ke.setTexture2D(O,0),Oe=U.TEXTURE_2D),ge.activeTexture(U.TEXTURE0),ge.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),ge.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),ge.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment);let cn=ge.getParameter(U.UNPACK_ROW_LENGTH),_t=ge.getParameter(U.UNPACK_IMAGE_HEIGHT),fs=ge.getParameter(U.UNPACK_SKIP_PIXELS),en=ge.getParameter(U.UNPACK_SKIP_ROWS),ta=ge.getParameter(U.UNPACK_SKIP_IMAGES);ge.pixelStorei(U.UNPACK_ROW_LENGTH,At.width),ge.pixelStorei(U.UNPACK_IMAGE_HEIGHT,At.height),ge.pixelStorei(U.UNPACK_SKIP_PIXELS,ze),ge.pixelStorei(U.UNPACK_SKIP_ROWS,Qe),ge.pixelStorei(U.UNPACK_SKIP_IMAGES,lt);let Xi=T.isDataArrayTexture||T.isData3DTexture,ds=O.isDataArrayTexture||O.isData3DTexture;if(T.isDepthTexture){let ft=Be.get(T),Zt=Be.get(O),Kn=Be.get(ft.__renderTarget),It=Be.get(Zt.__renderTarget);ge.bindFramebuffer(U.READ_FRAMEBUFFER,Kn.__webglFramebuffer),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let Wt=0;Wt<Ie;Wt++)Xi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.get(T).__webglTexture,V,lt+Wt),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Be.get(O).__webglTexture,Te,Ut+Wt)),U.blitFramebuffer(ze,Qe,ze+Ne,Qe+Se,Fe,ct,Fe+Ne,ct+Se,U.DEPTH_BUFFER_BIT,U.NEAREST);ge.bindFramebuffer(U.READ_FRAMEBUFFER,null),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(V!==0||T.isRenderTargetTexture||Be.has(T)){let ft=Be.get(T),Zt=Be.get(O);ge.bindFramebuffer(U.READ_FRAMEBUFFER,C),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,W);for(let Kn=0;Kn<Ie;Kn++)Xi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ft.__webglTexture,V,lt+Kn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ft.__webglTexture,V),ds?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Zt.__webglTexture,Te,Ut+Kn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Zt.__webglTexture,Te),V!==0?U.blitFramebuffer(ze,Qe,ze+Ne,Qe+Se,Fe,ct,Fe+Ne,ct+Se,U.COLOR_BUFFER_BIT,U.NEAREST):ds?U.copyTexSubImage3D(Oe,Te,Fe,ct,Ut+Kn,ze,Qe,Ne,Se):U.copyTexSubImage2D(Oe,Te,Fe,ct,ze,Qe,Ne,Se);ge.bindFramebuffer(U.READ_FRAMEBUFFER,null),ge.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else ds?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Oe,Te,Fe,ct,Ut,Ne,Se,Ie,wt,Qt,At.data):O.isCompressedArrayTexture?U.compressedTexSubImage3D(Oe,Te,Fe,ct,Ut,Ne,Se,Ie,wt,At.data):U.texSubImage3D(Oe,Te,Fe,ct,Ut,Ne,Se,Ie,wt,Qt,At):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Te,Fe,ct,Ne,Se,wt,Qt,At.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Te,Fe,ct,At.width,At.height,wt,At.data):U.texSubImage2D(U.TEXTURE_2D,Te,Fe,ct,Ne,Se,wt,Qt,At);ge.pixelStorei(U.UNPACK_ROW_LENGTH,cn),ge.pixelStorei(U.UNPACK_IMAGE_HEIGHT,_t),ge.pixelStorei(U.UNPACK_SKIP_PIXELS,fs),ge.pixelStorei(U.UNPACK_SKIP_ROWS,en),ge.pixelStorei(U.UNPACK_SKIP_IMAGES,ta),Te===0&&O.generateMipmaps===!0&&O.mipmapsAutoUpdate===!0&&U.generateMipmap(Oe),ge.unbindTexture()},this.initRenderTarget=function(T){Be.get(T).__webglFramebuffer===void 0&&ke.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?ke.setTextureCube(T,0):T.isData3DTexture?ke.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?ke.setTexture2DArray(T,0):ke.setTexture2D(T,0),ge.unbindTexture()},this.resetState=function(){X=0,q=0,ae=null,ge.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=et._getDrawingBufferColorSpace(e),t.unpackColorSpace=et._getUnpackColorSpace()}}});function Qv(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function eM(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function tM(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Lp),this.state=xt.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function nM(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ns.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=xt.DOLLY;break;case ns.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xt.ROTATE}break;case ns.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=xt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=xt.PAN}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(nu)}function iM(i){switch(this.state){case xt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case xt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case xt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function sM(i){this.enabled===!1||this.enableZoom===!1||this.state!==xt.NONE||(i.preventDefault(),this.dispatchEvent(nu),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(Lp))}function rM(i){this.enabled!==!1&&this._handleKeyDown(i)}function oM(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case is.ROTATE:if(this.enableRotate===!1){this.state=xt.NONE;break}this._handleTouchStartRotate(i),this.state=xt.TOUCH_ROTATE;break;case is.PAN:if(this.enablePan===!1){this.state=xt.NONE;break}this._handleTouchStartPan(i),this.state=xt.TOUCH_PAN;break;default:this.state=xt.NONE}break;case 2:switch(this.touches.TWO){case is.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=xt.TOUCH_DOLLY_PAN;break;case is.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=xt.TOUCH_DOLLY_ROTATE;break;default:this.state=xt.NONE}break;default:this.state=xt.NONE}this.state!==xt.NONE&&this.dispatchEvent(nu)}function aM(i){switch(this._trackPointer(i),this.state){case xt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case xt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case xt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case xt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=xt.NONE}}function lM(i){this.enabled!==!1&&i.preventDefault()}function cM(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function hM(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}var Ip,nu,Lp,$l,Pp,Jv,Ht,bn,xt,tu,Jl,Dp=hn(()=>{Wn();Ip={type:"change"},nu={type:"start"},Lp={type:"end"},$l=new ci,Pp=new Rn,Jv=Math.cos(70*rs.DEG2RAD),Ht=new B,bn=2*Math.PI,xt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},tu=1e-6,Jl=class extends Io{constructor(e,t=null){super(e,t),this.state=xt.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ns.ROTATE,MIDDLE:ns.DOLLY,RIGHT:ns.PAN},this.touches={ONE:is.ROTATE,TWO:is.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Nt,this._lastTargetPosition=new B,this._quat=new Nt().setFromUnitVectors(e.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new br,this._sphericalDelta=new br,this._scale=1,this._panOffset=new B,this._rotateStart=new Ge,this._rotateEnd=new Ge,this._rotateDelta=new Ge,this._panStart=new Ge,this._panEnd=new Ge,this._panDelta=new Ge,this._dollyStart=new Ge,this._dollyEnd=new Ge,this._dollyDelta=new Ge,this._dollyDirection=new B,this._mouse=new Ge,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=eM.bind(this),this._onPointerDown=Qv.bind(this),this._onPointerUp=tM.bind(this),this._onContextMenu=lM.bind(this),this._onMouseWheel=sM.bind(this),this._onKeyDown=rM.bind(this),this._onTouchStart=oM.bind(this),this._onTouchMove=aM.bind(this),this._onMouseDown=nM.bind(this),this._onMouseMove=iM.bind(this),this._interceptControlDown=cM.bind(this),this._interceptControlUp=hM.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=xt.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ip),this.update(),this.state=xt.NONE}pan(e,t){this._pan(e,t),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){let t=this.object.position;Ht.copy(t).sub(this.target),Ht.applyQuaternion(this._quat),this._spherical.setFromVector3(Ht),this.autoRotate&&this.state===xt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=bn:n>Math.PI&&(n-=bn),s<-Math.PI?s+=bn:s>Math.PI&&(s-=bn),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Ht.setFromSpherical(this._spherical),Ht.applyQuaternion(this._quatInverse),t.copy(this.target).add(Ht),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Ht.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let a=new B(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Ht.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):($l.origin.copy(this.object.position),$l.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot($l.direction))<Jv?this.object.lookAt(this.target):(Pp.setFromNormalAndCoplanarPoint(this.object.up,this.target),$l.intersectPlane(Pp,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>tu||8*(1-this._lastQuaternion.dot(this.object.quaternion))>tu||this._lastTargetPosition.distanceToSquared(this.target)>tu?(this.dispatchEvent(Ip),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?bn/60*this.autoRotateSpeed*e:bn/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Ht.setFromMatrixColumn(t,0),Ht.multiplyScalar(-e),this._panOffset.add(Ht)}_panUp(e,t){this.screenSpacePanning===!0?Ht.setFromMatrixColumn(t,1):(Ht.setFromMatrixColumn(t,0),Ht.crossVectors(this.object.up,Ht)),Ht.multiplyScalar(e),this._panOffset.add(Ht)}_pan(e,t){let n=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ht.copy(s).sub(this.target);let r=Ht.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientY),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-bn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(bn*this._rotateDelta.x/t.clientHeight),this._rotateUp(bn*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Ge,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}});function Fp(i,e=!1){let t=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new at;l.morphTargetsRelative=a;let c=0;for(let h=0;h<i.length;++h){let u=i[h],f=0,d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let g in u.attributes){if(!n.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(u.attributes[g]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let g in u.morphAttributes){if(!s.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(u.morphAttributes[g].length!==i[0].morphAttributes[g].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+g+'" morph attribute.'),null;o[g]===void 0&&(o[g]=[]),o[g].push(u.morphAttributes[g]),d++}if(d!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(e){let g;if(t)g=u.index.count;else if(u.attributes.position!==void 0)g=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,g,h),c+=g}}if(t){let h=0,u=[];for(let f=0;f<i.length;++f){let d=i[f].index;for(let g=0;g<d.count;++g)u.push(d.getX(g)+h);h+=i[f].attributes.position.count}l.setIndex(u)}for(let h in r){let u=Np(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let f=0;f<u;++f){let d=[];for(let x=0;x<o[h].length;++x)d.push(o[h][x][f]);let g=Np(d);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function Np(i){let e,t,n,s=-1,r=0;for(let c=0;c<i.length;++c){let h=i[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*t}let o=new e(r),a=new pt(o,t,n),l=0;for(let c=0;c<i.length;++c){let h=i[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let f=0,d=h.count;f<d;f++)for(let g=0;g<t;g++){let x=h.getComponent(f,g);a.setComponent(f+u,g,x)}}else o.set(h.array,l);l+=h.count*t}return s!==void 0&&(a.gpuType=s),a}function Op(i,e=1e-4){e=Math.max(e,Number.EPSILON);let t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count,o=0,a=Object.keys(i.attributes),l=[],c=new Map,h=[],u=["getX","getY","getZ","getW"],f=e*.5,d=Math.log10(1/e),g=Math.pow(10,d),x=f*g;for(let m=0;m<r;m++){let w=n?n.getX(m):m,M="";for(let v=0,A=a.length;v<A;v++){let b=a[v],p=i.getAttribute(b),y=p.itemSize;for(let I=0;I<y;I++)M+=`${Math.trunc(p[u[I]](w)*g+x)},`}M in t?h.push(t[M]):(l.push(w),t[M]=o,h.push(o),o++)}let _=i.clone();for(let m in i.attributes)_.setAttribute(m,Up(i.attributes[m],l,c));for(let m in i.morphAttributes)_.morphAttributes[m]=i.morphAttributes[m].map(w=>Up(w,l,c));return _.setIndex(h),_}function iu(i,e){if(e===Ih)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Cr||e===ko){let t=i.getIndex();if(t===null){let r=[],o=i.getAttribute("position");if(o!==void 0){for(let a=0;a<o.count;a++)r.push(a);i.setIndex(r),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Cr)for(let r=1;r<=n;r++)s.push(t.getX(0)),s.push(t.getX(r)),s.push(t.getX(r+1));else for(let r=0;r<n;r++)r%2===0?(s.push(t.getX(r)),s.push(t.getX(r+1)),s.push(t.getX(r+2))):(s.push(t.getX(r+2)),s.push(t.getX(r+1)),s.push(t.getX(r)));return s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),i.setIndex(s),i.clearGroups(),i}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}function Up(i,e,t=new Map){let n=i.isInterleavedBufferAttribute,s=n?i.data:i,r=n?s.stride:i.itemSize,o=n?t.get(s):void 0;if(o===void 0){let l=new s.array.constructor(e.length*r);for(let c=0;c<e.length;c++)for(let h=0;h<r;h++)l[c*r+h]=s.array[e[c]*r+h];o=n?new s.constructor(l,r,s.meshPerAttribute):new i.constructor(l,i.itemSize,i.normalized,i.meshPerAttribute),o.setUsage(s.usage),n&&t.set(s,o)}let a=n?new i.constructor(o,i.itemSize,i.offset,i.normalized):o;return a.name=i.name,n||(a.gpuType=i.gpuType),a}var Ql=hn(()=>{Wn()});function Bp(i){let e=new Map,t=new Map,n=i.clone();return zp(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;let r=s,o=e.get(s),a=o.skeleton.bones;r.skeleton=o.skeleton.clone(),r.bindMatrix.copy(o.bindMatrix),r.skeleton.bones=a.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function zp(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)zp(i.children[n],e.children[n],t)}var kp=hn(()=>{});function uM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}function Pt(i,e,t){let n=i.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}function pM(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new vn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Hn})),i.DefaultMaterial}function Gs(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function gi(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function mM(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let f=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;o.push(f)}if(s){let f=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;a.push(f)}if(r){let f=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],f=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=f),i.morphTargetsRelative=!0,i})}function gM(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function _M(i){let e,t=i.extensions&&i.extensions[ot.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ou(t.attributes):e=i.indices+":"+ou(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+ou(i.targets[n]);return e}function ou(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Pu(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function xM(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}function vM(i,e,t){let n=e.attributes,s=new Kt;if(n.POSITION!==void 0){let a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(s.set(new B(l[0],l[1],l[2]),new B(c[0],c[1],c[2])),a.normalized){let h=Pu(Nr[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let a=new B,l=new B;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let f=t.json.accessors[u.POSITION],d=f.min,g=f.max;if(d!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(g[2]))),f.normalized){let x=Pu(Nr[f.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}i.boundingBox=s;let o=new yn;s.getCenter(o.center),o.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=o}function Wp(i,e,t){let n=e.attributes,s=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){i.setAttribute(a,l)})}for(let o in n){let a=Iu[o]||o.toLowerCase();a in i.attributes||s.push(r(n[o],a))}if(e.indices!==void 0&&!i.index){let o=t.getDependency("accessor",e.indices).then(function(a){i.setIndex(a)});s.push(o)}return et.workingColorSpace!==pn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),gi(i,e),vM(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?mM(i,e.targets,t):i})}var ec,ot,au,lu,cu,hu,uu,fu,du,pu,mu,gu,_u,xu,yu,vu,Mu,Su,bu,tc,Tu,Xp,Xo,Gp,wu,Au,Eu,Ru,nc,fM,Cu,Xn,Nr,Hp,Vp,su,Iu,os,dM,ru,yM,Lu,qp=hn(()=>{Wn();Ql();kp();ec=class extends Dt{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new hu(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new fu(t)}),this.register(function(t){return new Mu(t)}),this.register(function(t){return new Su(t)}),this.register(function(t){return new bu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new mu(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new xu(t)}),this.register(function(t){return new du(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new yu(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new tc(t,ot.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new tc(t,ot.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new Tu(t)})}load(e,t,n,s){let r=this,o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){let c=ti.extractUrlBase(e);o=ti.resolveURL(c,this.path)}else o=ti.extractUrlBase(e);this.manager.itemStart(e);let a=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new sn(this.manager);l.setPriority(this.priority),l.setCache(this.cache),l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Xp){try{o[ot.KHR_BINARY_GLTF]=new wu(e)}catch(u){s&&s(u);return}r=JSON.parse(o[ot.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Lu(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,priority:this.priority,cache:this.cache,withCredentials:this.withCredentials,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],f=r.extensionsRequired||[];switch(u){case ot.KHR_MATERIALS_UNLIT:o[u]=new lu;break;case ot.KHR_DRACO_MESH_COMPRESSION:o[u]=new Au(r,this.dracoLoader);break;case ot.KHR_TEXTURE_TRANSFORM:o[u]=new Eu;break;case ot.KHR_MESH_QUANTIZATION:o[u]=new Ru;break;default:f.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};ot={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DIFFUSE_ROUGHNESS:"KHR_materials_diffuse_roughness",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},au=class{constructor(e){this.parser=e,this.name=ot.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new we(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],pn);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ns(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Ls(h),c.distance=u;break;case"spot":c=new bo(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),gi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}},lu=class{constructor(){this.name=ot.KHR_MATERIALS_UNLIT}getMaterialType(){return Gn}extendParams(e,t,n){let s=[];e.color=new we(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],pn),e.opacity=o[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,dt))}return Promise.all(s)}},cu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},hu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(s.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let r=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ge(r,r)}return Promise.all(s)}},uu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_DIFFUSE_ROUGHNESS}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.diffuseRoughness=n.diffuseRoughnessFactor!==void 0?n.diffuseRoughnessFactor:0,n.diffuseRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"diffuseRoughnessMap",n.diffuseRoughnessTexture)),Promise.all(s)}},fu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}},du=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessMinimum=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessMaximum=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(s)}},pu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SHEEN}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];if(t.sheenColor=new we(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let r=n.sheenColorFactor;t.sheenColor.setRGB(r[0],r[1],r[2],pn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,dt)),n.sheenRoughnessTexture!==void 0&&s.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(s)}},mu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&s.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(s)}},gu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_VOLUME}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&s.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let r=n.attenuationColor||[1,1,1];return t.attenuationColor=new we().setRGB(r[0],r[1],r[2],pn),Promise.all(s)}},_u=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_IOR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}},xu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));let r=n.specularColorFactor||[1,1,1];return t.specularColor=new we().setRGB(r[0],r[1],r[2],pn),n.specularColorTexture!==void 0&&s.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,dt)),Promise.all(s)}},yu=class{constructor(e){this.parser=e,this.name=ot.EXT_MATERIALS_BUMP}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&s.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(s)}},vu=class{constructor(e){this.parser=e,this.name=ot.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Pt(this.parser,e,this.name)!==null?mn:null}extendMaterialParams(e,t){let n=Pt(this.parser,e,this.name);if(n===null)return Promise.resolve();let s=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&s.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(s)}},Mu=class{constructor(e){this.parser=e,this.name=ot.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}},Su=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},bu=class{constructor(e){this.parser=e,this.name=ot.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let o=r.extensions[t],a=s.images[o.source],l=n.textureLoader;if(a.uri){let c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}},tc=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){let l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,f,s.mode,s.filter).then(function(d){return d.buffer}):o.ready.then(function(){let d=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(d),h,u,f,s.mode,s.filter),d})})}else return null}},Tu=class{constructor(e){this.name=ot.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==Xn.TRIANGLES&&c.mode!==Xn.TRIANGLE_STRIP&&c.mode!==Xn.TRIANGLE_FAN&&c.mode!==void 0)return null;let o=n.extensions[this.name].attributes,a=[],l={};for(let c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],f=c[0].count,d=[];for(let g of u){let x=new qe,_=new B,m=new Nt,w=new B(1,1,1),M=new Rs(g.geometry,g.material,f);for(let A=0;A<f;A++)l.TRANSLATION&&_.fromBufferAttribute(l.TRANSLATION,A),l.ROTATION&&m.fromBufferAttribute(l.ROTATION,A),l.SCALE&&w.fromBufferAttribute(l.SCALE,A),M.setMatrixAt(A,x.compose(_,m,w));let v=null;for(let A in l)if(A==="_COLOR_0"){let b=l[A];M.instanceColor=new Ci(b.array,b.itemSize,b.normalized)}else if(A!=="TRANSLATION"&&A!=="ROTATION"&&A!=="SCALE"){if(v===null){let p=M.geometry;v=new at,v.name=p.name;for(let y in p.attributes)v.setAttribute(y,p.attributes[y]);for(let y in p.morphAttributes)v.morphAttributes[y]=p.morphAttributes[y];p.index!==null&&v.setIndex(p.index),v.morphTargetsRelative=p.morphTargetsRelative;for(let y of p.groups)v.addGroup(y.start,y.count,y.materialIndex);p.boundingBox!==null&&(v.boundingBox=p.boundingBox.clone()),p.boundingSphere!==null&&(v.boundingSphere=p.boundingSphere.clone()),v.drawRange.start=p.drawRange.start,v.drawRange.count=p.drawRange.count,v.userData=Object.assign({},p.userData),M.geometry=v}let b=l[A];v.setAttribute(A,new Ci(b.array,b.itemSize,b.normalized))}Et.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),d.push(M)}return h.isGroup?(h.clear(),h.add(...d),h):d[0]}))}},Xp="glTF",Xo=12,Gp={JSON:1313821514,BIN:5130562},wu=class{constructor(e){this.name=ot.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Xo),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Xp)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-Xo,r=new DataView(e,Xo),o=0;for(;o<s;){let a=r.getUint32(o,!0);o+=4;let l=r.getUint32(o,!0);if(o+=4,l===Gp.JSON){let c=new Uint8Array(e,Xo+o,a);this.content=n.decode(c)}else if(l===Gp.BIN){let c=Xo+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Au=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ot.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(let h in o){let u=Iu[h]||h.toLowerCase();a[u]=o[h]}for(let h in e.attributes){let u=Iu[h]||h.toLowerCase();if(o[h]!==void 0){let f=n.accessors[e.attributes[h]],d=Nr[f.componentType];c[u]=d.name,l[u]=f.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,f){s.decodeDracoFile(h,function(d){for(let g in d.attributes){let x=d.attributes[g],_=l[g];_!==void 0&&(x.normalized=_)}u(d)},a,c,pn,f)})})}},Eu=class{constructor(){this.name=ot.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){let n=Math.cos(e.rotation),s=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*s,e.offset.x,-e.repeat.x*s,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}},Ru=class{constructor(){this.name=ot.KHR_MESH_QUANTIZATION}},nc=class extends ui{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let o=0;o!==s;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=s-t,u=(n-t)/h,f=u*u,d=f*u,g=e*c,x=g-c,_=-2*d+3*f,m=d-f,w=1-_,M=m-f+u;for(let v=0;v!==a;v++){let A=o[x+v+a],b=o[x+v+l]*h,p=o[g+v+a],y=o[g+v]*h;r[v]=w*A+M*b+_*p+m*y}return r}},fM=new Nt,Cu=class extends nc{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return fM.fromArray(r).normalize().toArray(r),r}},Xn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Nr={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Hp={9728:Rt,9729:Ct,9984:rl,9985:Er,9986:Bs,9987:_n},Vp={33071:fn,33648:Ei,10497:dn},su={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Iu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},os={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},dM={CUBICSPLINE:void 0,LINEAR:bs,STEP:Ss},ru={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};yM=new qe,Lu=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new uM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,o=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){let a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;let l=a.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&o<98?(this.textureLoader=new Fi(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)):(this.textureLoader=new To(this.options.manager),this.textureLoader.setPriority(this.options.priority),this.textureLoader.setCache(this.options.cache)),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setWithCredentials(this.options.withCredentials),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sn(this.options.manager),this.fileLoader.setPriority(this.options.priority),this.fileLoader.setCache(this.options.cache),this.fileLoader.setResponseType("arraybuffer"),(this.options.withCredentials||this.options.crossOrigin==="use-credentials")&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){let a={scene:o[0][s.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:s.asset,parser:n,userData:{}};return Gs(r,a,s),gi(a,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(let l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let o=t[s].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let o=e[s];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(o,a)=>{let l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(let[c,h]of o.children.entries())r(h,a.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ot.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,o){n.load(ti.resolveURL(t.uri,s.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let o=su[s.type],a=Nr[s.componentType],l=s.normalized===!0,c=new a(s.count*o);return Promise.resolve(new pt(c,o,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(o){let a=o[0],l=su[s.type],c=Nr[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,f=s.byteOffset||0,d=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,x,_;if(d&&d!==u){let m=Math.floor(f/d),w="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count,M=t.cache.get(w);M||(x=new c(a,m*d,s.count*d/h),M=new gr(x,d/h),t.cache.add(w,M)),_=new _r(M,l,f%d/h,g)}else a===null?x=new c(s.count*l):x=new c(a,f,s.count*l),_=new pt(x,l,g);if(s.sparse!==void 0){let m=su.SCALAR,w=Nr[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,v=s.sparse.values.byteOffset||0,A=new w(o[1],M,s.sparse.count*m),b=new c(o[2],v,s.sparse.count*l);a!==null&&(_=new pt(_.array.slice(),_.itemSize,_.normalized)),_.normalized=!1;for(let p=0,y=A.length;p<y;p++){let I=A[p];if(_.setX(I,b[p*l]),l>=2&&_.setY(I,b[p*l+1]),l>=3&&_.setZ(I,b[p*l+2]),l>=4&&_.setW(I,b[p*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}_.normalized=g}return _})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r],a=this.textureLoader;if(o.uri){let l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let s=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);let f=(r.samplers||{})[o.sampler]||{};return h.magFilter=Hp[f.magFilter]||Ct,h.minFilter=Hp[f.minFilter]||_n,h.wrapS=Vp[f.wrapS]||dn,h.wrapT=Vp[f.wrapT]||dn,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Rt&&h.minFilter!==Ct,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(f=>f.clone());let o=s.images[e],a=self.URL||self.webkitURL,l=o.uri||"",c=!1,h;if(t.isKTX2Loader===!0&&o.bufferView!==void 0)h=n.getDependency("bufferView",o.bufferView).then(function(f){return new Promise(function(d,g){t.parse(f,d,g)})});else{if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(f){c=!0;let d=new Blob([f],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");h=Promise.resolve(l).then(function(f){return new Promise(function(d,g){let x=d;t.isImageBitmapLoader===!0&&(x=function(_){let m=new qt(_);m.needsUpdate=!0,d(m)}),t.load(ti.resolveURL(f,r.path),x,void 0,g)})})}let u=h.then(function(f){return c===!0&&a.revokeObjectURL(l),gi(f,o),f.userData.mimeType=o.mimeType||xM(o.uri),f}).catch(function(f){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),f});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[ot.KHR_TEXTURE_TRANSFORM]){let a=n.extensions!==void 0?n.extensions[ot.KHR_TEXTURE_TRANSFORM]:void 0;if(a){let l=r.associations.get(o);o=r.extensions[ot.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return s!==void 0&&(o.colorSpace=s),e[t]=o,o})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){let a="PointsMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new Pn,zt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){let a="LineBasicMaterial:"+n.uuid,l=this.cache.get(a);l||(l=new jt,zt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(s||r||o){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return vn}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],o,a={},l=r.extensions||{},c=[];if(l[ot.KHR_MATERIALS_UNLIT]){let u=s[ot.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,r,t))}else{let u=r.pbrMetallicRoughness||{};if(a.color=new we(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],pn),a.opacity=f[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,dt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=gn);let h=r.alphaMode||ru.OPAQUE;if(h===ru.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===ru.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==Gn&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Ge(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;a.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&o!==Gn&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==Gn){let u=r.emissiveFactor;a.emissive=new we().setRGB(u[0],u[1],u[2],pn)}return r.emissiveTexture!==void 0&&o!==Gn&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,dt)),Promise.all(c).then(function(){let u=new o(a);return r.name&&(u.name=r.name),gi(u,r),t.associations.set(u,{materials:e}),r.extensions&&Gs(s,u,r),u})}createUniqueName(e){let t=Tt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[ot.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Wp(l,a,t)})}let o=[];for(let a=0,l=e.length;a<l;a++){let c=e[a],h=_M(c),u=s[h];if(u)o.push(u.promise);else{let f;c.extensions&&c.extensions[ot.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=Wp(new at,c,t),c.mode===Xn.TRIANGLE_STRIP?f=f.then(d=>iu(d,ko)):c.mode===Xn.TRIANGLE_FAN&&(f=f.then(d=>iu(d,Cr))),s[h]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){let h=o[l].material===void 0?pM(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(async function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let d=0,g=h.length;d<g;d++){let x=h[d],_=o[d],m,w=c[d];if(_.mode===Xn.TRIANGLES||_.mode===Xn.TRIANGLE_STRIP||_.mode===Xn.TRIANGLE_FAN||_.mode===void 0){let M=r.isSkinnedMesh===!0,v=x.hasAttribute("skinIndex")&&x.hasAttribute("skinWeight");M&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),m=M&&v?new co(x,w):new ht(x,w),m.isSkinnedMesh===!0&&m.normalizeSkinWeights()}else if(_.mode===Xn.LINES)m=new In(x,w);else if(_.mode===Xn.LINE_STRIP)m=new Ii(x,w);else if(_.mode===Xn.LINE_LOOP)m=new uo(x,w);else if(_.mode===Xn.POINTS)m=new ei(x,w);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+_.mode);Object.keys(m.geometry.morphAttributes).length>0&&gM(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),gi(m,r),_.extensions&&Gs(s,m,_),t.assignFinalMaterial(m),u.push(m)}for(let d=0,g=u.length;d<g;d++)t.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return r.extensions&&Gs(s,u[0],r),u[0];let f=new Lt;r.extensions&&Gs(s,f,r),t.associations.set(f,{meshes:e});for(let d=0,g=u.length;d<g;d++)f.add(u[d]);return f})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Bt(rs.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Ds(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),o=s,a=[],l=[];for(let c=0,h=o.length;c<h;c++){let u=o[c];if(u){a.push(u);let f=new qe;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ho(a,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,f=s.channels.length;u<f;u++){let d=s.channels[u],g=s.samplers[d.sampler],x=d.target,_=x.node,m=s.parameters!==void 0?s.parameters[g.input]:g.input,w=s.parameters!==void 0?s.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",_)),a.push(this.getDependency("accessor",m)),l.push(this.getDependency("accessor",w)),c.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let f=u[0],d=u[1],g=u[2],x=u[3],_=u[4],m=[];for(let M=0,v=f.length;M<v;M++){let A=f[M],b=d[M],p=g[M],y=x[M],I=_[M];if(A===void 0)continue;A.updateMatrix&&A.updateMatrix();let R=n._createAnimationTracks(A,b,p,y,I);if(R)for(let P=0;P<R.length;P++)m.push(R[P])}let w=new Is(r,void 0,m);return gi(w,s),w})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let o=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=s.weights.length;l<c;l++)a.morphTargetInfluences[l]=s.weights[l]}),o})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=s.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){let h=c[0],u=c[1],f=c[2];f!==null&&h.traverse(function(d){d.isSkinnedMesh&&d.bind(f,yM)});for(let d=0,g=u.length;d<g;d++)h.add(u[d]);if(h.userData.pivot!==void 0&&u.length>0){let d=h.userData.pivot,g=u[0];h.pivot=new B().fromArray(d),h.position.x-=d[0],h.position.y-=d[1],h.position.z-=d[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],o=r.name?s.createUniqueName(r.name):"",a=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(r.isBone===!0?h=new xr:c.length>1?h=new Lt:c.length===1?h=c[0]:h=new Et,h!==c[0])for(let u=0,f=c.length;u<f;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=o),gi(h,r),r.extensions&&Gs(n,h,r),r.matrix!==void 0){let u=new qe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);if(!s.associations.has(h))s.associations.set(h,{});else if(r.mesh!==void 0&&s.meshCache.refs[r.mesh]>1){let u=s.associations.get(h);s.associations.set(h,{...u})}return s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new Lt;n.name&&(r.name=s.createUniqueName(n.name)),gi(r,n),n.extensions&&Gs(t,r,n);let o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(s.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++){let f=l[h];f.parent!==null?r.add(Bp(f)):r.add(f)}let c=h=>{let u=new Map;for(let[f,d]of s.associations)(f instanceof zt||f instanceof qt)&&u.set(f,d);return h.traverse(f=>{let d=s.associations.get(f);d!=null&&u.set(f,d)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let o=[],a=e.name?e.name:e.uuid,l=[];function c(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}os[r.path]===os.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(a);let h;switch(os[r.path]){case os.weights:h=Di;break;case os.rotation:h=Ni;break;case os.translation:case os.scale:h=ts;break;default:n.itemSize===1?h=Di:h=ts;break}let u=s.interpolation!==void 0?dM[s.interpolation]:bs,f=this._getArrayFromAccessor(n);for(let d=0,g=l.length;d<g;d++){let x=new h(l[d]+"."+os[r.path],t.array,f,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),o.push(x)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Pu(t.constructor),s=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof Ni?Cu:nc;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var ic,Yp=hn(()=>{Wn();ic=class extends Dt{constructor(e){super(e)}load(e,t,n,s){let r=this,o=new sn(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}parse(e){function t(c){let h=new DataView(c),u=32/8*3+32/8*3*3+16/8,f=h.getUint32(80,!0);if(80+32/8+f*u===h.byteLength)return!0;let g=[115,111,108,105,100];for(let x=0;x<5;x++)if(n(g,h,x))return!1;return!0}function n(c,h,u){for(let f=0,d=c.length;f<d;f++)if(c[f]!==h.getUint8(u+f))return!1;return!0}function s(c){let h=new DataView(c),u=h.getUint32(80,!0),f,d,g,x=!1,_,m,w,M,v;for(let P=0;P<=70;P++)h.getUint32(P,!1)==1129270351&&h.getUint8(P+4)==82&&h.getUint8(P+5)==61&&(x=!0,_=new Float32Array(u*3*3),m=h.getUint8(P+6)/255,w=h.getUint8(P+7)/255,M=h.getUint8(P+8)/255,v=h.getUint8(P+9)/255);let A=84,b=50,p=new at,y=new Float32Array(u*3*3),I=new Float32Array(u*3*3),R=new we;for(let P=0;P<u;P++){let F=A+P*b,z=h.getFloat32(F,!0),C=h.getFloat32(F+4,!0),W=h.getFloat32(F+8,!0);if(x){let X=h.getUint16(F+48,!0);(X&32768)===0?(f=(X&31)/31,d=(X>>5&31)/31,g=(X>>10&31)/31):(f=m,d=w,g=M)}for(let X=1;X<=3;X++){let q=F+X*12,ae=P*3*3+(X-1)*3;y[ae]=h.getFloat32(q,!0),y[ae+1]=h.getFloat32(q+4,!0),y[ae+2]=h.getFloat32(q+8,!0),I[ae]=z,I[ae+1]=C,I[ae+2]=W,x&&(R.setRGB(f,d,g,dt),_[ae]=R.r,_[ae+1]=R.g,_[ae+2]=R.b)}}return p.setAttribute("position",new pt(y,3)),p.setAttribute("normal",new pt(I,3)),x&&(p.setAttribute("color",new pt(_,3)),p.hasColors=!0,p.alpha=v),p}function r(c){let h=new at,u=/solid([\s\S]*?)endsolid/g,f=/facet([\s\S]*?)endfacet/g,d=/solid\s(.+)/,g=0,x=/[\s]+([+-]?(?:\d*)(?:\.\d*)?(?:[eE][+-]?\d+)?)/.source,_=new RegExp("vertex"+x+x+x,"g"),m=new RegExp("normal"+x+x+x,"g"),w=[],M=[],v=[],A=new B,b,p=0,y=0,I=0;for(;(b=u.exec(c))!==null;){y=I;let R=b[0],P=(b=d.exec(R))!==null?b[1]:"";for(v.push(P);(b=f.exec(R))!==null;){let C=0,W=0,X=b[0];for(;(b=m.exec(X))!==null;)A.x=parseFloat(b[1]),A.y=parseFloat(b[2]),A.z=parseFloat(b[3]),W++;for(;(b=_.exec(X))!==null;)w.push(parseFloat(b[1]),parseFloat(b[2]),parseFloat(b[3])),M.push(A.x,A.y,A.z),C++,I++;W!==1&&console.error("THREE.STLLoader: Something isn't right with the normal of face number "+g),C!==3&&console.error("THREE.STLLoader: Something isn't right with the vertices of face number "+g),g++}let F=y,z=I-y;h.userData.groupNames=v,h.addGroup(F,z,p),p++}return h.setAttribute("position",new Je(w,3)),h.setAttribute("normal",new Je(M,3)),h}function o(c){return typeof c!="string"?new TextDecoder().decode(c):c}function a(c){if(typeof c=="string"){let h=new Uint8Array(c.length);for(let u=0;u<c.length;u++)h[u]=c.charCodeAt(u)&255;return h.buffer||h}else return c}let l=a(e);return t(l)?s(l):r(o(e))}}});function wM(){let i={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,t){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=t!==!1;return}let n=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:t!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){let o=this._finalize(!1);o&&(o.inherited||o.groupCount<=0)&&this.materials.splice(o.index,1);let a={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:o!==void 0?o.smooth:this.smooth,groupStart:o!==void 0?o.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(l){let c={index:typeof l=="number"?l:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return c.clone=this.clone.bind(c),c}};return this.materials.push(a),a},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){let r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let o=this.materials.length-1;o>=0;o--)this.materials[o].groupCount<=0&&this.materials.splice(o,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},n&&n.name&&typeof n.clone=="function"){let s=n.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseNormalIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/3)*3},parseUVIndex:function(e,t){let n=parseInt(e,10);return(n>=0?n-1:n+t/2)*2},addVertex:function(e,t,n){let s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addVertexPoint:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addVertexLine:function(e){let t=this.vertices;this.object.geometry.vertices.push(t[e+0],t[e+1],t[e+2])},addNormal:function(e,t,n){let s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2])},addFaceNormal:function(e,t,n){let s=this.vertices,r=this.object.geometry.normals;Zp.fromArray(s,e),Du.fromArray(s,t),Kp.fromArray(s,n),qn.subVectors(Kp,Du),jp.subVectors(Zp,Du),qn.cross(jp),qn.normalize(),r.push(qn.x,qn.y,qn.z),r.push(qn.x,qn.y,qn.z),r.push(qn.x,qn.y,qn.z)},addColor:function(e,t,n){let s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2])},addUV:function(e,t,n){let s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1])},addDefaultUV:function(){let e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){let t=this.uvs;this.object.geometry.uvs.push(t[e+0],t[e+1])},addFace:function(e,t,n,s,r,o,a,l,c){let h=this.vertices.length,u=this.parseVertexIndex(e,h),f=this.parseVertexIndex(t,h),d=this.parseVertexIndex(n,h);if(this.addVertex(u,f,d),this.addColor(u,f,d),a!==void 0&&a!==""){let g=this.normals.length;u=this.parseNormalIndex(a,g),f=this.parseNormalIndex(l,g),d=this.parseNormalIndex(c,g),this.addNormal(u,f,d)}else this.addFaceNormal(u,f,d);if(s!==void 0&&s!==""){let g=this.uvs.length;u=this.parseUVIndex(s,g),f=this.parseUVIndex(r,g),d=this.parseUVIndex(o,g),this.addUV(u,f,d),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";let t=this.vertices.length;for(let n=0,s=e.length;n<s;n++){let r=this.parseVertexIndex(e[n],t);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,t){this.object.geometry.type="Line";let n=this.vertices.length,s=this.uvs.length;for(let r=0,o=e.length-1;r<o;r++)this.addVertexLine(this.parseVertexIndex(e[r],n)),this.addVertexLine(this.parseVertexIndex(e[r+1],n));for(let r=0,o=t.length-1;r<o;r++)this.addUVLine(this.parseUVIndex(t[r],s)),this.addUVLine(this.parseUVIndex(t[r+1],s))}};return i.startObject("",!1),i}var MM,SM,bM,TM,sc,Zp,Du,Kp,jp,qn,rc,oc,$p=hn(()=>{Wn();MM=/^[og]\s*(.+)?/,SM=/^mtllib /,bM=/^usemtl /,TM=/^usemap /,sc=/\s+/,Zp=new B,Du=new B,Kp=new B,jp=new B,qn=new B,rc=new we;oc=class extends Dt{constructor(e){super(e),this.materials=null}load(e,t,n,s){let r=this,o=new sn(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}setMaterials(e){return this.materials=e,this}parse(e){let t=new wM;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));let n=e.split(`
`),s=[];for(let a=0,l=n.length;a<l;a++){let c=n[a].trimStart();if(c.length===0)continue;let h=c.charAt(0);if(h!=="#")if(h==="v"){let u=c.split(sc);switch(u[0]){case"v":t.vertices.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3])),u.length>=7?(rc.setRGB(parseFloat(u[4]),parseFloat(u[5]),parseFloat(u[6]),dt),t.colors.push(rc.r,rc.g,rc.b)):t.colors.push(void 0,void 0,void 0);break;case"vn":t.normals.push(parseFloat(u[1]),parseFloat(u[2]),parseFloat(u[3]));break;case"vt":t.uvs.push(parseFloat(u[1]),parseFloat(u[2]));break}}else if(h==="f"){let f=c.slice(1).trim().split(sc),d=[];for(let x=0,_=f.length;x<_;x++){let m=f[x];if(m.length>0){let w=m.split("/");d.push(w)}}let g=d[0];for(let x=1,_=d.length-1;x<_;x++){let m=d[x],w=d[x+1];t.addFace(g[0],m[0],w[0],g[1],m[1],w[1],g[2],m[2],w[2])}}else if(h==="l"){let u=c.substring(1).trim().split(sc),f=[],d=[];if(c.indexOf("/")===-1)f=u;else for(let g=0,x=u.length;g<x;g++){let _=u[g].split("/");_[0]!==""&&f.push(_[0]),_[1]!==""&&d.push(_[1])}t.addLineGeometry(f,d)}else if(h==="p"){let f=c.slice(1).trim().split(sc);t.addPointGeometry(f)}else if((s=MM.exec(c))!==null){let u=(" "+s[0].slice(1).trim()).slice(1);t.startObject(u)}else if(bM.test(c))t.object.startMaterial(c.substring(7).trim(),t.materialLibraries);else if(SM.test(c))t.materialLibraries.push(c.substring(7).trim());else if(TM.test(c))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(s=c.split(" "),s.length>1){let f=s[1].trim().toLowerCase();t.object.smooth=f!=="0"&&f!=="off"}else t.object.smooth=!0;let u=t.object.currentMaterial();u&&(u.smooth=t.object.smooth)}else{if(c==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+c+'"')}}t.finalize();let r=new Lt;if(r.materialLibraries=[].concat(t.materialLibraries),!(t.objects.length===1&&t.objects[0].geometry.vertices.length===0)===!0)for(let a=0,l=t.objects.length;a<l;a++){let c=t.objects[a],h=c.geometry,u=c.materials,f=h.type==="Line",d=h.type==="Points",g=!1;if(h.vertices.length===0)continue;let x=new at;x.setAttribute("position",new Je(h.vertices,3)),h.normals.length>0&&x.setAttribute("normal",new Je(h.normals,3)),h.colors.length>0&&(g=!0,x.setAttribute("color",new Je(h.colors,3))),h.hasUVIndices===!0&&x.setAttribute("uv",new Je(h.uvs,2));let _=[];for(let w=0,M=u.length;w<M;w++){let v=u[w],A=v.name+"_"+v.smooth+"_"+g,b=t.materials[A];if(this.materials!==null){if(b=this.materials.create(v.name),f&&b&&!(b instanceof jt)){let p=new jt;zt.prototype.copy.call(p,b),p.color.copy(b.color),b=p}else if(d&&b&&!(b instanceof Pn)){let p=new Pn({size:10,sizeAttenuation:!1});zt.prototype.copy.call(p,b),p.color.copy(b.color),p.map=b.map,b=p}}b===void 0&&(f?b=new jt:d?b=new Pn({size:1,sizeAttenuation:!1}):b=new Ln,b.name=v.name,b.flatShading=!v.smooth,b.vertexColors=g,t.materials[A]=b),_.push(b)}let m;if(_.length>1){for(let w=0,M=u.length;w<M;w++){let v=u[w];x.addGroup(v.groupStart,v.groupCount,w)}f?m=new In(x,_):d?m=new ei(x,_):m=new ht(x,_)}else f?m=new In(x,_[0]):d?m=new ei(x,_[0]):m=new ht(x,_[0]);m.name=c.name,r.add(m)}else if(t.vertices.length>0){let a=new Pn({size:1,sizeAttenuation:!1}),l=new at;l.setAttribute("position",new Je(t.vertices,3)),t.colors.length>0&&t.colors[0]!==void 0&&(l.setAttribute("color",new Je(t.colors,3)),a.vertexColors=!0);let c=new ei(l,a);r.add(c)}return r}}});var ac,Nu,Jp=hn(()=>{Wn();ac=class extends Dt{constructor(e){super(e)}load(e,t,n,s){let r=this,o=this.path===""?ti.extractUrlBase(e):this.path,a=new sn(this.manager);a.setPriority(this.priority),a.setCache(this.cache),a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(l){try{t(r.parse(l,o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},n,s)}setMaterialOptions(e){return this.materialOptions=e,this}parse(e,t){let n=e.split(`
`),s={},r=/\s+/,o={};for(let l=0;l<n.length;l++){let c=n[l];if(c=c.trim(),c.length===0||c.charAt(0)==="#")continue;let h=c.indexOf(" "),u=h>=0?c.substring(0,h):c;u=u.toLowerCase();let f=h>=0?c.substring(h+1):"";if(f=f.trim(),u==="newmtl")s={name:f},o[f]=s;else if(u==="ka"||u==="kd"||u==="ks"||u==="ke"){let d=f.split(r,3);s[u]=[parseFloat(d[0]),parseFloat(d[1]),parseFloat(d[2])]}else s[u]=f}let a=new Nu(this.resourcePath||t,this.materialOptions);return a.setCrossOrigin(this.crossOrigin),a.setManager(this.manager),a.priority=this.priority,a.cache=this.cache,a.setMaterials(o),a}},Nu=class{constructor(e="",t={}){this.baseUrl=e,this.options=t,this.materialsInfo={},this.materials={},this.materialsArray=[],this.nameLookup={},this.crossOrigin="anonymous",this.priority="auto",this.cache="default",this.side=this.options.side!==void 0?this.options.side:Hn,this.wrap=this.options.wrap!==void 0?this.options.wrap:dn}setCrossOrigin(e){return this.crossOrigin=e,this}setManager(e){this.manager=e}setMaterials(e){this.materialsInfo=this.convert(e),this.materials={},this.materialsArray=[],this.nameLookup={}}convert(e){if(!this.options)return e;let t={};for(let n in e){let s=e[n],r={};t[n]=r;for(let o in s){let a=!0,l=s[o],c=o.toLowerCase();switch(c){case"kd":case"ka":case"ks":this.options&&this.options.normalizeRGB&&(l=[l[0]/255,l[1]/255,l[2]/255]),this.options&&this.options.ignoreZeroRGBs&&l[0]===0&&l[1]===0&&l[2]===0&&(a=!1);break;default:break}a&&(r[c]=l)}}return t}preload(){for(let e in this.materialsInfo)this.create(e)}getIndex(e){return this.nameLookup[e]}getAsArray(){let e=0;for(let t in this.materialsInfo)this.materialsArray[e]=this.create(t),this.nameLookup[t]=e,e++;return this.materialsArray}create(e){return this.materials[e]===void 0&&this.createMaterial_(e),this.materials[e]}createMaterial_(e){let t=this,n=this.materialsInfo[e],s={name:e,side:this.side};function r(a,l){return typeof l!="string"||l===""?"":/^https?:\/\//i.test(l)?l:a+l}function o(a,l){if(s[a])return;let c=t.getTextureParams(l,s),h=t.loadTexture(r(t.baseUrl,c.url));h.repeat.copy(c.scale),h.offset.copy(c.offset),h.wrapS=t.wrap,h.wrapT=t.wrap,(a==="map"||a==="emissiveMap")&&(h.colorSpace=dt),s[a]=h}for(let a in n){let l=n[a],c;if(l!=="")switch(a.toLowerCase()){case"kd":s.color=et.colorSpaceToWorking(new we().fromArray(l),dt);break;case"ks":s.specular=et.colorSpaceToWorking(new we().fromArray(l),dt);break;case"ke":s.emissive=et.colorSpaceToWorking(new we().fromArray(l),dt);break;case"map_kd":o("map",l);break;case"map_ks":o("specularMap",l);break;case"map_ke":o("emissiveMap",l);break;case"norm":o("normalMap",l);break;case"map_bump":case"bump":o("bumpMap",l);break;case"disp":o("displacementMap",l);break;case"map_d":o("alphaMap",l),s.transparent=!0;break;case"ns":s.shininess=parseFloat(l);break;case"d":c=parseFloat(l),c<1&&(s.opacity=c,s.transparent=!0);break;case"tr":c=parseFloat(l),this.options&&this.options.invertTrProperty&&(c=1-c),c>0&&(s.opacity=1-c,s.transparent=!0);break;default:break}}return this.materials[e]=new Ln(s),this.materials[e]}getTextureParams(e,t){let n={scale:new Ge(1,1),offset:new Ge(0,0)},s=e.split(/\s+/),r;return r=s.indexOf("-bm"),r>=0&&(t.bumpScale=parseFloat(s[r+1]),s.splice(r,2)),r=s.indexOf("-mm"),r>=0&&(t.displacementBias=parseFloat(s[r+1]),t.displacementScale=parseFloat(s[r+2]),s.splice(r,3)),r=s.indexOf("-s"),r>=0&&(n.scale.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),r=s.indexOf("-o"),r>=0&&(n.offset.set(parseFloat(s[r+1]),parseFloat(s[r+2])),s.splice(r,4)),n.url=s.join(" ").trim(),n}loadTexture(e,t,n,s,r){let o=this.manager!==void 0?this.manager:Xl,a=o.getHandler(e);a===null&&(a=new Fi(o),a.setPriority(this.priority),a.setCache(this.cache)),a.setCrossOrigin&&a.setCrossOrigin(this.crossOrigin);let l=a.load(e,n,s,r);return t!==void 0&&(l.mapping=t),l}}});var si,lc,Uu,Fu,Qp=hn(()=>{Wn();si=new we,lc=class extends Dt{constructor(e){super(e),this.propertyNameMapping={},this.customPropertyMapping={}}load(e,t,n,s){let r=this,o=new sn(this.manager);o.setPriority(this.priority),o.setCache(this.cache),o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}setPropertyNameMapping(e){this.propertyNameMapping=e}setCustomPropertyNameMapping(e){this.customPropertyMapping=e}parse(e){function t(M,v=0){let A=/^ply([\s\S]*)end_header(\r\n|\r|\n)/,b="",p=A.exec(M);p!==null&&(b=p[1]);let y={comments:[],elements:[],headerLength:v,objInfo:""},I=b.split(/\r\n|\r|\n/),R;function P(F,z){let C={type:F[0]};return C.type==="list"?(C.name=F[3],C.countType=F[1],C.itemType=F[2]):C.name=F[1],C.name in z&&(C.name=z[C.name]),C}for(let F=0;F<I.length;F++){let z=I[F];if(z=z.trim(),z==="")continue;let C=z.split(/\s+/),W=C.shift();switch(z=C.join(" "),W){case"format":y.format=C[0],y.version=C[1];break;case"comment":y.comments.push(z);break;case"element":R!==void 0&&y.elements.push(R),R={},R.name=C[0],R.count=parseInt(C[1]),R.properties=[];break;case"property":R.properties.push(P(C,w.propertyNameMapping));break;case"obj_info":y.objInfo=z;break;default:console.log("unhandled",W,C)}}return R!==void 0&&y.elements.push(R),y}function n(M,v){switch(v){case"char":case"uchar":case"short":case"ushort":case"int":case"uint":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":return parseInt(M);case"float":case"double":case"float32":case"float64":return parseFloat(M)}}function s(M,v){let A={};for(let b=0;b<M.length;b++){if(v.empty())return null;if(M[b].type==="list"){let p=[],y=n(v.next(),M[b].countType);for(let I=0;I<y;I++){if(v.empty())return null;p.push(n(v.next(),M[b].itemType))}A[M[b].name]=p}else A[M[b].name]=n(v.next(),M[b].type)}return A}function r(){let M={indices:[],vertices:[],normals:[],uvs:[],faceVertexUvs:[],colors:[],faceVertexColors:[],descriptors:{}};for(let v of Object.keys(w.customPropertyMapping))M[v]=[];return M}function o(M){switch(M){case"int8":case"char":return ro;case"uint8":case"uchar":return oo;case"int16":case"short":return ao;case"uint16":case"ushort":return As;case"int32":case"int":return lo;case"uint32":case"uint":return Es;case"float32":case"float":return Je;case"float64":case"double":return Uu}}function a(M){switch(M){case"uchar":case"uint8":return 1/255;case"ushort":case"uint16":return 1/65535;case"float":case"float32":case"double":case"float64":return 1;default:return 1/255}}function l(M){return M==="float"||M==="float32"||M==="double"||M==="float64"}function c(M){function v(ae){for(let Z of ae){let se=M.find(le=>le.name===Z);if(se)return se}return null}let A=v(["x","px","posx"]),b=v(["y","py","posy"]),p=v(["z","pz","posz"]),y=v(["nx","normalx"]),I=v(["ny","normaly"]),R=v(["nz","normalz"]),P=v(["s","u","texture_u","tx"]),F=v(["t","v","texture_v","ty"]),z=v(["red","diffuse_red","r","diffuse_r"]),C=v(["green","diffuse_green","g","diffuse_g"]),W=v(["blue","diffuse_blue","b","diffuse_b"]),X=v(["texcoord"]),q={};for(let ae of Object.keys(w.customPropertyMapping)){let se=w.customPropertyMapping[ae].map(Ue=>M.find(ee=>ee.name===Ue)),le=se.filter(Ue=>Ue).map(Ue=>Ue.type),Le=le.length>0&&le.every(Ue=>Ue===le[0]);q[ae]={type:Le?le[0]:"float32",usage:se.every(Ue=>Ue!==void 0)}}return{position:{names:[A?A.name:"x",b?b.name:"y",p?p.name:"z"],type:A?A.type:"float32",usage:!!(A&&b&&p)},normal:{names:[y?y.name:"nx",I?I.name:"ny",R?R.name:"nz"],type:y?y.type:"float32",usage:!!(y&&I&&R)},uv:{names:[P?P.name:"s",F?F.name:"t"],type:P?P.type:"float32",usage:!!(P&&F)},texcoord:{type:X?X.itemType:"float32",usage:!!X},color:{names:[z?z.name:"red",C?C.name:"green",W?W.name:"blue"],type:z?z.type:"uchar",usage:!!(z&&C&&W)},custom:q}}function h(M,v){let A=r(),b=/end_header\s+(\S[\s\S]*\S|\S)\s*$/,p,y;(y=b.exec(M))!==null?p=y[1].split(/\s+/):p=[];let I=new Fu(p);e:for(let R=0;R<v.elements.length;R++){let P=v.elements[R],F=c(P.properties);A.descriptors[P.name]=F;for(let z=0;z<P.count;z++){let C=s(P.properties,I);if(!C)break e;f(A,P.name,C,F)}}return u(A)}function u(M){let v=new at,A=M.descriptors.vertex;M.indices.length>0&&v.setIndex(M.indices);let b=o(A?A.position.type:"float32");if(v.setAttribute("position",new b(M.vertices,3)),M.normals.length>0){let p=o(A.normal.type);v.setAttribute("normal",new p(M.normals,3))}if(M.uvs.length>0){let p=o(A.uv.type);v.setAttribute("uv",new p(M.uvs,2))}if(M.colors.length>0){let p=A.color.type,y=!l(p),I=o(p);v.setAttribute("color",new I(M.colors,3,y))}for(let p of Object.keys(w.customPropertyMapping))if(M[p].length>0){let y=o(A.custom[p].type);v.setAttribute(p,new y(M[p],w.customPropertyMapping[p].length))}if(M.faceVertexUvs.length>0||M.faceVertexColors.length>0){if(v=v.toNonIndexed(),M.faceVertexUvs.length>0){let p=o(M.descriptors.face.texcoord.type);v.setAttribute("uv",new p(M.faceVertexUvs,2))}if(M.faceVertexColors.length>0){let p=M.descriptors.face.color.type,y=!l(p),I=o(p);v.setAttribute("color",new I(M.faceVertexColors,3,y))}}return v.computeBoundingSphere(),v}function f(M,v,A,b){if(v==="vertex"){let{position:p,normal:y,uv:I,color:R}=b;if(p.usage&&M.vertices.push(A[p.names[0]],A[p.names[1]],A[p.names[2]]),y.usage&&M.normals.push(A[y.names[0]],A[y.names[1]],A[y.names[2]]),I.usage&&M.uvs.push(A[I.names[0]],A[I.names[1]]),R.usage){let P=a(R.type),F=l(R.type);si.setRGB(A[R.names[0]]*P,A[R.names[1]]*P,A[R.names[2]]*P,dt);let z=1/P;M.colors.push(F?si.r:Math.round(si.r*z),F?si.g:Math.round(si.g*z),F?si.b:Math.round(si.b*z))}for(let P of Object.keys(w.customPropertyMapping))for(let F of w.customPropertyMapping[P])M[P].push(A[F])}else if(v==="face"){let p=A.vertex_indices||A.vertex_index,y=A.texcoord;p.length===3?(M.indices.push(p[0],p[1],p[2]),y&&y.length===6&&(M.faceVertexUvs.push(y[0],y[1]),M.faceVertexUvs.push(y[2],y[3]),M.faceVertexUvs.push(y[4],y[5]))):p.length===4&&(M.indices.push(p[0],p[1],p[2]),M.indices.push(p[0],p[2],p[3]),y&&y.length===8&&(M.faceVertexUvs.push(y[0],y[1]),M.faceVertexUvs.push(y[2],y[3]),M.faceVertexUvs.push(y[4],y[5]),M.faceVertexUvs.push(y[0],y[1]),M.faceVertexUvs.push(y[4],y[5]),M.faceVertexUvs.push(y[6],y[7])));let{color:I}=b;if(I.usage){let R=a(I.type);si.setRGB(A[I.names[0]]*R,A[I.names[1]]*R,A[I.names[2]]*R,dt);let P=1/R,F=si.r*P,z=si.g*P,C=si.b*P;M.faceVertexColors.push(F,z,C),M.faceVertexColors.push(F,z,C),M.faceVertexColors.push(F,z,C),p.length===4&&(M.faceVertexColors.push(F,z,C),M.faceVertexColors.push(F,z,C),M.faceVertexColors.push(F,z,C))}}}function d(M,v){let A={},b=0;for(let p=0;p<v.length;p++){let y=v[p],I=y.valueReader;if(y.type==="list"){let R=[],P=y.countReader.read(M+b);b+=y.countReader.size;for(let F=0;F<P;F++)R.push(I.read(M+b)),b+=I.size;A[y.name]=R}else A[y.name]=I.read(M+b),b+=I.size}return[A,b]}function g(M,v,A){function b(p,y,I){switch(y){case"int8":case"char":return{read:R=>p.getInt8(R),size:1};case"uint8":case"uchar":return{read:R=>p.getUint8(R),size:1};case"int16":case"short":return{read:R=>p.getInt16(R,I),size:2};case"uint16":case"ushort":return{read:R=>p.getUint16(R,I),size:2};case"int32":case"int":return{read:R=>p.getInt32(R,I),size:4};case"uint32":case"uint":return{read:R=>p.getUint32(R,I),size:4};case"float32":case"float":return{read:R=>p.getFloat32(R,I),size:4};case"float64":case"double":return{read:R=>p.getFloat64(R,I),size:8}}}for(let p=0,y=M.length;p<y;p++){let I=M[p];I.type==="list"?(I.countReader=b(v,I.countType,A),I.valueReader=b(v,I.itemType,A)):I.valueReader=b(v,I.type,A)}}function x(M,v){let A=r(),b=v.format==="binary_little_endian",p=new DataView(M,v.headerLength),y,I=0;for(let R=0;R<v.elements.length;R++){let P=v.elements[R],F=P.properties,z=c(F);A.descriptors[P.name]=z,g(F,p,b);for(let C=0;C<P.count;C++){y=d(I,F),I+=y[1];let W=y[0];f(A,P.name,W,z)}}return u(A)}function _(M){let v=0,A=!0,b="",p=[],y=new TextDecoder().decode(M.subarray(0,5)),I=/^ply\r\n/.test(y);do{let R=String.fromCharCode(M[v++]);R!==`
`&&R!=="\r"?b+=R:(b==="end_header"&&(A=!1),b!==""&&(p.push(b),b=""))}while(A&&v<M.length);return I===!0&&v++,{headerText:p.join("\r")+"\r",headerLength:v}}let m,w=this;if(e instanceof ArrayBuffer){let M=new Uint8Array(e),{headerText:v,headerLength:A}=_(M),b=t(v,A);if(b.format==="ascii"){let p=new TextDecoder().decode(M);m=h(p,b)}else m=x(e,b)}else m=h(e,t(e));return m}},Uu=class extends pt{constructor(e,t,n){super(new Float64Array(e),t,n)}},Fu=class{constructor(e){this.arr=e,this.i=0}empty(){return this.i>=this.arr.length}next(){return this.arr[this.i++]}}});function FM(i,e){return NM(i,{i:2},e&&e.out,e&&e.dictionary)}function zM(i,e){if(e){for(var t="",n=0;n<i.length;n+=16384)t+=String.fromCharCode.apply(null,i.subarray(n,n+16384));return t}else{if(Gu)return Gu.decode(i);var s=BM(i),r=s.s,t=s.r;return t.length&&Nn(8),r}}function am(i,e){for(var t={},n=i.length-22;Yn(i,n)!=101010256;--n)(!n||i.length-n>65558)&&Nn(13);var s=_i(i,n+8);if(!s)return{};var r=Yn(i,n+16),o=Yn(i,n-20)==117853008;if(o){var a=Yn(i,n-12);o=Yn(i,a)==101075792,o&&(s=Yn(i,a+32),r=Yn(i,a+48))}for(var l=e&&e.filter,c=0;c<s;++c){var h=GM(i,r,o),u=h[0],f=h[1],d=h[2],g=h[3],x=h[4],_=h[5],m=kM(i,_);r=x,(!l||l({name:g,size:f,originalSize:d,compression:u}))&&(u?u==8?t[g]=FM(i.subarray(m,m+f),{out:new Un(d)}):Nn(14,"unknown compression type "+u):t[g]=Hu(i,m,m+f))}return t}var Un,Ur,AM,em,tm,EM,nm,im,sm,RM,rm,CM,Mw,ku,zi,yt,qo,Yo,yt,yt,yt,yt,om,yt,IM,PM,Ou,ri,Bu,LM,Hu,DM,Nn,NM,UM,_i,Yn,zu,Gu,OM,BM,kM,GM,HM,lm=hn(()=>{Un=Uint8Array,Ur=Uint16Array,AM=Int32Array,em=new Un([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),tm=new Un([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),EM=new Un([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),nm=function(i,e){for(var t=new Ur(31),n=0;n<31;++n)t[n]=e+=1<<i[n-1];for(var s=new AM(t[30]),n=1;n<30;++n)for(var r=t[n];r<t[n+1];++r)s[r]=r-t[n]<<5|n;return{b:t,r:s}},im=nm(em,2),sm=im.b,RM=im.r;sm[28]=258,RM[258]=28;rm=nm(tm,0),CM=rm.b,Mw=rm.r,ku=new Ur(32768);for(yt=0;yt<32768;++yt)zi=(yt&43690)>>1|(yt&21845)<<1,zi=(zi&52428)>>2|(zi&13107)<<2,zi=(zi&61680)>>4|(zi&3855)<<4,ku[yt]=((zi&65280)>>8|(zi&255)<<8)>>1;qo=(function(i,e,t){for(var n=i.length,s=0,r=new Ur(e);s<n;++s)i[s]&&++r[i[s]-1];var o=new Ur(e);for(s=1;s<e;++s)o[s]=o[s-1]+r[s-1]<<1;var a;if(t){a=new Ur(1<<e);var l=15-e;for(s=0;s<n;++s)if(i[s])for(var c=s<<4|i[s],h=e-i[s],u=o[i[s]-1]++<<h,f=u|(1<<h)-1;u<=f;++u)a[ku[u]>>l]=c}else for(a=new Ur(n),s=0;s<n;++s)i[s]&&(a[s]=ku[o[i[s]-1]++]>>15-i[s]);return a}),Yo=new Un(288);for(yt=0;yt<144;++yt)Yo[yt]=8;for(yt=144;yt<256;++yt)Yo[yt]=9;for(yt=256;yt<280;++yt)Yo[yt]=7;for(yt=280;yt<288;++yt)Yo[yt]=8;om=new Un(32);for(yt=0;yt<32;++yt)om[yt]=5;IM=qo(Yo,9,1),PM=qo(om,5,1),Ou=function(i){for(var e=i[0],t=1;t<i.length;++t)i[t]>e&&(e=i[t]);return e},ri=function(i,e,t){var n=e/8|0;return(i[n]|i[n+1]<<8)>>(e&7)&t},Bu=function(i,e){var t=e/8|0;return(i[t]|i[t+1]<<8|i[t+2]<<16)>>(e&7)},LM=function(i){return(i+7)/8|0},Hu=function(i,e,t){return(e==null||e<0)&&(e=0),(t==null||t>i.length)&&(t=i.length),new Un(i.subarray(e,t))},DM=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Nn=function(i,e,t){var n=new Error(e||DM[i]);if(n.code=i,Error.captureStackTrace&&Error.captureStackTrace(n,Nn),!t)throw n;return n},NM=function(i,e,t,n){var s=i.length,r=n?n.length:0;if(!s||e.f&&!e.l)return t||new Un(0);var o=!t,a=o||e.i!=2,l=e.i;o&&(t=new Un(s*3));var c=function(G){var j=t.length;if(G>j){var Y=new Un(Math.max(j*2,G));Y.set(t),t=Y}},h=e.f||0,u=e.p||0,f=e.b||0,d=e.l,g=e.d,x=e.m,_=e.n,m=s*8;do{if(!d){h=ri(i,u,1);var w=ri(i,u+1,3);if(u+=3,w)if(w==1)d=IM,g=PM,x=9,_=5;else if(w==2){var b=ri(i,u,31)+257,p=ri(i,u+10,15)+4,y=b+ri(i,u+5,31)+1;u+=14;for(var I=new Un(y),R=new Un(19),P=0;P<p;++P)R[EM[P]]=ri(i,u+P*3,7);u+=p*3;for(var F=Ou(R),z=(1<<F)-1,C=qo(R,F,1),P=0;P<y;){var W=C[ri(i,u,z)];u+=W&15;var M=W>>4;if(M<16)I[P++]=M;else{var X=0,q=0;for(M==16?(q=3+ri(i,u,3),u+=2,X=I[P-1]):M==17?(q=3+ri(i,u,7),u+=3):M==18&&(q=11+ri(i,u,127),u+=7);q--;)I[P++]=X}}var ae=I.subarray(0,b),Z=I.subarray(b);x=Ou(ae),_=Ou(Z),d=qo(ae,x,1),g=qo(Z,_,1)}else Nn(1);else{var M=LM(u)+4,v=i[M-4]|i[M-3]<<8,A=M+v;if(A>s){l&&Nn(0);break}a&&c(f+v),t.set(i.subarray(M,A),f),e.b=f+=v,e.p=u=A*8,e.f=h;continue}if(u>m){l&&Nn(0);break}}a&&c(f+131072);for(var se=(1<<x)-1,le=(1<<_)-1,Le=u;;Le=u){var X=d[Bu(i,u)&se],Ue=X>>4;if(u+=X&15,u>m){l&&Nn(0);break}if(X||Nn(2),Ue<256)t[f++]=Ue;else if(Ue==256){Le=u,d=null;break}else{var ee=Ue-254;if(Ue>264){var P=Ue-257,Me=em[P];ee=ri(i,u,(1<<Me)-1)+sm[P],u+=Me}var Pe=g[Bu(i,u)&le],Ve=Pe>>4;Pe||Nn(3),u+=Pe&15;var Z=CM[Ve];if(Ve>3){var Me=tm[Ve];Z+=Bu(i,u)&(1<<Me)-1,u+=Me}if(u>m){l&&Nn(0);break}a&&c(f+131072);var D=f+ee;if(f<Z){var N=r-Z,$=Math.min(Z,D);for(N+f<0&&Nn(3);f<$;++f)t[f]=n[N+f]}for(;f<D;++f)t[f]=t[f-Z]}}e.l=d,e.p=Le,e.b=f,e.f=h,d&&(h=1,e.m=x,e.d=g,e.n=_)}while(!h);return f!=t.length&&o?Hu(t,0,f):t.subarray(0,f)},UM=new Un(0),_i=function(i,e){return i[e]|i[e+1]<<8},Yn=function(i,e){return(i[e]|i[e+1]<<8|i[e+2]<<16|i[e+3]<<24)>>>0},zu=function(i,e){return Yn(i,e)+Yn(i,e+4)*4294967296};Gu=typeof TextDecoder<"u"&&new TextDecoder,OM=0;try{Gu.decode(UM,{stream:!0}),OM=1}catch{}BM=function(i){for(var e="",t=0;;){var n=i[t++],s=(n>127)+(n>223)+(n>239);if(t+s>i.length)return{s:e,r:Hu(i,t-1)};s?s==3?(n=((n&15)<<18|(i[t++]&63)<<12|(i[t++]&63)<<6|i[t++]&63)-65536,e+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?e+=String.fromCharCode((n&31)<<6|i[t++]&63):e+=String.fromCharCode((n&15)<<12|(i[t++]&63)<<6|i[t++]&63):e+=String.fromCharCode(n)}};kM=function(i,e){return e+30+_i(i,e+26)+_i(i,e+28)},GM=function(i,e,t){var n=_i(i,e+28),s=_i(i,e+30),r=zM(i.subarray(e+46,e+46+n),!(_i(i,e+8)&2048)),o=e+46+n,a=HM(i,o,s,t,Yn(i,e+20),Yn(i,e+24),Yn(i,e+42)),l=a[0],c=a[1],h=a[2];return[_i(i,e+10),l,c,r,o+s+_i(i,e+32),h]},HM=function(i,e,t,n,s,r,o){var a=s==4294967295,l=r==4294967295,c=o==4294967295,h=e+t,u=a+l+c;if(n&&u){for(;e+4<h;e+=4+_i(i,e+2))if(_i(i,e)==1)return[a?zu(i,e+4+8*l):s,l?zu(i,e+4):r,c?zu(i,e+4+8*(l+a)):o,1];n<2&&Nn(13)}return[s,r,o,0]}});var Vu,cm,Wu,cc,hm=hn(()=>{Wn();lm();Ql();Vu=dt,cm="http://schemas.microsoft.com/3dmanufacturing/beamlattice/2017/02",Wu="http://schemas.microsoft.com/3dmanufacturing/beamlattice/balls/2020/07",cc=class extends Dt{constructor(e){super(e),this.availableExtensions=[]}load(e,t,n,s){let r=this,o=new sn(r.manager);o.setPriority(r.priority),o.setCache(r.cache),o.setPath(r.path),o.setResponseType("arraybuffer"),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(a))}catch(l){s?s(l):console.error(l),r.manager.itemError(e)}},n,s)}parse(e){let t=this,n=new Fi(this.manager);n.setPriority(this.priority),n.setCache(this.cache);function s(D){let N=null,$=null,G,j,Y=[],J=[],he,oe={},ue={},Re={},pe=new TextDecoder;try{N=am(new Uint8Array(D))}catch(U){if(U instanceof ReferenceError)return console.error("THREE.3MFLoader: fflate missing and file is compressed."),null}let $e=null;for($ in N)$.match(/\_rels\/.rels$/)?G=$:$.match(/3D\/_rels\/.*\.model\.rels$/)?j=$:$.match(/^3D\/[^\/]*\.model$/)?$e=$:$.match(/^3D\/.*\/[^\/]*\.model$/)?Y.push($):$.match(/^3D\/Textures?\/.*/)&&J.push($);if(Y.push($e),G===void 0)throw new Error("THREE.ThreeMFLoader: Cannot find relationship file `rels` in 3MF archive.");let tt=N[G],ut=pe.decode(tt),mt=r(ut);if(j){let U=N[j],Ce=pe.decode(U);he=r(Ce)}for(let U=0;U<Y.length;U++){let Ce=Y[U],De=N[Ce],Ye=pe.decode(De),ge=new DOMParser().parseFromString(Ye,"application/xml");ge.documentElement.nodeName.toLowerCase()!=="model"&&console.error("THREE.3MFLoader: Error loading 3MF - no 3MF document found: ",Ce);let gt=ge.querySelector("model"),Be={};for(let E=0;E<gt.attributes.length;E++){let S=gt.attributes[E];S.name.match(/^xmlns:(.+)$/)&&(Be[S.value]=RegExp.$1)}let ke=p(gt);ke.xml=gt,0<Object.keys(Be).length&&(ke.extensions=Be),oe[Ce]=ke}for(let U=0;U<J.length;U++){let Ce=J[U];Re[Ce]=N[Ce].buffer}return{rels:mt,modelRels:he,model:oe,printTicket:ue,texture:Re}}function r(D){let N=[],G=new DOMParser().parseFromString(D,"application/xml").querySelectorAll("Relationship");for(let j=0;j<G.length;j++){let Y=G[j],J={target:Y.getAttribute("Target"),id:Y.getAttribute("Id"),type:Y.getAttribute("Type")};N.push(J)}return N}function o(D){let N={};for(let $=0;$<D.length;$++){let G=D[$],j=G.getAttribute("name");0<=["Title","Designer","Description","Copyright","LicenseTerms","Rating","CreationDate","ModificationDate"].indexOf(j)&&(N[j]=G.textContent)}return N}function a(D){let N={id:D.getAttribute("id"),basematerials:[]},$=D.querySelectorAll("base");for(let G=0;G<$.length;G++){let j=$[G],Y=g(j);Y.index=G,N.basematerials.push(Y)}return N}function l(D){return{id:D.getAttribute("id"),path:D.getAttribute("path"),contenttype:D.getAttribute("contenttype"),tilestyleu:D.getAttribute("tilestyleu"),tilestylev:D.getAttribute("tilestylev"),filter:D.getAttribute("filter")}}function c(D){let N={id:D.getAttribute("id"),texid:D.getAttribute("texid"),displaypropertiesid:D.getAttribute("displaypropertiesid")},$=D.querySelectorAll("tex2coord"),G=[];for(let j=0;j<$.length;j++){let Y=$[j],J=Y.getAttribute("u"),he=Y.getAttribute("v");G.push(parseFloat(J),parseFloat(he))}return N.uvs=new Float32Array(G),N}function h(D){let N={id:D.getAttribute("id"),displaypropertiesid:D.getAttribute("displaypropertiesid")},$=D.querySelectorAll("color"),G=[],j=new we;for(let Y=0;Y<$.length;Y++){let he=$[Y].getAttribute("color");j.setStyle(he.substring(0,7),Vu),G.push(j.r,j.g,j.b)}return N.colors=new Float32Array(G),N}function u(D){let N=D.children,$={};for(let G=0;G<N.length;G++){let j={type:N[G].nodeName.substring(2)};for(let Y=0;Y<N[G].attributes.length;Y++){let J=N[G].attributes[Y];J.specified&&(j[J.name]=J.value)}$[N[G].getAttribute("identifier")]=j}return $}function f(D){let N={id:D.getAttribute("id"),displayname:D.getAttribute("displayname")},$=D.children,G={};for(let j=0;j<$.length;j++){let Y=$[j];if(Y.nodeName==="i:in"||Y.nodeName==="i:out")G[Y.nodeName==="i:in"?"inputs":"outputs"]=u(Y);else{let J=Y.children,he={op:Y.nodeName.substring(2),identifier:Y.getAttribute("identifier")};for(let oe=0;oe<J.length;oe++)he[J[oe].nodeName.substring(2)]=u(J[oe]);G[he.identifier]=he}}return N.operations=G,N}function d(D){let N={id:D.getAttribute("id")},$=D.querySelectorAll("pbmetallic"),G=[];for(let j=0;j<$.length;j++){let Y=$[j];G.push({name:Y.getAttribute("name"),metallicness:parseFloat(Y.getAttribute("metallicness")),roughness:parseFloat(Y.getAttribute("roughness"))})}return N.data=G,N}function g(D){let N={};return N.name=D.getAttribute("name"),N.displaycolor=D.getAttribute("displaycolor"),N.displaypropertiesid=D.getAttribute("displaypropertiesid"),N}function x(D){let N={},$=[],G=D.querySelectorAll("vertices vertex");for(let oe=0;oe<G.length;oe++){let ue=G[oe],Re=ue.getAttribute("x"),pe=ue.getAttribute("y"),$e=ue.getAttribute("z");$.push(parseFloat(Re),parseFloat(pe),parseFloat($e))}N.vertices=new Float32Array($);let j=[],Y=[],J=D.querySelectorAll("triangles triangle");for(let oe=0;oe<J.length;oe++){let ue=J[oe],Re=ue.getAttribute("v1"),pe=ue.getAttribute("v2"),$e=ue.getAttribute("v3"),tt=ue.getAttribute("p1"),ut=ue.getAttribute("p2"),mt=ue.getAttribute("p3"),U=ue.getAttribute("pid"),Ce={};Ce.v1=parseInt(Re,10),Ce.v2=parseInt(pe,10),Ce.v3=parseInt($e,10),Y.push(Ce.v1,Ce.v2,Ce.v3),tt&&(Ce.p1=parseInt(tt,10)),ut&&(Ce.p2=parseInt(ut,10)),mt&&(Ce.p3=parseInt(mt,10)),U&&(Ce.pid=U),0<Object.keys(Ce).length&&j.push(Ce)}N.triangleProperties=j,N.triangles=new Uint32Array(Y);let he=D.getElementsByTagNameNS(cm,"beamlattice")[0];return he!==void 0&&(N.beamlattice=_(he)),N}function _(D){let N={radius:parseFloat(D.getAttribute("radius")),minLength:parseFloat(D.getAttribute("minlength")),cap:D.getAttribute("cap")||"sphere",ballMode:D.getAttributeNS(Wu,"ballmode")||"none",ballRadius:parseFloat(D.getAttributeNS(Wu,"ballradius")),beams:[],balls:[]},$=D.getAttribute("clippingmode")||D.getAttribute("clipping");$!==null&&$!=="none"&&console.warn("THREE.3MFLoader: Beam lattice clipping is not supported. The lattice is rendered unclipped.");let G=D.getElementsByTagNameNS(cm,"beam");for(let Y=0;Y<G.length;Y++){let J=G[Y],he={v1:parseInt(J.getAttribute("v1"),10),v2:parseInt(J.getAttribute("v2"),10)},oe=J.getAttribute("r1"),ue=J.getAttribute("r2");oe!==null&&(he.r1=parseFloat(oe)),ue!==null&&(he.r2=parseFloat(ue)),N.beams.push(he)}let j=D.getElementsByTagNameNS(Wu,"ball");for(let Y=0;Y<j.length;Y++){let J=j[Y],he={vindex:parseInt(J.getAttribute("vindex"),10)},oe=J.getAttribute("r");oe!==null&&(he.r=parseFloat(oe)),N.balls.push(he)}return N}function m(D){let N=[],$=D.querySelectorAll("component");for(let G=0;G<$.length;G++){let j=$[G],Y=w(j);N.push(Y)}return N}function w(D){let N={};N.objectId=D.getAttribute("objectid");let $=D.getAttribute("transform");return $&&(N.transform=M($)),N}function M(D){let N=[];D.split(" ").forEach(function(G){N.push(parseFloat(G))});let $=new qe;return $.set(N[0],N[3],N[6],N[9],N[1],N[4],N[7],N[10],N[2],N[5],N[8],N[11],0,0,0,1),$}function v(D){let N={type:D.getAttribute("type")},$=D.getAttribute("id");$&&(N.id=$);let G=D.getAttribute("pid");G&&(N.pid=G);let j=D.getAttribute("pindex");j&&(N.pindex=j);let Y=D.getAttribute("thumbnail");Y&&(N.thumbnail=Y);let J=D.getAttribute("partnumber");J&&(N.partnumber=J);let he=D.getAttribute("name");he&&(N.name=he);let oe=D.querySelector("mesh");oe&&(N.mesh=x(oe));let ue=D.querySelector("components");return ue&&(N.components=m(ue)),N}function A(D){let N={};N.basematerials={};let $=D.querySelectorAll("basematerials");for(let ue=0;ue<$.length;ue++){let Re=$[ue],pe=a(Re);N.basematerials[pe.id]=pe}N.texture2d={};let G=D.querySelectorAll("texture2d");for(let ue=0;ue<G.length;ue++){let Re=G[ue],pe=l(Re);N.texture2d[pe.id]=pe}N.colorgroup={};let j=D.querySelectorAll("colorgroup");for(let ue=0;ue<j.length;ue++){let Re=j[ue],pe=h(Re);N.colorgroup[pe.id]=pe}let Y=D.querySelectorAll("implicitfunction");Y.length>0&&(N.implicitfunction={});for(let ue=0;ue<Y.length;ue++){let Re=Y[ue],pe=f(Re);N.implicitfunction[pe.id]=pe}N.pbmetallicdisplayproperties={};let J=D.querySelectorAll("pbmetallicdisplayproperties");for(let ue=0;ue<J.length;ue++){let Re=J[ue],pe=d(Re);N.pbmetallicdisplayproperties[pe.id]=pe}N.texture2dgroup={};let he=D.querySelectorAll("texture2dgroup");for(let ue=0;ue<he.length;ue++){let Re=he[ue],pe=c(Re);N.texture2dgroup[pe.id]=pe}N.object={};let oe=D.querySelectorAll("object");for(let ue=0;ue<oe.length;ue++){let Re=oe[ue],pe=v(Re);N.object[pe.id]=pe}return N}function b(D){let N=[],$=D.querySelectorAll("item");for(let G=0;G<$.length;G++){let j=$[G],Y={objectId:j.getAttribute("objectid")},J=j.getAttribute("transform");J&&(Y.transform=M(J)),N.push(Y)}return N}function p(D){let N={unit:D.getAttribute("unit")||"millimeter"},$=D.querySelectorAll("metadata");$&&(N.metadata=o($));let G=D.querySelector("resources");G&&(N.resources=A(G));let j=D.querySelector("build");return j&&(N.build=b(j)),N}function y(D,N,$,G){let j=D.texid,J=$.resources.texture2d[j];if(J){let he=G[J.path],oe=J.contenttype,ue=new Blob([he],{type:oe}),Re=URL.createObjectURL(ue),pe=n.load(Re,function(){URL.revokeObjectURL(Re)});switch(pe.colorSpace=Vu,J.tilestyleu){case"wrap":pe.wrapS=dn;break;case"mirror":pe.wrapS=Ei;break;case"none":case"clamp":pe.wrapS=fn;break;default:pe.wrapS=dn}switch(J.tilestylev){case"wrap":pe.wrapT=dn;break;case"mirror":pe.wrapT=Ei;break;case"none":case"clamp":pe.wrapT=fn;break;default:pe.wrapT=dn}switch(J.filter){case"auto":pe.magFilter=Ct,pe.minFilter=_n;break;case"linear":pe.magFilter=Ct,pe.minFilter=Ct,pe.generateMipmaps=!1;break;case"nearest":pe.magFilter=Rt,pe.minFilter=Rt,pe.generateMipmaps=!1;break;default:pe.magFilter=Ct,pe.minFilter=_n}return pe}else return null}function I(D,N,$,G,j,Y,J){let he=J.pindex,oe={};for(let pe=0,$e=N.length;pe<$e;pe++){let tt=N[pe],ut=tt.p1!==void 0?tt.p1:he;oe[ut]===void 0&&(oe[ut]=[]),oe[ut].push(tt)}let ue=Object.keys(oe),Re=[];for(let pe=0,$e=ue.length;pe<$e;pe++){let tt=ue[pe],ut=oe[tt],mt=D.basematerials[tt],U=Z(mt,G,j,Y,J,se),Ce=new at,De=[],Ye=$.vertices;for(let gt=0,Be=ut.length;gt<Be;gt++){let ke=ut[gt];De.push(Ye[ke.v1*3+0]),De.push(Ye[ke.v1*3+1]),De.push(Ye[ke.v1*3+2]),De.push(Ye[ke.v2*3+0]),De.push(Ye[ke.v2*3+1]),De.push(Ye[ke.v2*3+2]),De.push(Ye[ke.v3*3+0]),De.push(Ye[ke.v3*3+1]),De.push(Ye[ke.v3*3+2])}Ce.setAttribute("position",new Je(De,3));let ge=new ht(Ce,U);Re.push(ge)}return Re}function R(D,N,$,G,j,Y,J){let he=new at,oe=[],ue=[],Re=$.vertices,pe=D.uvs;for(let mt=0,U=N.length;mt<U;mt++){let Ce=N[mt];oe.push(Re[Ce.v1*3+0]),oe.push(Re[Ce.v1*3+1]),oe.push(Re[Ce.v1*3+2]),oe.push(Re[Ce.v2*3+0]),oe.push(Re[Ce.v2*3+1]),oe.push(Re[Ce.v2*3+2]),oe.push(Re[Ce.v3*3+0]),oe.push(Re[Ce.v3*3+1]),oe.push(Re[Ce.v3*3+2]),ue.push(pe[Ce.p1*2+0]),ue.push(pe[Ce.p1*2+1]),ue.push(pe[Ce.p2*2+0]),ue.push(pe[Ce.p2*2+1]),ue.push(pe[Ce.p3*2+0]),ue.push(pe[Ce.p3*2+1])}he.setAttribute("position",new Je(oe,3)),he.setAttribute("uv",new Je(ue,2));let $e=Z(D,G,j,Y,J,y),tt=new Ln({map:$e,flatShading:!0});return new ht(he,tt)}function P(D,N,$,G){let j=new at,Y=[],J=[],he=$.vertices,oe=D.colors;for(let pe=0,$e=N.length;pe<$e;pe++){let tt=N[pe],ut=tt.v1,mt=tt.v2,U=tt.v3;Y.push(he[ut*3+0]),Y.push(he[ut*3+1]),Y.push(he[ut*3+2]),Y.push(he[mt*3+0]),Y.push(he[mt*3+1]),Y.push(he[mt*3+2]),Y.push(he[U*3+0]),Y.push(he[U*3+1]),Y.push(he[U*3+2]);let Ce=tt.p1!==void 0?tt.p1:G.pindex,De=tt.p2!==void 0?tt.p2:Ce,Ye=tt.p3!==void 0?tt.p3:Ce;J.push(oe[Ce*3+0]),J.push(oe[Ce*3+1]),J.push(oe[Ce*3+2]),J.push(oe[De*3+0]),J.push(oe[De*3+1]),J.push(oe[De*3+2]),J.push(oe[Ye*3+0]),J.push(oe[Ye*3+1]),J.push(oe[Ye*3+2])}j.setAttribute("position",new Je(Y,3)),j.setAttribute("color",new Je(J,3));let ue=new Ln({vertexColors:!0,flatShading:!0});return new ht(j,ue)}function F(D){let N=new at;N.setIndex(new pt(D.triangles,1)),N.setAttribute("position",new pt(D.vertices,3));let $=new Ln({name:Dt.DEFAULT_MATERIAL_NAME,color:16777215,flatShading:!0});return new ht(N,$)}function z(D){let N=D.beamlattice,$=D.vertices,G=[],j=new B,Y=new B,J=new B,he=new B(0,1,0),oe=new Nt,ue=new qe,Re=N.beams,pe=N.cap!=="butt",$e=new Map;for(let Ce=0;Ce<Re.length;Ce++){let De=Re[Ce];j.fromArray($,De.v1*3),Y.fromArray($,De.v2*3);let Ye=j.distanceTo(Y);if(Ye<N.minLength)continue;let ge=De.r1!==void 0?De.r1:N.radius,gt=De.r2!==void 0?De.r2:ge,Be=new go(gt,ge,Ye,8,1,pe);J.subVectors(Y,j).divideScalar(Ye),oe.setFromUnitVectors(he,J),ue.makeRotationFromQuaternion(oe),ue.setPosition(j.add(Y).multiplyScalar(.5)),Be.applyMatrix4(ue),G.push(Be),pe&&($e.set(De.v1,Math.max(ge,$e.get(De.v1)||0)),$e.set(De.v2,Math.max(gt,$e.get(De.v2)||0))),N.ballMode==="all"&&($e.set(De.v1,Math.max(N.ballRadius,$e.get(De.v1)||0)),$e.set(De.v2,Math.max(N.ballRadius,$e.get(De.v2)||0)))}let tt=N.balls;for(let Ce=0;Ce<tt.length;Ce++){let De=tt[Ce],Ye=De.r!==void 0?De.r:N.ballRadius;$e.set(De.vindex,Math.max(Ye,$e.get(De.vindex)||0))}for(let[Ce,De]of $e){let Ye=new Cs(De,8,6);j.fromArray($,Ce*3),Ye.translate(j.x,j.y,j.z),G.push(Ye)}let ut=Fp(G),mt=new Ln({name:Dt.DEFAULT_MATERIAL_NAME,color:16777215});return new ht(ut,mt)}function C(D,N,$,G,j,Y){let J=Object.keys(D),he=[];for(let oe=0,ue=J.length;oe<ue;oe++){let Re=J[oe],pe=D[Re];switch(W(Re,G)){case"material":let tt=G.resources.basematerials[Re],ut=I(tt,pe,N,$,G,j,Y);for(let Ce=0,De=ut.length;Ce<De;Ce++)he.push(ut[Ce]);break;case"texture":let mt=G.resources.texture2dgroup[Re];he.push(R(mt,pe,N,$,G,j,Y));break;case"vertexColors":let U=G.resources.colorgroup[Re];he.push(P(U,pe,N,Y));break;case"default":he.push(F(N));break;default:console.error("THREE.3MFLoader: Unsupported resource type.")}}if(Y.name)for(let oe=0;oe<he.length;oe++)he[oe].name=Y.name;return he}function W(D,N){return N.resources.texture2dgroup[D]!==void 0?"texture":N.resources.basematerials[D]!==void 0?"material":N.resources.colorgroup[D]!==void 0?"vertexColors":D==="default"?"default":void 0}function X(D,N){let $={},G=D.triangleProperties,j=N.pid;for(let Y=0,J=G.length;Y<J;Y++){let he=G[Y],oe=he.pid!==void 0?he.pid:j;oe===void 0&&(oe="default"),$[oe]===void 0&&($[oe]=[]),$[oe].push(he)}return $}function q(D,N,$,G,j){let Y=new Lt,J=X(D,j),he=C(J,D,N,$,G,j);if(D.beamlattice!==void 0){let oe=z(D);j.name&&(oe.name=j.name),he.push(oe)}for(let oe=0,ue=he.length;oe<ue;oe++)Y.add(he[oe]);return Y}function ae(D,N,$){if(!D)return;let G=[],j=Object.keys(D);for(let Y=0;Y<j.length;Y++){let J=j[Y];for(let he=0;he<t.availableExtensions.length;he++){let oe=t.availableExtensions[he];oe.ns===J&&G.push(oe)}}for(let Y=0;Y<G.length;Y++){let J=G[Y];J.apply($,D[J.ns],N)}}function Z(D,N,$,G,j,Y){return D.build!==void 0||(D.build=Y(D,N,$,G,j)),D.build}function se(D,N,$){let G,j=D.displaypropertiesid,Y=$.resources.pbmetallicdisplayproperties;if(j!==null&&Y[j]!==void 0){let ue=Y[j].data[D.index];G=new vn({flatShading:!0,roughness:ue.roughness,metalness:ue.metallicness})}else G=new Ln({flatShading:!0});G.name=D.name;let J=D.displaycolor,he=J.substring(0,7);return G.color.setStyle(he,Vu),J.length===9&&(G.opacity=parseInt(J.charAt(7)+J.charAt(8),16)/255),G}function le(D,N,$,G){let j=new Lt;for(let Y=0;Y<D.length;Y++){let J=D[Y],he=N[J.objectId];he===void 0&&(Le(J.objectId,N,$,G),he=N[J.objectId]);let oe=he.clone(),ue=J.transform;ue&&oe.applyMatrix4(ue),j.add(oe)}return j}function Le(D,N,$,G){let j=$.resources.object[D];if(j.mesh){let Y=j.mesh,J=$.extensions,he=$.xml;ae(J,Y,he),N[j.id]=Z(Y,N,$,G,j,q)}else{let Y=j.components;N[j.id]=Z(Y,N,$,G,j,le)}j.name&&(N[j.id].name=j.name),$.resources.implicitfunction&&console.warn("THREE.ThreeMFLoader: Implicit Functions are implemented in data-only.",$.resources.implicitfunction)}function Ue(D){let N=D.model,$=D.modelRels,G={},j=Object.keys(N),Y={};if($)for(let J=0,he=$.length;J<he;J++){let oe=$[J],ue=oe.target.substring(1);D.texture[ue]&&(Y[oe.target]=D.texture[ue])}for(let J=0;J<j.length;J++){let he=j[J],oe=N[he],ue=Object.keys(oe.resources.object);for(let Re=0;Re<ue.length;Re++){let pe=ue[Re];Le(pe,G,oe,Y)}}return G}function ee(D){for(let N=0;N<D.length;N++){let $=D[N];if($.target.split(".").pop().toLowerCase()==="model")return $}}function Me(D,N){let $=new Lt,G=ee(N.rels),j=N.model[G.target.substring(1)].build;for(let Y=0;Y<j.length;Y++){let J=j[Y],he=D[J.objectId].clone(),oe=J.transform;oe&&he.applyMatrix4(oe),$.add(he)}return $}let Pe=s(e),Ve=Ue(Pe);return Me(Ve,Pe)}addExtension(e){this.availableExtensions.push(e)}}});var Zo,Ko,um,hc,fm=hn(()=>{Wn();Zo=new B,Ko=new B,um=new Ke,hc=class extends In{constructor(e,t=1,n=16711680){let s=new at,r=e.geometry.attributes.normal.count,o=new Je(r*2*3,3);s.setAttribute("position",o),super(s,new jt({color:n,toneMapped:!1})),this.object=e,this.size=t,this.type="VertexNormalsHelper",this.matrixAutoUpdate=!1,this.isVertexNormalsHelper=!0,this.update()}update(){this.object.updateMatrixWorld(!0),um.getNormalMatrix(this.object.matrixWorld);let e=this.object.matrixWorld,t=this.geometry.attributes.position,n=this.object.geometry;if(n){let s=n.attributes.position,r=n.attributes.normal,o=0;for(let a=0,l=s.count;a<l;a++)Zo.fromBufferAttribute(s,a).applyMatrix4(e),Ko.fromBufferAttribute(r,a),Ko.applyMatrix3(um).normalize().multiplyScalar(this.size).add(Zo),t.setXYZ(o,Zo.x,Zo.y,Zo.z),o=o+1,t.setXYZ(o,Ko.x,Ko.y,Ko.z),o=o+1}t.needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}}});function Fr(i){return new xo({color:0,emissive:16777215,emissiveIntensity:i})}var uc,dm=hn(()=>{Wn();uc=class extends ws{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new es;e.deleteAttribute("uv");let t=new vn({side:$t}),n=new vn,s=new Ls(16777215,900,28,2);s.position.set(.418,16.199,.3),this.add(s);let r=new ht(e,t);r.position.set(-.757,13.219,.717),r.scale.set(31.713,28.305,28.591),this.add(r);let o=new Rs(e,n,6),a=new Et;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);let l=new ht(e,Fr(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);let c=new ht(e,Fr(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);let h=new ht(e,Fr(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);let u=new ht(e,Fr(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);let f=new ht(e,Fr(20));f.position.set(3.235,11.486,-12.541),f.scale.set(2.5,2,.1),this.add(f);let d=new ht(e,Fr(100));d.position.set(0,20,0),d.scale.set(1,.1,1),this.add(d)}dispose(){let e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(let t of e)t.dispose()}}});var _m=na((Pw,gm)=>{"use strict";function pm(i,e){let t=i.attributes&&i.attributes.position;if(!t||e.isPoints||e.isLine)return 0;let n=i.index?i.index.count:t.count,s=i.drawRange&&Number.isFinite(i.drawRange.count)?Math.min(i.drawRange.count,n):n;return Math.floor(s/3)}function VM(i,e){let t=new Set,n=new Set,s=new Set,r={meshes:0,pointClouds:0,vertices:0,triangles:0,pointCount:0,materials:0,textures:0,nodes:0,animations:(e||[]).length,hasColors:!1,hasUVs:!1,skinned:0,instanced:0};return i.traverse(o=>{if(r.nodes++,!o.geometry||!(o.isMesh||o.isPoints))return;let a=o.geometry,l=a.attributes&&a.attributes.position;if(!l)return;let c=o.isInstancedMesh?Math.max(1,o.count|0):1;o.isInstancedMesh&&r.instanced++,o.isSkinnedMesh&&r.skinned++,o.isPoints?(r.pointClouds++,r.pointCount+=l.count*c):(r.meshes++,r.vertices+=l.count*c,r.triangles+=pm(a,o)*c),a.attributes.color&&(r.hasColors=!0),a.attributes.uv&&(r.hasUVs=!0),s.add(a);let h=Array.isArray(o.material)?o.material:[o.material];for(let u of h)if(u){t.add(u);for(let f of Object.keys(u)){let d=u[f];d&&d.isTexture&&n.add(d.image||d)}}}),r.materials=t.size,r.textures=n.size,r.geometries=s.size,r}function as(i){if(!Number.isFinite(i))return"?";let e=Math.abs(i);return e===0?"0":e>=1e3?i.toFixed(0):String(Number(i.toPrecision(4)))}function xi(i){return Number.isFinite(i)?Math.round(i).toLocaleString("en-US"):"?"}function WM(i,e,t){return!i||!e||!Number.isFinite(i.x)||!Number.isFinite(e.x)?"empty":`${as(e.x-i.x)} \xD7 ${as(e.y-i.y)} \xD7 ${as(e.z-i.z)} ${t||"units"}`}function mm(i,e){let t=e.x-i.x,n=e.y-i.y,s=e.z-i.z;return{d:Math.sqrt(t*t+n*n+s*s),dx:t,dy:n,dz:s}}function XM(i,e,t){let n=mm(i,e),s=n.d*1e-6;for(let r of["dx","dy","dz"])Math.abs(n[r])<s&&(n[r]=0);return`${as(n.d)} ${t||"units"}  (\u0394x ${as(n.dx)}, \u0394y ${as(n.dy)}, \u0394z ${as(n.dz)})`}function qM(i,e){let t=[],n=(s,r)=>t.push([s,String(r)]);return e&&e.format&&n("Format",e.format),e&&e.fileSize&&n("File size",e.fileSize),i.meshes&&(n("Meshes",xi(i.meshes)),n("Vertices",xi(i.vertices)),n("Triangles",xi(i.triangles))),i.pointClouds&&(n("Point clouds",xi(i.pointClouds)),n("Points",xi(i.pointCount))),n("Materials",xi(i.materials)),n("Textures",xi(i.textures)),n("Nodes",xi(i.nodes)),i.animations&&n("Animations",xi(i.animations)),e&&e.size&&n("Size",e.size),t}gm.exports={sceneStats:VM,triCount:pm,fmtDims:WM,fmtInt:xi,round:as,distance:mm,fmtDistance:XM,statsRows:qM}});var fS={};function je(i,e,...t){let n=document.createElement(i);for(let[s,r]of Object.entries(e||{}))r==null||r===!1||(s==="class"?n.className=r:s==="text"?n.textContent=r:s.startsWith("on")?n.addEventListener(s.slice(2),r):n.setAttribute(s,r===!0?"":String(r)));for(let s of t.flat())s!=null&&n.append(s instanceof Node?s:document.createTextNode(String(s)));return n}function xn(i){ce.hint.textContent=i||""}function ki(i,e){ce.notice.hidden=!i,ce.notice.textContent=i||"",ce.notice.className="notice"+(e?" "+e:"")}function bm(i){for(let e of ce.toolbar.querySelectorAll("button, select"))e!==ce.panelBtn&&(e.disabled=!i)}function On(){pc=!0}function gc(){let i=ce.stage.getBoundingClientRect(),e=Math.max(1,Math.floor(i.width)),t=Math.max(1,Math.floor(i.height));Ot.setSize(e,t,!1),Ot.domElement.style.width=e+"px",Ot.domElement.style.height=t+"px",an.aspect=e/t,an.updateProjectionMatrix(),On()}function wm(i){requestAnimationFrame(wm);let e=qu?Math.min((i-qu)/1e3,.1):0;qu=i;let t=Gi.update();Hs&&bt.playing&&Yt&&(Hs.update(e),Lm(),Tn&&Tn.visible&&Tn.children.forEach(n=>n.update()),ls&&ls.box.copy(ju(Zn)),pc=!0),!(!pc&&!t)&&(pc=!1,Ot.render(wn,an),cS(),vm&&bt.loaded&&(vm=!1,zr.postMessage({type:"rendered"})))}function KM(){let i=getComputedStyle(document.body).getPropertyValue("--vscode-editor-background").trim();try{return new we(i||"#1e1e1e")}catch{return new we(1973790)}}function _c(){let i=ce.bg.value,e=i==="theme"?KM():new we(YM[i]);wn.background=e;let t=e.r*.2126+e.g*.7152+e.b*.0722>.5;if(document.body.dataset.bg=t?"light":"dark",Jt){let[n,s]=t?[10132122,13619151]:[5921370,3487029],r=Jt.geometry.attributes.color,o=new we(n),a=new we(s);for(let l=0;l<r.count;l++){let h=Jt.userData.center.has(l)?o:a;r.setXYZ(l,h.r,h.g,h.b)}r.needsUpdate=!0}On()}async function jM(i,e){try{let t=await fetch(i);if(!t.ok)throw new Error("HTTP "+t.status);if(!t.body||!t.body.getReader)return new Uint8Array(await t.arrayBuffer());let n=t.body.getReader(),s=new Uint8Array(e||0),r=0,o=null,a=0;for(;;){let{done:h,value:u}=await n.read();if(h)break;o||r+u.length>s.length?(o=o||[s.subarray(0,r)],o.push(u)):s.set(u,r),r+=u.length,Date.now()-a>150&&(a=Date.now(),ki(`Reading ${Vi.default.fmtSize(r)} of ${Vi.default.fmtSize(e)}...`,"info"))}if(!o)return r===s.length?s:s.subarray(0,r);let l=new Uint8Array(r),c=0;for(let h of o)l.set(h,c),c+=h.length;return l}catch{return new Promise(t=>{mc=n=>{mc=null,t(n instanceof Uint8Array?n:new Uint8Array(n))},zr.postMessage({type:"needBytes"})})}}function Mm(i){return new vn({color:i.attributes.color?16777215:11844808,metalness:.05,roughness:.55,vertexColors:!!i.attributes.color,side:gn})}function JM(i,e){let t=String(i&&i.message?i.message:i),n=[];try{let o;if(Vi.default.sniff(e,"glb").detail==="binary"){let l=new DataView(e.buffer,e.byteOffset,e.byteLength).getUint32(12,!0);o=JSON.parse(new TextDecoder().decode(e.subarray(20,20+l)))}else o=JSON.parse(new TextDecoder().decode(e));n=o.extensionsRequired||[]}catch{}let s={KHR_draco_mesh_compression:"Draco mesh compression",EXT_meshopt_compression:"meshopt compression",KHR_meshopt_compression:"meshopt compression",KHR_texture_basisu:"KTX2/Basis textures"},r=n.filter(o=>s[o]);return r.length?`This glTF needs ${r.map(o=>s[o]).join(" and ")}, which 3D Model Viewer does not decode yet. Export it without compression to view it here.`:/Failed to load buffer|Failed to fetch|404/.test(t)?"A buffer or texture that this glTF file points to was not found next to it. "+t:"The glTF file could not be read: "+t}async function QM(i,e){let t=$M(e),n=[],s=Vi.default.sniff(i,Fn==="gltf"?"gltf":Fn);if(!s.ok)throw new Error(s.reason);if(s.warning&&n.push(s.warning),Fn==="glb"||Fn==="gltf"){let r=new vr;r.onError=a=>n.push(`Could not load ${decodeURIComponent(a.split("/").pop().slice(0,120))}.`);let o=new ec(r);try{let a=await o.parseAsync(fc(i),t),l=a.scene||a.scenes[0];return l.name||(l.name=cs.name),{object:l,animations:a.animations||[],notes:n}}catch(a){throw new Error(JM(a,i))}}if(Fn==="stl"){let r=new ic().parse(fc(i));r.userData.faceted=!0;let o=new ht(r,Mm(r));return o.name=cs.name,{object:o,animations:[],notes:n}}if(Fn==="ply"){let r=new lc().parse(fc(i)),o;if(r.index&&r.index.count>0)r.attributes.normal||r.computeVertexNormals(),o=new ht(r,Mm(r));else{r.computeBoundingSphere();let a=r.boundingSphere?r.boundingSphere.radius:1;o=new ei(r,new Pn({size:Math.max(a/300,1e-6),sizeAttenuation:!0,vertexColors:!!r.attributes.color,color:r.attributes.color?16777215:8369151}))}return o.name=cs.name,{object:o,animations:[],notes:n}}if(Fn==="obj"){let r=new TextDecoder().decode(i),o=new oc,a=Vi.default.mtlLibs(r.slice(0,2e6));for(let c of a.slice(0,1))try{let h=await fetch(t+c.split("/").map(encodeURIComponent).join("/"));if(!h.ok)throw new Error;let u=new ac().setResourcePath(t).parse(await h.text(),t);u.side=gn,u.preload(),o.setMaterials(u),n.push(`Materials from ${c}.`)}catch{n.push(`The material file ${c} was not found next to the model, so a default material is used.`)}let l=o.parse(r);return l.name=l.name||cs.name,l.traverse(c=>{c.isMesh&&c.geometry&&!c.geometry.index&&(c.geometry.userData.faceted=!0)}),{object:l,animations:[],notes:n}}if(Fn==="3mf"){let r;try{r=new cc().parse(fc(i))}catch(o){throw new Error("The 3MF package could not be read: "+(o&&o.message?o.message:o))}if(!r)throw new Error("The 3MF package has no 3D model part.");return r.name=r.name||cs.name,{object:r,animations:[],notes:n}}throw new Error("Unknown file type.")}async function eS(i){if(cs=i,Fn=i.format,Vs=Vi.default.UNITS[Fn]||"units",ce.bg.value=["theme","dark","light"].includes(i.background)?i.background:"theme",_c(),ce.up.value=i.upAxis==="y"||i.upAxis==="z"?i.upAxis:Fn==="stl"||Fn==="3mf"?"z":"y",ce.timing.textContent=`${i.name} \xB7 ${i.sizeText}`,!i.plan.load){ki(i.plan.message,"big"),Zu();return}let e=performance.now();try{ki(`Reading ${i.sizeText}...`,"info");let t=await jM(i.src,i.size),n=performance.now();ki(`Building the model (${Vi.default.fmtSize(t.length)})...`,"info"),await new Promise(o=>setTimeout(o,0));let s=await QM(t,i.src);if(ln=s.object,$o=s.animations,Zn.add(ln),Am(),Hi=on.default.sceneStats(ln,$o),!Hi.meshes&&!Hi.pointClouds)throw new Error("The file was read but has no meshes or points to draw.");Jo(),Em(),sS(),nS(),Zu(),ki(""),bm(!0),Ju(),bt.loaded=!0;let r=performance.now();ce.timing.textContent=`${i.name} \xB7 ${i.sizeText} \xB7 read ${((n-e)/1e3).toFixed(2)} s, built ${((r-n)/1e3).toFixed(2)} s`,xn(s.notes.join(" ")||"Drag to orbit, right-drag or Shift-drag to pan, scroll to zoom."),On()}catch(t){ki(t&&t.message?t.message:String(t),"error"),ce.timing.textContent=`${i.name} \xB7 ${i.sizeText}`,zr.postMessage({type:"failed"})}}function Am(){Zn.rotation.set(ce.up.value==="z"?-Math.PI/2:0,0,0),Zn.updateMatrixWorld(!0)}function ju(i){let e=new Kt;return i.updateMatrixWorld(!0),i.traverseVisible(t=>{(t.isMesh||t.isPoints)&&t.geometry&&e.expandByObject(t,!1)}),e}function Jo(i){let e=ju(i||Zn);if(e.isEmpty())return;i||(dc=e.clone());let t=e.getCenter(new B),n=e.getSize(new B),s=Math.max(n.length()/2,1e-6);i||(Xs=s);let r=s/Math.sin(rs.degToRad(an.fov/2))*1.05,o=new B(.9,.65,1.2).normalize();an.position.copy(t).addScaledVector(o,r),an.near=Math.max(s/500,r/1e4),an.far=r+s*50,an.updateProjectionMatrix(),Gi.target.copy(t),Gi.maxDistance=r*20,Gi.update(),On()}function tS(i){let e=Math.pow(10,Math.floor(Math.log10(i))),t=i/e;return(t<2?1:t<5?2:5)*e}function Em(){Jt&&(Br.remove(Jt),Jt.geometry.dispose());let i=dc.getSize(new B),e=Math.max(i.x,i.z,1e-6),t=tS(e/8),n=2*Math.ceil(e*1.5/t/2)+2;Jt=new Eo(n*t,n);let s=dc.getCenter(new B);Jt.position.set(Math.round(s.x/t)*t,dc.min.y,Math.round(s.z/t)*t),Jt.userData.cell=t;let r=new Set,o=Jt.geometry.attributes.position;for(let a=0;a<o.count;a++)(Math.abs(o.getX(a))<1e-9&&Math.abs(o.getX(a^1))<1e-9||Math.abs(o.getZ(a))<1e-9&&Math.abs(o.getZ(a^1))<1e-9)&&r.add(a);Jt.userData.center=r,Jt.visible=bt.grid,Br.add(Jt),oi&&(Zn.remove(oi),oi.dispose()),oi=new Co(Xs*.6),oi.userData.helper=!0,oi.material.depthTest=!1,oi.renderOrder=998,oi.visible=bt.axes,Zn.add(oi),_c(),Zu()}function $u(){if(ls&&(Br.remove(ls),ls.geometry.dispose(),ls=null),!bt.bounds||!ln)return;let i=ju(Zn);if(i.isEmpty())return;ls=new Ro(i,16756736),Br.add(ls);let e=Rm();xn(`Bounding box ${on.default.fmtDims(e.min,e.max,Vs)}`)}function Rm(){let i=new Kt;if(!ln)return i;let e=new qe().copy(Zn.matrixWorld).invert();return ln.updateMatrixWorld(!0),ln.traverseVisible(t=>{if(!(t.isMesh||t.isPoints)||!t.geometry)return;t.geometry.boundingBox||t.geometry.computeBoundingBox();let n=t.geometry.boundingBox.clone().applyMatrix4(new qe().multiplyMatrices(e,t.matrixWorld));i.union(n)}),i}function Cm(i){ln&&ln.traverse(e=>{e.isMesh&&e.material&&(Array.isArray(e.material)?e.material:[e.material]).forEach(t=>i(t,e))})}function Im(i,e){bt[i]=e,i==="grid"&&Jt&&(Jt.visible=e),i==="axes"&&oi&&(oi.visible=e),i==="wireframe"&&Cm(t=>{t.wireframe=e,t.needsUpdate=!0}),i==="bounds"&&($u(),e||xn("")),i==="normals"&&Qu(),Ju(),On()}function Ju(){for(let i of["grid","axes","wireframe","normals","bounds"])ce["t_"+i]&&ce["t_"+i].setAttribute("aria-pressed",String(!!bt[i]));ce.measure.setAttribute("aria-pressed",String(bt.measure))}function Qu(){if(Tn&&(Tn.children.forEach(i=>i.dispose&&i.dispose()),wn.remove(Tn),Tn=null),!(!bt.normals||!ln)){if(Hi.vertices>xm){bt.normals=!1,xn(`Normals are drawn for models up to ${on.default.fmtInt(xm)} vertices. This one has ${on.default.fmtInt(Hi.vertices)}.`);return}Tn=new Lt,Tn.userData.helper=!0,ln.traverseVisible(i=>{i.isMesh&&i.geometry&&i.geometry.attributes.normal&&Tn.add(new hc(i,Xs*.04,3394815))}),wn.add(Tn),xn(Tn.children.length?"Vertex normals shown in cyan.":"This model has no vertex normals.")}}function nS(){if(!$o.length){ce.anim.hidden=!0;return}Hs=new wo(ln),ce.clip.textContent="",$o.forEach((i,e)=>ce.clip.append(je("option",{value:String(e),text:`${i.name||"Clip "+(e+1)} (${i.duration.toFixed(2)} s)`}))),ce.anim.hidden=!1,Pm(0),gc()}function Pm(i){if(!Hs)return;Hs.stopAllAction();let e=$o[i];Yt=Hs.clipAction(e),Yt.reset().play(),ce.time.max=String(Math.max(e.duration,.001)),xc(!0)}function xc(i){bt.playing=i&&!!Yt,Yt&&(Yt.paused=!bt.playing),ce.play.textContent=bt.playing?"Pause":"Play",On()}function Lm(){if(!Yt)return;let i=Yt.time%Math.max(Yt.getClip().duration,.001);ce.time.value=String(i),ce.timeText.textContent=`${i.toFixed(2)} s`}function Zu(){ce.stats.textContent="";let i=[];if(i.push(["Format",{glb:"glTF binary (GLB)",gltf:"glTF",stl:"STL",obj:"Wavefront OBJ",ply:"PLY","3mf":"3MF"}[Fn]||"?"]),cs&&i.push(["File size",cs.sizeText]),Hi){for(let[t,n]of on.default.statsRows(Hi))i.push([t,n]);let e=Rm();e.isEmpty()||i.push(["Size",on.default.fmtDims(e.min,e.max,Vs)]),Jt&&i.push(["Grid cell",`${on.default.round(Jt.userData.cell)} ${Vs}`])}for(let[e,t]of i)ce.stats.append(je("div",{class:"row"},je("span",{class:"k",text:e}),je("span",{class:"v",text:t})));ce.copy.disabled=!Hi}function iS(){let i=[...ce.stats.querySelectorAll(".row")].map(e=>e.children[0].textContent+"	"+e.children[1].textContent).join(`
`);zr.postMessage({type:"copy",text:i})}function sS(){ce.tree.textContent="";let i=0,e=0,t=(n,s)=>{if(n.userData.helper)return;if(i>=ym){e++,n.children.forEach(c=>t(c,s+1));return}i++;let r=n.isSkinnedMesh?"skinned mesh":n.isMesh?"mesh":n.isPoints?"points":n.isBone?"bone":n.isLight?"light":n.isCamera?"camera":"group",o="";(n.isMesh||n.isPoints)&&n.geometry&&n.geometry.attributes.position&&(o=n.isPoints?`${on.default.fmtInt(n.geometry.attributes.position.count)} pts`:`${on.default.fmtInt(on.default.triCount(n.geometry,n))} tris`);let a=je("input",{type:"checkbox","aria-label":"Visible"});a.checked=n.visible,a.addEventListener("change",()=>{n.visible=a.checked,$u(),bt.normals&&Qu(),On()});let l=je("button",{type:"button",class:"node-name",title:"Frame this node",text:n.name||`(${r})`});l.addEventListener("click",()=>Jo(n)),ce.tree.append(je("div",{class:"node",role:"treeitem","data-depth":s},je("span",{class:"indent","data-w":s}),a,l,je("span",{class:"kind",text:o||r}))),ce.tree.lastChild.firstChild.style.width=`${s*12}px`,n.children.forEach(c=>t(c,s+1))};t(ln,0),e&&ce.tree.append(je("div",{class:"more",text:`and ${on.default.fmtInt(e)} more nodes (the first ${on.default.fmtInt(ym)} are listed)`}))}function Ku(i){bt.measure=i,ce.stage.classList.toggle("measuring",i),Ju(),i?(yc(),xn("Measure: click the first point on the model. Esc to stop.")):xn("")}function yc(){for(let i of[...Ws.children])Ws.remove(i),i.geometry&&i.geometry.dispose();hs=[],ce.label.hidden=!0,On()}function rS(i){for(let e=i;e;e=e.parent)if(!e.visible)return!1;return!0}function oS(i,e){let t=Ot.domElement.getBoundingClientRect(),n=new Ge((i-t.left)/t.width*2-1,-((e-t.top)/t.height)*2+1);return Yu.setFromCamera(n,an),Yu.params.Points.threshold=Xs*.01,Yu.intersectObject(ln,!0).filter(r=>!r.object.userData.helper&&rS(r.object))[0]||null}function aS(i){let e=new ht(new Cs(Xs*.012,16,12),new Gn({color:16727409,depthTest:!1}));e.position.copy(i),e.renderOrder=999,Ws.add(e)}function lS(i){if(hs.length===2&&yc(),hs.push(i.point.clone()),aS(i.point),hs.length===2){let[e,t]=hs,n=new Ii(new at().setFromPoints([e,t]),new jt({color:16727409,depthTest:!1}));n.renderOrder=999,Ws.add(n);let s=new qe().copy(Zn.matrixWorld).invert(),r=e.clone().applyMatrix4(s),o=t.clone().applyMatrix4(s),a=on.default.fmtDistance(r,o,Vs);ce.label.textContent=`${on.default.round(on.default.distance(r,o).d)} ${Vs}`,ce.label.hidden=!1,xn(`Distance ${a}. Click again to start a new measurement.`)}else xn("Measure: click the second point.");On()}function cS(){if(ce.label.hidden||hs.length<2)return;let i=hs[0].clone().add(hs[1]).multiplyScalar(.5).project(an),e=Ot.domElement.getBoundingClientRect();ce.label.style.left=`${(i.x+1)/2*e.width}px`,ce.label.style.top=`${(1-i.y)/2*e.height}px`}function hS(){Ot.render(wn,an);let i=Ot.domElement.toDataURL("image/png"),e=atob(i.slice(i.indexOf(",")+1)),t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);zr.postMessage({type:"screenshot",data:t}),xn("Choose where to save the PNG...")}function uS(){Ot.render(wn,an);let i=Ot.getContext(),e=i.drawingBufferWidth,t=i.drawingBufferHeight,n=new Uint8Array(e*t*4);i.readPixels(0,0,e,t,i.RGBA,i.UNSIGNED_BYTE,n);let r=(wn.background||new we(0,0,0)).getHex(),o=0,a=0,l=r>>16&255,c=r>>8&255,h=r&255;for(let u=0;u<t;u+=4)for(let f=0;f<e;f+=4){let d=(u*e+f)*4;a++,Math.abs(n[d]-l)+Math.abs(n[d+1]-c)+Math.abs(n[d+2]-h)>30&&o++}return a?o/a:0}var Vi,on,zr,xm,ym,YM,Sm,ce,kr,jo,Xu,bt,cs,Ot,wn,an,Gi,ZM,Tm,Zn,Br,ln,Hs,$o,Yt,Jt,oi,ls,Tn,Xs,Vs,Fn,Hi,dc,Ws,hs,pc,qu,vm,mc,$M,fc,Yu,Or,Dm=hn(()=>{Wn();Dp();qp();Yp();$p();Jp();Qp();hm();fm();dm();Ql();Vi=Hr(Ec()),on=Hr(_m()),zr=acquireVsCodeApi(),xm=25e4,ym=3e3,YM={dark:1974050,light:15921906};Sm=document.getElementById("app");Sm.textContent="";ce={},kr=(i,e,t,n={})=>je("button",{type:"button",title:e,onclick:t,...n,text:i}),jo=(i,e,t)=>{let n=kr(i,e,()=>Im(t,!bt[t]),{"aria-pressed":"false","data-toggle":t});return ce["t_"+t]=n,n};ce.fit=kr("Fit","Fit the model in view (F)",()=>Jo());ce.shading=je("select",{"aria-label":"Shading",title:"Shading"},je("option",{value:"file",text:"Shading: as stored"}),je("option",{value:"smooth",text:"Shading: smooth"}),je("option",{value:"flat",text:"Shading: flat"}));ce.bg=je("select",{"aria-label":"Background",title:"Background"},je("option",{value:"theme",text:"Background: theme"}),je("option",{value:"dark",text:"Background: dark"}),je("option",{value:"light",text:"Background: light"}));ce.up=je("select",{"aria-label":"Up axis",title:"Which model axis points up"},je("option",{value:"y",text:"Y up"}),je("option",{value:"z",text:"Z up"}));ce.measure=kr("Measure","Click two points on the model to measure the distance (M)",()=>Ku(!bt.measure),{"aria-pressed":"false"});ce.shot=kr("Screenshot","Save the view as a PNG image",()=>hS());ce.panelBtn=kr("Panel","Show or hide the stats and scene panel (P)",()=>{ce.side.hidden=!ce.side.hidden,ce.panelBtn.setAttribute("aria-pressed",String(!ce.side.hidden)),gc()},{"aria-pressed":"true"});ce.toolbar=je("div",{class:"toolbar",role:"toolbar"},ce.fit,je("span",{class:"sep"}),jo("Grid","Ground grid (G)","grid"),jo("Axes","Model axes: X red, Y green, Z blue (A)","axes"),jo("Wireframe","Wireframe (W)","wireframe"),jo("Normals","Vertex normals (N)","normals"),jo("Bounds","Bounding box (B)","bounds"),je("span",{class:"sep"}),ce.shading,ce.bg,ce.up,je("span",{class:"sep"}),ce.measure,ce.shot,je("span",{class:"grow"}),ce.panelBtn);ce.clip=je("select",{"aria-label":"Animation clip",title:"Animation clip"});ce.play=kr("Pause","Play or pause the animation (Space)",()=>xc(!bt.playing));ce.time=je("input",{type:"range",min:"0",max:"1",step:"0.001",value:"0","aria-label":"Animation time"});ce.timeText=je("span",{class:"timetext",text:"0.00 s"});ce.anim=je("div",{class:"animbar",hidden:!0},je("span",{class:"label",text:"Animation"}),ce.clip,ce.play,ce.time,ce.timeText);ce.stage=je("div",{class:"stage"});ce.notice=je("div",{class:"notice",hidden:!0});ce.label=je("div",{class:"measure-label",hidden:!0});ce.stage.append(ce.notice,ce.label);ce.stats=je("div",{class:"stats"});ce.tree=je("div",{class:"tree",role:"tree","aria-label":"Scene tree"});ce.copy=je("button",{type:"button",class:"link",title:"Copy the stats as tab-separated text",text:"Copy",onclick:()=>iS()});ce.side=je("aside",{class:"side"},je("section",{},je("h2",{},"Model ",ce.copy),ce.stats),je("section",{},je("h2",{text:"Scene"}),ce.tree));ce.status=je("div",{class:"status"},ce.hint=je("span",{class:"hint"}),je("span",{class:"grow"}),ce.timing=je("span",{class:"timing"}));Sm.append(ce.toolbar,ce.anim,je("div",{class:"main"},ce.stage,ce.side),ce.status);Xu=document.getElementById("zovo-support");Xu&&(Xu.classList.remove("zovo-support-fixed"),ce.status.append(Xu));bt={grid:!0,axes:!1,wireframe:!1,normals:!1,bounds:!1,measure:!1,playing:!0,loaded:!1},cs=null;bm(!1);try{Ot=new Zl({antialias:!0,preserveDrawingBuffer:!1})}catch(i){throw ki("WebGL is not available in this VS Code window, so the model cannot be drawn. "+(i&&i.message?i.message:""),"error"),i}Ot.setPixelRatio(Math.min(window.devicePixelRatio||1,2));Ot.toneMapping=Do;ce.stage.prepend(Ot.domElement);Ot.domElement.setAttribute("aria-label","3D view");Ot.domElement.addEventListener("webglcontextlost",i=>{i.preventDefault(),ki("The graphics context was lost (the GPU may be busy or out of memory). Close and reopen the file.","error")});wn=new ws,an=new Bt(45,1,.01,1e3),Gi=new Jl(an,Ot.domElement);Gi.enableDamping=!0;Gi.dampingFactor=.12;Gi.screenSpacePanning=!0;Gi.addEventListener("change",()=>On());ZM=new Lr(Ot);wn.environment=ZM.fromScene(new uc,.04).texture;wn.environmentIntensity=.7;wn.add(new Mo(16777215,4473936,1.2));Tm=new Ns(16777215,1.6);Tm.position.set(.5,1,1);an.add(Tm);wn.add(an);Zn=new Lt;Zn.name="root";wn.add(Zn);Br=new Lt;Br.userData.helper=!0;wn.add(Br);ln=null,Hs=null,$o=[],Yt=null,Jt=null,oi=null,ls=null,Tn=null,Xs=1,Vs="units",Fn=null,Hi=null,dc=new Kt,Ws=new Lt;Ws.userData.helper=!0;Ws.renderOrder=999;wn.add(Ws);hs=[],pc=!0,qu=0;new ResizeObserver(gc).observe(ce.stage);vm=!0;ce.bg.addEventListener("change",_c);new MutationObserver(()=>{ce.bg.value==="theme"&&_c()}).observe(document.body,{attributes:!0,attributeFilter:["class","style"]});window.addEventListener("message",i=>{let e=i.data;!e||typeof e!="object"||(e.type==="init"?eS(e):e.type==="bytes"?mc&&mc(e.data):e.type==="saved"?xn(e.cancelled?"Screenshot not saved.":`Screenshot saved: ${e.path} (${Vi.default.fmtSize(e.bytes)})`):e.type==="copied"?xn("Stats copied to the clipboard."):e.type==="error"&&(e.soft?xn(e.message):ki(e.message,"error")))});mc=null;$M=i=>i.slice(0,i.lastIndexOf("/")+1),fc=i=>i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer:i.slice().buffer;ce.up.addEventListener("change",()=>{Am(),yc(),Jo(),Em(),$u(),On()});ce.shading.addEventListener("change",()=>{let i=ce.shading.value,e=performance.now();ln.traverse(t=>{if(!t.isMesh||!t.geometry)return;let n=t.userData;n.fileGeometry||(n.fileGeometry=t.geometry);let s=n.fileGeometry;if(i==="smooth"&&s.userData.faceted&&!t.isSkinnedMesh&&!t.morphTargetInfluences){if(!n.smoothGeometry){let r=s.clone();r.deleteAttribute("normal");for(let o of Object.keys(r.attributes))o!=="position"&&o!=="color"&&r.deleteAttribute(o);n.smoothGeometry=Op(r,Xs*1e-6),n.smoothGeometry.computeVertexNormals(),r.dispose()}s=n.smoothGeometry}t.geometry!==s&&(t.geometry=s)}),Cm(t=>{"flatShading"in t&&(t.userData.fileFlat===void 0&&(t.userData.fileFlat=!!t.flatShading),t.flatShading=i==="flat"?!0:i==="smooth"?!1:t.userData.fileFlat,t.needsUpdate=!0)}),bt.normals&&Qu(),xn(`Shading: ${i==="file"?"as stored in the file":i} (${Math.round(performance.now()-e)} ms).`),On()});ce.clip.addEventListener("change",()=>Pm(Number(ce.clip.value)));ce.time.addEventListener("input",()=>{Yt&&(xc(!1),Yt.paused=!1,Yt.time=Number(ce.time.value),Hs.update(0),Yt.paused=!0,Lm(),Tn&&Tn.children.forEach(i=>i.update()),On())});Yu=new Ao;Or=null;Ot.domElement.addEventListener("pointerdown",i=>{Or={x:i.clientX,y:i.clientY,b:i.button}});Ot.domElement.addEventListener("pointerup",i=>{if(!Or||!bt.measure||!ln||Or.b!==0)return;let e=Math.hypot(i.clientX-Or.x,i.clientY-Or.y);if(Or=null,e>4)return;let t=oS(i.clientX,i.clientY);t?lS(t):xn("No surface under the pointer. Click on the model.")});window.addEventListener("keydown",i=>{if(i.target&&/^(INPUT|SELECT|TEXTAREA)$/.test(i.target.tagName)&&i.target.type!=="checkbox"&&i.target.type!=="range"||i.metaKey||i.ctrlKey||i.altKey||!bt.loaded)return;let e=i.key.toLowerCase(),t={g:"grid",a:"axes",w:"wireframe",n:"normals",b:"bounds"};t[e]?(Im(t[e],!bt[t[e]]),i.preventDefault()):e==="f"?(Jo(),i.preventDefault()):e==="m"?(Ku(!bt.measure),i.preventDefault()):e==="p"?(ce.panelBtn.click(),i.preventDefault()):e==="escape"&&bt.measure?(Ku(!1),yc()):e===" "&&Yt&&(xc(!bt.playing),i.preventDefault())});window.modelViewerProbe=()=>({loaded:bt.loaded,coverage:bt.loaded?uS():0,state:{...bt},stats:Hi,unit:Vs,cameraDistance:an.position.distanceTo(Gi.target),radius:Xs,clip:Yt?Yt.getClip().name:null,time:Yt?Yt.time:null,shading:ce.shading.value,background:ce.bg.value,up:ce.up.value});gc();requestAnimationFrame(wm);zr.postMessage({type:"ready"})});var vc=Hr(Tc());function dS(){try{if(localStorage.getItem("zovo.forceNoWebGL")==="1")return!1}catch{}try{let i=document.createElement("canvas"),e=i.getContext("webgl2")||i.getContext("webgl");if(!e)return!1;let t=e.getExtension("WEBGL_lose_context");return t&&t.loseContext(),!0}catch{return!1}}function Qo(i,e,t){let n=document.createElement(i);for(let[s,r]of Object.entries(e||{}))n.setAttribute(s,r);return t!=null&&(n.textContent=t),n}async function pS(){let i=(0,vc.cfg)(),e=(0,vc.tokenPath)(i.token),t=document.getElementById("app");t.textContent="";let n=Qo("div",{class:"fallback"});n.append(Qo("h1",{},i.name||"Model")),n.append(Qo("p",{},"WebGL is turned off in this IDE (some remote and Linux setups), so the 3D view cannot be drawn. These are the facts read from the file."));let s=Qo("pre",{class:"facts"},"Reading the file...");n.append(s);let r=Qo("button",{type:"button"},"Open in Default App");r.addEventListener("click",()=>{fetch(e+"openDefault",{method:"POST",body:"{}"}).catch(()=>{})}),n.append(r),t.append(n);let o=document.getElementById("zovo-more");o&&(n.append(o),o.hidden=!1);try{let a=await fetch(e+"describe");s.textContent=await a.text()}catch(a){s.textContent="The file facts could not be read: "+(a&&a.message||a)}}dS()?Promise.resolve().then(()=>Hr(Ic())).then(async i=>{await Promise.resolve().then(()=>(Dm(),fS)),i.placeMoreTools()}):(Promise.resolve().then(()=>Hr(Ic())).then(()=>pS()),window.zovoFallback=!0);})();
