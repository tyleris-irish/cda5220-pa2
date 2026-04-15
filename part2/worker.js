/////////////////////////////////////////////////////////////////////////////////////////////////
// AI Assisted Code - Prompt: "(Exercise 2-1): Record data for 5 seconds and save values to T."//
/////////////////////////////////////////////////////////////////////////////////////////////////
let P = 50;
//////////////////////////
// AI Assisted Code Ends//
//////////////////////////

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

  /////////////////////////////////////////////////////////////////////////////////////////////////
  // AI Assisted Code - Prompt: "(Exercise 2-1): Record data for 5 seconds and save values to T."//
  /////////////////////////////////////////////////////////////////////////////////////////////////

  // Large array used to occupy the LLC. With LINE_SIZE=16 (128-byte stride)
  // and N=200000, this touches ~25 MB — enough to evict a typical L3 cache.
  const LINE_SIZE = 16;
  const N = 200000;
  const M = new Array(N * LINE_SIZE).fill(0);
  for (let i = 0; i < N; i++) M[i * LINE_SIZE] = i; // pre-warm pages

  // For each of K slots, count how many full sweeps complete within P ms.
  // When a victim page is loading it evicts our array, reducing the sweep count.
  for (let k = 0; k < K; k++) {
    const slotEnd = start + (k + 1) * P;
    let sweeps = 0;
    while (performance.now() < slotEnd) {
      let sum = 0;
      for (let i = 0; i < N; i++) sum += M[i * LINE_SIZE];
      sweeps++;
    }
    T[k] = sweeps;
  }

  //////////////////////////
  // AI Assisted Code Ends//
  //////////////////////////

  // Once done recording, send result to main thread
  postMessage(JSON.stringify(T));
}

// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
  if (e.data.type === "start") {
    setTimeout(record, 0);
  }
};
