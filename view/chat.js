async function chatData(event){
    event.preventDefault();
    const data={
        message:event.target.message.value
    };

    const token=localStorage.getItem('token');
    try{
   const result=await axios.post("http://localhost:3000/chat",data,{headers:{"Authorization":token}})
      showmessageOnScreen(result.data.message)
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

window.addEventListener("DOMContentLoaded",async ()=>{
    const token=localStorage.getItem('token')
try{
const result=await axios.get("http://localhost:3000/getchat",{headers:{"Authorization":token}})
   //console.log(result)
for(var i=0;i<result.data.allData.length;i++){
    showmessageOnScreen(result.data.allData[i]);
  }
}
catch(err){
console.log(err)
}
})
