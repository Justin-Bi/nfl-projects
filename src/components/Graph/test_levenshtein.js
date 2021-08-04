let n2i = require("./name_to_id.json");
const fuzzysort = require("fuzzysort");

// console.log(fuzzysort);
const nameArr = [];
for (const name in n2i) {
  nameArr.push(name);
}

const res = fuzzysort.go("dry", nameArr, {
  threshold: -Infinity, // Don't return matches worse than this (higher is faster)
  limit: 20, // Don't return more results than this (lower is faster)
  allowTypo: true, // Allwos a snigle transpoes (false is faster)

  // key: null, // For when targets are objects (see its example usage)
  // keys: null, // For when targets are objects (see its example usage)
  // scoreFn: null, // For use with `keys` (see its example usage)
});

for (const r of res) {
  console.log(r.score);
  console.log(r.target);
  // console.log(r.target);
}
