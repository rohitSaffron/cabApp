import React, { useEffect, useCallback, useState } from "react";
import CabCard from "./CabCard";
import CabCreationForm from "./CabCreationForm";

// API
import pmlAPI from "../api/pmlAPI";

const DashboardCabs = () => {
  const [cabCreation, setCabCreation] = useState(false);
  const [cabs, setCabs] = useState([]);

  const fetchCabs = useCallback(async () => {
    const cabs = await pmlAPI.get(`/api/cab`);
    console.log(cabs);
    setCabs(cabs.data);
    // TODO: Change in production;
    // setCabs(cabs.data.data);
  }, []);

  useEffect(() => {
    fetchCabs();
  }, [fetchCabs, cabCreation]);

  const renderCabs = () =>
    cabs.map((cab) => (
      <CabCard
        key={cab._id}
        carModel={cab.carModel}
        seats={cab.seats}
        luggage={cab.luggage}
        price={cab.price}
        cabImage={cab.cabImage}
        dashboardDisplay={true}
      />
    ));

  return (
    <div className="dashboard-cabs">
      <div className="dashboard-cabs__add-cabs">
        {!cabCreation && (
          <button className="btn btn--2" onClick={() => setCabCreation(true)}>
            Add Cab
          </button>
        )}

        {cabCreation && <CabCreationForm setCabCreation={setCabCreation} />}
      </div>
      <div className="dashboard-cabs__cards">{renderCabs()}</div>
    </div>
  );
};

export default DashboardCabs;
