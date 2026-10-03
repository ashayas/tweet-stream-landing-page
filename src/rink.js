import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createArena } from './scene-model.js';
import { tools } from './content.js';
import { clampAim, resolveShot } from './game.js';
export async function exportArena(){const {GLTFExporter}=await import('three/addons/exporters/GLTFExporter.js');return new GLTFExporter().parseAsync(createArena(),{binary:true});}
export function initRink(selectTool){
  const container=document.querySelector('#arena');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.3;container.prepend(renderer.domElement);
  renderer.domElement.setAttribute('aria-label','3D hockey arena. Drag to orbit. Use the numbered buttons to explore tools or Take a shot to play.');
  const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,1,.1,100);camera.position.set(12,13.8,17.5);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,.1,0);controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=true;controls.dampingFactor=.08;controls.minPolarAngle=.45;controls.maxPolarAngle=1.13;controls.autoRotate=false;controls.autoRotateSpeed=.25;
  scene.add(new THREE.HemisphereLight(0xe1f6ff,0x183759,2.8));
  const key=new THREE.DirectionalLight(0xe1f5ff,4);key.position.set(-3,12,6);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-12,right:12,top:12,bottom:-12,near:.5,far:35});key.shadow.bias=-.001;scene.add(key);
  const rim=new THREE.DirectionalLight(0x47baff,3);rim.position.set(4,6,-8);scene.add(rim);
  const arena=createArena();scene.add(arena);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.25}));floor.rotation.x=-Math.PI/2;floor.position.y=-.67;floor.receiveShadow=true;scene.add(floor);
  const puck=new THREE.Mesh(new THREE.CylinderGeometry(.16,.16,.1,32),new THREE.MeshStandardMaterial({color:0x102331,roughness:.33}));puck.position.set(-2.8,.17,0);puck.castShadow=true;scene.add(puck);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.24,.27,40),new THREE.MeshBasicMaterial({color:0xd5f85c,side:THREE.DoubleSide,transparent:true,opacity:.9}));ring.rotation.x=-Math.PI/2;ring.position.set(-2.8,.098,0);scene.add(ring);
  const goalie=new THREE.Group();const goalieMat=new THREE.MeshStandardMaterial({color:0x49baff,roughness:.35});
  function part(g,m,x,y,z){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=true;goalie.add(o);return o;}
  part(new THREE.CapsuleGeometry(.19,.22,4,8),goalieMat,0,.49,0);part(new THREE.SphereGeometry(.16,12,8),new THREE.MeshStandardMaterial({color:0xeaf7ff}),0,.85,0);
  const pads=new THREE.MeshStandardMaterial({color:0xd5f85c});part(new THREE.BoxGeometry(.17,.32,.18),pads,0,.24,-.17);part(new THREE.BoxGeometry(.17,.32,.18),pads,0,.24,.17);part(new THREE.BoxGeometry(.05,.05,.68),new THREE.MeshStandardMaterial({color:0x15344f}),-.25,.15,0);goalie.position.set(4.75,0,0);scene.add(goalie);
  const aimLine=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-2.8,.12,0),new THREE.Vector3(5.1,.12,.55)]),new THREE.LineDashedMaterial({color:0xd5f85c,dashSize:.2,gapSize:.12,transparent:true,opacity:.85}));aimLine.computeLineDistances();scene.add(aimLine);aimLine.visible=false;
  const hotspotRoot=document.querySelector('#hotspots');
  const hotspots=tools.map((tool,i)=>{const button=document.createElement('button');button.className='hotspot'+(i===0?' selected':'');button.dataset.index=i;button.dataset.label=tool.name;button.textContent=`0${i+1}`;button.setAttribute('aria-label',`Explore ${tool.name}`);button.addEventListener('click',()=>selectTool(i,true));hotspotRoot.append(button);return{button,position:new THREE.Vector3(tool.point[0],.2,tool.point[1])};});
  const q=id=>document.getElementById(id);let play=false,paused=reduced.matches,sound=false,aim=.55,shot=null,goals=0,attempts=0,time=0,last=performance.now(),visible=true,frame=0,goalFlash=0,audio;
  const updateMotion=()=>{q('motion').textContent=paused?'▶':'Ⅱ';q('motion').setAttribute('aria-pressed',String(paused));q('motion').setAttribute('aria-label',paused?'Resume arena animation':'Pause arena animation');q('motion').title=paused?'Resume arena animation':'Pause arena animation';};updateMotion();
  function setMode(value){play=value;controls.autoRotate=!play&&!paused;hotspotRoot.hidden=play;q('game-controls').hidden=!play;q('play-mode').classList.toggle('active',play);q('explore-mode').classList.toggle('active',!play);q('play-mode').setAttribute('aria-pressed',String(play));q('explore-mode').setAttribute('aria-pressed',String(!play));q('arena-hint').textContent=play?'Line it up. Beat the goalie.':'Pick a position. Meet your toolkit.';aimLine.visible=play&&!shot;ring.visible=!shot;q('game-message').textContent=play?'Move the aim slider. Shoot with the button or Space.':'';}
  q('explore-mode').onclick=()=>setMode(false);q('play-mode').onclick=()=>{setMode(true);q('aim').focus({preventScroll:true});};q('start-play').onclick=()=>{setMode(true);q('arena').scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'center'});q('aim').focus({preventScroll:true});};
  function updateAim(){const position=aimLine.geometry.attributes.position;position.setXYZ(1,5.1,.12,aim);position.needsUpdate=true;aimLine.computeLineDistances();}
  q('aim').addEventListener('input',event=>{aim=clampAim(event.target.value);updateAim();});
  function tone(goal){if(!sound)return;try{audio??=new (window.AudioContext||window.webkitAudioContext)();audio.resume();const osc=audio.createOscillator(),gain=audio.createGain();osc.connect(gain);gain.connect(audio.destination);osc.type='sine';osc.frequency.setValueAtTime(goal?550:180,audio.currentTime);osc.frequency.exponentialRampToValueAtTime(goal?880:80,audio.currentTime+.2);gain.gain.setValueAtTime(.045,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.3);osc.start();osc.stop(audio.currentTime+.3);}catch{sound=false;q('sound').setAttribute('aria-pressed','false');q('sound').innerHTML='♪<span>off</span>';}}
  function shoot(){if(!play||shot)return;attempts++;q('score-shots').textContent=String(attempts).padStart(2,'0');const targetGoalie=goalie.position.z;shot={elapsed:0,aim,result:resolveShot(aim,targetGoalie),scored:false};q('shoot').disabled=true;aimLine.visible=false;ring.visible=false;q('game-message').textContent='Puck in play…';tone(false);}
  q('shoot').onclick=shoot;document.addEventListener('keydown',event=>{if(event.code==='Space'&&play&&!event.repeat&&!['BUTTON','A','INPUT','TEXTAREA','SUMMARY'].includes(event.target.tagName)){event.preventDefault();shoot();}});
  // Space also shoots while the aim slider has focus; arrows still adjust the aim.
  q('aim').addEventListener('keydown',event=>{if(event.code==='Space'){event.preventDefault();shoot();}});
  q('motion').onclick=()=>{paused=!paused;updateMotion();};q('sound').onclick=()=>{sound=!sound;q('sound').setAttribute('aria-pressed',String(sound));q('sound').setAttribute('aria-label',sound?'Disable game sound':'Enable game sound');q('sound').innerHTML=`♪<span>${sound?'on':'off'}</span>`;if(sound)tone(true);};
  q('rotate').onclick=()=>{const x=camera.position.x;camera.position.x=camera.position.z;camera.position.z=-x;controls.update();};
  reduced.addEventListener('change',event=>{paused=event.matches;updateMotion();});
  const particles=new THREE.Group();scene.add(particles);const particleMat=new THREE.MeshBasicMaterial({color:0xd5f85c});for(let i=0;i<22;i++){const p=new THREE.Mesh(new THREE.BoxGeometry(.045,.045,.045),particleMat);p.visible=false;particles.add(p);}
  function resize(){const{width,height}=container.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.fov=width<550?39:34;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe(container);resize();
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{rootMargin:'80px'});observer.observe(container);
  renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();q('game-message').textContent='3D paused. Reload this page to restore the rink; the playbook remains available.';q('shoot').disabled=true;});
  document.addEventListener('visibilitychange',()=>{last=performance.now();});
  renderer.setAnimationLoop(now=>{
    const dt=Math.min((now-last)/1000,.04);last=now;if(document.hidden||!visible)return;
    // Cap the small ambient scene to ~30fps; gameplay keeps its own elapsed time.
    if(!paused)time+=dt;
    if(!shot&&!paused){goalie.position.z=Math.sin(time*1.65)*.62;ring.material.opacity=.65+Math.sin(time*2)*.2;}
    if(shot){shot.elapsed+=dt;const t=Math.min(shot.elapsed/.65,1);puck.position.set(-2.8+7.9*t,.17,shot.aim*t);puck.rotation.y+=dt*12;
      if(t===1&&!shot.scored){shot.scored=true;if(shot.result==='goal'){goals++;q('score-you').textContent=String(goals).padStart(2,'0');q('game-message').textContent='TOP SHELF. That’s a goal! Line up your next play.';goalFlash=1;tone(true);}else{q('game-message').textContent=shot.result==='saved'?'GLOVE SAVE. Aim either side of the goalie and try again.':'JUST WIDE. Aim between the red posts and try again.';tone(false);}}
      if(shot.elapsed>1.25){shot=null;puck.position.set(-2.8,.17,0);q('shoot').disabled=false;aimLine.visible=play;ring.visible=true;}
    }
    if(goalFlash>0){goalFlash=Math.max(0,goalFlash-dt*1.6);particles.children.forEach((p,i)=>{p.visible=!reduced.matches;p.position.set(5.1-Math.cos(i*2.4)*(1-goalFlash)*2,.2+Math.sin(goalFlash*Math.PI)*(1+i%3)*.5,Math.sin(i*2.4)*(1-goalFlash)*2);});}else particles.children.forEach(p=>p.visible=false);
    controls.autoRotate=!play&&!paused;
    controls.update();
    if(++frame%2===0&&!shot&&!controls.autoRotate)return;
    const width=container.clientWidth,height=container.clientHeight;hotspots.forEach(({button,position})=>{const p=position.clone().project(camera);button.style.left=`${(p.x*.5+.5)*width}px`;button.style.top=`${(-p.y*.5+.5)*height}px`;button.style.visibility=p.z>1?'hidden':'visible';});
    renderer.render(scene,camera);
  });
  q('scene-loading').remove();container.dataset.ready='true';
  return {renderer,scene,arena};
}
