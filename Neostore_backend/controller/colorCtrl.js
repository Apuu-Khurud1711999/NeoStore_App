const Color = require('../models/ColorsSchema');

const colorCtrl = {
    getColors: async(req, res) =>{
        try {
            const colors = await Color.find()
            res.json(colors)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
}

module.exports = colorCtrl