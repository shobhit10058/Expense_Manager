import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './form.css'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [alert, setAlert] = useState({ show: false, variant: "primary", message: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signUp`, form);
      if (res.status === 200) {
        const {data } = res;
        setAlert({show: true, variant: "success", message: data.message});
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (e) {
      setAlert({show: true, variant: "danger", message: e.response.data.message});
    }
  }

  return (
    <div className="form-container">
      {
        alert.show && (
          <Alert variant={alert.variant}>
            <div className='d-flex justify-content-between'>
              <p>{alert.message}</p>
              <CloseButton onClick={() => setAlert({show: false})}/>
            </div>  
          </Alert>
      )}
      <h1 className='text-primary text-center'>SignUp</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} isInvalid={form.username.length === 0} />
          <Form.Control.Feedback type="invalid">
            Username cannot be empty
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} isInvalid={form.password.length === 0} />
          <Form.Control.Feedback type="invalid">
            Password cannot be empty
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} isInvalid={form.password !== form.confirmPassword} />
          <Form.Control.Feedback type="invalid">
            Passwords do not match
          </Form.Control.Feedback>
        </Form.Group>

        <div className='d-flex justify-content-between align-items-center'>
          <Button variant="primary" type='submit' onClick={handleSubmit} disabled={form.username.length === 0 || form.password.length === 0 || form.password !== form.confirmPassword}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default SignUp