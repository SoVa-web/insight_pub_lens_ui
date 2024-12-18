import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../media/books_background_login.jpg';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
            username: '',
            email: '',
            password: '',
          });
        
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
          };
        
          const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            console.log('Registration Data:', formData);
          };


  return (
    <div className="card p-4 shadow-sm"
     style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
          type="email" 
          className="form-control" 
          placeholder="Enter your email"
          onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
          type="password" 
          className="form-control" 
          placeholder="Enter your password" 
          onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>
      <p className="mt-3 text-center text-gradient">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
