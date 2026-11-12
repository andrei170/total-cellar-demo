
(function(){
var KEY="tcs_crm_demo_v2";
var TYPES={lc:"Line clean",mt:"Maintenance",br:"Breakdown",in:"Install",ev:"Event bar / party kegs"};
var STAGES=["Enquiry","Quoted","Booked","Done","Invoiced","Paid"];
var DEF={
 venues:[
  {id:1,name:"The Quillbrook Arms",type:"Pub",town:"Staines-upon-Thames",contact:"Dan (licensee)",phone:"07700 900101",lines:10,cooler:"Remote cellar cooler",python:"6-way python, 12m run",gas:"Mixed gas and CO2 panel",cycle:7,last:-9,notes:"Cellar down a steep stair, key from the bar. Lager lines 3 and 4 fob after a delivery."},
  {id:2,name:"Larkspur Tap House",type:"Bar",town:"Egham",contact:"Priya (bar manager)",phone:"07700 900102",lines:14,cooler:"Two under-counter coolers",python:"8-way python",gas:"Mixed gas, 2 regulators",cycle:7,last:-4,notes:"Craft taps change weekly. Clean before 11am opening."},
  {id:3,name:"Copperwell Social Club",type:"Club",town:"Ashford",contact:"Graham (steward)",phone:"07700 900103",lines:6,cooler:"Remote cooler",python:"4-way python",gas:"CO2",cycle:14,last:-16,notes:"Committee signs off work over a set amount. Busy on match days."},
  {id:4,name:"The Hollin &amp; Hare",type:"Pub",town:"Weybridge",contact:"Sophie (GM)",phone:"07700 900104",lines:12,cooler:"Remote cellar cooler",python:"8-way python",gas:"Mixed gas panel",cycle:7,last:-6,notes:"Parking at the rear. Cask beer on 3 hand pulls (not ours)."},
  {id:5,name:"Riverbend Rowing Club",type:"Club",town:"Sunbury-on-Thames",contact:"Mark (bar secretary)",phone:"07700 900105",lines:4,cooler:"Under-counter cooler",python:"Short run",gas:"CO2",cycle:14,last:-12,notes:"Bar open evenings and weekends only. Regatta weekends: event kegs."},
  {id:6,name:"Kestrel Lane Kitchen",type:"Restaurant",town:"Windsor",contact:"Luca (owner)",phone:"07700 900106",lines:3,cooler:"Under-counter cooler",python:"Short run",gas:"Mixed gas",cycle:14,last:-3,notes:"Font replaced last spring. Prefers texts to calls."},
  {id:7,name:"The Gilded Hop",type:"Bar",town:"Woking",contact:"Ellie (bar manager)",phone:"07700 900107",lines:16,cooler:"Remote cooler, 2 fans",python:"10-way python",gas:"Mixed gas panel",cycle:7,last:-3,notes:"Late licence at weekends. Breakdown history on the cooler."},
  {id:8,name:"Meadowbank Golf Club",type:"Club",town:"Bracknell",contact:"Andy (house manager)",phone:"07700 900108",lines:5,cooler:"Remote cooler",python:"4-way python",gas:"CO2",cycle:14,last:-10,notes:"Clubhouse bar plus a halfway hut in summer."},
  {id:9,name:"Ellis and Grant wedding",type:"Event client",town:"Reading",contact:"Hannah Ellis",phone:"07700 900109",lines:2,cooler:"Event cooler (ours)",python:"n/a",gas:"CO2 (ours)",cycle:0,last:null,notes:"Event bar, 2 kegs, marquee. Set-up Saturday morning."}],
 jobs:[
  {id:101,v:7,t:"br",stage:"Enquiry",day:0,h:"12:10",note:"No pour on lines 5 to 8, cooler alarm showing"},
  {id:102,v:9,t:"ev",stage:"Quoted",day:5,h:"09:00",note:"Event bar, 2 kegs, marquee"},
  {id:103,v:6,t:"in",stage:"Quoted",day:8,h:"10:00",note:"New 4-tap font"},
  {id:104,v:2,t:"lc",stage:"Booked",day:0,h:"08:30",note:"Weekly clean, 14 lines"},
  {id:105,v:4,t:"lc",stage:"Booked",day:1,h:"09:00",note:"Weekly clean, 12 lines"},
  {id:106,v:8,t:"mt",stage:"Booked",day:2,h:"11:00",note:"Cooler service and gas check"},
  {id:107,v:3,t:"lc",stage:"Booked",day:3,h:"10:00",note:"Overdue clean, slot agreed by text, 6 lines"},
  {id:108,v:1,t:"mt",stage:"Done",day:-1,h:"10:00",note:"Regulator replaced, job sheet drafted"},
  {id:109,v:8,t:"lc",stage:"Invoiced",day:-10,h:"09:00",note:"Fortnightly clean",inv:9},
  {id:110,v:4,t:"lc",stage:"Invoiced",day:-6,h:"08:00",note:"Weekly clean",inv:3},
  {id:111,v:6,t:"lc",stage:"Paid",day:-3,h:"09:30",note:"Fortnightly clean"},
  {id:112,v:1,t:"br",stage:"Paid",day:-12,h:"19:40",note:"Fobbing on lager, coupler seal"}],
 auto:{a:true,b:true,c:true,d:true,e:true,f:true,g:true},
 reviews:4,
 log:["Sample data loaded. Everything here is fictional."]
};
var S;
function load(){try{var s=localStorage.getItem(KEY);if(s)return JSON.parse(s);}catch(e){}return JSON.parse(JSON.stringify(DEF));}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
S=load();
function $(q){return document.querySelector(q);}
function esc(s){return String(s);}
var T0=new Date();T0.setHours(0,0,0,0);
function d(off){var x=new Date(T0);x.setDate(x.getDate()+off);return x;}
function fmt(x){return x.toLocaleDateString("en-GB",{weekday:"short",day:"numeric",month:"short"});}
function V(id){for(var i=0;i<S.venues.length;i++)if(S.venues[i].id===id)return S.venues[i];}
function nextOff(v){return (v.last===null||!v.cycle)?null:v.last+v.cycle;}
function tag(t){return '<span class="tag t-'+t+'">'+TYPES[t]+'</span>';}
function toast(m){var t=$(".toast");t.innerHTML=m;t.classList.add("on");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("on");},2600);}
function addLog(m){var now=new Date();S.log.unshift(m+' <em>'+now.toLocaleTimeString("en-GB",{hour:"2-digit",minute:"2-digit"})+'</em>');S.log=S.log.slice(0,30);save();}
function overdue(){return S.venues.filter(function(v){var n=nextOff(v);return n!==null&&n<0;});}
function dueWeek(){return S.venues.filter(function(v){var n=nextOff(v);return n!==null&&n>=0&&n<7;});}
function openBr(){return S.jobs.filter(function(j){return j.t==="br"&&["Enquiry","Quoted","Booked"].indexOf(j.stage)>=0;});}
function unpaid(){return S.jobs.filter(function(j){return j.stage==="Invoiced";});}
function todays(){return S.jobs.filter(function(j){return j.day===0&&(j.stage==="Booked"||j.stage==="Enquiry");}).sort(function(a,b){return a.h<b.h?-1:1;});}

