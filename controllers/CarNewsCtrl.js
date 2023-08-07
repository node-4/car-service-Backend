const { createResponse } = require("../utils/response/response");
const CarNews = require("../models/CarNewsModel");
const moment = require("moment-timezone");

// Get all articles
exports.getCarNewses = async (req, res) => {
  try {
    const articles = await CarNews.find();
    if (!articles || articles.length === 0) {
      return createResponse(res, 404, "No articles found");
    }
    createResponse(res, 200, "Articles retrieved successfully", articles);
  } catch (err) {
    console.error(err);
    createResponse(res, 500, err.message);
  }
};

// Get a single article by ID
exports.getCarNews = async (req, res) => {
  try {
    const article = await CarNews.findById(req.params.id);
    if (!article) {
      return createResponse(res, 404, "Article not found");
    }
    createResponse(res, 200, "Article retrieved successfully", article);
  } catch (err) {
    console.log(err);
    createResponse(res, 500, err.message);
  }
};

// Create a new article
exports.createCarNews = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const image = req.file.path;
    const indiaTime = moment().tz("Asia/Kolkata");
    const date = indiaTime.format("DD:MM:YY");
    const time = indiaTime.format("hh:mm:ss");
    const article = new CarNews({
      title,
      content,
      tags,
      image,
      date,
      time,
    });
    await article.save();
    createResponse(res, 201, "Article created successfully", article);
  } catch (err) {
    console.log(err);
    createResponse(res, 400, err.message);
  }
};

// Update an existing article by ID
exports.updateCarNews = async (req, res) => {
  try {
    const article = await CarNews.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!article) {
      return createResponse(res, 404, "Article not found");
    }
    createResponse(res, 200, "Article updated successfully", article);
  } catch (err) {
    console.log(err);
    createResponse(res, 400, err.message);
  }
};

// Delete an article by ID
exports.deleteCarNews = async (req, res) => {
  try {
    const article = await CarNews.findByIdAndDelete(req.params.id);
    if (!article) {
      return createResponse(res, 404, "Article not found");
    }
    createResponse(res, 200, "Article deleted successfully");
  } catch (err) {
    console.log(err);
    createResponse(res, 500, err.message);
  }
};
