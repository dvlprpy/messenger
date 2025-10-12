import { useState } from "react";

export default function FolderSettingModule({ closePopUp }) {
  // مدیریت وضعیت تب‌های چپ/بالا
  const [selectedTabView, setSelectedTabView] = useState("left");

  // لیست پوشه‌ها
  const [folders, setFolders] = useState(["Work", "Friends", "Family", 'News']);

  // افزودن پوشه جدید
  const addNewFolder = () => {
    const newFolderName = prompt("Enter Folder Name:");
    if (newFolderName) {
      setFolders([...folders, newFolderName]);
    }
  };

  const handleRemove = (f) => {
    const attributeName = f.target.getAttribute('data-name');
    const updateFolder = folders.filter(list => list !== attributeName)
    // setFolders(folderList => folderList.filter(item => item.attributeName !== attributeName))   
    setFolders(updateFolder);
     
  }

  return (
    <div className="folder-container-setting m-3">
      {/* Folder Header Popup */}
      <div className="folder-header-info p-2 d-flex flex-row justify-content-between align-items-center">
        <div className="folder-header-title fw-bold text-capitalize">Folder</div>
        <div className="folder-header-closeBtn">
          <i className="bi bi-x-lg fs-4 cursor-pointer" onClick={closePopUp}></i>
        </div>
      </div>

      {/* Folder Description */}
      <div className="folder-desc mt-5 d-flex flex-column justify-content-center align-items-center">
        <div className="folder-desc-icon">
          <i className="bi bi-folder-plus fs-1"></i>
        </div>
        <div className="folder-desc-content text-capitalize text-center text-secondary">
          Create folders for different groups of chats and quickly switch between them.
        </div>
      </div>

      {/* My Folders */}
      <div className="my-folders">
        <div className="my-folders-header text-capitalize fw-bold text-primary mt-4">My Folders</div>

        {/* دکمه ساخت پوشه جدید */}
        <div className="sub-my-folder cursor-pointer mt-2 d-flex flex-row justify-content-between" onClick={addNewFolder}>
          <div className="sub-my-folder-info ms-2 me-2 d-flex flex-row align-items-center">
            <div className="sub-my-folder-icon text-info ms-2">
              <i className="bi bi-plus-circle-fill fs-4"></i>
            </div>
            <div className="sub-my-folder-title text-primary text-capitalize">Create New Folder</div>
          </div>
        </div>

        {/* نمایش لیست پوشه‌ها */}
        <div className="folder-list mt-3">
          {
            folders.length > 0 ? 
            folders.map((folder, index) => (
            <div key={index} className="sub-my-folder cursor-pointer mt-2 d-flex flex-row justify-content-between">
              <div className="sub-my-folder-info ms-2 me-2 d-flex flex-row align-items-center w-full">
                <div className="sub-my-folder-icon text-secondary ms-2 me-2">
                  <i className="bi bi-folder fs-4"></i>
                </div>
                <div className="sub-my-folder-title d-flex flex-row justify-content-between align-items-center w-full">
                  <span className="text-dark text-capitalize">{folder}</span>
                  <i className="bi bi-trash text-danger fs-4" data-name={folder} onClick={(e) => handleRemove(e)}></i>
                </div>
              </div>
            </div>
          )) : <p className="text-center text-muted fs-5">
            کاربر گرامی هیچ اطلاعاتی برای نمایش وجود ندارد
          </p>
          }
          {}
        </div>
      </div>

      {/* Tabs View */}
      <div className="tab-view-container">
        <div className="tab-view-header text-capitalize fw-bold text-primary mt-4">Tabs View</div>

        {/* Tabs on the Left */}
        <div className="tab-view-setting-left cursor-pointer mt-2 d-flex flex-row justify-content-between" onClick={() => setSelectedTabView("left")}>
          <div className="tab-view-setting-left-info ms-2 me-2 d-flex flex-row align-items-center">
            <div className="tab-view-setting-left-title text-dark text-capitalize">Tabs on the Left</div>
          </div>
          <div className="tab-view-radioBtn">
            <div className="form-check">
              <input
                className="form-check-input border border-secondary"
                type="radio"
                name="flexTabView"
                id="flexCheckDefault1"
                checked={selectedTabView === "left"}
                onChange={() => setSelectedTabView("left")}
              />
              <label className="form-check-label cursor-pointer" htmlFor="flexCheckDefault1"></label>
            </div>
          </div>
        </div>

        {/* Tabs on the Top */}
        <div className="tab-view-setting-top cursor-pointer mt-2 d-flex flex-row justify-content-between" onClick={() => setSelectedTabView("top")}>
          <div className="tab-view-setting-top-info ms-2 me-2 d-flex flex-row align-items-center">
            <div className="tab-view-setting-top-title text-dark text-capitalize">Tabs on the Top</div>
          </div>
          <div className="tab-view-radioBtn">
            <div className="form-check">
              <input
                className="form-check-input border border-secondary"
                type="radio"
                name="flexTabView"
                id="flexCheckDefault2"
                checked={selectedTabView === "top"}
                onChange={() => setSelectedTabView("top")}
              />
              <label className="form-check-label cursor-pointer" htmlFor="flexCheckDefault2"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
