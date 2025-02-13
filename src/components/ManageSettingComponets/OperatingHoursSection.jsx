import React from 'react';
import TimingInput from './TimingInput';

export function OperatingHoursSection({ timings, handleTimingChange, useMonday, setUseMonday, applyMondayTiming, daysOfWeek }) {
  return (
    <section className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Operating Hours</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
        {daysOfWeek.map(day => (
          <TimingInput
            key={day}
            day={day}
            openTime={timings[day].open}
            closeTime={timings[day].close}
            onOpenChange={(value) => handleTimingChange(day, 'open', value)}
            onCloseChange={(value) => handleTimingChange(day, 'close', value)}
          />
        ))}
      </div>
      <div className="flex items-center space-x-2 mt-4">
        <input
          type="checkbox"
          id="useMonday"
          checked={useMonday}
          // onChange={(e) => {
          //   setUseMonday(e.target.checked);
          //   if (e.target.checked) applyMondayTiming();
          // }}
          onChange={(e) => setUseMonday(e.target.checked)}
          className="rounded text-blue-600 focus:ring-blue-500 h-3 w-3"
        />
        <label htmlFor="useMonday" className="font-medium text-gray-700 text-sm">
          Use Monday's timing for all days
        </label>
      </div>
    </section>
  );
}