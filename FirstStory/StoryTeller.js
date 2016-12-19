"use strict";

var canvas;
var gl;
var program;

//light component
var normalsArray = [];
var lightPosition = vec4(0.0, 1.0, 0.0, 0.0 );
var lightAmbient = vec4(0.7, 0.7, 0.7, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialAmbient = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 1.0, 1.0, 1.0);
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 1.0;
var ambientColor, diffuseColor, specularColor;


//camera component
var modelView, projection;
var eye;
const at    = vec3(1.0, 0.0, 0.0);
const up    = vec3(0.0, 1.0, 0.0);
var radius  = 3;
var theta1  =-0.07566676759999981
var phi     = 0.0;
var near    =0.1;
var far     =100.0;

var points = [];

//scene component
var theme;
var Robot1;
var Robot2;
var Robot3;
var miniRobot1;
var miniRobot2;


var ligthflag=1.0;

//texture variable
var texture;
var texture1;
var texture2;
var texture3;
var texture4;
var texture5;

var vBuffer ;
var vPosition;
var textureNum=[];
//for theme
var texCoord = [
    
	vec2(0.302734375,0.228046875),
	vec2(0.30078125,0.75734375),
	vec2(0.763671875,0.75734375),
	vec2(0.7607421875,0.231953125),

    vec2(0.912109375,0.76734375),
	vec2(0.912109375,0.14765625),
	vec2(0.757578125,0.240234375),
	vec2(0.7566015625,0.76734375),
	
	
    vec2(1,-0.00390625),
	vec2(0.0087890625,0.025390625),
	vec2(0.298828125,0.22390625),
	vec2(0.759765625,0.22390625),
    
	vec2(0.7607421875,0.78515625),
	vec2(0.298828125,0.78125),
	vec2(0.1474609375,0.984375),
	vec2(0.904296875,0.98046875),
    
	vec2(0.349375,0.68796875),
	vec2(0.351328125,0.510234375),
	vec2(0.14625,0.510234375),
	vec2(0.15015625,0.68796875),
	
	vec2(0.30078125,0.75734375),
	vec2(0.302734375,0.228046875),
	vec2(0.009765625,0.02734375),
	vec2(0.009765625,0.98046875)
   
];

//for robots
var texCoord2 = [

	vec2(0.553203125,0.687265625),   
	vec2(0.55515625,0.514140625),
	vec2(0.744609375,0.514140625),
	vec2(0.744609375,0.683359375),
	

    vec2(0.761484375,0.68796875),   //lift
	vec2(0.75953125,0.510234375),
	vec2(0.96265625,0.51609375),
	vec2(0.96265625,0.68796875),
	
    vec2(0.75953125,0.48928125),   //bottom
	vec2(0.55640625,0.485375),
	vec2(0.55640625,0.23146875),
	vec2(0.75953125,0.233421875),
    
	vec2(0.5759531259,0.94578125),    //up
	vec2(0.56031259,0.94578125),
	vec2(0.556406295,0.689921875),
	vec2(0.57575781259,0.68796875),
    
	vec2(0.349375,0.68796875),      //dahr
	vec2(0.351328125,0.510234375),
	vec2(0.14625,0.510234375),
	vec2(0.15015625,0.68796875),
	
	vec2(0.35328125,0.67796875),   //lift
	vec2(0.351328125,0.51609375),
	vec2(0.55640625,0.514140625),
	vec2(0.55640625,0.67796875),
	
	
	//body
	vec2(0.308359375,0.01615625),
	vec2(0.308359375,0.250021875),
	vec2(0.179453125,0.250021875),
	vec2(0.179453125,0.018109375),
	
	vec2(0.175546875,-0.004859375),
	vec2(0.1775,0.20021875),
	vec2(0.04859375,0.20021875),
	vec2(0.04859375,-0.00290625),
	
	vec2(0.179453125,0.204125),
	vec2(0.308359375,0.20021875),
	vec2(0.308359375,0.366234375),
	vec2(0.18140625,0.366234375),
	
	vec2(0.57203125,0.03615625),
	vec2(0.570078125,0.20021875),
	vec2(0.443125,0.20021875),
	vec2(0.441171875,0.0400625),
	
	vec2(0.440171875,-0.004859375),
	vec2(0.442125,0.20021875),
	vec2(0.3102125,0.188265625),
	vec2(0.3102125,-0.004859375),
	
	//hand1
	vec2(0.86328125,0.2421875),vec2(0.8642578125,0.125),vec2(0.912109375,0.126953125),vec2(0.9130859375,0.240234375), //face
	vec2(0.9150390625,0.23828125),vec2(0.9150390625,0.12890625),vec2(0.962890625,0.12890625),vec2(0.958984375,0.240234375), //rigth
	vec2(0.9111328125,0.12109375),vec2(0.865234375,0.119140625),vec2(0.865234375,0.064453125),vec2(0.9111328125,0.064453125),//botom
	vec2(0.8662109375,0.181640625),vec2(0.8662109375,0.134765625),vec2(0.912109375,0.130859375),vec2(0.912109375,0.181640625),//up
	vec2(0.9111328125,0.12890625),vec2(0.9111328125,0.2421875),vec2(0.865234375,0.240234375),vec2(0.865234375,0.12890625),//dahr
	vec2(0.861328125,0.23828125),vec2(0.861328125,0.12890625),vec2(0.814453125,0.12890625),vec2(0.814453125,0.23828125), //left
	
	//leg1
	vec2(0.0595703125,0.603515625),vec2(0.01171875,0.607421875),vec2(0.0126953125,0.546875),vec2(0.0595703125,0.544921875),
	vec2(0.0107421875,0.443359375),vec2(0.046875,0.443359375),vec2(0.046875,0.560546875),vec2(0.0126953125,0.564453125),
	vec2(0.0478515625,0.560546875),vec2(0.0810546875,0.55859375),vec2(0.0810546875,0.443359375),vec2(0.0498046875,0.443359375),
	vec2(0.0478515625,0.560546875),vec2(0.0810546875,0.55859375),vec2(0.0810546875,0.443359375),vec2(0.0498046875,0.443359375),
	vec2(0.0126953125,0.546875),vec2(0.0595703125,0.544921875),vec2(0.0595703125,0.603515625),vec2(0.01171875,0.607421875),
	vec2(0.0107421875,0.443359375),vec2(0.046875,0.443359375),vec2(0.046875,0.560546875),vec2(0.0126953125,0.564453125),
   
];

