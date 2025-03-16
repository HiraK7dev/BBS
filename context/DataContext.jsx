import React, { createContext, useContext, useState } from 'react'

export const datacontext = createContext();

function DataContext({ children }) {
    const [data, setData] = useState([]);
    const [familyDetails, setFamilyDetails] = useState([]);
    const [latestVersion, setLatestVersion] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
    const [totCollection, setTotCollection] = useState(null);
    const [otCollection, setOtCollection] = useState(null);
    const currentVersion = `1.2.0`;
  return (
    <datacontext.Provider value={{data, setData, currentVersion, latestVersion, setLatestVersion, downloadUrl, setDownloadUrl, totCollection, setTotCollection, familyDetails, setFamilyDetails, otCollection, setOtCollection}}>
        {
            children
        }
    </datacontext.Provider>
  )
}

export default DataContext