var R={};
R.dashboard=function(m){
 var k=[["Today's jobs",todays().length,"pipeline.html"],["Cleans due this week",dueWeek().length,"calendar.html"],["Overdue cleans",overdue().length,"venues.html","red"],
  ["Open breakdowns",openBr().length,"pipeline.html","red"],["Unpaid invoices",unpaid().length,"pipeline.html"],["Reviews requested",S.reviews,"automations.html"]];
 var h='<div class="kpis">'+k.map(function(x){return '<a class="kpi '+(x[3]||"")+'" href="'+x[2]+'"><b>'+x[1]+'</b><span>'+x[0]+'</span></a>';}).join("")+'</div>';
 h+='<div class="grid2"><div><div class="card"><h3>Today, '+fmt(T0)+'</h3>'+(todays().map(function(j){var v=V(j.v);return '<div class="row"><div><div class="t">'+j.h+' &middot; '+v.name+'</div><div class="s">'+v.town+' &middot; '+j.note+'</div></div>'+tag(j.t)+'</div>';}).join("")||'<div class="s">Nothing booked today.</div>')+'</div>';
 h+='<div class="card"><h3>Overdue cleans <span class="chip">Sample data</span></h3>'+(overdue().map(function(v){return '<div class="row"><div><div class="t">'+v.name+'</div><div class="s">'+v.town+' &middot; every '+v.cycle+' days &middot; due '+fmt(d(nextOff(v)))+'</div></div><button class="btn sm" data-rem="'+v.id+'">Send reminder</button></div>';}).join("")||'<div class="s">No overdue cleans.</div>')+'</div>';
 h+='<div class="card"><h3>Due this week</h3>'+dueWeek().map(function(v){return '<div class="row"><div><div class="t">'+v.name+'</div><div class="s">'+v.lines+' lines &middot; due '+fmt(d(nextOff(v)))+'</div></div><span class="ok">On schedule</span></div>';}).join("")+'</div></div>';
 h+='<div><div class="card"><h3>Open breakdowns</h3>'+openBr().map(function(j){var v=V(j.v);return '<div class="row"><div><div class="t">'+v.name+'</div><div class="s">'+j.note+'</div></div><a class="btn sm" href="pipeline.html">Open</a></div>';}).join("")+'</div>';
 h+='<div class="card"><h3>Unpaid invoices</h3>'+unpaid().map(function(j){var v=V(j.v);return '<div class="row"><div><div class="t">'+v.name+'</div><div class="s">INV-'+(1000+j.id)+' &middot; sent '+(j.inv||0)+' days ago &middot; [amount]</div></div><span class="'+((j.inv||0)>=7?"bad":"s")+'">'+((j.inv||0)>=7?"Reminder 2 sent":"Reminder 1 due")+'</span></div>';}).join("")+'</div>';
 h+='<div class="card"><h3>Activity</h3><div class="log">'+S.log.map(function(l){return '<div>'+l+'</div>';}).join("")+'</div></div></div></div>';
 m.innerHTML=h;
 m.onclick=function(e){var b=e.target.closest("[data-rem]");if(!b)return;var v=V(+b.getAttribute("data-rem"));addLog("Reminder text sent to "+v.contact+" at "+v.name+": clean overdue, two slots offered.");toast("Reminder sent to "+v.name+" (demo, nothing actually sent)");R.dashboard(m);};
};
R.venues=function(m){
 var sel=+(location.hash.replace("#","")||1);
 function list(f){return S.venues.filter(function(v){return !f||(v.name+v.town+v.type).toLowerCase().indexOf(f)>=0;}).map(function(v){var n=nextOff(v);var st=n===null?'<span class="s">Event client</span>':(n<0?'<span class="bad">Overdue</span>':'Next '+fmt(d(n)));return '<div class="vi'+(v.id===sel?" on":"")+'" data-v="'+v.id+'"><b>'+v.name+'</b><span>'+v.type+' &middot; '+v.town+' &middot; '+st+'</span></div>';}).join("");}
 function detail(){var v=V(sel);var n=nextOff(v);var hist=S.jobs.filter(function(j){return j.v===v.id;});
  var cyc=v.cycle?('<select class="in" id="cyc">'+[7,14,21,28].map(function(c){return '<option'+(c===v.cycle?" selected":"")+' value="'+c+'">Every '+c+' days</option>';}).join("")+'</select> <span class="s">set per venue</span>'):'Not on a cleaning cycle';
  return '<div class="card"><h3>'+v.name+' <span class="chip">Sample data</span></h3><table class="kv">'
  +'<tr><td>Type</td><td>'+v.type+', '+v.town+'</td></tr><tr><td>Contact</td><td>'+v.contact+' &middot; '+v.phone+'</td></tr>'
  +'<tr><td>Lines</td><td>'+v.lines+'</td></tr><tr><td>Cooling</td><td>'+v.cooler+'</td></tr><tr><td>Python</td><td>'+v.python+'</td></tr><tr><td>Gas</td><td>'+v.gas+'</td></tr>'
  +'<tr><td>Clean cycle</td><td>'+cyc+'</td></tr><tr><td>Last clean</td><td>'+(v.last===null?"None":fmt(d(v.last)))+'</td></tr>'
  +'<tr><td>Next clean</td><td>'+(n===null?"n/a":(n<0?'<span class="bad">Overdue since '+fmt(d(n))+'</span>':fmt(d(n))))+'</td></tr>'
  +'<tr><td>Cellar notes</td><td>'+v.notes+'</td></tr></table></div>'
  +'<div class="card"><h3>Photos from visits</h3><div class="ph"><div>[Cellar photo]</div><div>[Gas panel photo]</div><div>[Font photo]</div></div></div>'
  +'<div class="card"><h3>Job history</h3>'+(hist.map(function(j){return '<div class="row"><div><div class="t">'+fmt(d(j.day))+' &middot; '+j.note+'</div><div class="s">'+j.stage+'</div></div>'+tag(j.t)+'</div>';}).join("")||'<div class="s">No jobs yet.</div>')+'</div>';}
 m.innerHTML='<div class="vwrap"><div class="vlist"><input id="vq" placeholder="Search venues"><div id="vl">'+list("")+'</div></div><div id="vd">'+detail()+'</div></div>';
 $("#vq").oninput=function(){$("#vl").innerHTML=list(this.value.toLowerCase());};
 $("#vl").onclick=function(e){var x=e.target.closest("[data-v]");if(!x)return;sel=+x.getAttribute("data-v");location.hash=sel;R.venues(m);};
 var c=$("#cyc");if(c)c.onchange=function(){var v=V(sel);v.cycle=+this.value;addLog("Clean cycle for "+v.name+" set to every "+v.cycle+" days. Reminders rescheduled.");save();toast("Cycle updated, reminders rescheduled");R.venues(m);};
};
R.pipeline=function(m){
 var h='<p class="s" style="color:#6f625c;margin-top:0">Drag a job to another stage, or click it and use the button. Moving a job fires the automations (demo only).</p><div class="board">';
 STAGES.forEach(function(st){var js=S.jobs.filter(function(j){return j.stage===st;});
  h+='<div class="col" data-st="'+st+'"><h4>'+st+'<span>'+js.length+'</span></h4>'+js.map(function(j){var v=V(j.v);var nx=STAGES[STAGES.indexOf(st)+1];
   return '<div class="jc" draggable="true" data-j="'+j.id+'">'+tag(j.t)+'<b>'+v.name+'</b><div class="s">'+v.town+' &middot; '+fmt(d(j.day))+' '+j.h+'</div><div class="s">'+j.note+'</div>'
   +(nx?'<div class="mv"><button class="btn sm" data-mv="'+j.id+'">Move to '+nx+'</button></div>':'')+'</div>';}).join("")+'</div>';});
 m.innerHTML=h+'</div>';
 function move(id,st){var j=S.jobs.filter(function(x){return x.id===id;})[0];if(!j||j.stage===st)return;j.stage=st;var v=V(j.v);
  var msg={Quoted:"Quote drafted for "+v.name+" and sent to John to approve.",Booked:"Job booked for "+v.name+"; confirmation text sent to "+v.contact+".",
   Done:"Job done at "+v.name+": job sheet written from photos and voice note; review request queued.",Invoiced:"Invoice INV-"+(1000+j.id)+" sent to "+v.name+"; reminders set for 3, 7 and 14 days.",
   Paid:"Payment received from "+v.name+"; invoice marked paid."}[st]||("Job moved to "+st+".");
  if(st==="Done"&&j.t==="lc"){v.last=j.day>0?0:j.day;}if(st==="Done")S.reviews++;if(st==="Invoiced")j.inv=0;
  addLog(msg);save();toast(msg+" (demo)");R.pipeline(m);}
 m.onclick=function(e){var b=e.target.closest("[data-mv]");if(b){var j=S.jobs.filter(function(x){return x.id===+b.getAttribute("data-mv");})[0];move(j.id,STAGES[STAGES.indexOf(j.stage)+1]);return;}
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
 +'<div class="s" style="color:#6f625c">Solid = booked job. <span style="color:#2f7d32;font-weight:700">Dashed = clean scheduled automatically from the venue&rsquo;s cycle</span>, waiting for the venue to confirm.</div></div><div class="cal">';
 for(var i=0;i<6;i++){var day=new Date(mon);day.setDate(mon.getDate()+i);var off=Math.round((day-T0)/864e5);
  var ev=S.jobs.filter(function(j){return j.day===off&&j.stage!=="Enquiry";}).sort(function(a,b){return a.h<b.h?-1:1;});
  var booked={};ev.forEach(function(j){if(j.t==="lc")booked[j.v]=1;});
  var autos=S.venues.filter(function(v){var n=nextOff(v);if(n===null||n<0||booked[v.id]||off<0)return false;var k=n;while(k<off)k+=v.cycle;return k===off;});
  h+='<div class="day'+(off===0?" today":"")+'"><h4>'+fmt(day)+'</h4>'+ev.map(function(j){var v=V(j.v);var col=getComputedStyle(document.documentElement).getPropertyValue("--"+j.t);return '<div class="ev" style="background:'+col+'"><b>'+j.h+' '+TYPES[j.t]+'</b>'+v.name+'</div>';}).join("")
  +autos.map(function(v){return '<div class="ev autoev"><b>Auto: line clean</b>'+v.name+' &middot; '+v.lines+' lines</div>';}).join("")+'</div>';}
 m.innerHTML=h+'</div><p class="s" style="color:#6f625c">Overdue venues are not placed automatically; they sit on the dashboard overdue list until a slot is agreed.</p>';
 $("#pw").onclick=function(){WK--;R.calendar(m);};$("#nw").onclick=function(){WK++;R.calendar(m);};$("#tw").onclick=function(){WK=0;R.calendar(m);};
};
var AUTOS=[
 {k:"a",n:"Missed call while you are in a cellar",tr:"Missed call",ac:["Instant text-back","AI asks venue, problem, is the bar down","Breakdown job created","John alerted"],steps:[
  ["sys","Missed call from 07700 900107 at 12:08 (John is on a job)"],["out","Hi, it&rsquo;s Total Cellar Services. Sorry we missed you, John is in a cellar right now. Is your bar down? Reply with the venue name and what is happening and he will call you straight back."],
  ["in","Gilded Hop in Woking. Nothing coming through on lines 5 to 8 and the cooler is beeping"],["ai","Thanks Ellie. Is the whole bar down, or just those four lines? Can you send a photo of the cooler display?"],
  ["in","Just those 4, the rest are fine. [photo]"],["sys","Breakdown job created: The Gilded Hop, lines 5 to 8, cooler alarm. Venue history attached."],
  ["sys","Alert sent to John: URGENT breakdown, The Gilded Hop, Woking. Partial outage, 4 of 16 lines. Tap to call back."],["out","John has your message and will call you within [time John sets]."]]},
 {k:"b",n:"Line clean due in 3 days",tr:"Clean due in 3 days",ac:["Text and email to the venue manager","Venue confirms or picks a slot","Booked into the diary"],steps:[
  ["sys","The Hollin &amp; Hare is due a clean on its 7-day cycle in 3 days"],["out","Hi Sophie, your line clean at The Hollin &amp; Hare is due on Thursday. Does 9am suit? Reply YES, or reply with a better time."],
  ["in","Can we do 8am instead? We open at 11"],["ai","No problem, 8am Thursday is booked. You will get a reminder the day before."],["sys","Booked in the diary: Thu 8:00, The Hollin &amp; Hare, line clean, 12 lines"]]},
 {k:"c",n:"Overdue clean",tr:"Clean overdue",ac:["Reminder day 1","Second reminder day 3","Task for John to call day 5"],steps:[
  ["sys","The Quillbrook Arms is 2 days past its 7-day cycle"],["out","Hi Dan, your lines at The Quillbrook Arms are due a clean. Two slots this week: Wed 9am or Fri 10am. Which suits?"],
  ["sys","No reply after 2 days"],["out","Hi Dan, just checking in on your line clean. Reply 1 for Wed 9am or 2 for Fri 10am."],["sys","No reply after 5 days: task created for John to ring Dan personally"]]},
 {k:"d",n:"Job marked done to paid",tr:"Job marked done",ac:["AI job sheet from photos and voice note","Invoice sent","Reminders at 3, 7 and 14 days","Marked paid"],steps:[
  ["sys","John marks the job done at The Quillbrook Arms and records a 40-second voice note with 3 photos"],
  ["ai","Job sheet drafted: replaced the secondary regulator on the mixed gas panel, checked pressures on all lines, lines 3 and 4 fobbing resolved. Advice: keep the cellar door shut during deliveries. [John approves]"],
  ["sys","Job sheet emailed to Dan with the photos"],["sys","Invoice INV-1108 sent to The Quillbrook Arms [amount from John&rsquo;s rates]"],
  ["out","Day 3: Hi Dan, a quick reminder that invoice INV-1108 is due. You can pay by the link in the email."],["out","Day 7: second reminder sent"],["sys","Payment received. Invoice marked paid. Day 14 reminder cancelled."]]},
 {k:"e",n:"Review request after a job",tr:"Job done",ac:["Thank-you text","Google review link","Logged on the venue record"],steps:[
  ["sys","Job done at Larkspur Tap House"],["out","Thanks Priya, lines are clean and all 14 are pouring. If you were happy with the visit, a quick Google review helps a small business like ours: [your review link]"],
  ["in","Will do, thanks John"],["sys","Review request logged on the venue record"]]},
 {k:"f",n:"New enquiry from the website or Facebook",tr:"Form or message received",ac:["AI asks the qualifying questions","Quote drafted","John approves and sends"],steps:[
  ["sys","Website form: Kestrel Lane Kitchen, Windsor, &quot;New installation&quot;, 1 to 4 lines"],["ai","Hi Luca, thanks for getting in touch. Is this a new font on the existing system, or a new system? How many taps, and when would you like it done?"],
  ["in","New 4-tap font on the existing cooler, ideally before the 20th"],["sys","Quote drafted from John&rsquo;s parts list and rates, waiting for John to approve"],["sys","John approves on his phone. Quote sent to Luca."]]},
 {k:"g",n:"Monthly report to each venue on a cycle",tr:"1st of the month",ac:["Report built per venue","Sent to the manager","Copy on the venue record"],steps:[
  ["sys","1st of the month: building reports for venues on a cleaning cycle"],["out","Hi Graham, your report for Copperwell Social Club: 2 line cleans done, 6 lines, no breakdowns, next clean booked for the 9th. Any issues, reply here."],
  ["sys","Reports sent to 8 venues. Copies saved on each venue record."]]}];
R.automations=function(m){
 var h='<div class="auto"><div>'+AUTOS.map(function(a){return '<div class="ac"><h4>'+a.n+' <span><button class="sw'+(S.auto[a.k]?" on":"")+'" data-sw="'+a.k+'" aria-label="On or off"></button></span></h4>'
  +'<div class="flow"><span class="tr">When: '+a.tr+'</span>'+a.ac.map(function(x){return '<i>&rarr;</i><span>'+x+'</span>';}).join("")+'</div>'
  +'<button class="btn sm" data-run="'+a.k+'">Run demo</button> <span class="s" style="color:#6f625c;font-size:12px">'+(S.auto[a.k]?"On":"Off")+'</span></div>';}).join("")+'</div>'
  +'<div><div class="phone"><div class="ptop">Text messages &middot; demo</div><div class="screen" id="scr"><div class="bub sys">Press &quot;Run demo&quot; on any automation to watch it play out.</div></div></div>'
  +'<div class="card" style="margin-top:12px"><h3>Activity log</h3><div class="log" id="alog"></div></div></div></div>';
 m.innerHTML=h;var timer=[];
 m.onclick=function(e){var s=e.target.closest("[data-sw]");if(s){var k=s.getAttribute("data-sw");S.auto[k]=!S.auto[k];save();R.automations(m);return;}
  var r=e.target.closest("[data-run]");if(!r)return;var a=AUTOS.filter(function(x){return x.k===r.getAttribute("data-run");})[0];
  timer.forEach(clearTimeout);timer=[];var scr=$("#scr"),lg=$("#alog");scr.innerHTML='<div class="bub sys"><b>'+a.n+'</b></div>';lg.innerHTML="";
  if(!S.auto[a.k]){scr.innerHTML+='<div class="bub sys">This automation is switched off. Turn it on to run it.</div>';return;}
  a.steps.forEach(function(st,i){timer.push(setTimeout(function(){var lab={sys:"System",out:"Sent",in:"Venue",ai:"AI assistant"}[st[0]];
   scr.innerHTML+='<div class="bub '+st[0]+'">'+st[1]+'<small>'+lab+'</small></div>';scr.scrollTop=scr.scrollHeight;
   lg.innerHTML='<div>'+lab+': '+st[1]+'</div>'+lg.innerHTML;if(i===a.steps.length-1){addLog("Demo run: "+a.n);}},900*(i+1)));});};
};
var THREADS=[
 {v:7,ch:"sms",cl:"SMS",last:"12:14",msgs:[["in","Nothing coming through on lines 5 to 8 and the cooler is beeping"],["out","Thanks Ellie, John has this and will call you shortly."]],draft:"Hi Ellie, John here. I can be with you at The Gilded Hop by [time]. In the meantime, check the cooler fan is not blocked and leave lines 5 to 8 off. See you soon."},
 {v:3,ch:"email",cl:"Email",last:"09:40",msgs:[["in","Hi John, the committee asked if we can move to a cleaning every 3 weeks instead of 2. What do you suggest?"]],draft:"Hi Graham, happy to set Copperwell Social Club to whatever cycle the committee agrees. On 6 lines with your trade, I would want to talk it through first: can I call you tomorrow morning? John"},
 {v:5,ch:"fb",cl:"Facebook",last:"Yesterday",msgs:[["in","Hi, do you do party kegs for our regatta in June? Probably 3 kegs"]],draft:"Hi Mark, yes, we supply event bars and party kegs. Which dates, how many guests, and do you need a bar set up or just the kegs and cooler? John"},
 {v:6,ch:"wa",cl:"WhatsApp",last:"Mon",msgs:[["in","Font is dripping again on tap 2"],["out","Thanks Luca, can you send a quick video?"],["in","[video]"]],draft:"Thanks Luca. That looks like the tap washer. I can swap it on Thursday when I am in Windsor, 10am OK?"},
 {v:9,ch:"web",cl:"Website form",last:"Sun",msgs:[["in","Wedding on a Saturday, marquee, about 120 guests, lager and cider. Can you help?"]],draft:"Hi Hannah, congratulations. Yes, we can do an event bar for that. Two kegs of lager and one cider would be a sensible start for 120 guests; I will send a quote today for you to look at. John"}];
R.inbox=function(m){var sel=0;
 function draw(){var t=THREADS[sel],v=V(t.v);
  m.innerHTML='<div class="ibx"><div>'+THREADS.map(function(x,i){var vv=V(x.v);return '<div class="th'+(i===sel?" on":"")+'" data-t="'+i+'"><b><span>'+vv.name+'</span><span class="ch c-'+x.ch+'">'+x.cl+'</span></b><span>'+x.msgs[x.msgs.length-1][1].slice(0,60)+'&hellip; &middot; '+x.last+'</span></div>';}).join("")+'</div>'
  +'<div class="card"><h3>'+v.name+' &middot; '+v.contact+' <span class="ch c-'+t.ch+'">'+t.cl+'</span></h3><div class="msgs">'+t.msgs.map(function(x){return '<div class="m '+x[0]+'">'+x[1]+'</div>';}).join("")+'</div>'
  +'<div class="draft"><b>AI-drafted reply</b> <span class="s" style="color:#6f625c;font-size:12px">uses the venue record and job history; John checks before it goes</span><textarea id="dr">'+t.draft+'</textarea>'
  +'<button class="btn sm" id="snd">Approve and send</button> <button class="btn g sm" id="rw">Rewrite shorter</button></div></div></div>';}
 draw();
 m.onclick=function(e){var x=e.target.closest("[data-t]");if(x){sel=+x.getAttribute("data-t");draw();return;}
  if(e.target.id==="snd"){THREADS[sel].msgs.push(["out",$("#dr").value]);THREADS[sel].draft="";addLog("Reply sent to "+V(THREADS[sel].v).name+" ("+THREADS[sel].cl+")");toast("Sent (demo, nothing actually sent)");draw();}
  if(e.target.id==="rw"){var t=$("#dr");t.value=t.value.split(". ").slice(0,2).join(". ").replace(/\.?$/,".")+" John";}};
};
R.reports=function(m){
 var wk=[[9,10],[10,10],[8,11],[10,11]];var mx=12;
 var h='<div class="grid2"><div class="card"><h3>Line cleans done vs due, last 4 weeks <span class="chip">Sample data</span></h3><div class="wk">'
 +wk.map(function(w,i){return '<div title="Week '+(i+1)+'"><i style="height:'+(w[0]/mx*100)+'%;background:#2f7d32"></i><i style="height:'+(w[1]/mx*100)+'%;background:#d9c7bd"></i></div>';}).join("")
 +'</div><div class="leg"><i style="background:#2f7d32"></i>Done<i style="background:#d9c7bd"></i>Due &middot; weeks 1 to 4</div></div>';
 var br={};S.jobs.forEach(function(j){if(j.t==="br")br[j.v]=(br[j.v]||0)+1;});br[7]=(br[7]||0)+2;br[4]=(br[4]||0)+1;
 h+='<div class="card"><h3>Breakdowns by venue, last 3 months <span class="chip">Sample data</span></h3><div class="bars">'+Object.keys(br).map(function(k){return '<div class="b"><span>'+V(+k).name+'</span><div class="tr"><i style="width:'+(br[k]/4*100)+'%;background:#c0392b"></i></div><span>'+br[k]+'</span></div>';}).join("")+'</div></div></div>';
 var rv=[[2,100],[7,92],[4,78],[1,70],[3,48],[8,40],[5,31],[6,22],[9,15]];
 h+='<div class="card"><h3>Revenue by venue, last 12 months <span class="chip">Sample data &middot; relative only, no real figures</span></h3><div class="bars">'+rv.map(function(r){return '<div class="b"><span>'+V(r[0]).name+'</span><div class="tr"><i style="width:'+r[1]+'%"></i></div><span></span></div>';}).join("")
 +'</div><p class="s" style="color:#6f625c;font-size:12.5px">In the real build this reads from your invoices, so you can see which venues are worth the most and which have gone quiet.</p></div>';
 h+='<div class="card"><h3>Venues on a cleaning cycle</h3>'+S.venues.filter(function(v){return v.cycle;}).map(function(v){var n=nextOff(v);return '<div class="row"><div><div class="t">'+v.name+'</div><div class="s">Every '+v.cycle+' days &middot; '+v.lines+' lines</div></div>'+(n<0?'<span class="bad">Overdue</span>':'<span class="ok">On schedule</span>')+'</div>';}).join("")+'</div>';
 m.innerHTML=h;
};
var view=document.body.getAttribute("data-view");var m=$("#main");R[view](m);
$("#reset").onclick=function(){try{localStorage.removeItem(KEY);}catch(e){}S=JSON.parse(JSON.stringify(DEF));toast("Sample data reset");R[view](m);};
})();
