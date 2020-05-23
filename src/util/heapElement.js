export default class Node {
    constructor(spaceObjectId, name, radius, distance, gravitationalForce, speed) {
        this.objectId = spaceObjectId
        this.distance = distance || 0
        this.gravitationalForce = gravitationalForce || 0
        this.speed = speed || 0
        this.name = name || null
        this.radius = radius
    }

    setGravitationalForce(force) {
        this.gravitationalForce = force
    }

    setDistance(distance) {
        this.distance = distance
    }

    setSpeed(speed) {
        this.speed = speed
    }

    setName(name) {
        this.name = name
    }
}