class Node {
    constructor(coordinates) {
        this.coordinates = coordinates;
        this.children = [];

        // Knight's possible moves (L-shaped)
        this.moves = [
            [1, -2], [-1, -2], [1, 2], [-1, 2],
            [-2, 1], [-2, -1], [2, 1], [2, -1],
        ];
    }
}

function addArrays(arr1, arr2) {
    return [arr1[0] + arr2[0], arr1[1] + arr2[1]];
}

function inRange(arr) {
    return arr[0] >= 0 && arr[0] <= 7 && arr[1] >= 0 && arr[1] <= 7;
}

function areEqual(coord1, coord2) {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
}

function findValidMoves(prevCoordinates, moves) {
    return moves.map(move => addArrays(prevCoordinates, move)).filter(inRange);
}

function createNode(currentCoordinates, targetCoordinates) {
    // Initialize the root node with the starting coordinates
    const root = new Node(currentCoordinates);

    // Queue to keep track of nodes to be processed
    const queue = [{ node: root, coordinates: currentCoordinates }];
    const visited = new Set();

    // Mark the starting coordinates as visited
    visited.add(currentCoordinates.join(','));

    // Process the queue while it's not empty
    while (queue.length > 0) {
        // Dequeue the front node from the queue
        const { node, coordinates } = queue.shift();

        // If we've reached the target coordinates, stop further processing
        if (areEqual(coordinates, targetCoordinates)) {
            return root; // Exit the loop and return the tree
        }

        // Find valid moves from the current node's coordinates
        const validMoves = findValidMoves(coordinates, node.moves);

        // For each valid move, create a child node and enqueue it for processing
        validMoves.forEach(move => {
            // Check if the move has already been visited
            if (!visited.has(move.join(','))) {
                const childNode = new Node(move);
                node.children.push(childNode);

                // Enqueue the child node and its coordinates for further processing
                queue.push({ node: childNode, coordinates: move });

                // Mark the move as visited
                visited.add(move.join(','));
            }
        });
    }

    return root; // Return the root after the loop finishes
}

const prettyPrint = (node, prefix = "", isLast = true) => {
    if (node === null) {
        return;
    }

    // Print current node
    console.log(`${prefix}${isLast ? "└── " : "├── "}[${node.coordinates.join(", ")}]`);

    // Iterate over the children of the current node
    const childCount = node.children.length;
    node.children.forEach((child, index) => {
        // Recursively print each child
        const isChildLast = index === childCount - 1;
        prettyPrint(child, `${prefix}${isLast ? "    " : "│   "}`, isChildLast);
    });
};

// Example usage
const startCoordinates = [0, 0];
const targetCoordinates = [0, 1];
const rootNode = createNode(startCoordinates, targetCoordinates);

// Print the tree
prettyPrint(rootNode);
