import React, { createContext, useContext, useState } from 'react'

export const datacontext = createContext();

function DataContext({ children }) {
    const [data, setData] = useState(null);
    const [latestVersion, setLatestVersion] = useState(null);
    const currentVersion = `0.0.1`;
  return (
    <datacontext.Provider value={{data, setData, currentVersion, latestVersion, setLatestVersion}}>
        {
            children
        }
    </datacontext.Provider>
  )
}

export default DataContext