import * as  THREE from 'three'
import { v4 as uuidv4 } from 'uuid';
import MaxHeap from '../util/heap'

export default class Planet {
    /**
     * @param {string} id the id of the planet
     * @param {number} radius the radius of the planet
     * @param {number} mass the mass of the planet
     * @param {string | number | THREE.Color} color the color of the planet}
     * @param {string} name the name of the planet
     * @param {element} canvas The canvas on which to fill the name of the planet. it can be null
     */
    constructor(radius, mass, color, name, canvas) {
        this.id = uuidv4()
        this.planetData = {} // example {orbit: 10, speed: 10, position: [px,py,pz]}
        this.radius = radius
        this.mass = mass
        this.color = color
        this.name = name
        this.planetAdjecencies = new MaxHeap() // contains the distance, force, and id of any other space object that has been added
        this.canvas = canvas
        this.planet = null // holds the planet object

    }

    /**
     * @return Three.js 3Dobject representing the planet
     */
    generatePlanet() {
        this.planet = this.planetShape() // points to the Threejs mesh for the generated planet

        return this.planet;
    }

    /**
     * @return the planet sphere
     */ 
    planetShape() {
        const geometry = new THREE.SphereGeometry(this.radius, 30, 30 )
        // will not accept a value of 0 as a black color, but black or 0x000000 will be black color
		const material = new THREE.MeshBasicMaterial({ color: this.color || Math.random() * 0xffffff })
        const mesh = new THREE.Mesh(geometry, material)

        if (this.canvas === null) return mesh

        mesh.add(this.planetName())
        return mesh
    }

    /**
     * @return the sprite material of the planet name, this can be null
     */
    planetName() {
        this.canvas.width = 256;
        this.canvas.height = 256;



        const ctx = this.canvas.getContext("2d")
        ctx.font = "59pt Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText(this.name, 128, 128)

        console.log(ctx)

        const text = new THREE.Texture(this.canvas)
        text.needsUpdate = true

        const spriteMaterial = new THREE.SpriteMaterial({ map: text })
        const sprite = new THREE.Sprite(spriteMaterial)
        sprite.position.y = this.radius + 1

        return sprite
    }

    genreateOrbitShape(orbitLineColor) {
        const shape = new THREE.Shape();
        shape.moveTo(this.orbit, 0);
        shape.absarc(0, 0, this.orbit, 0, 2 * Math.PI, false);

        const spacedPoints = shape.setFromPoints(128);
        spacedPoints.rotateX(THREE.Math.degToRad(-90));

        return new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
            color: orbitLineColor || this.color || Math.random() * 0xffffff
        }));
    }

    /**
     * 
     * @param {number} px position in x-axis
     * @param {number} py position in y-axis
     * @param {number} pz position in z-axis
     */
    setPosition(px,py,pz) {
        this.planetData.position = [px,py,pz];
    }

    /**
     * @param {number} orbit the orbital radius
     */
    setOrbit(orbit) {
        this.planetData.orbit = orbit;
    }

    /**
     * @param {number} speed the orbital speed based on the planet or star (spaceObject) that have the max force. will be zero if there is no other space object
     */
    setSpeed() {
        const gravitationalForce = this.planetAdjecencies.getMax().gravitationalForce
        this.planetData.speed = gravitationalForce / this.mass;
    }

    /**
     * TODO: Set the pososition of the space object (either a star or a planet) to its center orbital
     */
}