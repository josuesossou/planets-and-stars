import React from 'react';
import * as THREE from "three";
import Planet from './model/planet'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './App.css';
import MaxHeap from './util/heap'

class App extends React.Component {
	spaceObjects = []
	cube
	scene
	camera
	group
	angle = 0
	controls

	componentDidMount() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		// document.body.appendChild( renderer.domElement );
		// use ref as a mount point of the Three.js scene instead of the document.body
		this.mount.appendChild( this.renderer.domElement );
		var geometry = new THREE.BoxGeometry( 10, 10, 10 );
		var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
		this.cube = new THREE.Mesh( geometry, material );
		this.group = new THREE.Group();

		this.cube.position.set(100,100, 100)

		this.group.add(this.cube)
		this.scene.add( this.group )
		this.camera.position.z = 100;
		this.camera.position.x = 0
		// this.camera.lookAt(this.scene.position);	

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );

		// this.controls.minDistance = 5
		// this.controls.maxDistance = 250

		// this.controls.rotateSpeed = 1.0;
		// this.controls.zoomSpeed = 1.2;
		// this.controls.panSpeed = 0.8;
		// controls.noZoom = false;
		// controls.noPan = false;
		// controls.staticMoving = true;
		// controls.dynamicDampingFactor = 0.3;
		// var 
		// animate();
		this.renderer.render( this.scene, this.camera );

		let maxHeap = new MaxHeap()
		maxHeap.insert(80)
		maxHeap.insert(30)
		maxHeap.insert(20)
		maxHeap.insert(10)
		maxHeap.insert(70)
		maxHeap.insert(90)
		console.log(maxHeap.getMax())
		console.log(maxHeap.heap)

		maxHeap.remove()
		console.log(maxHeap.getMax())
		console.log(maxHeap.heap)
		this.animate()
		// window.addEventListener('keydown', this.moveCamera)
	}
	timestamp


	/**
	 * @TODO: complete add space object
	 */
	addSpaceObject = () => {
		const earth = new Planet(1, 50, null, 'Earth', document.createElement('canvas'))

		this.group.add( earth.generatePlanet() )
		this.scene.add( this.group )



		// this.camera.position.z = 100;
		this.renderer.render( this.scene, this.camera );
	}

	/**
	 * compute gravitational force, speed, and distance. then place the object into the canvas
	 */
	placeSpaceObject() {

	}

	animate = () => {
		// console.log('clicked')
		requestAnimationFrame( this.animate );
		this.timestamp = Date.now() * 0.0001;
		this.cube.position.x = Math.cos(this.timestamp * 100) * Math.cos(this.timestamp * 2);
		this.cube.position.z = Math.sin(this.timestamp * 100) * Math.cos(this.timestamp * 2);

		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;
		this.controls.update()
		this.renderer.render( this.scene, this.camera );
	};

	render() {
		return (
			<div className="App">
				<div ref={ref => (this.mount = ref)} />
				<h2 onClick={() => this.animate()}>Hello World</h2>
				<button onClick={() => this.addNewMaterial()}>Add a sphere</button>
			</div>
		);
	}
}

export default App;
