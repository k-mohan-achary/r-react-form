import React, { Component, useState, useEffect } from 'react';
import '../css/form.css';


export const Form = () => {
    const initialValues ={username:"", email:"", password:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit,setIsSubmit] = useState (false);

    const hanndleChange = (e) => { 
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
        console.log(formValues);

    };
    const handleSubmit =(e)=>{
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

    };
    useEffect(()=>{
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit){
            console.log(formValues)
        }


    },[formErrors]);



    const validate = (values) =>{
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^s@]{2,}$/i;
         
        if(!values.username){
            errors.username ="Username is Required !";
        }
        if(!values.email){
            errors.email ="Email is Required !";
        } else if (!regex.test(values.email)){
            errors.email ="This is not a valid emeil format";
        }

        if(!values.password){
            errors.password ="Password is Required !";
        } else if (values.password.length < 5 ) {
            errors.password ="Password must be more than 5 chracter";
        }

        return errors;

         

    };

     
  return (
    <>
      <div>
        <h1>Form</h1> 
        <div className='container'>
           
            <div className='row form-c'>
                <div className='col-md-6'>
                    <div className='form-div'>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter User Name" name='username' value={formValues.username} onChange={hanndleChange} />
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <p>{formErrors.username}</p>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name='email' value={formValues.email} onChange={hanndleChange} />
                        {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <p>{formErrors.email}</p>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={formValues.password} onChange={hanndleChange} />
                    </div> 
                    <p>{formErrors.password}</p>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                    </div> 
                </div>
            </div>
            {Object.keys(formErrors).length === 0 && isSubmit ? (<div className='ui message succes'>Signed in succesfully </div>) :( <pre>
                {JSON.stringify(formValues, undefined, 2)}
            </pre>) }
            
        </div>
        

      </div> 
    </>
    
  )
}
