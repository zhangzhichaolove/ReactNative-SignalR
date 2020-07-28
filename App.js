/**
 * A simple SignalR chat client written in React Native
 * https://github.com/jonathanzufi/SignalR-react-native-client
**/

import React, { Component } from 'react';
import { SafeAreaView} from 'react-native';
import Signalr from './Signalr'

class App extends Component{

componentDidCatch(errorObject,info){
  console.log(info);
}

render(){
  return(
    <>
      <SafeAreaView>
          <Signalr></Signalr>
      </SafeAreaView>
    </>
  );
}
}


export default App;
