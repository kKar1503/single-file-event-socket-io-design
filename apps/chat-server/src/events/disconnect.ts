import { EventFile } from '../../../../shared/types';
import logger from '../utils/logger';

const event: EventFile = (io) => ({
  eventName: 'disconnect',
  type: 'on',
  callback: (socket) => {
    logger.info(`Disconnected: ${socket.id}`);
  },
});

export default event;
