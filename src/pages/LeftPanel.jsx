import { FiDownload, FiPlus } from 'react-icons/fi';
import { useState, Suspense, lazy } from 'react';
import * as XLSX from 'xlsx';
const Templates = lazy(() => import('./Templates'));

// Define all template types in one place for easy maintenance
const TEMPLATE_TYPES = [
  'User',
  'Restaurant',
  'Moderator Dashboard',
  'Marketing Dashboard',
  'Admin',
  'Live event organiser',
  'Tiffin services provider',
  'Vendors'
];

const LeftPanel = ({ setSelectedTemplate, setHandleTemplate, templates }) => {
  const [selectedType, setSelectedType] = useState(TEMPLATE_TYPES[0]);
  
  const downloadTemplatesAsExcel = async () => {
    try {
      const response = await fetch('https://marketing-dashboard-8274.onrender.com/templates/templates-grouped');
      const groupedTemplates = await response.json();
  
      const workbook = XLSX.utils.book_new();
  
      for (const [type, templates] of Object.entries(groupedTemplates)) {
        const sheetData = templates.map(template => ({
          Title: template.title,
          Subject: template.emailSubject || 'N/A',
          Body: template.emailBody || 'N/A',
          Status: template.status,
          Event: template.event || 'N/A',
          Description: template.description || 'N/A',
        }));
  
        const worksheet = XLSX.utils.json_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, `${type} Templates`);
      }
  
      XLSX.writeFile(workbook, 'email-templates.xlsx');
    } catch (error) {
      console.error('Error downloading templates:', error);
    }
  };

  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setHandleTemplate((prev) => !prev);
  };

  const filteredTemplates = templates.filter((template) => template.type === selectedType);

  return (
    <div className="w-2/5 bg-gray-50 border-r border-gray-200 p-4 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="p-2 border rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {TEMPLATE_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 ">
          <button
            className="text-lg text-blue-500 rounded hover:text-blue-600"
            onClick={handleAddTemplate}
            title="Add Template"
          >
            <FiPlus />
          </button>

          <button
            className="text-lg text-blue-500 rounded hover:text-blue-600"
            title="Download Templates"
            onClick={downloadTemplatesAsExcel}
          >
            <FiDownload size={20} />
          </button>
        </div>
      </div>

      <Suspense fallback={<div>Loading templates...</div>}>
        <Templates setSelectedTemplate={setSelectedTemplate} templates={filteredTemplates} />
      </Suspense>
    </div>
  );
};

export default LeftPanel;