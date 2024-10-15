import { Router } from "express";

export const venderRouter = Router();

venderRouter.post('/ads', addAds);

venderRouter.get('/ads', getAllAds);

venderRouter.get('/ads/:id', getAdsById);

venderRouter.patch('/ads/:id', updateAds);

venderRouter.delete('/ads/:id', deleteAds);
