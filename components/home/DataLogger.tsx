import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const DataLogger = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date: Date | null, event: React.SyntheticEvent<any> | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Add your filtering logic here
    }
  };

  const sampleData = [
    { id: 1, log: "Data A", timestamp: "2024-08-16 10:00 AM" },
    { id: 2, log: "Data B", timestamp: "2024-08-16 10:30 AM" },
    { id: 3, log: "Data C", timestamp: "2024-08-16 11:00 AM" },
  ];

  return (
    <div className="bg-default-50 rounded-xl shadow-lg p-6 w-full">
      <h3 className="text-xl font-semibold mb-4">Data Logger</h3>
      {/* Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="w-1/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        calendarClassName="border-primary"
        dayClassName={(date) => "text-gray-900"} // Example for day text color
        wrapperClassName="w-full"
      />

      <div className="mt-4">
        <p>Data for: {selectedDate.toDateString()}</p>
      </div>
      {/* Table for displaying logs */}
      <table className="w-full mb-6 border-collapse border border-gray-200 text-default-900">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2 text-left">No</th>
            <th className="border border-gray-300 p-2 text-left">Timestamp</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Cycle TIme</th>
          </tr>
        </thead>
        <tbody>
          {sampleData.map((data) => (
            <tr key={data.id} className="bg-gray-900 hover:bg-gray-700 text-default-900">
              <td className="border border-gray-300 p-2">{data.id}</td>
              <td className="border border-gray-300 p-2">{data.log}</td>
              <td className="border border-gray-300 p-2">{data.timestamp}</td>
              <td className="border border-gray-300 p-2">{data.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
