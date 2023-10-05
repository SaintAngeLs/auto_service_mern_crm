const mongoose = require('mongoose');

const Task = new mongoose.Schema({

    title: String,
    category: String,

    categoryTask: {
        type: String,
        enum: ['Service', 'Follow-Up', 'Sales', 'Support', 'Warranty', 'Others'], // Tailored categories for automotive
    },

    description: String,

    notes: String,
    
    assignmentToCustomer: {  // Renamed for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
    },
    assignmentToLead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
    },
    assignmentToVehicle: {  // New field for tasks related to specific vehicles
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
    },
    
    reminder: Date,  // Changed to Date type for better querying and manipulation
    start: Date,  // Changed to Date type
    end: Date,  // Changed to Date type
    
    backgroundColor: String,  // For calendar or UI purposes
    borderColor: String,  // For calendar or UI purposes
    textColor: String,  // For calendar or UI purposes
    display: String,
    
    url: String,  // For linking to more detailed information or external resources
    
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Fixed the reference to 'User'
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('task', Task);