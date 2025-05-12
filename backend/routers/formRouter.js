import express from "express";
import uploadMiddleware from "../middleware/uploadMiddleware.js";
import { createForm,deleteForm,updateForm,getAllForm,getFormById } from "../contollers/formController.js";

const router= express.Router();

router.post('/submit', uploadMiddleware.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profilePic', maxCount: 1 }
]), createForm);

router.get('/forms',getAllForm);

router.get('/form/:id', getFormById);

router.delete('/delete/:id',deleteForm);

router.put('/update/:id', uploadMiddleware.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'profilePic', maxCount: 1 }
]), updateForm);

export default router;


