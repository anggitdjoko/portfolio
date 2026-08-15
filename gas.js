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

  root.appendChild(el('<div class="kb-ins"><div class="ins"><h4><i></i>Household-Driven Base</h4><p><strong>Rumah Tangga</strong> accounts for <strong>'+D.totals.pctRT+'% of volume</strong> ('+grp(D.totals.rt)+' of '+grp(D.totals.tx)+' transactions), confirming the retail base as the primary contributor.</p><p>UMKM demand is smaller but spikes sharply mid-year \u2014 worth a dedicated allocation.</p></div><div class="ins"><h4><i></i>Seasonal Pattern</h4><p>Transactions peak in <strong>'+D.peak.m+' ('+grp(D.peak.total)+')</strong> and collapse in <strong>'+D.low.m+' ('+grp(D.low.total)+')</strong>, a clear seasonal signal for stock planning.</p><p>The Aug\u2013Sep UMKM surge suggests a policy or demand shift toward business buyers.</p></div></div>'));
})();
