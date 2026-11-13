(function(){
var KEY="tcs_crm_demo_v3";
var TYPES={lc:"Line clean",mt:"Maintenance",br:"Callout",in:"Installation",ev:"Event bar / party kegs"};
var STAGES=["Enquiry","Quoted","Booked","Done","Invoiced","Paid"];
var ISTAGES=["Enquiry","Site survey","Quoted","Scheduled","Installed","Invoiced","Paid"];
var DEF={
 eng:[{id:"d",name:"Dean",area:"South-west London"},{id:"m",name:"Marco",area:"Central and east London"},{id:"k",name:"Kyle",area:"Surrey and Staines"}],
 venues:[
  {id:1,name:"The Quillbrook Arms",type:"Pub",town:"Staines-upon-Thames",contact:"Dan (licensee)",phone:"07700 900101",lines:10,cooler:"Remote cellar cooler",python:"6-way python, 12m run",gas:"Mixed gas and CO2 panel",cycle:7,last:-9,notes:"Cellar down a steep stair, key from the bar. Lager lines 3 and 4 fob after a delivery."},
  {id:2,name:"Larkspur Tap House",type:"Bar",town:"Shoreditch, London",contact:"Priya (bar manager)",phone:"07700 900102",lines:14,cooler:"Two under-counter coolers",python:"8-way python",gas:"Mixed gas, 2 regulators",cycle:7,last:-7,notes:"Craft taps change weekly. Clean before 11am opening."},
  {id:3,name:"The Hollin &amp; Hare",type:"Pub",town:"Clapham, London",contact:"Sophie (GM)",phone:"07700 900103",lines:12,cooler:"Remote cellar cooler",python:"8-way python",gas:"Mixed gas panel",cycle:7,last:-6,notes:"Deliveries Tuesday mornings, avoid 7 to 9am."},
  {id:4,name:"Copperwell Social Club",type:"Club",town:"Ashford, Surrey",contact:"Graham (steward)",phone:"07700 900104",lines:6,cooler:"Remote cooler",python:"4-way python",gas:"CO2",cycle:14,last:-16,notes:"Committee signs off work over a set amount. Busy on match days."},
  {id:5,name:"Kestrel Lane Kitchen",type:"Restaurant",town:"Kingston upon Thames",contact:"Luca (owner)",phone:"07700 900105",lines:3,cooler:"Under-counter cooler",python:"Short run",gas:"Mixed gas",cycle:14,last:-1,notes:"Prefers WhatsApp to calls."},
  {id:6,name:"The Gilded Hop",type:"Bar",town:"Camden, London",contact:"Ellie (bar manager)",phone:"07700 900106",lines:16,cooler:"Remote cooler, 2 fans",python:"10-way python",gas:"Mixed gas panel",cycle:7,last:-7,notes:"Late licence at weekends. Breakdown history on the cooler."},
  {id:7,name:"Riverbend Rowing Club",type:"Club",town:"Walton-on-Thames",contact:"Mark (bar secretary)",phone:"07700 900107",lines:4,cooler:"Under-counter cooler",python:"Short run",gas:"CO2",cycle:14,last:-12,notes:"Bar open evenings and weekends only."},
  {id:8,name:"The Tallow &amp; Vine",type:"Pub",town:"Woking",contact:"Rob (licensee)",phone:"07700 900108",lines:8,cooler:"Remote cellar cooler",python:"6-way python",gas:"Mixed gas panel",cycle:7,last:-7,notes:"Parking at the rear."},
  {id:9,name:"Marlowe Street Bar",type:"Bar",town:"Battersea, London",contact:"Jess (bar manager)",phone:"07700 900109",lines:9,cooler:"Remote cooler",python:"6-way python",gas:"Mixed gas, 2 regulators",cycle:7,last:-6,notes:"Cellar shared with the kitchen store."},
  {id:10,name:"The Fennick Inn",type:"Pub",town:"Guildford",contact:"Pete (licensee)",phone:"07700 900110",lines:7,cooler:"Remote cellar cooler",python:"4-way python",gas:"CO2 and mixed gas",cycle:14,last:-5,notes:"Cask on 3 hand pulls (not ours)."},
  {id:11,name:"Northvale Social",type:"Bar",town:"Hammersmith, London",contact:"Tom (owner)",phone:"07700 900111",lines:10,cooler:"Remote cooler",python:"8-way python",gas:"Mixed gas panel",cycle:7,last:-4,notes:"Opens at 4pm weekdays."},
  {id:12,name:"Quillmark Brewing Co",type:"Brewery",town:"Bermondsey, London",contact:"Hal (head brewer)",phone:"07700 900112",lines:24,cooler:"Cold room manifold",python:"Bespoke runs",gas:"Mixed gas, 4 regulators",cycle:0,last:null,notes:"Installation client. Taproom extension planned."},
  {id:13,name:"Larchpoint Brewery Taproom",type:"Brewery",town:"Hackney Wick, London",contact:"Niamh (operations)",phone:"07700 900113",lines:16,cooler:"Glycol chiller",python:"25m run planned",gas:"Mixed gas",cycle:0,last:null,notes:"Installation client. Second bar planned."},
  {id:14,name:"Ellis and Grant wedding",type:"Event client",town:"Weybridge",contact:"Hannah Ellis",phone:"07700 900114",lines:2,cooler:"Event cooler (ours)",python:"n/a",gas:"CO2 (ours)",cycle:0,last:null,notes:"Event bar, 2 kegs, marquee. Set-up Saturday morning."}],
 jobs:[
  {id:101,v:6,t:"br",stage:"Booked",day:0,h:"08:15",e:"m",note:"No pour on 4 lines, cooler alarm (via WhatsApp 07:52)"},
  {id:102,v:2,t:"lc",stage:"Booked",day:0,h:"09:30",e:"m",note:"Weekly clean, 14 lines"},
  {id:103,v:1,t:"br",stage:"Booked",day:0,h:"10:45",e:"k",note:"Fobbing on lager after a delivery"},
  {id:104,v:8,t:"lc",stage:"Booked",day:0,h:"13:00",e:"k",note:"Weekly clean, 8 lines"},
  {id:105,v:9,t:"br",stage:"Booked",day:0,h:"14:30",e:"d",note:"Gas regulator fault, 2 lines down"},
  {id:106,v:3,t:"mt",stage:"Booked",day:0,h:"16:00",e:"d",note:"Cooler service"},
  {id:107,v:11,t:"br",stage:"Enquiry",day:0,h:"12:40",e:"",note:"Slow pour on 3 lines, python may be iced (WhatsApp)"},
  {id:108,v:5,t:"lc",stage:"Done",day:-1,h:"09:00",e:"k",note:"Fortnightly clean, job sheet drafted"},
  {id:109,v:4,t:"br",stage:"Done",day:-1,h:"18:20",e:"k",note:"Coupler seal replaced"},
  {id:110,v:10,t:"lc",stage:"Invoiced",day:-5,h:"09:00",e:"k",note:"Fortnightly clean",inv:5},
  {id:111,v:7,t:"br",stage:"Invoiced",day:-9,h:"19:10",e:"d",note:"Warm beer, fan replaced",inv:9},
  {id:112,v:6,t:"lc",stage:"Paid",day:-7,h:"08:00",e:"m",note:"Weekly clean"},
  {id:113,v:1,t:"br",stage:"Paid",day:-12,h:"19:40",e:"k",note:"Fobbing on lager, coupler seal"},
  {id:114,v:3,t:"lc",stage:"Booked",day:1,h:"09:00",e:"d",note:"Weekly clean, 12 lines"},
  {id:115,v:9,t:"lc",stage:"Booked",day:1,h:"11:00",e:"d",note:"Weekly clean, 9 lines"},
  {id:116,v:7,t:"lc",stage:"Booked",day:2,h:"10:00",e:"k",note:"Fortnightly clean, 4 lines"},
  {id:117,v:5,t:"mt",stage:"Booked",day:2,h:"14:00",e:"k",note:"Font drip, tap washer"},
  {id:118,v:11,t:"lc",stage:"Booked",day:3,h:"09:00",e:"m",note:"Weekly clean, 10 lines"},
  {id:119,v:14,t:"ev",stage:"Quoted",day:2,h:"09:00",e:"",note:"Event bar, 2 kegs, marquee"},
  {id:201,v:12,t:"in",stage:"Site survey",day:1,h:"15:00",e:"m",note:"Taproom extension: 12-tap font and cellar run"},
  {id:202,v:13,t:"in",stage:"Quoted",day:6,h:"10:00",e:"",note:"Second bar: 8 lines, 25m python run"},
  {id:203,v:12,t:"in",stage:"Invoiced",day:-4,h:"08:00",e:"m",note:"Cold room manifold replaced",inv:4}],
 auto:{w:true,a:true,b:true,c:true,d:true,e:true,f:true,p:true,g:true,z:true},
 handled:{wa:19,booked:9,assigned:9,reminders:6,invoices:4,chased:3,reviews:2,toJohn:3},
 reviews:4,
 log:["Sample data loaded. Every venue, person and job here is fictional."]
};
var S;
function load(){try{var s=localStorage.getItem(KEY);if(s)return JSON.parse(s);}catch(e){}return JSON.parse(JSON.stringify(DEF));}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
S=load();
function $(q){return document.querySelector(q);}
var T0=new Date();T0.setHours(0,0,0,0);
function d(off){var x=new Date(T0);x.setDate(x.getDate()+off);return x;}
function fmt(x){return x.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});}
function V(id){for(var i=0;i<S.venues.length;i++)if(S.venues[i].id===id)return S.venues[i];}
function E(id){for(var i=0;i<S.eng.length;i++)if(S.eng[i].id===id)return S.eng[i];return null;}
function en(id){var e=E(id);return e?e.name:"Unassigned";}
function nextOff(v){return (v.last===null||!v.cycle)?null:v.last+v.cycle;}
function tag(t){return '<span class="tag t-'+t+'">'+TYPES[t]+'</span>';}
function toast(m){var t=$(".toast");t.innerHTML=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("on");},2800);}
function addLog(m){var now=new Date();S.log.unshift(m+' <em>'+now.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})+'</em>');S.log=S.log.slice(0,30);save();}
function isInst(j){return j.t==="in";}
function overdue(){return S.venues.filter(function(v){var n=nextOff(v);return n!==null&&n<0;});}
function dueWeek(){return S.venues.filter(function(v){var n=nextOff(v);return n!==null&&n>=0&&n<7;});}
function openBr(){return S.jobs.filter(function(j){return j.t==="br"&&["Enquiry","Quoted","Booked"].indexOf(j.stage)>=0;});}
function unpaid(){return S.jobs.filter(function(j){return j.stage==="Invoiced";});}
function todays(){return S.jobs.filter(function(j){return j.day===0&&!isInst(j)&&(j.stage==="Booked"||j.stage==="Enquiry");}).sort(function(a,b){return a.h<b.h?-1:1;});}

