
function miniRobot(name,select,texture4) {
this.points=[];
this.name=name;
this.texturArray=[];
this.textureNum=[];
this.select=select;
this.points2=[0];
this.normalsArray=[];
  this.quad= function(a, b, c, d)
{
    var vertices = [
        vec4( -0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5,  0.5,  0.5, 1.0 ),
        vec4(  0.5, -0.5,  0.5, 1.0 ),
        vec4( -0.5, -0.5, -0.5, 1.0 ),
        vec4( -0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5,  0.5, -0.5, 1.0 ),
        vec4(  0.5, -0.5, -0.5, 1.0 )
    ];

    var t1 = subtract(vertices[b], vertices[a]);
     var t2 = subtract(vertices[c], vertices[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);


    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
       this.points.push( vertices[indices[i]] );
        
        this.normalsArray.push(normal);
    }
};
this.addTexture=function(imageURL,gl)
{
// Create a texture.
  texture4 = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture4);
 
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
 
// Asynchronously load an image
  var image = new Image();
  image.src = imageURL;
  image.addEventListener('load', function() {
  // Now that the image has loaded make copy it to the texture.
  gl.bindTexture(gl.TEXTURE_2D, texture4);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
  gl.generateMipmap( gl.TEXTURE_2D );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
  gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );

});
};

 this.addNormal= function(a, b, c, d){
     var t1 = subtract(vec4(points[b]), vec4(points[a]));
     var t2 = subtract(vec4(points[c]),vec4(points[b]));
     var normal = cross(t1, t2);
     var normal = vec3(normal);

    for ( var i = 0; i < 6; ++i ) {
        this.normalsArray.push(normal);
    }
	 }

this.getTexcoords=function(array) {
this.txt=array;
if(select =='3')
{
//table
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);

//left leg
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);

//Right leg
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(0 , 1 , 2 , 3);
}
else
{
this.setTexcoords(4 , 5 , 6 , 7);
this.setTexcoords(4 , 5 , 6 , 7);
this.setTexcoords(4 , 5 , 6 , 7);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(4 , 5 , 6 , 7);
this.setTexcoords(4 , 5 , 6 , 7); 
}
console.log(this.texturArray.length);

};
this.setTexcoords=function(e , f , g , h){
      this.texturArray.push(this.txt[e]);
    this.textureNum.push(name);
      this.texturArray.push(this.txt[f]);
    this.textureNum.push(name);
      this.texturArray.push(this.txt[g]);
    this.textureNum.push(name);
      this.texturArray.push(this.txt[e]);
    this.textureNum.push(name);
     this.texturArray.push(this.txt[g]); 
     this.textureNum.push(name);   
     this.texturArray.push(this.txt[h]);
    this.textureNum.push(name);


};
this.getTotalArray=function()
{
  return this.texturArray;
};
this.getTexture=function()
{
  return texture4;
};
this.getTextureNum=function()
{
  return this.textureNum;
};


this.colorCube = function () {

    this.quad( 1, 0, 3, 2 );
    this.quad( 2, 3, 7, 6 );
    this.quad( 3, 0, 4, 7 );
    this.quad( 6, 5, 1, 2 );
    this.quad( 4, 5, 6, 7 );
    this.quad( 5, 4, 0, 1 );

     for(var i=0;i<36;i++){
this.points2[i]=this.points[i];
}
   
};
  this.getPoints= function()
 {

  return this.points;
 
 };

  this.getnormal= function()
 {

  return this.normalsArray;
 
 };
this.drawBody = function(intial,limit,scale,trans,rotat) {
var k=0;

 for(var i=intial;i<limit;i++){

  this.points[i]=mult(trans,vec4(this.points2[k++]));
  this.points[i]=mult(scale,vec4(this.points[i]));
  this.points[i]=mult(rotat,vec4(this.points[i]));
  console.log(this.points[i]);
 }


};


this.MoveTowards=function(x,y,z)
{

  for(var i=0;i<this.points.length;i++)
   this.points[i]=mult(translate(x,y,z),vec4(this.points[i]));

};
this.ChangeSize=function(x,y,z)
{
 for(var i=0;i<this.points.length;i++)
   this.points[i]=mult(scalem(x,y,z),vec4(this.points[i]));  
};
this.RotateAll=function(Type,AngleX,AngleY,AngleZ)
{
 // Enter LL for left leg
  if((Type.localeCompare(leftLeg))==0)
  {
    for(var i=144;i<180;i++)
   {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i])); 
   }    
  }
   // Enter RL for Right leg
  else if((Type.localeCompare(RighLeg))==0)
  {
    for(var i=180;i<216;i++)
  {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i])); 
   }     
  }
  // Enter LH for left Hand
  else if((Type.localeCompare(leftHand))==0)
  {
    for(var i=72;i<108;i++)
   {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i]));  
   }    
  }
  // Enter RH for Right hand
  else if((Type.localeCompare(RightHand))==0)
  {
    for(var i=108;i<144;i++)
   {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i]));  
   }     
  }
  //Enter ALL for All Body
  else if((Type.localeCompare(AllBody))==0)
  {
     for(var i=0;i<216;i++)
  {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i])); 
   }    
  }
};

 this.colorCube();

    if(select =='3')
    {
     this.drawBody(0,36,scalem(1.0,0.6,0.5),translate(0.0,0.0,0.0),rotateY(-340));
    
     this.drawBody(36,72,scalem(0.17,0.4,0.2),translate(-2.3,-0.9,-0.15),rotateY(-340));
  
	this.addNormal( 1+36, 0+36, 3+36, 2+36 );
    this.addNormal( 2+36, 3+36, 7+36, 6+36);
    this.addNormal( 3+36, 0+36, 4+36, 7+36);
    this.addNormal( 6+36, 5+36, 1+36, 2+36);
    this.addNormal( 4+36, 5+36, 6+36, 7+36);
    this.addNormal( 5+36, 4+36, 0+36, 1+36 );
     this.drawBody(72,108,scalem(0.17,0.4,0.2),translate(2.3,-0.9,-0.15),rotateY(-340));
 
	this.addNormal( 1+72, 0+72, 3+72, 2+72 );
    this.addNormal( 2+72, 3+72, 7+72, 6+72);
    this.addNormal( 3+72, 0+72, 4+72, 7+72 );
    this.addNormal( 6+72, 5+72, 1+72, 2+72 );
    this.addNormal( 4+72, 5+72, 6+72, 7+72 );
    this.addNormal( 5+72, 4+72, 0+72, 1+72 );
  }
  
    else if(select =='1')
    {
     this.drawBody(0,36,scalem(0.5,0.09,0.5),translate(0.0,3.9,0.0),rotateY(470));
    
    }
}