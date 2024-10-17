import { Router } from "express";
import { addAds, getAllAds, getAdsById, updateAds, deleteAds } from "../controller/vendor_controller";

export const venderRouter = Router();

venderRouter.post('/ads', Upload.single('icon'), addAds);

venderRouter.get('/ads', getAllAds);

venderRouter.get('/ads/:id', getAdsById);

venderRouter.patch('/ads/:id', Upload.single('icon'), updateAds);

venderRouter.delete('/ads/:id', Upload.single('icon'), deleteAds);
