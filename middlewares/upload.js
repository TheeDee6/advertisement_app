import multer from 'multer';
import path from 'path';
import { multerSaveFilesOrg } from 'multer-savefilesorg';
import axios from 'axios';

// Set up storage engine
const storage = multer.memoryStorage({ dest: 'uploads/' });

// Initialize upload
const upload = multer({
    apiAccessToken: process.env.SAVEFILESORG_AOI_KEY,
    storage: multerSaveFilesOrg({
        limits: { fileSize: 1000000 }, // Limit file size to 1MB
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        }
    }).single('image'),
    preservePath: true
});


// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Route to handle image upload
app.post('/upload', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            res.status(400).send(err);
        } else {
            if (req.file == undefined) {
                res.status(400).send('No file selected!');
            } else {
                try {
                    const response = await axios.post('https://api.savefiles.org/upload', req.file.buffer, {
                        headers: {
                            'Content-Type': req.file.mimetype,
                            'Authorization': `Bearer 1383|U6Nhd17gaWYPOLttEVzQ8b8jBJFPTA8wTpCvfq6q`
                        }
                    });
                    res.send(`File uploaded: ${response.data.filename}`);
                } catch (uploadError) {
                    res.status(500).send('Error uploading to SaveFilesOrg');
                }
            }
        }
    });
});
