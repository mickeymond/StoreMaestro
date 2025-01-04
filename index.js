/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { en, registerTranslation } from 'react-native-paper-dates';
import App from './App';
import { name as appName } from './app.json';

registerTranslation('en', en);

AppRegistry.registerComponent(appName, () => App);
