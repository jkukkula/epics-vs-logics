import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {createStore} from '../redux/createStore';
import {ActionDispatcher} from './ActionDispatcher';
import {Text} from 'react-native';

function useStore(config, configIndex, finishExperiment) {
  const [store, setStore] = useState(null);

  useEffect(() => {
    setStore(createStore(config, configIndex, finishExperiment));
  }, [config]);

  return store;
}

function App({config, finishExperiment, configIndex}) {
  const store = useStore(config, configIndex, results =>
    finishExperiment(config, results),
  );

  if (!store) {
    return <Text>Creating store...</Text>;
  }

  return (
    <Provider store={store}>
      <ActionDispatcher />
    </Provider>
  );
}

export default App;
