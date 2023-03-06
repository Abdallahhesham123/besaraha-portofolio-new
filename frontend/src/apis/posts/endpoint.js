const endpoints ={
    

    getAll :()=>{
            return {

                url : `/message/getALLMessages`,
                options:{
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            }
                
                    },
   getoneMessage :(id)=>{
        return {

            url : `/message/getoneMessage/${id}`,
            options:{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
        }
            
                },
   deleteMessage :(id)=>{
        return {

            url : `/message/findOneAndDeleteMessage/${id}`,
            options:{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }
        }
            
                },
                addOnePost:(dataToSend , id)=>{
                    return {
                        url : `/message/add-message/${id}`,
                        options:{
                            method: 'POST',
                            body: JSON.stringify(dataToSend),
                            headers: {

                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    }

                },
                updateMessagePost:(updatedataToSend ,id)=>{
                    return {
                        url : `/message/UpdateMessage/${id}`,
                        options:{
                            method: 'PUT',
                            body: JSON.stringify(updatedataToSend),
                            headers: {

                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                            },
                        }
                    }

                }
}

export default endpoints;