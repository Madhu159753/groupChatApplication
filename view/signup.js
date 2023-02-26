async function signup(event){
    event.preventDefault();
    const signupObject={
       name:event.target.name.value,
        email:event.target.email.value,
        phonenumber:event.target.phonenumber.value,
        password:event.target.password.value
    };
    
    try{
      const result=await axios.post("http://localhost:3000/signup-data",signupObject)
      if(result.status===201){  
        window.alert(result.data.message)
        window.location.href="login.html"
      }  
      else {
        throw new Error('Fail to login');
      }

    }catch(err){
        document.body.innerHTML+=`<div style="color:red">This email id and phonenumber is already used please use another one or login</div>`;
    }
} 