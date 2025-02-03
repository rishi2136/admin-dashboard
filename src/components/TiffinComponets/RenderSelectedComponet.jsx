import React from 'react'
import AddInstruction from './TiffinRightPanle/DataManagementComponents/AddInstruction'
import ManageTiffin from './TiffinRightPanle/DataManagementComponents/ManageTiffin'
import ShowComments from './TiffinRightPanle/DataManagementComponents/ShowComments'

const RenderSelectedComponet = ({ selectedMealType, SelectedInstruction, SelectedComponet }) => {

    if (SelectedComponet) {
        switch (SelectedComponet) {
            case "Manage-Tiffin":
                return <ManageTiffin />;
            case "Reviews":
                return <ShowComments />;
            case "Instructions":
                return <AddInstruction />;
            default:
                return <ManageTiffin/>;
        }
    }

    return (
        <div className='w-full'>
            {SelectedComponet && (
                < div >
                    {SelectedComponet}
                </div>
            )}

        </div >
    )
}

export default RenderSelectedComponet
