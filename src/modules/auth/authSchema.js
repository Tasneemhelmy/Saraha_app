import joi from "joi";

export const userSchema=joi.object({
    name:joi.string().required().min(3).max(15).lowercase().trim(),
    email:joi.string().required().email(),
    gender:joi.string().valid('female','male'),
    password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char'),
    confirmPassword:joi.string().valid(joi.ref('password')).required()
}) .required()

export const loginSchema=joi.object({
    email:joi.string().required().email(),
    password:joi.string().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .message('password must be 8 characters long and contain at least one lowercase letter,one uppercase letter,numbers,Special_Char')


}).required()