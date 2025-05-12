// src/components/UserFormContainer.tsx

import React, { useState } from 'react';
import UserForm from './UserForm';
import { UserFormData, UserRole } from '../types';

const initialFormData: UserFormData = {
  name: '',
  email: '',
  age: '',
  role: '',
};

const UserFormContainer: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Handle number conversion for age
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.includes('@')) {
      errors.email = 'Invalid email address';
    }

    if (formData.age === '' || formData.age < 18) {
      errors.age = 'Age must be 18 or above';
    }

    if (!formData.role) {
      errors.role = 'Role is required';
    }

    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // If no errors, proceed
    alert('User submitted successfully:\n' + JSON.stringify(formData, null, 2));
    setFormData(initialFormData);
    setFormErrors({});
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
      <UserForm
        formData={formData}
        formErrors={formErrors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UserFormContainer;
