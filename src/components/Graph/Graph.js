const vertices = require("./graph.json");
const i2n = require("./id_to_name.json");
const n2i = require("./name_to_id.json");
const vert_objs = require("./vert_objs.json");
const fuzzysort = require("fuzzysort");

class Graph {
  constructor(vertices, i2n, n2i, vert_objs) {
    this.vertices = vertices;
    this.id_to_name = i2n;
    this.name_to_id = n2i;
    this.vert_objs = vert_objs;
    this.names = [];
    this.players = [];
    this.size = 0;

    for (const name in n2i) {
      this.names.push(name);
    }

    this.size = this.names.length;

    for (const id in vert_objs) {
      if (vert_objs[id].isPlayer) {
        this.players.push(vert_objs[id].searchName);
      }
    }
  }

  // TESTING: Split the path function so that it doesn't block the UI, testing some techniques here
  uiBlockingTest(sourceId, targetId, graphReturnFunc, graphCallback) {
    const visited = []; // Tracks visited vertices
    const queue = [[sourceId]]; // Vertices to visit
    const verts = this.vertices;
    const maxTimePerChunk = 50; // Tested to be a pretty good result

    function now() {
      return new Date().getTime();
    }

    if (!verts[sourceId] || !verts[targetId]) {
      graphReturnFunc([]);
      return;
    }

    // Edge case where they're the same
    if (sourceId === targetId) {
      graphReturnFunc([sourceId]);
      return;
    }

    function doChunk() {
      const startTime = now();
      while (queue.length > 0 && now() - startTime <= maxTimePerChunk) {
        let path = queue.shift();
        let node = path[path.length - 1];
        if (!visited.includes(node)) {
          let neighbors = verts[node];
          // Loop to iterate over the neighbors of the node
          for (const neighbor of neighbors) {
            let newPath = path.slice();
            newPath.push(neighbor);
            queue.push(newPath);
            // Check if the neighbor node is the goal
            if (neighbor === targetId) {
              graphReturnFunc(newPath);
              return;
            }
          }
          visited.push(node);
        }
      }
      if (queue.length > 0) {
        const mounted = graphCallback(visited.length);
        if (!mounted) {
          return;
        }
        setTimeout(doChunk, 0);
      } else {
        graphReturnFunc([]);
        return;
      }
    }
    doChunk();
  }

  // Return a random item (either name or player)
  randomName(category) {
    if (category === "players") {
      return this.players[Math.floor(Math.random() * this.players.length)];
    } else if (category === "teams") {
      return "Not yet implemented";
    } else if (category === "all") {
      return this.names[Math.floor(Math.random() * this.names.length)];
    } else {
      return "Error";
    }
  }

  // Returns the closest matching names of all
  bestNames(input, coll, amount = 20) {
    let collection;
    switch (coll) {
      case "all":
        collection = this.names;
        break;
      case "players":
        collection = this.players;
        break;
      case "teams":
        collection = this.teams;
        break;
      default:
        collection = [];
    }

    const inColl = collection.includes(input);

    const res = fuzzysort.go(input, collection, {
      limit: amount,
      threshold: inColl ? -100 : -Infinity,
      allowTypo: true,
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

    // Remove the sourceId from the teammates
    const idx = teammates.indexOf(sourceId);
    if (idx > -1) {
      teammates.splice(idx, 1);
    }
    return teammates;
  }

  path(sourceId, targetId) {
    // Handle case where either of them doesn't exist in the graph
    if (
      !sourceId ||
      !targetId ||
      !vertices.includes(sourceId) ||
      !vertices.includes(targetId)
    ) {
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

const g = new Graph(vertices, i2n, n2i, vert_objs);

export default g;
