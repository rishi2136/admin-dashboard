import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from './DatePicker';

export function ClosureDaysSection({ closureDates, handleClosureDateAdd, setClosureDates }) {
  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Service Closure Days</h2>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <DatePicker onSelect={handleClosureDateAdd} />
          <button
            type="button"
            onClick={() => setClosureDates([])}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out text-gray-700"
          >
            Clear All
          </button>
        </div>
        {closureDates.length > 0 && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-2">Closed on:</h3>
            <ul className="space-y-1">
              {closureDates.map((date, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-red-500" />
                  {date.toDateString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
