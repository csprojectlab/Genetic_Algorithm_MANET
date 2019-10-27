/**
 * Function to calculate number of cells in yellow box. 
 */
function findNumberOfCells () {
    let totalWidth = (yellowBox.x + yellowBox.width) - yellowBox.x;
    let totalHeight = (yellowBox.y + yellowBox.height) - yellowBox.y;
    let boxesEachRow = totalWidth / RESOLUTION;
    let boxesEachColumn = totalHeight / RESOLUTION;
    return boxesEachRow * boxesEachColumn;
}