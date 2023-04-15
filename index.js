"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js");const e=localStorage;let t,s;try{t=new BroadcastChannel("sync"),s=new BroadcastChannel("tab")}catch{t=!1,s=!1}const i=(e,t,s="click")=>{e.addEventListener(s,t)},n="stitchcounter-v1.2.2";let r=[],o=[,2,,3,,4,,,,,5],h=[1,3,5,10];["addButton","removeButton","mod1","mod3","mod5","mod10","mainBlock","countBlock","stitchTable","newRow","reset","titleBlock","newTab","options","optionsDiv","removeTab","removeRow","countNumber","help","toggleTab","helpModal","closeHelp"].forEach((e=>r.push(document.getElementById(e))));let[a,c,l,d,u,m,w,b,f,p,k,v,g,T,y,B,x,A,R,S,M,N]=r,C=new class{constructor(){this.t=JSON.parse(e.counters||'[{"name":"default","increment":1,"stitches":[0]}]'),this.i=0,(e.stitches||e.increment)&&(this.counters[0].increment=parseInt(e.increment),this.counters[0].stitches=JSON.parse(e.stitches),delete e.stitches,delete e.increment,delete e.cRowStitches),this.o=[],this.t.forEach((e=>this.h(e.name))),this.o[0].disabled=!0,this.sync(!0,!0)}get index(){return this.i}set index(e){this.i=e,this.sync(!0,!0)}get counters(){return this.t}set counters(e){this.t=e,this.sync()}get l(){return this.counters[this.index]}set l(e){this.counters[this.index]=e}get stitches(){return this.l.stitches}set stitches(e){this.l.stitches=e,this.sync(!1)}get number(){return this.stitches[this.stitches.length-1]}set number(e){e=Math.max(0,e),this.stitches[this.stitches.length-1]=e,this.sync(!1)}get increment(){return this.l.increment}set increment(e){this.l.increment=e,this.sync()}sync(s=!0,i=!1,n=!0){if(e.counters=JSON.stringify(this.counters),n&&t&&t.postMessage(this.counters),c.disabled=0==this.number,B.disabled=this.o.length<=1,x.disabled=this.stitches.length<=1,A.textContent=this.number,s&&(o.forEach((e=>r[e].disabled=!1)),r[o[this.increment]].disabled=!0),f.rows.length-1!==this.stitches.length){for(;f.rows.length-1<this.stitches.length;){let e=f.insertRow(-1);e.insertCell(0).textContent=f.rows.length-1,e.insertCell(1).textContent=0}for(;f.rows.length-1>this.stitches.length;)f.deleteRow(f.rows.length-1)}this.stitches.forEach(((e,t)=>{f.rows[t+1].cells[1].textContent=e,i&&t===this.stitches.length-1&&f.rows[t+1].scrollIntoView()}))}u(e){this.increment=h[h.indexOf(this.increment)+e]||this.increment}m(){this.stitches.push(0),this.sync(!1,!0),this.number=0}h(e){let t=document.createElement("button");return t.className="tab noselect",t.textContent=e,i(t,(()=>{this.p(),t.disabled=!0,this.k(e)})),this.o.push(v.insertBefore(t,g)),t}p(){this.o.forEach((e=>e.disabled=!1))}v(e){C.o[e].remove(),C.o.splice(e,1),C.i>=e&&(C.i=Math.max(C.i-1,0),this.p(),C.o[C.index].disabled=!0,C.sync(!0,!0,!1))}k(e){this.counters.some(((t,s)=>{if(t.name===e)return this.index=s,!0}))}g(){this.o.forEach((e=>e.remove())),this.o=[],this.h("default").disabled=!0,this.i=0}reset(){confirm("all rows, stitches and other data in all counters will be cleared.\nproceed?")&&(e.clear(),s&&s.postMessage(["r"]),this.g(),this.counters=[{name:"default",increment:1,stitches:[0]}],e.lversion=n)}};t&&(t.onmessage=e=>{C.t=e.data,C.sync(!0,!1,!1)}),s&&(s.onmessage=e=>{switch(e.data[0]){case"r":C.g();break;case"m":C.h(e.data[1]);break;case"d":C.v(e.data[1])}}),i(a,(()=>C.number+=C.increment)),i(c,(()=>C.number-=C.increment));const J=e=>e.style.display="flex"===e.style.display?"none":"flex",O=(e,t)=>i(e,(()=>J(t)));e.lversion!==n&&(J(M),e.lversion=n),i(p,(()=>C.m())),O(T,y),v.style.display="flex",O(S,v),O(R,M),O(N,M),i(M,(e=>{e.target===M&&J(M)}),"mousedown"),i(x,(()=>{confirm(`the newest row in ${C.l.name} will be removed.\nproceed?`)&&(C.stitches.pop(),C.sync(!1))})),i(B,(()=>{if(!confirm(`all rows, stitches and other data in ${C.l.name} will be cleared.\nproceed?`))return;let e=C.index;C.counters.splice(e,1),C.v(C.index),s&&s.postMessage(["d",e])})),i(k,(()=>C.reset())),i(g,(()=>{let e=prompt("name your new counter\nnames cannot be reused, and will display in all lowercase",`default${C.counters.length+1}`);""!==e&&null!==e&&(e=e.toLowerCase(),C.counters.some((t=>t.name===e))?alert("name is already in use"):(C.counters.push({name:e,increment:1,stitches:[0]}),C.h(e).click(),s&&s.postMessage(["m",e])))}));for(let e=2;e<=5;e++)i(r[e],(()=>C.increment=h[e-2]));i(document,(e=>{if(e.repeat)return;let t=!0;switch(e.code){case"Space":case"ArrowUp":a.click();break;case"ArrowRight":C.u(1);break;case"ArrowLeft":C.u(-1);break;case"ArrowDown":c.click();break;default:t=!1}t&&e.preventDefault()}),"keydown");const $=()=>{document.body.clientWidth<=document.body.clientHeight?"row"===(w.style.flexDirection||"row")&&(w.style.flexDirection="column-reverse",b.style["flex-grow"]=1):"column-reverse"===(w.style.flexDirection||"column-reverse")&&(w.style.flexDirection="row",b.style["flex-grow"]=3)};i(window,$,"resize"),i(window,$,"load");