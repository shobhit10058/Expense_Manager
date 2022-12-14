import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './form.css'
import axios from 'axios';
import Alert from 'react-bootstrap/Alert'
import CloseButton from 'react-bootstrap/CloseButton';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [alert, setAlert] = useState({ show: false, variant: "primary", message: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, form);
      if (res.status === 200) {
        const {data } = res;
        setAlert({show: true, variant: "success", message: data.message});
        localStorage.setItem("token", data.token);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
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
        <h1 className='text-danger text-center'>Login</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}/>
        </Form.Group> 

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}/>
        </Form.Group>
        <div className='d-flex justify-content-between align-items-center'>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Link to="/signup">Create Account</Link>
        </div>
      </Form>
    </div>
  )
}

export default Login