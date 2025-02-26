import * as migration_20250226_205201 from './20250226_205201';

export const migrations = [
  {
    up: migration_20250226_205201.up,
    down: migration_20250226_205201.down,
    name: '20250226_205201'
  },
];
