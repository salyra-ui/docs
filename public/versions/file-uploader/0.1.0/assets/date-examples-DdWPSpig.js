import"./catalog-ClNHJ1s0.js";import{a as be,s as ge}from"./shell-Cq5lNdcA.js";/* empty css                   *//* empty css             */import{h as Z,k as L,I as P,E as D,j as ye,n as K,D as z,r as fe,d as U,H as xe,B as Q,G as ke,U as we,q as Se}from"./index-BAnCJRq_.js";import{mountPicker as O}from"./index-Bc3Xca-q.js";import{c as Ce,a as $e}from"./picker-controls-DOa5RVzv.js";var X=Object.defineProperty,Ee=Object.getOwnPropertyDescriptor,Me=Object.getOwnPropertyNames,qe=Object.prototype.hasOwnProperty,ee=(e,t)=>{for(var a in t)X(e,a,{get:t[a],enumerable:!0})},Pe=(e,t,a,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let p of Me(t))!qe.call(e,p)&&p!==a&&X(e,p,{get:()=>t[p],enumerable:!(i=Ee(t,p))||i.enumerable});return e},te=(e,t,a)=>(Pe(e,t,"default"),a),ne={};ee(ne,{createDatePickerStore:()=>ae,createPickerStore:()=>B,mountDatePicker:()=>ie,mountPicker:()=>oe});var R={};ee(R,{createDatePickerStore:()=>ae,createPickerStore:()=>B});te(R,Z);function B(e={}){return L({...e,kind:"date"})}var ae=B;te(ne,R);function oe(e,t={}){if("getSnapshot"in t){if(t.getSnapshot().options.kind!=="date")throw new RangeError("Use a date store with DatePicker");return O(e,t)}return O(e,{...t,kind:"date"})}var ie=oe;function Te(e={}){return L({...e,kind:"time"})}var Le=Te;function I(e,t,a){const i=t==="date"?'<rect x="3" y="5" width="18" height="16"/><path d="M7 3v4m10-4v4M3 11h18"/>':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>';return`<div class="picker-control" data-choice-picker="${t}" data-endpoint="${e}"><span class="picker-control-label">${P(a)}</span><button type="button" class="picker-control-trigger" aria-label="${P(a)}" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true">${i}</svg><span data-choice-value>Choose ${t}</span></button><div class="endpoint-popup" data-picker-root role="dialog" aria-label="Choose ${P(a.toLowerCase())}" hidden></div></div>`}let De=0;function re(e,t){const a=[...e.querySelectorAll("[data-choice-picker]")].map(n=>{const r={part:n.dataset.choicePicker,endpoint:n.dataset.endpoint,trigger:n.querySelector(".picker-control-trigger"),value:n.querySelector("[data-choice-value]"),panel:n.querySelector(".endpoint-popup")};return r.panel.id=`endpoint-popup-${++De}`,r.trigger.setAttribute("aria-controls",r.panel.id),r});let i,p;const c=new AbortController,y=(n,r,u)=>n.addEventListener(r,u,{signal:c.signal});function m(n=!1){if(!i)return;const r=i;i=void 0,r.panel.hidden=!0,r.trigger.setAttribute("aria-expanded","false"),p?.(),p=void 0,r.panel.replaceChildren(),n&&r.trigger.isConnected&&!r.trigger.disabled&&r.trigger.focus({preventScroll:!0})}function f(){if(!i)return;const{panel:n,trigger:r}=i,u=r.getBoundingClientRect(),h=Math.min(320,window.innerWidth-24);n.style.width=`${h}px`,n.style.maxHeight=`${Math.max(120,window.innerHeight-24)}px`;const k=n.getBoundingClientRect().height;n.style.left=`${Math.max(12,Math.min(u.left,window.innerWidth-h-12))}px`;const s=u.bottom+8;n.style.top=`${Math.max(12,Math.min(s+k<=window.innerHeight-12?s:u.top-k-8,window.innerHeight-k-12))}px`}function C(n){const r=t.getSnapshot(),u=D(r.draft,n.endpoint)?.date;n.panel.innerHTML='<div class="calendar-navigation"><button type="button" data-picker-action="previous" aria-label="Previous month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><span data-month-heading aria-live="polite"></span><button type="button" data-picker-action="next" aria-label="Next month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button></div><div data-calendar class="sp-calendar"></div><div class="endpoint-popup-footer"><button type="button" data-close-choice>Close</button></div>';const h=ie(n.panel,{referenceDate:r.options.referenceDate,locale:r.options.locale,weekStartsOn:r.options.weekStartsOn,minDate:r.options.minDate,maxDate:r.options.maxDate,isDateUnavailable:r.options.isDateUnavailable,fixedWeeks:!0,defaultValue:u?{date:u}:null,month:u?z(u):r.visibleMonth,onSelect(k){t.setDate(k,n.endpoint),queueMicrotask(()=>{i===n&&m(!0)})}});return()=>h.destroy()}function $(n){const r=t.getSnapshot(),u=D(r.draft,n.endpoint),h=r.options.hourCycle,k=!!r.options.seconds||u?.time?.length===8,s=Le({referenceDate:r.options.referenceDate,commit:"explicit",hourCycle:h,seconds:k,defaultValue:u?.time?{time:u.time}:null}),v=[{part:"hour",label:"Hours",values:Array.from({length:h},(b,o)=>h===12?o+1:o)},{part:"minute",label:"Minutes",values:Array.from({length:Math.ceil(60/r.options.minuteStep)},(b,o)=>o*r.options.minuteStep)},...k?[{part:"second",label:"Seconds",values:Array.from({length:60},(b,o)=>o)}]:[]];n.panel.innerHTML=`<div class="time-choice-columns">${v.map(b=>`<div class="time-choice-column"><h3>${b.label}</h3><div class="time-choice-list" role="radiogroup" aria-label="${b.label}">${b.values.map(o=>`<button type="button" role="radio" aria-checked="false" tabindex="-1" data-time-choice="${b.part}" data-value="${o}" aria-label="${o} ${b.label.toLowerCase()}">${String(o).padStart(2,"0")}</button>`).join("")}</div></div>`).join("")}</div>${h===12?'<div class="time-choice-period" role="radiogroup" aria-label="Period"><button type="button" role="radio" aria-checked="false" data-time-choice="period" data-value="AM">AM</button><button type="button" role="radio" aria-checked="false" data-time-choice="period" data-value="PM">PM</button></div>':""}<div class="endpoint-popup-footer"><span data-clock-preview aria-live="polite">Choose a time</span><button type="button" data-close-choice>Done</button></div>`;const g=[...n.panel.querySelectorAll("[data-time-choice]")],M=()=>{const b=D(s.getSnapshot().draft)?.time,o=K(b??"00:00",h);for(const l of n.panel.querySelectorAll('[role="radiogroup"]')){const d=[...l.querySelectorAll("[data-time-choice]")],q=b&&d.find(S=>String(o[S.dataset.timeChoice])===S.dataset.value);for(const S of d){const he=S===q;S.setAttribute("aria-checked",String(he)),S.tabIndex=S===(q||d[0])?0:-1}}n.panel.querySelector("[data-clock-preview]").textContent=b?J(b,h):"Choose a time"},T=b=>{const o=D(s.getSnapshot().draft)?.time??"00:00",l=fe(o,b.dataset.timeChoice,b.dataset.value,h,k);s.setTime(l),t.setTime(l,n.endpoint)},E=b=>{const o=b.target.closest("[data-time-choice]");o&&T(o)},H=b=>{const o=b.target.closest("[data-time-choice]");if(!o||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(b.key))return;b.preventDefault();const l=g.filter(S=>S.dataset.timeChoice===o.dataset.timeChoice),d=l.indexOf(o),q=b.key==="Home"?l[0]:b.key==="End"?l.at(-1):l[(d+(["ArrowUp","ArrowLeft"].includes(b.key)?-1:1)+l.length)%l.length];T(q),q.focus({preventScroll:!0}),q.scrollIntoView({block:"nearest"})};n.panel.addEventListener("click",E),n.panel.addEventListener("keydown",H),M();const j=s.subscribe(M);return()=>{j(),n.panel.removeEventListener("click",E),n.panel.removeEventListener("keydown",H),s.destroy()}}for(const n of a)y(n.trigger,"click",()=>{if(i===n){m(!0);return}if(m(),n.trigger.disabled)return;i=n,n.panel.hidden=!1,n.trigger.setAttribute("aria-expanded","true"),p=n.part==="date"?C(n):$(n),f();for(const u of n.panel.querySelectorAll('[aria-checked="true"]'))u.scrollIntoView({block:"center"});n.panel.querySelector('[data-day-trigger][tabindex="0"], [data-time-choice][tabindex="0"]')?.focus({preventScroll:!0})}),y(n.panel,"click",r=>{r.target.closest("[data-close-choice]")&&m(!0)});y(document,"pointerdown",n=>{i&&!i.panel.contains(n.target)&&!i.trigger.contains(n.target)&&m()}),y(document,"keydown",n=>{i&&n.key==="Escape"&&(n.preventDefault(),m(!0))}),y(document,"focusin",n=>{i&&!i.panel.contains(n.target)&&n.target!==i.trigger&&m()}),y(e,"click",n=>{n.target.closest('[data-picker-action="apply"], [data-picker-action="cancel"], [data-picker-action="clear"]')&&m()}),y(window,"resize",f),window.addEventListener("scroll",n=>{i&&!(n.target instanceof Node&&i.panel.contains(n.target))&&f()},{capture:!0,signal:c.signal});const w=()=>{const n=t.getSnapshot();for(const r of a){const h=D(n.draft,r.endpoint)?.[r.part],k=h?r.part==="date"?ye(h,n.options.locale,{day:"numeric",month:"short",year:"numeric"}):J(h,n.options.hourCycle):`Choose ${r.part}`;r.value.textContent!==k&&(r.value.textContent=k),r.trigger.disabled=!!(n.options.disabled||n.options.readOnly),r.trigger.dataset.value=h??"",r.trigger.disabled&&i===r&&m()}};w();const x=t.subscribe(w);return{close:m,destroy(){m(),x(),c.abort()}}}function J(e,t){const a=K(e,t);return`${String(a.hour).padStart(2,"0")}:${String(a.minute).padStart(2,"0")}${e.length===8?":"+String(a.second).padStart(2,"0"):""}${t===12?" "+a.period:""}`}const Y=e=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${e?"m9 5 7 7-7 7":"m15 5-7 7 7 7"}"/></svg>`,He=`<div class="calendar-navigation"><button data-picker-action="previous" aria-label="Previous month">${Y(!1)}</button><span data-month-heading aria-live="polite"></span><button data-picker-action="next" aria-label="Next month">${Y(!0)}</button></div>`,_=(e,t)=>`<fieldset class="time-endpoint"><legend>${e==="start"?"Start":"End"}</legend>${I(e,"date",e==="start"?"Start date":"End date")}${t!=="date"?I(e,"time",e==="start"?"Start time":"End time"):""}</fieldset>`,Ae='<div class="example-toolbar"><label>Picker<select id="kind"><option value="date">Date</option><option value="time">Time</option><option value="datetime">Date and time</option></select></label><label>Selection<select id="selection"><option value="range">Range</option><option value="single">Single value</option></select></label><label>Clock<select id="clock"><option value="24">24 hours</option><option value="12">12 hours</option></select></label><label class="check"><input id="seconds" type="checkbox">Seconds</label><label class="check"><input id="disabled" type="checkbox">Disabled</label></div><div class="picker-stage"><div id="picker-host"></div><aside class="output-panel"><h3>Applied value</h3><p>Only configured date and time fields are exported.</p><pre id="applied">null</pre><h3>Draft</h3><pre id="draft">null</pre><p id="picker-error" role="status"></p></aside></div>';function Oe(e,t){const a=m=>e.querySelector(m);let i,p;function c(){i?.();const m=e.querySelector("#kind").value,f=e.querySelector("#selection").value,C={hourCycle:Number(e.querySelector("#clock").value),seconds:e.querySelector("#seconds").checked},$=e.querySelector("#picker-host");$.innerHTML=`${m!=="time"?He:""}${m!=="time"?'<div class="sp-calendar" data-calendar style="--sp-months:2"></div>':""}<div class="endpoint-row">${_("start",m)+(f==="range"?_("end",m):"")}</div><div class="picker-actions"><button data-picker-action="clear">Clear</button><button data-picker-action="cancel">Cancel</button><button class="primary" data-picker-action="apply">Apply</button></div>`;const w=L({...C,kind:m,selection:f,commit:"explicit",referenceDate:t,month:{year:2026,month:10},months:m==="time"?1:2,fixedWeeks:!0,disabled:e.querySelector("#disabled").checked}),x=O($,w);p=w;const n=re($,p),r=()=>{const h=x.store.getSnapshot();e.querySelector("#applied").textContent=JSON.stringify(h.value,null,2),e.querySelector("#draft").textContent=JSON.stringify(h.draft,null,2),e.querySelector("#picker-error").textContent=h.error??""};r();const u=x.store.subscribe(r);i=()=>{u(),n.destroy(),x.destroy(),w.destroy()}}const y=new AbortController;return e.addEventListener("change",m=>{const f=m.target.id;["clock","seconds","kind","selection"].includes(f)?c():f==="disabled"&&p.setOptions({disabled:a("#disabled").checked})},{signal:y.signal}),c(),()=>{y.abort(),i?.()}}const Ne=`<div class="example-toolbar"><label>Month<select id="month">${Array.from({length:12},(e,t)=>`<option value="${t+1}" ${t===2?"selected":""}>${new Intl.DateTimeFormat("en",{month:"long",timeZone:"UTC"}).format(new Date(Date.UTC(2010,t,1)))}</option>`).join("")}</select></label><label>Year<input id="year" type="number" min="1" max="9998" value="2010"></label><label>First weekday<select id="week-start"><option value="1">Monday</option><option value="0">Sunday</option><option value="6">Saturday</option></select></label><label>Outside days<select id="outside"><option value="visible">Show</option><option value="hidden">Hide</option></select></label><label class="check"><input id="fixed" type="checkbox">Six weeks</label></div><div class="history-stage"><div id="history-calendar" class="sp-calendar"></div><aside><h3 id="history-title"></h3><p id="history-selection" role="status">Select a day to inspect it.</p><button id="open-popup">Open as a popup</button><div id="popup" class="calendar-popup" hidden><div id="popup-calendar" class="sp-calendar"></div><button id="close-popup">Close</button></div></aside></div>`;function ze(e){const t=new AbortController,a=(C,$,w)=>e.querySelector(C).addEventListener($,w,{signal:t.signal}),i=L({month:{year:2010,month:3},referenceDate:"2010-03-01"}),p=U(e.querySelector("#history-calendar"),i),c=()=>{e.querySelector("#history-title").textContent=Q(i.getSnapshot().visibleMonth),e.querySelector("#history-selection").textContent=D(i.getSnapshot().value)?.date??"Select a day to inspect it."};c();const y=i.subscribe(c);a("#month","change",()=>i.setVisibleMonth({year:i.getSnapshot().visibleMonth.year,month:Number(e.querySelector("#month").value)})),a("#year","input",()=>{const C=e.querySelector("#year");C.value&&C.validity.valid&&i.setVisibleMonth({year:C.valueAsNumber,month:i.getSnapshot().visibleMonth.month})}),a("#week-start","change",()=>i.setOptions({weekStartsOn:Number(e.querySelector("#week-start").value)})),a("#outside","change",()=>i.setOptions({outsideDays:e.querySelector("#outside").value})),a("#fixed","change",()=>i.setOptions({fixedWeeks:e.querySelector("#fixed").checked}));const m=U(e.querySelector("#popup-calendar"),i),f=xe(e.querySelector("#open-popup"),e.querySelector("#popup"),i,{label:"Choose a historical date"});return e.querySelector("#close-popup").addEventListener("click",()=>i.cancel(),{signal:t.signal}),()=>{t.abort(),p(),y(),m(),f(),i.destroy()}}var le=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,je=Object.getOwnPropertyNames,Ve=Object.prototype.hasOwnProperty,se=(e,t)=>{for(var a in t)le(e,a,{get:t[a],enumerable:!0})},Ue=(e,t,a,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let p of je(t))!Ve.call(e,p)&&p!==a&&le(e,p,{get:()=>t[p],enumerable:!(i=Ie(t,p))||i.enumerable});return e},de=(e,t,a)=>(Ue(e,t,"default"),a),ce={};se(ce,{createDateTimePickerStore:()=>pe,createPickerStore:()=>W,mountDateTimePicker:()=>ve,mountPicker:()=>ue});var F={};se(F,{createDateTimePickerStore:()=>pe,createPickerStore:()=>W});de(F,Z);function W(e={}){return L({...e,kind:"datetime"})}var pe=W;de(ce,F);function ue(e,t={}){if("getSnapshot"in t){if(t.getSnapshot().options.kind!=="datetime")throw new RangeError("Use a datetime store with DateTimePicker");return O(e,t)}return O(e,{...t,kind:"datetime"})}var ve=ue;const me=ke("en-GB",1,"long"),Re='<div class="calendar-navigation"><button type="button" data-picker-action="previous" aria-label="Previous month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><span data-month-heading aria-live="polite"></span><button type="button" data-picker-action="next" aria-label="Next month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button></div>',G=e=>`<fieldset class="event-endpoint"><legend>${e==="start"?"Starts":"Ends"}</legend>${I(e,"date",e==="start"?"Start date":"End date")}${I(e,"time",e==="start"?"Start time":"End time")}</fieldset>`,Be=`<div class="event-workspace"><div class="event-calendar-pane"><div id="event-navigation">${Re}</div><div class="large-calendar-shell"><div class="large-calendar sp-calendar" id="event-calendar"></div></div><p id="event-action" role="status">Choose a date to create an event.</p></div><aside id="event-editor-panel" class="event-editor-panel"><div class="event-editor-heading"><h3 id="event-editor-title">New event</h3><button type="button" id="new-event">New</button></div><form id="event-form"><label>Event title<input name="title" placeholder="Enter a title" maxlength="80" required></label><div id="event-editor" data-picker-root>${G("start")}${G("end")}</div><p id="event-error" role="alert"></p><div class="event-editor-actions"><button class="primary" type="submit" id="save-event">Add event</button><button type="button" id="cancel-event">Cancel</button></div></form><details id="event-export-panel" hidden><summary>Saved event</summary><pre id="event-export"></pre></details></aside></div><details class="weekday-customization"><summary>Weekday names and classes</summary><p>Each heading has its own text and class. The same options work for weekdays and weekends.</p><div class="weekday-editor">${me.map(e=>`<div class="weekday-editor-row"><span>${e.label}</span><label>Name<input data-weekday-label="${e.weekday}" aria-label="${e.label} name" value="${e.label}" maxlength="24"></label><label>Class<input data-weekday-class="${e.weekday}" aria-label="${e.label} class" value="${[0,6].includes(e.weekday)?"weekday-red":""}" placeholder="Your CSS class"></label></div>`).join("")}</div><p>Try <code>weekday-red</code>, <code>weekday-blue</code> or <code>weekday-bold</code>. Your own stylesheet can define any other class.</p></details>`;function Fe(e,t){const a=o=>e.querySelector(o),i=new Map;let p=0,c=null,y="";const m=a("#event-form"),f=a('[name="title"]'),C=we(t,6),$=o=>({start:{date:o,time:"09:00"},end:{date:o,time:"10:00"}}),w=ve(a("#event-editor"),{selection:"range",commit:"explicit",referenceDate:t,minDuration:60,defaultValue:$(C),month:z(C)}),x=w.store,n=re(a("#event-editor"),x),r=L({referenceDate:t,selection:"none",month:z(t),onSelect:o=>M(o)});let u;const h={};for(const o of me)h[o.weekday]={label:o.label,class:[0,6].includes(o.weekday)?"weekday-red":""};const k=(o,l)=>o.start.date<=l&&l<=o.end.date&&!(o.end.time==="00:00"&&l===o.end.date),s=(o,l)=>`${l===o.start.date?o.start.time:"Continues"}${l===o.end.date?" to "+o.end.time:""}`;function v(){u?.(),u=U(a("#event-calendar"),r,{weekdays:h,renderCell:o=>{const l=[...i.values()].filter(d=>k(d,o.date));return`<button type="button" data-day-trigger data-date="${o.date}" class="event-day-number"><span>${o.day}</span><span class="event-day-action">Add event</span></button>${l.length?'<span class="event-dot" aria-label="Has events"></span>':""}<div class="event-list">${l.map(d=>`<button type="button" data-event-id="${d.id}" class="${d.id===c?"event-editing":""}"><span>${P(d.title)}</span><small>${P(s(d,o.date))}</small></button>`).join("")}</div>`}})}function g(){a("#event-error").textContent=x.getSnapshot().error??y}function M(o,l){n.close(),r.focus(o),c=l?.id??null,y="",a("#event-editor-panel").hidden=!1,f.value=l?.title??"",x.setValue(l?{start:l.start,end:l.end}:$(o)),x.setVisibleMonth(z(l?.start.date??o)),a("#event-editor-title").textContent=l?"Edit event":"New event",a("#save-event").textContent=l?"Save changes":"Add event",a("#event-action").textContent=l?`Editing event: ${l.title}`:`New event on ${o}`,g(),v(),f.focus({preventScroll:!0})}const T=new AbortController,E=(o,l,d)=>o.addEventListener(l,d,{signal:T.signal});E(m,"submit",o=>{if(o.preventDefault(),y="",!f.value.trim()){y="Enter an event title.",g();return}const l=a("#event-editor").querySelector('[aria-invalid="true"]');if(l){y="Check the date and time fields.",g(),l.focus();return}if(!x.apply()){g();return}const d=x.getSnapshot().value;if(!d||!("start"in d)||!d.start?.date||!d.start.time||!d.end?.date||!d.end.time){y="Choose both dates and times.",g();return}const q=c!==null,S={id:c??++p,title:f.value.trim(),start:{date:d.start.date,time:d.start.time},end:{date:d.end.date,time:d.end.time}};i.set(S.id,S),c=S.id,a("#event-editor-title").textContent="Edit event",a("#save-event").textContent="Save changes",a("#event-action").textContent=`${q?"Updated":"Added"} event: ${S.title}`,a("#event-export").textContent=JSON.stringify(S,null,2),a("#event-export-panel").hidden=!1,v()}),E(f,"input",()=>{y="",g()}),E(a("#new-event"),"click",()=>M(r.getSnapshot().focusedDate)),E(a("#cancel-event"),"click",()=>{n.close(),x.cancel(),c=null,y="",a("#event-editor-panel").hidden=!0,a("#event-action").textContent="Choose a date to create an event.",v(),a("#event-calendar").querySelector(`[data-day-trigger][data-date="${r.getSnapshot().focusedDate}"]`)?.focus()}),E(a("#event-calendar"),"click",o=>{const l=o.target.closest("[data-event-id]");if(!l)return;const d=i.get(Number(l.dataset.eventId));d&&(M(d.start.date,d),a("#event-export").textContent=JSON.stringify(d,null,2),a("#event-export-panel").hidden=!1)});for(const o of e.querySelectorAll("[data-weekday-label],[data-weekday-class]"))E(o,"input",()=>{const l=Number(o.dataset.weekdayLabel??o.dataset.weekdayClass),d=o.hasAttribute("data-weekday-label")?"label":"class";h[l]={...h[l],[d]:o.value},v()});E(a("#event-navigation"),"click",o=>{const l=o.target.closest("[data-picker-action]");l&&r.navigate(l.dataset.pickerAction==="next"?1:-1)});const H=()=>{const o=r.getSnapshot(),l=a("#event-navigation [data-month-heading]"),d=Q(o.visibleMonth,o.options.locale);l.textContent!==d&&(l.textContent=d)};v(),H();const j=r.subscribe(H),b=x.subscribe(g);return()=>{T.abort(),u?.(),j(),b(),n.destroy(),w.destroy(),r.destroy()}}const We='<div id="continuous-calendar" class="sp-calendar continuous-calendar" tabindex="0" aria-label="Scrolling calendar"></div><p id="scroll-value"></p>';function Je(e,t){const a=L({referenceDate:t,selection:"range",fixedWeeks:!0}),i=Se(e.querySelector("#continuous-calendar"),a),p=a.subscribeValue(c=>e.querySelector("#scroll-value").textContent=JSON.stringify(c));return()=>{i(),p(),a.destroy()}}function Ye(e,t){const a=e.querySelector(".section-heading"),i=e.id,p=a.querySelector("h2").textContent,c=document.createElement("div");c.className="example-frame",c.innerHTML=`<div class="example-view-bar"><div class="example-view-tabs" role="tablist" aria-label="${P(p)} view"><button type="button" role="tab" id="${i}-preview-tab" aria-controls="${i}-preview" aria-selected="true" data-example-view="preview">Preview</button><button type="button" role="tab" id="${i}-code-tab" aria-controls="${i}-code" aria-selected="false" tabindex="-1" data-example-view="code">Code</button></div><span class="example-language">Vanilla</span></div><div class="example-preview" role="tabpanel" id="${i}-preview" aria-labelledby="${i}-preview-tab"></div><div class="example-code" role="tabpanel" id="${i}-code" aria-labelledby="${i}-code-tab" hidden><div class="example-code-bar"><div class="example-file-tabs" role="tablist" aria-label="${P(p)} files">${t.map((s,v)=>`<button type="button" role="tab" id="${i}-file-${v}" aria-controls="${i}-source" aria-selected="${v===0}" tabindex="${v===0?0:-1}" data-example-file="${v}">${P(s.name)}</button>`).join("")}</div><div class="example-code-actions"><button type="button" data-download-source>Download file</button><button type="button" data-copy-source>Copy code</button></div></div><pre class="example-source" id="${i}-source" role="tabpanel" tabindex="0" aria-labelledby="${i}-file-0"><code></code></pre><div class="example-code-footer"><p role="status" data-copy-status></p><a href="/docs/date-time-picker.html#setup">Package setup</a></div></div>`;const y=c.querySelector(".example-preview");for(;a.nextSibling;)y.append(a.nextSibling);e.append(c);const m=c.querySelector(".example-code"),f=c.querySelector(".example-source"),C=f.querySelector("code"),$=[...c.querySelectorAll("[data-example-view]")],w=[...c.querySelectorAll("[data-example-file]")],x=c.querySelector("[data-copy-status]");let n=0,r=!0;const u=new AbortController;function h(s){for(const v of $){const g=v.dataset.exampleView===s;v.setAttribute("aria-selected",String(g)),v.tabIndex=g?0:-1}y.hidden=s!=="preview",m.hidden=s!=="code"}function k(s){n=s;for(const[v,g]of w.entries())g.setAttribute("aria-selected",String(v===s)),g.tabIndex=v===s?0:-1;C.textContent=t[s].source,f.setAttribute("aria-labelledby",w[s].id),f.scrollTop=0,f.scrollLeft=0,x.textContent=""}k(0),c.querySelector(".example-view-tabs").addEventListener("click",s=>{const v=s.target.closest("[data-example-view]");v&&h(v.dataset.exampleView)},{signal:u.signal}),c.querySelector(".example-file-tabs").addEventListener("click",s=>{const v=s.target.closest("[data-example-file]");v&&k(Number(v.dataset.exampleFile))},{signal:u.signal});for(const s of[$,w])s[0].parentElement.addEventListener("keydown",v=>{const g=v,M=g.target.closest('[role="tab"]');if(!M||!["ArrowLeft","ArrowRight","Home","End"].includes(g.key))return;g.preventDefault();const T=s.indexOf(M),E=g.key==="Home"?0:g.key==="End"?s.length-1:(T+(g.key==="ArrowLeft"?-1:1)+s.length)%s.length;s[E].focus(),s[E].click()},{signal:u.signal});return c.querySelector("[data-copy-source]").addEventListener("click",async()=>{const s=t[n];try{await navigator.clipboard.writeText(s.source),r&&t[n]===s&&(x.textContent=`${s.name} copied.`)}catch{r&&(x.textContent="Select the code and copy it with your keyboard.")}},{signal:u.signal}),c.querySelector("[data-download-source]").addEventListener("click",()=>{const s=t[n],v=URL.createObjectURL(new Blob([s.source],{type:"text/plain;charset=utf-8"})),g=document.createElement("a");g.href=v,g.download=s.name,g.click(),setTimeout(()=>URL.revokeObjectURL(v),1e3)},{signal:u.signal}),()=>{r=!1,u.abort()}}const _e=`import { pickerControlMarkup, mountEndpointPickers } from "./picker-controls";
import {
  createPickerStore,
  type PickerStore,
  type Endpoint,
} from "@salyra-ui/calendar";
import { mountPicker } from "@salyra-ui/calendar/vanilla";
const arrow = (next: boolean) =>
  \`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="\${next ? "m9 5 7 7-7 7" : "m15 5-7 7 7 7"}"/></svg>\`;
const controls = \`<div class="calendar-navigation"><button data-picker-action="previous" aria-label="Previous month">\${arrow(false)}</button><span data-month-heading aria-live="polite"></span><button data-picker-action="next" aria-label="Next month">\${arrow(true)}</button></div>\`;
const endpoint = (name: Endpoint, kind: "date" | "time" | "datetime") =>
  \`<fieldset class="time-endpoint"><legend>\${name === "start" ? "Start" : "End"}</legend>\${pickerControlMarkup(name, "date", name === "start" ? "Start date" : "End date")}\${kind !== "date" ? pickerControlMarkup(name, "time", name === "start" ? "Start time" : "End time") : ""}</fieldset>\`;
export const intervalPickerMarkup = \`<div class="example-toolbar"><label>Picker<select id="kind"><option value="date">Date</option><option value="time">Time</option><option value="datetime">Date and time</option></select></label><label>Selection<select id="selection"><option value="range">Range</option><option value="single">Single value</option></select></label><label>Clock<select id="clock"><option value="24">24 hours</option><option value="12">12 hours</option></select></label><label class="check"><input id="seconds" type="checkbox">Seconds</label><label class="check"><input id="disabled" type="checkbox">Disabled</label></div><div class="picker-stage"><div id="picker-host"></div><aside class="output-panel"><h3>Applied value</h3><p>Only configured date and time fields are exported.</p><pre id="applied">null</pre><h3>Draft</h3><pre id="draft">null</pre><p id="picker-error" role="status"></p></aside></div>\`;
export function mountIntervalPicker(root: HTMLElement, referenceDate: string) {
  const find = <T extends HTMLElement = HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)!;
  let cleanupPicker: (() => void) | undefined, currentStore: PickerStore;
  function mountExample() {
    cleanupPicker?.();
    const kind = (root.querySelector("#kind") as HTMLSelectElement).value as
        "date" | "time" | "datetime",
      selection = (root.querySelector("#selection") as HTMLSelectElement)
        .value as "single" | "range";
    const timeOptions = {
      hourCycle: Number(
        (root.querySelector("#clock") as HTMLSelectElement).value,
      ) as 12 | 24,
      seconds: (root.querySelector("#seconds") as HTMLInputElement).checked,
    };
    const host = root.querySelector<HTMLElement>("#picker-host")!;
    host.innerHTML = \`\${kind !== "time" ? controls : ""}\${kind !== "time" ? '<div class="sp-calendar" data-calendar style="--sp-months:2"></div>' : ""}<div class="endpoint-row">\${endpoint("start", kind) + (selection === "range" ? endpoint("end", kind) : "")}</div><div class="picker-actions"><button data-picker-action="clear">Clear</button><button data-picker-action="cancel">Cancel</button><button class="primary" data-picker-action="apply">Apply</button></div>\`;
    const store = createPickerStore({
      ...timeOptions,
      kind,
      selection,
      commit: "explicit",
      referenceDate,
      month: { year: 2026, month: 10 },
      months: kind === "time" ? 1 : 2,
      fixedWeeks: true,
      disabled: (root.querySelector("#disabled") as HTMLInputElement).checked,
    });
    const mounted = mountPicker(host, store);
    currentStore = store;
    const endpointControls = mountEndpointPickers(host, currentStore);
    const update = () => {
      const s = mounted.store.getSnapshot();
      root.querySelector("#applied")!.textContent = JSON.stringify(
        s.value,
        null,
        2,
      );
      root.querySelector("#draft")!.textContent = JSON.stringify(
        s.draft,
        null,
        2,
      );
      root.querySelector("#picker-error")!.textContent = s.error ?? "";
    };
    update();
    const stop = mounted.store.subscribe(update);
    cleanupPicker = () => {
      stop();
      endpointControls.destroy();
      mounted.destroy();
      store.destroy();
    };
  }
  const handlers = new AbortController();
  root.addEventListener(
    "change",
    (event) => {
      const id = (event.target as HTMLElement).id;
      if (["clock", "seconds", "kind", "selection"].includes(id))
        mountExample();
      else if (id === "disabled")
        currentStore.setOptions({
          disabled: find<HTMLInputElement>("#disabled").checked,
        });
    },
    { signal: handlers.signal },
  );
  mountExample();
  return () => {
    handlers.abort();
    cleanupPicker?.();
  };
}
`,Ge=`import {
  createPickerStore,
  bindCalendar,
  bindPickerPopover,
  pointFor,
  formatMonth,
} from "@salyra-ui/calendar";
export const historicalCalendarMarkup = \`<div class="example-toolbar"><label>Month<select id="month">\${Array.from({ length: 12 }, (_, i) => \`<option value="\${i + 1}" \${i === 2 ? "selected" : ""}>\${new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" }).format(new Date(Date.UTC(2010, i, 1)))}</option>\`).join("")}</select></label><label>Year<input id="year" type="number" min="1" max="9998" value="2010"></label><label>First weekday<select id="week-start"><option value="1">Monday</option><option value="0">Sunday</option><option value="6">Saturday</option></select></label><label>Outside days<select id="outside"><option value="visible">Show</option><option value="hidden">Hide</option></select></label><label class="check"><input id="fixed" type="checkbox">Six weeks</label></div><div class="history-stage"><div id="history-calendar" class="sp-calendar"></div><aside><h3 id="history-title"></h3><p id="history-selection" role="status">Select a day to inspect it.</p><button id="open-popup">Open as a popup</button><div id="popup" class="calendar-popup" hidden><div id="popup-calendar" class="sp-calendar"></div><button id="close-popup">Close</button></div></aside></div>\`;
export function mountHistoricalCalendar(root: HTMLElement) {
  const handlers = new AbortController();
  const listen = (selector: string, type: string, fn: (event: Event) => void) =>
    root
      .querySelector(selector)!
      .addEventListener(type, fn, { signal: handlers.signal });
  const history = createPickerStore({
    month: { year: 2010, month: 3 },
    referenceDate: "2010-03-01",
  });
  const historyStop = bindCalendar(
    root.querySelector("#history-calendar")!,
    history,
  );
  const histUpdate = () => {
    root.querySelector("#history-title")!.textContent = formatMonth(
      history.getSnapshot().visibleMonth,
    );
    root.querySelector("#history-selection")!.textContent =
      pointFor(history.getSnapshot().value)?.date ??
      "Select a day to inspect it.";
  };
  histUpdate();
  const histSub = history.subscribe(histUpdate);
  listen("#month", "change", () =>
    history.setVisibleMonth({
      year: history.getSnapshot().visibleMonth.year,
      month: Number((root.querySelector("#month") as HTMLSelectElement).value),
    }),
  );
  listen("#year", "input", () => {
    const input = root.querySelector<HTMLInputElement>("#year")!;
    if (input.value && input.validity.valid)
      history.setVisibleMonth({
        year: input.valueAsNumber,
        month: history.getSnapshot().visibleMonth.month,
      });
  });
  listen("#week-start", "change", () =>
    history.setOptions({
      weekStartsOn: Number(
        (root.querySelector("#week-start") as HTMLSelectElement).value,
      ),
    }),
  );
  listen("#outside", "change", () =>
    history.setOptions({
      outsideDays: (root.querySelector("#outside") as HTMLSelectElement)
        .value as "visible" | "hidden",
    }),
  );
  listen("#fixed", "change", () =>
    history.setOptions({
      fixedWeeks: (root.querySelector("#fixed") as HTMLInputElement).checked,
    }),
  );
  const popupStop = bindCalendar(
    root.querySelector("#popup-calendar")!,
    history,
  );
  const stopPopover = bindPickerPopover(
    root.querySelector("#open-popup")!,
    root.querySelector("#popup")!,
    history,
    { label: "Choose a historical date" },
  );
  root
    .querySelector("#close-popup")!
    .addEventListener("click", () => history.cancel(), {
      signal: handlers.signal,
    });
  return () => {
    handlers.abort();
    historyStop();
    histSub();
    popupStop();
    stopPopover();
    history.destroy();
  };
}
`,Ze=`import {
  createPickerStore,
  bindCalendar,
  escapeHTML,
  weekdayLabels,
  addDays,
  parseDate,
  formatMonth,
  type CalendarRenderOptions,
} from "@salyra-ui/calendar";
import { pickerControlMarkup, mountEndpointPickers } from "./picker-controls";
import { mountDateTimePicker } from "@salyra-ui/date-time-picker/vanilla";

type EventPoint = { date: string; time: string };
type CalendarEvent = {
  id: number;
  title: string;
  start: EventPoint;
  end: EventPoint;
};
const dayNames = weekdayLabels("en-GB", 1, "long");
const navigation = \`<div class="calendar-navigation"><button type="button" data-picker-action="previous" aria-label="Previous month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg></button><span data-month-heading aria-live="polite"></span><button type="button" data-picker-action="next" aria-label="Next month"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button></div>\`;
const endpoint = (name: "start" | "end") =>
  \`<fieldset class="event-endpoint"><legend>\${name === "start" ? "Starts" : "Ends"}</legend>\${pickerControlMarkup(name, "date", name === "start" ? "Start date" : "End date")}\${pickerControlMarkup(name, "time", name === "start" ? "Start time" : "End time")}</fieldset>\`;

export const eventCalendarMarkup = \`<div class="event-workspace"><div class="event-calendar-pane"><div id="event-navigation">\${navigation}</div><div class="large-calendar-shell"><div class="large-calendar sp-calendar" id="event-calendar"></div></div><p id="event-action" role="status">Choose a date to create an event.</p></div><aside id="event-editor-panel" class="event-editor-panel"><div class="event-editor-heading"><h3 id="event-editor-title">New event</h3><button type="button" id="new-event">New</button></div><form id="event-form"><label>Event title<input name="title" placeholder="Enter a title" maxlength="80" required></label><div id="event-editor" data-picker-root>\${endpoint("start")}\${endpoint("end")}</div><p id="event-error" role="alert"></p><div class="event-editor-actions"><button class="primary" type="submit" id="save-event">Add event</button><button type="button" id="cancel-event">Cancel</button></div></form><details id="event-export-panel" hidden><summary>Saved event</summary><pre id="event-export"></pre></details></aside></div><details class="weekday-customization"><summary>Weekday names and classes</summary><p>Each heading has its own text and class. The same options work for weekdays and weekends.</p><div class="weekday-editor">\${dayNames.map((day) => \`<div class="weekday-editor-row"><span>\${day.label}</span><label>Name<input data-weekday-label="\${day.weekday}" aria-label="\${day.label} name" value="\${day.label}" maxlength="24"></label><label>Class<input data-weekday-class="\${day.weekday}" aria-label="\${day.label} class" value="\${[0, 6].includes(day.weekday) ? "weekday-red" : ""}" placeholder="Your CSS class"></label></div>\`).join("")}</div><p>Try <code>weekday-red</code>, <code>weekday-blue</code> or <code>weekday-bold</code>. Your own stylesheet can define any other class.</p></details>\`;

/** Example application behavior. The package emits dates and owns no event editor. */
export function mountEventCalendar(root: HTMLElement, referenceDate: string) {
  const find = <T extends HTMLElement = HTMLElement>(selector: string) =>
    root.querySelector<T>(selector)!;
  const events = new Map<number, CalendarEvent>();
  let sequence = 0,
    editingId: number | null = null,
    manualError = "";
  const form = find<HTMLFormElement>("#event-form"),
    title = find<HTMLInputElement>('[name="title"]');
  const initialDate = addDays(referenceDate, 6);
  const interval = (date: string) => ({
    start: { date, time: "09:00" },
    end: { date, time: "10:00" },
  });
  const picker = mountDateTimePicker(find("#event-editor"), {
    selection: "range",
    commit: "explicit",
    referenceDate,
    minDuration: 60,
    defaultValue: interval(initialDate),
    month: parseDate(initialDate),
  });
  const editorStore = picker.store;
  const editorControls = mountEndpointPickers(
    find("#event-editor"),
    editorStore,
  );
  const calendarStore = createPickerStore({
    referenceDate,
    selection: "none",
    month: parseDate(referenceDate),
    onSelect: (date) => openEditor(date),
  });
  let stopCalendar: (() => void) | undefined;
  const weekdays: NonNullable<CalendarRenderOptions["weekdays"]> = {};
  for (const day of dayNames)
    weekdays[day.weekday] = {
      label: day.label,
      class: [0, 6].includes(day.weekday) ? "weekday-red" : "",
    };
  const covers = (event: CalendarEvent, date: string) =>
    event.start.date <= date &&
    date <= event.end.date &&
    !(event.end.time === "00:00" && date === event.end.date);
  const clockText = (event: CalendarEvent, date: string) =>
    \`\${date === event.start.date ? event.start.time : "Continues"}\${date === event.end.date ? " to " + event.end.time : ""}\`;
  function renderCalendar() {
    stopCalendar?.();
    stopCalendar = bindCalendar(find("#event-calendar"), calendarStore, {
      weekdays,
      renderCell: (day) => {
        const items = [...events.values()].filter((event) =>
          covers(event, day.date),
        );
        return \`<button type="button" data-day-trigger data-date="\${day.date}" class="event-day-number"><span>\${day.day}</span><span class="event-day-action">Add event</span></button>\${items.length ? '<span class="event-dot" aria-label="Has events"></span>' : ""}<div class="event-list">\${items.map((event) => \`<button type="button" data-event-id="\${event.id}" class="\${event.id === editingId ? "event-editing" : ""}"><span>\${escapeHTML(event.title)}</span><small>\${escapeHTML(clockText(event, day.date))}</small></button>\`).join("")}</div>\`;
      },
    });
  }
  function showError() {
    find("#event-error").textContent =
      editorStore.getSnapshot().error ?? manualError;
  }
  function openEditor(date: string, event?: CalendarEvent) {
    editorControls.close();
    calendarStore.focus(date);
    editingId = event?.id ?? null;
    manualError = "";
    find("#event-editor-panel").hidden = false;
    title.value = event?.title ?? "";
    editorStore.setValue(
      event ? { start: event.start, end: event.end } : interval(date),
    );
    editorStore.setVisibleMonth(parseDate(event?.start.date ?? date));
    find("#event-editor-title").textContent = event
      ? "Edit event"
      : "New event";
    find("#save-event").textContent = event ? "Save changes" : "Add event";
    find("#event-action").textContent = event
      ? \`Editing event: \${event.title}\`
      : \`New event on \${date}\`;
    showError();
    renderCalendar();
    title.focus({ preventScroll: true });
  }
  const handlers = new AbortController();
  const listen = (
    el: HTMLElement,
    type: string,
    handler: (event: Event) => void,
  ) => el.addEventListener(type, handler, { signal: handlers.signal });
  listen(form, "submit", (event) => {
    event.preventDefault();
    manualError = "";
    if (!title.value.trim()) {
      manualError = "Enter an event title.";
      showError();
      return;
    }
    const invalid = find("#event-editor").querySelector<HTMLElement>(
      '[aria-invalid="true"]',
    );
    if (invalid) {
      manualError = "Check the date and time fields.";
      showError();
      invalid.focus();
      return;
    }
    if (!editorStore.apply()) {
      showError();
      return;
    }
    const value = editorStore.getSnapshot().value;
    if (
      !value ||
      !("start" in value) ||
      !value.start?.date ||
      !value.start.time ||
      !value.end?.date ||
      !value.end.time
    ) {
      manualError = "Choose both dates and times.";
      showError();
      return;
    }
    const wasEditing = editingId !== null;
    const saved: CalendarEvent = {
      id: editingId ?? ++sequence,
      title: title.value.trim(),
      start: { date: value.start.date, time: value.start.time },
      end: { date: value.end.date, time: value.end.time },
    };
    events.set(saved.id, saved);
    editingId = saved.id;
    find("#event-editor-title").textContent = "Edit event";
    find("#save-event").textContent = "Save changes";
    find("#event-action").textContent =
      \`\${wasEditing ? "Updated" : "Added"} event: \${saved.title}\`;
    find("#event-export").textContent = JSON.stringify(saved, null, 2);
    find("#event-export-panel").hidden = false;
    renderCalendar();
  });
  listen(title, "input", () => {
    manualError = "";
    showError();
  });
  listen(find("#new-event"), "click", () =>
    openEditor(calendarStore.getSnapshot().focusedDate),
  );
  listen(find("#cancel-event"), "click", () => {
    editorControls.close();
    editorStore.cancel();
    editingId = null;
    manualError = "";
    find("#event-editor-panel").hidden = true;
    find("#event-action").textContent = "Choose a date to create an event.";
    renderCalendar();
    const button = find("#event-calendar").querySelector<HTMLButtonElement>(
      \`[data-day-trigger][data-date="\${calendarStore.getSnapshot().focusedDate}"]\`,
    );
    button?.focus();
  });
  listen(find("#event-calendar"), "click", (event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-event-id]",
    );
    if (!button) return;
    const saved = events.get(Number(button.dataset.eventId));
    if (saved) {
      openEditor(saved.start.date, saved);
      find("#event-export").textContent = JSON.stringify(saved, null, 2);
      find("#event-export-panel").hidden = false;
    }
  });
  for (const input of root.querySelectorAll<HTMLInputElement>(
    "[data-weekday-label],[data-weekday-class]",
  ))
    listen(input, "input", () => {
      const day = Number(
          input.dataset.weekdayLabel ?? input.dataset.weekdayClass,
        ),
        key = input.hasAttribute("data-weekday-label") ? "label" : "class";
      weekdays[day] = { ...weekdays[day], [key]: input.value };
      renderCalendar();
    });
  listen(find("#event-navigation"), "click", (event) => {
    const button = (event.target as Element).closest<HTMLElement>(
      "[data-picker-action]",
    );
    if (!button) return;
    calendarStore.navigate(button.dataset.pickerAction === "next" ? 1 : -1);
  });
  const updateHeading = () => {
    const state = calendarStore.getSnapshot(),
      heading = find("#event-navigation [data-month-heading]"),
      label = formatMonth(state.visibleMonth, state.options.locale);
    if (heading.textContent !== label) heading.textContent = label;
  };
  renderCalendar();
  updateHeading();
  const stopHeading = calendarStore.subscribe(updateHeading),
    stopError = editorStore.subscribe(showError);
  return () => {
    handlers.abort();
    stopCalendar?.();
    stopHeading();
    stopError();
    editorControls.destroy();
    picker.destroy();
    calendarStore.destroy();
  };
}
`,Ke=`import { createPickerStore, bindMonthScroller } from "@salyra-ui/calendar";
export const scrollingCalendarMarkup =
  '<div id="continuous-calendar" class="sp-calendar continuous-calendar" tabindex="0" aria-label="Scrolling calendar"></div><p id="scroll-value"></p>';
export function mountScrollingCalendar(
  root: HTMLElement,
  referenceDate: string,
) {
  const scrollStore = createPickerStore({
      referenceDate,
      selection: "range",
      fixedWeeks: true,
    }),
    scrollStop = bindMonthScroller(
      root.querySelector("#continuous-calendar")!,
      scrollStore,
    );
  const scrollSub = scrollStore.subscribeValue(
    (value) =>
      (root.querySelector("#scroll-value")!.textContent =
        JSON.stringify(value)),
  );
  return () => {
    scrollStop();
    scrollSub();
    scrollStore.destroy();
  };
}
`,Qe=`:where(.example-preview) {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #181818;
  --rule: #dddde2;
  --accent: #e4002b;
}
:where(.example-preview) * {
  box-sizing: border-box;
}
:where(.example-preview) button,
:where(.example-preview) input,
:where(.example-preview) select {
  font: inherit;
  border: 1px solid var(--rule);
  border-radius: 0;
  min-height: 40px;
  padding: 8px 12px;
  color: inherit;
  background: #fff;
}
:where(.example-preview) button {
  cursor: pointer;
}
:where(.example-preview) :is(button, input, select):disabled {
  opacity: 0.4;
  cursor: default;
}
:where(.example-preview) :is(button, input, select):focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}
:where(.example-preview) button:hover:not(:disabled) {
  border-color: #181818;
}
:where(.example-preview) label {
  display: grid;
  align-content: start;
  gap: 8px;
  font-size: 12px;
}
:where(.example-preview) h3 {
  font-size: 14px;
  margin: 0 0 16px;
}
:where(.example-preview) p {
  line-height: 1.6;
}
:where(.example-preview) pre {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font:
    12px/1.6 ui-monospace,
    monospace;
  margin: 0 0 28px;
}

.example-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--rule);
  margin-bottom: 24px;
}
.example-toolbar label {
  min-width: 120px;
}
.check {
  display: flex;
  align-items: center;
  align-self: center;
  gap: 8px;
}
.check input {
  min-height: 0;
  width: 16px;
  height: 16px;
  accent-color: var(--accent);
}
.example-toolbar input[type="number"] {
  width: 100px;
}
.picker-stage {
  display: grid;
  grid-template-columns: minmax(0, 2.2fr) minmax(220px, 1fr);
  border: 1px solid var(--rule);
}
#picker-host {
  padding: 28px;
  min-width: 0;
}
.output-panel {
  padding: 28px;
  background: #f7f7f8;
  border-left: 1px solid var(--rule);
  min-width: 0;
}
.output-panel p {
  font-size: 12px;
  color: #626262;
  margin-bottom: 24px;
}
.output-panel #picker-error {
  color: var(--accent);
}
.calendar-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 12px;
}
.calendar-navigation span {
  font-size: 14px;
}
.calendar-navigation button {
  display: grid;
  place-items: center;
  width: 40px;
  padding: 8px;
}
.calendar-navigation svg {
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
.endpoint-row {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding-top: 28px;
  margin-top: 24px;
  border-top: 1px solid var(--rule);
}
.endpoint-row > label {
  flex: 1;
  min-width: 160px;
}
.time-endpoint {
  padding: 0;
  margin: 0;
  border: 0;
  flex: 1;
  min-width: 180px;
}
.time-endpoint legend {
  padding: 0;
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 600;
}
.time-endpoint > label {
  margin-bottom: 16px;
}
.time-endpoint > label input {
  width: 100%;
}
.sp-time input {
  border-radius: 0;
}
.picker-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}
.primary {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.primary:hover:not(:disabled) {
  background: #c90026;
  border-color: #c90026;
}
.history-stage {
  display: grid;
  grid-template-columns: minmax(250px, 1fr) 1fr;
  gap: 48px;
}
#history-calendar {
  max-width: 420px;
  border: 1px solid var(--rule);
  padding: 24px;
}
.history-stage aside {
  padding: 24px 0;
  position: relative;
}
.history-stage aside p {
  font-size: 13px;
  color: #626262;
}
.calendar-popup {
  position: absolute;
  z-index: 3;
  background: #fff;
  border: 1px solid var(--rule);
  padding: 24px;
  min-width: 320px;
  top: 115px;
  left: 0;
}
.calendar-popup[hidden] {
  display: none;
}
.calendar-popup > button {
  margin-top: 16px;
}
.large-calendar-shell {
  overflow-x: auto;
}
.large-calendar {
  min-width: 660px;
}
.large-calendar .sp-grid td {
  height: 108px;
  border: 1px solid var(--rule);
  vertical-align: top;
  text-align: left;
  padding: 8px;
}
.large-calendar .sp-grid th {
  text-align: left;
  padding: 8px;
  height: 40px;
}
.large-calendar [data-day-trigger] {
  width: 30px;
  height: 30px;
  min-height: 30px;
  padding: 0;
  font-size: 12px;
}
.event-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  margin-left: 5px;
}
.event-list {
  display: grid;
  gap: 4px;
  margin-top: 6px;
}
.event-list button {
  font-size: 11px;
  text-align: left;
  padding: 4px 6px;
  min-height: 24px;
  overflow-wrap: anywhere;
  background: #f7f7f8;
}
#event-action {
  font-size: 13px;
}
@media (max-width: 900px) {
  .picker-stage {
    grid-template-columns: 1fr;
  }
  .output-panel {
    border-left: 0;
    border-top: 1px solid var(--rule);
  }
  .history-stage {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
@media (max-width: 640px) {
  #picker-host,
  .output-panel {
    padding: 20px;
  }
  .calendar-popup {
    min-width: 0;
    width: min(340px, 90vw);
  }
}

.continuous-calendar {
  display: block;
  height: 440px;
  max-width: 420px;
  overflow: auto;
  border: 1px solid var(--rule);
}
.sp-scroll-month {
  padding: 16px 24px;
}
.event-workspace {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 32px;
  align-items: start;
}
.event-calendar-pane {
  min-width: 0;
}
.event-editor-panel {
  padding: 24px;
  background: #f7f7f8;
  border: 1px solid var(--rule);
}
.event-editor-panel[hidden] {
  display: none;
}
.event-editor-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}
.event-editor-heading h3 {
  margin: 0;
  font-size: 20px;
  letter-spacing: -0.6px;
}
.event-editor-heading button {
  min-height: 32px;
  padding: 4px 10px;
  font-size: 12px;
}
#event-form {
  display: grid;
  gap: 20px;
}
#event-form label {
  display: grid;
  gap: 8px;
  font-size: 12px;
  min-width: 0;
}
#event-form input {
  width: 100%;
  min-width: 0;
  background: white;
}
#event-editor {
  display: grid;
  gap: 20px;
}
.event-endpoint {
  min-width: 0;
  border: 0;
  border-top: 1px solid var(--rule);
  padding: 16px 0 0;
  margin: 0;
  display: grid;
  gap: 12px;
}
.event-endpoint legend {
  padding: 0 10px 0 0;
  font-size: 13px;
  font-weight: 700;
}
.event-editor-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.event-editor-actions button {
  flex: 1;
  font-size: 13px;
}
#event-error {
  color: var(--accent);
  font-size: 12px;
  margin: 0;
}
#event-error:empty {
  display: none;
}
#event-export-panel {
  margin-top: 20px;
  font-size: 12px;
}
#event-export {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  margin: 12px 0 0;
  font-size: 11px;
  line-height: 1.6;
}
.large-calendar [data-day-trigger].event-day-number {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  padding: 0 4px;
  background: transparent;
}
.event-day-action {
  opacity: 0;
  font-size: 10px;
}
.event-day-number:hover .event-day-action,
.event-day-number:focus-visible .event-day-action {
  opacity: 1;
}
.event-list button {
  display: grid;
  gap: 4px;
  width: 100%;
}
.event-list button small {
  font-size: 10px;
  color: #626262;
}
.event-list button.event-editing {
  border-color: var(--accent);
}
.weekday-customization {
  margin-top: 32px;
  border-top: 1px solid var(--rule);
  padding-top: 20px;
  font-size: 13px;
}
.weekday-customization summary {
  cursor: pointer;
  font-weight: 600;
}
.weekday-customization p {
  color: #626262;
  line-height: 1.6;
}
.weekday-editor {
  display: grid;
  gap: 12px;
  max-width: 720px;
}
.weekday-editor-row {
  display: grid;
  grid-template-columns: 100px minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  align-items: end;
}
.weekday-editor-row > span {
  align-self: center;
}
.weekday-editor-row label {
  display: grid;
  gap: 6px;
  font-size: 11px;
}
.weekday-editor-row input {
  width: 100%;
  min-width: 0;
  font-size: 13px;
}
.sp-grid th.weekday-red {
  color: #e4002b;
}
.sp-grid th.weekday-blue {
  color: #002fa7;
}
.sp-grid th.weekday-bold {
  font-weight: 700;
}
@media (max-width: 1050px) {
  .event-workspace {
    grid-template-columns: minmax(0, 1fr);
  }
  .event-editor-panel {
    max-width: 560px;
  }
}
@media (max-width: 520px) {
  .weekday-editor-row {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 8px;
  }
  .weekday-editor-row > span {
    grid-column: 1/-1;
    margin-top: 8px;
  }
  .event-editor-panel {
    padding: 20px;
  }
}
.event-calendar-pane .large-calendar [data-part="month-title"] {
  display: none;
}
@media (max-width: 520px) {
  .event-calendar-pane .large-calendar {
    min-width: 0;
  }
  .event-calendar-pane .sp-grid th {
    font-size: 9px;
    padding: 4px 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4;
  }
  .event-calendar-pane .sp-grid td {
    padding: 4px 2px;
    height: 88px;
  }
  .event-day-action {
    display: none;
  }
  .event-list button {
    padding: 3px 2px;
    font-size: 9px;
  }
  .event-list button small {
    font-size: 8px;
  }
}

.event-endpoint .picker-control + .picker-control {
  margin-top: 0;
}

#event-export-panel summary {
  cursor: pointer;
}
`;function Xe(e,t,a,i){return`import { ${t}, ${a} } from './${e}';
import '@salyra-ui/calendar/styles.css';
import './demo-styles.css';

// Your page contains <div id="example"></div>.
const root = document.querySelector<HTMLElement>('#example')!;
root.classList.add('example-preview');
root.innerHTML = ${t};
const stop = ${a}(root${i?", '2026-10-03'":""});

window.addEventListener('pagehide', stop, { once: true });`}function N(e,t,a,i,p,c=!1){return[{name:"example.ts",source:Xe(e,t,a,p)},{name:`${e}.ts`,source:i},{name:"demo-styles.css",source:Qe},...c?[{name:"picker-controls.ts",source:Ce},{name:"picker-controls.css",source:$e}]:[]]}const et={picker:N("interval-picker","intervalPickerMarkup","mountIntervalPicker",_e,!0,!0),historical:N("historical-calendar","historicalCalendarMarkup","mountHistoricalCalendar",Ge,!1),events:N("event-calendar","eventCalendarMarkup","mountEventCalendar",Ze,!0,!0),scrolling:N("scrolling-calendar","scrollingCalendarMarkup","mountScrollingCalendar",Ke,!0)},tt=document.querySelector("#app"),V="2026-10-03",nt=ge();tt.innerHTML=`${nt}<main><section class="hero"><div><p class="eyebrow">Calendar & date pickers</p><h1>Dates, on<br>your terms.</h1><p class="lead">Pick a day, an hour or a range. Move the controls, add your content and keep the same calendar logic.</p><a class="text-link" href="/docs/date-time-picker.html">Explore the API</a></div><div class="hero-note"><span class="large-number">31</span><p>Calendar cells with your own<br>numbers, events and controls.</p></div></section><section class="example-section" id="picker"><div class="section-heading"><h2>Choose an interval</h2><p>Try date, time and date-time selection. Apply commits the draft. Cancel keeps the saved value.</p></div>${Ae}</section><section class="example-section" id="historical"><div class="section-heading"><h2>Any month, any year</h2><p>March 2010 starts on a Monday. Change the month, week start or outside days and inspect the actual grid.</p></div>${Ne}</section><section class="example-section" id="events"><div class="section-heading"><h2>Your calendar, your cells</h2><p>Click a day to create an event. Choose when it starts and ends, then open a saved event from any day it covers.</p></div>${Be}</section><section class="example-section" id="scrolling"><div class="section-heading"><h2>Keep scrolling</h2><p>A small window of months stays mounted while the calendar scrolls. Selection follows the same range store.</p></div>${We}</section><section class="example-section"><div class="section-heading"><h2>One core, your stack</h2><p>React, Svelte, Vue, Angular, Astro and Vanilla adapters share the same calculations. The stylesheet is optional.</p></div><div class="framework-list">${["React","Svelte","Vue","Angular","Astro","Vanilla"].map(e=>`<a href="/docs/date-time-picker.html?framework=${e.toLowerCase()}">${e}</a>`).join("")}</div></section></main>${be()}`;const A=e=>document.querySelector(`#${e}`),at=["picker","historical","events","scrolling"].map(e=>Ye(A(e),et[e])),ot=[...at,Oe(A("picker"),V),ze(A("historical")),Fe(A("events"),V),Je(A("scrolling"),V)];window.addEventListener("pagehide",()=>ot.forEach(e=>e()),{once:!0});
