'use client';

import { useState } from 'react';
import Web3 from 'web3'; // Import web3.js
const AddStudentButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Name
  const [searchRoll, setRollnum] = useState(''); // Roll number
  const [searchGender, setGender] = useState('');
  const [searchBatch, setBatch] = useState('');
  const [searchDepartment, setDepartment] = useState('');
  const [searchBranch, setBranch] = useState('');
  const [searchHall, setHall] = useState('');

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Function to handle adding a student using web3.js
  const getUserAccount = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        return accounts[0];
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        return null;
      }
    } else {
      console.warn("MetaMask not detected. Please install MetaMask.");
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Request account access if needed
      // console.table(window.ethereum)
      if (window.ethereum) {

        // Set up web3.js provider
        
        const web3 = new Web3("https://sepolia.infura.io/v3/e1114b387d1d4a93aea29b45020c1164");

        // Set up the contract instance (replace with your deployed contract address and ABI)
        const contractAddress = "0x4De5170Da8B074ebd2580c63dD607e1aDDCEC484"; // Add your contract address here
        const contractABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"rollnum","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"string","name":"gender","type":"string"},{"indexed":false,"internalType":"uint256","name":"batch","type":"uint256"},{"indexed":false,"internalType":"string","name":"department","type":"string"},{"indexed":false,"internalType":"string","name":"branch","type":"string"},{"indexed":false,"internalType":"uint256","name":"hall","type":"uint256"}],"name":"StudentAdded","type":"event"},{"inputs":[{"internalType":"uint256","name":"_rollnum","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_gender","type":"string"},{"internalType":"uint256","name":"_batch","type":"uint256"},{"internalType":"string","name":"_department","type":"string"},{"internalType":"string","name":"_branch","type":"string"},{"internalType":"uint256","name":"_hall","type":"uint256"}],"name":"addStudent","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllStudentRollNumbers","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rollnum","type":"uint256"}],"name":"getStudent","outputs":[{"components":[{"internalType":"uint256","name":"rollnum","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"gender","type":"string"},{"internalType":"uint256","name":"batch","type":"uint256"},{"internalType":"string","name":"department","type":"string"},{"internalType":"string","name":"branch","type":"string"},{"internalType":"uint256","name":"hall","type":"uint256"}],"internalType":"struct StudentRegistry.Student","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTotalStudents","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

        const contract = new web3.eth.Contract(contractABI, contractAddress);
        
        // Get the user's account
        const account = await getUserAccount();
        console.log(account)
        // Send the transaction to add a student
        console.log(contract.methods);
      //   const gasEstimate = await contract.methods
      // .addStudent(
      //   searchRoll,
      //     searchTerm,
      //     searchGender,
      //     searchBatch,
      //     searchDepartment,
      //     searchBranch,
      //     searchHall
      // )
      // .estimateGas({ from: account });
      //   await contract.methods.addStudent(
      //     searchRoll,
      //       searchTerm,
      //       searchGender,
      //       searchBatch,
      //       searchDepartment,
      //       searchBranch,
      //       searchHall
      //   ).send({ from: account, gas: gasEstimate });;
      const gasEstimate = await contract.methods
      .getTotalStudents()
      .estimateGas({ from: account });
      console.log(gasEstimate)
      // web3.eth.accounts.wallet.add("0x32572bfdc5a3ac6a24477f601fe1631f09676500238a8eba0028d17e255138ce");
        await contract.methods.getTotalStudents().send({ from: account ,gas:300000});;
          console.log(420)
        // Clear the form after submission
        setSearchTerm('');
        setRollnum('');
        setGender('');
        setBatch('');
        setDepartment('');
        setBranch('');
        setHall('');
        closeModal();

        console.log("Student added successfully!");
      } else {
        console.error("MetaMask is not installed.");
      }
    } catch (err) {
      console.error("Error adding student:", err);
    }
  };

  return (
    <>
      {/* Add Student Button */}
      <button
        onClick={openModal}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-all z-50"
      >
        + Add Student
      </button>

      {/* Modal to Add Student */}
<div className={`fixed inset-0 z-40 transition-opacity duration-500 ${showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-500"></div>
  <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl w-full backdrop-blur-lg grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto mt-24">
          {/* Left side: Image */}
          <div className="flex justify-center items-center">
            <img
              src="/imgs/bg.jpg"
              alt="Student"
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>

          {/* Right side: Form */}
          <div>
            <h2 className="text-white text-2xl font-semibold mb-6 text-center">ADD NEW STUDENT</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 mb-4 bg-transparent border-2 border-blue-500 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Roll Number"
                value={searchRoll}
                onChange={(e) => setRollnum(e.target.value)}
                className="w-full p-3 mb-4 bg-transparent border-2 border-pink-500 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Gender"
                value={searchGender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 mb-4 bg-transparent border-2 border-blue-500 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Batch"
                value={searchBatch}
                onChange={(e) => setBatch(e.target.value)}
                className="w-full p-3 mb-4 bg-transparent border-2 border-pink-500 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Department"
                value={searchDepartment}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full p-3 mb-4 bg-transparent border-2 border-blue-500 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Branch"
                value={searchBranch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full p-3 mb-4 bg-transparent border-2 border-pink-500 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Hall"
                value={searchHall}
                onChange={(e) => setHall(e.target.value)}
                className="w-full p-3 mb-4 bg-transparent border-2 border-blue-500 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Buttons styled similar to Search and Clear buttons */}
              <div className="flex justify-center mt-6 space-x-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="p-3 bg-pink-500 text-white rounded-md shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="p-3 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddStudentButton;
