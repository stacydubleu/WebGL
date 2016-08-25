var scene, camera, renderer, stats;
var clock= new THREE.Clock;
var gear, wingRight, wingLeft;
var pivot = new THREE.Group();

init();
animate();
camera.updateMatrixWorld();
var div=document.createElement("div");
div.style.position = "absolute";
div.style.width = 100;
div.style.height = 100;
div.style.y = 200 + 'px';
div.style.x = 200 + 'px';
div.innerHTML="what the helllllo oops";
document.body.appendChild(div);

function init(){
	scene = new THREE.Scene();
	var WIDTH = window.innerWidth,
			HEIGHT = window.innerHeight;

	//create a renderer and add it to the DOM
	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setSize(WIDTH, HEIGHT)
	document.body.appendChild(renderer.domElement);

	//create a camera zoom it out from the model, add it to the scene
	camera = new THREE.PerspectiveCamera( 45, WIDTH/HEIGHT, 0.1, 20000 );
	camera.position.set( 0, 6, 0);
	scene.add(camera);

	//event listener for resizing window
	window.addEventListener('resize', function() {
		var WIDTH = window.innerWidth;
				HEIGHT = window.innerHeight;
		renderer.setSize(WIDTH, HEIGHT);
		camera.aspect = WIDTH/HEIGHT;
		camera.updateProjectionMatrix();
	});

	//set up the scene, background color
	renderer.setClearColor(0x87CEEB, 1);
	// create a light, set its position, and add to scene
	var pointlight = new THREE.PointLight(0xffffff);
	var ptlight = new THREE.PointLight(0xffffff);

	pointlight.position.set(-100,200,100);
	ptlight.position.set(100, -100, -100);
	scene.add(pointlight);
	scene.add(ptlight);

	//load geometry blender
	var loader = new THREE.JSONLoader();
	  loader.load("body.json", function(geometry){
	 	var material = new THREE.MeshLambertMaterial({color: 0xccffff});
	 	planebody = new THREE.Mesh(geometry, material);
	 	scene.add(planebody);
  });

	var loadLeft = new THREE.JSONLoader();
	  loadLeft.load("wingright.json", function(geometry){
	 	var material = new THREE.MeshLambertMaterial({color: 0xccffff});
	 	wingRight = new THREE.Mesh(geometry, material);
	 	scene.add(wingRight);
  });

	var loadLeft = new THREE.JSONLoader();
	  loadLeft.load("wingleft.json", function(geometry){
	 	var material = new THREE.MeshLambertMaterial({color: 0xccffff});
	 	wingLeft = new THREE.Mesh(geometry, material);
	  wingLeft.position.x=0;
		wingLeft.position.y=0;
		wingLeft.position.z=0;
	//	wingLeft.position.set( center.0, center.0, center.0 );
		scene.add(pivot);
	 	scene.add(wingLeft);
  });


	var loadGear = new THREE.JSONLoader();
	loadGear.load("gear.json", function(geometry){
		var material = new THREE.MeshLambertMaterial({color: 0xE0EEEE});
		gear = new THREE.Mesh(geometry, material);
		gear.position.y = 15;
		gear.position.x = 15;
		gear.position.z = 0;
		scene.add(gear);
	});
	//drag mouse control
	controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
	//render the scene and updates the render as needed
	requestAnimationFrame(animate);
	//rotating cube
	gear.rotation.y -= clock.getDelta();
	//pivot.rotation.z += 0.01;
	//wingLeft.rotation.z += 0.01;
	//wingRight.rotation.x -= clock.getDelta();
	//Render the scene
	renderer.render(scene, camera);
	controls.update();
}