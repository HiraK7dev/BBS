import React, { createContext, useContext, useState } from 'react'

export const datacontext = createContext();

function DataContext({ children }) {
    const [data, setData] = useState([]);
    const [familyDetails, setFamilyDetails] = useState([]);
    const [latestVersion, setLatestVersion] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [totCollection, setTotCollection] = useState(null);
    const currentVersion = `0.0.1`;
  return (
    <datacontext.Provider value={{data, setData, currentVersion, latestVersion, setLatestVersion, downloadUrl, setDownloadUrl, totCollection, setTotCollection, familyDetails, setFamilyDetails}}>
        {
            children
        }
    </datacontext.Provider>
  )
}

export default DataContext