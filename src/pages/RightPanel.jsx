import { useEffect, useState } from "react"
import EmailTemplateEdit from "./TempleteEdit"
import HeaderComponent from "./HeaderComponent"
import ActionButtonsComponent from "./ActionButtonsComponent"

const RightPanel = ({ selectedTemplate, handleUpdateTemplate, handleDeleteTemplate, setUserTemplates, handleTitle }) => {
    const [isEditMode, setIsEditMode] = useState(false)

    const [data, setData] = useState(selectedTemplate || {})
    // if(!selectedTemplate) setIsEditMode(true)

    useEffect(() => {
        if (selectedTemplate) {
            setData({ ...selectedTemplate })
        }
        console.log(selectedTemplate.event)
    }, [selectedTemplate])


    const handleFieldChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }))
      }

      const handleSave = () => {
        const updatedFields = { ...data };
      
        // Ensure status is set if it's missing or empty
        if (!updatedFields.status) {
          updatedFields.status = 'Inactive';
        }
        if (!updatedFields.type) {
          updatedFields.type = 'user';
        }
        handleUpdateTemplate(data._id, updatedFields);
        console.log('updated fields:', updatedFields);
        setIsEditMode(false);
      };
      

      const handleCancel = () => {
        setData({ ...selectedTemplate })
        setIsEditMode(false);
      };

      const handleDelete = () => {
        if(window.confirm('Are you sure?')){
         handleDeleteTemplate(data._id)
        }
      }

    return (
        <div className="overflow-y-auto w-3/5 p-6 bg-white shadow-md border-l border-gray-200">
            <HeaderComponent
                data={data}
                isEditMode={isEditMode}
                onEdit={() => setIsEditMode(true)}
                onCancel={handleCancel}
                onChange={handleFieldChange}
                onDelete={ handleDelete}
            />
            <EmailTemplateEdit
                template={data}
                isEditMode={isEditMode}
                onChange={handleFieldChange}
            />
            {isEditMode && (
                <ActionButtonsComponent
                onSave={handleSave} onCancel={handleCancel} />
            )}
        </div>
    )
}


export default RightPanel