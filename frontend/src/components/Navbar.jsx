import { Link, useNavigate } from 'react-router';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../lib/axios';
import { logoutUser } from '../lib/auth';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get('/notes');
        setIsLoggedIn(true);
      } catch (error) {
        if (error.response?.status === 401) {
          setIsLoggedIn(false);
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };
  return (
    <header className='bg-base-300 border-b border-base-content/10'>
      <nav className='mx-auto max-w-6xl p-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-primary font-mono tracking-tight'>
            桜Kiroku
          </h1>
          <div className='flex items-center gap-4'>
            {isLoggedIn ? (
              <>
                <Link to={'/create'} className='btn btn-primary btn-sm'>
                  <PlusIcon size={14} />
                  New Note
                </Link>

                <button
                  onClick={handleLogout}
                  className='btn btn-outline btn-primary btn-sm'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='btn btn-outline btn-primary btn-sm'
                >
                  Log In
                </Link>

                <Link to='/register' className='btn btn-primary btn-sm'>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
