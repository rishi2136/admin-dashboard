import React from 'react'
import { FiEdit, FiTrash2, FiCopy, FiX } from "react-icons/fi";

const TiffinHeaderComponet = ({onCancel, onDelete, onDuplicate, onEdit, isEditMode, title}) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
            <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
                <div className="flex gap-3">
                    <button
                        onClick={onDelete}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                    >
                        <FiTrash2 size={20} />
                    </button>
                    <button
                        onClick={onDuplicate}
                        className="text-blue-500 hover:text-blue-700"
                        title="Duplicate"
                    >
                        <FiCopy size={20} />
                    </button>
                    {!isEditMode ? (
                        <button
                            onClick={onEdit}
                            className="text-gray-500 hover:text-blue-500"
                            title="Edit"
                        >
                            <FiEdit size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={onCancel}
                            className="text-gray-500 hover:text-red-500"
                            title="Cancel"
                        >
                            <FiX size={20} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TiffinHeaderComponet
