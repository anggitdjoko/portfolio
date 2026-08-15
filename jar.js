/* =====================================================================
   jar.js — LIVE interactive dashboard for PT JAR Andalan Rasa (Company 03)
   Fully data-driven: computed from the raw transaction dataset
   (DATASET TEST 3 — 2254 receipts / 7437 line items, October 2025).
   Renders into #jar-dash — same engine as kobelco.js / gas.js.
   ===================================================================== */
(function(){
  var D = {"meta": {"receipts": 2254, "lines": 7437, "net": 164838882, "qty": 8398, "aov": 22165, "nItems": 60, "nCats": 9, "period": "October 2025"}, "pay": [{"name": "Cash", "net": 79525243, "rc": 1174}, {"name": "QRIS (BCA)", "net": 75187970, "rc": 954}, {"name": "Card (BCA)", "net": 5789366, "rc": 64}, {"name": "GoFood", "net": 3241772, "rc": 43}, {"name": "GrabFood", "net": 1094532, "rc": 19}], "items": [{"name": "Kare Ramen", "qty": 893, "net": 23755350}, {"name": "SUMO Spicy Ramen", "qty": 413, "net": 12030738}, {"name": "Chicken Katsu Bowl Set", "qty": 286, "net": 7922888}, {"name": "Curry Chicken Bowl Set", "qty": 232, "net": 6925523}, {"name": "Curry Mozarella Rice Bowl", "qty": 198, "net": 6867770}, {"name": "Chizu Ramen", "qty": 234, "net": 6518293}, {"name": "Tom Yum Ramen", "qty": 235, "net": 6437939}, {"name": "Katsu Matsuri Roru", "qty": 250, "net": 6147261}, {"name": "Mineral Water", "qty": 703, "net": 5516066}, {"name": "Chikin Kani Mentai Roll", "qty": 203, "net": 4852130}, {"name": "Iced Tea", "qty": 767, "net": 4781278}, {"name": "Grilled Chicken Bowl Set", "qty": 166, "net": 4677398}], "cats": [{"name": "Ramen", "qty": 2000, "net": 55179593}, {"name": "Rice Bowl", "qty": 1322, "net": 38723009}, {"name": "Sushi", "qty": 1196, "net": 30535416}, {"name": "Drinks", "qty": 2956, "net": 26799073}, {"name": "New Menu", "qty": 344, "net": 6557259}, {"name": "Side Dish", "qty": 308, "net": 5979442}, {"name": "Bundle Package", "qty": 13, "net": 472719}, {"name": "Add On", "qty": 223, "net": 443938}, {"name": "Extra Topping", "qty": 11, "net": 148433}], "type": [{"name": "Dine In", "net": 152424049, "rc": 2034}, {"name": "Take Away", "net": 7867622, "rc": 157}, {"name": "GoFood", "net": 3521769, "rc": 45}, {"name": "GrabFood", "net": 1025442, "rc": 18}], "hour": [[7, 5], [8, 148], [9, 272], [10, 542], [11, 863], [12, 561], [13, 368], [14, 356], [15, 578], [16, 823], [17, 1043], [18, 1398], [19, 1160], [20, 281]], "peakHour": [18, 1398], "topCat": {"name": "Ramen", "qty": 2000, "net": 55179593}, "hero": {"name": "Kare Ramen", "qty": 893, "net": 23755350}};

  var el = function(html){ var t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; };
  var NS='http://www.w3.org/2000/svg';
  function svg(w,h){ var s=document.createElementNS(NS,'svg'); s.setAttribute('viewBox','0 0 '+w+' '+h); s.setAttribute('width','100%'); s.setAttribute('preserveAspectRatio','xMidYMid meet'); return s; }
  function node(name,attrs){ var n=document.createElementNS(NS,name); for(var k in attrs) n.setAttribute(k,attrs[k]); return n; }
  var grp = function(n){ return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','); };
  function rp(n){ return 'Rp '+grp(n); }
  function jt(n){ return (n/1e6).toFixed(1)+'M'; }
  var PAL=['#5ad1ff','#7c8cff','#6bb8ff','#9b7cff','#4fe3c1','#ffb454','#ff7c9c','#8b96b3','#3a4780','#5566aa'];

  var root = document.getElementById('jar-dash');
  if(!root) return;
  var tip = el('<div class="kb-tip"></div>'); root.appendChild(tip);
  function showTip(html,x,y){ tip.innerHTML=html; tip.style.opacity='1'; var r=root.getBoundingClientRect(); tip.style.left=(x-r.left)+'px'; tip.style.top=(y-r.top)+'px'; }
  function hideTip(){ tip.style.opacity='0'; }

  /* ===== row 1: payment donut + top menu bar ===== */
  var row = el('<div class="kb-row"></div>'); root.appendChild(row);

  /* -- payment donut -- */
  var payTot = D.pay.reduce(function(a,b){return a+b.net;},0);
  var onsite = 0; D.pay.forEach(function(p){ if(p.name==='Cash'||p.name==='QRIS (BCA)'||p.name==='Card (BCA)') onsite+=p.net; });
  var onsitePct = (onsite/payTot*100);
  var cSec = el('<div class="kb-card"><div class="kb-h"><div><b>Payment Composition</b><span>By net sales value across '+grp(D.meta.lines)+' line items.</span></div></div><div class="kb-chart" id="jar-pay"></div></div>');
  row.appendChild(cSec);
  (function(){
    var host=cSec.querySelector('#jar-pay'); var W=260,H=210,cx=95,cy=105,R=72,r=44;
    var s=svg(W,H); var ang=-Math.PI/2;
    D.pay.forEach(function(c,i){
      var frac=c.net/payTot, a2=ang+frac*Math.PI*2;
      var x1=cx+R*Math.cos(ang),y1=cy+R*Math.sin(ang),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
      var xr1=cx+r*Math.cos(a2),yr1=cy+r*Math.sin(a2),xr2=cx+r*Math.cos(ang),yr2=cy+r*Math.sin(ang);
      var large=frac>.5?1:0; var col=PAL[i%PAL.length];
      var p=node('path',{d:'M'+x1+' '+y1+'A'+R+' '+R+' 0 '+large+' 1 '+x2+' '+y2+'L'+xr1+' '+yr1+'A'+r+' '+r+' 0 '+large+' 0 '+xr2+' '+yr2+'Z',fill:col,opacity:.9,style:'transition:opacity .2s'});
      p.addEventListener('mousemove',function(e){ p.setAttribute('opacity','1'); showTip('<b>'+c.name+'</b>'+rp(c.net)+' \u00b7 '+(frac*100).toFixed(1)+'% \u00b7 '+grp(c.rc)+' bills',e.clientX,e.clientY); });
      p.addEventListener('mouseleave',function(){ p.setAttribute('opacity','.9'); hideTip(); });
      s.appendChild(p); ang=a2;
    });
    s.appendChild(node('text',{x:cx,y:cy-4,'text-anchor':'middle',fill:'#eaf0ff','font-size':20,'font-weight':700})).textContent=onsitePct.toFixed(1)+'%';
    s.appendChild(node('text',{x:cx,y:cy+14,'text-anchor':'middle',fill:'#8b96b3','font-size':10})).textContent='on-site';
    host.appendChild(s);
    var leg=el('<div class="kb-leg"></div>');
    D.pay.forEach(function(c,i){ leg.appendChild(el('<div><i style="background:'+PAL[i%PAL.length]+'"></i><span>'+c.name+'</span><b>'+(c.net/payTot*100).toFixed(1)+'%</b></div>')); });
    host.appendChild(leg);
  })();

  /* -- top menu bar -- */
  var pSec = el('<div class="kb-card"><div class="kb-h"><div><b>Top Menu Items</b><span>'+D.hero.name+' is the hero, well ahead of the field.</span></div><div class="kb-toggle" id="jar-tg"><button data-k="net" class="on">Sales</button><button data-k="qty">Qty</button></div></div><div class="kb-chart" id="jar-prod"></div></div>');
  row.appendChild(pSec);
  (function(){
    var host=pSec.querySelector('#jar-prod'); var mode='net';
    function draw(){
      host.innerHTML='';
      var arr=D.items.slice().sort(function(a,b){return b[mode]-a[mode];}).slice(0,10);
      var max=arr[0][mode];
      arr.forEach(function(p,i){
        var pct=(p[mode]/max*100);
        var val = mode==='net' ? ('Rp '+jt(p.net)) : (grp(p.qty)+' sold');
        var b=el('<div class="kb-bar"><div class="kb-bl"><span class="kb-bn">'+p.name+'</span><span class="kb-bv">'+val+'</span></div><div class="kb-btrack"><i style="width:'+pct.toFixed(1)+'%;background:linear-gradient(90deg,#7c8cff,'+PAL[i%3]+')"></i></div></div>');
        b.addEventListener('mousemove',function(e){ showTip('<b>'+p.name+'</b>'+rp(p.net)+' \u00b7 '+grp(p.qty)+' sold',e.clientX,e.clientY); });
        b.addEventListener('mouseleave',hideTip);
        host.appendChild(b);
      });
    }
    draw();
    pSec.querySelectorAll('#jar-tg button').forEach(function(btn){
      btn.addEventListener('click',function(){ mode=btn.getAttribute('data-k'); pSec.querySelectorAll('#jar-tg button').forEach(function(b){b.classList.remove('on');}); btn.classList.add('on'); draw(); });
    });
  })();

  /* ===== row 2: category mix + sales by hour ===== */
  var row2 = el('<div class="kb-row"></div>'); root.appendChild(row2);

  /* -- category mix (horizontal bars) -- */
  var catTot=D.cats.reduce(function(a,b){return a+b.net;},0);
  var kSec = el('<div class="kb-card"><div class="kb-h"><div><b>Sales by Category</b><span>'+D.topCat.name+' leads across '+D.meta.nCats+' menu categories.</span></div></div><div class="kb-chart" id="jar-cat"></div></div>');
  row2.appendChild(kSec);
  (function(){
    var host=kSec.querySelector('#jar-cat'); var max=D.cats[0].net;
    D.cats.forEach(function(c,i){
      var pct=(c.net/max*100); var share=(c.net/catTot*100);
      var b=el('<div class="kb-bar"><div class="kb-bl"><span class="kb-bn">'+c.name+'</span><span class="kb-bv">'+share.toFixed(1)+'%</span></div><div class="kb-btrack"><i style="width:'+pct.toFixed(1)+'%;background:linear-gradient(90deg,#3a4780,'+PAL[i%PAL.length]+')"></i></div></div>');
      b.addEventListener('mousemove',function(e){ showTip('<b>'+c.name+'</b>'+rp(c.net)+' \u00b7 '+grp(c.qty)+' items \u00b7 '+share.toFixed(1)+'%',e.clientX,e.clientY); });
      b.addEventListener('mouseleave',hideTip);
      host.appendChild(b);
    });
  })();

  /* -- sales by hour (bar/area) -- */
  var hSec = el('<div class="kb-card"><div class="kb-h"><div><b>Traffic by Hour</b><span>Peak at '+D.peakHour[0]+':00 \u2014 the dinner rush drives the day.</span></div></div><div class="kb-chart" id="jar-hour"></div></div>');
  row2.appendChild(hSec);
  (function(){
    var host=hSec.querySelector('#jar-hour');
    var data=D.hour; var W=300,H=200,pad=28;
    var maxV=Math.max.apply(null,data.map(function(d){return d[1];}));
    var n=data.length; var bw=(W-pad*2)/n;
    var s=svg(W,H);
    // axis baseline
    s.appendChild(node('line',{x1:pad,y1:H-pad,x2:W-pad+4,y2:H-pad,stroke:'#2a3350','stroke-width':1}));
    data.forEach(function(d,i){
      var h=(d[1]/maxV)*(H-pad*2);
      var x=pad+i*bw, y=H-pad-h;
      var isPeak=d[0]===D.peakHour[0];
      var rect=node('rect',{x:x+1,y:y,width:Math.max(bw-2,2),height:h,rx:2,fill:isPeak?'#5ad1ff':'#7c8cff',opacity:isPeak?0.95:0.6,style:'transition:opacity .2s'});
      rect.addEventListener('mousemove',function(e){ rect.setAttribute('opacity','1'); showTip('<b>'+d[0]+':00</b>'+grp(d[1])+' items sold',e.clientX,e.clientY); });
      rect.addEventListener('mouseleave',function(){ rect.setAttribute('opacity',isPeak?'0.95':'0.6'); hideTip(); });
      s.appendChild(rect);
      if(i%3===0||isPeak){ s.appendChild(node('text',{x:x+bw/2,y:H-pad+13,'text-anchor':'middle',fill:'#8b96b3','font-size':9})).textContent=d[0]; }
    });
    host.appendChild(s);
    host.appendChild(el('<p style="font-size:.78rem;color:#8b96b3;margin-top:8px">Items sold per hour of day \u00b7 dinner service (18:00\u201321:00) carries the outlet.</p>'));
  })();

  /* ===== insights ===== */
  root.appendChild(el('<div class="kb-ins"><div class="ins"><h4><i></i>Hero-Led Menu</h4><p><strong>'+D.hero.name+'</strong> alone brings <strong>Rp '+jt(D.hero.net)+'</strong> ('+(D.hero.net/D.meta.net*100).toFixed(1)+'% of sales), far ahead of the next item \u2014 strong pull, but concentration risk if it ever stocks out.</p><p>Ramen and Rice Bowl categories together anchor the kitchen\u2019s revenue.</p></div><div class="ins"><h4><i></i>On-Site, Dinner-Driven</h4><p><strong>'+onsitePct.toFixed(1)+'%</strong> of sales are on-site (cash + QRIS + card); delivery is still a thin slice. Traffic peaks hard at <strong>'+D.peakHour[0]+':00</strong>.</p><p>Average bill is <strong>'+rp(D.meta.aov)+'</strong> across '+grp(D.meta.receipts)+' receipts \u2014 headroom to lift via bundling.</p></div></div>'));
})();
