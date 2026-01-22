import { useState, useMemo, useCallback, memo, useEffect } from "react";
const SearchBar = memo(({ menuData, onDishSelect, onSearchChange }) => {
  console.log("🔥 USER SearchBar rendered");

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const placeholders = [
    "Search pizza 🍕",
    "Search burgers 🍔",
    "Search momos 🥟",
    "Search pasta 🍝",
    "Search soup 🍲",
    "Search biryani 🍛",
  ];
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  
  useEffect(() => {
    console.log("SearchBar mounted");
  }, []);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedQuery);
    }
  }, [debouncedQuery, onSearchChange]);

  const results = useMemo(() => {
    if (query.length === 0) return [];
    
    const value = query.toLowerCase();
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
    
    return matches;
  }, [query, menuData]);

  const handleSearch = useCallback((e) => {
    e.stopPropagation();
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 0);
  }, []);

  const handleDishSelect = useCallback((dish) => {
    onDishSelect(dish);
    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
  }, [onDishSelect]);

  const handleFocus = useCallback(() => {
    if (query.length > 0) setIsOpen(true);
  }, [query]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setIsOpen(false), 200);
  }, []);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={query.length === 0 ? currentPlaceholder : ""}
        className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
        autoComplete="off"
      />
      {isOpen && results.length > 0 && (
        <div className="absolute bg-white dark:bg-gray-800 shadow-lg w-full mt-1 rounded-lg max-h-60 overflow-y-auto z-50 border border-gray-200 dark:border-gray-700">
          {results.map((dish, index) => (
            <div
              key={`${dish.vendorName}-${dish.name}-${index}`}
              onClick={() => handleDishSelect(dish)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              {dish.name} —{" "}
              <span className="text-gray-500 dark:text-gray-400">
                {dish.vendorName}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;
