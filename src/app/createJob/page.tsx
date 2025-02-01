"use client";
import { addDoc, collection } from "@firebase/firestore";
import { useState, useEffect } from "react";
import db from "../firebase/firestore";

interface JobData {
  jobTitle: string;
  companyName: string;
  experienceRequired: string;
  description: string;
  location: string;
  salary: string;
  isOnsite: boolean;
}

export default function JobPostingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobData, setJobData] = useState<JobData>({
    jobTitle: "",
    companyName: "",
    experienceRequired: "",
    description: "",
    location: "",
    salary: "",
    isOnsite: true,
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { title: "Job Details", fields: ["jobTitle", "companyName"] },
    {
      title: "Requirements & Salary",
      fields: ["experienceRequired", "salary", "isOnsite"],
    },
    { title: "Description & Location", fields: ["description", "location"] },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleToggleChange = () => {
    setJobData((prev) => ({ ...prev, isOnsite: !prev.isOnsite }));
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    const currentFields = steps[step - 1].fields;

    currentFields.forEach((field) => {
      if (!jobData[field as keyof JobData]) {
        errors[field] = "This field is required";
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // const handleSubmit = () => {
  //   if (validateStep(currentStep)) {
  //     setIsSubmitted(true);
  //     console.log('Job posted:', jobData);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(currentStep)) {
      setIsSubmitted(true);

      try {
        let resumeURL = null;

        // Store data in Firestore (Jobs Collection)
        const jobRef = await addDoc(collection(db, "jobs"), {
          title: jobData.jobTitle,
          company: jobData.companyName,
          description: jobData.description,
          location: jobData.location,
          salary: jobData.salary,
          status: "pending",
          isRemote: !jobData.isOnsite, // Store the file name (you can replace with URL if uploaded)
          timePosted: new Date().toISOString() + "",
        });

        console.log("Job submitted successfully with ID:", jobRef.id);
      } catch (error) {
        console.error("Error submitting job:", error);
      }
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.title} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep > index + 1 ? "bg-blue-600" : "bg-gray-200"
                } ${currentStep === index + 1 ? "bg-blue-600 text-white" : ""}`}
              >
                {index + 1}
              </div>
              <span
                className={`mt-2 text-sm ${
                  currentStep === index + 1
                    ? "text-blue-600 font-medium"
                    : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {!isSubmitted ? (
          <div className="bg-white rounded-xl shadow-lg p-8 transition-all duration-300">
            {currentStep === 1 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Job Details
                </h2>
                <input
                  name="jobTitle"
                  value={jobData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="Job Title"
                  className="w-full px-4 py-3 border rounded-lg mb-4"
                />
                <input
                  name="companyName"
                  value={jobData.companyName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            )}
            {currentStep === 2 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Requirements & Salary
                </h2>
                <input
                  name="experienceRequired"
                  value={jobData.experienceRequired}
                  onChange={handleInputChange}
                  placeholder="Experience Required"
                  className="w-full px-4 py-3 border rounded-lg mb-4"
                />
                <input
                  name="salary"
                  value={jobData.salary}
                  onChange={handleInputChange}
                  placeholder="Salary"
                  className="w-full px-4 py-3 border rounded-lg mb-4"
                />
                <div className="flex items-center space-x-3">
                  <span>Onsite</span>
                  <input
                    type="checkbox"
                    checked={jobData.isOnsite}
                    onChange={handleToggleChange}
                    className="toggle"
                  />
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Description & Location
                </h2>
                <textarea
                  name="description"
                  value={jobData.description}
                  onChange={handleInputChange}
                  placeholder="Job Description"
                  className="w-full px-4 py-3 border rounded-lg mb-4"
                  rows={5}
                />
                <input
                  name="location"
                  value={jobData.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                  className="w-full px-4 py-3 border rounded-lg"
                />
              </div>
            )}
            <div className="mt-12 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg"
              >
                ← Previous
              </button>
              {currentStep === steps.length ? (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg"
                >
                  Post Job
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Job Posted!
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your job listing has been successfully posted.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
