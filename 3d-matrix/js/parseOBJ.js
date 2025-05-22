xmlhttpstatus=new Array();
xmlDoc="";
xmlDox2="";
OBJ="";
vertices=[];
faces=[];
objtestvars=new Array();
indicesOfvars=new Array();
var xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function()
{
xmlhttpstatus[0]=xmlhttp.readyState;
if(xmlhttp.readyState==4)
{
xmlhttpstatus[1]=xmlhttp.status;
if(xmlhttp.status==200)
{
xmlDoc=xmlhttp.responseText;
xmlhttpstatus[2]=xmlDoc.indexOf("<pre");
xmlhttpstatus[3]=xmlDoc.indexOf("</pre>");
if(OBJ.filetype!=="Blender")
{
OBJ=String(xmlDoc.substring(xmlDoc.indexOf("<pre"),xmlDoc.indexOf("</pre>")+6));
}
else
{
OBJ=String(xmlDoc.substring(xmlDoc.indexOf("Monkey")+6,xmlDoc.length));
}
objtestvars.check=1;
phase1();
}
}
}

function parseOBJ(filename,filetype)
{
console.log(filename);
objtestvars.check=0;
xmlhttp.open("GET",filename,true);
xmlhttp.send();
OBJ.filetype=filetype;
}

function phase1()
{
if(objtestvars.check==1)
{
if(OBJ.filetype!=="Blender")
{
parser=new DOMParser();
xmlDoc2=parser.parseFromString(OBJ,"text/xml");
}
else{}
g=xmlDoc2.getElementsByTagName("pre")[0].textContent;
g=g.split(String.fromCharCode(10));
g=g.toString();
vertices=g.slice(0,g.indexOf("f")-2);
vertices=vertices.toString();
vertices=vertices.split(String.fromCharCode(44));
faces=g.slice(g.indexOf("f"),g.length-1);
//faces=faces.toString();
//faces=faces.split(String.fromCharCode(44));
//g=g.split(String.fromCharCode(32));
objtestvars.var1=vertices;
objtestvars.var2=faces;
objtestvars.check=2;
phase2();
}
}

function phase2()
{
VX=new Array();
VY=new Array();
VZ=new Array();
Point=new Array();
numV=vertices.toString();
num=numV.match(/v/gi);
num=num.length;
for(p=0;p<num;p++)
{
g=vertices[p];
g=g.toString();
g=g.split(String.fromCharCode(32));
for(q=0;q<g.length;q++)
{
Point.push(parseFloat(g[q])*50);
}
addPoint(Point[1],Point[2],Point[3]);
objtestvars.var3=Point.length;
Point=new Array();
}
g=0;
}