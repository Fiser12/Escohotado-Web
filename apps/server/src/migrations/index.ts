import * as migration_20250228_205509 from './20250228_205509';

export const migrations = [
  {
    up: migration_20250228_205509.up,
    down: migration_20250228_205509.down,
    name: '20250228_205509'
  },
];
