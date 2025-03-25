import * as migration_20250305_123316 from './20250305_123316';
import * as migration_20250324_191426 from './20250324_191426';
import * as migration_20250325_012156 from './20250325_012156';

export const migrations = [
  {
    up: migration_20250305_123316.up,
    down: migration_20250305_123316.down,
    name: '20250305_123316',
  },
  {
    up: migration_20250324_191426.up,
    down: migration_20250324_191426.down,
    name: '20250324_191426',
  },
  {
    up: migration_20250325_012156.up,
    down: migration_20250325_012156.down,
    name: '20250325_012156'
  },
];
