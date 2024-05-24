import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de la caché
const CacheContext = createContext();

// Proveedor del contexto de la caché
export const CacheProvider = ({ children }) => {
  const [cacheData, setCacheData] = useState(null);

  return (
    <CacheContext.Provider value={{ cacheData, setCacheData }}>
      {children}
    </CacheContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de la caché
export const useCache = () => useContext(CacheContext);
