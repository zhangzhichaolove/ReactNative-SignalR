import {
    HubConnectionBuilder,
    LogLevel
} from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";

const loginToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3ByaW1hcnlzaWQiOiIzOWY2ODEwMy0xZmU5LWQ5NjQtOTgzYS1kMTJlZjY3ODdmMWQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIzOWVlNzU0ZC0zNTAyLTY5MjQtNmRmNS02MmFjNmJhMDIyNTAiLCJuYmYiOjE1OTUyOTI0MDMsImV4cCI6MTU5Nzg4NDQwMywiaXNzIjoib2NlbG90IiwiYXVkIjoiaGNkIn0.2AFKpxpqUlHUEtLL6IhOaqcJdcI7NF_WoLYG_dD0yZs";
// const hub_endpoint = 'https://signalrdemo.com/chatHub';
const hub_endpoint = 'http://192.168.1.105:52066/ws/hubs/app';

var log = function (logLevel, message) {
    console.log(`message： ${message}`)
}

const connection = new HubConnectionBuilder()
    .withUrl(hub_endpoint, {
        accessTokenFactory: () => loginToken
    })
    .withAutomaticReconnect()
    .withHubProtocol(new signalR.JsonHubProtocol())
    .configureLogging(LogLevel.None)
    .build();

class SignalrUtil {

    conn() {
        try {
            this.receiveMessageListener()
            this.closeListener()
            connection.onreconnecting(error => console.log(`正在连接： ${error}`));
            connection.onreconnected(id => console.log(`重新连接成功： ${id}`));
            connection
                .start()
                .then(() => {
                    console.log(`连接成功： ${hub_endpoint}`);
                })
                .catch(err => {
                    console.log(`连接错误: ${err.toString()}`)
                    this.start()
                });
        } catch (err) {
            console.log(err)
        }
    }

    getConn() {
        return connection
    }

    closeListener() {
        connection.onclose(async () => {
            console.log(`连接关闭: ${hub_endpoint}`);
            this.start();
        })
    }

    receiveMessageListener() {
        connection.on("messageReceived", function (message) {
            console.log(`新消息接收成功-->${message}`);
            console.log(message);
        })
        connection.on("ReceiveMessage", function (user, message) {
            console.log(`新消息接收成功-->${user}:${message}`);
            Object.keys(message).forEach(k => {
                console.log('开始遍历key：', k);
                console.log('开始遍历value：', message[k]);
            })
            console.log(message);
        })
    }

    sendMessage(user, message) {
        connection.send("SendMessage", `${user}`, `${message}`).catch(function (err) {
            console.log(`发送失败-->${message} from ${user}: ${err.message}`);
        });
    }

    start() {
        connection.start()
            .then(() => {
                console.log("连接重试成功-->");
            })
            .catch(err => {
                console.log(`连接重试错误: ${err.toString()}`)
                setTimeout(() => this.start(), 5000);
            });
    }

}

export default new SignalrUtil()