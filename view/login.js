async function login(event){
    login.preventDefault();
    const loginData={
        email:event.target.email.value,
        password:event.target.password.value
    }   
    try{
        const result=await axios.post("http://localhost :3000/login",loginData)
        if(result.status===201){
            window.alert(result.data.message);
            window.location.href='chatpage.html';
        }
        else{
            throw new Error('some thing went wrong');
        }

    }catch(err){
     console.log(err)
     Document.body.innerHtml=`<div style="color:red">please put correct email and password</div>`
    }
}