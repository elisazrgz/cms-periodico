const express = require('express');
const router = express.Router();
const { getAllPublishedArticles,
    getArticlesByAuthor,
    getArticlesByEditor,
    createArticle,
    getArticleById,
    updateArticleContent,
    updateArticleStatus,
    assignEditor
} = require('../../controllers/articles.controller');
const authMiddleware = require('../../../utils/middleware');
const upload = require("../../../utils/upload.file");

router.get('/allpublishedarticles', getAllPublishedArticles);
router.get('/articledetails/:id', getArticleById);
router.get('/articlesbyauthor/:idA', authMiddleware, getArticlesByAuthor);
router.get('/articlesbyeditor/:idE', authMiddleware, getArticlesByEditor);

router.post('/create', authMiddleware, upload.single("image"), createArticle);

router.put('/modifycontent/:id', authMiddleware, upload.single("image"), updateArticleContent);
router.put('/modifystatus/:id/:status', authMiddleware, updateArticleStatus);
router.put('/assigneditor/:idA/:idE', authMiddleware, assignEditor);

//router.post('/uploadFile',upload.single("image"), imageUpload);

module.exports = router;