import * as migration_20250117_161255_init from './20250117_161255_init';
import * as migration_20250119_172920 from './20250119_172920';
import * as migration_20250119_172954 from './20250119_172954';
import * as migration_20250122_213908 from './20250122_213908';
import * as migration_20250123_183900 from './20250123_183900';
import * as migration_20250123_224317 from './20250123_224317';
import * as migration_20250125_015339 from './20250125_015339';
import * as migration_20250127_231806 from './20250127_231806';
import * as migration_20250129_015431 from './20250129_015431';
import * as migration_20250205_023621 from './20250205_023621';
import * as migration_20250207_222718 from './20250207_222718';
import * as migration_20250210_233337 from './20250210_233337';
import * as migration_20250210_233916 from './20250210_233916';
import * as migration_20250212_184556 from './20250212_184556';
import * as migration_20250225_220644 from './20250225_220644';
import * as migration_20250226_182159 from './20250226_182159';

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
    name: '20250125_015339',
  },
  {
    up: migration_20250127_231806.up,
    down: migration_20250127_231806.down,
    name: '20250127_231806',
  },
  {
    up: migration_20250129_015431.up,
    down: migration_20250129_015431.down,
    name: '20250129_015431',
  },
  {
    up: migration_20250205_023621.up,
    down: migration_20250205_023621.down,
    name: '20250205_023621',
  },
  {
    up: migration_20250207_222718.up,
    down: migration_20250207_222718.down,
    name: '20250207_222718',
  },
  {
    up: migration_20250210_233337.up,
    down: migration_20250210_233337.down,
    name: '20250210_233337',
  },
  {
    up: migration_20250210_233916.up,
    down: migration_20250210_233916.down,
    name: '20250210_233916',
  },
  {
    up: migration_20250212_184556.up,
    down: migration_20250212_184556.down,
    name: '20250212_184556',
  },
  {
    up: migration_20250225_220644.up,
    down: migration_20250225_220644.down,
    name: '20250225_220644',
  },
  {
    up: migration_20250226_182159.up,
    down: migration_20250226_182159.down,
    name: '20250226_182159'
  },
];
