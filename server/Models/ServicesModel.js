import mongoose from 'mongoose';

const ServicesSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    price: {
      type: Number,
    },
    servicePackage: {
      type: Number,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model('Services', ServicesSchema);