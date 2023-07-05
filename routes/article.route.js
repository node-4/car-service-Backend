const express = require("express");
const router = express.Router();
const {
    getArticles,
    getArticle,
    createArticle,
    updateArticle,
    deleteArticle,
} = require("../controllers/aritcle");

router.get("/articles", getArticles);
router.get("/articles/:id", getArticle);
router.post("/articles", createArticle);
router.put("/articles/:id", updateArticle);
router.delete("/articles/:id", deleteArticle);

module.exports = router;
