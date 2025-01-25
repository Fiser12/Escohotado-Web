import * as migration_20250117_161255_init from './20250117_161255_init';
import * as migration_20250119_172920 from './20250119_172920';
import * as migration_20250119_172954 from './20250119_172954';
import * as migration_20250122_213908 from './20250122_213908';
import * as migration_20250123_183900 from './20250123_183900';
import * as migration_20250123_224317 from './20250123_224317';
import * as migration_20250125_015339 from './20250125_015339';

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
    name: '20250119_172954',
  },
  {
    up: migration_20250122_213908.up,
    down: migration_20250122_213908.down,
    name: '20250122_213908',
  },
  {
    up: migration_20250123_183900.up,
    down: migration_20250123_183900.down,
    name: '20250123_183900',
  },
  {
    up: migration_20250123_224317.up,
    down: migration_20250123_224317.down,
    name: '20250123_224317',
  },
  {
    up: migration_20250125_015339.up,
    down: migration_20250125_015339.down,
    name: '20250125_015339'
  },
];
