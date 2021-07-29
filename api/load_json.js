var json = require("./graph.json");

class Graph {
  constructor(vertices) {
    this.vertices = vertices;
  }

  path(sourceId, targetId) {
    // Edge case where they're the same
    if (sourceId == targetId) {
      return [sourceId];
    }

    const visited = []; // Tracks visited vertices
    const queue = [[sourceId]]; // Vertices to visit

    while (queue.length != 0) {
      let path = queue.pop(0);
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
          if (neighbor == targetId) {
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

const g = new Graph(json);

console.log(g.vertices["HerbJu00"]);
console.log(g.path("HerbJu00", "AlleKe00"));

function path(sourceId, targetId) {
  // Edge case where they're the same
  if (sourceId == targetId) {
    return [sourceId];
  }

  const visited = []; // Tracks visited vertices
  const queue = [[sourceId]]; // Vertices to visit

  while (queue.length != 0) {
    let path = queue.pop(0);
    let node = path[path.length - 1];

    // If the node was visited already, can skip
    if (!visited.includes(node)) {
      let neighbors = json[node];

      // Loop to iterate over the neighbors of the node
      for (const neighbor of neighbors) {
        let newPath = path.slice();
        newPath.push(neighbor);
        queue.push(newPath);

        // Check if the neighbor node is the goal
        if (neighbor == targetId) {
          return newPath;
        }
      }
      visited.push(node);
    }
  }
  // Condition when the nodes are not connected
  return [];
}
