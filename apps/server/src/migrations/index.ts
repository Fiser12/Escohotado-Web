import * as migration_20250117_161255_init from './20250117_161255_init';

export const migrations = [
  {
    up: migration_20250117_161255_init.up,
    down: migration_20250117_161255_init.down,
    name: '20250117_161255_init'
  },
];
