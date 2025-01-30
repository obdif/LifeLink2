import React, { useState, useEffect } from 'react';
import { Heart, Plus, X, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const CreatePatient = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState([]);
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    gender: '',
    dateOfBirth: '',
    bloodGroup: '',
    genotype: '',
    disability: '',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...formFields];
    newFields[index][field] = value;
    setFormFields(newFields);
  };

  const addFormField = () => {
    setFormFields([...formFields, { label: '', value: '' }]);
  };

  const removeFormField = (index) => {
    const newFields = formFields.filter((_, i) => i !== index);
    setFormFields(newFields);
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['fullName', 'phoneNumber', 'address', 'gender', 'dateOfBirth', 'bloodGroup', 'genotype'];

    requiredFields.forEach((field) => {
      if (!document.getElementById(field).value.trim()) {
        newErrors[field] = `${field} is required`;
      }
    });

    formFields.forEach((field, index) => {
      if (!field.label.trim()) {
        newErrors[`label-${index}`] = 'Label is required';
      }
      if (!field.value.trim()) {
        newErrors[`value-${index}`] = 'Value is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', e.target.fullName.value.trim());
    formData.append('gender', e.target.gender.value.trim());
    formData.append('address', e.target.address.value.trim());
    formData.append('genotype', e.target.genotype.value.trim());
    formData.append('bloodGroup', e.target.bloodGroup.value.trim());
    formData.append('dateOfBirth', e.target.dateOfBirth.value.trim());
    formData.append('phoneNumber', e.target.phoneNumber.value.trim());
    formData.append('disability', e.target.disability.value.trim());
    formData.append('profilePicture', imagePreview);
    // formData.append('additionalNotes', JSON.stringify(formFields.additionalNotes || []));

    formData.append(
      'additionalNotes',
      JSON.stringify(
        formFields.map((field) => ({
          label: field.label.trim(),
          value: field.value.trim(),
        }))
      )
    );

    if (imagePreview) {
      const imageFile = dataURLtoFile(imagePreview, 'profile-picture.jpg');
      formData.append('profilePicture', imageFile);
    } else {
      toast.error('Patient image is required');
      return;
    }




    if (!formData.get('profilePicture')) {
      toast.error('Patient image is required');
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        'https://lifelink-ordc.onrender.com/patients/create',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // console.log('Created patient response:', response.data);

      const patientId = response.data.user._id;

      // If response is successful, redirect
      if (patientId) {
        toast.success('Patient created successfully!');
        e.target.reset();
        navigate(`/patients/${patientId}`);
        setFormFields([]);
        setImagePreview("");
      } else {
        toast.error('Failed to get patient ID from response.');
      }

    } catch (err) {
      console.error('Error:', err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to create patient. Please check the form data.');
    } finally {
      setIsLoading(false);
    }


  };


  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <header className="border-b bg-white/50 backdrop-blur-sm fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 md:px-20 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-indigo-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              LifeLink
            </span>
          </Link>

          <button
            type="submit"
            form="patient-form"
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
            <div className="w-full sticky mt-4">
              <label
                htmlFor="file-upload"
                className="block text-center py-3 px-4 border-2 border-indigo-500 rounded-lg bg-indigo-800 text-white cursor-pointer hover:bg-indigo-700 transition-colors"
              >
                Upload Patient Picture
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  name=""
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-red-500 italic text-xl mt-2">Max file: 400kb</p>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/3 lg:w-3/4 space-y-6">
            <form id="patient-form" onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="John Smith"

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
                    placeholder="0812345678"

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
                    placeholder="No 5, LGA, State, Country"

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
                  <label htmlFor="dateOfBirth" className="block flex text-sm font-medium text-gray-700">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    required
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"

                    className={`w-full px-4 py-2 border rounded-lg ${errors.dateOfBirth
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500'
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
                    defaultValue="Null"

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
            </form>

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
    </div>
  );
};

export default CreatePatient;