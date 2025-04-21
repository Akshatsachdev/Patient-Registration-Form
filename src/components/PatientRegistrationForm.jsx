import React, { useState } from 'react';

function PatientRegistrationForm() {
  const [patientType, setPatientType] = useState('new');
  const [searchContact, setSearchContact] = useState('');
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    contact: '',
    email: '',
    aadhar: '',
    purpose: '',
    patientId: '',
  });
  

  const [showSlip, setShowSlip] = useState(false);
  const [slipData, setSlipData] = useState(null);

  const assignUnit = (age) => {
    const ageNum = parseInt(age);
    if (ageNum <= 14) return 'Unit 1';
    if (ageNum >= 15 && ageNum <= 40) {
      const options = ['Unit 2', 'Unit 3', 'Unit 4'];
      return options[Math.floor(Math.random() * options.length)];
    }
    return 'Unit 5';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    setPatientType(e.target.value);
    setPatient({
      name: '',
      age: '',
      gender: '',
      contact: '',
      email: '',
      patientId: '',
    });
    setSearchContact('');
    setShowSlip(false);
    setSlipData(null);
  };

  const fetchPatient = async () => {
    try {
      const response = await fetch(`http://localhost:5000/patient/${searchContact}`);
      if (response.ok) {
        const data = await response.json();
        const unit = assignUnit(data.age);

        setPatient({
          ...data,
          patientId: data.patient_id,
        });

        setSlipData({
          name: data.name,
          age: data.age,
          gender: data.gender,
          contact: data.contact,
          patientId: data.patient_id,
          unit: unit,
        });

        setShowSlip(true);
      } else {
        alert('Patient not found');
        setPatient({
          name: '',
          age: '',
          gender: '',
          contact: '',
          email: '',
          patientId: '',
        });
        setShowSlip(false);
      }
    } catch (err) {
      alert('Error fetching patient');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (patientType === 'new') {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patient),
        });

        if (response.ok) {
          const result = await response.json();
          const patientId = result.patientId;
          const unit = assignUnit(patient.age);

          setSlipData({
            ...patient,
            patientId,
            unit,
          });

          setShowSlip(true);
          setPatient({
            name: '',
            age: '',
            gender: '',
            contact: '',
            email: '',
            patientId: '',
          });
        } else {
          alert('Registration failed');
        }
      } catch (err) {
        alert('Error connecting to server');
        console.error(err);
      }
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url('https://i.pinimg.com/736x/5e/6b/1c/5e6b1c6a633aeeaa013312b69c89ab11.jpg')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
  
      {/* Form Container */}
      <div className="relative z-10 backdrop-blur-sm bg-white/90 px-400 py-600 rounded-lg shadow-md w-[900px]">

        {/* Patient Type Selection */}
        <div className="absolute top-4 left-4 text-sm text-gray-700 font-medium">
          <label className="mr-4">
            <input
              type="radio"
              name="patientType"
              value="new"
              checked={patientType === 'new'}
              onChange={handleTypeChange}
              className="mr-1"
            />
            New Patient
          </label>
          <label>
            <input
              type="radio"
              name="patientType"
              value="existing"
              checked={patientType === 'existing'}
              onChange={handleTypeChange}
              className="mr-1"
            />
            Existing Patient
          </label>
        </div>
  
        {/* Title */}
        <h2 className="text-xl font-bold text-center text-white mb-4 drop-shadow-md">
  Patient Registration
</h2>


  
        {/* Existing Patient Form */}
        {patientType === 'existing' ? (
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Enter Contact Number"
              value={searchContact}
              onChange={(e) => setSearchContact(e.target.value)}
              className="w-full p-2 border rounded mb-2 text-sm"
            />
            <button
              type="button"
              onClick={fetchPatient}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full text-sm"
            >
              Fetch Details
            </button>
          </div>
        ) : (
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
  <input
    type="text"
    name="name"
    placeholder="Full Name"
    value={patient.name}
    onChange={handleChange}
    required
    className="p-2 border rounded"
  />
  <input
    type="number"
    name="age"
    placeholder="Age"
    value={patient.age}
    onChange={handleChange}
    required
    className="p-2 border rounded"
  />
  <select
    name="gender"
    value={patient.gender}
    onChange={handleChange}
    required
    className="p-2 border rounded"
  >
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
  <input
    type="tel"
    name="contact"
    placeholder="Contact Number"
    value={patient.contact}
    onChange={handleChange}
    required
    className="p-2 border rounded"
  />
  <input
    type="email"
    name="email"
    placeholder="Email (optional)"
    value={patient.email}
    onChange={handleChange}
    className="p-2 border rounded"
  />
  <input
    type="text"
    name="aadhar"
    placeholder="Aadhar Number"
    value={patient.aadhar}
    onChange={handleChange}
    className="p-2 border rounded"
  />
  <select
    name="purpose"
    value={patient.purpose}
    onChange={handleChange}
    required
    className="p-2 border rounded"
  >
    <option value="">Purpose of Visit</option>
    <option value="Regular Checkup">Regular Checkup</option>
    <option value="Follow-up">Follow-up</option>
    <option value="Regular Investigation">Regular Investigation</option>
    <option value="Certification">Certification</option>
  </select>

  <button
    type="submit"
    className="bg-green-600 text-white py-2 rounded text-sm"
  >
    Register
  </button>
</form>
        )}
  
        {/* Patient Slip */}
{showSlip && slipData && (
  <div className="mt-6">
    <div
      id="printable-slip"
      className="p-4 border border-gray-300 rounded-lg bg-white text-gray-800 shadow-lg text-sm"
      style={{ backgroundColor: '#ffffff' }} // Forces solid white
    >
      <h3 className="font-semibold text-lg mb-2 text-black">🧾 Patient Slip</h3>
      <p><strong>Patient ID:</strong> {slipData.patientId}</p>
      <p><strong>Name:</strong> {slipData.name}</p>
      <p><strong>Age:</strong> {slipData.age}</p>
      <p><strong>Gender:</strong> {slipData.gender}</p>
      <p><strong>Contact:</strong> {slipData.contact}</p>
      <p><strong>Clinic Unit:</strong> {slipData.unit}</p>
      <p><strong>Aadhar Number:</strong> {slipData.aadhar}</p>
      <p><strong>Purpose of Visit:</strong> {slipData.purpose}</p>

    </div>

    <div className="mt-4 flex gap-4">
      <button
        onClick={() => window.print()}
        className="bg-orange-500 text-white px-4 py-2 rounded text-sm"
      >
        🖨️ Print Slip
      </button>
      <button
        onClick={() => setShowSlip(false)}
        className="bg-gray-800 text-white px-4 py-2 rounded text-sm"
      >
        Reset
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );     
}

export default PatientRegistrationForm;
