(function(){
'use strict';
document.documentElement.classList.add('js');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(s,c){return(c||document).querySelector(s)},$$=function(s,c){return[].slice.call((c||document).querySelectorAll(s))};
// loader
window.addEventListener('load',function(){setTimeout(function(){$('#loader').classList.add('done')},reduce?0:1500)});
setTimeout(function(){$('#loader').classList.add('done')},3000);
// nav
var nav=$('#nav'),burger=$('#burger'),menu=$('#menu');
function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'Close menu':'Open menu')}
burger.addEventListener('click',function(){setMenu(!menu.classList.contains('open'))});
$$('a',menu).forEach(function(a){a.addEventListener('click',function(){setMenu(false)})});
document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
addEventListener('scroll',function(){nav.classList.toggle('solid',scrollY>20)},{passive:true});
// active link
var links=$$('#menu a[href^="#"]:not(.btn)');
if('IntersectionObserver' in window){
  var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
  $$('main section[id]').forEach(function(s){so.observe(s)});
  var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}})},{threshold:.15});
  $$('.reveal').forEach(function(el,i){el.style.transitionDelay=(i%3)*90+'ms';ro.observe(el)});
}else $$('.reveal').forEach(function(el){el.classList.add('in')});
// services accordion
$$('.svc button').forEach(function(b){b.addEventListener('click',function(){b.setAttribute('aria-expanded',b.getAttribute('aria-expanded')!=='true')})});
// hero logo tilt
var art=$('#art'),logo=$('.big-logo');
if(!reduce&&art){addEventListener('pointermove',function(e){var r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;logo.style.transform='rotateY('+x*28+'deg) rotateX('+-y*28+'deg)'},{passive:true})}
// particles
var c=$('#bg'),ctx=c.getContext('2d'),W,H,P=[],m={x:-999,y:-999};
function size(){var d=Math.min(devicePixelRatio||1,2);W=c.width=innerWidth*d;H=c.height=innerHeight*d;c.style.width=innerWidth+'px';c.style.height=innerHeight+'px';ctx.setTransform(d,0,0,d,0,0);
  var n=Math.min(70,Math.floor(innerWidth*innerHeight/18000));P=[];for(var i=0;i<n;i++)P.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,v:Math.random()>.5})}
addEventListener('resize',size);size();
addEventListener('pointermove',function(e){m.x=e.clientX;m.y=e.clientY},{passive:true});
function draw(){
  ctx.clearRect(0,0,innerWidth,innerHeight);
  P.forEach(function(p,i){
    var dx=p.x-m.x,dy=p.y-m.y,d=Math.hypot(dx,dy);
    if(d<140){p.x+=dx/d*.6;p.y+=dy/d*.6}
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;
    ctx.fillStyle=p.v?'rgba(130,87,255,.8)':'rgba(56,189,248,.8)';ctx.beginPath();ctx.arc(p.x,p.y,1.4,0,6.3);ctx.fill();
    for(var j=i+1;j<P.length;j++){var q=P[j],l=Math.hypot(p.x-q.x,p.y-q.y);if(l<120){ctx.strokeStyle='rgba(146,153,177,'+(.16*(1-l/120))+')';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}
  });
  if(!reduce&&!document.hidden)requestAnimationFrame(draw);
}
if(reduce)draw();else requestAnimationFrame(draw);
document.addEventListener('visibilitychange',function(){if(!document.hidden&&!reduce)requestAnimationFrame(draw)});
})();
