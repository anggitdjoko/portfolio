/* =====================================================================
   jar.js — LIVE interactive dashboard for PT JAR Andalan Rasa (Company 03)
   Native, hoverable SVG charts built from the outlet's vetted figures.
   Renders into #jar-dash — same engine as kobelco.js / gas.js.
   ===================================================================== */
(function(){
  var TX = 7437;
  var payment = [
    {name:'Cash',        pct:48.2, c:'#5ad1ff'},
    {name:'BCA QR (QRIS)',pct:45.6, c:'#7c8cff'},
    {name:'GoFood / GrabFood / other', pct:6.2, c:'#3a4780'}
  ];
  var products = [
    {name:'Kare Ramen',        sales:23.2, c:'#5ad1ff'},
    {name:'SUMO Spicy Ramen',  sales:12.0, c:'#6bb8ff'},
    {name:'Rice Bowl',         sales:6.5,  c:'#7c8cff'}
  ];

  var el = function(html){ var t=document.createElement('template'); t.innerHTML=html.trim(); return t.content.firstChild; };
  var NS='http://www.w3.org/2000/svg';
  function svg(w,h){ var s=document.createElementNS(NS,'svg'); s.setAttribute('viewBox','0 0 '+w+' '+h); s.setAttribute('width','100%'); s.setAttribute('preserveAspectRatio','xMidYMid meet'); return s; }
  function node(name,attrs){ var n=document.createElementNS(NS,name); for(var k in attrs) n.setAttribute(k,attrs[k]); return n; }
  var grp = function(n){ return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','); };

  var root = document.getElementById('jar-dash');
  if(!root) return;
  var tip = el('<div class="kb-tip"></div>'); root.appendChild(tip);
  function showTip(html,x,y){ tip.innerHTML=html; tip.style.opacity='1'; var r=root.getBoundingClientRect(); tip.style.left=(x-r.left)+'px'; tip.style.top=(y-r.top)+'px'; }
  function hideTip(){ tip.style.opacity='0'; }

  var row = el('<div class="kb-row"></div>'); root.appendChild(row);

  /* payment donut */
  var cSec = el('<div class="kb-card"><div class="kb-h"><div><b>Payment Composition</b><span>Cash and QRIS together cover 93.8% of volume.</span></div></div><div class="kb-chart" id="jar-pay"></div></div>');
  row.appendChild(cSec);
  (function(){
    var host=cSec.querySelector('#jar-pay'); var W=260,H=210,cx=95,cy=105,R=72,r=44;
    var s=svg(W,H); var ang=-Math.PI/2;
    payment.forEach(function(c){
      var frac=c.pct/100, a2=ang+frac*Math.PI*2;
      var x1=cx+R*Math.cos(ang),y1=cy+R*Math.sin(ang),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
      var xr1=cx+r*Math.cos(a2),yr1=cy+r*Math.sin(a2),xr2=cx+r*Math.cos(ang),yr2=cy+r*Math.sin(ang);
      var large=frac>.5?1:0;
      var p=node('path',{d:'M'+x1+' '+y1+'A'+R+' '+R+' 0 '+large+' 1 '+x2+' '+y2+'L'+xr1+' '+yr1+'A'+r+' '+r+' 0 '+large+' 0 '+xr2+' '+yr2+'Z',fill:c.c,opacity:.9,style:'transition:opacity .2s'});
      p.addEventListener('mousemove',function(e){ p.setAttribute('opacity','1'); showTip('<b>'+c.name+'</b>'+c.pct+'% \u00b7 ~'+grp(Math.round(TX*c.pct/100))+' tx',e.clientX,e.clientY); });
      p.addEventListener('mouseleave',function(){ p.setAttribute('opacity','.9'); hideTip(); });
      s.appendChild(p); ang=a2;
    });
    s.appendChild(node('text',{x:cx,y:cy-4,'text-anchor':'middle',fill:'#eaf0ff','font-size':20,'font-weight':700})).textContent='93.8%';
    s.appendChild(node('text',{x:cx,y:cy+14,'text-anchor':'middle',fill:'#8b96b3','font-size':10})).textContent='on-site';
    host.appendChild(s);
    var leg=el('<div class="kb-leg"></div>');
    payment.forEach(function(c){ leg.appendChild(el('<div><i style="background:'+c.c+'"></i><span>'+c.name+'</span><b>'+c.pct+'%</b></div>')); });
    host.appendChild(leg);
  })();

  /* top menu items */
  var pSec = el('<div class="kb-card"><div class="kb-h"><div><b>Top Menu Items by Sales</b><span>Kare Ramen is the hero product, well ahead of the field.</span></div></div><div class="kb-chart" id="jar-prod"></div></div>');
  row.appendChild(pSec);
  (function(){
    var host=pSec.querySelector('#jar-prod'); var max=products[0].sales;
    products.forEach(function(p){
      var pct=(p.sales/max*100);
      var b=el('<div class="kb-bar"><div class="kb-bl"><span class="kb-bn">'+p.name+'</span><span class="kb-bv">Rp '+p.sales.toFixed(1)+'M</span></div><div class="kb-btrack"><i style="width:'+pct.toFixed(1)+'%;background:linear-gradient(90deg,#7c8cff,'+p.c+')"></i></div></div>');
      b.addEventListener('mousemove',function(e){ showTip('<b>'+p.name+'</b>Rp '+p.sales.toFixed(1)+'M net sales',e.clientX,e.clientY); });
      b.addEventListener('mouseleave',hideTip);
      host.appendChild(b);
    });
    host.appendChild(el('<p style="font-size:.78rem;color:#8b96b3;margin-top:12px">Signature items shown; the wide gap to second place points to reliance on one hero menu.</p>'));
  })();
})();
