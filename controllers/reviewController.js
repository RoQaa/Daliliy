const Review = require(`${__dirname}/../models/reviewModel`)
const { catchAsync } = require(`${__dirname}/../utils/catchAsync`);
const AppError = require(`${__dirname}/../utils/appError`);

exports.getReviews = (catchAsync(async (req, res, next) => {
    const data = await Review.find({ item: req.body.itemId })

    if (!data) {
        return new next(new AppError(`data n't found`, 404))
    }

    res.status(200).json({
        status: true,
        message: "data returned",
        length: data.length,
        data
    })



}))

exports.addReviews = (catchAsync(async (req, res, next) => {
    const user = req.user.id;
    if (!req.body) {
        return next(new AppError(`data n't found`, 404))
    }
    req.body.user = user

    await Review.create(req.body)
    res.status(200).json({
        status: true,
        message: "your review submitted"
    })
}))

exports.deleteReview = (catchAsync(async (req, res, next) => {
    const doc = await Review.findByIdAndDelete(req.body.reviewId)


    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
        status: true,
    });
}))


exports.updateReview = (catchAsync(async (req, res, next) => {
    const doc = await Review.findByIdAndUpdate(req.body.reviewId, req.body, { new: true, runValidators: true })

    if (!doc) {
        return next(new AppError('No document found with that ID', 404));
    }

    res.status(202).json({
        status: true,

    });
}))
