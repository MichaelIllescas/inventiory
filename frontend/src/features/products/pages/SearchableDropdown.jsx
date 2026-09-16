import React, { useState, useEffect, useRef } from "react";

const SearchableDropdown = ({ products, onSelect, selectedProduct, clearSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-100" ref={dropdownRef}>
      <label className="form-label">Buscar Producto:</label>

      {selectedProduct ? (
        <div className="border p-2 rounded-md bg-light d-flex justify-content-between align-items-center">
          <span>{selectedProduct.name}</span>
          <button 
            className="btn btn-sm btn-danger"
            onClick={clearSelection}
          >
            Cambiar Producto
          </button>
        </div>
      ) : (
        <div
          className="border p-2 m-0 rounded-md cursor-pointer bg-white form-control"
          onClick={() => setIsOpen(!isOpen)}
        >
          {searchTerm || "Seleccione un producto"}
        </div>
      )}

      {isOpen && !selectedProduct && (
        <div className="absolute mt-0 w-full bg-white border rounded-md shadow-lg rounded">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full p-2 border-b outline-none form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <ul className="max-h-40 overflow-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchTerm(product.name);
                    onSelect(product);
                    setIsOpen(false);
                  }}
                >
                  {product.name}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No hay resultados</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
