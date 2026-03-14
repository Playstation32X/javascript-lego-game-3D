import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js'; 
//Uncomment the line below and comment out the line above for intellisense 
//import * as THREE from 'three';
const camera3D=new THREE.PerspectiveCamera(70,16/9,0.1,1000);
camera3D.position.z=37;
const scenery=new THREE.Scene(); 
const ArtCanvas=document.getElementById("paper");
const RenderMan= new THREE.WebGLRenderer({canvas:ArtCanvas}); 
RenderMan.clearColor='black'; 
const texLoader=new THREE.TextureLoader();
let BrickColor='white';
//textures
const tex1=texLoader.load("TheLord.png");
const tex2=texLoader.load("triart1.png") 
const tex3=texLoader.load("coloredrects.png");
// other stuff
const brick=new THREE.Mesh(new THREE.BoxGeometry(3,1,3,4,4,4),new THREE.MeshBasicMaterial({map:tex2})); 
const boy=new THREE.Mesh(new THREE.SphereGeometry(1,37,37),new THREE.MeshBasicMaterial({wireframe:true,color:'blue'}));
boy.scale.y=0.3;
const floorTile=new THREE.Mesh(new THREE.PlaneGeometry(7,7,4,1),new THREE.MeshBasicMaterial({map:tex1}));
let px=0,py=0,pz=0;
let cameraAngle=0;
let PlayerSpeed=0.3;
floorTile.position.y=-1;
floorTile.rotateX(-Math.PI/2);
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
     px+=Math.cos(cameraAngle-80.117)*PlayerSpeed;
    pz-=Math.sin(cameraAngle-80.117)*PlayerSpeed;
    }
     if(e.key==='s')  
       {
         px+=Math.cos(cameraAngle+80.117)*PlayerSpeed;
    pz-=Math.sin(cameraAngle+80.117)*PlayerSpeed;
       }
     if(e.key==='a')  
     {
         px-=Math.cos(cameraAngle)*PlayerSpeed;
    pz+=Math.sin(cameraAngle)*PlayerSpeed;
     }
     if(e.key==='d')  
      {
         px+=Math.cos(cameraAngle)*PlayerSpeed;
    pz-=Math.sin(cameraAngle)*PlayerSpeed;
      }
    if(e.key=='q') 
      cameraAngle+=0.073;
    if(e.key=='e') 
        cameraAngle-=0.073;
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
  const block=new THREE.Mesh(new THREE.BoxGeometry(0.7,0.7,0.7),new THREE.MeshBasicMaterial({color:BrickColor}));
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
function colorChanger()
{
  let V=Math.floor(Math.random()*7);
  switch(V)
  {
    case(0): 
     BrickColor=new THREE.Color('red');
    break;
     case(1): 
     BrickColor=new THREE.Color('blue');
    break;
     case(2): 
     BrickColor=new THREE.Color('green');
    break;
     case(3): 
     BrickColor=new THREE.Color('yellow');
    break;
     case(4): 
     BrickColor=new THREE.Color('purple');
    break;
     case(5): 
     BrickColor=new THREE.Color('cyan');
    break;
     case(6): 
     BrickColor=new THREE.Color('orange');
    break;
     case(7): 
    BrickColor=new THREE.Color('white');
    break;
  }
}
function timeGuy()
{      
 cameraControls(); 
 boy.position.z=pz;
 boy.position.y=py;
 boy.position.x=px;
 colorChanger();
 RenderMan.render(scenery,camera3D);
  requestAnimationFrame(timeGuy);  
}
timeGuy();