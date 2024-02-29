import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
export default function Login() {
  const [credentials,setCredendtials] = useState({email:"",password:""});
  let navigate = useNavigate();
  const handleSubmit =async (e)=>{
      e.preventDefault() ;
      console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
      const response =await fetch("http://localhost:5000/api/loginUser",{
       method:'POST',
       headers:{
           'Content-Type':'application/json'
       },
       body:JSON.stringify({email:credentials.email,password:credentials.password})
      })
      const json = await response.json();
      console.log(json);
      if(!json.success){
       alert('Enter a valid credentials..')
      }
      if(json.success){
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate('/');
      }        
   }
 

const onChange = (event)=>{
  setCredendtials({...credentials,[event.target.name]:event.target.value});
}
  return(
    <div>
    <div className='container p-3'>

<form onSubmit={handleSubmit}>
<div className="htmlForm-group mb-3">
<label htmlFor="exampleInputEmail1">Email address</label>
<input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
<small id="emailHelp" className="htmlForm-text text-muted">We'll never share your email with anyone else.</small>
</div>
<div className="htmlForm-group mb-3">
<label htmlFor="exampleInputPassword1">Password</label>
<input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
</div>
<button type="submit" className="m-3 btn btn-success">Submit</button>
<Link to="/createUser" className='m-3 btn btn-danger'>I'm a new user</Link>
</form>
</div>
    </div>
  ) 
  
}
