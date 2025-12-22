import { useState } from "react";

export default function SearchBar({ menuData, onDishSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value.length > 0) {
      const matches = [];
      menuData.forEach((vendor) => {
        vendor.categories.forEach((category) => {
          category.items.forEach((item) => {
            if (item.name.toLowerCase().includes(value)) {
              matches.push({ ...item, vendorName: vendor.name });
            }
          });
        });
      });
      setResults(matches);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search menu items..."
        className="w-full p-2 rounded-lg border border-gray-300"
      />
      {results.length > 0 && (
        <div className="absolute bg-white shadow-lg w-full mt-1 rounded-lg max-h-60 overflow-y-auto z-50">
          {results.map((dish, index) => (
            <div
              key={index}
              onClick={() => onDishSelect(dish)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {dish.name} — <span className="text-gray-500">{dish.vendorName}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
