import * as yup from 'yup'

const objectIdValidation = yup.string()
  .matches(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format")
  .required("This field is required");

export const TaskSchema = yup.object({

    title: yup.string().required("Title Is required"),
    category: yup.string(),
    categoryTask: yup.string().oneOf(['Service', 'Follow-Up', 'Sales', 'Support', 'Warranty', 'Others'], 'Invalid category task value'),
    description: yup.string(),
    notes: yup.string(),
    
    // assignmentTo: yup.string(),
    // assignmentToLead: yup.string(),
    assignmentToCustomer: objectIdValidation,
    assignmentToLead: objectIdValidation,
    assignmentToVehicle: objectIdValidation,

    reminder: yup.string(),
    start: yup.string(),
    end: yup.string(),

    backgroundColor: yup.string(),
    borderColor: yup.string(),
    textColor: yup.string(),
    display: yup.string(),
    url: yup.string(),

    createBy: yup.string(),
})