import * as migration_20241120_002253 from './20241120_002253';
import * as migration_20241201_003826 from './20241201_003826';

export const migrations = [
  {
    up: migration_20241120_002253.up,
    down: migration_20241120_002253.down,
    name: '20241120_002253',
  },
  {
    up: migration_20241201_003826.up,
    down: migration_20241201_003826.down,
    name: '20241201_003826'
  },
];
