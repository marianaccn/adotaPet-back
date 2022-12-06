import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PetsSchema = new Schema({
  images: {
    type: Array<String>,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  birthDate: {
    type: String,
    required: true,
  },
  castrated: {
    type: String,
    required: true,
  },
  vaccinated: {
    type: String,
    required: true,
  },
  fiv: {
    type: String,
    required: true,
  },
  felv: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Pets', PetsSchema);
