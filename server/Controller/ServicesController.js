import asyncHandler from 'express-async-handler';
import Services from '../Models/ServicesModel.js';

const getService = asyncHandler(async (req, res) => {
    try {
      const services = await Services.find({}).sort({ servicePackage: 1 });
      res.json(services);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
const createService = asyncHandler(async (req, res) => {
  try {
    const { title,price, servicePackage } = req.body;
    const service = new Services({ title,price, servicePackage});
    const createService = await service.save()
    res.status(201).json(createService)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const updateService = asyncHandler(async (req, res) => {
  try {
    const { title,price, servicePackage } = req.body;
    const service = await Services.findById(req.params.id);
    if(service){
      service.title = title;
      service.price = price;
      service.servicePackage = servicePackage;
      const updateService = await service.save()
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error){
    res.status(404).json({ message: error.message });
  }
});

const deleteService = asyncHandler(async (req, res) => {
  try {
    const service = await Services.findById(req.params.id);
    if (service) {
      await service.remove();
      res.json({ message: 'Service deleted successfully' });
    } else {
      res.status(404).send({ message: 'Service not found' });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const deleteAllService = asyncHandler(async (req, res) => {
  try {
      await Services.deleteMany({});
      res.json({ message: 'All Services deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//     const service = new Services({name, price, servicePackage});
//     const createService = await service.save()
//     res.status(200).json(createService)
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
    
      
export {getService, createService, updateService, deleteService, deleteAllService}