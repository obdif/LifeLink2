import { Heart, Clock, Hospital, AlertCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const PatientDetails = () => {

  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const previousIllnesses = patient?.previousIllnesses || [];


  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`https://lifelink-ordc.onrender.com/patients/${id}`);
        // console.log("Patient Details:", response.data.user);
        setPatient(response.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching patient details:", error);
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading patients details...</p>
      </div>
    </div>
  );
  if (!patient) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600"> {Error} loading patient details. Please try again later</p>
      </div>
    </div>
  );



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/50 backdrop-blur-sm fixed w-screen top-0 z-50">
        <div className="container mx-full px-20 py-4 flex  justify-between items-center">

          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              LifeLink
            </span>
          </Link>

          <Link to={`/updatedata/${id}`}>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-all">
              Update Patient Data
            </button>

          </Link>

        </div>
      </header>



      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 pt-10 mt-20 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-24 border-4 rounded-xl border-indigo-800 p-3">
              <img
                src={`https://lifelink-ordc.onrender.com${patient.image}`}
                alt={`${patient.fullName || "Patient"}'s Profile`}
                className="w-full aspect-square object-cover rounded-lg"
              />
              <div className="p-3 bg-white space-y-5 mt-10 rounded-lg">
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="h-4 w-4 font-bold" />
                  <span className="text-sm font-bold">Last Updated:</span>
                  <span className="text-sm font-medium text-indigo-600">
                    {new Date(patient.updatedAt).toLocaleDateString() || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Hospital className="h-4 w-4 font-bold" />
                  <span className="text-sm font-bold">Updated by:</span>
                  <span className="text-sm font-medium text-indigo-600">
                    {patient.previousHospitals?.length
                      ? patient.previousHospitals[patient.previousHospitals.length - 1].hospitalName
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>


          {/* Details Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-1">
                <label htmlFor="fullName" className="block flex text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  // name="fullName"
                  // id="fullName"
                  value={patient.fullName || ""}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="age" className="block flex text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="text"
                  value={patient.dateOfBirth ? calculateAge(patient.dateOfBirth) : "N/A"}
                  disabled
                  className="w-full px-4 py-2 border capitalize border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="address" className="block flex text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={patient.address || ""}
                  disabled
                  className="w-full px-4 py-2 border capitalize border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phoneNumber" className="block flex text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  value={patient.phoneNumber || ""}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>


              <div className="space-y-1">
                <label htmlFor="blood-group" className="block flex text-sm font-medium text-gray-700">
                  Blood Group
                </label>
                <input
                  type="text"
                  name="blood-group"
                  id="blood-group"
                  value={patient.bloodGroup || ""}
                  disabled
                  className="w-full px-4 py-2 border capitalize border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="genotype" className="block flex text-sm font-medium text-gray-700">
                  Genotype
                </label>
                <input
                  type="text"
                  name="genotype"
                  id="genotype"
                  value={patient.genotype || ""}
                  disabled
                  className="w-full px-4 py-2 uppercase border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="gender" className="block flex text-sm font-medium text-gray-700">
                  Gender
                </label>
                <input
                  type="text"
                  name="gender"
                  id="gender"
                  value={patient.gender || ""}
                  disabled
                  className="w-full px-4 py-2 border capitalize border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="disability" className="block flex text-sm font-medium text-gray-700">
                  Disability
                </label>
                <input
                  type="text"
                  name="disability"
                  id="disability"
                  value={patient.disability || " Null"}
                  disabled
                  className="w-full px-4 py-2 border capitalize border-gray-300 rounded-lg bg-gray-50"
                />
              </div>



              {/* Render dynamic additional notes */}
              {patient.additionalNotes && patient.additionalNotes.length > 0 && (
                <div className="space-y-4">
                  {patient.additionalNotes.map((note, index) => (
                    <div key={index} className="space-y-1">
                      <label
                        htmlFor={`additionalNote-${index}`}
                        className="block flex text-sm font-medium text-gray-700"
                      >
                        {note.label || `Additional Field ${index + 1}`}
                      </label>
                      <input
                        type="text"
                        name={`additionalNote-${index}`}
                        id={`additionalNote-${index}`}
                        value={note.value || "Null"}
                        disabled
                        className="w-full px-4 py-2 border capitalize border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                  ))}
                </div>
              )}



            </div>



            { /*========== PREVIOUS ILLNESS========  */}
            <div className="mt-8">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="px-6 py-4 bg-indigo-600">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Previous Illnesses
                  </h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {previousIllnesses.map((illness, index) => (
                    <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-lg font-medium text-gray-900">
                            {illness.condition}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDate(illness.date)}
                          </p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(illness.severity)}`}>
                          {illness.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Previous illness stop */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDetails