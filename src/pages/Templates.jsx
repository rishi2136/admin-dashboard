import { useState } from "react";

const Templates = ({ templates, setSelectedTemplate }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTemplateId, setSelectedTemplateId] = useState(null);
    const [status, setStatus] = useState("All")

    // Filter templates based on search term
    const filteredTemplates = templates
        .filter(template =>
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) && (
                status === 'All' || template.status === status 
            )
        )
        .sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically by title

        const filterByStatus = (e) => {
            const val = e.target.value
            setStatus(val)
        }

    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template);
        setSelectedTemplateId(template._id); // Track selected template
    };

    return (
        <div className="p-2 flex flex-col h-full gap-2">
            {/* Search Section (Fixed) */}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                />
                <select name="filter" id="filter" className="p-2 rounded" value={status} onChange={filterByStatus}>
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
            </div>

            {/* Scrollable List */}
            <div className="flex-grow  overflow-y-auto mb-4 space-y-1 h-12">
                {filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template, index) => (
                        <div
                            key={template._id}
                            className={`p-2 border flex justify-between rounded cursor-pointer hover:shadow-sm ${selectedTemplateId === template._id
                                    ? 'bg-gray-100'
                                    : 'bg-white'
                                }`}
                            onClick={() => handleSelectTemplate(template)}
                        >
                            <div className="text-md">
                                {index + 1}. {template.title}
                            </div>
                            <div
                                className={`mt-1 text-sm font-medium ${template.status === 'Active'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                    }`}
                            >
                                {template.status}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-gray-500">No templates found.</div>
                )}
            </div>
        </div>
    );
};

export default Templates;
