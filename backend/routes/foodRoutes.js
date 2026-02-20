import express from "express";
import { addFood, listFood, removeFood,toggleAvailability,toggleFlashSale } from "../controllers/foodController.js";
import upload from "../middlewares/upload.js";

// import multer from "multer";
// import path from "path";

const foodRouter = express.Router();

// // Image Storage Engine
// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const upload = multer({ storage: storage });

// foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)
foodRouter.post("/toggle-availability", toggleAvailability);
foodRouter.post("/toggle-flashsale", toggleFlashSale);





export default foodRouter;
