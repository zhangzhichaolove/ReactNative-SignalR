/**
 * A simple SignalR chat client written in React Native
 * https://github.com/jonathanzufi/SignalR-react-native-client
**/

import React from 'react';
import { SafeAreaView} from 'react-native';
import Signalr from './Signalr'

const App: () => React$Node = () => {

  return (
    <>
      <SafeAreaView>
          <Signalr></Signalr>
      </SafeAreaView>
    </>
  );
};

export default App;
