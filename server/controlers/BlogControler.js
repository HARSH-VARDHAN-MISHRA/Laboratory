const News = require('../models/News.model')




// Create a News
exports.createNews = async (req, res) => {
    try {
        const { CreatedBy, Headline,ImageOfNews, SubHeading, DateOfNews, NewsData } = req.body;
        const news = new News({
            CreatedBy,
            Headline,
            ImageOfNews,
            SubHeading,
            DateOfNews,
            NewsData
        });

        await news.save();
        res.status(201).json({ message: 'News created successfully', news });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create news', error });
    }
};

// Delete a News
exports.DeleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findByIdAndDelete(id);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json({ message: 'News deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete news', error });
    }
};

// Get All News
exports.getAllNews = async (req, res) => {
    try {
        const newsList = await News.find();
        res.status(200).json(newsList);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch news', error });
    }
};

// Get a Single News
exports.getSingleNews = async (req, res) => {
    try {
        const { id } = req.params;
        const news = await News.findById(id);

        if (!news) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch news', error });
    }
};


exports.UpdateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { CreatedBy, Headline, ImageOfNews,SubHeading, DateOfNews, NewsData } = req.body;

        const updatedNews = await News.findByIdAndUpdate(
            id,
            { CreatedBy, Headline, SubHeading, ImageOfNews,DateOfNews, NewsData },
            { new: true, runValidators: true }
        );

        if (!updatedNews) {
            return res.status(404).json({ message: 'News not found' });
        }

        res.status(200).json({ message: 'News updated successfully', updatedNews });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update news', error });
    }
};


