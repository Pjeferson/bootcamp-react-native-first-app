import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  /* host = CURRENT LOCAL IP */
  const tron = Reactotron.configure({ host: '192.168.0.22' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
