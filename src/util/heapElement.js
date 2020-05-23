export default class Node {
    constructor(spaceObjectId) {
        this.objectId = spaceObjectId
        this.distance = 0
        this.gravitationalForce = 0
    }

    setGravitationalForce(force) {
        this.gravitationalForce = force
    }

    setDistance(distance) {
        this.distance = distance
    }
}