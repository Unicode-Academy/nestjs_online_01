const websocketUrl = 'ws://localhost:8080/chat';
// const socket = new WebSocket(websocketUrl);
// socket.onopen = (event) => {
//   console.log('Connected to WebSocket server');
//   socket.send('Hello server');
// };

// socket.onclose = () => {
//   console.log('Disconnected from WebSocket server');
// };

import { io } from 'https://cdn.socket.io/4.8.1/socket.io.esm.min.js';

// const socket = io(websocketUrl, {
//   // transports: ['polling'],
//   extraHeaders: {
//     authorization: `bearer ahihi`,
//   },
// });

// socket.on('connect', () => {
//   console.log('Client kết nối với websocket server');
// });

// // socket.emit('message', 'Hello server');

// // socket.on('message', (data) => console.log(data));

// socket.on('disconnect', () => {
//   console.log('Client ngắt kết nối với websocket server');
// });
// const btn = document.querySelector('.btn');
// btn.addEventListener('click', () => {
//   socket.emit('send-message', 'Xin chào anh em', (data) => {
//     console.log(data);
//   });
// });

// socket.on('new-message', (data) => {
//   const appEl = document.querySelector('.app');
//   appEl.innerHTML = data;
// });

// const btn2 = document.querySelector('.btn2');
// btn2.addEventListener('click', () => {
//   socket.emit('send-message2', 'Xin chào anh em 2');
// });

const socketNotification = io('ws://localhost:8080/notification', {
  extraHeaders: {
    'x-user': localStorage.getItem('username'),
  },
});

socketNotification.on('connect', () => {
  console.log('Notification connect');
});

socketNotification.on('disconnect', () => {
  console.log('Notification disconnect');
});

const btn3 = document.querySelector('.btn3');
btn3.addEventListener('click', () => {
  // socketNotification.emit('send-notification', 'Thông báo mới từ client');
  socketNotification.emit('private-notification', 'Thông báo mới từ client');
});

socketNotification.on('new-notification', (data) => {
  // const appEl = document.querySelector('.app');
  // appEl.innerHTML = data;
  console.log(data);
});

const joinBtn = document.querySelector('.join-btn');
joinBtn.addEventListener('click', () => {
  socketNotification.emit('join');
});

socketNotification.on('join-message', (data) => {
  console.log(data);
});
