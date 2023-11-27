import mongoose from 'mongoose';

const ServicesSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    package: {
      type: Number,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model('Services', ServicesSchema);