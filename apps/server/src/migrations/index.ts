import * as migration_20241204_013333 from './20241204_013333';
import * as migration_20241213_214436 from './20241213_214436';

export const migrations = [
  {
    up: migration_20241204_013333.up,
    down: migration_20241204_013333.down,
    name: '20241204_013333',
  },
  {
    up: migration_20241213_214436.up,
    down: migration_20241213_214436.down,
    name: '20241213_214436'
  },
];
