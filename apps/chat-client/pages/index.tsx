import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { EVENTS } from '../../../shared/events';

const socket = io('http://localhost:4000');

const Index = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on(EVENTS.SERVER.PING, (data) => {
      setLastMessage(data);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    console.log(`${socket.id} pinging server...`);
    socket.emit(
      EVENTS.CLIENT.PING,
      `${socket.id} pinged: ${new Date().toISOString()}`
    );
  };

  return (
    <div className="App">
      <p>Connected: {'' + isConnected}</p>
      <p>Last message: {lastMessage || '-'}</p>
      <button onClick={sendMessage}>Say hello!</button>
    </div>
  );
};

export default Index;