//for table
var texCoord3 =[
  //face
        vec2(0.7796875,0.6040625),
        vec2(0.7796875,0.352109375),
        vec2(0.879296875,0.348203125),
        vec2(0.8802734375,0.602109375)
  ];

  //for toy
  var texCoord4 =[
  
        //image 7 or 8
       vec2(0.0,1.0),
	   vec2(0.0,0.0),
	   vec2(1.0,0.0),
	   vec2(1.0,1.0),
     //sides white
       vec2(0.02734375,0.720703125),
       vec2(0.0966796875,0.716796875),
       vec2(0.099609375,0.66015625),
       vec2(0.0419921875,0.6640625)
  ];

var arr=[];
window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	  
	
    theme=new Theme(gl);
    theme.draw();
	theme.ChangeSize(4,3,1);
    points=theme.getPoints();
    normalsArray=theme.getnormal();
    arr=theme.getTexcoords(texCoord);
    theme.addTexture("room.png",gl);
    texture=theme.getTexture();
    textureNum=theme.getTextureNum();

    
 Robot1= new Robot('1',gl,'texture1');
	Robot1.MoveTowards(1,-1,-0.9);
	Robot1.RotateAll('AllBody',0.0,10,0)
    Robot1.ChangeSize(1,1,1);
    points=points.concat(Robot1.getPoints());
    normalsArray =normalsArray.concat(Robot1.getnormal());
    Robot1.addTexture("character1.png",gl);
    texture1=Robot1.getTexture();
   	Robot1.getTexcoords(texCoord2);
    arr=arr.concat(Robot1.getTotalArray());
     textureNum=textureNum.concat(Robot1.getTextureNum());
	  
	  
	Robot2= new Robot('2',gl,'texture2');
	Robot2.MoveTowards(0.2,-1.0,-3);
	Robot2.RotateAll('AllBody',0.0,90,0)
    Robot2.ChangeSize(1,1,1);
    points=points.concat(Robot2.getPoints());
    normalsArray =normalsArray.concat(Robot2.getnormal());
    Robot2.addTexture("character2.png",gl);
    texture2=Robot2.getTexture();
   	Robot2.getTexcoords(texCoord2);
    arr=arr.concat(Robot2.getTotalArray());
    textureNum=textureNum.concat(Robot2.getTextureNum());
	
	
	Robot3= new Robot('3',gl,'texture3');
	Robot3.MoveTowards(-1.7,-0.8,-4.9);
    Robot3.ChangeSize(1.0,1.6,1.0);
	Robot3.RotateAll('AllBody',0.0,-50,0.0);
    points=points.concat(Robot3.getPoints());
    normalsArray =normalsArray.concat(Robot3.getnormal());
    Robot3.addTexture("character3.png",gl);
    texture3=Robot3.getTexture();
   	Robot3.getTexcoords(texCoord2);
    arr=arr.concat(Robot3.getTotalArray());
    textureNum=textureNum.concat(Robot3.getTextureNum());

    miniRobot1= new miniRobot('4','3','texture4');
    miniRobot1.MoveTowards(2.2,-1.8,-0.3);
    points=points.concat(miniRobot1.getPoints());
    normalsArray =normalsArray.concat(miniRobot1.getnormal()); 
    miniRobot1.addTexture("cubeTabel.png",gl);
	texture4=miniRobot1.getTexture();
	miniRobot1.getTexcoords(texCoord3);
	arr=arr.concat(miniRobot1.getTotalArray());
	textureNum=textureNum.concat(miniRobot1.getTextureNum());


	miniRobot2= new miniRobot('5','1','texture5');
	miniRobot2.MoveTowards(2.2,-1.8,-0.3);
    points=points.concat(miniRobot2.getPoints());
    normalsArray =normalsArray.concat(miniRobot2.getnormal()); 
    miniRobot2.addTexture("images.png",gl);
	texture5=miniRobot2.getTexture();
	miniRobot2.getTexcoords(texCoord4);
	arr=arr.concat(miniRobot2.getTotalArray());
	textureNum=textureNum.concat(miniRobot2.getTextureNum());
    
    //texture buffer
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(arr), gl.STATIC_DRAW );
   
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

