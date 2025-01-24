import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import EmployeeTable from "./EmployeeTable";
import EmployeeDelete from "./EmployeeDelete";
import { GET_ALL_EMPLOYEES } from "../mutation/MutationEmployee";

const EmployeeDirectory = () => {
  // Query to fetch all employees
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);

  // State to store the employees data
  const [employees, setEmployees] = useState([]);
  const [deleteEmployeeId, setDeleteEmployeeId] = useState("");

  // useEffect hook to update the employees state when the query data is fetched
  useEffect(() => {
    if (data) {
      // Log the fetched employee data for debugging purposes
      console.log("Fetched employee data:", data.employees);
      setEmployees(data.employees);
    }
  }, [data]); // Run this effect when the data changes

  // If the data is still loading, show a loading spinner and message
  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  // If there is an error, display the error message
  if (error) return <p className="text-danger">Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <EmployeeTable
        employees={employees}
        loading={loading}
        setDeleteEmployeeId={setDeleteEmployeeId}
      />

      {deleteEmployeeId !== "" && (
        <EmployeeDelete
          deleteEmployeeId={deleteEmployeeId}
          setDeleteEmployeeId={setDeleteEmployeeId}
        />
      )}
    </div>
  );
};

export default EmployeeDirectory;
