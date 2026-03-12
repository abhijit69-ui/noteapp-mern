import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';

export default function App() {
  return (
    <div
      data-theme='valentine'
      className='min-h-screen'
      style={{
        background:
          'radial-gradient(125% 125% at 50% 10%, #fff0f6 55%, #ff8fb1 100%)',
      }}
    >
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}
