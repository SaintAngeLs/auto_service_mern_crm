const Task = require('../../model/schema/task')
const mongoose = require('mongoose');

const index = async (req, res) => {
    query = req.query;
    query.deleted = false;
    if (query.createBy) {
        query.createBy = new mongoose.Types.ObjectId(query.createBy);
    }

    try {
        let result = await Task.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: 'contacts',
                    localField: 'assignmentToCustomer',
                    foreignField: '_id',
                    as: 'contact'
                }
            },
            {
                $lookup: {
                    from: 'vehicles', // Assuming this is the collection name for 'leads'
                    localField: 'assignmentToVehicle',
                    foreignField: '_id',
                    as: 'Vehicle'
                }
            },
            {
                $lookup: {
                    from: 'leads', // Assuming this is the collection name for 'leads'
                    localField: 'assignmentToLead',
                    foreignField: '_id',
                    as: 'Lead'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createBy',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            { $unwind: { path: '$users', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$contact', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$Lead', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$Vehicle', preserveNullAndEmptyArrays: true } },
            { $match: { 'users.deleted': false } },
            {
                $addFields: {
                    assignmentToName: {
                        $cond: {
                            if: { $ne: ["$contact", null] },
                            then: { $concat: ['$contact.title', ' ', '$contact.firstName', ' ', '$contact.lastName'] },
                            else: {
                                $cond: {
                                    if: { $ne: ["$Lead", null] },
                                    then: { $concat: ['$Lead.leadName'] },
                                    else: { $concat: ['$Vehicle.VIN'] }  // Assuming VIN is the field name you want to use
                                }
                            }
                        }
                    },
                }
            },
            { $project: { users: 0, contact: 0, Lead: 0,  Vehicle: 0} },
        ]);
        console.log("indexing in the document processing ...")
        console.log("prosessing result:...", result)
        res.send(result);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}

const add = async (req, res) => {
    try {
        const { title, category, categoryTask, description, notes, reminder, start, end, backgroundColor, borderColor, textColor, display, url, createBy, assignmentToCustomer, assignmentToVehicle,  assignmentToLead } = req.body;
        // // Check if assignmentTo is a valid ObjectId if provided and not empty
        // if (assignmentToCustomer && !mongoose.Types.ObjectId.isValid(assignmentToCustomer)) {
        //     res.status(400).json({ error: 'Invalid assignmentTo value' });
        // }
        // if (assignmentToLead && !mongoose.Types.ObjectId.isValid(assignmentToLead)) {
        //     res.status(400).json({ error: 'Invalid assignmentToLead value' });
        // }
        // if (assignmentToVehicle && !mongoose.Types.ObjectId.isValid(assignmentToVehicle)) {
        //     res.status(400).json({ error: 'Invalid assignmentToLead value' });
        // }

        if (assignmentToCustomer && !mongoose.Types.ObjectId.isValid(assignmentToCustomer)) {
            res.status(400).json({ error: 'Invalid assignmentTo value' });
        }
        if (assignmentToLead && !mongoose.Types.ObjectId.isValid(assignmentToLead)) {
            res.status(400).json({ error: 'Invalid assignmentToLead value' });
        }
        if (assignmentToVehicle && !mongoose.Types.ObjectId.isValid(assignmentToVehicle)) {
            res.status(400).json({ error: 'Invalid assignmentToLead value' });
        }
        console.log("assignmentToCustomer. assignmentToLead, assignmentToVehicle are not 0 and are valid")
        const taskData = { 
            title, 
            category, 
            categoryTask,
            description, 
            notes, 
            assignmentToCustomer,
            assignmentToLead,
            assignmentToVehicle,
            backgroundColor, 
            borderColor, 
            textColor, 
            display, 
            url, 
            createBy 
        };

        if (assignmentToCustomer) {
            taskData.assignmentToCustomer = assignmentToCustomer;
        }
        if (assignmentToVehicle) {
            taskData.assignmentToVehicle = assignmentToVehicle;
        }
        if (assignmentToLead) {
            taskData.assignmentToLead = assignmentToLead;
        }
        console.log('task adding processing ... ')
        const result = new Task(taskData);
        await result.save();
        console.log('task adding ==> save ... ')
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to create task in the add function:', err);
        res.status(400).json({ error: 'Failed to create task in the add function: ', err });
    }
}

const edit = async (req, res) => {
    try {
        const { title, category, categoryTask, description, notes, reminder, start, end, backgroundColor, borderColor, textColor, display, url, createBy, assignmentTo } = req.body;

        if (assignmentToCustomer && !mongoose.Types.ObjectId.isValid(assignmentToCustomer)) {
            res.status(400).json({ error: 'Invalid assignmentTo value' });
        }
        const taskData = { title, category, categoryTask, description, notes, reminder, start, end, backgroundColor, borderColor, textColor, display, url, createBy };

        if (assignmentToCustomer) {
            taskData.assignmentToCustomer = assignmentToCustomer;
        }
        let result = await Task.updateOne(
            { _id: req.params.id },
            { $set: taskData }
        );

        // const result = new Task(taskData);
        // await result.save();
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to create task in the edit function:', err);
        res.status(400).json({ error: 'Failed to create task in the edit function: ', err });
    }
}

const view = async (req, res) => {
    try {
        let response = await Task.findOne({ _id: req.params.id })
        if (!response) return res.status(404).json({ message: "no Data Found." })
        let result = await Task.aggregate([
            { $match: { _id: response._id } },
            {
                $lookup: {
                    from: 'contacts',
                    localField: 'assignmentToCustomer',
                    foreignField: '_id',
                    as: 'Contact'
                }
            },
            {
                $lookup: {
                    from: 'leads', // Assuming this is the collection name for 'leads'
                    localField: 'assignmentToLead',
                    foreignField: '_id',
                    as: 'Lead'
                }
            },
            {
                $lookup: {
                    from: 'vehicles', // Assuming this is the collection name for 'leads'
                    localField: 'assignmentToVehicle',
                    foreignField: '_id',
                    as: 'Vehicle'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'createBy',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            { $unwind: { path: '$contact', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$users', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$Lead', preserveNullAndEmptyArrays: true } },
            { $unwind: { path: '$Vehicle', preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    assignmentToName: {
                        $cond: {
                            if: { $ne: ["$contact", null] },
                            then: { $concat: ['$contact.title', ' ', '$contact.firstName', ' ', '$contact.lastName'] },
                            else: {
                                $cond: {
                                    if: { $ne: ["$Lead", null] },
                                    then: { $concat: ['$Lead.leadName'] },
                                    else: { $concat: ['$Vehicle.VIN'] }  // Assuming VIN is the field name you want to use
                                }
                            }
                        }
                    },
                    createByName: '$users.username',
                }
            },
            { $project: { contact: 0, users: 0, Lead: 0, Vehicle: 0} },
        ])
        console.log("view document processing ...")
        console.log("prosessing result:...", result)
        res.status(200).json(result[0]);

    } catch (err) {
        console.log('Error:', err);
        res.status(400).json({ Error: err });
    }
}

const deleteData = async (req, res) => {
    try {
        
        const result = await Task.findByIdAndUpdate(req.params.id, { deleted: true });
        res.status(200).json({ message: "done", result })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}

module.exports = { index, add, edit, view, deleteData }