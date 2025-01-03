import * as migration_20241204_013333 from './20241204_013333';
import * as migration_20241213_214436 from './20241213_214436';
import * as migration_20241223_015558 from './20241223_015558';
import * as migration_20250102_171141 from './20250102_171141';

export const migrations = [
  {
    up: migration_20241204_013333.up,
    down: migration_20241204_013333.down,
    name: '20241204_013333',
  },
  {
    up: migration_20241213_214436.up,
    down: migration_20241213_214436.down,
    name: '20241213_214436',
  },
  {
    up: migration_20241223_015558.up,
    down: migration_20241223_015558.down,
    name: '20241223_015558',
  },
  {
    up: migration_20250102_171141.up,
    down: migration_20250102_171141.down,
    name: '20250102_171141'
  },
];
