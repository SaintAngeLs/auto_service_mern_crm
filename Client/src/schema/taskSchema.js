import * as yup from 'yup'

export const TaskSchema = yup.object({

    title: yup.string().required("Title Is required"),
    category: yup.string(),
    categoryTask: yup.string(),
    description: yup.string(),
    notes: yup.string(),
    
    // assignmentTo: yup.string(),
    // assignmentToLead: yup.string(),
    assignmentToCustomer: yup.string() ||  undefined,
    assignmentToLead: yup.string()||  undefined,
    assignmentToVehicle: yup.string() ||  undefined,

    reminder: yup.string(),
    start: yup.string().required("Start Is required"),
    end: yup.string(),

    backgroundColor: yup.string(),
    borderColor: yup.string(),
    textColor: yup.string(),
    display: yup.string(),
    url: yup.string(),

    createBy: yup.string(),
})