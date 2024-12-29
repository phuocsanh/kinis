import type {ReactotronReactNative} from 'reactotron-react-native';
import {NativeModules} from 'react-native';
import {reactotronRedux} from 'reactotron-redux';
import Reactotron from 'reactotron-react-native';
import mmkvPlugin from 'reactotron-react-native-mmkv';
import storage from 'utils/storage';

const scriptURL = NativeModules.SourceCode.scriptURL;
const scriptHostname = scriptURL.split('://')[1].split(':')[0];

const reactotron = Reactotron.configure({host: scriptHostname})
  .useReactNative()
  .use(reactotronRedux())
  .use(mmkvPlugin<ReactotronReactNative>({storage}))
  .connect();

export default reactotron;
