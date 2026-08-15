/* =====================================================================
   gas.js — LIVE interactive dashboard for Pangkalan Gas 3kg Joeherman (Company 01)
   Data aggregated from real 2024 transaction records (31,459 tx, 12 months).
   Renders native, hoverable SVG charts into #gas-dash — same engine as kobelco.js.
   ===================================================================== */
(function(){
  var D = {"totals":{"tx":31459,"rt":25838,"um":5621,"avg":2622,"pctRT":82.1,"pctUM":17.9},"peak":{"m":"Sep","total":3460},"low":{"m":"Dec","total":932},"monthly":[{"m":"Jan","rt":2172,"um":308,"total":2480},{"m":"Feb","rt":2307,"um":322,"total":2629},{"m":"Mar","rt":2630,"um":384,"total":3014},{"m":"Apr","rt":2386,"um":263,"total":2649},{"m":"May","rt":2190,"um":290,"total":2480},{"m":"Jun","rt":2104,"um":296,"total":2400},{"m":"Jul","rt":2208,"um":245,"total":2453},{"m":"Aug","rt":2143,"um":1162,"total":3305},{"m":"Sep","rt":1978,"um":1482,"total":3460},{"m":"Oct","rt":2733,"um":214,"total":2947},{"m":"Nov","rt":2401,"um":309,"total":2710},{"m":"Dec","rt":586,"um":346,"total":932}],"quarters":[{"name":"Q1","total":8123},{"name":"Q2","total":7529},{"name":"Q3","total":9218},{"name":"Q4","total":6589}]};
  var grp = function(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','); };
  var el = function(html){ var t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; };
  var NS='http://www.w3.org/2000/svg';
  function svg(w,h){ var s=document.createElementNS(NS,'svg'); s.setAttribute('viewBox','0 0 '+w+' '+h); s.setAttribute('width','100%'); s.setAttribute('preserveAspectRatio','xMidYMid meet'); return s; }
  function node(name,attrs){ var n=document.createElementNS(NS,name); for(var k in attrs) n.setAttribute(k,attrs[k]); return n; }

  var root = document.getElementById('gas-dash');
  if(!root) return;
  var tip = el('<div class="kb-tip"></div>'); root.appendChild(tip);
  function showTip(html,x,y){ tip.innerHTML=html; tip.style.opacity='1'; var r=root.getBoundingClientRect(); tip.style.left=(x-r.left)+'px'; tip.style.top=(y-r.top)+'px'; }
  function hideTip(){ tip.style.opacity='0'; }
  var C_RT='#5ad1ff', C_UM='#7c8cff';

  var kpiWrap = el('<div class="kb-kpis"></div>');
  [[grp(D.totals.tx),'Total transactions (2024)'],
   [grp(D.totals.avg),'Avg transactions / month'],
   [D.totals.pctRT+'%','Household (Rumah Tangga) share'],
   [D.peak.m,'Peak month · '+grp(D.peak.total)+' tx']
  ].forEach(function(k){ kpiWrap.appendChild(el('<div class="kb-kpi"><b>'+k[0]+'</b><span>'+k[1]+'</span></div>')); });
  root.appendChild(kpiWrap);

  var mSec = el('<div class="kb-card kb-wide"><div class="kb-h"><div><b>Monthly Transactions</b><span>Peak in '+D.peak.m+' ('+grp(D.peak.total)+'); sharp drop in '+D.low.m+' ('+grp(D.low.total)+'). Note the UMKM surge in Aug\u2013Sep.</span></div><div class="kb-toggle"><button data-k="stack" class="on">Stacked</button><button data-k="total">Total</button></div></div><div class="kb-chart" id="gas-monthly"></div><div class="kb-leg" id="gas-mleg"></div></div>');
  root.appendChild(mSec);
  function drawMonthly(mode){
    var host=mSec.querySelector('#gas-monthly'); host.innerHTML='';
    var W=720,H=260,pad=34,bw=W-pad*2;
    var s=svg(W,H); s.classList.add('kb-svg');
    var max=Math.max.apply(null,D.monthly.map(function(d){return d.total;}));
    var n=D.monthly.length,gap=14,bar=(bw-gap*(n-1))/n;
    for(var g=0;g<=4;g++){ var gy=pad+(H-pad*2)*g/4; s.appendChild(node('line',{x1:pad,y1:gy,x2:W-pad,y2:gy,stroke:'rgba(140,160,220,.10)','stroke-width':1})); }
    var defs=node('defs',{}); defs.innerHTML='<linearGradient id="gasBar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5ad1ff"/><stop offset="1" stop-color="#7c8cff"/></linearGradient>'; s.appendChild(defs);
    D.monthly.forEach(function(d,i){
      var bx=pad+i*(bar+gap);
      if(mode==='stack'){
        var hRT=(H-pad*2)*(d.rt/max), hUM=(H-pad*2)*(d.um/max);
        var yUM=H-pad-hUM, yRT=yUM-hRT;
        var rUM=node('rect',{x:bx,y:yUM,width:bar,height:hUM,rx:3,fill:C_UM,opacity:.9,style:'transition:opacity .2s'});
        var rRT=node('rect',{x:bx,y:yRT,width:bar,height:hRT,rx:3,fill:C_RT,opacity:.9,style:'transition:opacity .2s'});
        [ [rRT,'Rumah Tangga',d.rt], [rUM,'Usaha Mikro (UMKM)',d.um] ].forEach(function(pair){
          pair[0].addEventListener('mousemove',function(e){ pair[0].setAttribute('opacity','1'); showTip('<b>'+d.m+' 2024</b>'+pair[1]+': '+grp(pair[2])+' tx<br>Total: '+grp(d.total)+' tx',e.clientX,e.clientY); });
          pair[0].addEventListener('mouseleave',function(){ pair[0].setAttribute('opacity','.9'); hideTip(); });
        });
        s.appendChild(rUM); s.appendChild(rRT);
        var tt=node('text',{x:bx+bar/2,y:yRT-6,'text-anchor':'middle',fill:'#eaf0ff','font-size':10,'font-weight':600}); tt.textContent=grp(d.total); s.appendChild(tt);
      } else {
        var bh=(H-pad*2)*(d.total/max), by=H-pad-bh;
        var peak=(d.m===D.peak.m), low=(d.m===D.low.m);
        var r=node('rect',{x:bx,y:by,width:bar,height:bh,rx:5,fill:'url(#gasBar)',opacity:peak?1:(low?.55:.9),style:'transition:opacity .2s'});
        r.addEventListener('mousemove',function(e){ r.setAttribute('opacity','1'); showTip('<b>'+d.m+' 2024</b>'+grp(d.total)+' tx \u00b7 RT '+grp(d.rt)+' \u00b7 UMKM '+grp(d.um),e.clientX,e.clientY); });
        r.addEventListener('mouseleave',function(){ r.setAttribute('opacity',peak?1:(low?.55:.9)); hideTip(); });
        s.appendChild(r);
        var v=node('text',{x:bx+bar/2,y:by-7,'text-anchor':'middle',fill:'#eaf0ff','font-size':10.5,'font-weight':600}); v.textContent=grp(d.total); s.appendChild(v);
      }
      s.appendChild(node('text',{x:bx+bar/2,y:H-pad+16,'text-anchor':'middle',fill:'#8b96b3','font-size':11,'font-family':'JetBrains Mono, monospace'})).textContent=d.m;
    });
    host.appendChild(s);
    var leg=mSec.querySelector('#gas-mleg'); leg.innerHTML='';
    if(mode==='stack'){
      leg.appendChild(el('<div><i style="background:'+C_RT+'"></i><span>Rumah Tangga</span><b>'+grp(D.totals.rt)+' tx</b></div>'));
      leg.appendChild(el('<div><i style="background:'+C_UM+'"></i><span>Usaha Mikro (UMKM)</span><b>'+grp(D.totals.um)+' tx</b></div>'));
    }
  }
  drawMonthly('stack');
  mSec.querySelectorAll('.kb-toggle button').forEach(function(b){
    b.addEventListener('click',function(){ mSec.querySelectorAll('.kb-toggle button').forEach(function(x){x.classList.remove('on');}); b.classList.add('on'); drawMonthly(b.dataset.k); });
  });

  /* ---- Demand Forecast: least-squares trend + seasonal index, computed live from the 2024 series ---- */
  var FC = (function(){
    var m=D.monthly, n=m.length, labels=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var totals=m.map(function(d){return d.total;});
    var sorted=totals.slice().sort(function(a,b){return a-b;});
    var median=sorted[Math.floor(n/2)];
    var keep=[]; for(var i=0;i<n;i++){ if(totals[i]>=0.5*median) keep.push(i); }   // drop obvious anomalies (e.g. incomplete Dec)
    var kn=keep.length, xb=0, yb=0;
    for(var j=0;j<kn;j++){ xb+=keep[j]; yb+=totals[keep[j]]; } xb/=kn; yb/=kn;
    var num=0,den=0; for(j=0;j<kn;j++){ num+=(keep[j]-xb)*(totals[keep[j]]-yb); den+=(keep[j]-xb)*(keep[j]-xb); }
    var b=num/den, a=yb-b*xb;
    var monthRatio={}, ratios=[];
    for(j=0;j<kn;j++){ var idx=keep[j], fit=a+b*idx, r=totals[idx]/fit; ratios.push(r); monthRatio[idx%12]=r; }
    var rm=0; for(j=0;j<ratios.length;j++) rm+=ratios[j]; rm/=ratios.length;
    var vv=0; for(j=0;j<ratios.length;j++) vv+=(ratios[j]-rm)*(ratios[j]-rm); var rstd=Math.sqrt(vv/ratios.length);
    var band=1.04*rstd;   // ~70% interval — honest given a single seasonal cycle
    var out=[];
    for(var k=0;k<3;k++){ var fi=n+k, cal=fi%12, seas=(monthRatio[cal]!=null?monthRatio[cal]:1), tr=a+b*fi, pt=tr*seas;
      out.push({m:labels[cal],pt:Math.round(pt),lo:Math.round(pt*(1-band)),hi:Math.round(pt*(1+band))}); }
    var excluded=[]; for(i=0;i<n;i++){ if(keep.indexOf(i)<0) excluded.push(m[i].m); }
    return {fc:out, bandPct:Math.round(band*1000)/10, slope:Math.round(b), excluded:excluded};
  })();

  var fSub='Least-squares trend + seasonal index, recomputed live from the 2024 series'
    +(FC.excluded.length?' ('+FC.excluded.join(', ')+' treated as anomal'+(FC.excluded.length>1?'ies':'y')+').':'.');
  var fSec = el('<div class="kb-card kb-wide"><div class="kb-h"><div><b>Demand Forecast \u2014 Q1 2025</b><span>'+fSub+'</span></div><div class="kb-toggle" style="pointer-events:none;opacity:.85"><button class="on" style="cursor:default">\u00b1'+FC.bandPct+'% band</button></div></div><div class="kb-chart" id="gas-fc"></div><div class="kb-leg" id="gas-fleg"></div></div>');
  root.appendChild(fSec);
  (function(){
    var host=fSec.querySelector('#gas-fc');
    var hist=D.monthly.map(function(d){return {m:d.m,v:d.total,fcast:false};});
    var last=hist[hist.length-1];
    var band=[{m:last.m,lo:last.v,hi:last.v}].concat(FC.fc.map(function(f){return {m:f.m,lo:f.lo,hi:f.hi};}));
    var linePts=hist.concat(FC.fc.map(function(f){return {m:f.m,v:f.pt,fcast:true};}));
    var N=linePts.length;
    var W=720,H=280,padL=40,padR=20,padT=24,padB=30;
    var maxV=Math.max.apply(null,band.map(function(d){return d.hi;}).concat(linePts.map(function(d){return d.v;})));
    maxV=Math.ceil(maxV/500)*500;
    var s=svg(W,H); s.classList.add('kb-svg');
    var iw=W-padL-padR, ih=H-padT-padB;
    var X=function(i){ return padL+iw*i/(N-1); };
    var Y=function(v){ return padT+ih*(1-v/maxV); };
    for(var g=0;g<=4;g++){ var gy=padT+ih*g/4; s.appendChild(node('line',{x1:padL,y1:gy,x2:W-padR,y2:gy,stroke:'rgba(140,160,220,.10)','stroke-width':1}));
      s.appendChild(node('text',{x:padL-6,y:gy+3,'text-anchor':'end',fill:'#5f6b8a','font-size':9,'font-family':'JetBrains Mono, monospace'})).textContent=grp(Math.round(maxV*(1-g/4))); }
    // divider between actual and forecast
    var divX=X(hist.length-1);
    s.appendChild(node('line',{x1:divX,y1:padT,x2:divX,y2:H-padB,stroke:'rgba(124,140,255,.35)','stroke-width':1,'stroke-dasharray':'3 4'}));
    s.appendChild(node('text',{x:divX+6,y:padT+10,fill:'#8b96b3','font-size':9})).textContent='forecast \u2192';
    // confidence band (from last actual across the 3 forecasts)
    var defs=node('defs',{}); defs.innerHTML='<linearGradient id="gasFcLine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5ad1ff"/><stop offset="1" stop-color="#7c8cff"/></linearGradient>'; s.appendChild(defs);
    var bi0=hist.length-1;
    var up='',dn='';
    band.forEach(function(d,i){ var xi=X(bi0+i); up+=(i?'L':'M')+xi+' '+Y(d.hi)+' '; });
    for(var bi=band.length-1;bi>=0;bi--){ var xi=X(bi0+bi); dn+='L'+xi+' '+Y(band[bi].lo)+' '; }
    s.appendChild(node('path',{d:up+dn+'Z',fill:'#7c8cff',opacity:.14}));
    // actual line
    var la=''; hist.forEach(function(d,i){ la+=(i?'L':'M')+X(i)+' '+Y(d.v)+' '; });
    s.appendChild(node('path',{d:la,fill:'none',stroke:'url(#gasFcLine)','stroke-width':2.4,'stroke-linejoin':'round'}));
    // forecast line (dashed) — connect from last actual
    var lf='M'+X(hist.length-1)+' '+Y(last.v)+' ';
    FC.fc.forEach(function(f,i){ lf+='L'+X(hist.length+i)+' '+Y(f.pt)+' '; });
    s.appendChild(node('path',{d:lf,fill:'none',stroke:'#7c8cff','stroke-width':2.4,'stroke-dasharray':'6 5','stroke-linejoin':'round'}));
    // dots + tooltips
    linePts.forEach(function(d,i){
      var cxp=X(i), cyp=Y(d.v);
      var dot=node('circle',{cx:cxp,cy:cyp,r:d.fcast?4:3.2,fill:d.fcast?'#0b1020':'#5ad1ff',stroke:d.fcast?'#7c8cff':'none','stroke-width':d.fcast?2:0,style:'cursor:pointer'});
      dot.addEventListener('mousemove',function(e){
        if(d.fcast){ var f=FC.fc[i-hist.length]; showTip('<b>'+d.m+' 2025 \u00b7 forecast</b>'+grp(f.pt)+' tx<br>range '+grp(f.lo)+'\u2013'+grp(f.hi),e.clientX,e.clientY); }
        else showTip('<b>'+d.m+' 2024 \u00b7 actual</b>'+grp(d.v)+' tx',e.clientX,e.clientY);
      });
      dot.addEventListener('mouseleave',hideTip);
      s.appendChild(dot);
      if(d.fcast){ var vt=node('text',{x:cxp,y:cyp-10,'text-anchor':'middle',fill:'#c7d0ee','font-size':10,'font-weight':600}); vt.textContent=grp(d.v); s.appendChild(vt); }
      s.appendChild(node('text',{x:cxp,y:H-padB+15,'text-anchor':'middle',fill:d.fcast?'#a9b4d6':'#8b96b3','font-size':9.5,'font-family':'JetBrains Mono, monospace'})).textContent=d.m;
    });
    host.appendChild(s);
    var q1=FC.fc.reduce(function(a,f){return a+f.pt;},0);
    var leg=fSec.querySelector('#gas-fleg'); leg.innerHTML='';
    leg.appendChild(el('<div><i style="background:#5ad1ff"></i><span>Actual 2024</span></div>'));
    leg.appendChild(el('<div><i style="background:#7c8cff"></i><span>Forecast Q1 2025</span><b>'+grp(q1)+' tx</b></div>'));
    leg.appendChild(el('<div><i style="background:rgba(124,140,255,.35)"></i><span>Confidence \u00b1'+FC.bandPct+'%</span></div>'));
  })();

  var row = el('<div class="kb-row"></div>'); root.appendChild(row);
  var cSec = el('<div class="kb-card"><div class="kb-h"><div><b>Customer Segmentation</b><span>Household buyers dominate the retail base.</span></div></div><div class="kb-chart" id="gas-seg"></div></div>');
  row.appendChild(cSec);
  (function(){
    var host=cSec.querySelector('#gas-seg'); var W=260,H=210,cx=95,cy=105,R=72,r=44;
    var s=svg(W,H);
    var segs=[{name:'Rumah Tangga',val:D.totals.rt,pct:D.totals.pctRT,c:C_RT},{name:'Usaha Mikro (UMKM)',val:D.totals.um,pct:D.totals.pctUM,c:C_UM}];
    var total=D.totals.tx, ang=-Math.PI/2;
    segs.forEach(function(c){
      var frac=c.val/total, a2=ang+frac*Math.PI*2;
      var x1=cx+R*Math.cos(ang),y1=cy+R*Math.sin(ang),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
      var xr1=cx+r*Math.cos(a2),yr1=cy+r*Math.sin(a2),xr2=cx+r*Math.cos(ang),yr2=cy+r*Math.sin(ang);
      var large=frac>.5?1:0;
      var p=node('path',{d:'M'+x1+' '+y1+'A'+R+' '+R+' 0 '+large+' 1 '+x2+' '+y2+'L'+xr1+' '+yr1+'A'+r+' '+r+' 0 '+large+' 0 '+xr2+' '+yr2+'Z',fill:c.c,opacity:.9,style:'transition:opacity .2s'});
      p.addEventListener('mousemove',function(e){ p.setAttribute('opacity','1'); showTip('<b>'+c.name+'</b>'+grp(c.val)+' tx \u00b7 '+c.pct+'%',e.clientX,e.clientY); });
      p.addEventListener('mouseleave',function(){ p.setAttribute('opacity','.9'); hideTip(); });
      s.appendChild(p); ang=a2;
    });
    s.appendChild(node('text',{x:cx,y:cy-4,'text-anchor':'middle',fill:'#eaf0ff','font-size':22,'font-weight':700})).textContent=D.totals.pctRT+'%';
    s.appendChild(node('text',{x:cx,y:cy+14,'text-anchor':'middle',fill:'#8b96b3','font-size':10})).textContent='household';
    host.appendChild(s);
    var leg=el('<div class="kb-leg"></div>');
    segs.forEach(function(c){ leg.appendChild(el('<div><i style="background:'+c.c+'"></i><span>'+c.name+'</span><b>'+c.pct+'%</b></div>')); });
    host.appendChild(leg);
  })();

  var qSec = el('<div class="kb-card"><div class="kb-h"><div><b>Quarterly Distribution</b><span>Q3 leads on the Aug\u2013Sep surge; Q4 dips on a weak December.</span></div></div><div class="kb-chart" id="gas-q"></div></div>');
  row.appendChild(qSec);
  (function(){
    var host=qSec.querySelector('#gas-q');
    var W=340,H=210,pad=30,bw=W-pad*2, max=Math.max.apply(null,D.quarters.map(function(d){return d.total;}));
    var s=svg(W,H); var n=D.quarters.length,gap=24,bar=(bw-gap*(n-1))/n;
    var defs=node('defs',{}); defs.innerHTML='<linearGradient id="gasQ" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7c8cff"/><stop offset="1" stop-color="#5ad1ff"/></linearGradient>'; s.appendChild(defs);
    D.quarters.forEach(function(d,i){
      var bh=(H-pad*2)*(d.total/max),bx=pad+i*(bar+gap),by=H-pad-bh;
      var r=node('rect',{x:bx,y:by,width:bar,height:bh,rx:5,fill:'url(#gasQ)',opacity:.88,style:'transition:opacity .2s'});
      r.addEventListener('mousemove',function(e){ r.setAttribute('opacity','1'); showTip('<b>'+d.name+' 2024</b>'+grp(d.total)+' transactions',e.clientX,e.clientY); });
      r.addEventListener('mouseleave',function(){ r.setAttribute('opacity','.88'); hideTip(); });
      s.appendChild(r);
      s.appendChild(node('text',{x:bx+bar/2,y:H-pad+15,'text-anchor':'middle',fill:'#8b96b3','font-size':11,'font-family':'JetBrains Mono, monospace'})).textContent=d.name;
      var v=node('text',{x:bx+bar/2,y:by-6,'text-anchor':'middle',fill:'#eaf0ff','font-size':10.5,'font-weight':600}); v.textContent=grp(d.total); s.appendChild(v);
    });
    host.appendChild(s);
  })();

  var q1fc=FC.fc.reduce(function(a,f){return a+f.pt;},0);
  root.appendChild(el('<div class="kb-ins"><div class="ins"><h4><i></i>Household-Driven Base</h4><p><strong>Rumah Tangga</strong> accounts for <strong>'+D.totals.pctRT+'% of volume</strong> ('+grp(D.totals.rt)+' of '+grp(D.totals.tx)+' transactions), confirming the retail base as the primary contributor.</p><p>UMKM demand is smaller but spikes sharply mid-year \u2014 worth a dedicated allocation.</p></div><div class="ins"><h4><i></i>Seasonal Pattern</h4><p>Transactions peak in <strong>'+D.peak.m+' ('+grp(D.peak.total)+')</strong> and collapse in <strong>'+D.low.m+' ('+grp(D.low.total)+')</strong>, a clear seasonal signal for stock planning.</p><p>The Aug\u2013Sep UMKM surge suggests a policy or demand shift toward business buyers.</p></div><div class="ins"><h4><i></i>Forward Look \u2014 Q1 2025</h4><p>A trend-plus-seasonal model projects <strong>'+grp(q1fc)+' transactions</strong> across Jan\u2013Mar 2025 ('+grp(FC.fc[0].pt)+' \u00b7 '+grp(FC.fc[1].pt)+' \u00b7 '+grp(FC.fc[2].pt)+'), rising into March at roughly <strong>+'+grp(FC.slope)+' tx/month</strong> of underlying growth.</p><p>Planned band \u00b1'+FC.bandPct+'% \u2014 December is excluded as an incomplete-month anomaly.</p></div></div>'));

  root.appendChild(el('<div class="roadmap"><h4>Strategic Roadmap</h4>'
    +'<div class="step"><span class="n">01</span><div><b>Stock to the season</b><span>Build up inventory ahead of the '+D.peak.m+' peak and trim it in the '+D.low.m+' trough to cut both stockouts and idle capital tied up in cylinders.</span></div></div>'
    +'<div class="step"><span class="n">02</span><div><b>Capture the UMKM upswing</b><span>Give business buyers a dedicated mid-year allocation and a simple pre-order channel, converting the Aug\u2013Sep surge into planned, reliable volume.</span></div></div>'
    +'<div class="step"><span class="n">03</span><div><b>Protect the household base</b><span>Keep the Rumah Tangga quota consistent \u2014 it is '+D.totals.pctRT+'% of volume \u2014 and use steady supply to reinforce loyalty among regular retail buyers.</span></div></div>'
    +'</div>'));
})();
