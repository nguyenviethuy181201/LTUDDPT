import asyncHandler from 'express-async-handler';
import Services from '../Models/ServicesModel.js';

const getService = asyncHandler(async (req, res) => {
    try {
      const services = await Services.find({}).sort({ limit: 1 });
      res.json(services);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
export {getService}