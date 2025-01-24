import React, { useState, useEffect } from "react";
import {
  DELETE_EMPLOYEE,
  GET_ALL_EMPLOYEES,
} from "../mutation/MutationEmployee";
import { useMutation } from "@apollo/client";

const EmployeeDelete = ({ deleteEmployeeId, setDeleteEmployeeId }) => {
  // State to manage status messages (success or error)
  const [statusMessage, setStatusMessage] = useState(null);

  // Mutation hook to delete an employee, passing the employee ID as a variable
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    variables: { id: deleteEmployeeId },
    update: (cache, { data: { deleteEmployee } }) => {
      // Update the cache to reflect the deletion of the employee
      const { employees } = cache.readQuery({ query: GET_ALL_EMPLOYEES });
      cache.writeQuery({
        query: GET_ALL_EMPLOYEES,
        data: {
          employees: employees.filter((emp) => emp.id !== deleteEmployee.id),
        },
      });
    },
  });

  // Handle "Yes" button click to confirm deletion
  const handleYesClick = async () => {
    try {
      // Call the mutation to delete the employee
      await deleteEmployee();
      setStatusMessage("Employee deleted successfully!");
    } catch (error) {
      // If the mutation fails, set the error message
      setStatusMessage(error.message || "Failed to delete employee.");
    }
  };

  // Clear status message and reset the deleteEmployeeId after a short delay
  useEffect(() => {
    if (statusMessage) {
      const timeout = setTimeout(() => {
        setDeleteEmployeeId("");
        setStatusMessage(null);
      }, 2000);

      // Clean up the timeout on component unmount
      return () => clearTimeout(timeout);
    }
  }, [statusMessage, setDeleteEmployeeId]);

  // Render the modal if there is a deleteEmployeeId
  return (
    deleteEmployeeId && (
      <div className="custom-modal-overlay">
        <div className="custom-modal">
          {statusMessage ? (
            <h4
              className={
                statusMessage === "Employee deleted successfully!"
                  ? "text-success"
                  : "text-danger"
              }
            >
              {statusMessage}
            </h4>
          ) : (
            <>
              <h4>
                Are you sure you want to delete this employee with ID &nbsp;
                <span className="text-danger">{deleteEmployeeId}</span>?
              </h4>
              <div className="button-group">
                <button className="btn btn-danger" onClick={handleYesClick}>
                  Yes
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setDeleteEmployeeId("")}
                >
                  No
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  );
};

export default EmployeeDelete;
