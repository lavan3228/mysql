import Joi from "joi"

class validation {
    
    // author validation

    createAuthorValidation = Joi.object({
        name:Joi.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().required(),
        gender:Joi.string().valid('male', 'female').required(),
        birth_place:Joi.string().min(2).max(16).required(), 
    })

    updateAuthorValidation = Joi.object({
        name:Joi.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().optional(),
        gender:Joi.string().valid('male', 'female').optional(),
        birth_place:Joi.string().min(2).max(16).optional(), 
    })
    
    //book validation 

    createBookValidation = Joi.object({
        title:Joi.string().min(2).max(124).trim().required(),
        AuthorId:Joi.number().integer().required(),
        rating:Joi.number().min(1).max(5).required(),
        pages:Joi.number().integer().required(),
        price:Joi.number().integer().required()
    }) 

    updateBookValidation = Joi.object({
        title:Joi.string().min(2).max(124).trim().optional(),
        AuthorId:Joi.number().integer().optional(),
        rating:Joi.number().min(1).max(5).optional(),
        pages:Joi.number().integer().optional(),
        price:Joi.number().integer().optional()
    }) 

    //user validation

    createUserValidation = Joi.object({
        username:Joi.string().pattern(/^[a-z or A-Z or .]+$/).min(2).max(16).trim().required(),
        mail: Joi.string().min(5).max(32).required().email({ minDomainSegments: 2, tlds: { allow: ['com'] } }),
        password: Joi.string().min(3).max(15).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    })

    updateUserValidation = Joi.object({
        username:Joi.string().optional(),
        mail: Joi.string().min(5).max(26).email({ minDomainSegments: 2, tlds: { allow: ['com'] } }).optional(),
        password: Joi.string().min(3).max(15).optional()
    })
}   

export default new validation