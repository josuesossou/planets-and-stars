import * as  THREE from 'three'
import { v4 as uuidv4 } from 'uuid';
import MaxHeap from '../util/heap'

export default class SpaceObject {
    /**
     * Generates a space object. Could be a star or a planet; even moons.
     * 1 au = 11,727  pixels
     * @param {string} id the id of the planet
     * @param {number} radius the radius of the planet
     * @param {number} mass the mass of the planet
     * @param {string | number | THREE.Color} color the color of the planet
     * @param {string} name the name of the planet
     * @param {element} canvas The canvas on which to fill the name of the planet. it can be null
     * @param {String} type The type of space object, wether it is a planet or star
     * @param {boolean} ignoreDistance ignore the distance between the planet and the sun
     */
    constructor(radius, mass, color, name, canvas, type, scaleFactor, ignoreDistance) {
        // if (!scaleFactor || scaleFactor < 1) scaleFactor = 1

        this.id = uuidv4()
        this.objectData = {
            position: [],
            orbit: 0,
            speed: 0
        } // example {orbit: 10, speed: 10, position: [px,py,pz]}
        this.radius = ignoreDistance ? radius : radius * scaleFactor
        this.mass = mass
        this.color = color
        this.name = name
        this.spaceObjectAdjecencies = new MaxHeap() // contains the distance, force, and id of any other space object that has been added
        this.canvas = canvas
        this.objectMesh = null // holds the planet or star object
        this.orbitMesh = null // holds the orbit object
        this.type  = type
        this.scaleFactor = scaleFactor
        this.ignoreDistance = ignoreDistance
    }

    /**
     * @return Three.js 3Dobject representing the planet
     */
    generateSpaceObject() {
        this.objectMesh = this.planetShape() // points to the Threejs mesh for the generated planet

        return this.objectMesh;
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

        mesh.add(this.objectName())
        return mesh
    }

    /**
     * @return the sprite material of the planet name, this can be null
     */
    objectName() {
        this.canvas.width = 256;
        this.canvas.height = 256;

        const ctx = this.canvas.getContext("2d")
        ctx.font = "44pt Arial"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText(this.name, 128, 128)

        const text = new THREE.Texture(this.canvas)
        text.needsUpdate = true

        const spriteMaterial = new THREE.SpriteMaterial({ map: text })
        const sprite = new THREE.Sprite(spriteMaterial)
        sprite.position.y = this.radius + 1

        return sprite
    }

    genreateOrbitShape(orbitLineColor) {
        const shape = new THREE.Shape();
        shape.moveTo(this.objectData.orbit, 0);
        shape.absarc(0, 0, this.objectData.orbit, 0, 2 * Math.PI, false);

        const spacedPoints = shape.createSpacedPointsGeometry(128);
        spacedPoints.rotateX(THREE.Math.degToRad(-90));

        this.orbitMesh = new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
            color: orbitLineColor || this.color || Math.random() * 0xffffff
        }));

        return this.orbitMesh
    }

    /**
     * @param {number} px position in x-axis
     * @param {number} py position in y-axis
     * @param {number} pz position in z-axis
     */
    setPosition(px,py,pz) {
        this.objectData.position = [px,py,pz];
    }

    /**
     *  the orbital radius. the distance between the object and the object it is orbiting
     */
    setOrbit() {
        const maxObj = this.spaceObjectAdjecencies.getMax()
        this.objectData.orbit = (maxObj.distance * 11727 * this.scaleFactor) + maxObj.radius
    }

    /**
     * the orbital speed based on the planet or star (spaceObject) that have the max force. will be zero if there is no other space object
     */
    setSpeed() {
        const maxObj = this.spaceObjectAdjecencies.getMax()
        this.objectData.speed  = maxObj.speed * 10
    }

    /**
     * Set the pososition of the space object (either a star or a planet) to its center orbital
     */
    setMeshPosition() {
        if (this.objectData.position.length === 0) return

        this.objectMesh.position.x = this.objectData.position[0]
        this.objectMesh.position.y = this.objectData.position[1]
        this.objectMesh.position.z = this.objectData.position[2]
    }

    /**
     * @return the name of the space object with greatest gravitational force
     */
    spaceObjectWithGreatestForce() {
        return this.spaceObjectAdjecencies.getMax().name || 'Unknown'
    }
}