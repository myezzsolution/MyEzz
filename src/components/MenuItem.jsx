
// src/components/MenuItem.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

function MenuItem({ item, vendor, addToCart }) {
  const priceKeys = typeof item.price === "object" ? Object.keys(item.price) : [];
  const [selectedPortion, setSelectedPortion] = useState(priceKeys[0] || "");

  const handleAdd = () => {
    const selectedItem = {
      id: `${item.id}-${selectedPortion}`,
      name: item.name,
      price: typeof item.price === "object" ? item.price[selectedPortion] : item.price,
      vendor,
      jain: !!item.jain,
      portion: selectedPortion,
      description: item.description || "",
      quantity: 1,
    };
    addToCart(selectedItem);
  };

  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md flex justify-between items-start gap-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex-1">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-md bg-gray-100 grid place-items-center text-gray-600 font-semibold">
            {item.name.split(" ").slice(0,2).map(n=>n[0]).join("")}
          </div>
          <div>
            <h5 className="font-medium text-gray-800">{item.name}</h5>
            {item.description && <p className="text-sm text-gray-500 mt-1">{item.description}</p>}
            <div className="mt-2 text-sky-700 font-bold">
              {typeof item.price === "object"
                ? Object.entries(item.price).map(([k, v]) => `${k}: ₹${v}`).join(" / ")
                : `₹${item.price}`}
            </div>
          </div>
        </div>

        {priceKeys.length > 0 && (
          <div className="mt-3 flex gap-2 items-center">
            <label className="text-sm text-gray-600">Portion</label>
            <select className="border rounded px-2 py-1 text-sm" value={selectedPortion} onChange={(e) => setSelectedPortion(e.target.value)}>
              {priceKeys.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-3">
        <button
          onClick={handleAdd}
          className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Add
        </button>
        <div className="text-xs text-gray-500">{item.jain ? "Jain" : ""}</div>
      </div>
    </motion.div>
  );
}

export default MenuItem;
