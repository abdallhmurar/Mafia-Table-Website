(() => {
const year=document.getElementById('year');
if(year)year.textContent=String(new Date().getFullYear());

const agents=Array.from(document.querySelectorAll('.suspect'));
agents.forEach(agent=>{
  agent.addEventListener('click',()=>{
    agents.forEach(other=>other.classList.toggle('is-selected',other===agent));
  });
});

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduceMotion||typeof window.gsap==='undefined')return;
const gsap=window.gsap;
gsap.set('.hero-content > *',{opacity:0,y:24});
const intro=gsap.timeline({defaults:{ease:'power3.out'}});
intro.from('.room-banner',{opacity:0,y:-40,duration:1})
.from('.observation',{opacity:0,scale:.92,duration:.9},'-=.7')
.from('.suspect',{opacity:0,y:75,stagger:.13,duration:1.15},'-=.9')
.from('.interrogation-table',{opacity:0,y:80,duration:1},'-=1')
.to('.hero-content > *',{opacity:1,y:0,stagger:.12,duration:.75},'-=.6')
.from('.hero-rail',{opacity:0,x:20,duration:.5},'-=.4');
gsap.to('.suspect-head',{y:-8,duration:2.8,ease:'sine.inOut',stagger:.26,yoyo:true,repeat:-1});
gsap.to('.floor-light',{opacity:.65,duration:3.4,yoyo:true,repeat:-1,ease:'sine.inOut'});

if(window.ScrollTrigger){
 gsap.registerPlugin(window.ScrollTrigger);
 gsap.from('.about-text > *',{
   scrollTrigger:{trigger:'.about-section',start:'top 76%',once:true},
   opacity:0,y:34,stagger:.11,duration:.75
 });
}
const scene=document.querySelector('.hero');
if(scene&&window.matchMedia('(pointer:fine)').matches){
 let raf;
 scene.addEventListener('pointermove',e=>{
  if(raf)cancelAnimationFrame(raf);
  raf=requestAnimationFrame(()=>{
   const rect=scene.getBoundingClientRect();
   const x=(e.clientX-rect.left)/rect.width-.5;
   const y=(e.clientY-rect.top)/rect.height-.5;
   gsap.to('.room-banner',{x:x*10,y:y*5,duration:1.25,overwrite:true});
   gsap.to('.floor-light',{x:x*18,duration:1.35,overwrite:true});
  });
 });
 scene.addEventListener('pointerleave',()=>{
  gsap.to('.room-banner',{x:0,y:0,duration:.85});
  gsap.to('.floor-light',{x:0,duration:.85});
 });
}
})();