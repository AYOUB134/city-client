import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDoctors, deleteDoctor } from './DoctorsSlice';

const Doctors = () => {
  const dispatch = useDispatch();
  const doctorsState = useSelector((state) => state.doctorss);
  const { data, status, error } = doctorsState;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getDoctors());
    }
  }, [status, dispatch]);

  const doctorsArray = data || []; // Ensure doctorsArray is always an array

  const handleDelete = (doctorId) => {
    // Dispatch deleteDoctor action with doctorId
    dispatch(deleteDoctor(doctorId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doctors List ({doctorsArray.length})</h1>
      {status === 'loading' && <p className="text-gray-500">Loading...</p>}
      {status === 'failed' && <p className="text-red-500">{error}</p>}
      {status === 'succeeded' && doctorsArray.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Specialty</th>
                <th className="py-3 px-6 text-left">Total Patient</th>
                <th className="py-3 px-6 text-left">Total Income</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {doctorsArray.map((doctor) => (
                <tr key={doctor._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{doctor._id}</td>
                  <td className="py-3 px-6 text-left">{doctor.name}</td>
                  <td className="py-3 px-6 text-left">{doctor.specialist}</td>
                  <td className="py-3 px-6 text-left">{doctor.specialist}</td>
                  <td className="py-3 px-6 text-left">{doctor.specialist}</td>
                  <td className="py-3 px-6 text-left">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(doctor._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {status === 'succeeded' && doctorsArray.length === 0 && (
        <p className="text-gray-500">No doctors available</p>
      )}
    </div>
  );
};

export default Doctors;
