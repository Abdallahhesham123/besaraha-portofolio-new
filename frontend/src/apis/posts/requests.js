import endpoint from "./endpoint"
const {getAll,getoneMessage,deleteOnePost,addOnePost ,updateMessagePost,deleteMessage}= endpoint;
const requests = {
  getAll: async () => {
    const {url,options} = getAll();
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  getoneMessage: async (id) => {
    const {url,options} = getoneMessage(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  deleteOnePost: async (id) => {
    const {url,options} = deleteOnePost(id);
    const response = await fetch(url,options);
    const data = await response.json();

    return new Promise((resolve, reject) => {
      data ? resolve(data) : reject(new Error("undefined"));
    });
  },
  addOnePost: async(dataToSend ,id)=>{
    const {url,options} = addOnePost(dataToSend ,id);
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },
  updateMessagePost:async( updatedataToSend ,id)=>{
    const {url,options} = updateMessagePost( updatedataToSend ,id);
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },
  deleteMessage:async(id)=>{
    const {url,options} = deleteMessage(id);
    const response = await fetch(url,options);
    const data = await response.json();
    return new Promise((resolve, reject) => {
      data ? resolve({

        response: response,
        data : data
      })
       :
      
      reject(new Error("undefined"));
    });
  },
  
};
export default requests;
