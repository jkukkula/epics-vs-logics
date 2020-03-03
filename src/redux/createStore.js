import {applyMiddleware, createStore as createStoreBase} from 'redux';
import {createLogics} from './createLogics';
import {createLogicMiddleware} from 'redux-logic';
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import {createActionMonitorMiddleware, createStackSizeMonitorMiddleware, awat} from './monitor-middleware';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {createEpics} from './createEpics';
import {getStackSize} from '../services/measurments';

function reducer(state = {count: 0}, action) {
  console.log(action);
  return {count: state.count + 1};
}

export function createStore(
  {logicsCount, epicsCount, process, reverse},
  configIndex,
  onDispatchDone,
) {
  let storeCreate = Date.now();
  let origProcess = process;


  process = () => {
    origProcess();
    let duration = Date.now() - storeCreate;
    let stackSize = getStackSize();
    onDispatchDone({
      duration,
      stackSize
    });
    return true;
  };

  const logics = createLogics(logicsCount, process, reverse);
  const epics = createEpics(epicsCount, process, reverse);

  // const monitorMiddleware = createActionMonitorMiddleware(
  //   `exp. #${configIndex}`,
  //   durationMeasured => {
  //     let duration = durationMeasured;
  //   },
  // );

  const middlewares = [];

  // middlewares.push(monitorMiddleware);

  if (logics) {
    const logicMiddleware = createLogicMiddleware(logics);
    middlewares.push(logicMiddleware);
  }

  let epicsMiddleware;
  if (epics) {
    epicsMiddleware = createEpicMiddleware();
    middlewares.push(epicsMiddleware);
  }



  // const stackSizeMonitorMiddleware = createStackSizeMonitorMiddleware(
  //   stackSize => {
  //     // onDispatchDone({
  //     //   duration: -1,
  //     //   stackSize,
  //     // });
  //   },
  //
  // );
  // middlewares.push(stackSizeMonitorMiddleware);


  middlewares.push(awat(()=>{
    console.log("awat dispatched")
    // onDispatchDone({duration:"hahaa", stackSize:"hihii"})
  }));

  const middlewaresEnhancer = applyMiddleware(...middlewares);

  const store = createStoreBase(reducer, undefined, middlewaresEnhancer);

  if (epics) {
    epicsMiddleware.run(combineEpics(...epics));
  }
  return store;
}
