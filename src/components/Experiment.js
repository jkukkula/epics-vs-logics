/* eslint-disable */
import React from 'react';
import {Summary} from './Summary';

import {createStore} from '../redux/createStore';

let count=0;

function now(){
  // if(performance) {
  //   return performance.now();
  // } else {
    return Date.now();
  // }
}

function process(a,b,c,d,e,f,g,h) {
  const start = now();
  while(now() - start < 200) {
  }
  console.log("payload complete "+(now()-start));
  console.trace();
  return true;
}

let experiments = [
  {
    logicsCount: 1,
    epicsCount: 0,
    process,
    target: "trigger-logic-0"
  },
  {
    logicsCount: 0,
    epicsCount: 1,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 10,
    epicsCount: 0,
    process,
    target: "trigger-logic-0"
  },
  {
    logicsCount: 0,
    epicsCount: 10,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 5,
    epicsCount: 5,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 50,
    epicsCount: 0,
    process,
    target: "trigger-logic-0"
  },
  {
    logicsCount: 0,
    epicsCount: 50,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 25,
    epicsCount: 25,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 100,
    epicsCount: 0,
    process,
    target: "trigger-logic-0"
  },
  {
    logicsCount: 0,
    epicsCount: 100,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 50,
    epicsCount: 50,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 200,
    epicsCount: 0,
    process,
    target: "trigger-logic-0"
  },
  {
    logicsCount: 0,
    epicsCount: 200,
    process,
    target: "trigger-epic-0"
  },
  {
    logicsCount: 100,
    epicsCount: 100,
    process,
    target: "trigger-epic-0"
  },
];



export class Experiment extends React.Component{

  constructor(props) {
    super(props);
    this.state = {summary: []};
  }
  componentDidMount(): void {
    this.performExperiments();
  }

  performExperiments() {

    let reversedExperiments = experiments.map(e=>Object.assign({}, e, {reverse:true}))
    let exps = [];
    for(let i = 0;i<reversedExperiments.length;i++) {
      exps.push(experiments[i]);
      // exps.push(experiments[i]);
      // exps.push(experiments[i]);
      // exps.push(reversedExperiments[i]);
      // exps.push(reversedExperiments[i]);
      exps.push(reversedExperiments[i]);
    }
    experiments = exps;

    console.log('...experiments', experiments.length);
    const start = now();
    let prev = now();
    let idx = 0;
    const next = () => {
      let config = experiments[idx];
      const thisStart = now();
      const store = createStore(config, idx, results => {
        console.log("payload returned");
        let thisEnd = now() - 200;
        let duration = results.duration - 200;
        results.duration = (thisEnd - thisStart) + '/' + (thisEnd - start) + (config.reverse?"r":"");
        prev = thisEnd;
        let summary = this.state.summary;
        summary.push({config, results});
        this.setState({summary});
        idx++;
        if(idx < experiments.length) {
          setImmediate(next);
          //next();
        }
      });
      store.subscribe((a,b,c,d,e,f,g,h)=>{
        console.log("store subscribe event");
      });
      const t = config.target ? config.target : "trigger-epic-0";
      store.dispatch({type: t});


      return store
    };
    let store = next();
    // store.dispatch({type: 'trigger-epic-0'});
  }


  render() {
    return <Summary summary={this.state.summary} />;
  }


}
