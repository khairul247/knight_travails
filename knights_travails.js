class Node {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.one = null;
        this.two = null;
        this.three = null;
        this.four = null;
        this.five = null;
        this.six = null;
        this.seven = null;
        this.eight = null;

        this.moves = [
            [1, -3], [-1, -3], [1, 3], [1, -3],
            [-3, 1], [-3, -1], [3, 1], [3, -1],
        ];
    }
}

let test= new Node ([0,0]);

function addArrays(arr1,arr2) {
    return [arr1[0] + arr2[0],arr1[1] + arr2[1]];
}

function inRange(arr) {
    return arr[0] >= 0 && arr[0] <= 8 && arr[1] >= 0 && arr[1] <= 8;
}

function assignValidMoves(validMoves){
    const moves = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

    validMoves.forEach((move,index)=> {
        this[moves[index]] = new Node (move);
    });
}

let validMoves = test.moves.map(move => addArrays(test.coordinates,move)).filter(inRange);
