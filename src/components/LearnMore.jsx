import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import maleNurse from '../assets/male-nurse.jpg';
import femaleDoctor from '../assets/patient-data.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';


const LearnMore = () => {
    useEffect(() => {
      AOS.init({
        duration: 1200,
      });
    }, []);


  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20" data-aos="slide-down">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to LifeLink
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Revolutionizing Healthcare Access and Emergency Care by Connecting Hospitals, Patients, and Professionals.
          </p>
        </div>
      </section>

        {/* About Section */}
        <section className="py-16 bg-white" data-aos="zoom-in">
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


      {/* Testimonials Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic text-gray-600">
                "LifeLink helped our hospital save valuable time during emergencies by sharing diagnostic results instantly."
              </p>
              <h4 className="mt-4 font-bold text-gray-900">- Dr. Alex Smith</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic text-gray-600">
                "The appointment scheduling system has been a game-changer for our clinic."
              </p>
              <h4 className="mt-4 font-bold text-gray-900">- Sarah Johnson</h4>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <p className="italic text-gray-600">
                "I can now easily connect with my doctors and track my health records. It's fantastic!"
              </p>
              <h4 className="mt-4 font-bold text-gray-900">- Michael Davis</h4>
            </div>
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
};

export default LearnMore;
