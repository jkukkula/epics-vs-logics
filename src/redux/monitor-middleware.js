import {getStackSize} from '../services/measurments';

export function createActionMonitorMiddleware(label, onMeasure) {
  return _store => next => action => {
    const fullLabel = `${action.type} ${label}`;

    const startMark = `${fullLabel} start`;
    const endMark = `${fullLabel} end`;
    const markLabel = `${fullLabel}`;

    const start = new Date();

    // performance.mark(startMark);

    const result = next(action);

    // performance.mark(endMark);
    // performance.measure(markLabel, startMark, endMark);

    const end = new Date();

    onMeasure(end - start);

    // performance.clearMeasures();

    return result;
  };
}

export function createStackSizeMonitorMiddleware(onStackSize) {
  return _store => next => action => {
    const result = next(action);

    onStackSize(getStackSize());

    return result;
  };
}
