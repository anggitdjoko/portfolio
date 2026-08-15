/* =====================================================================
   kobelco.js — LIVE interactive dashboard for PT Daya Kobelco (Company 02)
   Data aggregated from real 2023 transaction records (Jan–Sep, 7,151 tx).
   Renders native, hoverable SVG charts into #kobelco-dash.
   ===================================================================== */
(function(){
  var D = {"totals": {"tx": 7151, "qty": 13181, "sales": 8827321968, "customers": 2}, "customers": [{"name": "PT.KALIMANTAN INTI MAJU", "tx": 7031, "sales": 8443550879, "pctTx": 98.3, "pctSales": 95.7}, {"name": "PT.PUTRA RIMBA NUSANTARA", "tx": 120, "sales": 383771089, "pctTx": 1.7, "pctSales": 4.3}], "monthly": [{"m": "Jan", "tx": 661, "sales": 758799956, "qty": 1227}, {"m": "Feb", "tx": 743, "sales": 833006491, "qty": 1243}, {"m": "Mar", "tx": 1057, "sales": 1402143404, "qty": 1947}, {"m": "Apr", "tx": 599, "sales": 818347611, "qty": 1070}, {"m": "May", "tx": 955, "sales": 1263521006, "qty": 1501}, {"m": "Jun", "tx": 805, "sales": 986455200, "qty": 1509}, {"m": "Jul", "tx": 572, "sales": 647668600, "qty": 1142}, {"m": "Aug", "tx": 913, "sales": 1122467200, "qty": 1969}, {"m": "Sep", "tx": 846, "sales": 994912500, "qty": 1573}], "topParts": [{"part": "DKL-HOIL68-I20", "desc": "OIL HYD 68LL (PAIL)", "sales": 1294707500, "qty": 2320}, {"part": "DKL-HOIL68-I200", "desc": "OIL HYD 68LL (DRUM)", "sales": 623321500, "qty": 121}, {"part": "YN62D00017F1T2A", "desc": "TRACK LINK ASSY (46L)", "sales": 591825300, "qty": 39}, {"part": "YN62D00025F1E", "desc": "# TRACK LINK ASSY(HD)", "sales": 589220000, "qty": 34}, {"part": "DKL-EOILDH1-I22", "desc": "OIL ENGINE DH1 15W40 (PAIL-22)", "sales": 531563500, "qty": 800}, {"part": "LQ64D00054F1J2B", "desc": "LOWER ROLLER ASSEMBLY", "sales": 514738814, "qty": 421}, {"part": "YN52V01025R100", "desc": "REPAIR KIT", "sales": 349454750, "qty": 400}, {"part": "DKL-GOIL-90-I5", "desc": "OIL GEAR 90 (PAIL 5 LITERS)", "sales": 268505800, "qty": 1169}, {"part": "YN52D00009F1J1B", "desc": "IDLER ASSEMBLY", "sales": 214922580, "qty": 62}, {"part": "2424N196D3J1A", "desc": "SHOE", "sales": 212948000, "qty": 521}], "matGroups": [{"code": "8RB", "name": "Lubricants / Oil", "sales": 2947643100, "qty": 4647}, {"code": "8R6", "name": "Track Link", "sales": 2483932820, "qty": 1565}, {"code": "8R1", "name": "Rollers & Idlers", "sales": 1676782448, "qty": 5228}, {"code": "8R3", "name": "Undercarriage", "sales": 347358600, "qty": 464}, {"code": "8R2", "name": "Hydraulic", "sales": 317617000, "qty": 136}, {"code": "8R5", "name": "Engine Parts", "sales": 309809850, "qty": 132}, {"code": "8R9", "name": "Filters", "sales": 199522650, "qty": 204}, {"code": "8R4", "name": "Bushings", "sales": 197710250, "qty": 545}, {"code": "8R7", "name": "Pins & Bolts", "sales": 188746500, "qty": 98}, {"code": "8RJ", "name": "Seals & Kits", "sales": 114171750, "qty": 110}, {"code": "8R8", "name": "Electrical", "sales": 27610400, "qty": 16}, {"code": "8RL", "name": "Misc", "sales": 14615600, "qty": 26}, {"code": "8RC", "name": "Fasteners", "sales": 1801000, "qty": 10}]};
  var money = function(n){
    if(n>=1e9) return 'Rp '+(n/1e9).toFixed(2)+'B';
    if(n>=1e6) return 'Rp '+(n/1e6).toFixed(1)+'M';
    if(n>=1e3) return 'Rp '+(n/1e3).toFixed(0)+'K';
    return 'Rp '+n;
  };
  var grp = function(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','); };
  var el = function(html){ var t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; };
  var NS='http://www.w3.org/2000/svg';
  function svg(w,h){ var s=document.createElementNS(NS,'svg'); s.setAttribute('viewBox','0 0 '+w+' '+h); s.setAttribute('width','100%'); s.setAttribute('preserveAspectRatio','xMidYMid meet'); return s; }
  function node(name,attrs){ var n=document.createElementNS(NS,name); for(var k in attrs) n.setAttribute(k,attrs[k]); return n; }

  var root = document.getElementById('kobelco-dash');
  if(!root) return;

  /* ---- shared tooltip ---- */
  var tip = el('<div class="kb-tip"></div>'); root.appendChild(tip);
  function showTip(html,x,y){ tip.innerHTML=html; tip.style.opacity='1'; var r=root.getBoundingClientRect(); tip.style.left=(x-r.left)+'px'; tip.style.top=(y-r.top)+'px'; }
  function hideTip(){ tip.style.opacity='0'; }

  /* ================= KPI ROW ================= */
  var kpiWrap = el('<div class="kb-kpis"></div>');
  var kpis = [
    ['7,151','Transactions (Jan–Sep 2023)'],
    ['13,181','Parts dispatched'],
    [money(D.totals.sales),'Total sales value'],
    ['95.7%','Revenue from top client']
  ];
  kpis.forEach(function(k){ kpiWrap.appendChild(el('<div class="kb-kpi"><b>'+k[0]+'</b><span>'+k[1]+'</span></div>')); });
  root.appendChild(kpiWrap);

  /* ================= MONTHLY BAR CHART (toggle) ================= */
  var mSec = el('<div class="kb-card kb-wide"><div class="kb-h"><div><b>Monthly Performance</b><span>March peaked at 1,057 transactions; July was the low point at 572.</span></div><div class="kb-toggle"><button data-k="sales" class="on">Sales</button><button data-k="tx">Transactions</button></div></div><div class="kb-chart" id="kb-monthly"></div></div>');
  root.appendChild(mSec);
  function drawMonthly(metric){
    var host = mSec.querySelector('#kb-monthly'); host.innerHTML='';
    var W=720,H=260,pad=34,bw=W-pad*2;
    var s=svg(W,H); s.classList.add('kb-svg');
    var max=Math.max.apply(null, D.monthly.map(function(d){return d[metric];}));
    var n=D.monthly.length, gap=14, bar=(bw-gap*(n-1))/n;
    // gridlines
    for(var g=0; g<=4; g++){ var gy=pad+(H-pad*2)*g/4; s.appendChild(node('line',{x1:pad,y1:gy,x2:W-pad,y2:gy,stroke:'rgba(140,160,220,.10)','stroke-width':1})); }
    var defs=node('defs',{}); defs.innerHTML='<linearGradient id="kbBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ad1ff"/><stop offset="1" stop-color="#7c8cff"/></linearGradient>'; s.appendChild(defs);
    D.monthly.forEach(function(d,i){
      var val=d[metric], bh=(H-pad*2)*(val/max), bx=pad+i*(bar+gap), by=H-pad-bh;
      var r=node('rect',{x:bx,y:by,width:bar,height:bh,rx:5,fill:'url(#kbBar)',opacity:.9,style:'transition:opacity .2s'});
      var peak=(d.m==='Mar'), low=(d.m==='Jul');
      if(peak) r.setAttribute('opacity','1'); if(low) r.setAttribute('opacity','.55');
      r.addEventListener('mousemove',function(e){ r.setAttribute('opacity','1'); showTip('<b>'+d.m+' 2023</b>'+money(d.sales).replace('Rp ','Rp ')+' · '+grp(d.tx)+' tx · '+grp(d.qty)+' parts',e.clientX,e.clientY); });
      r.addEventListener('mouseleave',function(){ r.setAttribute('opacity',peak?'1':(low?'.55':'.9')); hideTip(); });
      s.appendChild(r);
      s.appendChild(node('text',{x:bx+bar/2,y:H-pad+16,'text-anchor':'middle',fill:'#8b96b3','font-size':11,'font-family':'JetBrains Mono, monospace'})).textContent=d.m;
      var lbl = metric==='sales'? (val/1e6).toFixed(0)+'M' : grp(val);
      var tx=node('text',{x:bx+bar/2,y:by-7,'text-anchor':'middle',fill:'#eaf0ff','font-size':10.5,'font-weight':600}); tx.textContent=lbl; s.appendChild(tx);
    });
    host.appendChild(s);
  }
  drawMonthly('sales');
  mSec.querySelectorAll('.kb-toggle button').forEach(function(b){
    b.addEventListener('click',function(){ mSec.querySelectorAll('.kb-toggle button').forEach(function(x){x.classList.remove('on');}); b.classList.add('on'); drawMonthly(b.dataset.k); });
  });

  /* ================= ROW: customer donut + top parts ================= */
  var row = el('<div class="kb-row"></div>'); root.appendChild(row);

  /* customer concentration donut */
  var cSec = el('<div class="kb-card"><div class="kb-h"><div><b>Customer Concentration</b><span>One client drives almost all revenue — a dependency risk.</span></div></div><div class="kb-chart" id="kb-cust"></div></div>');
  row.appendChild(cSec);
  (function(){
    var host=cSec.querySelector('#kb-cust'); var W=260,H=210,cx=95,cy=105,R=72,r=44;
    var s=svg(W,H);
    var total=D.customers.reduce(function(a,c){return a+c.sales;},0), ang=-Math.PI/2;
    var cols=['#5ad1ff','#7c8cff','#3a4780'];
    D.customers.forEach(function(c,i){
      var frac=c.sales/total, a2=ang+frac*Math.PI*2;
      var x1=cx+R*Math.cos(ang),y1=cy+R*Math.sin(ang),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
      var xr1=cx+r*Math.cos(a2),yr1=cy+r*Math.sin(a2),xr2=cx+r*Math.cos(ang),yr2=cy+r*Math.sin(ang);
      var large=frac>.5?1:0;
      var p=node('path',{d:'M'+x1+' '+y1+'A'+R+' '+R+' 0 '+large+' 1 '+x2+' '+y2+'L'+xr1+' '+yr1+'A'+r+' '+r+' 0 '+large+' 0 '+xr2+' '+yr2+'Z',fill:cols[i],opacity:.9,style:'transition:opacity .2s'});
      p.addEventListener('mousemove',function(e){ p.setAttribute('opacity','1'); showTip('<b>'+c.name+'</b>'+money(c.sales)+' · '+c.pctSales+'% revenue · '+grp(c.tx)+' tx',e.clientX,e.clientY); });
      p.addEventListener('mouseleave',function(){ p.setAttribute('opacity','.9'); hideTip(); });
      s.appendChild(p); ang=a2;
    });
    s.appendChild(node('text',{x:cx,y:cy-4,'text-anchor':'middle',fill:'#eaf0ff','font-size':22,'font-weight':700})).textContent='95.7%';
    s.appendChild(node('text',{x:cx,y:cy+14,'text-anchor':'middle',fill:'#8b96b3','font-size':10})).textContent='top client';
    host.appendChild(s);
    var leg=el('<div class="kb-leg"></div>');
    D.customers.forEach(function(c,i){ leg.appendChild(el('<div><i style="background:'+cols[i]+'"></i><span>'+c.name.replace('PT.','PT ')+'</span><b>'+c.pctSales+'%</b></div>')); });
    host.appendChild(leg);
  })();

  /* top parts */
  var pSec = el('<div class="kb-card"><div class="kb-h"><div><b>Top 10 Parts by Value</b><span>Hydraulic oil (pail) leads at Rp 1.29B.</span></div></div><div class="kb-chart" id="kb-parts"></div></div>');
  row.appendChild(pSec);
  (function(){
    var host=pSec.querySelector('#kb-parts'); var max=D.topParts[0].sales;
    D.topParts.forEach(function(p){
      var pct=(p.sales/max*100);
      var b=el('<div class="kb-bar"><div class="kb-bl"><span class="kb-bn" title="'+p.part+'">'+p.desc+'</span><span class="kb-bv">'+money(p.sales)+'</span></div><div class="kb-btrack"><i style="width:'+pct.toFixed(1)+'%"></i></div></div>');
      b.addEventListener('mousemove',function(e){ showTip('<b>'+p.part+'</b>'+p.desc+'<br>'+money(p.sales)+' · '+grp(p.qty)+' units',e.clientX,e.clientY); });
      b.addEventListener('mouseleave',hideTip);
      host.appendChild(b);
    });
  })();

  /* ================= material groups ================= */
  var gSec = el('<div class="kb-card kb-wide"><div class="kb-h"><div><b>Material Group Mix</b><span>Across 13 groups, lubricants and track-link parts lead value; rollers lead volume.</span></div></div><div class="kb-chart" id="kb-mg"></div></div>');
  root.appendChild(gSec);
  (function(){
    var host=gSec.querySelector('#kb-mg'); var top=D.matGroups.slice(0,8);
    var W=720,H=200,pad=30,bw=W-pad*2, max=Math.max.apply(null,top.map(function(d){return d.sales;}));
    var s=svg(W,H); var n=top.length,gap=16,bar=(bw-gap*(n-1))/n;
    var defs=node('defs',{}); defs.innerHTML='<linearGradient id="kbMg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7c8cff"/><stop offset="1" stop-color="#5ad1ff"/></linearGradient>'; s.appendChild(defs);
    top.forEach(function(d,i){
      var bh=(H-pad*2)*(d.sales/max),bx=pad+i*(bar+gap),by=H-pad-bh;
      var r=node('rect',{x:bx,y:by,width:bar,height:bh,rx:5,fill:'url(#kbMg)',opacity:.85,style:'transition:opacity .2s'});
      r.addEventListener('mousemove',function(e){ r.setAttribute('opacity','1'); showTip('<b>'+d.name+' ('+d.code+')</b>'+money(d.sales)+' · '+grp(d.qty)+' units',e.clientX,e.clientY); });
      r.addEventListener('mouseleave',function(){ r.setAttribute('opacity','.85'); hideTip(); });
      s.appendChild(r);
      var t=node('text',{x:bx+bar/2,y:H-pad+15,'text-anchor':'middle',fill:'#8b96b3','font-size':10,'font-family':'JetBrains Mono, monospace'}); t.textContent=d.code; s.appendChild(t);
      var v=node('text',{x:bx+bar/2,y:by-6,'text-anchor':'middle',fill:'#eaf0ff','font-size':10,'font-weight':600}); v.textContent=(d.sales/1e6).toFixed(0)+'M'; s.appendChild(v);
    });
    host.appendChild(s);
  })();

  /* ---- Sales Forecast: least-squares trend + residual band, computed live from the Jan–Sep 2023 series.
         Only 9 months (one observation per calendar month) → no seasonal index is fitted; that would overfit.
         The band is a residual-based prediction interval, so it honestly reflects month-to-month volatility. ---- */
  var FC = (function(){
    var s=D.monthly.map(function(d){return d.sales;}), n=s.length;
    var xb=(n-1)/2, yb=0; for(var i=0;i<n;i++) yb+=s[i]; yb/=n;
    var num=0,den=0; for(i=0;i<n;i++){ num+=(i-xb)*(s[i]-yb); den+=(i-xb)*(i-xb); }
    var b=num/den, a=yb-b*xb;
    var ss=0; for(i=0;i<n;i++){ var r=s[i]-(a+b*i); ss+=r*r; }
    var rstd=Math.sqrt(ss/(n-2)), band=1.15*rstd;   // ~ prediction interval
    var labels=['Oct','Nov','Dec'], out=[];
    for(var k=0;k<3;k++){ var fi=n+k, pt=a+b*fi;
      out.push({m:labels[k],pt:Math.round(pt),lo:Math.round(pt-band),hi:Math.round(pt+band)}); }
    return {fc:out, slope:Math.round(b), mean:Math.round(yb), band:Math.round(band), bandPct:Math.round(band/yb*1000)/10};
  })();

  var fSec = el('<div class="kb-card kb-wide"><div class="kb-h"><div><b>Sales Forecast \u2014 Q4 2023</b><span>Least-squares trend + residual band, recomputed live from the Jan\u2013Sep series. No seasonal index is fitted \u2014 nine months is a single partial cycle.</span></div><div class="kb-toggle" style="pointer-events:none;opacity:.85"><button class="on" style="cursor:default">\u00b1'+FC.bandPct+'% band</button></div></div><div class="kb-chart" id="kb-fc"></div><div class="kb-leg" id="kb-fleg"></div></div>');
  root.appendChild(fSec);
  (function(){
    var host=fSec.querySelector('#kb-fc');
    var hist=D.monthly.map(function(d){return {m:d.m,v:d.sales,fcast:false};});
    var last=hist[hist.length-1];
    var band=[{m:last.m,lo:last.v,hi:last.v}].concat(FC.fc.map(function(f){return {m:f.m,lo:f.lo,hi:f.hi};}));
    var linePts=hist.concat(FC.fc.map(function(f){return {m:f.m,v:f.pt,fcast:true};}));
    var N=linePts.length;
    var W=720,H=280,padL=48,padR=20,padT=24,padB=30;
    var maxV=Math.max.apply(null,band.map(function(d){return d.hi;}).concat(linePts.map(function(d){return d.v;})));
    maxV=Math.ceil(maxV/2e8)*2e8;
    var s=svg(W,H); s.classList.add('kb-svg');
    var iw=W-padL-padR, ih=H-padT-padB;
    var X=function(i){ return padL+iw*i/(N-1); };
    var Y=function(v){ return padT+ih*(1-v/maxV); };
    for(var g=0;g<=4;g++){ var gy=padT+ih*g/4; s.appendChild(node('line',{x1:padL,y1:gy,x2:W-padR,y2:gy,stroke:'rgba(140,160,220,.10)','stroke-width':1}));
      s.appendChild(node('text',{x:padL-6,y:gy+3,'text-anchor':'end',fill:'#5f6b8a','font-size':9,'font-family':'JetBrains Mono, monospace'})).textContent=(maxV*(1-g/4)/1e6).toFixed(0)+'M'; }
    var divX=X(hist.length-1);
    s.appendChild(node('line',{x1:divX,y1:padT,x2:divX,y2:H-padB,stroke:'rgba(124,140,255,.35)','stroke-width':1,'stroke-dasharray':'3 4'}));
    s.appendChild(node('text',{x:divX+6,y:padT+10,fill:'#8b96b3','font-size':9})).textContent='forecast \u2192';
    var defs=node('defs',{}); defs.innerHTML='<linearGradient id="kbFcLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5ad1ff"/><stop offset="1" stop-color="#7c8cff"/></linearGradient>'; s.appendChild(defs);
    var bi0=hist.length-1, up='',dn='';
    band.forEach(function(d,i){ var xi=X(bi0+i); up+=(i?'L':'M')+xi+' '+Y(d.hi)+' '; });
    for(var bi=band.length-1;bi>=0;bi--){ var xi=X(bi0+bi); dn+='L'+xi+' '+Y(band[bi].lo)+' '; }
    s.appendChild(node('path',{d:up+dn+'Z',fill:'#7c8cff',opacity:.14}));
    var la=''; hist.forEach(function(d,i){ la+=(i?'L':'M')+X(i)+' '+Y(d.v)+' '; });
    s.appendChild(node('path',{d:la,fill:'none',stroke:'url(#kbFcLine)','stroke-width':2.4,'stroke-linejoin':'round'}));
    var lf='M'+X(hist.length-1)+' '+Y(last.v)+' ';
    FC.fc.forEach(function(f,i){ lf+='L'+X(hist.length+i)+' '+Y(f.pt)+' '; });
    s.appendChild(node('path',{d:lf,fill:'none',stroke:'#7c8cff','stroke-width':2.4,'stroke-dasharray':'6 5','stroke-linejoin':'round'}));
    linePts.forEach(function(d,i){
      var cxp=X(i), cyp=Y(d.v);
      var dot=node('circle',{cx:cxp,cy:cyp,r:d.fcast?4:3.2,fill:d.fcast?'#0b1020':'#5ad1ff',stroke:d.fcast?'#7c8cff':'none','stroke-width':d.fcast?2:0,style:'cursor:pointer'});
      dot.addEventListener('mousemove',function(e){
        if(d.fcast){ var f=FC.fc[i-hist.length]; showTip('<b>'+d.m+' 2023 \u00b7 forecast</b>'+money(f.pt)+'<br>range '+money(f.lo)+'\u2013'+money(f.hi),e.clientX,e.clientY); }
        else showTip('<b>'+d.m+' 2023 \u00b7 actual</b>'+money(d.v),e.clientX,e.clientY);
      });
      dot.addEventListener('mouseleave',hideTip);
      s.appendChild(dot);
      if(d.fcast){ var vt=node('text',{x:cxp,y:cyp-10,'text-anchor':'middle',fill:'#c7d0ee','font-size':10,'font-weight':600}); vt.textContent=(d.v/1e6).toFixed(0)+'M'; s.appendChild(vt); }
      s.appendChild(node('text',{x:cxp,y:H-padB+15,'text-anchor':'middle',fill:d.fcast?'#a9b4d6':'#8b96b3','font-size':9.5,'font-family':'JetBrains Mono, monospace'})).textContent=d.m;
    });
    host.appendChild(s);
    var q4=FC.fc.reduce(function(a,f){return a+f.pt;},0);
    var leg=fSec.querySelector('#kb-fleg'); leg.innerHTML='';
    leg.appendChild(el('<div><i style="background:#5ad1ff"></i><span>Actual Jan\u2013Sep</span></div>'));
    leg.appendChild(el('<div><i style="background:#7c8cff"></i><span>Forecast Q4</span><b>'+money(q4)+'</b></div>'));
    leg.appendChild(el('<div><i style="background:rgba(124,140,255,.35)"></i><span>Prediction \u00b1'+FC.bandPct+'%</span></div>'));
  })();

  /* ================= insights ================= */
  var q4fc=FC.fc.reduce(function(a,f){return a+f.pt;},0);
  root.appendChild(el('<div class="kb-ins"><div class="ins"><h4><i></i>Concentration Risk</h4><p><strong>PT Kalimantan Inti Maju</strong> alone drives <strong>95.7% of revenue</strong> (98.3% of transactions). The business is highly exposed to a single client.</p><p>Diversifying the customer base would materially de-risk the branch.</p></div><div class="ins"><h4><i></i>Demand Pattern</h4><p>Sales track maintenance cycles: a <strong>March peak (Rp 1.40B)</strong> against a Rp 980M monthly average, with a July trough.</p><p>Lubricants and undercarriage parts are the fast movers worth prioritizing in stock planning.</p></div><div class="ins"><h4><i></i>Forward Look \u2014 Q4 2023</h4><p>A trend model projects <strong>'+money(q4fc)+'</strong> across Oct\u2013Dec ('+money(FC.fc[0].pt)+' \u00b7 '+money(FC.fc[1].pt)+' \u00b7 '+money(FC.fc[2].pt)+'), essentially holding the <strong>'+money(FC.mean)+'/month</strong> run-rate.</p><p>The wide \u00b1'+FC.bandPct+'% band is honest: nine months carry real volatility and no full seasonal cycle to lean on.</p></div></div>'));

  root.appendChild(el('<div class="roadmap"><h4>Strategic Roadmap</h4>'
    +'<div class="step"><span class="n">01</span><div><b>Diversify the customer base</b><span>Actively pursue secondary contractors and rental fleets to reduce the 95.7% revenue dependence on a single client and de-risk the branch.</span></div></div>'
    +'<div class="step"><span class="n">02</span><div><b>Stock to the maintenance cycle</b><span>Prioritize lubricants and undercarriage parts and pre-position inventory ahead of the March peak, when demand runs well above the Rp 980M monthly average.</span></div></div>'
    +'<div class="step"><span class="n">03</span><div><b>Smooth the demand troughs</b><span>Use quieter months like July for planned service campaigns and preventive-maintenance offers, levelling revenue across the year.</span></div></div>'
    +'</div>'));

})();
