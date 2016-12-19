
function Robot(name,gl,texture1) {
this.points=[];
this.name=name;
this.texturArray=[];
this.textureNum=[];
this.txt1=[];
this.points2=[0];
this.normalsArray =[];
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

this.colorCube= function () {

    this.quad( 1, 0, 3, 2 );
    this.quad( 2, 3, 7, 6 );
    this.quad( 3, 0, 4, 7 );
    this.quad( 6, 5, 1, 2 );
    this.quad( 4, 5, 6, 7 );
    this.quad( 5, 4, 0, 1 );

    for(var i=0;i<this.points.length;i++){
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
 this.getColors= function()
 {

  return this.colors;
 
 };
this.drawBody = function(intial,limit,scale,trans,rotat) {
 // console.log("drawBody");
var k=0;
 for(var i=intial;i<limit;i++){
 
  this.points[i]=mult(trans,vec4(this.points2[k++]));
  this.points[i]=mult(scale,vec4(this.points[i]));
  this.points[i]=mult(rotat,vec4(this.points[i]));

 }
 
};


this.MoveTowards=function(x,y,z)
{

  for(var i=0;i<216;i++)
   this.points[i]=mult(translate(x,y,z),vec4(this.points[i]));

};
this.ChangeSize=function(x,y,z)
{
 for(var i=0;i<216;i++)
   this.points[i]=mult(scalem(x,y,z),vec4(this.points[i]));  
};
this.RotateAll=function(Type,AngleX,AngleY,AngleZ)
{
 // Enter LL for left leg
  if((Type.localeCompare('leftLeg'))==0)
  {
    for(var i=144;i<180;i++)
   {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i])); 
   }    
  }
   // Enter RL for Right leg
  else if((Type.localeCompare('RighLeg'))==0)
  {
    for(var i=180;i<216;i++)
  {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i])); 
   }     
  }
  // Enter LH for left Hand
  else if((Type.localeCompare('leftHand'))==0)
  {
    for(var i=72;i<108;i++)
   {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i]));  
   }    
  }
  // Enter RH for Right hand
  else if((Type.localeCompare('RightHand'))==0)
  {
    for(var i=108;i<144;i++)
   {
   this.points[i]=mult(rotateX(AngleX),vec4(this.points[i]));
   this.points[i]=mult(rotateY(AngleY),vec4(this.points[i]));
   this.points[i]=mult(rotateZ(AngleZ),vec4(this.points[i]));  
   }     
  }
  //Enter ALL for All Body
  else if((Type.localeCompare('AllBody'))==0)
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

  


this.addTexture=function(imageURL,gl)
{
// Create a texture.
texture1 = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D,texture1);
 
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
// Fill the texture with a 1x1 blue pixel.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
 
// Asynchronously load an image
var image = new Image();
image.src = imageURL;
image.addEventListener('load', function() {
  // Now that the image has loaded make copy it to the texture.
   gl.bindTexture(gl.TEXTURE_2D, texture1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
});
};

this.getTexcoords=function(array) {
this.txt1=array;

//head
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(4 , 5 , 6 , 7);
this.setTexcoords(8 , 9 , 10 , 11);
this.setTexcoords(12 , 13 , 14 , 15);
this.setTexcoords(16, 17 , 18 , 19);
this.setTexcoords(20 , 21 , 22 , 23);

//body
this.setTexcoords(24, 25 , 26 , 27);
this.setTexcoords(28 , 29 , 30 , 31);
this.setTexcoords(8, 9, 10 , 11);
this.setTexcoords(32 , 33 , 34 , 35);
this.setTexcoords(36, 37 , 38 , 39);
this.setTexcoords(40, 41 , 42 , 43);

//hand1
this.setTexcoords(44 , 45, 46 , 47);
this.setTexcoords(48 , 49 , 50 , 51);
this.setTexcoords(52 , 53 , 54 , 55);
this.setTexcoords(56 , 57 , 58 , 59);
this.setTexcoords(60, 61 ,62, 63);
this.setTexcoords(64,65,66, 67);

//hand2
this.setTexcoords(44 , 45, 46 , 47);
this.setTexcoords(48 , 49 , 50 , 51);
this.setTexcoords(52 , 53 , 54 , 55);
this.setTexcoords(56 , 57 , 58 , 59);
this.setTexcoords(60, 61 ,62, 63);
this.setTexcoords(64,65,66, 67);

//leg1
this.setTexcoords(68 , 69, 70 , 71);
this.setTexcoords(72 , 73 , 74 , 75);
this.setTexcoords(76 , 77 , 78 , 79);
this.setTexcoords(80 , 81 , 82 , 83);
this.setTexcoords(84, 85 ,85, 86);
this.setTexcoords(87,88,89, 90);

//leg2
this.setTexcoords(68 , 69, 70 , 71);
this.setTexcoords(72 , 73 , 74 , 75);
this.setTexcoords(76 , 77 , 78 , 79);
this.setTexcoords(80 , 81 , 82 , 83);
this.setTexcoords(84, 85 ,85, 86);
this.setTexcoords(87,88,89, 90);


console.log(this.texturArray.length);
};


