let isLogging = false;
let precision;
let i;

// https://github.com/paulirish/memory-stats.js/blob/master/memory-stats.js
function bytesToSize(bytes, nFractDigit) {
  let gc = false;
  if (bytes === 0) {
    return 0;
  }
  if (bytes < 0) {
    bytes = Math.abs(bytes);
    gc = true;
  }

  nFractDigit = nFractDigit !== undefined ? nFractDigit : 0;
  precision = Math.pow(10, nFractDigit);
  i = Math.floor(Math.log(bytes) / Math.log(1024));
  let result = Math.round(bytes * precision / Math.pow(1024, i)) / precision;
  if (gc) {
    result = result * -1;
  }
  return result;
}

function log(id, msg, value) {
  if (isLogging) {
    console.log(id, msg, value);
  }
}


window._profiling = window._profiling || {
  tests: [],
  lastUsedHeap: 0,
  delta: 0
};

export function profile() {
  window._profiling.started = window._profiling.started || QUnit.config.started;

  const testName = QUnit.config.current.module.name;
  const testId = QUnit.config.current.testId;
  const testModule = testName + testId;

  const formattedHeap = bytesToSize(window._profiling.lastUsedHeap, 2);
  const formattedDelta = bytesToSize(window._profiling.delta, 2);

  const testStart = QUnit.config.current.started;
  const timePassed = testStart - window._profiling.started;

  if (isLogging) {
    console.group(testModule);
    console.timeStamp(testModule, "startApp");
  }

  if (window.gc) {
    // window.gc();
    window._profiling.delta = window.performance.memory.usedJSHeapSize - window._profiling.lastUsedHeap;
    window._profiling.lastUsedHeap = window.performance.memory.usedJSHeapSize;

    window._profiling.tests.push({
      id: testId,
      name: testName,
      heapDelta: formattedDelta,
      heapSize: formattedHeap,
      time: timePassed,
    });

    log(testModule, "heap: ", formattedHeap);
    log(testModule, "delta: ", formattedDelta);
  }

  log(testModule, "# time:", timePassed);

  console.groupEnd();
}
