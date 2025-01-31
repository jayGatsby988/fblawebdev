'use client'
import { Link } from 'lucide-react';
import { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: File | null;
  experience: string;
  coverLetter: string;
}

export default function JobApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    resume: null,
    experience: '',
    coverLetter: ''
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { title: 'Personal Information', fields: ['firstName', 'lastName', 'email', 'phone'] },
    { title: 'Professional Details', fields: ['experience', 'resume'] },
    { title: 'Final Touches', fields: ['coverLetter'] }
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
      setFormErrors(prev => ({ ...prev, resume: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    const currentFields = steps[step - 1].fields;

    currentFields.forEach(field => {
      if (field === 'resume') {
        if (!formData.resume) errors.resume = 'Please upload your resume';
      } else {
        const value = formData[field as keyof FormData];
        if (!value) {
          errors[field] = 'This field is required';
        } else if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
          errors.email = 'Invalid email address';
        } else if (field === 'phone' && !/^\d{10}$/.test(value)) {
          errors.phone = 'Invalid phone number';
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitted(true);
      // Submit logic here
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="text-xl font-bold text-blue-600">CareerConnect</div>
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600">Jobs</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Applications</a>
              <a href="#" className="text-gray-600 hover:text-blue-600">Profile</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index + 1 ? 'bg-blue-600' : 'bg-gray-200'
                  } ${currentStep === index + 1 ? 'bg-blue-600 text-white' : ''}`}
                >
                  {currentStep > index + 1 ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`mt-2 text-sm ${currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {!isSubmitted ? (
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
            {/* Step 1 */}
            <div className={`space-y-8 ${currentStep !== 1 ? 'hidden' : ''}`}>
                
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    placeholder="1234567890"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className={`space-y-8 ${currentStep !== 2 ? 'hidden' : ''}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Details</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      formErrors.experience ? 'border-red-500' : 'border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    min="0"
                  />
                  {formErrors.experience && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.experience}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resume Upload <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex flex-col items-start">
                    <div className="relative w-full">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        id="resume"
                      />
                      <label
                        htmlFor="resume"
                        className="w-full p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <svg
                          className="w-12 h-12 text-gray-400 mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <span className="text-gray-600">
                          {formData.resume ? formData.resume.name : 'Click to upload or drag and drop'}
                        </span>
                        <span className="text-sm text-gray-500 mt-2">
                          PDF, DOC, DOCX (Max. 5MB)
                        </span>
                      </label>
                    </div>
                    {formErrors.resume && (
                      <p className="mt-2 text-sm text-red-500">{formErrors.resume}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className={`space-y-8 ${currentStep !== 3 ? 'hidden' : ''}`}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Final Touches</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={8}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    formErrors.coverLetter ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  placeholder="Tell us why you're the perfect candidate..."
                />
                {formErrors.coverLetter && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.coverLetter}</p>
                )}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="mt-12 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 text-sm font-medium rounded-lg ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ← Previous
              </button>
              
              {currentStep === steps.length ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Application
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-block mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-green-600 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your application. We'll review your submission and get back to you within 3-5 business days.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}