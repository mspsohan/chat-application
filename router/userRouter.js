// external routes
const express = require('express');

// internal import
const { getUsers } = require("../controller/userController")
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")

const router = express.Router()

// login page
router.get("/", decorateHtmlResponse("Users"), getUsers)

module.exports = router