var R={};
R.dashboard=function(m){
 var H=S.handled;
 var k=[["Jobs today",todays().length,"calendar.html"],["Open callouts",openBr().length,"pipeline.html","red"],["Cleans due this week",dueWeek().length,"venues.html"],
  ["Overdue cleans",overdue().length,"venues.html","red"],["Unpaid invoices",unpaid().length,"pipeline.html"],["Messages AI answered today",H.wa,"inbox.html"]];
 var h='<div class="kpis">'+k.map(function(x){return '<a class="kpi '+(x[3]||"")+'" href="'+x[2]+'"><b>'+x[1]+'</b><span>'+x[0]+'</span></a>';}).join("")+'</div>';
 h+='<div class="grid2"><div>';
 h+='<div class="card"><h3>Handled without you today <span class="chip">Sample data</span></h3><div class="hw">'
  +[[H.wa,"WhatsApp and text messages answered"],[H.booked,"callouts and cleans booked"],[H.assigned,"jobs sent to engineers&rsquo; phones"],[H.reminders,"clean reminders sent"],[H.invoices,"invoices sent"],[H.chased,"payments chased"],[H.reviews,"review requests sent"]]
   .map(function(x){return '<div><b>'+x[0]+'</b>'+x[1]+'</div>';}).join("")
  +'</div><p class="s" style="color:#6f625c;margin:8px 0 0">Waiting for John: <b>'+H.toJohn+'</b> (a quote to approve, an install date to confirm, one message the AI was not sure about). <a href="automations.html">See the end-of-day summary</a></p></div>';
 h+='<div class="card"><h3>Today, '+fmt(T0)+'</h3>'+(todays().map(function(j){var v=V(j.v);return '<div class="row"><div><div class="t">'+j.h+' &middot; '+v.name+'</div><div class="s">'+v.town+' &middot; '+j.note+' &middot; <b>'+en(j.e)+'</b></div></div>'+tag(j.t)+'</div>';}).join("")||'<div class="s">Nothing booked today.</div>')+'</div>';
 h+='<div class="card"><h3>Overdue cleans</h3>'+(overdue().map(function(v){return '<div class="row"><div><div class="t">'+v.name+'</div><div class="s">'+v.town+' &middot; every '+v.cycle+' days &middot; due '+fmt(d(nextOff(v)))+'</div></div><button class="btn sm" data-rem="'+v.id+'">Send reminder</button></div>';}).join("")||'<div class="s">No overdue cleans.</div>')+'</div></div>';
 h+='<div><div class="card"><h3>Engineers today</h3>'+S.eng.map(function(e){var js=todays().filter(function(j){return j.e===e.id;});return '<div class="row"><div><div class="t">'+e.name+' <span class="chip">Sample</span></div><div class="s">'+e.area+' &middot; '+(js.length?("next: "+js[0].h+" "+V(js[0].v).name):"free")+'</div></div><span class="ok">'+js.length+' jobs</span></div>';}).join("")+'</div>';
 h+='<div class="card"><h3>Unpaid invoices</h3>'+unpaid().map(function(j){var v=V(j.v);return '<div class="row"><div><div class="t">'+v.name+'</div><div class="s">INV-'+(1000+j.id)+' &middot; sent '+(j.inv||0)+' days ago &middot; [amount]</div></div><span class="'+((j.inv||0)>=7?"bad":"s")+'">'+((j.inv||0)>=7?"Reminder 2 sent":"Reminder 1 due")+'</span></div>';}).join("")+'</div>';
 h+='<div class="card"><h3>Activity</h3><div class="log">'+S.log.map(function(l){return '<div>'+l+'</div>';}).join("")+'</div></div></div></div>';
 m.innerHTML=h;
 m.onclick=function(e){var b=e.target.closest("[data-rem]");if(!b)return;var v=V(+b.getAttribute("data-rem"));addLog("Reminder sent on WhatsApp to "+v.contact+" at "+v.name+": clean overdue, two slots offered.");S.handled.reminders++;save();toast("Reminder sent to "+v.name+" (demo, nothing actually sent)");R.dashboard(m);};
};
R.venues=function(m){
 var sel=+(location.hash.replace("#","")||1);
 function list(f){return S.venues.filter(function(v){return !f||(v.name+v.town+v.type).toLowerCase().indexOf(f)>=0;}).map(function(v){var n=nextOff(v);var st=n===null?'<span class="s">'+v.type+' client</span>':(n<0?'<span class="bad">Overdue</span>':'Next clean '+fmt(d(n)));return '<div class="vi'+(v.id===sel?" on":"")+'" data-v="'+v.id+'"><b>'+v.name+'</b><span>'+v.type+' &middot; '+v.town+' &middot; '+st+'</span></div>';}).join("");}
 function detail(){var v=V(sel);var n=nextOff(v);var hist=S.jobs.filter(function(j){return j.v===v.id;});
  var cyc=v.cycle?('<select class="in" id="cyc">'+[7,14,21,28].map(function(c){return '<option'+(c===v.cycle?" selected":"")+' value="'+c+'">Every '+c+' days</option>';}).join("")+'</select> <span class="s">set per venue</span>'):'Not on a cleaning cycle';
  return '<div class="card"><h3>'+v.name+' <span class="chip">Sample data</span></h3><table class="kv">'
  +'<tr><td>Type</td><td>'+v.type+', '+v.town+'</td></tr><tr><td>Contact</td><td>'+v.contact+' &middot; '+v.phone+' &middot; WhatsApp</td></tr>'
  +'<tr><td>Lines</td><td>'+v.lines+'</td></tr><tr><td>Cooling</td><td>'+v.cooler+'</td></tr><tr><td>Python</td><td>'+v.python+'</td></tr><tr><td>Gas</td><td>'+v.gas+'</td></tr>'
  +'<tr><td>Clean cycle</td><td>'+cyc+'</td></tr><tr><td>Last clean</td><td>'+(v.last===null?"None":fmt(d(v.last)))+'</td></tr>'
  +'<tr><td>Next clean</td><td>'+(n===null?"n/a":(n<0?'<span class="bad">Overdue since '+fmt(d(n))+'</span>':fmt(d(n))))+'</td></tr>'
  +'<tr><td>Cellar notes</td><td>'+v.notes+'</td></tr></table></div>'
  +'<div class="card"><h3>Photos from visits</h3><div class="ph"><div>[Cellar photo]</div><div>[Gas panel photo]</div><div>[Font photo]</div></div></div>'
  +'<div class="card"><h3>Job history</h3>'+(hist.map(function(j){return '<div class="row"><div><div class="t">'+fmt(d(j.day))+' &middot; '+j.note+'</div><div class="s">'+j.stage+' &middot; '+en(j.e)+'</div></div>'+tag(j.t)+'</div>';}).join("")||'<div class="s">No jobs yet.</div>')+'</div>';}
 m.innerHTML='<div class="vwrap"><div class="vlist"><input id="vq" placeholder="Search venues"><div id="vl">'+list("")+'</div></div><div id="vd">'+detail()+'</div></div>';
 $("#vq").oninput=function(){$("#vl").innerHTML=list(this.value.toLowerCase());};
 $("#vl").onclick=function(e){var x=e.target.closest("[data-v]");if(!x)return;sel=+x.getAttribute("data-v");location.hash=sel;R.venues(m);};
 var c=$("#cyc");if(c)c.onchange=function(){var v=V(sel);v.cycle=+this.value;addLog("Clean cycle for "+v.name+" set to every "+v.cycle+" days. Reminders rescheduled.");save();toast("Cycle updated, reminders rescheduled");R.venues(m);};
};
var BOARD="jobs";
R.pipeline=function(m){
 var inst=BOARD==="inst",stages=inst?ISTAGES:STAGES;
 var h='<div class="tabs"><button class="'+(inst?"":"on")+'" data-b="jobs">Callouts, cleans and maintenance</button><button class="'+(inst?"on":"")+'" data-b="inst">Brewery and installation projects</button></div>'
  +'<p class="s" style="color:#6f625c;margin-top:0">Drag a job to another stage, or click it and use the button. Moving a job fires the automations (demo only).</p><div class="board" style="grid-template-columns:repeat('+stages.length+',minmax(160px,1fr))">';
 stages.forEach(function(st){var js=S.jobs.filter(function(j){return j.stage===st&&isInst(j)===inst;});
  h+='<div class="col" data-st="'+st+'"><h4>'+st+'<span>'+js.length+'</span></h4>'+js.map(function(j){var v=V(j.v);var nx=stages[stages.indexOf(st)+1];
   return '<div class="jc" draggable="true" data-j="'+j.id+'">'+tag(j.t)+'<b>'+v.name+'</b><div class="s">'+v.town+' &middot; '+fmt(d(j.day))+' '+j.h+'</div><div class="s">'+j.note+'</div><div class="s">Engineer: <b>'+en(j.e)+'</b></div>'
   +(nx?'<div class="mv"><button class="btn sm" data-mv="'+j.id+'">Move to '+nx+'</button></div>':'')+'</div>';}).join("")+'</div>';});
 m.innerHTML=h+'</div>';
 function move(id,st){var j=S.jobs.filter(function(x){return x.id===id;})[0];if(!j||j.stage===st)return;var ss=isInst(j)?ISTAGES:STAGES;if(ss.indexOf(st)<0)return;j.stage=st;var v=V(j.v);
  if(!j.e&&(st==="Booked"||st==="Scheduled"||st==="Site survey")){j.e="d";}
  var msg={Quoted:"Quote drafted for "+v.name+" and sent to John to approve.",Booked:"Booked for "+v.name+", "+en(j.e)+" assigned; job sheet sent to his phone and confirmation sent to "+v.contact+" on WhatsApp.",
   "Site survey":"Site survey at "+v.name+" booked with "+en(j.e)+".",Scheduled:"Install at "+v.name+" scheduled; parts list and cellar plan attached for "+en(j.e)+".",
   Installed:"Install at "+v.name+" signed off on "+en(j.e)+"&rsquo;s phone with photos; handover sheet sent to "+v.contact+".",
   Done:"Job done at "+v.name+": "+en(j.e)+" signed off on his phone, job sheet written from his photos and voice note, review request queued.",
   Invoiced:"Invoice INV-"+(1000+j.id)+" sent to "+v.name+"; reminders set for 3, 7 and 14 days.",Paid:"Payment received from "+v.name+"; invoice marked paid."}[st]||("Job moved to "+st+".");
  if(st==="Done"&&j.t==="lc"){v.last=j.day>0?0:j.day;}if(st==="Done")S.reviews++;if(st==="Invoiced"){j.inv=0;S.handled.invoices++;}
  addLog(msg);save();toast(msg+" (demo)");R.pipeline(m);}
 m.onclick=function(e){var tb=e.target.closest("[data-b]");if(tb){BOARD=tb.getAttribute("data-b");R.pipeline(m);return;}
  var b=e.target.closest("[data-mv]");if(b){var j=S.jobs.filter(function(x){return x.id===+b.getAttribute("data-mv");})[0];var ss=isInst(j)?ISTAGES:STAGES;move(j.id,ss[ss.indexOf(j.stage)+1]);return;}
  var c=e.target.closest(".jc");if(c)c.classList.toggle("open");};
 m.ondragstart=function(e){var c=e.target.closest(".jc");if(c)e.dataTransfer.setData("text/plain",c.getAttribute("data-j"));};
 m.ondragover=function(e){var c=e.target.closest(".col");if(c){e.preventDefault();c.classList.add("over");}};
 m.ondragleave=function(e){var c=e.target.closest(".col");if(c)c.classList.remove("over");};
 m.ondrop=function(e){var c=e.target.closest(".col");if(!c)return;e.preventDefault();move(+e.dataTransfer.getData("text/plain"),c.getAttribute("data-st"));};
};
var WK=0;
R.calendar=function(m){
 var mon=new Date(T0);var dow=(mon.getDay()+6)%7;mon.setDate(mon.getDate()-dow+WK*7);
 var h='<div class="top" style="margin-bottom:10px"><div><button class="btn g sm" id="pw">&larr; Previous</button> <button class="btn g sm" id="tw">This week</button> <button class="btn g sm" id="nw">Next &rarr;</button></div>'
 +'<div class="s" style="color:#6f625c">Solid = booked job, with the engineer. <span style="color:#2f7d32;font-weight:700">Dashed = clean scheduled automatically from the venue&rsquo;s cycle</span>, waiting for the venue to confirm.</div></div><div class="cal">';
 for(var i=0;i<6;i++){var day=new Date(mon);day.setDate(mon.getDate()+i);var off=Math.round((day-T0)/864e5);
  var ev=S.jobs.filter(function(j){return j.day===off&&j.stage!=="Enquiry"&&j.stage!=="Quoted";}).sort(function(a,b){return a.h<b.h?-1:1;});
  var booked={};S.jobs.forEach(function(j){if(j.t==="lc"&&j.day===off)booked[j.v]=1;});
  var autos=S.venues.filter(function(v){var n=nextOff(v);if(n===null||n<0||booked[v.id]||off<0)return false;var k=n;while(k<off)k+=v.cycle;return k===off;});
  h+='<div class="day'+(off===0?" today":"")+'"><h4>'+fmt(day)+'</h4>'+ev.map(function(j){var v=V(j.v);var col=getComputedStyle(document.documentElement).getPropertyValue("--"+j.t);return '<div class="ev" style="background:'+col+'"><b>'+j.h+' '+TYPES[j.t]+'</b>'+v.name+'<br><i>'+en(j.e)+'</i></div>';}).join("")
  +autos.map(function(v){return '<div class="ev autoev"><b>Auto: line clean</b>'+v.name+' &middot; '+v.lines+' lines</div>';}).join("")+'</div>';}
 m.innerHTML=h+'</div><p class="s" style="color:#6f625c">Overdue venues are not placed automatically; they sit on the dashboard overdue list until a slot is agreed.</p>';
 $("#pw").onclick=function(){WK--;R.calendar(m);};$("#nw").onclick=function(){WK++;R.calendar(m);};$("#tw").onclick=function(){WK=0;R.calendar(m);};
};
var AUTOS=[
 {k:"w",ch:"WhatsApp",n:"WhatsApp message to a booked callout",tr:"WhatsApp message arrives",ac:["AI reads and triages it","Callout created on the venue","Nearest free engineer assigned","Venue gets an arrival time","Job sheet on the engineer&rsquo;s phone"],steps:[
  ["in","Python looks iced up, beer coming out slow on 3 lines. We open at 4"],
  ["ai","Reads it: a CALLOUT from Northvale Social (Hammersmith, 10 lines on file). Problem: slow pour, likely cooling. They open at 4pm, so it is needed today."],
  ["out","Thanks Tom, got that. Is anything else pouring, and is the cooler showing a temperature or an alarm? A photo of the display helps."],
  ["in","Others are fine. Display says 0.5 and it is flashing [photo]"],
  ["sys","Callout created: Northvale Social, slow pour on 3 lines, cooler display flashing. Photo and cellar notes attached. Last clean 4 days ago."],
  ["sys","Nearest free engineer: Dean finishes at Marlowe Street Bar at 15:15, about 20 minutes away. Marco and Kyle are booked until 17:00."],
  ["sys","Assigned to Dean for 15:45. Job sheet sent to his phone with the photo and the cellar notes."],
  ["out","Dean will be with you at about 15:45, before you open. You will get a message when he is on his way."],
  ["sys","John sees one line: callout booked for Dean, 15:45. Nothing for him to type. He can reassign with one tap."]]},
 {k:"a",ch:"Text",n:"Missed call while the office is busy",tr:"Missed call",ac:["Instant text-back","AI asks venue, problem, is the bar down","Callout created","Urgent ones flagged to John"],steps:[
  ["sys","Missed call from 07700 900106 at 12:08 (the office line was busy)"],["out","Hi, it&rsquo;s Total Cellar Services. Sorry we missed you. Is your bar down? Reply here with the venue and what is happening and we will sort it straight away."],
  ["in","Gilded Hop in Camden. Nothing coming through on lines 5 to 8 and the cooler is beeping"],["ai","Thanks Ellie. Is the whole bar down, or just those four lines? Can you send a photo of the cooler display?"],
  ["in","Just those 4. [photo]"],["sys","Callout created: The Gilded Hop, lines 5 to 8, cooler alarm. Marked URGENT: Friday, late licence."],["sys","Assigned to Marco (finishing in Shoreditch, 25 minutes away). John gets one alert because it is urgent."]]},
 {k:"b",ch:"WhatsApp",n:"Line clean due in 3 days",tr:"Clean due in 3 days",ac:["WhatsApp to the venue manager","Venue confirms or picks a slot","Booked into the engineer&rsquo;s diary"],steps:[
  ["sys","The Hollin &amp; Hare is due a clean on its 7-day cycle in 3 days"],["out","Hi Sophie, your line clean at The Hollin &amp; Hare is due on Thursday. Does 9am suit? Reply YES, or send a better time."],
  ["in","Can we do 8am instead? We open at 11"],["ai","No problem, 8am Thursday is booked with Dean. You will get a reminder the day before."],["sys","Booked: Thu 8:00, The Hollin &amp; Hare, line clean, 12 lines, Dean"]]},
 {k:"c",ch:"WhatsApp",n:"Overdue clean",tr:"Clean overdue",ac:["Reminder day 1","Second reminder day 3","Task for the office to ring day 5"],steps:[
  ["sys","The Quillbrook Arms is 2 days past its 7-day cycle"],["out","Hi Dan, your lines at The Quillbrook Arms are due a clean. Two slots this week: Wed 9am or Fri 10am. Which suits?"],
  ["sys","No reply after 2 days"],["out","Hi Dan, just checking in on your line clean. Reply 1 for Wed 9am or 2 for Fri 10am."],["sys","No reply after 5 days: task created for the office to ring Dan"]]},
 {k:"d",ch:"Email",n:"Job signed off to paid",tr:"Engineer signs off on his phone",ac:["Job sheet from photos and a voice note","Invoice sent","Reminders at 3, 7 and 14 days","Marked paid"],steps:[
  ["sys","Kyle signs off the job at The Quillbrook Arms on his phone: 3 photos and a 40-second voice note"],
  ["ai","Job sheet drafted: replaced the secondary regulator on the mixed gas panel, checked pressures on all lines, fobbing on lines 3 and 4 resolved. Advice: keep the cellar door shut during deliveries."],
  ["sys","Job sheet emailed to Dan with the photos"],["sys","Invoice INV-1108 sent to The Quillbrook Arms [amount from your rates]"],
  ["out","Day 3: Hi Dan, a quick reminder that invoice INV-1108 is due. You can pay from the link in the email."],["out","Day 7: second reminder sent"],["sys","Payment received. Invoice marked paid. Day 14 reminder cancelled."]]},
 {k:"e",ch:"WhatsApp",n:"Review request after a job",tr:"Job done",ac:["Thank-you message","Google review link","Logged on the venue record"],steps:[
  ["sys","Job done at Larkspur Tap House"],["out","Thanks Priya, lines are clean and all 14 are pouring. If you were happy with the visit, a quick Google review helps a small business like ours: [your review link]"],
  ["in","Will do, thanks"],["sys","Review request logged on the venue record"]]},
 {k:"f",ch:"Website",n:"New enquiry from the website or Facebook",tr:"Form or message received",ac:["AI asks the qualifying questions","Quote drafted","John approves and sends"],steps:[
  ["sys","Website form: Kestrel Lane Kitchen, Kingston, New installation, 1 to 4 lines"],["ai","Hi Luca, thanks for getting in touch. Is this a new font on the existing system, or a new system? How many taps, and when would you like it done?"],
  ["in","New 4-tap font on the existing cooler, ideally before the 20th"],["sys","Quote drafted from your parts list and rates, waiting for John to approve"],["sys","John approves on his phone. Quote sent to Luca."]]},
 {k:"p",ch:"Email",n:"Brewery installation project",tr:"Install enquiry from a brewery",ac:["Site survey booked","Survey notes and photos to a quote","Install scheduled with parts list","Handover sheet and invoice"],steps:[
  ["in","Email from Quillmark Brewing Co: we are extending the taproom, 12 new taps, can you quote?"],["ai","Survey slot offered: Tuesday 15:00 with Marco. Brewery confirms."],
  ["sys","Marco records the survey on his phone: photos, run lengths, cooler capacity, a voice note"],["sys","Quote drafted from the survey and your parts list, waiting for John to approve"],
  ["sys","Quote approved and sent. Brewery accepts. Install scheduled, parts list attached to Marco&rsquo;s job"],["sys","Install signed off with photos. Handover sheet and invoice sent to the brewery"]]},
 {k:"g",ch:"Email",n:"Monthly report to each venue on a cycle",tr:"1st of the month",ac:["Report built per venue","Sent to the manager","Copy on the venue record"],steps:[
  ["sys","1st of the month: building reports for venues on a cleaning cycle"],["out","Hi Graham, your report for Copperwell Social Club: 2 line cleans done, 6 lines, 1 callout (coupler seal), next clean booked for the 9th."],
  ["sys","Reports sent to every venue on a cycle. Copies saved on each venue record."]]},
 {k:"z",ch:"WhatsApp",n:"End of day: what John did not have to touch",tr:"6pm every weekday",ac:["Summary of the day","Only the items that need John","Tomorrow&rsquo;s first jobs"],steps:[
  ["sys","6pm summary for John [sample figures]"],
  ["out","Today without you: 19 WhatsApps answered, 9 callouts and cleans booked and sent to engineers, 6 clean reminders, 4 invoices sent, 3 payments chased, 2 review requests."],
  ["out","Needs you (3): approve the Kestrel Lane quote, confirm the Quillmark install date, and one message the AI was not sure about (from The Fennick Inn)."],
  ["out","Tomorrow: Dean 09:00 Hollin &amp; Hare, Kyle 10:00 Riverbend, Marco 15:00 Quillmark survey."]]}];
