import mongoose from 'mongoose';

export default class BaseRepo {
  Schema: mongoose.Model<any>;

  constructor(Schema: mongoose.Model<any>) {
    this.Schema = Schema;
  }

  async Create(body: any) {
    try {
      const mountedProd = new this.Schema(body);
      const data = await mountedProd.save();
      return { data };
    } catch (error) {
      return { error };
    }
  }

  async Read(id: string) {
    try {
      const objId = new mongoose.Types.ObjectId(id);
      const data = await this.Schema.findOne({ _id: objId });
      return { data };
    } catch (error) {
      return { error };
    }
  }
  async Update(body: any) {
    try {
      const mountedProd = new this.Schema(body);
      const data = await this.Schema.updateOne({ _id: body._id }, mountedProd);
      return { data };
    } catch (error) {
      return { error };
    }
  }
  async Delete(id: string) {
    try {
      const objId = new mongoose.Types.ObjectId(id);
      const data = await this.Schema.deleteOne({ _id: objId });
      return { data };
    } catch (error) {
      return { error };
    }
  }
}
