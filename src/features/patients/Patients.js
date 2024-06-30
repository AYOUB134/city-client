import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { fetchPatientsAsync, updatePatientAsync } from './PatientsSlice';

Modal.setAppElement('#root');

const Patients = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const status = useSelector((state) => state.patients.status);
  const error = useSelector((state) => state.patients.error);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPatient, setEditingPatient] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Format date function
  const formatDateTime = (dateTime) => {
    const formattedDate = new Date(dateTime).toLocaleString(); // Adjust as needed
    return formattedDate;
  };

  // Date filter functions
  const isCurrentDay = (dateTime) => {
    const admissionDate = new Date(dateTime);
    const today = new Date();
    return admissionDate.getDate() === today.getDate() &&
           admissionDate.getMonth() === today.getMonth() &&
           admissionDate.getFullYear() === today.getFullYear();
  };

  const isCurrentWeek = (dateTime) => {
    const admissionDate = new Date(dateTime);
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Saturday
    return admissionDate >= startOfWeek && admissionDate <= endOfWeek;
  };

  const isCurrentMonth = (dateTime) => {
    const admissionDate = new Date(dateTime);
    const today = new Date();
    return admissionDate.getMonth() === today.getMonth() &&
           admissionDate.getFullYear() === today.getFullYear();
  };

  const isCurrentYear = (dateTime) => {
    const admissionDate = new Date(dateTime);
    const today = new Date();
    return admissionDate.getFullYear() === today.getFullYear();
  };

  const isCustomDateRange = (dateTime) => {
    const admissionDate = new Date(dateTime);
    if (!startDate || !endDate) return true; // If no date range selected, return true
    
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    
    return admissionDate >= start && admissionDate <= end;
  };

  // Filter patients based on search term and filter type
  const filteredPatients = patients.filter((patient) => {
    const nameMatch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    switch (filterType) {
      case 'currentDay':
        return nameMatch && isCurrentDay(patient.admissionDate);
      case 'currentWeek':
        return nameMatch && isCurrentWeek(patient.admissionDate);
      case 'currentMonth':
        return nameMatch && isCurrentMonth(patient.admissionDate);
      case 'currentYear':
        return nameMatch && isCurrentYear(patient.admissionDate);
      case 'custom':
        return nameMatch && isCustomDateRange(patient.admissionDate);
      case 'inPatients':
        return nameMatch && patient.status === 'in';
      case 'outPatients':
        return nameMatch && patient.status === 'out';
      default:
        return nameMatch;
    }
  });

  useEffect(() => {
    dispatch(fetchPatientsAsync());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const openModal = (patient) => {
    setEditingPatient(patient);
  };

  const closeModal = () => {
    setEditingPatient(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPatient) {
      const { _id } = editingPatient;
      handleStatusChange(_id, editingPatient);
      closeModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPatient(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
    if (e.target.value !== 'custom') {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(new Date(e.target.value));
  };

  const handleEndDateChange = (e) => {
    setEndDate(new Date(e.target.value));
  };

  const handleStatusChange = async (patientId, updatedPatientData) => {
    try {
      await dispatch(updatePatientAsync({ patientId, updatedPatientData }));
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
      setEditingPatient(null);
    } catch (error) {
      console.error('Failed to update status:', error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Patients</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div className="w-full md:w-2/2 mb-4 md:mb-0">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name..."
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="w-full md:w-1/2 flex items-center">
          <select
            value={filterType}
            onChange={handleFilterChange}
            className="w-full md:w-auto p-2 border border-gray-300 rounded mr-2"
          >
            <option value="all">All Patients</option>
            <option value="inPatients">In Patients</option>
            <option value="outPatients">Out Patients</option>
            <option value="currentDay">Current Day</option>
            <option value="currentWeek">Current Week</option>
            <option value="currentMonth">Current Month</option>
            <option value="currentYear">Current Year</option>
            <option value="custom">Custom Date Range</option>
          </select>
          {filterType === 'custom' && (
            <div className="flex space-x-2 md:space-x-4">
              <input
                type="date"
                onChange={handleStartDateChange}
                className="p-2 border border-gray-300 rounded"
              />
              <input
                type="date"
                onChange={handleEndDateChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          )}
        </div>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {status === 'succeeded' && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">No.</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">Patient Name</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">To Dr.</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">Contact</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">Address</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">Admission Date</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">Discharge Date</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">Status</th>
                  <th className="border border-gray-300 px-2 md:px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.name}</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.doctorId}</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.contactNumber}</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.address}</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">{formatDateTime(patient.admissionDate)}</td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      {patient.status === 'out' ? formatDateTime(patient.dischargeDate) : 'N/A'}
                    </td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      <span className={`px-2 py-1 rounded ${patient.status === 'in' ? 'bg-green-200' : 'bg-red-200'}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-2 md:px-4 py-2">
                      <button
                        onClick={() => openModal(patient)}
                        className="bg-blue-500 text-white px-3 md:px-4 py-1 rounded"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showSuccessMessage && (
            <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-screen bg-gray-900 bg-opacity-50 text-white">
              <div className="bg-green-500 p-4 rounded-md text-center">
                Status changed successfully!
              </div>
            </div>
          )}
        </>
      )}
      <Modal
        isOpen={!!editingPatient}
        onRequestClose={closeModal}
        className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-md mx-auto my-10"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Patient</h2>
        {editingPatient && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block mb-2">
              Name:
              <input
                type="text"
                name="name"
                value={editingPatient.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                disabled={editingPatient.status === 'out'}
              />
            </label>


          

            <label className="block mb-2">
              To Dr:
              <input
                type="text"
                name="doctorId"
                value={editingPatient.doctorId}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                disabled={editingPatient.status === 'out'}
              />
            </label>


            <label className="block mb-2">
              Contact Number:
              <input
                type="text"
                name="contactNumber"
                value={editingPatient.contactNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                disabled={editingPatient.status === 'out'}
              />
            </label>
            <label className="block mb-2">
              Address:
              <input
                type="text"
                name="address"
                value={editingPatient.address}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                disabled={editingPatient.status === 'out'}
              />
            </label>
            <label className="block mb-2">
              Bill:
              <input
                type="number"
                name="bill"
                value={editingPatient.bill}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
                disabled={editingPatient.status === 'out'}
              />
            </label>
            <label className="block mb-2">
              Status:
              <select
                name="status"
                value={editingPatient.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                disabled={editingPatient.status === 'out'}
              >
                <option value="in">In</option>
                <option value="out">Out</option>
              </select>
            </label>
            <div className="flex justify-center space-x-4">
              <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Submit</button>
              <button type="button" onClick={closeModal} className="bg-red-500 text-white px-6 py-2 rounded">Cancel</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Patients;












































// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Modal from 'react-modal';
// import { fetchPatientsAsync, updatePatientAsync } from './PatientsSlice';

// Modal.setAppElement('#root');

// const Patients = () => {
//   const dispatch = useDispatch();
//   const patients = useSelector((state) => state.patients.patients);
//   const status = useSelector((state) => state.patients.status);
//   const error = useSelector((state) => state.patients.error);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editingPatient, setEditingPatient] = useState(null);
//   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//   const [filterType, setFilterType] = useState('all');
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);

//   // Format date function
//   const formatDateTime = (dateTime) => {
//     const formattedDate = new Date(dateTime).toLocaleString(); // Adjust as needed
//     return formattedDate;
//   };

//   // Date filter functions
//   const isCurrentDay = (dateTime) => {
//     const admissionDate = new Date(dateTime);
//     const today = new Date();
//     return admissionDate.getDate() === today.getDate() &&
//            admissionDate.getMonth() === today.getMonth() &&
//            admissionDate.getFullYear() === today.getFullYear();
//   };

//   const isCurrentWeek = (dateTime) => {
//     const admissionDate = new Date(dateTime);
//     const today = new Date();
//     const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Sunday
//     const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Saturday
//     return admissionDate >= startOfWeek && admissionDate <= endOfWeek;
//   };

//   const isCurrentMonth = (dateTime) => {
//     const admissionDate = new Date(dateTime);
//     const today = new Date();
//     return admissionDate.getMonth() === today.getMonth() &&
//            admissionDate.getFullYear() === today.getFullYear();
//   };

//   const isCurrentYear = (dateTime) => {
//     const admissionDate = new Date(dateTime);
//     const today = new Date();
//     return admissionDate.getFullYear() === today.getFullYear();
//   };

//   const isCustomDateRange = (dateTime) => {
//     const admissionDate = new Date(dateTime);
//     if (!startDate || !endDate) return true; // If no date range selected, return true
    
//     const start = new Date(startDate);
//     start.setHours(0, 0, 0, 0);
    
//     const end = new Date(endDate);
//     end.setHours(23, 59, 59, 999);
    
//     return admissionDate >= start && admissionDate <= end;
//   };

//   // Filter patients based on search term and filter type
//   const filteredPatients = patients.filter((patient) => {
//     const nameMatch = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
//     switch (filterType) {
//       case 'currentDay':
//         return nameMatch && isCurrentDay(patient.admissionDate);
//       case 'currentWeek':
//         return nameMatch && isCurrentWeek(patient.admissionDate);
//       case 'currentMonth':
//         return nameMatch && isCurrentMonth(patient.admissionDate);
//       case 'currentYear':
//         return nameMatch && isCurrentYear(patient.admissionDate);
//       case 'custom':
//         return nameMatch && isCustomDateRange(patient.admissionDate);
//       case 'inPatients':
//         return nameMatch && patient.status === 'in';
//       case 'outPatients':
//         return nameMatch && patient.status === 'out';
//       default:
//         return nameMatch;
//     }
//   });

//   useEffect(() => {
//     dispatch(fetchPatientsAsync());
//   }, [dispatch]);

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const openModal = (patient) => {
//     setEditingPatient(patient);
//   };

//   const closeModal = () => {
//     setEditingPatient(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingPatient) {
//       const { _id } = editingPatient;
//       handleStatusChange(_id, editingPatient);
//       closeModal();
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditingPatient(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleFilterChange = (e) => {
//     setFilterType(e.target.value);
//     if (e.target.value !== 'custom') {
//       setStartDate(null);
//       setEndDate(null);
//     }
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(new Date(e.target.value));
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(new Date(e.target.value));
//   };

//   const handleStatusChange = async (patientId, updatedPatientData) => {
//     try {
//       await dispatch(updatePatientAsync({ patientId, updatedPatientData }));
//       setShowSuccessMessage(true);
//       setTimeout(() => setShowSuccessMessage(false), 2000);
//       setEditingPatient(null);
//     } catch (error) {
//       console.error('Failed to update status:', error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Patients</h1>
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
//         <div className="w-full md:w-2/2 mb-4 md:mb-0">
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search by name..."
//             className="w-full p-2 border border-gray-300 rounded"
//           />
//         </div>
//         <div className="w-full md:w-1/2 flex items-center">
//           <select
//             value={filterType}
//             onChange={handleFilterChange}
//             className="w-full md:w-auto p-2 border border-gray-300 rounded mr-2"
//           >
//             <option value="all">All Patients</option>
//             <option value="inPatients">In Patients</option>
//             <option value="outPatients">Out Patients</option>
//             <option value="currentDay">Current Day</option>
//             <option value="currentWeek">Current Week</option>
//             <option value="currentMonth">Current Month</option>
//             <option value="currentYear">Current Year</option>
//             <option value="custom">Custom Date Range</option>
//           </select>
//           {filterType === 'custom' && (
//             <div className="flex space-x-2 md:space-x-4">
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 className="p-2 border border-gray-300 rounded"
//               />
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 className="p-2 border border-gray-300 rounded"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       {status === 'loading' && <p>Loading...</p>}
//       {status === 'failed' && <p>{error}</p>}
//       {status === 'succeeded' && (
//         <>
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse border border-gray-300">
//               <thead className="bg-gray-200">
//                 <tr>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">No.</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">Patient Name</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">To Dr.</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">Contact</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">Address</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">Admission Date</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">Discharge Date</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">Status</th>
//                   <th className="border border-gray-300 px-2 md:px-4 py-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPatients.map((patient, index) => (
//                   <tr key={patient._id}>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">{index + 1}</td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.name}</td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.doctorId}</td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.contactNumber}</td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">{patient.address}</td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">{formatDateTime(patient.admissionDate)}</td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">
//                       {patient.status === 'out' ? formatDateTime(patient.dischargeDate) : 'N/A'}
//                     </td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">
//                       <span className={`px-2 py-1 rounded ${patient.status === 'in' ? 'bg-green-200' : 'bg-red-200'}`}>
//                         {patient.status}
//                       </span>
//                     </td>
//                     <td className="border border-gray-300 px-2 md:px-4 py-2">
//                       <button
//                         onClick={() => openModal(patient)}
//                         className="bg-blue-500 text-white px-3 md:px-4 py-1 rounded"
//                       >
//                         Edit
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {showSuccessMessage && (
//             <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-screen bg-gray-900 bg-opacity-50 text-white">
//               <div className="bg-green-500 p-4 rounded-md text-center">
//                 Status changed successfully!
//               </div>
//             </div>
//           )}
//         </>
//       )}
//       <Modal
//         isOpen={!!editingPatient}
//         onRequestClose={closeModal}
//         className="bg-white p-4 md:p-6 rounded shadow-lg w-full max-w-md mx-auto my-10"
//         overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">Edit Patient</h2>
//         {editingPatient && (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <label className="block mb-2">
//               Name:
//               <input
//                 type="text"
//                 name="name"
//                 value={editingPatient.name}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//                 disabled={editingPatient.status === 'out'}
//               />
//             </label>


          

//             <label className="block mb-2">
//               To Dr:
//               <input
//                 type="text"
//                 name="doctorId"
//                 value={editingPatient.doctorId}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//                 disabled={editingPatient.status === 'out'}
//               />
//             </label>


//             <label className="block mb-2">
//               Contact Number:
//               <input
//                 type="text"
//                 name="contactNumber"
//                 value={editingPatient.contactNumber}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//                 disabled={editingPatient.status === 'out'}
//               />
//             </label>
//             <label className="block mb-2">
//               Address:
//               <input
//                 type="text"
//                 name="address"
//                 value={editingPatient.address}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//                 disabled={editingPatient.status === 'out'}
//               />
//             </label>
//             <label className="block mb-2">
//               Bill:
//               <input
//                 type="number"
//                 name="bill"
//                 value={editingPatient.bill}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 required
//                 disabled={editingPatient.status === 'out'}
//               />
//             </label>
//             <label className="block mb-2">
//               Status:
//               <select
//                 name="status"
//                 value={editingPatient.status}
//                 onChange={handleInputChange}
//                 className="w-full p-2 border border-gray-300 rounded mt-1"
//                 disabled={editingPatient.status === 'out'}
//               >
//                 <option value="in">In</option>
//                 <option value="out">Out</option>
//               </select>
//             </label>
//             <div className="flex justify-center space-x-4">
//               <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">Submit</button>
//               <button type="button" onClick={closeModal} className="bg-red-500 text-white px-6 py-2 rounded">Cancel</button>
//             </div>
//           </form>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default Patients;
