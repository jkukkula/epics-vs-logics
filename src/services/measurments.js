export function getStackSize() {
  const e = new Error('log-stack-trace');
  // Error.stackTraceLimit = Infinity;
  // Error.captureStackTrace(e);
  const stackSize = (e.stack && e.stack.split('\n').length) || 0;

  return stackSize;
}

export function withMeasuring(job) {
  return (...args) => {
    window.performance.mark('start');

    const result = job(...args);

    window.performance.mark('end');
    window.performance.measure('fibonacci', 'start', 'end');

    return result;
  };
}
