(() => {
const masks = {
emerald:{name:'القناع الأخضر',desc:'قناع أخضر داكن مستوحى من أحد أقنعة غرفة التحقيق.'},
ivory:{name:'القناع العاجي',desc:'قناع عاجي فاتح بتفاصيل داكنة وحضور غامض.'},
midnight:{name:'القناع الأزرق',desc:'قناع أزرق ليلي عميق، بأثر معدني وإضاءة باردة.'},
bronze:{name:'القناع الذهبي',desc:'قناع برونزي ذهبي مستوحى من شارة مركز التحقيق.'}
};
const cards = Array.from(document.querySelectorAll('.case-card'));
const agents = Array.from(document.querySelectorAll('.suspect'));
const name = document.getElementById('selected-mask-name');
const desc = document.getElementById('selected-mask-desc');
const panel = document.getElementById('selected-file');
const safeMotion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = typeof window.gsap !== 'undefined';
function choose(id,scroll=false){
  const mask=masks[id]; if(!mask)return;
  cards.forEach(card=>{const selected=card.dataset.mask===id;card.setAttribute('aria-pressed',String(selected));card.classList.toggle('is-selected',selected);});
  agents.forEach(agent=>agent.classList.toggle('is-selected',agent.dataset.mask===id));
  if(name)name.textContent=mask.name;
  if(desc)desc.textContent=mask.desc;
  if(panel){panel.dataset.mask=id;if(hasGsap&&safeMotion)window.gsap.fromTo(panel,{opacity:.7,y:10},{opacity:1,y:0,duration:.4,ease:'power2.out'});}
  if(scroll)document.getElementById('masks')?.scrollIntoView({behavior:safeMotion?'smooth':'auto',block:'start'});
}
[...cards,...agents].forEach(node=>node.addEventListener('click',()=>choose(node.dataset.mask,node.classList.contains('suspect'))));
choose('emerald');
const year=document.getElementById('year');if(year)year.textContent=String(new Date().getFullYear());
if(!hasGsap||!safeMotion)return;
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
 gsap.from('.section-top > *',{scrollTrigger:{trigger:'.masks-section',start:'top 82%',once:true},opacity:0,y:40,stagger:.16,duration:.8,ease:'power2.out'});
 gsap.from('.case-card',{scrollTrigger:{trigger:'.case-grid',start:'top 84%',once:true},opacity:0,y:65,stagger:.12,duration:.85,ease:'power3.out'});
 gsap.from('.about-text > *',{scrollTrigger:{trigger:'.about-section',start:'top 76%',once:true},opacity:0,y:34,stagger:.11,duration:.75});
}
cards.forEach(card=>{
 const portrait=card.querySelector('.case-portrait');
 card.addEventListener('mouseenter',()=>{gsap.to(portrait,{y:-12,scale:1.065,rotation:-3,duration:.35,ease:'back.out(2)',overwrite:true});});
 card.addEventListener('mouseleave',()=>{gsap.to(portrait,{y:0,scale:1,rotation:0,duration:.5,ease:'power2.out',overwrite:true});});
});
const scene=document.querySelector('.hero');
if(scene && window.matchMedia('(pointer:fine)').matches){
 let raf;
 scene.addEventListener('pointermove',e=>{if(raf)cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
 const rect=scene.getBoundingClientRect(),x=(e.clientX-rect.left)/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;
 gsap.to('.room-banner',{x:x*10,y:y*5,duration:1.25,overwrite:true});
 gsap.to('.floor-light',{x:x*18,duration:1.35,overwrite:true});
 });});
 scene.addEventListener('pointerleave',()=>{gsap.to('.room-banner',{x:0,y:0,duration:.85});gsap.to('.floor-light',{x:0,duration:.85});});
}
})();