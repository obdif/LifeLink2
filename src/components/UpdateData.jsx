import React, { useState, useEffect } from 'react';
import { Heart, Plus, X, AlertCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


const UpdateData = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize the navigate function for redirecting
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState([]);

  const formatDate = (isoDate) => {
    if (!isoDate) return ""; // Handle null or undefined dates
    const date = new Date(isoDate);
    return date.toISOString().split("T")[0]; // Extract 'yyyy-MM-dd'
  };



  useEffect(() => {
    const fetchPatientDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://lifelink-ordc.onrender.com/patients/${id}`);
        const { user } = response.data;
        if (user) {
          const formattedUser = {
            ...user,
            dateOfBirth: formatDate(user.dateOfBirth), // Format 'dateOfBirth'
          };
          setFormData(formattedUser);
          setImagePreview(user.image ? `https://lifelink-ordc.onrender.com${user.image}` : "");
        } else {
          toast.error("No patient data found for this ID.");
        }
      } catch (error) {
        toast.error("Error fetching patient data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPatientDetails();
    } else {
      toast.error("Invalid patient ID.");
    }
  }, [id]);


  // Example function for adding new dynamic form fields
  const addFormField = () => {
    setFormFields([...formFields, { label: "", value: "" }]);
  };

  // Example function for handling changes in dynamic fields
  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };

  // Example function for removing a field
  const removeFormField = (index) => {
    const updatedFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFields);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  // Handle image file changes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    setIsLoading(true);

    const validationErrors = {};
    if (!formData.fullName) validationErrors.fullName = 'Full Name is required';
    if (!formData.phoneNumber) validationErrors.phoneNumber = 'Phone Number is required';
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsLoading(false);
      return;
    }

    const updateData = new FormData();
    updateData.append('fullName', formData.fullName || '');
    updateData.append('address', formData.address || '');
    updateData.append('phoneNumber', formData.phoneNumber || '');
    updateData.append('gender', formData.gender || '');
    updateData.append('genotype', formData.genotype || '');
    updateData.append('bloodGroup', formData.bloodGroup || '');
    updateData.append('dateOfBirth', formData.dateOfBirth || '');
    if (imageFile) {
      updateData.append('image', imageFile); // Append image if present
    }

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        toast.error('You are not authorized. Please log in again.');
        setIsLoading(false);
        return;
      }

      const response = await axios.put(
        `https://lifelink-ordc.onrender.com/patients/update/${id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success('Patient data updated successfully!');
      setFormData(response.data.user);
      navigate(`/patients/${id}`);
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to update patient data.');
      } else {
        toast.error('An unknown error occurred.');
      }
      setIsLoading(false);
    }
  };


  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading patients data</p>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <form onSubmit={handleSubmit} className="space-y-6">

        <header className="border-b bg-white/50 backdrop-blur-sm fixed top-0 w-full z-50">
          <div className="container mx-auto px-4 md:px-20 py-4 flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                LifeLink
              </span>
            </Link>


            <button
              disabled={isLoading}
              className={`${isLoading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white px-6 py-2 rounded-full font-medium transition-all flex items-center space-x-2`}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>

          </div>
        </header>

        <div className="container mx-auto px-4 md:px-8 pt-24 pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Image Section */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="sticky top-24 border-4 rounded-xl border-indigo-800 p-3">
                <img
                  src={imagePreview}
                  alt="Patient"
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>
              <div className="w-full sticky hidden mt-4">
                <label
                  htmlFor="file-upload"
                  className="block text-center py-3 px-4 border-2 border-indigo-500 rounded-lg bg-indigo-800 text-white cursor-pointer hover:bg-indigo-700 transition-colors"
                >
                  Upload Patient Picture
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Default form fields */}


                <div className="space-y-1">
                  <label htmlFor="fullName" className="block flex text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName || ""}
                    onChange={handleInputChange}

                    className={`w-full px-4 py-2 capitalize border rounded-lg ${errors.fullName
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  />
                  {errors.fullName && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.fullName}</span>
                    </div>
                  )}
                </div>


                <div className="space-y-1">
                  <label htmlFor="phoneNumber" className="block flex text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleInputChange}

                    className={`w-full px-4 py-2 border rounded-lg ${errors.phoneNumber
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  />
                  {errors.phoneNumber && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.phoneNumber}</span>
                    </div>
                  )}
                </div>



                <div className="space-y-1">
                  <label htmlFor="address" className="block flex text-sm font-medium text-gray-700">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address || ""}
                    placeholder="No 5, LGA, State, Country"
                    onChange={handleInputChange}

                    className={`w-full px-4 py-2 border capitalize rounded-lg ${errors.address
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  />
                  {errors.address && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.address}</span>
                    </div>
                  )}
                </div>


                <div className="space-y-1">
                  <label htmlFor="gender" className="block flex text-sm font-medium text-gray-700">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender || ""}
                    onChange={handleInputChange}

                    className={`w-full px-4 py-2 border rounded-lg ${errors.gender
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  >
                    <option value="">Select Gender</option>
                    <option name="gender" value="Male">Male</option>
                    <option name="gender" value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.gender}</span>
                    </div>
                  )}
                </div>


                <div className="space-y-1">
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth || ""}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg ${errors.dateOfBirth
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      }`}
                  />
                  {errors.dateOfBirth && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.dateOfBirth}</span>
                    </div>
                  )}
                </div>




                <div className="space-y-1">
                  <label htmlFor="bloodGroup" className="block flex text-sm font-medium text-gray-700">
                    Blood Group <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="bloodGroup"
                    id="bloodGroup"
                    placeholder='A+'
                    value={formData.bloodGroup || ""}
                    onChange={handleInputChange}

                    className={`w-full px-4 py-2 border capitalize rounded-lg ${errors.bloodGroup
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  />
                  {errors.bloodGroup && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.bloodGroup}</span>
                    </div>
                  )}
                </div>


                <div className="space-y-1">
                  <label htmlFor="genotype" className="block flex text-sm font-medium text-gray-700">
                    Genotype <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="genotype"
                    id="genotype"
                    placeholder='AA'
                    value={formData.genotype || ""}
                    onChange={handleInputChange}

                    className={`w-full px-4 py-2 uppercase border rounded-lg ${errors.genotype
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  />
                  {errors.genotype && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.genotype}</span>
                    </div>
                  )}
                </div>



                <div className="space-y-1">
                  <label htmlFor="disability" className="block flex text-sm font-medium text-gray-700">
                    Disability <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    name="disability"
                    id="disability"
                    value={formData.disability || "Null"}
                    onChange={handleInputChange}

                    className={`w-full px-4 py-2 capitalize border rounded-lg ${errors.disability
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                  />
                  {errors.disability && (
                    <div className="flex items-center space-x-1 text-red-500 text-sm">
                      <AlertCircle size={14} />
                      <span>{errors.disability}</span>
                    </div>
                  )}
                </div>

                {/* Dynamic form fields */}
                {formFields.map((field, index) => (
                  <div key={index} className="space-y-1 relative">
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Add Title. "
                        required
                        value={field.label}
                        onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                        className={`w-full px-4 py-2 capitalize border rounded-lg ${errors[`label-${index}`]
                          ? 'border-red-500 focus:ring-red-500 capitalize focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-500  focus:border-indigo-500'
                          }`}
                      />
                      {errors[`label-${index}`] && (
                        <div className="flex items-center space-x-1 text-red-500 text-sm">
                          <AlertCircle size={14} />
                          <span>{errors[`label-${index}`]}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Add Value."
                        required
                        value={field.value}
                        onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                        className={`w-full px-4 py-2 border capitalize rounded-lg capitalize ${errors[`value-${index}`]
                          ? 'border-red-500 focus:ring-red-500  focus:border-red-500'
                          : 'border-gray-300 focus:ring-indigo-500  focus:border-indigo-500'
                          }`}
                      />
                      {errors[`value-${index}`] && (
                        <div className="flex items-center space-x-1 text-red-500 text-sm">
                          <AlertCircle size={14} />
                          <span>{errors[`value-${index}`]}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFormField(index)}
                      className="absolute -right-2 -top-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add New Field Button */}
              <button
                type="button"
                onClick={addFormField}
                className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <Plus className="h-5 w-5" />
                <span>Add New Field</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateData;