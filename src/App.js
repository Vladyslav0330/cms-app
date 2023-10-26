import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import LazyLoadComponent from "./LazyLoadComponent";

const tabsData = [
  {
    id: "dummyTable",
    title: "Dummy Table",
    order: 1,
    path: "tabs/dummyTable.js",
  },
  {
    id: "dummyChart",
    title: "Dummy Chart",
    order: 2,
    path: "tabs/dummyChart.js",
  },
  { id: "dummyList", title: "Dummy List", order: 0, path: "tabs/dummyList.js" },
];

function App() {
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setTabs(tabsData);
    }, 1000);
  }, []);

  useEffect(() => {
    const tabIdFromUrl = window.location.pathname.slice(1);
    const matchingTab = tabs.find((tab) => tab.id === tabIdFromUrl);
    if (matchingTab) {
      setActiveTab(matchingTab.id);
    } else {
      setActiveTab(tabs[0]?.id || "");
    }
  }, [tabs]);

  return (
    <div>
      <ul>
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link to={tab.id}>{tab.title}</Link>
          </li>
        ))}
      </ul>
      <Routes>
        {tabs.map((tab) => (
          <Route
            key={tab.id}
            path={`/${tab.id}`}
            element={<LazyLoadComponent path={tab.path} />}
          />
        ))}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </div>
  );
}

export default App;
