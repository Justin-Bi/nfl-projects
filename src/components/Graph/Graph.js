const vertices = require("./graph.json");
const i2n = require("./id_to_name.json");
const n2i = require("./name_to_id.json");
const fuzzysort = require("fuzzysort");

class Graph {
  constructor(vertices, i2n, n2i) {
    this.vertices = vertices;
    this.id_to_name = i2n;
    this.name_to_id = n2i;
    this.names = [];

    for (const name in n2i) {
      this.names.push(name);
    }
  }

  bestNames(input, amount = 20) {
    const res = fuzzysort.go(input, this.names, {
      limit: amount,
    });
    const arr = [];
    for (const r of res) {
      arr.push(r.target);
    }
    return arr;
  }

  getTeammates(sourceId) {
    // Handle case where either of them doesn't exist in the graph
    if (!sourceId) {
      return [];
    }

    const teammates = [];
    const visited = []; // Tracks visited vertices
    const queue = [[sourceId]]; // Vertices to visit

    while (queue.length > 0) {
      let path = queue.shift();
      let node = path[path.length - 1];

      // If the node was visited already, can skip
      // Might not need this for the teammate one
      if (!visited.includes(node)) {
        let neighbors = this.vertices[node];

        // Case where two nodes are already in the path, the original player and the team. Means the third node
        // about to be added must be a teammate
        if (path.length === 2) {
          for (const neighbor of neighbors) {
            if (!teammates.includes(neighbor)) {
              teammates.push(neighbor);
            }
          }
        } else {
          // Loop to iterate over the neighbors of the node
          for (const neighbor of neighbors) {
            let newPath = path.slice();
            newPath.push(neighbor);
            queue.push(newPath);
          }
          visited.push(node);
        }
      }
    }
    // Condition when the nodes are not connected
    return teammates;
  }

  path(sourceId, targetId) {
    // Handle case where either of them doesn't exist in the graph
    if (!sourceId || !targetId) {
      return [];
    }

    // Edge case where they're the same
    if (sourceId === targetId) {
      return [sourceId];
    }

    const visited = []; // Tracks visited vertices
    const queue = [[sourceId]]; // Vertices to visit

    while (queue.length > 0) {
      let path = queue.shift();
      let node = path[path.length - 1];

      // If the node was visited already, can skip
      if (!visited.includes(node)) {
        let neighbors = this.vertices[node];

        // Loop to iterate over the neighbors of the node
        for (const neighbor of neighbors) {
          let newPath = path.slice();
          newPath.push(neighbor);
          queue.push(newPath);

          // Check if the neighbor node is the goal
          if (neighbor === targetId) {
            return newPath;
          }
        }
        visited.push(node);
      }
    }
    // Condition when the nodes are not connected
    return [];
  }
}

const g = new Graph(vertices, i2n, n2i);

export default g;
