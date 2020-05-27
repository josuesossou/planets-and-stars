import SpaceObject from '../model/spaceObject'

/**
 * @return a planet object
 * @param {number} radius the radius of the planet
 * @param {number} mass the mass of the planet
 * @param {string | number | THREE.Color} color the color of the planet}
 * @param {string} name the name of the planet
 * @param {element} canvas The canvas on which to fill the name of the planet. it can be null
 */
export const createSpaceObject = (radius, mass, color, name, canvas, type, scaleFactor) => {
    return new SpaceObject(radius, mass, color, name, canvas, type, scaleFactor)
}

/**
 * Calculates the distance between two space objects. distance = sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2)
 * @param {number[]} coords1 coordinate one. set of coordinates [px,py,pz]
 * @param {number[]} coords2 coordinate two. set of coordinates [px,py,pz]
 * 
 * coordinates are in AU. in this program, 1 AU = ?
 */
export const calculateDistance = (coords1, coords2) => {
    const xlength = coords1[0] - coords2[0]
    const ylength = coords1[1] - coords2[1]
    const zlength = coords1[2] - coords2[2]

    const distanceSquared = Math.pow(xlength, 2) + Math.pow(ylength, 2) + Math.pow(zlength, 2)

    if (distanceSquared >= Number.MAX_SAFE_INTEGER) return -1

    return Math.sqrt(distanceSquared * 33979)
}

/**
 * Calculates the force of gravity on an object using Force = GM1M2/d^2 formula
 * @return a positive number if the masses and distance are nonzero positive numbers, otherwise returns -1
 * @param {number} mass1 the mass of the planet one
 * @param {number} mass2 the mass of the planet two
 * @param {number} distance the mass of the planet one
 * @param {boolean} useGConstant the gravitational constance in the in the Newtons' formula Force = GM1M2/d^2
 */
export const calculateGravitationalForce = (mass1, mass2, distance, useGConstant) => {
    const gConstant = useGConstant ? 6.67408e-11 : 1
    const mass = gConstant * mass1 * mass2

    if (distance <= 0 || mass <= 0 ) return -1

    return mass / Math.pow(distance, 2)

}
/**
 * Calculates the orbital speed of the object. formula accelaration = F/m
 * @return a positive number if force and mass are nonzero positive numbers, otherwise returns -1
 */
export const calculateSpeed = (force, mass) => {
    if (force <= 0 || mass <= 0) return -1

    return force / mass
}