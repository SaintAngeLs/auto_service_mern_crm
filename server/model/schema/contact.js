const mongoose = require('mongoose');


const Contact = new mongoose.Schema({

    // 1. Basic Information of the contact :
    firstName: String,
    lastName: String,
    title: String,
    email: String,
    phoneNumber: Number,
    mobileNumber: Number,
    physicalAddress: String,
    preferredContactMethod: String,

    // 2. Lead Source Information
    leadSource: String,
    referralSource: String,
    campaignSource: String,

    // 3. Status and Classifications
    leadStatus: String,
    leadRating: Number,
    leadConversionProbability: String,

    // 4. Vehicles of Interest (Replacing Property of Interest)
    interestVehicle: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Vehicle',  // assuming you have a vehicle model
    }],

    // 5. Service History:
    serviceHistory: [{
        serviceType: String,
        serviceDate: Date,
        serviceNotes: String,
    }],

    // 6. Tags or Categories
    tagsOrLabelsForCategorizingContacts: String,

    // 7. Important Dates:
    birthday: Date,
    lastServiceDate: Date,  // added this field as it's more relevant

    // 8. Additional Personal Information
    dob: String,
    gender: String,
    occupation: String,
    vehiclePreference: String,  // user's preferred type or brand of vehicle

    // 9. Preferred Communication Preferences:
    communicationFrequency: String,
    preferences: String,

    // 10. Social Media Profiles:
    linkedInProfile: String,
    facebookProfile: String,
    twitterHandle: String,
    otherProfiles: String,

    // 11. Service Agent Assignment:
    serviceAgentOrTeamMember: String,  // renamed to better fit the context
    internalNotesOrComments: String,
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Contact', Contact)


