// src/home/Home.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from './HomeSlice';

const Home = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.home.patients);
  const status = useSelector((state) => state.home.status);
  const error = useSelector((state) => state.home.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getPatients());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <p>Loading...</p>;
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {patients.map((patient) => (
          <li key={patient._id}>
            {patient.name} - {patient.status}
          </li>
        ))}
      </ul>
    );
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <h1>Patients</h1>
      {content}
    </div>
  );
};

export default Home;
