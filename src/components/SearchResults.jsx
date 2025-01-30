import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchResultsPage() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [fullName, setFullName] = useState('');
  const navigate = useNavigate();

  // Handle search when form is submitted
  const handleSearch = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter a patient name to search.");
      return;  // Prevent search if fullName is empty
    }

    try {
      // Encode the full name to handle special characters
      const encodedFullName = encodeURIComponent(fullName.trim());
      navigate(`/search-results?fullName=${encodedFullName}`);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
    }
  };

  useEffect(() => {
    // Extract query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const fullName = queryParams.get('fullName') || '';

    if (fullName) {
      fetchSearchResults(fullName);
    } else {
      toast.error('No search query provided');
      setIsLoading(false);
    }
  }, [location.search]);

  const fetchSearchResults = async (fullName) => {
    try {
      setIsLoading(true);
      // Make a request to the backend with fullName only
      const response = await axios.get(
        `https://lifelink-ordc.onrender.com/patients/search?fullName=${encodeURIComponent(fullName)}`
      );

      // Handle the response data
      if (response.data && response.data.users) {
        const results = response.data.users.filter(user =>
          user.fullName.toLowerCase().includes(fullName.toLowerCase()) // Match partial name case-insensitively
        );
        setSearchResults(results);  // Filter results by fullName
      } else {
        setError('No patients found matching your search');
        setSearchResults([]);
      }
      setError('');
    } catch (err) {
      console.error('Search results error:', err);
      toast.error('Failed to fetch search results');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <ToastContainer />
      <header className="border-b bg-white/50 backdrop-blur-sm fixed w-screen top-0 z-50">
        <div className="container mx-full px-20 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              LifeLink
            </span>
          </Link>
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="search"
                className="w-full h-10 rounded-xl border-2 border-indigo-600 outline-0 p-6 pr-12"
                placeholder="Search Patient by name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-600 hover:bg-indigo-100 rounded-full transition-all"
              >
                <Search className="h-6 w-6" />
              </button>
            </div>
          </form>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-5 mt-30 pb-20">
        <div className="min-h-screen bg-gray-50">
          <ToastContainer />
          <div className="container mx-auto mt-20 sticky top-24 p-4">
            {searchResults.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold">Search Results</h2>
                <table className="table-auto w-full mt-4 border-collapse border border-gray-300">
                  <thead className="sticky top-0 bg-white z-10 shadow-md">
                    <tr>
                      <th className="border px-4 py-2 text-center">Name</th>
                      <th className="border px-4 py-2 text-center">Address</th>
                      <th className="border px-4 py-2 text-center">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map(user => (
                      <tr key={user._id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">
                          <Link to={`/patients/${user._id}`} className="text-indigo-600 hover:underline">
                            {user.fullName}
                          </Link>
                        </td>
                        <td className="border px-4 py-2">{user.address}</td>
                        <td className="border px-4 py-2">
                          <img
                            src={`https://lifelink-ordc.onrender.com${user.image}`}
                            alt={user.fullName}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4">No matching patients found.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchResultsPage;
