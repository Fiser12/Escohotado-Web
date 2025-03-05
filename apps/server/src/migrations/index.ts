import * as migration_20250305_123316 from './20250305_123316';

export const migrations = [
  {
    up: migration_20250305_123316.up,
    down: migration_20250305_123316.down,
    name: '20250305_123316'
  },
];
