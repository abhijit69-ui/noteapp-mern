import { useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitUI from '../components/RateLimitUI';

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(true);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitUI />}
    </div>
  );
}
