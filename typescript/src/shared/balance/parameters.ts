import {z} from 'zod';
import type {Context} from '../configuration';

export const retrieveBalanceParameters = (
  _context: Context = {}
): z.AnyZodObject => z.object({});
