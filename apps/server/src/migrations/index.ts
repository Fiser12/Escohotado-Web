import * as migration_20250117_161255_init from './20250117_161255_init';
import * as migration_20250119_172920 from './20250119_172920';
import * as migration_20250119_172954 from './20250119_172954';

export const migrations = [
  {
    up: migration_20250117_161255_init.up,
    down: migration_20250117_161255_init.down,
    name: '20250117_161255_init',
  },
  {
    up: migration_20250119_172920.up,
    down: migration_20250119_172920.down,
    name: '20250119_172920',
  },
  {
    up: migration_20250119_172954.up,
    down: migration_20250119_172954.down,
    name: '20250119_172954'
  },
];
