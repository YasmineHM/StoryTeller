var texture;
function Theme(){
this.points=[];
this.normalsArray=[];
this.texturArray=[];
this.textureNum=[];
this.txt=[];

var vertices = [
        vec4( -0.999, -0.8,  2, 1.0 ),
        vec4( -0.999,  0.8,  2, 1.0 ),
        vec4(  0.999,  0.8,  2, 1.0 ),
        vec4(  0.999, -0.8,  2, 1.0 ),
        vec4( -0.999, -0.8, -2, 1.0 ),
        vec4( -0.999,  0.8, -2, 1.0 ),
        vec4(  0.999,  0.8, -2, 1.0 ),
        vec4(  0.999, -0.8, -2, 1.0 )
    ];
	
this.draw=function(){
    //this.quad( 1, 0, 3, 2 );
    this.quad( 2, 3, 7, 6 );
    this.quad( 3, 0, 4, 7 );
    this.quad( 6, 5, 1, 2 );
    this.quad( 4, 5, 6, 7 );
    this.quad( 5, 4, 0, 1 );
};



  this.getnormal= function()
 {

  return this.normalsArray;
 
 };
this.quad=function(a,b,c,d)
{
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
this.getPoints=function()
{
	return this.points;
};


this.addTexture=function(imageURL,gl)
{
// Create a texture.
gl.activeTexture( gl.TEXTURE0 );
texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
 
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
// Fill the texture with a 1x1 blue pixel.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
              new Uint8Array([0, 0, 255, 255]));
 
// Asynchronously load an image
var image = new Image();
image.src = imageURL;
image.addEventListener('load', function() {
  // Now that the image has loaded make copy it to the texture.
   gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
                      gl.NEAREST_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
     gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);

});
};
this.getTexture=function()
{
	return texture;
};
this.getTexcoords=function(array) {
this.txt=array;

this.setTexcoords(4 , 5 , 6 , 7);
this.setTexcoords(8 , 9 , 10 , 11);
this.setTexcoords(12 , 13 , 14 , 15);
this.setTexcoords(0 , 1 , 2 , 3);
this.setTexcoords(20 , 21 , 22 , 23);
return this.texturArray;
};

this.setTexcoords=function(a , b , c , d) {
     var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        
      this.texturArray.push(this.txt[indices[i]] );
	  this.textureNum.push(0);

    }

};

this.getTextureNum=function()
{
	return this.textureNum;
};

  this.ChangeSize=function(x,y,z)
{
 for(var i=0;i<this.points.length;i++)
   {this.points[i]=mult(scalem(x,y,z),vec4(this.points[i]));  
  this.points[i]=mult(rotateY(386),vec4(this.points[i]));
 
  this.points[i]=mult(rotateX(0),vec4(this.points[i]));
}
};
 this.ChangeSize2=function(x,y,z)
{
 for(var i=0;i<this.points.length;i++)
   {this.points[i]=mult(scalem(x,y,z),vec4(this.points[i]));  
  }
};

}