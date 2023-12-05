
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, Button } from 'react-bootstrap';
import Header from "./Header";
 
const Folder = ({ folder, toggleFolder }) => {
  return (
    <div key={folder.id}>
      <div
        onClick={() => toggleFolder(folder.id)}
        style={{ cursor: "pointer",width:"max-content"  }}
      >
        {folder.subfolders.length > 0 && folder.isOpen ? <span>&#128193;</span> : folder.subfolders.length > 0 ? <>&#128193;</> : <>&nbsp;&nbsp;&nbsp;</>} {folder.name}
      </div>
      {folder.isOpen && folder.subfolders.length > 0 && (
        <div style={{ marginLeft: "30px", marginTop: "2px",width:"max-content" }}>
          {folder.subfolders.map((subfolder) => (
            <>
            <Folder key={subfolder.id} folder={subfolder} toggleFolder={toggleFolder} />
            </>
          ))}
        </div>
      )}
    </div>
  );
};
 
 
 
const App = () => {
 
  const [folders, setFolders] = useState([
    {
      id: 1,
      name: "Folder 1",
      isOpen: false,
      subfolders: [
        {
          id: 11,
          name: "Subfolder 1.1",
          isOpen: false,
          subfolders: [
            {
              id: 111, name: "Subfolder 1.1.1", isOpen: false, subfolders: [
                { id: 1111, name: "ramya.html", isOpen: false, subfolders: [] },
                { id: 1112, name: "sample.docs", isOpen: false, subfolders: [] },
                { id: 1113, name: "abc.xls", isOpen: false, subfolders: [] }
              ]
            },
          ],
        },
        { id: 12, name: "Subfolder 1.2", isOpen: false, subfolders: [] },
        {
          id: 13, name: "Subfolder 1.3", isOpen: false, subfolders: [
            { id: 131, name: "Subfolder 1.3.1", isOpen: false, subfolders: [] }
          ]
        }
      ],
    },
    {
      id: 2,
      name: "Folder 2",
      isOpen: false,
      subfolders: [
        { id: 21, name: "Subfolder 2.1", isOpen: false, subfolders: [] },
        { id: 22, name: "Subfolder 2.2", isOpen: false, subfolders: [] },
        { id: 23, name: "Subfolder 2.3", isOpen: false, subfolders: [] },
      ],
    },
    // {
    //   id: 3,
    //   name: "Folder 3",
    //   isOpen: false,
    //   subfolders: [
    //     {
    //       id: 31, name: "Subfolder 3.1", isOpen: false, subfolders: [
    //         { id: 311, name: "Subfolder 3.1.1", isOpen: false, subfolders: [] },
    //         { id: 312, name: "Subfolder 3.1.2", isOpen: false, subfolders: [] }
    //       ]
    //     },
    //     { id: 32, name: "Subfolder 3.2", isOpen: false, subfolders: [] },
    //   ],
    // },
  ]);
 
  const toggleFolder = (folderId) => {
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId
          ? { ...folder, isOpen: !folder.isOpen }
          : folder.subfolders && folder.subfolders.length > 0
            ? { ...folder, subfolders: toggleNestedFolders(folder.subfolders, folderId) }
            : folder
      )
    );
  };
 
  const toggleNestedFolders = (subfolders, folderId) => {
    return subfolders.map((subfolder) =>
      subfolder.id === folderId
        ? { ...subfolder, isOpen: !subfolder.isOpen }
        : subfolder.subfolders && subfolder.subfolders.length > 0
          ? { ...subfolder, subfolders: toggleNestedFolders(subfolder.subfolders, folderId) }
          : subfolder
    );
  };
 
  const toggleAllFolders = (isOpen, subfolders) => {
    return subfolders.map((folder) => ({
      ...folder,
      isOpen,
      subfolders:
        folder.subfolders && folder.subfolders.length > 0
          ? toggleAllFolders(isOpen, folder.subfolders)
          : [],
    }));
  };
 
  const handleToggleAllFolders = (isOpen) => {
    setFolders((prevFolders) => toggleAllFolders(isOpen, prevFolders));
  };
 
  return (
    <div className="container-fluid ">
      <Header/> 
      <div className="app-container ">
        
            <Button variant="primary" onClick={() => handleToggleAllFolders(true)}><FontAwesomeIcon icon={faPlus} /> Open All</Button>{' '}
          <Button variant="danger" onClick={() => handleToggleAllFolders(false)}><FontAwesomeIcon icon={faMinus} /> Close All</Button>
          </div>
          <div className="folder-accordion">
            {folders.map((folder) => (
              <span className="">
                <Folder key={folder.id} folder={folder} toggleFolder={toggleFolder} />
              </span>
            ))}
      </div>
    </div>
  );
};
export default App;
