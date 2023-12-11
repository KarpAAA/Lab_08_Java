import {Stomp} from "@stomp/stompjs";
import SockJS from "sockjs-client";
import  store  from "@/store";

export var stompClient = null;

export function connect() {
    let socket = new SockJS('http://localhost:8081/ws');
    stompClient = Stomp.over(socket);
    stompClient.activate();
    console.log('trying connect');
    stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/restaurant', (message) => {
            const rest = JSON.parse(message.body);
            store.commit('setCashRegisters', rest.paydesks)
            store.commit('setCooks', rest.cooks)
            store.commit('setCompletedOrders', rest.completedOrders)
            store.commit('setClients', rest.clients)
            store.commit('setMenu', rest.menu)
            store.commit('setCurrentOrders', rest.currentOrders)
            store.commit('setStat', rest.stat)
        });
        store.dispatch('getRestaurant');
    };

    stompClient.onWebSocketError = (error) => {
        console.error('Error with websocket', error);
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
    };
    stompClient.onConnecting = () => {
        console.log('Connecting...');
    };

    stompClient.onDisconnected = () => {
        console.log('Disconnected');
    };
}

// const showMessage = (message) => {
//     const response = document.createElement('p');
//     response.innerHTML = message;
//     document.getElementById('responses').appendChild(response);
// };





