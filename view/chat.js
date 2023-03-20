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


async function groupname(event){
    event.preventDefault();
   
    const obj={
        groupname:event.target.name.value
    };
    console.log ('new created group',obj);
    try{ 
    token=localStorage.getItem('token');  
    const data=await axios.post('http://localhost:3000/creategroup',obj, {headers:{Authorization:token}})
    
    }
    catch(err){
        console.log(err);
    }
}

window.addEventListener("DOMContentLoaded",async()=>{
    const token=localStorage.getItem('token');
    try{
  const result=await axios.get("http:/localhost:3000/getgroup",{headers:{Authorization:token}})
    const usergroups=result.data.usergps;
    document.getElementById("groups").innerHTML="";
    const groupcontainer=document.getElementById("groups")

    for(let i=0;i<usergroups.length;i++){
        const groupdiv=document.createElement("button");
        groupdiv.innerHTML=`<p>${usergroups[i].groupname}-${usergroups[i].id}<p>`
        groupdiv.classList.add("groupdiv");
        groupdiv.setAttribute("id",`${usergroups[i].id}`);
        groupcontainer.appendChild(groupdiv);
    }
}
    catch(err){
        console.log(err);
    }
})

const adduser=document.getElementById("adu");
adu.addEventListener("click",async(e)=>{
    e.preventDefault();
    const addingemail=document.getElementById("adduser").value;
    const groupid=document.getElementById("groupid").value;
    const makeadmin=document.getElementById("makeadmin").value;
    var adminright;
    if(makeadmin[0].checked){
        adminright="on";
    }
    else{
      adminright="off";
    }
    let addusertogroup={
        addingemail:addingemail,
        groupid:groupid,
        makeadmin:adminright,
    };
    console.log("add",addusertogroup)
    try{
        const token=localStorage.getItem('token');
    const result=await axios.post("http://localhost:3000/addusertogroup",addusertogroup,{headers:{Authorization:token}})
     alert("user added to group successfully");     
   }
    catch(err){
        console.log(err);
    }
})

const rmuser=document.getElementById("rmu");
rmuser.addEventListener("click",async(e)=>{
    e.preventDefault();
    const rmemail=document.getElementById("rmuser").value;
    const groupid=document.getElementById("gid").value;
    let rmuser={
        rmemail:rmemail,
        groupid:groupid

    };
    console.log("remove",rmuser)
    try{
        const token=localStorage.getItem('token');
        const result=await axios.post("http:localhost:3000/removeuser",rmuser,{headers:{Authorization:token}})
        alert('user remove successfully');
    }
    catch(err){
        console.log(err);
    }
})