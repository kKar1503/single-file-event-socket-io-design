import { Server } from 'socket.io';
import logger from './utils/logger';
import { EventFile } from '../../../shared/types';
import { EVENTS } from '../../../shared/events';
import * as eventModules from './events';

const events: Record<string, EventFile> = Object(eventModules);

export default (io: Server) => {
  logger.info('Sockets enabled');

  io.on(EVENTS.CONNECTION.CONNECT, (socket) => {
    logger.info(`${socket.id} is connected.`);
    let eventsAttached: string[] = [];
    for (const event of Object.values(events)) {
      const { callback, eventName, type } = event(io);
      socket[type](eventName, callback);
      eventsAttached.push(eventName);
    }

    logger.info(`Attached ${eventsAttached.length} events to ${socket.id}`);
  });
};
