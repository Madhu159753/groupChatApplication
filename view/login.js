async function login(event){
    event.preventDefault();
    const loginData={
        email:event.target.email.value,
        password:event.target.password.value
    }   
    console.log(loginData)
    try{
        const result=await axios.post("http://localhost:3000/login",loginData)
        localStorage.setItem('token',result.data.token)
       // if(result.status===200){
            window.alert(result.data.message);
           
           // window.location.href='chatpage.html';
        //}
        // else{
        //     throw new Error('some thing went wrong');
        // }

    }catch(err){
     console.log(err)
    // Document.body.innerHTML=`<div style="color:red">please put correct email and password</div>`
    }
}