import {z} from 'zod';
import type {Context} from '@/shared/configuration';

export const retrieveBalanceParameters = (
  _context: Context = {}
): z.AnyZodObject => z.object({});
