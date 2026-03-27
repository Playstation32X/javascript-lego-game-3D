
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js'
//import * as THREE from 'three';    
//import { GLTFLoader } from 'three/examples/jsm/Addons.js'; 
//import * as CANNON from 'cannon'; 

const camera3D=new THREE.PerspectiveCamera(70,16/9,0.1,1000);
camera3D.position.z=37;
const scenery=new THREE.Scene(); 
const ArtCanvas=document.getElementById("paper"); 
const canvasHeight=document.getElementById("cHeight");
const canvasWidth=document.getElementById("cWidth"); 
const light1=new THREE.AmbientLight('white',0.3); 
const dirLight=new THREE.DirectionalLight('white',3);  
dirLight.position.set(0,7,0);
scenery.add(light1);  
scenery.add(dirLight);
canvasHeight.addEventListener('input',function ScreenResize()
{
const CW=parseFloat(canvasWidth.value); const CH=parseFloat(canvasHeight.value);
ArtCanvas.height=CH;
ArtCanvas.width=CW;
  RenderMan.setSize(CW,CH);
})
canvasWidth.addEventListener('input',function ScreenResize()
{
const CW=parseFloat(canvasWidth.value); const CH=parseFloat(canvasHeight.value);
ArtCanvas.height=CH;
ArtCanvas.width=CW;
  RenderMan.setSize(CW,CH);
})
const RenderMan= new THREE.WebGLRenderer({canvas:ArtCanvas }); 
RenderMan.clearColor='black'; 
const texLoader=new THREE.TextureLoader();
//textures  
const tex1=texLoader.load("TheLord.png");
const tex2=texLoader.load("triart1.png") 
const tex3=texLoader.load("coloredrects.png"); 
const tex4=texLoader.load("triart2.png"); 
const tex5=texLoader.load("bronzeTrip.png"); 
const tex6=texLoader.load("digital.png");
const tex7=texLoader.load("funebre73.png");
const tex8=texLoader.load("gears.jpg"); 
const tex9=texLoader.load("tprb.jpg"); 
const tex10=texLoader.load("smiley37.png");
let walltex=tex1;
// other stuff 
const brick=new THREE.Mesh(new THREE.BoxGeometry(3,1,3,4,4,4),new THREE.MeshStandardMaterial({map:tex2})); 
const boy=new THREE.Mesh(new THREE.SphereGeometry(0.5,37,37),new THREE.MeshStandardMaterial({map:tex10,color:'white'}));
const floorTile=new THREE.Mesh(new THREE.PlaneGeometry(7,7,4,1),new THREE.MeshStandardMaterial({map:tex1}));
let px=0,py=0,pz=0; 
let cameraAngle=0;
let PlayerSpeed=0.3;
floorTile.position.y=-1;
floorTile.rotateX(-Math.PI/2); 
brick.position.y=1;
boy.scale.y=0.5; 
let SmileAngleChange=false;
function thingyAdder()
{
    scenery.add(brick);
    scenery.add(boy);
    scenery.add(floorTile); 
}
function cameraControls()
{
    camera3D.position.x=(px+Math.sin(cameraAngle)*3);
     camera3D.position.z=(pz+Math.cos(cameraAngle)*3);
     camera3D.position.y=py+1;
    camera3D.lookAt(px,py,pz);
}
thingyAdder();
document.addEventListener('keydown',function(e){ 
    if(e.key==='w')  
    { 
     px+=Math.cos(boy.rotation.y)*PlayerSpeed;
    pz-=Math.sin(boy.rotation.y)*PlayerSpeed;
    }
     if(e.key==='s')  
       {
         px-=Math.cos(boy.rotation.y)*PlayerSpeed;
    pz+=Math.sin(boy.rotation.y)*PlayerSpeed;
       }
     if(e.key==='a')  
     {
         px-=Math.cos(boy.rotation.y-(Math.PI/2))*PlayerSpeed;
    pz+=Math.sin(boy.rotation.y-(Math.PI/2))*PlayerSpeed;
     }
     if(e.key==='d')  
      {
         px+=Math.cos(boy.rotation.y-(Math.PI/2))*PlayerSpeed;
    pz-=Math.sin(boy.rotation.y-(Math.PI/2))*PlayerSpeed;
      }
    if(e.key=='q') 
      cameraAngle+=0.073;
    if(e.key=='e') 
        cameraAngle-=0.073; 
      if(e.key==' ')
      {
         const block=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.7,0.7),new THREE.MeshStandardMaterial({map:walltex}));
    block.position.set(OhSnap(px),OhSnap(py),OhSnap(pz));
    block.name="block";
    scenery.add(block);
      }
      switch(e.key)
      {
       case('1'): 
       walltex=tex1;
       break; 
        case('2'): 
       walltex=tex2;
       break;
        case('3'): 
       walltex=tex3;
       break;
        case('4'): 
       walltex=tex4;
       break;
        case('5'): 
       walltex=tex5;
       break;
        case('6'): 
       walltex=tex6;
       break; 
        case('7'): 
       walltex=tex7;
       break;
       case('8'): 
       walltex=tex8;
       break;
       case('9'): 
       walltex=tex9;
       break;
      }
 }) 
