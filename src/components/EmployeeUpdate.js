import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_EMPLOYEE, UPDATE_EMPLOYEE } from "../mutation/MutationEmployee";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeUpdate = () => {
  // State to store the employee data from the form
  const [employeeData, setEmployeeData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    department: "IT",
    title: "Employee",
    employeeType: "Full-Time",
    dateOfJoining: "",
  });

  // State to store error messages for form validation
  const [errorMessage, setErrorMessage] = useState("");

  // Get employee ID from the URL params
  const { empid } = useParams();
  const navigate = useNavigate();

  // Query to fetch the employee data using empid
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id: empid },
  });

  // Mutation hook for updating employee data
  const [updateEmployee, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPDATE_EMPLOYEE);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation: Ensure first name, last name, and age are filled
    if (
      !employeeData.firstName ||
      !employeeData.lastName ||
      !employeeData.age
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    try {
      // Call the mutation to update the employee data
      const { data } = await updateEmployee({
        variables: {
          id: empid,
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          age: parseInt(employeeData.age, 10),
          department: employeeData.department,
          title: employeeData.title,
          employeeType: employeeData.employeeType,
          dateOfJoining: employeeData.dateOfJoining,
        },
      });
      console.log("Update Employee Response:", data);
      // Navigate to the home page after successful update
      navigate("/");
    } catch (err) {
      // Catch and display any errors from the mutation
      console.error("Error updating employee:", err);
      alert(
        `Failed to update employee. Please try again. Error: ${err.message}`
      );
    }
  };

  // useEffect hook to set the form data once employee data is fetched
  useEffect(() => {
    if (data && data.employee) {
      // Set the form fields with the data fetched from the query
      setEmployeeData({
        firstName: data.employee.firstName || "",
        lastName: data.employee.lastName || "",
        age: data.employee.age || "",
        department: data.employee.department || "IT",
        title: data.employee.title || "Employee",
        employeeType: data.employee.employeeType || "Full-Time",
        dateOfJoining: data.employee.dateOfJoining.split("T")[0] || "", // Format date
      });
    }
  }, [data]); // Re-run the effect when data changes

  // Show a loading spinner while the employee data is being fetched
  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading employee data...</p>
      </div>
    );

  // Handle error when the query fails
  if (error) return <p>Error: {error.message}</p>;

  // If no employee data is found, display an error message
  if (!data || !data.employee) return <p>Employee not found.</p>;

  return (
    <div
      className="container mt-4"
      style={{ paddingBottom: "90px", maxWidth: "800px" }}
    >
      <h2 className="text-center mb-4">Update Employee</h2>

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={employeeData.firstName}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, firstName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={employeeData.lastName}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, lastName: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={employeeData.age}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, age: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Department:</label>
          <select
            className="form-select"
            name="department"
            value={employeeData.department}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, department: e.target.value })
            }
          >
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <select
            className="form-select"
            name="title"
            value={employeeData.title}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, title: e.target.value })
            }
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Employee Type:</label>
          <select
            className="form-select"
            name="employeeType"
            value={employeeData.employeeType}
            onChange={(e) =>
              setEmployeeData({ ...employeeData, employeeType: e.target.value })
            }
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date of Joining:</label>
          <input
            type="date"
            className="form-control"
            name="dateOfJoining"
            value={employeeData.dateOfJoining}
            onChange={(e) =>
              setEmployeeData({
                ...employeeData,
                dateOfJoining: e.target.value,
              })
            }
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={mutationLoading}
        >
          {mutationLoading ? (
            <div className="spinner-border text-light" role="status"></div>
          ) : (
            "Update Employee"
          )}
        </button>
      </form>
    </div>
  );
};

export default EmployeeUpdate;