//normal buffer
    var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );

// vertices buffer
     vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

     vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
	
	//object number buffer
	var ObjectNoBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, ObjectNoBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(textureNum), gl.STATIC_DRAW );

    var objectn = gl.getAttribLocation(program, "ObjectNo");
    gl.vertexAttribPointer(objectn, 1, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(objectn);
	
	
    projection = perspective(100.0,(canvas.width/canvas.height), near, far);

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

  

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
       flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );

    gl.uniform1f(gl.getUniformLocation(program,
       "shininess"),materialShininess);
	   
	 
	  

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"),
       false, flatten(projection));
	   
	
	
	window.addEventListener('keydown', onKeyboardEvent, false);
	
	function onKeyboardEvent(e) {

            if (e.code === 'KeyL') {

               radius += 0.50;

            }
			
			if (e.code === 'KeyK') {

               radius -= 0.50;

            }
			
			if (e.code === 'KeyN') {
				ligthflag=1;
            }
			if (e.code === 'KeyM')
				 ligthflag=2;

        }
	 
	
	   
	
	 canvas.addEventListener("mousemove", function(event){
		  var x = 2*event.clientX/canvas.width-1;
      var y = 2*(canvas.height-event.clientY)/canvas.height-1;
	  
	  if(x>=0)
    theta1 += 0.01;
      else 
		  theta1 -= 0.01;
	// console.log("theta",theta1);
});



gl.activeTexture( gl.TEXTURE0 );
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);


gl.activeTexture( gl.TEXTURE1 );
gl.bindTexture(gl.TEXTURE_2D, texture1);
gl.uniform1i(gl.getUniformLocation(program,"texture1"),1);
 
 gl.activeTexture( gl.TEXTURE2 );
gl.bindTexture(gl.TEXTURE_2D, texture2);
 gl.uniform1i(gl.getUniformLocation(program,"texture2"),2);
 
 gl.activeTexture( gl.TEXTURE3 );
gl.bindTexture(gl.TEXTURE_2D, texture3);
 gl.uniform1i(gl.getUniformLocation(program,"texture3"),3);

 gl.activeTexture( gl.TEXTURE4 );
gl.bindTexture(gl.TEXTURE_2D, texture4);
 gl.uniform1i(gl.getUniformLocation(program,"texture4"),4);

gl.activeTexture( gl.TEXTURE5 );
gl.bindTexture(gl.TEXTURE_2D, texture5);
 gl.uniform1i(gl.getUniformLocation(program,"texture5"),5);


    render();
}

var left=3;
var right=-3;
var temp=3;
var start=0;
var stop = 0 ;
var render = function(){


		setTimeout(function(){
			 requestAnimFrame(render);
			 gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			 if(start<5){
				 start++;
			 }
			 if(start==5){
			 if(stop < 46 ){
                 Robot3.RotateAll('leftLeg',0.0,0.0,left);
                 Robot3.RotateAll('RighLeg',right,0.0,0.0);
                 Robot3.MoveTowards(0.10,0.0,0);
				 stop = stop+1;
				}
			 }
				points=theme.getPoints();
				points=points.concat(Robot1.getPoints());
				points=points.concat(Robot2.getPoints());
			    points=points.concat(Robot3.getPoints());
			    points=points.concat(miniRobot1.getPoints());
				points=points.concat(miniRobot2.getPoints());
				
                gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
                gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

                 vPosition = gl.getAttribLocation(program, "vPosition");
                gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(vPosition);
				 left=-temp;
                 right=temp;
                 temp*=-1;
				modelView = lookAt(vec3(radius*Math.sin(theta1)*Math.cos(phi),radius*Math.sin(theta1)*Math.sin(phi), radius*Math.cos(theta1)), at , up);
                gl.uniformMatrix4fv( gl.getUniformLocation(program,"modelViewMatrix"), false, flatten(modelView) );	
	            gl.uniform1f(gl.getUniformLocation(program,"Ltrue"),ligthflag);
	            gl.drawArrays( gl.TRIANGLES, 0,points.length );
				
		},600);
}