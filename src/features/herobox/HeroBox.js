import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserPlus, FaUsers, FaMoneyBillWave, FaUserMd } from 'react-icons/fa';
import Modal from 'react-modal';
import { addPatientAsync } from './HeroBoxSlice';
import { getDoctorsAsync, addDoctorAsync } from './DoctorSlice';

Modal.setAppElement('#root');

const HeroBox = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);
  const doctors = useSelector((state) => state.doctors.doctors.data);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [doctorModalIsOpen, setDoctorModalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('total');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [showIncome, setShowIncome] = useState(false);

  useEffect(() => {
    dispatch(getDoctorsAsync());
  }, [dispatch]);

  // const getTotalIncome = () => {
  //   const now = new Date();
  //   const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //   let filteredPatients = patients.filter((patient) => patient.status === 'out');

  //   if (selectedPeriod === 'day') {
  //     filteredPatients = filteredPatients.filter((patient) => {
  //       const dischargeDate = new Date(patient.dischargeDate);
  //       return dischargeDate.toDateString() === today.toDateString();
  //     });
  //   } else if (selectedPeriod === 'week') {
  //     const startOfWeek = new Date(now);
  //     const day = startOfWeek.getDay();
  //     const diff = (day === 0 ? 6 : day - 1); // Adjust to Monday (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
  //     startOfWeek.setDate(now.getDate() - diff);
  //     startOfWeek.setHours(0, 0, 0, 0);
  //     const endOfWeek = new Date(startOfWeek);
  //     endOfWeek.setDate(startOfWeek.getDate() + 6);
  //     endOfWeek.setHours(23, 59, 59, 999);
  //     filteredPatients = filteredPatients.filter((patient) => {
  //       const dischargeDate = new Date(patient.dischargeDate);
  //       return dischargeDate >= startOfWeek && dischargeDate <= endOfWeek;
  //     });
  //   } else if (selectedPeriod === 'month') {
  //     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  //     filteredPatients = filteredPatients.filter((patient) => {
  //       const dischargeDate = new Date(patient.dischargeDate);
  //       return dischargeDate >= startOfMonth && dischargeDate <= now;
  //     });
  //   } else if (selectedPeriod === 'lastMonth') {
  //     const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  //     const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
  //     endOfLastMonth.setHours(23, 59, 59, 999); // Set to the end of the last day of the last month
  //     filteredPatients = filteredPatients.filter((patient) => {
  //       const dischargeDate = new Date(patient.dischargeDate);
  //       return dischargeDate >= startOfLastMonth && dischargeDate <= endOfLastMonth;
  //     });
  //   } else if (selectedPeriod === 'custom') {
  //     const startDate = new Date(customRange.start).setHours(0, 0, 0, 0);
  //     const endDate = new Date(customRange.end).setHours(23, 59, 59, 999);
  //     filteredPatients = filteredPatients.filter((patient) => {
  //       const dischargeDate = new Date(patient.dischargeDate).getTime();
  //       return dischargeDate >= startDate && dischargeDate <= endDate;
  //     });
  //   }

  //   return filteredPatients.reduce((acc, patient) => acc + (patient.bill || 0), 0);
  // };
  const getTotalIncome = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let filteredPatients = patients.filter((patient) => patient.status === 'out');
  
    if (selectedPeriod === 'day') {
      filteredPatients = filteredPatients.filter((patient) => {
        const dischargeDate = new Date(patient.dischargeDate);
        return dischargeDate.toDateString() === today.toDateString();
      });
    } else if (selectedPeriod === 'week') {
      const startOfWeek = new Date(now);
      const day = startOfWeek.getDay();
      const diff = (day === 0 ? 6 : day - 1); // Adjust to Monday (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
      startOfWeek.setDate(now.getDate() - diff);
      startOfWeek.setHours(0, 0, 0, 0);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      filteredPatients = filteredPatients.filter((patient) => {
        const dischargeDate = new Date(patient.dischargeDate);
        return dischargeDate >= startOfWeek && dischargeDate <= endOfWeek;
      });
    } else if (selectedPeriod === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
      endOfMonth.setHours(23, 59, 59, 999); // Set to the end of the last day of the month
      filteredPatients = filteredPatients.filter((patient) => {
        const dischargeDate = new Date(patient.dischargeDate);
        return dischargeDate >= startOfMonth && dischargeDate <= endOfMonth;
      });
    } else if (selectedPeriod === 'lastMonth') {
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      endOfLastMonth.setHours(23, 59, 59, 999); // Set to the end of the last day of the last month
      filteredPatients = filteredPatients.filter((patient) => {
        const dischargeDate = new Date(patient.dischargeDate);
        return dischargeDate >= startOfLastMonth && dischargeDate <= endOfLastMonth;
      });
    } else if (selectedPeriod === 'custom') {
      const startDate = new Date(customRange.start).setHours(0, 0, 0, 0);
      const endDate = new Date(customRange.end).setHours(23, 59, 59, 999);
      filteredPatients = filteredPatients.filter((patient) => {
        const dischargeDate = new Date(patient.dischargeDate).getTime();
        return dischargeDate >= startDate && dischargeDate <= endDate;
      });
    }
  
    return filteredPatients.reduce((acc, patient) => acc + (patient.bill || 0), 0);
  };
  



  const totalIncome = getTotalIncome();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openDoctorModal = () => {
    setDoctorModalIsOpen(true);
  };

  const closeDoctorModal = () => {
    setDoctorModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPatientAsync({ name, contactNumber, address, doctorId })).then(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setName('');
      setContactNumber('');
      setAddress('');
      setDoctorId('');
    });
    closeModal();
  };

  const handleDoctorSubmit = (e) => {
    e.preventDefault();
    dispatch(addDoctorAsync({ name: doctorName, specialist: specialist })).then(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      setDoctorName('');
      setSpecialist('');
    });
    closeDoctorModal();
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
    setShowIncome(false);
  };

  const handleCustomRangeChange = (e) => {
    setCustomRange({
      ...customRange,
      [e.target.name]: e.target.value,
    });
    setShowIncome(false);
  };

  const toggleIncomeVisibility = () => {
    setShowIncome(!showIncome);
  };

  return (
    <div className="relative p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-blue-500 text-white p-8 rounded-lg flex items-center justify-between">
          <div>
            <FaUserPlus size={24} />
            <h3 className="text-lg font-bold">Add Patient</h3>
          </div>
          <button
            onClick={openModal}
            className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
          >
            Add
          </button>
        </div>

        <div className="bg-blue-500 text-white p-8 rounded-lg flex items-center justify-between">
          <div>
            <FaUserMd size={24} />
            <h3 className="text-lg font-bold">Add Doctor</h3>
          </div>
          <button
            onClick={openDoctorModal}
            className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-400 transition duration-300"
          >
            Add
          </button>
        </div>

        <div className="bg-green-500 text-white p-8 rounded-lg flex items-center justify-between">
          <div>
            <FaUsers size={24} />
            <h3 className="text-lg font-bold">Total Patients</h3>
          </div>
          <span className="text-4xl font-bold">{patients.length}</span>
        </div>

        <div className="bg-yellow-500 text-white p-8 rounded-lg flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <FaMoneyBillWave size={24} />
            <h3 className="text-lg font-bold">Income</h3>
          </div>
          <select
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="mt-4 mb-2 px-4 py-2 rounded text-black"
          >
            <option value="total">Total Income</option>
            <option value="day">Today's Income</option>
            <option value="week">This Week's Income</option>
            <option value="month">This Month's Income</option>
            <option value="lastMonth">Last Month's Income</option>
            <option value="custom">Custom Date Range</option>
          </select>
          {selectedPeriod === 'custom' && (
            <div className="flex flex-col items-center">
              <input
                type="date"
                name="start"
                value={customRange.start}
                onChange={handleCustomRangeChange}
                className="mt-2 mb-2 px-4 py-2 rounded text-black"
              />
              <input
                type="date"
                name="end"
                value={customRange.end}
                onChange={handleCustomRangeChange}
                className="mb-2 px-4 py-2 rounded text-black"
              />
            </div>
          )}
          <div className="relative">
            <span
              className="text-3xl font-bold text-center cursor-pointer"
              onClick={toggleIncomeVisibility}
            >
              {showIncome ? `Rs.${totalIncome}` : '*****'}
            </span>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-500 text-white text-center font-bold">
          {doctorName ? 'Doctor added successfully!' : ' added successfully!'}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded shadow-lg w-4/5 h-4/5 mx-auto my-10"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Patient</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Contact Number:
            <input
              type="text"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <label className="block mb-4">
            Address:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <label className="block mb-4">
            Select Doctor:
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            >
              <option value="">Select a Doctor</option>
              {doctors?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialist}
                </option>
              ))}
            </select>
          </label>
          <div className="flex justify-center space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded">Submit</button>
            <button type="button" onClick={closeModal} className="bg-red-500 text-white px-6 py-3 rounded">Cancel</button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={doctorModalIsOpen}
        onRequestClose={closeDoctorModal}
        className="bg-white p-6 rounded shadow-lg w-4/5 h-4/5 mx-auto my-10"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Doctor</h2>
        <form onSubmit={handleDoctorSubmit} className="space-y-4">
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <label className="block mb-2">
            Specialist:
            <input
              type="text"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </label>
          <div className="flex justify-center space-x-4">
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded">Submit</button>
            <button type="button" onClick={closeDoctorModal} className="bg-red-500 text-white px-6 py-3 rounded">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default HeroBox;






