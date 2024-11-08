import * as migration_20241108_160618_init from './20241108_160618_init';

export const migrations = [
  {
    up: migration_20241108_160618_init.up,
    down: migration_20241108_160618_init.down,
    name: '20241108_160618_init'
  },
];
