import { Router } from 'express';
import multer from 'multer';

import PetsController from './controllers/PetsController';
import UsersController from './controllers/UsersController';
import { authMiddleware } from './middleware/auth';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const routes = Router();

routes.get('/pets', PetsController.ListPets); // Get list of pets
routes.post('/login', UsersController.Login); // Login in the platform

routes.use('/admin', authMiddleware);
routes.get('/admin/pets', PetsController.ListPets); // Get list of pets
routes.post('/admin/pets', upload.single('file'), PetsController.AddPet); // Add a pet
routes.put('/admin/pets', upload.single('file'), PetsController.UpdatePet); // Update a pet
routes.delete('/admin/pets', PetsController.RemovePet); // Remove a pet

authMiddleware;
export default routes;
