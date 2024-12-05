import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutCurrentUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

export default router;

/*     
;

  
  
  getCurrentUserProfile,
  updateCurrentUserProfile,
  updateUserById,
  deleteUserById,
  getUserById,





  




  ;

//admin route

router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);



//.get(getAllEmployees) // jwt to authenticate users










*/
