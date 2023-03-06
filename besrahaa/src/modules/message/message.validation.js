import joi from "joi";

export const messageSchema = {
    body: joi.object({
      Message: joi.string().min(3).max(1500).required().messages({
        "any.required":"Message field is required",
        "string.empty":"Please fill your Message field",
        "string.min" :"Please enter a valid message greater than  3 charachter",
        "string.max" :"Please enter a valid message less than  1500 charachter"

      })
    }).required(),
    params:joi.object({

        receiverId:joi.string().min(24).max(24).required().messages({
            "any.required":" receiverId is required",
            "string.min" :"Please enter a valid receiverId equal  24 charachter",
            "string.max" :"Please enter a valid receiverId equal  24 charachter"
        })
    }).required()
  };
  export const messageDeleteSchema = {
    params: joi.object({
      messageId: joi.string().min(24).max(24).required().messages({
        "any.required":"Message field is required",
        "string.min" :"Please enter a valid messageId not greater than  24 charachter",
        "string.max" :"Please enter a valid message not less than  24 charachter"

      })
    }).required(),
    headers: joi.object({
      'authorization': joi.string().required().messages({
          "any.required":"headers must have  abearerkey"
      })
  }).options({ allowUnknown: true })
  };

  export const messageUpdateSchema = {
  body: joi.object({
      Message: joi.string().min(3).max(1500).required().messages({
        "any.required":"Message field is required",
        "string.min" :"Please enter a valid message not less than  3 charachter",
        "string.max" :"Please enter a valid message not greater than  1500 charachter"

      })
    }).required(),
    params: joi.object({
      messageId: joi.string().min(24).max(24).required().messages({
        "any.required":"Message field is required",
        "string.min" :"Please enter a valid messageId not greater than  24 charachter",
        "string.max" :"Please enter a valid message not less than  24 charachter"

      })
    }).required(),
    headers: joi.object({
      'authorization': joi.string().required().messages({
          "any.required":"headers must have  abearerkey"
      })
  }).options({ allowUnknown: true })
  };
  