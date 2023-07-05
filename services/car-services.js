const Car = require("../models/car.model");

const getCarById = async (id) => {
    try {
        const car = await Car.findById(id);
        if (!car) {
            return null;
        }
        return car;
    } catch (err) {
        console.error(err.message);
        return null;
    }
};

module.exports = {
    getCarById,
};
