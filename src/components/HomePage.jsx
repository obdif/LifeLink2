import React, { useState, useEffect } from 'react';
import { Heart, Plus, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import maleNurse from '../assets/male-nurse.jpg';
import femaleDoctor from '../assets/patient-data.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';




function HomePage() {
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true); 
  const [file, setFile] = useState(null);

  // Simulate authentication check
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setTimeout(() => setIsLoading(false), 1000); // Simulate loading time
  }, []);


  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);



// ==================== HANDLE IMAGE UPLOAD ====================
  // const handleFileChange = (event) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setFilePreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  

  // ==================== HANDLE IMAGE SEARCH ====================

  const handleImageSearch = async (e) => {
    e.preventDefault();
    setError('');

    if (!file) {
      setError('Please upload an image to search.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('https://lifelink-ordc.onrender.com/hospital/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data?.patientId) {
        toast.success('Patient found!');
        navigate(`/patients/${response.data.patientId}`); // Redirect to patient details page
      } else {
        setError('No patient found with this image.');
        toast.error('No match found.');
      }
    } catch (err) {
      setError('Error searching patient. Please try again.');
      toast.error('Error searching patient.');
    }
  };



  const handleSearch = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error('Please enter a patient name to search.');
      return;
    }

    setIsLoading(true); // Start loading state for search

    try {
      const encodedFullName = encodeURIComponent(fullName.trim());
      // Simulate API call or navigation with loading
      setTimeout(() => {
        navigate(`/search-results?fullName=${encodedFullName}`);
        setIsLoading(false); // Stop loading once navigation is complete
      }, 1000);
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while searching. Please try again.');
      setIsLoading(false); // Stop loading even if there is an error
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <ToastContainer />
      <header className="border-b bg-white/50 backdrop-blur-sm fixed w-full top-0 z-50 " data-aos="fade-up">
        <div className="container mx-auto px-4 md:px-20 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              LifeLink
            </span>
          </Link>

          {/* Buttons */}
          <Link to={isAuthenticated ? "/create-patient" : "/demologin"}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm md:text-base px-10 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all">
              {isAuthenticated ? "Create Patient" : "Register"}
            </button>
          </Link>
        </div>
      </header>


      <main className="container mx-auto  px-4 pt-5 mt-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center " data-aos="fade-up">
          {/* Text Content Section */}
          <div className="space-y-6 md:order-1 order-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Revolutionizing Healthcare Access and Emergency Care by Connecting Hospitals.
            </h1>
            <div className="space-y-4 text-lg text-gray-600">
              <p>
                Join LifeLink to connect with healthcare professionals, hospitals, and patients for faster, more efficient care.
              </p>
              <p>Share medical insights, get expert advice, and stay up to date on important health information.</p>
              <p>
                LifeLink is here to help streamline patient care, reduce delays, and improve outcomes during emergencies.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/signin">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-all flex items-center space-x-2 md:text-base text-sm md:py-3 md:px-6">
                  <Plus className="h-5 w-5" />
                  <span>Join Now</span>
                </button>
              </Link>
              <a
                href="/learnmore"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3 rounded-full font-medium transition-all md:text-base text-sm ">
                  Learn More
                </button>
              </a>
            </div>
          </div>


          
          {/* File Upload and Search Section */}

       <div className="relative md:order-2 order-1">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-50 p-10 items-center justify-center">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <input
                    type="search"
                    className="w-full h-16 rounded-xl border-2 border-indigo-600 outline-0 p-6 pr-12"
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

                {error && (
                  <p className="text-red-600 text-sm mt-2">{error}</p>
                )}
          </form>
          <form onSubmit={handleImageSearch} className="space-y-4 mt-4">

                <label
                  htmlFor="file-upload"
                  className="h-80 flex items-center justify-center border-2 border-dashed border-indigo-600 rounded-lg cursor-pointer text-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  {filePreview ? (
                    <img
                      src={filePreview}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="flex flex-col items-center text-center">
                      <span className="text-6xl font-bold">+</span>
                      <span className="text-sm">Search patient by taking a clear picture</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>

                {filePreview && (
                  <button
                    type="button"
                    onClick={() => setFilePreview(null)}
                    className="w-full mt-2 text-white bg-red-600 hover:bg-red-800 py-2 rounded-md transition-all"
                  >
                    Clear Image
                  </button>
                )}

<button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg"
          >
            Search by Image
          </button>

{error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                <p className="text-sm flex mt-2 text-gray-600">
                  Supported formats: PNG, JPG & JPEG
                </p>
              </form>
            </div>
          </div> 
        </div>

        {/* About Section */}
        <section className="py-16 bg-white" data-aos="flip-left">
          <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What is LifeLink?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                LifeLink is a comprehensive hospital management and patient care platform.
                Our mission is to bridge the gap between hospitals, healthcare professionals, and patients to ensure faster, more efficient emergency care and healthcare access.
                LifeLink helps in streamlining medical processes like appointment bookings, diagnostic result sharing, and communication between hospitals for better outcomes.
              </p>
            </div>
            <img
              src={maleNurse}
              alt="About LifeLink"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

      </main>


      {/* Features Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50" data-aos="fade-up">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-600">Easy Access to Patient Data</h3>
              <p className="text-gray-600 mt-4">
                Streamline healthcare processes with centralized access to patient records, enabling faster and more accurate decision-making.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-600">Emergency Care</h3>
              <p className="text-gray-600 mt-4">
                Share diagnostic and medical records across hospitals to save time in emergencies.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold text-indigo-600">Doctor & Patient Portals</h3>
              <p className="text-gray-600 mt-4">
                Separate portals for doctors and patients for improved communication and personalized healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose LifeLink?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6 text-left">
              <p className="text-lg text-gray-600" data-aos="fade-up-right">
                🌟 <b>Faster Emergency Response:</b> Our platform reduces delays in sharing diagnostic results, ensuring critical care is never held back.
              </p>
              <p className="text-lg text-gray-600" data-aos="fade-up-right">
                🌟 <b>Improved Patient Outcomes:</b> Stay connected with healthcare professionals for expert advice and quicker decisions.
              </p>
              <p className="text-lg text-gray-600" data-aos="fade-up-right">
                🌟 <b>Data Privacy & Security:</b> With state-of-the-art encryption, patient data is always safe.
              </p>
            </div>
            <img
              src={femaleDoctor}
              alt="Benefits of LifeLink"
              className="rounded-lg shadow-lg"
              data-aos="fade-up-left"
            />
          </div>
        </div>
      </section>


      {/* Call-to-Action Section */}
      <section className="bg-indigo-600 text-white py-16" data-aos="fade-up">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Revolutionize Healthcare?</h2>
          <p className="text-lg">
            Join LifeLink today and experience seamless healthcare access and improved patient outcomes.
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <Link to="/signin">
              <button className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-gray-100">
                Get Started
              </button>
            </Link>
            <a
              href="/learnmore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-indigo-600">
                Learn More
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
