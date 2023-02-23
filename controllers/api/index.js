const router = require('express').Router()
const commentRoutes = require('./comment-routes')
const blogRoutes = require('./blog-routes')
const userRoutes = require('./user-routes')

router.use('/blogs', blogRoutes)
router.use('/users', userRoutes)
router.use('/comments', commentRoutes)

module.exports = router