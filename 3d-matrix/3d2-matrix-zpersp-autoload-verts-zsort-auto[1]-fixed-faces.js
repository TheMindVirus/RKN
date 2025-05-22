<!DOCTYPE html>
<html>
<head>
<title>3d</title>
<script type="text/Javascript">

max=0;
val=0;
ind=0;
RX=[0,0,0,0];
RY=[0,0,0,0];
RZ=[0,0,0,0];
rmx=[0,0,0,0,0,0,0,0,0,0,0,0];
rmy=[0,0,0,0,0,0,0,0,0,0,0,0];
VX=[];
VY=[];
VZ=[];
faceindex=[];
facev1=[];
facev2=[];
facev3=[];
facev4=[];
facecol=[];
facez=[];
facezsorted=[];
facecx=[];
facecy=[];
facecz=[];
drawn=[];

order=[];

Theta=0;
MouseX=0;
MouseY=0;

camdist=500;
centerpx=300;
fov=500;

function onCreate()
{
List();

addPoint(-150,150,150);
addPoint(150,150,150);
addPoint(150,150,-150);
addPoint(-150,150,-150);

addPoint(-150,-150,150);
addPoint(150,-150,150);
addPoint(150,-150,-150);
addPoint(-150,-150,-150);

addFace(0,1,2,3,"#FF0000");
addFace(4,5,6,7,"#FFFF00");
addFace(0,4,5,1,"#00FF00");
addFace(1,5,6,2,"#00FFFF");
addFace(2,6,7,3,"#0000FF");
addFace(3,7,4,0,"#FF00FF");

Draw();
RMatrixCalculate();
}

function addPoint(x1,y1,z1)
{
VX.push(x1);
VY.push(y1);
VZ.push(z1);
}

function addFace(v1,v2,v3,v4,col)
{
faceindex.push(faceindex.length);
facev1.push(v1);
facev2.push(v2);
facev3.push(v3);
facev4.push(v4);
facecol.push(col);
facez.push(0);
facezsorted.push(0);
drawn.push(false);

if (v4!=-1)
{
facecx.push((VX[v1]+VX[v2]+VX[v3]+VX[v4])/4);
facecy.push((VY[v1]+VY[v2]+VY[v3]+VY[v4])/4);
facecz.push((VZ[v1]+VZ[v2]+VZ[v3]+VZ[v4])/4);
}
else
{
facecx.push((VX[v1]+VX[v2]+VX[v3])/3);
facecy.push((VY[v1]+VY[v2]+VY[v3])/3);
facecz.push((VZ[v1]+VZ[v2]+VZ[v3])/3);
}
}

function Draw()
{
document.getElementById("mycanvas").getContext("2d").fillStyle="#000000";
document.getElementById("mycanvas").getContext("2d").fillRect(0,0,700,700);
document.getElementById("mycanvas").getContext("2d").strokeStyle="#00ff00";
sortFaces();
//DrawLine();
//document.title='X:'+MouseX+' Y:'+MouseY;
document.getElementById("mycanvas").getContext("2d").stroke();



setTimeout("Draw()",0);
}

function sortFaces()
{
//find z-values
//order=[];

for(z=0;z<faceindex.length;z++)
{
facez[z]=((facecx[z]*RZ[1])+(facecy[z]*RZ[2])+(facecz[z]*RZ[3]))*-1;
}

order=[];
for(i=0;i<faceindex.length;i++)
{
val=-1;
max=-1000;
  for(q=0;q<faceindex.length;q++)
  {
    if(facez[q]>max && order.indexOf(q)==-1)
    {
      max=facez[q];
      val=q;
    }
  }
order.push(val);
}

order.reverse();

for(o=0;o<faceindex.length;o++)
{
ind=order[o];
DrawFace(facev1[ind],facev2[ind],facev3[ind],facev4[ind],facecol[ind]);
}

//ind=-1;
//val=-1000;

//for(i=0;i<faceindex.length;i++)
//{

//for(q=(i-1);q<faceindex.length;q++)
//{
//if (facez[q]>val)
//{
//drawn[q]=true;
//val=facez[q];
//ind=faceindex[q];
//document.title+=' '+ind;
//document.title=drawn;
//}
//
//document.title+=' '+ind;
//DrawFace(facev1[ind],facev2[ind],facev3[ind],facev4[ind],facecol[ind]);
//}
//drawn=[false,false,false,false,false,false];
//}
//document.title=faceindex.length;
}


