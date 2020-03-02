import React from 'react';
import {useExperiments} from '../services/useExperiment';
import App from './App';
import {Summary} from './Summary';
import {fibonacci} from '../services/fibonacci';
import {createStore} from '../redux/createStore';
import {Text} from 'react-native';

function doSomeWork(n) {
  const array = [...Array(n).keys()].map(() => Math.ceil(n * Math.random()));
  array.sort();

  console.log(array);
}

function process() {
  return fibonacci(20);
}

window.fibonacci = fibonacci;

function getFancyProcess(n) {
  return () => fibonacci(n);
}

const experiments = [
  {
    logicsCount: 100,
    epicsCount: 0,
    process: getFancyProcess(10),
  },
  {
    logicsCount: 100,
    epicsCount: 0,
    process: getFancyProcess(20),
  },
  {
    logicsCount: 100,
    epicsCount: 0,
    process: getFancyProcess(25),
  },
  {
    logicsCount: 100,
    epicsCount: 0,
    process,
  },
  {
    logicsCount: 150,
    epicsCount: 0,
    process,
  },
  {
    logicsCount: 200,
    epicsCount: 0,
    process,
  },
  {
    logicsCount: 300,
    epicsCount: 0,
    process,
  },
  {
    logicsCount: 0,
    epicsCount: 100,
    process,
  },
  {
    logicsCount: 0,
    epicsCount: 150,
    process,
  },
  {
    logicsCount: 0,
    epicsCount: 200,
    process,
  },
  {
    logicsCount: 0,
    epicsCount: 300,
    process,
  },
  {
    logicsCount: 100,
    epicsCount: 0,
    process,
  },
  {
    logicsCount: 80,
    epicsCount: 20,
    process,
  },
  {
    logicsCount: 60,
    epicsCount: 40,
    process,
  },
  {
    logicsCount: 40,
    epicsCount: 60,
    process,
  },
  {
    logicsCount: 20,
    epicsCount: 80,
    process,
  },
  {
    logicsCount: 0,
    epicsCount: 100,
    process,
  },
];

function performExperiments() {
  const summary = [];

  console.log('...experiments', experiments.length);

  experiments.forEach((config, index) => {
    const store = createStore(config, index, results =>
      summary.push({config, results}),
    );

    // store.dispatch({type: 'trigger-logic-0'});
    store.dispatch({type: 'trigger-epic-0'});
  });

  return summary;
}

export function Experiment() {
  const summary = performExperiments();

  return <Summary summary={summary} />;
}
