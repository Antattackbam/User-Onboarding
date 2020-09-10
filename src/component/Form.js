import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import User from './User';
import axios from 'axios';
import * as yup from 'yup';

const formSchema = yup.object().shape({ 
    name: yup
        .string()
        .min(3, 'At least 3 letters homie cuz')
        .required('Enter name.'),
    email: yup
        .string()
        .email('Must be a valid email address')
        .required('Enter email.'),
    password: yup
        .string()
        .min(6, 'At least 6 letters bromigo')
        .required('Please enter a password'),
    terms: yup
        .boolean()
        .oneOf([true], 'Please agree to terms of use')
        .required('You must accept Terms of Service')
})

const FormBox = styled.form`
    display: flex;
    color: white;
    flex-direction: column;
    width: 50%;
    justify-content: flex-start;  
    margin: 0 auto;
`;

const UserCard = styled.div`
    display: flex;
    margin: 0 auto;
    justify-content: center;
    padding-top: 100px;
    width: 50%;
`;



const Form = () => {
    const initialFormData = {
        name: '',
        email: '',
        password: '',
        terms: false
    };

const [formState, setFormState] = useState(initialFormData);
const [userList, setUserList] = useState([])
const [buttonDisabled, setButtonDisabled] = useState(true)
const [errorState, setErrorState] = useState({...initialFormData, terms: ""})


const validate = (e) => {
    yup.reach(formSchema, e.target.name)
       .validate(e.target.value)
       .then(valid=>{
           setErrorState({
               ...errorState,
               [e.target.name]: ""
           })
       })
       .catch(error =>{
           console.log(error.errors)
           setErrorState({
               ...errorState, 
               [e.target.name]: error.errors[0]
           })
       })
}
const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://reqres.in/api/users', formState)
    .then(response => {
        const u = response.data
        setUserList([...userList, u])
        console.log(response.data)
        setFormState(initialFormData) 
    })
}

const handleChange = e =>{
    e.persist();
    validate(e)
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormState({ ...formState, [e.target.name]: value, id: Date.now()})
}








    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState])

    return (
        <div>
        <FormBox onSubmit={handleSubmit}>
            <label>
            {errorState.name.length > 0 ? <p className="error">{errorState.name}</p> : null}
                Name:
                <input 
                id='nameInput'
                name='name'
                placeholder='Enter your name' 
                type='text'
                value={formState.name}
                onChange={handleChange} />
                
            </label>
            <label>
                Email:
                <input 
                id='emailInput'
                name='email'
                placeholder='Enter your email' 
                type='text'
                value={formState.email}
                onChange={handleChange}
                />
            </label>
            <label>
                Password:
                <input 
                id='passwordInput'
                name='password'
                placeholder='password' 
                type='password'
                value={formState.password}
                onChange={handleChange} />
                {errorState.password.length > 0 ? <p className="error">{errorState.password}</p> : null}
            </label>
            <label>
                <p>Do you accept terms?</p>
                <input 
                id='checkboxInput'
                name='terms' 
                type='checkbox'
                value={formState.terms}
                onChange={handleChange} />
            </label>
            <button>Submit</button>
        </FormBox>
        <UserCard>
            <User users={userList}/>
        </UserCard>
        </div>

    )
}

export default Form;