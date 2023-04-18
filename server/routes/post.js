import express from "express";
import formidable from "express-formidable"

const router = express.Router();

//middleware

import { 
    isAdmin, 
    requireSignin, 
    canCreateRead, 
    canUpdateDeletePost, 
    canDeleteMedia,
    canUpdateDeleteComment } from "../middlewares";

//controller

import {
    uploadImage,
    createPost,
    posts,
    uploadImageFile,
    media,
    removeMedia,
    singlePost,
    removePost,
    editPost,
    postsByAuthor,
    postCount,
    postsForAdmin,
    createComment,
    comments,
    commentCount,
    removeComment,
    updateComment,
    userComments,
    getNumbers
} from "../controllers/post"


router.post("/upload-image", requireSignin, canCreateRead, uploadImage);
router.post("/create-post", requireSignin, canCreateRead, createPost);
router.post("/upload-image-file", formidable(), requireSignin, canCreateRead, uploadImageFile);
router.get("/posts/:page", posts);
router.get("/post/:slug", singlePost)
router.get("/media", requireSignin, canCreateRead, media);
router.delete("/media/:id", requireSignin,canDeleteMedia, removeMedia);
router.delete("/post/:postId", requireSignin, canUpdateDeletePost, removePost);
router.put("/edit-post/:postId", requireSignin, canUpdateDeletePost, editPost);
router.get("/posts-by-author", requireSignin, postsByAuthor);
router.get("/post-count", postCount);
router.get("/posts-for-admin", requireSignin, isAdmin, postsForAdmin);
router.post("/comment/:postId", requireSignin, createComment);
router.get('/comments/:page', requireSignin, isAdmin, comments);
router.get('/user-comments', requireSignin, userComments);
router.get('/comment-count', commentCount);
router.delete('/comment/:commentId', requireSignin, canUpdateDeleteComment, removeComment);
router.put('/comment/:commentId', requireSignin, canUpdateDeleteComment, updateComment);
router.get('/numbers', getNumbers);

export default router;