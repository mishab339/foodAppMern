import React, { useState} from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [credentials,setCredendtials] = useState({name:"",email:"",password:"",geolocation:""});

        const handleSubmit =async (e)=>{
            e.preventDefault() ;
            const response =await fetch("http://localhost:5000/api/createUser",{
             method:'POST',
             headers:{
                 'Content-Type':'application/json'
             },
             body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
            })
            const json = await response.json();
            if(!json.success){
             alert('Enter a valid credentials..')
            }        
         }
       
  
    const onChange = (event)=>{
        setCredendtials({...credentials,[event.target.name]:event.target.value});
    }
  return (
    <div>
    <div className='container p-3'>

<form onSubmit={handleSubmit}>
<div className="htmlForm-group mb-3">
<label htmlFor="name">Name</label>
<input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
</div>
<div className="htmlForm-group mb-3">
<label htmlFor="exampleInputEmail1">Email address</label>
<input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
<small id="emailHelp" className="htmlForm-text text-muted">We'll never share your email with anyone else.</small>
</div>
<div className="htmlForm-group mb-3">
<label htmlFor="exampleInputPassword1">Password</label>
<input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
</div>
<div className="htmlForm-group mb-3">
<label htmlFor="exampleInputAddress">Address</label>
<input type="text" className="form-control" id="exampleInputAddress" name='geolocation' value={credentials.geolocation} onChange={onChange}/>
</div>
<button type="submit" className="m-3 btn btn-success">Submit</button>
<Link to="/login" className='m-3 btn btn-danger'>Already a user?</Link>
</form>
</div>
    </div>
  )
}
