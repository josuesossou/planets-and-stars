import React from 'react';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSpaceObject, calculateDistance, calculateGravitationalForce, calculateSpeed } from './util/helpers'
import { solarSystem } from './data/data'
import Node from '././util/heapElement'
import './App.css'

import { Input, Select, CloseButton, Text } from './shared/Shared'
import { AlertMessage, CurrentMode, Scale, ChooseMode, Plan } from './conponents/Components'
import { SOLAR_SYSTEM, STANDARD_PLAN_DISCRIPTION } from './styles/strings'


class App extends React.Component {
	constructor(props) {
		super(props)
		/**
		 * There is going to be three modes, free(only shows our solar system), simulating users own solar sytems, and gravitational force calculation and simulation --> refers to work space mode
		 */
		this.state = {
			modeType: 'freeModeData',
			freeModeData: {
				
			},
			createSolarSytemModeData: { // will only allow one star to be created

			},
			workSpaceModeData: {

			},
			spaceObjects: [], // array of space objects
			scaleFactor: 1,
			textScaleFactor: 10, 
			show: true
		}

		this.camera = null
		this.scene = null
		this.controls = null
		this.renderer = null
		this.group = null
		this.scaleVector = null
	}

	componentDidMount() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
		this.renderer = new THREE.WebGLRenderer();

		this.camera.position.set(0, 100, 175);

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );

		this.scaleVector = new THREE.Vector3();
		this.group = new THREE.Group();

		this.renderer.setSize( window.innerWidth, window.innerHeight );

		// use ref as a mount point of the Three.js scene instead of the document.body
		this.mount.appendChild( this.renderer.domElement );

		if (this.state.modeType === 'freeModeData') 
			this.generateSolarSystem()
	}

	/**
	 * Generates a solarsystem for free version
	 */
	generateSolarSystem() {
		solarSystem.forEach((obj) => {
			const solarSysObject = createSpaceObject(obj.radius, obj.mass, obj.color, obj.name, document.createElement('canvas'), obj.type, this.state.scaleFactor)
			solarSysObject.setPosition(obj.position[0], obj.position[1], obj.position[2])

			this.state.spaceObjects.push(solarSysObject)
		})
		this.calculateSpaceObjectData()
	}

	/**
	 * calculates the speed, distance, and gravitational force between all the space objects in the spaceObjects array
	 * Finally it will set the orbit and the orbit accelaration to each object
	 */
	calculateSpaceObjectData() {
		let index = 0 // index of the current element in the space objects array of the state

		this.state.spaceObjects.forEach((obj) => {
			let i = index + 1 // index of the object to start calculations from.

			while (i < this.state.spaceObjects.length) {
				const objToCalculate = this.state.spaceObjects[i]
				const distance = calculateDistance(obj.objectData.position, objToCalculate.objectData.position)
				const force = calculateGravitationalForce(obj.mass, objToCalculate.mass, distance, false)
				const speed = calculateSpeed(force, obj.mass)

				const node = new Node(objToCalculate.id, objToCalculate.name, objToCalculate.radius, distance, force, speed)
				const objToCalculateNode = new Node(obj.id, obj.name, obj.radius, distance, force, speed)
				
				obj.spaceObjectAdjecencies.insert(node)
				objToCalculate.spaceObjectAdjecencies.insert(objToCalculateNode)
				i++
			}

			obj.setSpeed()
			obj.setOrbit()
			console.log(obj.spaceObjectAdjecencies, obj.name)

			const mesh = obj.generateSpaceObject()
			this.scene.add(mesh)

			if (obj.type !== 'Star') {
				const orbitMesh = obj.genreateOrbitShape('yellow')
				this.scene.add(orbitMesh)
			}

			index ++;
		})

		this.animate()
	}

	renderScene() {
		this.renderer.render( this.scene, this.camera );
	}

	animate = () => {
		const timestamp = Date.now() * 0.0001;
		requestAnimationFrame(this.animate);

		this.state.spaceObjects.forEach((sObject) => {
			const textScaleFactor = this.state.textScaleFactor  
			const sprite = sObject.objectMesh.children[0];
			const scale = this.scaleVector.subVectors(sObject.objectMesh.position, this.camera.position).length() / textScaleFactor;

			sprite.scale.set(scale, scale, 1);
			const orbit = sObject.type === 'Star' ? 0 : sObject.objectData.orbit;
			const speed = sObject.objectData.speed;


			sObject.objectMesh.position.x = Math.cos(timestamp * speed) * orbit;
			sObject.objectMesh.position.z = Math.sin(timestamp * speed) * orbit;
		});

		this.controls.update()
		this.renderScene();
	};

	render() {
		return (
			<div className="App">
				<div ref={ref => (this.mount = ref)} style={{  width: '100vw', height: '100vh', overflow: 'hidden' }}/>
				<div id="settings">
					<Input disabled value="hello"/>
					<Select  options={["hello", "hi", "ok"]}/>
					<br />
					<CloseButton radius={50} style={{ position: "relative", left: '50%'}} showHideText />
					<Text />
					<div id="choose-mode"></div>
					<CurrentMode mode={'Solar System'} />
					<Scale />
					<br />
					<ChooseMode />
				</div>
				<AlertMessage message={'Press Esc to bring out the menu'} />
				<div style={{ width: '60%', backgroundColor: 'white', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', display: 'flex'}} >
					<Plan planTitle={'Standard'} monthlyPrice={0} discription={STANDARD_PLAN_DISCRIPTION} planOffers={[`${SOLAR_SYSTEM}`]} />
					<Plan planTitle={'Standard'} monthlyPrice={0} discription={STANDARD_PLAN_DISCRIPTION} planOffers={[`${SOLAR_SYSTEM}`]} />
				</div>
				
				
			</div>
		);
	}
}

export default App;
