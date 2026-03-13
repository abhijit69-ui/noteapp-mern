import { useState } from 'react';
import { registerUser } from '../lib/auth';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (!form.email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await registerUser(form);

      toast.success('Account created! Please log in.');

      navigate('/login');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Error creating account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-md mx-auto'>
          <div className='card bg-base-100 shadow-lg'>
            <div className='card-body'>
              <h2 className='card-title justify-center text-2xl mb-2'>
                Create Account
              </h2>

              <p className='text-center text-sm text-base-content/70 mb-6'>
                Join <small className='font-bold'>桜</small>Kiroku and start
                saving your notes 🌸
              </p>

              <form onSubmit={handleSubmit}>
                {/* NAME */}
                <div className='flex flex-col gap-2 mb-4'>
                  <label className='label'>
                    <span className='text-sm font-medium'>Name</span>
                  </label>

                  <input
                    className='input input-bordered w-full'
                    type='text'
                    name='name'
                    placeholder='Your name'
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                {/* EMAIL */}
                <div className='flex flex-col gap-2 mb-4'>
                  <label className='label'>
                    <span className='text-sm font-medium'>Email</span>
                  </label>

                  <input
                    className='input input-bordered w-full'
                    type='email'
                    name='email'
                    placeholder='email@example.com'
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                {/* PASSWORD */}
                <div className='flex flex-col gap-2 mb-6'>
                  <label className='label'>
                    <span className='text-sm font-medium'>Password</span>
                  </label>

                  <input
                    className='input input-bordered w-full'
                    type='password'
                    name='password'
                    placeholder='Minimum 6 characters'
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <div className='card-actions justify-center'>
                  <button
                    className='btn btn-primary w-full'
                    type='submit'
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Account'}
                  </button>
                </div>
              </form>

              {/* LOGIN LINK */}
              <p className='text-center text-sm mt-4'>
                Already have an account?{' '}
                <Link to='/login' className='link link-primary'>
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
