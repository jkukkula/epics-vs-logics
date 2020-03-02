import {applyMiddleware, createStore as createStoreBase} from 'redux';
import {createLogics} from './createLogics';
import {createLogicMiddleware} from 'redux-logic';
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import {
  createActionMonitorMiddleware,
  createStackSizeMonitorMiddleware,
} from './monitor-middleware';
import {createEpicMiddleware, combineEpics} from 'redux-observable';
import {createEpics} from './createEpics';

function reducer(state = {count: 0}, action) {
  console.log(action);
  return {count: state.count + 1};
}

export function createStore(
  {logicsCount, epicsCount, process},
  configIndex,
  onDispatchDone,
) {
  const logics = createLogics(logicsCount, process);
  const epics = createEpics(epicsCount, process);

  let duration;

  const monitorMiddleware = createActionMonitorMiddleware(
    `exp. #${configIndex}`,
    durationMeasured => {
      duration = durationMeasured;
    },
  );

  const middlewares = [];

  middlewares.push(monitorMiddleware);

  if (logics) {
    const logicMiddleware = createLogicMiddleware(logics);
    middlewares.push(logicMiddleware);
  }

  let epicsMiddleware;
  if (epics) {
    epicsMiddleware = createEpicMiddleware();
    middlewares.push(epicsMiddleware);
  }

  const stackSizeMonitorMiddleware = createStackSizeMonitorMiddleware(
    stackSize => {
      onDispatchDone({
        duration,
        stackSize,
      });
    },
  );
  middlewares.push(stackSizeMonitorMiddleware);

  const middlewaresEnhancer = applyMiddleware(...middlewares);

  const store = createStoreBase(reducer, undefined, middlewaresEnhancer);

  if (epics) {
    epicsMiddleware.run(combineEpics(...epics));
  }

  return store;
}
