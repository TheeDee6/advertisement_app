import { VendorModel } from '../model/vendor_model.js';
import { addAdsValidator, updateAdsValidator, deleteAdsValidator } from '../validators/vendor.js';


export const addAds = async (req, res, next) => { 
    try {
        console.log(req.file);
        // Validate vender input
        const { error, value } = addAdsValidator.validator({
            ...req.body,
            icon: req.file?.filename
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Write vendor Ads to database
        await VendorModel.create(value);
        //Respond to request
        res.status(201).json('Ads was added');
    } catch (error) {
       next(error); 
    }
}

export const getAllAds = async(req, res, next) => {
    try {
        const { filter = "{}", limit = 10, skip = 0 } = req.query;
        //Fetch Vendor Ads from database
        const ads = await TodoModel
        .find(JSON.parse(filter))
        .limit(limit)
        .skip(skip);
        //Return response
        res.status(200).json(vendor);
    } catch (error) {
        next(error);
    }
}

export const updateAds = async (req, res, next) => {
    try {
        // Validate vender update
        const { error, value } = updateAdsValidator.validate(req.body);
        if (error) {
            return res.status(422).json(error);
        }
        // Write vendor Ads to database
        const vendor = await VendorModel.findByIdAndUpdate(req.params.id, { new: true });
        //Respond to request
        res.status(201).json(vendor);
    } catch (error) {
       next(error); 
    }
};

export const deleteAds = (req, res, next) => {
    try {
        res.json('Ads Deleted');
    } catch (error) {
        next(error);
    }
}