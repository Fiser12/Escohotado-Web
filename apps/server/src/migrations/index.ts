import * as migration_20241107_224622_init from './20241107_224622_init';

export const migrations = [
  {
    up: migration_20241107_224622_init.up,
    down: migration_20241107_224622_init.down,
    name: '20241107_224622_init'
  },
];
