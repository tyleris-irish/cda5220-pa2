// Number of sweep counts
// TODO (Exercise 3-1): Choose an appropriate value!
let P = 1000;

// Number of elements in your trace
let K = 5 * 1000 / P; 

// Array of length K with your trace's values
let T;

// Value of performance.now() when you started recording your trace
let start;

function record() {
  // Create empty array for saving trace values
  T = new Array(K);

  // Fill array with -1 so we can be sure memory is allocated
  T.fill(-1, 0, T.length);

  // Save start timestamp
  start = performance.now();

  const N = 200000;

  // For each of K slots, count how many full sweeps complete within P ms.
  for (let k = 0; k < K; k++) {
    const slotEnd = start + (k + 1) * P;
    let sweeps = 0;
    while (performance.now() < slotEnd) {
      let sum = 0;
      for (let i = 0; i < N; i++) sum += i;
      sweeps++;
    }
    T[k] = sweeps;
  }

  // Once done recording, send result to main thread
  postMessage(JSON.stringify(T));
}

// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
  if (e.data.type === "start") {
    setTimeout(record, 0);
  }
};