R.automations=function(m){
 var h='<div class="auto"><div>'+AUTOS.map(function(a){return '<div class="ac"><h4>'+a.n+' <span><button class="sw'+(S.auto[a.k]?" on":"")+'" data-sw="'+a.k+'" aria-label="On or off"></button></span></h4>'
  +'<div class="flow"><span class="tr">When: '+a.tr+'</span>'+a.ac.map(function(x){return '<i>&rarr;</i><span>'+x+'</span>';}).join("")+'</div>'
  +'<button class="btn sm" data-run="'+a.k+'">Run demo</button> <span class="s" style="color:#6f625c;font-size:12px">'+(S.auto[a.k]?"On":"Off")+' &middot; '+a.ch+'</span></div>';}).join("")+'</div>'
  +'<div><div class="phone"><div class="ptop" id="pt">Messages &middot; demo</div><div class="screen" id="scr"><div class="bub sys">Press &quot;Run demo&quot; on any automation to watch it play out.</div></div></div>'
  +'<div class="card" style="margin-top:12px"><h3>Activity log</h3><div class="log" id="alog"></div></div></div></div>';
 m.innerHTML=h;var timer=[];
 m.onclick=function(e){var s=e.target.closest("[data-sw]");if(s){var k=s.getAttribute("data-sw");S.auto[k]=!S.auto[k];save();R.automations(m);return;}
  var r=e.target.closest("[data-run]");if(!r)return;var a=AUTOS.filter(function(x){return x.k===r.getAttribute("data-run");})[0];
  timer.forEach(clearTimeout);timer=[];var scr=$("#scr"),lg=$("#alog");$("#pt").innerHTML=a.ch+" &middot; demo";scr.innerHTML='<div class="bub sys"><b>'+a.n+'</b></div>';lg.innerHTML="";
  if(!S.auto[a.k]){scr.innerHTML+='<div class="bub sys">This automation is switched off. Turn it on to run it.</div>';return;}
  a.steps.forEach(function(st,i){timer.push(setTimeout(function(){var lab={sys:"System",out:"Sent",in:"Venue",ai:"AI assistant"}[st[0]];
   scr.innerHTML+='<div class="bub '+st[0]+'">'+st[1]+'<small>'+lab+'</small></div>';scr.scrollTop=scr.scrollHeight;
   lg.innerHTML='<div>'+lab+': '+st[1]+'</div>'+lg.innerHTML;if(i===a.steps.length-1){addLog("Demo run: "+a.n);}},900*(i+1)));});};
};
var THREADS=[
 {v:11,ch:"wa",cl:"WhatsApp",last:"12:41",sug:"Callout created &middot; Dean 15:45",msgs:[["in","Python looks iced up, beer coming out slow on 3 lines. We open at 4"],["out","Thanks Tom, got that. Is anything else pouring, and is the cooler showing an alarm?"],["in","Others fine. Display flashing [photo]"]],draft:"Dean will be with you at about 15:45, before you open. You will get a message when he is on his way."},
 {v:6,ch:"wa",cl:"WhatsApp",last:"12:14",sug:"Callout booked &middot; Marco",msgs:[["in","Nothing coming through on lines 5 to 8 and the cooler is beeping"],["out","Thanks Ellie, Marco is on his way, about 25 minutes."]],draft:"Marco is 10 minutes away. Leave lines 5 to 8 off until he has looked at the cooler."},
 {v:3,ch:"wa",cl:"WhatsApp",last:"11:52",sug:"Clean moved &middot; Thu 8am",msgs:[["in","Can we move Thursday&rsquo;s clean to 8am? We open at 11"]],draft:"No problem Sophie, 8am Thursday is booked with Dean. You will get a reminder the day before."},
 {v:9,ch:"wa",cl:"WhatsApp",last:"11:20",sug:"Callout booked &middot; Dean 14:30",msgs:[["in","Gas regulator making a noise and 2 lines have stopped"]],draft:"Thanks Jess, Dean will be with you at 14:30. If you smell gas, turn it off at the bottle and open the cellar door."},
 {v:2,ch:"wa",cl:"WhatsApp",last:"10:05",sug:"Question &middot; no job",msgs:[["in","What cleaner do you use? Our new GM asked"]],draft:"Hi Priya, Marco can show your new GM what we use and how it works when he is in at 9:30 next week. [Product name: John to confirm]"},
 {v:10,ch:"wa",cl:"WhatsApp",last:"09:47",sug:"Not sure: passed to John",msgs:[["in","Can you give me a price for doing the whole cellar up, new cooler and all"]],draft:"Hi Pete, thanks. John will call you today to talk it through. When is a good time?"},
 {v:12,ch:"email",cl:"Gmail",last:"09:12",sug:"Install project &middot; survey booked",msgs:[["in","Hi John, we are extending the taproom, 12 new taps. Can you come and quote?"]],draft:"Hi Hal, thanks. Marco can survey on Tuesday at 15:00. I will send the quote the same week. John"},
 {v:7,ch:"call",cl:"Missed call",last:"08:58",sug:"Text-back sent",msgs:[["in","Missed call, no voicemail"],["out","Hi, it&rsquo;s Total Cellar Services, sorry we missed you. Reply here with what you need."],["in","Just confirming Wednesday is still on"]],draft:"Hi Mark, yes, Kyle is with you Wednesday at 10:00."},
 {v:5,ch:"web",cl:"Website form",last:"Yesterday",sug:"Quote drafted for John",msgs:[["in","New 4-tap font on the existing cooler, ideally before the 20th"]],draft:"Hi Luca, thanks. A quote is on its way today for you to look at. John"}];
