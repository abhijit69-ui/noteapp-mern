import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import RateLimitUI from '../components/RateLimitUI';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios';
import NotesNotFound from '../components/NotesNotFound';
import { LoaderIcon } from 'lucide-react';

export default function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get('/notes');
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log('Error fetching notes', error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error('Failed to load notes!');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className='min-h-screen'>
      <Navbar />

      {isRateLimited && <RateLimitUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {/* Initial loading before UI render */}
        {loading && (
          <div className='min-h-screen bg-base-100 flex items-center justify-center'>
            <LoaderIcon className='animate-spin size-10' />
          </div>
        )}

        {/* If no notes created yet */}
        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {/* Render all notes */}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
