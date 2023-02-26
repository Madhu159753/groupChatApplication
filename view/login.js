async function login(event){
    event.preventDefault();
    const loginData={
        email:event.target.email.value,
        password:event.target.password.value,
        
    }   
    
    try{
        const result=await axios.post("http://localhost:3000/login",loginData)
        localStorage.setItem('token',result.data.token)
        localStorage.setItem('name',result.data.name)
       // console.log(result.data.name)
       // localStorage.setItem('username',result.data.name)
        
        if(result.status===200){
            window.alert(result.data.message);
           
         window.location.href='chatPage.html';
        }
        else{
            throw new Error('some thing went wrong');
         }

    }catch(err){
     console.log(err)
    // Document.body.innerHTML=`<div style="color:red">please put correct email and password</div>`
    }
}