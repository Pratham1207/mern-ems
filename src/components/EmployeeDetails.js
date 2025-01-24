import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { GET_EMPLOYEE } from "../mutation/MutationEmployee";

const EmployeeDetails = () => {
  // Extract the employee ID from the URL parameters using useParams
  const { employeeid } = useParams();

  // Use the useQuery hook to fetch employee details based on the employee ID
  const { error, loading, data } = useQuery(GET_EMPLOYEE, {
    variables: { id: employeeid },
  });

  // Display an error message if the query fails
  if (error)
    return (
      <div className="alert alert-danger">Error fetching employee details!</div>
    );

  // Display a loading spinner while the data is being fetched
  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="container mt-5">
      {/* Check if employee data is available */}
      {!loading && !error && data.employee ? (
        <div
          className="employee-table-container"
          style={{ paddingBottom: "44px" }}
        >
          <h3 className="text-center title">Employee Details</h3>
          <div className="card-body">
            {/* Display employee details in a table format */}
            <table className="styled-table table-responsive">
              <tbody>
                {Object.entries(data.employee)
                  .filter(([key]) => key !== "__typename")
                  .map(([key, value]) => (
                    <tr key={key}>
                      <th className="text-capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </th>
                      <td>
                        {key === "dateOfJoining" ? value.split("T")[0] : value}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // If no employee is found, show a warning message
        <div className="alert alert-warning">
          No employee found with ID <strong>{employeeid}</strong>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;
