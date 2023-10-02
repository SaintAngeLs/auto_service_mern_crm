const mongoose = require('mongoose');

// vehicleSchema fot the mongoose
const property = new mongoose.Schema({



    // 1. Basic Vehicle Information:
    brand: String,
    model: String,
    year: Number,
    mileage: Number,
    VIN: String,
    vehicleDescription: String,

    // 2. Technical Specifications:
    engineType: String,
    transmission: String,
    fuelType: String,
    color: String,
    doors: Number,

    // 3. Media and Visuals:
    vehiclePhotos: [],
    vehicleVideos: [],
    vehicleDocuments: [],

    // 4. Availability and Pricing:
    availabilityStatus: String,
    price: Number,
    promotions: String,

    // 5. Service History:
    serviceRecords: [],

    // 6. Associated Contacts:
    previousOwners: [String],
    currentOwner: String,
    associatedServiceAgents: [String],

    // 7. Vehicle Notes and Comments:
    internalNotesOrComments: String,
    deleted: {
        type: Boolean,
        default: false,
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 8. Custom Fields
});

module.exports = mongoose.model('property', property)
