
const freePath = 0;
const wall = 1;
const ghost = 2;
const pacman = 3;

function calculateDistance(mat) {
    const pacPoint = findPacPoint(mat);
    const ghostPointsArray = findGhostPoints(mat);
    const res = [];
    ghostPointsArray.forEach(ghost => {
        const tempMat = JSON.parse(JSON.stringify(mat))
        const dis = findDistance(pacPoint, ghost, mat, tempMat)
        res.push({x: ghost.x, y:ghost.y, dis})
    });
    const sortRes = res.sort((a,b) => {
        return a.dis - b.dis
    })
    console.log(sortRes);
}

/**
 * this method calculates the distance between the pacman point and the ghost point
 * @param {*} pacPoint pacman point
 * @param {*} ghost current ghost point
 * @param {*} mat
 * @param {*} tempMat dipcopy of the mat
 * @return the distance of pacman from the ghost
 */
function findDistance(pacPoint, ghostPoint, mat, tempMat) {
    if(!isValid(mat,pacPoint.x,pacPoint.y)) return Infinity;
    if (tempMat[pacPoint.x][pacPoint.y] === -1) return Infinity;
    if (mat[pacPoint.x][pacPoint.y] === wall) return Infinity;
    if(pacPoint.x === ghostPoint.x && pacPoint.y === ghostPoint.y) {
        return 0
    }
    tempMat[pacPoint.x][pacPoint.y] = -1
    const disUp = 1 + findDistance({ x: pacPoint.x - 1, y: pacPoint.y }, ghostPoint, mat, tempMat)
    const disDown = 1 + findDistance({ x: pacPoint.x + 1, y: pacPoint.y }, ghostPoint, mat, tempMat)
    const disLeft = 1 + findDistance({ x: pacPoint.x, y: pacPoint.y - 1 }, ghostPoint, mat, tempMat)
    const disRight = 1 + findDistance({ x: pacPoint.x, y: pacPoint.y + 1 }, ghostPoint, mat, tempMat)
    return Math.min(disUp, disDown,disLeft,disRight)
}


/**
 * this method check the pacman location
 * @param {*} mat 
 * @returns the pacman location as point
 */
function findPacPoint(mat) {
    for(let i = 0; i< mat.length; i++) {
        for(let j = 0; j< mat[i].length; j++) {
            if (mat[i][j] === pacman) {
                return {x: i, y: j}
            }
        }
    }
}


/**
 * this method check all ghosts locations
 * @param {*} mat 
 * @returns an array of the ghosts as points
 */
function findGhostPoints(mat) {
    const ghostPoints = []
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[i].length; j++) {
            if (mat[i][j] === ghost) {
                ghostPoints.push({x: i, y: j})
            }
        }
    }
    return ghostPoints
}

/**
 * @param {*} mat given matrix
 * @param {*} row current row
 * @param {*} col current column
 * @returns true if is valid location on the matrix, false otherwise
 */
function isValid(mat,row, col) {
    return row >= 0 && row < mat.length && col >= 0 && col < mat[row].length
}


