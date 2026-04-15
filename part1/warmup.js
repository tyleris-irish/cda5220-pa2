const runs = 10;

function measureOneLine() {
  const LINE_SIZE = 16; // 128/sizeof(double) Note that js treats all numbers as double
  let result = [];

  // Fill with -1 to ensure allocation
  const M = new Array(runs * LINE_SIZE).fill(-1);

  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    let val = M[i * LINE_SIZE];
    const end = performance.now();

    result.push(end - start);
  }

  return result;
}

function measureNLines() {
  const LINE_SIZE = 16; // 128/sizeof(double) Note that js treats all numbers as double
  const NUM_CACHE_LINES = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000];
  let result = [];

  for (let n of NUM_CACHE_LINES) {;
    // Fill with -1 to ensure allocation
    const M = new Array(n * LINE_SIZE).fill(-1);

    // Touch each line to ensure it's allocated in memory
    for (let i = 0; i < n; i++) M[i * LINE_SIZE] = i;

    
    for (let i = 0; i < runs; i++) {
      const start = performance.now();
      let sum = 0;
      for (let j = 0; j < n; j++) {
        sum += M[j * LINE_SIZE];
      }
      const end = performance.now();
      result.push(end - start);
    }
  }

  return result;
}

document.getElementById(
  "exercise1-values"
).innerText = `1 Cache Line: [${measureOneLine().join(", ")}]`;

document.getElementById(
  "exercise2-values"
).innerText = `N Cache Lines: [${measureNLines().join(", ")}]`;
