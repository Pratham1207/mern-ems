import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/EmployeeTable.css";

const EmployeeTable = ({ employees, loading, setDeleteEmployeeId }) => {
  // Local state to manage the search term input and filtered employees
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  // useNavigate hook for navigating to different routes
  const navigate = useNavigate();

  // useEffect hook to filter the employee list based on the search term
  useEffect(() => {
    if (employees) {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = employees.filter((employee) => {
        // Filter employees based on their first name, last name, or department
        return (
          employee.firstName.toLowerCase().includes(lowercasedFilter) ||
          employee.lastName.toLowerCase().includes(lowercasedFilter) ||
          employee.department.toLowerCase().includes(lowercasedFilter)
        );
      });
      setFilteredEmployees(filtered);
    }
  }, [searchTerm, employees]); // Re-run the effect whenever searchTerm or employees change

  // If the data is loading, display a loading spinner
  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  // If there are no employees, display a message indicating no data
  if (!employees || employees.length === 0) {
    return <p>No employee data available.</p>;
  }

  // Function to handle the "Edit" button click and navigate to the edit page
  const handleEdit = (empid) => {
    navigate(`/employeeslist/update/${empid}`);
  };

  // Function to handle the "View" button click and navigate to the employee details page
  const handleView = (id) => {
    navigate(`/employeeslist/${id}`);
  };

  return (
    <div className="container flex-grow-1" style={{ paddingBottom: 60 }}>
      <h2 className="text-center title">Employee List</h2>

      {/* Search bar to filter employees based on name or department */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="styled-table  table-responsive">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>Title</th>
              <th>Department</th>
              <th>Joining Date</th>
              <th>Employee Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-data">
                  No employees found.
                </td>
              </tr>
            ) : (
              // Map through the filtered employees and display each in a table row
              filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.age}</td>
                  <td>{employee.title}</td>
                  <td>{employee.department}</td>
                  <td>
                    {employee.dateOfJoining
                      ? employee.dateOfJoining.split("T")[0]
                      : "N/A"}
                  </td>
                  <td>{employee.employeeType}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleView(employee.id)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleEdit(employee.id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => setDeleteEmployeeId(employee.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