R.inbox=function(m){var sel=0;
 function draw(){var t=THREADS[sel],v=V(t.v);
  m.innerHTML='<div class="ibx"><div><div class="chcount"><span class="ch c-wa">WhatsApp 6</span> <span class="ch c-email">Gmail 1</span> <span class="ch c-call">Missed call 1</span> <span class="ch c-web">Website 1</span></div>'+THREADS.map(function(x,i){var vv=V(x.v);return '<div class="th'+(i===sel?" on":"")+'" data-t="'+i+'"><b><span>'+vv.name+'</span><span class="ch c-'+x.ch+'">'+x.cl+'</span></b><span>'+x.msgs[x.msgs.length-1][1].slice(0,58)+'&hellip; &middot; '+x.last+'</span><span class="sug">AI: '+x.sug+'</span></div>';}).join("")+'</div>'
  +'<div class="card"><h3>'+v.name+' &middot; '+v.contact+' <span class="ch c-'+t.ch+'">'+t.cl+'</span></h3><div class="msgs">'+t.msgs.map(function(x){return '<div class="m '+x[0]+'">'+x[1]+'</div>';}).join("")+'</div>'
  +'<div class="draft"><b>AI-drafted reply</b> <span class="s" style="color:#6f625c;font-size:12px">uses the venue record, the engineers&rsquo; diaries and the job history; John or the office approves before it goes</span><textarea id="dr">'+t.draft+'</textarea>'
  +'<button class="btn sm" id="snd">Approve and send</button> <button class="btn g sm" id="rw">Make it shorter</button></div></div></div>';}
 draw();
 m.onclick=function(e){var x=e.target.closest("[data-t]");if(x){sel=+x.getAttribute("data-t");draw();return;}
  if(e.target.id==="snd"){THREADS[sel].msgs.push(["out",$("#dr").value]);THREADS[sel].draft="";addLog("Reply sent to "+V(THREADS[sel].v).name+" ("+THREADS[sel].cl+")");S.handled.wa++;save();toast("Sent (demo, nothing actually sent)");draw();}
  if(e.target.id==="rw"){var t=$("#dr");t.value=t.value.split(". ").slice(0,1).join(". ").replace(/\.?$/,".");}};
};
R.reports=function(m){
 var wk=[[9,10],[10,10],[8,11],[10,11]];var mx=12;
 var h='<div class="grid2"><div class="card"><h3>Line cleans done vs due, last 4 weeks <span class="chip">Sample data</span></h3><div class="wk">'
 +wk.map(function(w,i){return '<div title="Week '+(i+1)+'"><i style="height:'+(w[0]/mx*100)+'%;background:#2f7d32"></i><i style="height:'+(w[1]/mx*100)+'%;background:#d9c7bd"></i></div>';}).join("")
 +'</div><div class="leg"><i style="background:#2f7d32"></i>Done<i style="background:#d9c7bd"></i>Due &middot; weeks 1 to 4</div></div>';
 h+='<div class="card"><h3>Where incoming messages came from, last 30 days <span class="chip">Sample data</span></h3><div class="bars">'+[["WhatsApp",100,"#128c7e"],["Phone calls",34,"#2f7d32"],["Gmail",22,"#0f6b85"],["Website form",8,"#7a4c0c"],["Facebook",4,"#1877f2"]].map(function(r){return '<div class="b"><span>'+r[0]+'</span><div class="tr"><i style="width:'+r[1]+'%;background:'+r[2]+'"></i></div><span></span></div>';}).join("")+'</div><p class="s" style="color:#6f625c;font-size:12.5px">Relative bars only. In the real build this counts every message, so you can see how much the AI took off the office.</p></div></div>';
 var per={};S.jobs.forEach(function(j){if(j.e)per[j.e]=(per[j.e]||0)+1;});
 h+='<div class="grid2"><div class="card"><h3>Jobs per engineer <span class="chip">Sample data</span></h3><div class="bars">'+S.eng.map(function(e){return '<div class="b"><span>'+e.name+'</span><div class="tr"><i style="width:'+((per[e.id]||0)/10*100)+'%"></i></div><span>'+(per[e.id]||0)+'</span></div>';}).join("")+'</div></div>';
 var br={};S.jobs.forEach(function(j){if(j.t==="br")br[j.v]=(br[j.v]||0)+1;});
 h+='<div class="card"><h3>Callouts by venue <span class="chip">Sample data</span></h3><div class="bars">'+Object.keys(br).map(function(k){return '<div class="b"><span>'+V(+k).name+'</span><div class="tr"><i style="width:'+(br[k]/3*100)+'%;background:#c0392b"></i></div><span>'+br[k]+'</span></div>';}).join("")+'</div></div></div>';
 var rv=[[12,100],[6,80],[2,74],[13,66],[3,58],[1,50],[9,44],[11,40],[8,33],[10,25],[4,20],[5,15],[7,12]];
 h+='<div class="card"><h3>Revenue by venue, last 12 months <span class="chip">Sample data &middot; relative only, no real figures</span></h3><div class="bars">'+rv.map(function(r){return '<div class="b"><span>'+V(r[0]).name+'</span><div class="tr"><i style="width:'+r[1]+'%"></i></div><span></span></div>';}).join("")
 +'</div><p class="s" style="color:#6f625c;font-size:12.5px">In the real build this reads from your invoices, so you can see which venues and breweries are worth the most and which have gone quiet.</p></div>';
 m.innerHTML=h;
};
var view=document.body.getAttribute("data-view");var m=$("#main");R[view](m);
$("#reset").onclick=function(){try{localStorage.removeItem(KEY);}catch(e){}S=JSON.parse(JSON.stringify(DEF));toast("Sample data reset");R[view](m);};
})();
