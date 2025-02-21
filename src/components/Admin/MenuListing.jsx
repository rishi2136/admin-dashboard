import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";

const MenuListing = ({ menu, dropdownIdx, handleDropdown, title }) => {
  const [editableIndex, setEditableIndex] = useState({
    categoryIdx: -1,
    itemIdx: -1,
  });
  const [updatedMenu, setUpdatedMenu] = useState(menu);
  const [tempValue, setTempValue] = useState("");

  const handleEdit = (categoryIdx, itemIdx, currentValue) => {
    setEditableIndex({ categoryIdx, itemIdx });
    setTempValue(currentValue);
  };

  const handleSave = (categoryIdx, itemIdx) => {
    const updatedItems = [...updatedMenu];
    updatedItems[categoryIdx].items[itemIdx] = tempValue;
    setUpdatedMenu(updatedItems);
    setEditableIndex({ categoryIdx: -1, itemIdx: -1 });
    setTempValue("");
  };

  const handleCancel = () => {
    setEditableIndex({ categoryIdx: -1, itemIdx: -1 });
    setTempValue("");
  };

  return (
    <div className="my-2">
      <h1 className="overview-heading ">{title}</h1>
      <div className="h-auto">
        {updatedMenu.map((option, categoryIdx) => (
          <div key={categoryIdx}>
            <button
              className="rounded-lg border border-gray-200 text-lg font-bold p-1 my-1 w-full flex justify-between hover:bg-gray-100 transition-all"
              onClick={() => handleDropdown(categoryIdx)}
            >
              <span className="m-1">{option.category}</span>
              <span className="text-sm rounded-full bg-gray-200 p-3">
                {option.items.length}
              </span>
            </button>
            <ul
              className={`w-full ${
                dropdownIdx === categoryIdx ? "block" : "hidden"
              }`}
            >
              {option.items.map((el, itemIdx) => (
                <li
                  key={itemIdx}
                  className="py-2 flex justify-between border-0 border-b-2"
                >
                  <div className="flex items-center gap-2">
                    {editableIndex.categoryIdx === categoryIdx &&
                    editableIndex.itemIdx === itemIdx ? (
                      <>
                        <input
                          type="text"
                          value={tempValue}
                          className="border border-gray-300 rounded p-1"
                          onChange={(e) => setTempValue(e.target.value)}
                          autoFocus
                        />
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                          onClick={() => handleSave(categoryIdx, itemIdx)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                          onClick={handleCancel}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {el}
                        <span className="bg-gray-100 rounded-[20px] text-[12px] p-1 ms-2">
                          Order: {"12"}
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex gap-2 me-2">
                    <button
                      className="border-0 transparant"
                      onClick={() => handleEdit(categoryIdx, itemIdx, el)}
                    >
                      <FiEdit />
                    </button>
                    <button className="border-0 transparant">
                      <BsTrash />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuListing;
