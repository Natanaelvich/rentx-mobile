import { appSchema } from '@nozbe/watermelondb';

import { userSchema } from './userSchema';
import { carSchema } from './carSchema';

export const schemas = appSchema({
  version: 6,
  tables: [userSchema, carSchema],
});
