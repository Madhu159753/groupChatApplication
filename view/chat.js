async function chatData(event){
    event.preventDefault();
    const data={
        message:event.target.message.value
    };


    const token=localStorage.getItem('token');
    try{
  
      const result=await axios.post("http://localhost:3000/message/chat",data,{headers:{Authorization:token}})
        //showmessageOnScreen(result.data.message)
       // event.target.message.value='';
        let name=localStorage.getItem('name');
        saveToLocal(result.data.data)
    
       window.location.reload()
    
    }
    catch(err){
    console.log(err)
    }
}

function showmessageOnScreen(user){
    const parentNode=document.getElementById('list')
    const childHTML=`<p id=${user.id}>${user.name}:${user.message}</p>`
    parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

// window.addEventListener("DOMContentLoaded",async()=>{
//         const token=localStorage.getItem('token')
//         const name=localStorage.getItem('username')
//   try{
//     const result=await axios.get("http://localhost:3000/message/getchat")
//             for(var i=0;i<result.data.allData.length;i++){
      
//                 showmessageOnScreen(result.data.allData[i]);
//             }  

// }

// catch(err){
// console.log(err)
// }
// })

window.addEventListener('DOMContentLoaded',async(event)=>{
    event.preventDefault();
    const token=localStorage.getItem('token');
    let lastId;
    const messages=JSON.parse(localStorage.getItem('msg'));
    if(messages==undefined || messages.length==0){
        lastId=0;
    }
    else{
        lastId=messages[messages.length-1].id;
    }
    try{
        let response=await axios.get(`http://localhost:3000/message/getchat?msg=${lastId}`, {headers:{"Authorization": token}})
       console.log('getmessage response',response);
       var newArr=response.data.messagetosend;
       saveToLocal(newArr)
    }
    catch(err){
        console.log(err);
    }
})

 function saveToLocal(arr){

    var chatArray=[];
    
    let oldMessage=JSON.parse(localStorage.getItem('msg'));
    if(oldMessage==undefined || oldMessage.length==0){
        chatArray=chatArray.concat(arr)
    }
    if(chatArray.length>10){
        let remove=chatArray.length-10;
        for(let i=0;i<remove;i++){
            chatArray.shift();
        }
        
    }
    else{
       chatArray=[];
        chatArray=chatArray.concat(oldMessage,arr);
    }
   
    localStorage.setItem('msg',JSON.stringify(chatArray))
  
   showChatOnScreen();   
}

function showChatOnScreen(){
    //console.log('inside show on screen',name)
   // localStorage.setItem('name',name)
    let chatArray=localStorage.getItem('msg')
    //console.log("chat on screen arr",chatArray);
    let newChatArray=JSON.parse(chatArray);

    const parentNode=document.getElementById('list')

    newChatArray.forEach(chat => {
        let childNode=`<p> ${chat.name}:${chat.message}</p>`
        parentNode.innerHTML=parentNode.innerHTML+childNode;
    });
}

window.addEventListener("DOMContentLoaded",async()=>{
    const token=localStorage.getItem("token");
  try{
     const result=await axios.get("http://localhost:3000/message/getuser")
     console.log("123",result)
      for(let i=0;i<result.data.user.length;i++){
        showUser(result.data.user[i])
      }
    } 
  catch(err){
    console.log(err);
  }   
})
 function showUser(user){
    const parentNode=document.getElementById("user")
    const childNode=`<p>${user.name}:${user.email}</p>`
    parentNode.innerHTML=parentNode.innerHTML+childNode;
 }

