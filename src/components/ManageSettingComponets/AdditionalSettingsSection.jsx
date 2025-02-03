import React from 'react';
import { FaUtensils, FaHome, FaGlassCheers, FaTruck, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const checkboxItems = [
  { id: 'catering', label: 'Catering Services', icon: FaUtensils },
  { id: 'houseParty', label: 'House Party Services', icon: FaHome },
  { id: 'specialEvents', label: 'Special Events Services', icon: FaGlassCheers },
];

const inputItems = [
  { id: 'freeDelivery', label: 'Free Delivery', icon: FaTruck, placeholder: 'E.g., Orders above ₹500' },
  { id: 'deliveryCity', label: 'Delivery City', icon: FaMapMarkerAlt, placeholder: 'Enter city name' },
  { id: 'specialMealDay', label: 'Special Meal Day', icon: FaCalendarAlt, placeholder: 'E.g., Sunday' },
  { id: 'location', label: 'Location', icon: FaMapMarkerAlt, placeholder: 'Enter your location' },
];

export function AdditionalSettingsSection({ additionalSettings, handleAdditionalSettingChange }) {
  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Additional Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          {checkboxItems.map(({ id, label, icon: Icon }) => (
            <div key={id} className="flex items-center space-x-2 bg-white p-2 rounded-md shadow-sm border border-gray-200">
              <input
                type="checkbox"
                id={id}
                checked={additionalSettings[id]}
                onChange={(e) => handleAdditionalSettingChange(id, e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <label htmlFor={id} className="flex items-center space-x-2 text-sm text-gray-700">
                <Icon className="text-red-500 w-4 h-4" />
                <span>{label}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {inputItems.map(({ id, label, icon: Icon, placeholder }) => (
            <div key={id} className="bg-white p-2 rounded-md shadow-sm border border-gray-200">
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <div className="relative">
                <Icon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  id={id}
                  value={additionalSettings[id]}
                  onChange={(e) => handleAdditionalSettingChange(id, e.target.value)}
                  placeholder={placeholder}
                  className="w-full pl-8 pr-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
