import { HydratedDocument } from 'mongoose';

declare module 'express' {
  export interface Request {
    // if you're using mongoose
    user?: HydratedDocument<any>;
  }
}
