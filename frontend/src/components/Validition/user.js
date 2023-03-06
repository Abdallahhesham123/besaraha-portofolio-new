const messages = {
  required: "frontend: This field is required",
  username: () =>
    `frontend: your name must be between 3-7 character `,
    age: () =>
    `frontend: Please enter a Number between 15 to 100`,
    FirstName: () =>
    `frontend: your name must be Started With Capital letter between 3-7 character`,
    LastName: () =>
    `frontend: your name must be Started With Capital letter between 3-7 character`,
    phone: () =>
    `frontend: Please enter a 11 numbers`,

};
// const validationErrors = validate(username, age ,FirstName,LastName ,phone);
const rules = {
  required: (val) => (val ? "pass" : messages.required),

  username: (val) =>{
      const username = /[a-zA-Z\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{1,20}$/
      return(

        username.test(val) ? "pass" :messages.username()

      )
  },
  FirstName: (val) =>{
      const FirstName =  /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{3,7}$/;
      return(

        FirstName.test(val) ? "pass" :messages.FirstName(val)

      )
  }, 
  LastName: (val) =>{
    const LastName = /[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{3,7}$/;
    return(

      LastName.test(val) ? "pass" :messages.LastName(val)

    )
},
  age: (val) =>{
      const age = /^[1-9]$|^[1-9][0-9]$|^(100)$/;
      return(

        age.test(val) ? "pass" :messages.age(val)

      )
  },
  phone: (val) =>{
    const phone =/^01[0125][0-9]{8}$/
    return(

      phone.test(val) ? "pass" :messages.phone(val)

    )
}
};

const validator = {

  username: (val) => {
      return [
        rules.required(val),
        rules.username(val),
     
      ];
    },
    age: (val) => {
      return [
        rules.required(val),
        rules.age(val),
     
      ];
    }
    ,
    phone: (val) => {
      return [
        rules.required(val),
        rules.phone(val),
     
      ];
    },
    LastName: (val) => {
      return [
        rules.required(val),
        rules.LastName(val),
     
      ];
    },
    FirstName: (val) => {
      return [
        rules.required(val),
        rules.FirstName(val),
     
      ];
    }

};




const validate = ( username ,age ,FirstName ,LastName , phone ) => {
  const errors = {  username: "" , age: "" , phone: "" , LastName: "" , FirstName:""};
  
  errors.username = validator.username(username).find((y) => y !== "pass") || "";
  errors.age = validator.age(age).find((y) => y !== "pass") || "";
  errors.FirstName = validator.FirstName(FirstName).find((y) => y !== "pass") || "";
  errors.LastName = validator.LastName(LastName).find((y) => y !== "pass") || "";
  errors.phone = validator.phone(phone).find((y) => y !== "pass") || "";
  return {  ...errors};
};

export default validate;