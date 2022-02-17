const Categories = require("../../repository/categories");
const { HttpCode } = require("../../helpers/constants");

const getCategories = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const categories = await Categories.getCategories({
            ...req.body,
            owner: userId,
        });
        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.OK,
            data: { categories },
        });
    } catch (error) {
        next(error);
    }
}

module.exports =  getCategories ;