this.setTexcoords=function(e , f , g , h){
     this.texturArray.push(this.txt1[e]);
	  this.textureNum.push(name);
      this.texturArray.push(this.txt1[f]);
	  this.textureNum.push(name);
      this.texturArray.push(this.txt1[g]);
	  this.textureNum.push(name);
      this.texturArray.push(this.txt1[e]);
	  this.textureNum.push(name);
     this.texturArray.push(this.txt1[g]); 
     this.textureNum.push(name);	 
     this.texturArray.push(this.txt1[h]);
	  this.textureNum.push(name);


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


this.getTotalArray=function()
{
  return this.texturArray;
};

this.getTexture=function()
{
	return texture1;
};
this.getTextureNum=function()
{
	return this.textureNum;
};

    this.drawBody(0,36,scalem(0.8,0.8,0.8),translate(0.0,0.8,0.0),rotateX(340));
    
      

    this.drawBody(36,72,scalem(0.5,0.6,0.5),translate(0.0,0.0,0.0),rotateX(340));
    
    this.addNormal( 1+36, 0+36, 3+36, 2+36 );
    this.addNormal( 2+36, 3+36, 7+36, 6+36);
    this.addNormal( 3+36, 0+36, 4+36, 7+36);
    this.addNormal( 6+36, 5+36, 1+36, 2+36);
    this.addNormal( 4+36, 5+36, 6+36, 7+36);
    this.addNormal( 5+36, 4+36, 0+36, 1+36 );

    
     this.drawBody(72,108,scalem(0.18,0.5,0.2),translate(-1.7,0.0,0.0),rotateX(25));

   
    this.addNormal( 1+72, 0+72, 3+72, 2+72 );
    this.addNormal( 2+72, 3+72, 7+72, 6+72);
    this.addNormal( 3+72, 0+72, 4+72, 7+72 );
    this.addNormal( 6+72, 5+72, 1+72, 2+72 );
    this.addNormal( 4+72, 5+72, 6+72, 7+72 );
    this.addNormal( 5+72, 4+72, 0+72, 1+72 );

     this.drawBody(108,144,scalem(0.18,0.5,0.2),translate(1.7,0.0,0.0),rotateX(25));

    this.addNormal( 1+108, 0+108, 3+108, 2+108 );
    this.addNormal( 2+108, 3+108, 7+108, 6+108 );
    this.addNormal( 3+108, 0+108, 4+108, 7+108 );
    this.addNormal( 6+108, 5+108, 1+108, 2+108 );
    this.addNormal( 4+108, 5+108, 6+108, 7+108 );
    this.addNormal( 5+108, 4+108, 0+108, 1+108 );
 
    this.drawBody(144,180,scalem(0.17,0.7,0.2),translate(-0.9,-0.9,-0.15),rotateX(340));
 
    this.addNormal( 1+144, 0+144, 3+144, 2+144 );
    this.addNormal( 2+144, 3+144, 7+144, 6+144 );
    this.addNormal( 3+144, 0+144, 4+144, 7+144 );
    this.addNormal( 6+144, 5+144, 1+144, 2+144 );
    this.addNormal( 4+144, 5+144, 6+144, 7+144 );
    this.addNormal( 5+144, 4+144, 0+144, 1+144 );
     this.drawBody(180,216,scalem(0.17,0.7,0.2),translate(0.9,-0.9,-0.15),rotateX(340));

    this.addNormal( 1+180, 0+180, 3+180, 2+180 );
    this.addNormal( 2+180, 3+180, 7+180, 6+180);
    this.addNormal( 3+180, 0+180, 4+180, 7+180 );
    this.addNormal( 6+180, 5+180, 1+180, 2+180 );
    this.addNormal( 4+180, 5+180, 6+180, 7+180);
    this.addNormal( 5+180, 4+180, 0+180, 1+180);
     this.RotateAll('AllBody',25,-22.0,0.0);
	 
}