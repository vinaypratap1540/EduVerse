import { Router } from "express"
import isAuthenticated from "../Middleware/isAuthenticated.js";
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreateCourse, getLectureById, getPublishedCourse, removeLecture, searchCourse, togglePublishCourse } from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
const router = Router()

router.route("/").post(isAuthenticated,createCourse)
router.route("/search").get(isAuthenticated,searchCourse)
router.route("/published-courses").get(getPublishedCourse)
router.route("/").get(isAuthenticated,getCreateCourse)
router.route("/:courseId").put(isAuthenticated,upload.single("courseThumbnail"),editCourse)
router.route("/:courseId").get(isAuthenticated,getCourseById)
router.route("/:courseId/lecture").post(isAuthenticated,createLecture)
router.route("/:courseId/lecture").get(isAuthenticated,getCourseLecture)
router.route("/:courseId/lecture/:lectureId").post(isAuthenticated,editLecture)
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated,togglePublishCourse)
export default router