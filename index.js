import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {Experiment} from './src/components/Experiment';
// import App from './src/components/App.js';

AppRegistry.registerComponent(appName, () => Experiment);
