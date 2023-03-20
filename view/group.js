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