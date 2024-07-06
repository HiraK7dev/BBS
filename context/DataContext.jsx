import React, { createContext, useContext, useState } from 'react'

export const datacontext = createContext();

function DataContext({ children }) {
    const [data, setData] = useState(null);
  return (
    <datacontext.Provider value={{data, setData}}>
        {
            children
        }
    </datacontext.Provider>
  )
}

export default DataContext