import { Event } from '../types';

export const EVENTS = {
  // Connections
  CONNECTION: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
  },

  // Client Events
  CLIENT: {
    CREATE_ROOM: 'createRoom',
    SEND_MESSAGE: 'sendMessage',
    PING: 'clientPing',
  },

  // Server Events
  SERVER: {
    ROOMS: 'rooms',
    JOINED_ROOM: 'joinedRoom',
    ROOM_MESSAGE: 'roomMessage',
    PING: 'serverPing',
  },
} as const;

type DeepValueOf<
  T extends Record<string, unknown>,
  Key = keyof T
> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? DeepValueOf<T[Key]>
    : T[keyof T]
  : never;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Check = [Extract<DeepValueOf<typeof EVENTS>, string>] extends [Event]
  ? true
  : false;
// Make sure the follow returns true, hover check to confirm no spelling error.
