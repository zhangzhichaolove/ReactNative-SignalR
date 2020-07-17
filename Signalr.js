import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import SignalrUtil from './SignalrUtil'

const Signalr = () => {
    const [user, setUser] = useState('135xxxx6666')
    const [message, setMessage] = useState('你好吗？')
    const [messageList, setmessageList] = React.useState([]);

    send = () => {
        setmessageList(messageList => [...messageList.concat({
        id: Date.now().toString(),
        user: user,
        message: message
      })]);
        SignalrUtil.sendMessage(user,message)
    }

    clear = () => {
        setmessageList([]);
    }

    conn = () => {
        SignalrUtil.conn()
    }

    useEffect(()=>{
       this.conn()
    },[])

    function MessageItem({ title }) {
        return (
          <View>
            <Text style={{color:'#f0f',fontSize:10}}>{title}</Text>
          </View>
        );
      }

    return (
        <View style={styles.container}>
            <TextInput placeholder='用户' onChangeText={text => setUser(text)} value={user} style={styles.input}/>
            <TextInput placeholder='消息内容' onChangeText={text => setMessage(text)} value={message} style={styles.input}/>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={this.send} style={styles.button}>
                    <Text style={styles.text}>发送</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.clear} style={styles.button}>
                    <Text style={styles.text}>清除</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.conn} style={styles.button}>
                    <Text style={styles.text}>连接</Text>
                </TouchableOpacity>
            </View>
            <FlatList
              style={styles.list}
              data={messageList}
              renderItem={({ item }) => <MessageItem title={'\u2B24 ' + item.user + '---->' + item.message} />}
              keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        // flexDirection:'column',
        height:'100%',
        marginTop:50,
    },
    button:{
        fontSize: 20, 
        color: 'red',
        flex:1,
        borderRadius:20,
        borderWidth:1,
        justifyContent:'center',
    },
    text:{
        fontSize: 20,
        color: 'red',
        textAlign:'center',
    },
    input:{
        fontSize:13,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#0f0',
        padding:15,
        marginTop:5,
        marginHorizontal:10,
    },
    buttonContainer:{ 
        // flex: 1, 
        flexDirection: 'row',
        marginTop:10,
        marginHorizontal:10,
        // backgroundColor:'#f00',
        height:40,
    },
    list:{
        margin:10,
        height:'auto',
    }
});

export default Signalr