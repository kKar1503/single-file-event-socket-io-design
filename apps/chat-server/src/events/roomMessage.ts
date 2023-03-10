import { EventFile } from '../../../../shared/types';
import logger from '../utils/logger';

const event: EventFile = (io) => ({
  eventName: 'clientPing',
  type: 'on',
  callback: (message) => {
    logger.info(`Message from client: ${message}`);
  },
});

export default event;
