import React, { useState,useEffect } from 'react';
import { parsePhoneNumber, isValidPhoneNumber, getExampleNumber } from 'libphonenumber-js';

const PhoneInput = ({ value, onChange, required = false ,}) => {
  const countryCodes = {
    // North America
    'US': { name: 'United States', code: '+1' },
    'CA': { name: 'Canada', code: '+1' },
    'MX': { name: 'Mexico', code: '+52' },
    
    // Europe
    'GB': { name: 'United Kingdom', code: '+44' },
    'DE': { name: 'Germany', code: '+49' },
    'FR': { name: 'France', code: '+33' },
    'IT': { name: 'Italy', code: '+39' },
    'ES': { name: 'Spain', code: '+34' },
    'NL': { name: 'Netherlands', code: '+31' },
    
    // Asia
    'CN': { name: 'China', code: '+86' },
    'JP': { name: 'Japan', code: '+81' },
    'IN': { name: 'India', code: '+91' },
    'KR': { name: 'South Korea', code: '+82' },
    'SG': { name: 'Singapore', code: '+65' },
    'MY': { name: 'Malaysia', code: '+60' },
    'AE': { name: 'UAE', code: '+971' },
    'IL': { name: 'Israel', code: '+972' },
    'SA': { name: 'Saudi Arabia', code: '+966' },
    
    // Oceania
    'AU': { name: 'Australia', code: '+61' },
    'NZ': { name: 'New Zealand', code: '+64' },
    
    // South America
    'BR': { name: 'Brazil', code: '+55' },
    'AR': { name: 'Argentina', code: '+54' },
    'CO': { name: 'Colombia', code: '+57' },
    'CL': { name: 'Chile', code: '+56' },
    
    // Caribbean
    'JM': { name: 'Jamaica', code: '+1876' },
    'BS': { name: 'Bahamas', code: '+1242' },
    'BB': { name: 'Barbados', code: '+1246' },
    'TT': { name: 'Trinidad & Tobago', code: '+1868' },
    
    // Africa
    'ZA': { name: 'South Africa', code: '+27' },
    'EG': { name: 'Egypt', code: '+20' },
    'NG': { name: 'Nigeria', code: '+234' },
    'KE': { name: 'Kenya', code: '+254' }
  };

 // Helper function to find country code from phone number
 const findCountryFromCode = (countryCode) => {
  if (!countryCode) return 'US';
  // Remove + if present
  const code = countryCode.startsWith('+') ? countryCode : `+${countryCode}`;
  
  const entry = Object.entries(countryCodes).find(([_, data]) => data.code === code);
  return entry ? entry[0] : 'US';
};

// Initialize state with existing data if available
const [selectedCountry, setSelectedCountry] = useState(() => {
  if (value?.countryCode) {
    return findCountryFromCode(value.countryCode);
  }
  return 'US';
});

const [phoneNumber, setPhoneNumber] = useState(value?.number || '');
const [isValid, setIsValid] = useState(true);
const [errorMessage, setErrorMessage] = useState('');

// Update selected country if value changes externally
useEffect(() => {
  if (value?.countryCode) {
    const country = findCountryFromCode(value.countryCode);
    setSelectedCountry(country);
  }
  if (value?.number !== undefined) {
    setPhoneNumber(value.number);
  }
}, [value?.countryCode, value?.number]);

const validatePhoneNumber = (number) => {
  if (!number && required) {
    setIsValid(false);
    setErrorMessage('Phone number is required');
    return false;
  }

  if (!number) {
    setIsValid(true);
    setErrorMessage('');
    return true;
  }

  try {
    const fullNumber = `${countryCodes[selectedCountry].code}${number}`;
    const isValid = isValidPhoneNumber(fullNumber, selectedCountry);
    
    setIsValid(isValid);
    setErrorMessage(isValid ? '' : `Please enter a valid ${countryCodes[selectedCountry].name} phone number`);
    
    return isValid;
  } catch (error) {
    setIsValid(false);
    setErrorMessage('Invalid phone number format');
    return false;
  }
};

const handleCountryChange = (e) => {
  const newCountry = e.target.value;
  setSelectedCountry(newCountry);
  
  if (onChange) {
    onChange({
      target: {
        name: 'phone',
        value: {
          countryCode: countryCodes[newCountry].code,
          number: phoneNumber,
          fullNumber: `${countryCodes[newCountry].code}${phoneNumber}`
        }
      }
    });
  }

  if (phoneNumber) {
    validatePhoneNumber(phoneNumber);
  }
};

const handlePhoneChange = (e) => {
  const number = e.target.value.replace(/\D/g, ''); // Remove non-digits
  setPhoneNumber(number);
  const isValid = validatePhoneNumber(number);
  
  if (onChange) {
    onChange({
      target: {
        name: 'phone',
        value: {
          countryCode: countryCodes[selectedCountry].code,
          number: number,
          fullNumber: `${countryCodes[selectedCountry].code}${number}`
        }
      }
    });
  }
};

return (
  <div className="space-y-2 w-1/2">
    <label htmlFor="phone" className="block font-medium text-gray-700 text-sm">
      Phone
    </label>
    <div className="flex gap-2 w-full">
      <select
        value={selectedCountry}
        onChange={handleCountryChange}
        className="w-40 py-1 px-2 border rounded-md bg-white text-sm"
      >
        {Object.entries(countryCodes).map(([code, { name, code: phoneCode }]) => (
          <option key={code} value={code}>
            {name} ({phoneCode})
          </option>
        ))}
      </select>
      <div className="flex-1 w-full">
        <input
          type="tel"
          id="phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          required={required}
          placeholder="Enter phone number"
          className={`w-full py-1 px-2 border rounded-md ${
            !isValid && phoneNumber ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {!isValid && phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  </div>
);
};

export default PhoneInput;