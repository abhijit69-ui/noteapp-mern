import { useState } from 'react';
import { loginUser } from '../lib/auth';
import { useNavigate, Link } from 'react-router';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
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
    if (!form.email.trim()) {
      toast.error('Email is required');
      return false;
    }

    if (!form.password.trim()) {
      toast.error('Password is required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await loginUser(form);

      toast.success('Welcome back!');

      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Invalid email or password');
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
                Log In
              </h2>

              <p className='text-center text-sm text-base-content/70 mb-6'>
                Welcome back to <small>桜</small>Kiroku 🌸
              </p>

              <form onSubmit={handleSubmit}>
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
                    placeholder='Enter your password'
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
                    {loading ? 'Logging in...' : 'Log In'}
                  </button>
                </div>
              </form>

              {/* REGISTER LINK */}
              <p className='text-center text-sm mt-4'>
                Don’t have an account?{' '}
                <Link to='/register' className='link link-primary'>
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
