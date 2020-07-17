import {
    HubConnectionBuilder,
    LogLevel
} from '@microsoft/signalr';

const hub_endpoint = 'https://signalrdemo.com/chatHub';

const connection = new HubConnectionBuilder()
    .withUrl(hub_endpoint)
    .configureLogging(LogLevel.Debug)
    .build();

class SignalrUtil {

    conn() {
        connection
            .start()
            .then(() => {
                console.log(`连接成功： ${hub_endpoint}`);

                // setConnectedStateText(`连接成功： ${hub_endpoint}`);
                // setConnected(true);
            })
            .catch(err => console.log(`连接错误: ${err.toString()}`));
        this.receiveMessageListener()
        this.closeListener()
    }

    getConn() {
        return connection
    }

    closeListener() {
        connection.onclose(async () => {
            console.log(`连接关闭: ${hub_endpoint}`);
            // setConnectedStateText(`连接关闭: ${hub_endpoint}`);
            // setConnected(false);
        });
    }

    receiveMessageListener() {
        connection.on("ReceiveMessage", function (user, message) {
            console.log(`新消息接收成功-->${user}:${message}`);
            // setMessageLog(messageLog => [...messageLog.concat({
            //     id: Date.now().toString(),
            //     user: user,
            //     message: message
            // })]);
        });
    }

    sendMessage(user, message) {
        connection.send("SendMessage", `${user}`, `${message}`).catch(function (err) {
            console.log(`发送失败-->${message} from ${user}: ${err.message}`);
        });
        // connection.invoke("SendMessage", `${user}`, `${message}`).catch(function (err) {
        //     console.log(`发送失败-->${message} from ${user}: ${err.message}`);
        // });
    }

    start() {
        connection
            .start()
            .then(() => {
                console.log(`启动连接: ${hub_endpoint}`)
            })
            .catch(err => console.log(`启动连接时出错: ${err.toString()}`));
    }

}

export default new SignalrUtil()