import * as migration_20250303_153143 from './20250303_153143';

export const migrations = [
  {
    up: migration_20250303_153143.up,
    down: migration_20250303_153143.down,
    name: '20250303_153143'
  },
];
