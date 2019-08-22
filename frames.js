//history
;(function(root){

 let frametext=`
<div class="frame" data-mode="WIP" data-close="false" data-id="###">
  <div class="w bar">
    <div class="cap single" contenteditable="true">captionThis</div>
    <div class="stt" onclick="stt(event)" data-text="20190822T18:30:28 WIP"></div>
    <div class="clo" onclick="clo(event)" data-text="	-"></div>
  </div>
  <div class="w editor">
    <div class="num wipe">000</div>
    <div class="ed" contenteditable="plaintext-only" onkeyup="ed(event)">its new</div>
  </div>
</div>
`
 
 let numberDraw=(el,max,linestart)=>{
  let f=(i)=>{return fn.pad(i,3)}
  let f2=(d,i)=>i+linestart
  //console.log(el,max)
  el.textContent=Array.from({length:max}).map(f2).map(f).join('\n')
 }
 ,moderotate=(f)=>{
  let modes='WIP,COD,FIX'.split(',')
  let i=modes.map((d,i)=>{
   if(f.dataset.mode===d)return i; return void 0
  }).filter(d=>d).pop()||0
  i++;
  let mode=modes[i%modes.length]
  return mode
 }
 ,getframe=(_el)=>{
  let f='frame'
  let el=_el
  if(el.classList.contains(f))return el;
  el=el.parentElement
  if(el.classList.contains(f))return el;
  el=el.parentElement
  if(el.classList.contains(f))return el;
  ;
  console.log('nothing',el)
 }
 ,startline=0
 fn.gcs=(el)=>window.getComputedStyle(el)

 function ed(ev){
  let el=ev.target
  ,f=getframe(el)
  ,num=fn.q('.num',f)

  el.dataset.text=el.textContent
  num.textContent='';
  let maxLine=(el.clientHeight)/parseInt(fn.gcs(el).lineHeight)
  numberDraw(num,maxLine,startline)
 }
 function clo(ev){
  let f=getframe(ev.target)
  f.dataset.close=(f.dataset.close==='true')?'false':'true'
  //fn.q('.wrap.editor',f).classList.toggle('close')
  //fn.q('.wrap.bar').classList.toggle('close') 
 }
 function stt(ev){
  let f=getframe(ev.target) 
  let mode=moderotate(f)
  let jpTime3=()=>new Date( Date.now()+9*60*60*1000 ).toISOString()
  let time=jpTime3().slice(0,19).replace(/\-/g,'')
  //let time=fn.jpTime()
  //time=time.replace(/\//g,'').replace(/( .+$)/,'')
  ev.target.dataset.text =''+time +' '+ mode+''
  //ev.target.dataset.type=type
  f.dataset.mode=mode
 }
 function fac(id){
  let r='###'
  return fn.fr(frametext.replace(r,id))
 }
 root.ed=ed
 root.clo=clo
 root.stt=stt
 root.fac=fac
 root.frames=document.getElementsByClassName('frame')
})(this);
