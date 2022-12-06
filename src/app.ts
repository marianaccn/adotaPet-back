import env from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes';
import './declarations';

class App {
  public express: express.Application;

  public constructor() {
    env.config();
    this.express = express();
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    try {
      if (!process.env.DB_USER || !process.env.DB_PASS)
        throw Error('Missing env DB Credencials');
      await mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@paradisecatsdb.pp0nwpz.mongodb.net/?retryWrites=true&w=majority`
      );
      console.log('MongoDB Connected');
    } catch (err) {
      console.log('MongoDB Failed to Connected ', err);
    }
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use('/api/v1', routes);
  }
}

export default new App().express;