function DrawLine()
{
document.getElementById("mycanvas").getContext("2d").beginPath();

for(i=0;i<VX.length;i++)
{
document.getElementById("mycanvas").getContext("2d").moveTo(rmx[i],rmy[i]);
document.getElementById("mycanvas").getContext("2d").lineTo(rmx[(i+1)%VX.length],rmy[(i+1)%VX.length]);
}


document.getElementById("mycanvas").getContext("2d").closePath();
}

function DrawFace(i1,i2,i3,i4,col)
{
f=0;
x1=rmx[i1];
y1=rmy[i1];
x2=rmx[i2];
y2=rmy[i2];
x3=rmx[i3];
y3=rmy[i3];
if (i4!=-1)
{
x0=rmx[i4];
y0=rmy[i4];
x4=rmx[i4];
y4=rmy[i4];
faceX=new Array(x1,x2,x3,x4);
faceY=new Array(y1,y2,y3,y4);
}
else
{
x0=rmx[i3];
y0=rmy[i3];
faceX=new Array(x1,x2,x3);
faceY=new Array(y1,y2,y3);
}
//var img1=document.getElementById("myimage");
//var pat=document.getElementById("mycanvas").getContext("2d").drawImage(img1, 0, 0, 1, 1);
var grd=document.getElementById("mycanvas").getContext("2d").createLinearGradient(0,0,200,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");
document.getElementById("mycanvas").getContext("2d").beginPath();
document.getElementById("mycanvas").getContext("2d").moveTo(x0,y0);
for(f=0;f<faceX.length;f++)
{
document.getElementById("mycanvas").getContext("2d").lineTo(faceX[f],faceY[f]);
}
document.getElementById("mycanvas").getContext("2d").closePath();
document.getElementById("mycanvas").getContext("2d").fillStyle=/*pat;*/col;//grd;
document.getElementById("mycanvas").getContext("2d").fill();

}

function RMatrixCalculate()
{
for(h=0;h<=VX.length;h++)
{
qrt=300;
zval1=(RMatrix(VX[h],VY[h],VZ[h],'z'))+camdist;
rmx[h]=(Math.atan((RMatrix(VX[h],VY[h],VZ[h],'x')/zval1))*camdist+qrt);
rmy[h]=(Math.atan((RMatrix(VX[h],VY[h],VZ[h],'y')/zval1))*camdist+qrt);
}
setTimeout("RMatrixCalculate()",0);
}

function RMatrix(x,y,z,a)
{
if(a==='x'){j=(x*RX[1])+(y*RX[2])+(z*RX[3]);}
if(a==='y'){j=(x*RY[1])+(y*RY[2])+(z*RY[3]);}
if(a==='z'){j=(x*RZ[1])+(y*RZ[2])+(z*RZ[3]);}
return j;
}

function GetMousePos(event)
{
MouseX=event.clientX;
MouseY=event.clientY;
Rotation();
}

function Rotation()
{
phi=MouseY/-100;
theta=MouseX/-100;
psi=0;

RX[1]=Math.cos(theta)*Math.cos(psi);
RX[2]=(-1*Math.cos(phi)*Math.sin(psi))+(Math.sin(phi)*Math.sin(theta)*Math.cos(psi));
RX[3]=(Math.sin(phi)*Math.sin(psi))+(Math.cos(phi)*Math.sin(theta)*Math.cos(psi));
RY[1]=Math.cos(theta)*Math.sin(psi);
RY[2]=(Math.cos(phi)*Math.cos(psi))+(Math.sin(phi)*Math.sin(theta)*Math.sin(psi));
RY[3]=(-1*Math.sin(phi)*Math.cos(psi))+(Math.cos(phi)*Math.sin(theta)*Math.sin(psi));
RZ[1]=(-1*Math.sin(theta));
RZ[2]=Math.sin(phi)*Math.cos(theta);
RZ[3]=Math.cos(phi)*Math.cos(theta);

}

function Translation()
{

}

function List()
{
document.getElementById("output").innerHTML=""
+order
+"</br>"+facez[0];
//+"</br>"
//+"</br>"
//+"</br>";
setTimeout("List()",0);
}

</script>
</head>
<body onload="onCreate();">

<canvas id="mycanvas" width="600" height="600" style="position:absolute; border:thick blue solid;" onmousemove="GetMousePos(event);"></canvas>
<div id="output" style="position:absolute; height:content; width:content;left:650px; background-color:#00FFFF; border:thick blue solid;"></div>
</body>
</html>