import { useState } from 'react';
import { UserFormData, UserRole, User } from '../types';

interface UseUserFormReturn {
  formData: UserFormData;
  formErrors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  createUserObject: () => User;
}

export const useUserForm = (): UseUserFormReturn => {
  
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    age: '',
    role: UserRole.VIEWER
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    const age = parseInt(formData.age);
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (isNaN(age)) {
      errors.age = 'Age must be a number';
    } else if (age < 18) {
      errors.age = 'Age must be 18 or older';
    } 
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      role: UserRole.VIEWER
    });
    setFormErrors({});
  };
  const createUserObject = (): User => {
    return {
      id: Date.now(), 
      name: formData.name,
      email: formData.email,
      age: parseInt(formData.age),
      role: formData.role,
      username: formData.email.split('@')[0], 
      phone: '',
      website: '',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: { lat: '', lng: '' }
      },
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    };
  };

  return {
    formData,
    formErrors,
    handleChange,
    validateForm,
    resetForm,
    createUserObject
  };
};  