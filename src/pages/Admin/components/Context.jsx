
import React, { createContext, useState, useEffect } from 'react';

export const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [createdContent, setCreatedContent] = useState(null);

  useEffect(() => {
    // 檢查 createdContent 是否為空
    if (!createdContent) {
      // 如果為空，嘗試從 sessionStorage 讀取數據
      const savedContent = sessionStorage.getItem('createdContent');
      if (savedContent) {
        try {
          const parsedContent = JSON.parse(savedContent);
          //console.log('%csrc/pages/Admin/utils/Context.jsx:17 parsedContent', 'color: #007acc;', parsedContent);
          setCreatedContent(parsedContent);
        } catch (error) {
          console.error('Error parsing content from sessionStorage:', error);
        }
      }
    }
  }, [createdContent]);  // 依賴項包含 createdContent

  const updateCreatedContent = (data) => {
    setCreatedContent(data);
    // 將數據保存到 sessionStorage
    sessionStorage.setItem('createdContent', JSON.stringify(data));
  };

  return (
    <ContentContext.Provider value={{ createdContent, updateCreatedContent }}>
      {children}
    </ContentContext.Provider>
  );
};