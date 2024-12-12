import React, { useState, useEffect } from "react";
import { fetchLiveData } from "./services/api";
import LiveStreamTable from "./components/LiveStreamTable";
import LiveStreamChart from "./components/LiveStreamChart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveData = await fetchLiveData();
        setData(liveData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const controller = new AbortController();  // Create a new controller

    // Fetch the data initially
    fetchData(controller);

    // Set up an interval to call the fetch function every 3 seconds (3000ms)
    const interval = setInterval(() => {
      // Abort the previous request before making a new one
      controller.abort();
      const newController = new AbortController(); // Create a new controller for the next request
      fetchData(newController); // Fetch new data
    }, 3000);

    // Clean up the interval and abort the controller when the component unmounts
    return () => {
      clearInterval(interval);
      controller.abort(); // Abort the final request
    };
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/charts" element={<LiveStreamChart chartData={data} />} />
          <Route path="/table" element={<LiveStreamTable data={data} />} />
        </Routes>
        <Footer />
    </BrowserRouter>
    </div>
  );
};

export default App;