const brickButton=document.getElementById("clickable1"); 
const upButton=document.getElementById("clickable2");
const downButton=document.getElementById("clickable3");
const deleteButton=document.getElementById("clickable4");
const clearButton=document.getElementById("clickable5"); 

clearButton.addEventListener('click',function(){ 
 for(let o=0;o<scenery.children.length*100;o++) 
 {
   const deletedBlock=scenery.children[scenery.children.length-1];
 if(deletedBlock.name==="block")
 scenery.remove(deletedBlock);
 }
})

deleteButton.addEventListener('click',function(){
 const deletedBlock=scenery.children[scenery.children.length-1];
 if(deletedBlock.name==="block")
 scenery.remove(deletedBlock);
})
brickButton.addEventListener('click',function(){
  const block=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.7,0.7),new THREE.MeshStandardMaterial({map:walltex}));
    block.position.set(OhSnap(px),OhSnap(py),OhSnap(pz));
    block.name="block";
    scenery.add(block);
    
})
upButton.addEventListener('click',function(){ 
  py+=PlayerSpeed;
})
downButton.addEventListener('click',function(){ 
  py-=PlayerSpeed;
}) 
function OhSnap(v)
{
 let griddySize=0.7; 
 return(Math.round(v/griddySize)*griddySize);
}
function colorChanger(changedColor)
{
  let V=Math.floor(Math.random()*7);
  switch(V)
  {
    case(0): 
     changedColor=new THREE.Color('red');
    break;
     case(1): 
     changedColor=new THREE.Color('blue');
    break;
     case(2): 
     changedColor=new THREE.Color('green');
    break;
     case(3): 
     changedColor=new THREE.Color('yellow');
    break;
     case(4): 
    changedColor=new THREE.Color('purple');
    break;
     case(5): 
     changedColor=new THREE.Color('cyan');
    break;
     case(6): 
     changedColor=new THREE.Color('orange');
    break;
    case(7): 
    changedColor=new THREE.Color('white');
    break;
  }
}
document.addEventListener('mousedown',function(e){
  if(e.button==0)
    SmileAngleChange=true;
  if(e.button==1)
    SmileAngleChange=false;
})
 document.addEventListener('mousemove',function(e){
  if(SmileAngleChange===true)
  boy.rotation.y=e.clientX/30;
 })
function timeGuy()
{     
 cameraControls(); 
 boy.position.z=pz;
 boy.position.y=py;
 boy.position.x=px;
 colorChanger(); 
 brick.rotation.y+=0.0073;
 RenderMan.render(scenery,camera3D); 
  requestAnimationFrame(timeGuy);  
}
timeGuy();