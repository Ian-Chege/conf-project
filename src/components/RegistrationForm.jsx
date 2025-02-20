import { useState, useCallback } from "react";
import AvatarUpload from "./AvatarUpload";
import "./RegistrationForm.css";

function RegistrationForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    githubUsername: "",
    avatar: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return !value.trim() ? "Full name is required" : "";
      case "email":
        return !value.trim()
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email"
          : "";
      case "githubUsername":
        return !value.trim()
          ? "GitHub username is required"
          : !/^[a-zA-Z0-9-]+$/.test(value)
          ? "Please enter a valid GitHub username"
          : "";
      default:
        return "";
    }
  };

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  }, []);

  const handleImageUpload = useCallback((imageData) => {
    setFormData(prev => ({ ...prev, avatar: imageData }));
    setErrors(prev => ({ ...prev, avatar: !imageData ? "Please upload a photo" : "" }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      githubUsername: validateField("githubUsername", formData.githubUsername),
      avatar: !formData.avatar ? "Please upload a photo" : ""
    };

    setErrors(newErrors);

    // Check if there are any errors
    if (Object.values(newErrors).some(error => error)) {
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit({
        ...formData,
        submissionDate: new Date().toISOString()
      });
    } catch (error) {
      console.error("Submission error:", error);
      setErrors(prev => ({
        ...prev,
        submit: "Failed to submit form. Please try again."
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputIcon = (fieldName) => {
    switch (fieldName) {
      case "email":
        return (
          <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        );
      case "githubUsername":
        return (
          <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        );
      default:
        return (
          <svg className="input-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        );
    }
  };

  return (
    <div className="registration-form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <AvatarUpload onImageUpload={handleImageUpload} />
          {errors.avatar && <div className="error-message">{errors.avatar}</div>}
        </div>

        <div className="form-section">
          <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
            <label htmlFor="fullName">Full Name</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                autoComplete="name"
              />
              {getInputIcon('fullName')}
            </div>
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>

          <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                autoComplete="email"
              />
              {getInputIcon('email')}
            </div>
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className={`form-group ${errors.githubUsername ? 'has-error' : ''}`}>
            <label htmlFor="githubUsername">GitHub Username</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="githubUsername"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleInputChange}
                placeholder="Enter your GitHub username"
                autoComplete="username"
              />
              {getInputIcon('githubUsername')}
            </div>
            {errors.githubUsername && <div className="error-message">{errors.githubUsername}</div>}
          </div>
        </div>

        <div className="form-section">
          <button 
            className="generate-button" 
            type="submit"
            disabled={isSubmitting || !formData.avatar}
          >
            {isSubmitting ? "Generating..." : "Generate My Ticket"}
          </button>
          {errors.submit && <div className="error-message">{errors.submit}</div>}
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;
