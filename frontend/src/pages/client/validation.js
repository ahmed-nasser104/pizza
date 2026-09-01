import * as Yup from "yup";

export const validationSchema = Yup.object({
  fullName: Yup.string()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),

  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),

  street: Yup.string().required("Street address is required"),

  building: Yup.string().required("Apartment / Building is required"),

  city: Yup.string().required("City is required"),

  postalCode: Yup.string().required("Postal code is required"),

  notes: Yup.string(),
});
