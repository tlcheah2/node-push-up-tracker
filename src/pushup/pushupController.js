const pushupService = require('./pushupService');

/**
 * Controller to retrieve single date push up
 */
exports.getTodayPushup = async (req, res) => {
    try {
        const todayDate = new Date();
        const result = await pushupService.getPushUpByDate(todayDate, todayDate);
        return res.json({ data: result });
    } catch (err) {
        return res.status(500).json({ errors: err });
    }
};

/**
 * Controller to retrieve single date push up
 */
exports.getPushupWithDate = async (req, res) => {
    try {
        const { from, to } = req.query;
        if (!from || !to) {
            return res.status(400).json({ errors: ['Please specify "from" and "to" in the url'] });
        }
        const result = await pushupService.getPushUpByDate(from, to);
        return res.json({ data: result });
    } catch (err) {
        return res.status(500).json({ errors: err });
    }
};