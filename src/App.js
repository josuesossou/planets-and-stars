import React from 'react';
import * as THREE from "three";
import Node from '././util/heapElement'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSpaceObject, calculateDistance, calculateGravitationalForce, calculateSpeed } from './util/helpers'
import { solarSystem } from './data/data'
import { AlertMessage, ShowMenuButton } from './components/Components'
import { Auth, Menu } from './pages/Pages'
import { ALERT_MESSAGE, SOLAR_SYSTEM, CREATOR, SIMULATION } from './styles/strings'

import './App.css'

/**
 * Note: Space Objects is reffering to stars and planets
 */
class App extends React.Component {
	constructor(props) {
		super(props)
		/**
		 * There is going to be three modes, free(only shows our solar system), simulating users own solar sytems, and gravitational force calculation and simulation --> refers to work space mode
		 */
		this.state = {
			modeType: SOLAR_SYSTEM,
			freeModeData: {
				
			},
			createSolarSytemModeData: { // will only allow one star to be created

			},
			workSpaceModeData: {

			},
			spaceObjects: [], // array of space objects
			scaleFactor: 0.001,
			textScaleFactor: 10, 
			showAuth: false,
			showMenu: false,
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

		if (this.state.modeType === SOLAR_SYSTEM) 
			this.generateSolarSystem()

			document.addEventListener('keypress', this.keyAction)
	}

	keyAction = (e) => {
		if (e.keyCode === 109) {
			this.setState((prev) => ({ showMenu: !prev.showMenu }))
		}
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
		const timestamp = ((Date.now()) / (2800000 * 360)) * 10e-3;
		requestAnimationFrame(this.animate);
		// console.log((Date.now() * 24) / (280000 * 360))

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

	/**
	 * remove all objects from the scene
	 */
	removeAllFromScene = async (mode) => {
		this.state.spaceObjects.forEach((sObject) => {
			this.scene.remove(sObject.objectMesh)
			this.scene.remove(sObject.orbitMesh)
		})
		this.setState(() => ({ modeType: mode, spaceObjects: [] }))
	}

	/**
	 * changing the current mode that is being rendered
	 */
	changeAppModeState = () => {
		console.log(this.state.modeType)
		switch (this.state.modeType) {
			case SOLAR_SYSTEM:
				this.generateSolarSystem()
				break;
		
			default:
				break;
		}
	}

	/**
	 * Set Mode type
	 */
	setMode = (mode) => {
		/// check to see if user is eligible to change to the modeType. If  user  is subscribed, change to the mode
		if (mode !== SOLAR_SYSTEM) {
			// check if the use has premium permissions
			this.setState({ showAuth: true, showMenu: false })
			return
		}
		this.removeAllFromScene(mode).then(() => {
			this.changeAppModeState()
		})
	}

	render() {
		return (
			<div className="App">
				<div ref={ref => (this.mount = ref)} style={{  width: '100vw', height: '100vh', overflow: 'hidden' }}/>

				<AlertMessage message={ALERT_MESSAGE} />
				
				<Auth show={this.state.showAuth} changeShow={(show) => this.setState({ showAuth: show })} /> 
				
				<Menu 
					chooseMode={this.setMode} 
					changeShow={(show) => this.setState({ showMenu: false })} 
					applyMode={this.changeAppModeState} 
					show={this.state.showMenu}
				/>

				{
					!this.state.showMenu ?
						<ShowMenuButton onClick={() => this.setState({ showMenu: true })} /> : null
				}
			</div>
		);
	}
}

export default App;
