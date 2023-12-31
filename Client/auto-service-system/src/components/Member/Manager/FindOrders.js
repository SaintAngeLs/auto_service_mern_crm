import React, { useState, useEffect } from "react";
import ManagerOrders from "../../../services/member/Manager/Manager_Orders";
import AuthService from "../../../services/member/auth_service";
import "../Admin/CSS/Cars.css";
import MaterialTable from "material-table";
import { useSnackbar } from "notistack";

function FindOrders() {
  const [orders, setOrders] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const manager = AuthService.getCurrentManager();
    ManagerOrders.getInProcessOrders(manager.userId)
      .then((response) => {
        setOrders(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dynamicManagerLookUp = {
    ACCEPTED: "ACCEPTED",
    REJECT: "REJECTED",
    COMPLETED: "COMPLETED",
  };
  const [columns, setColumns] = useState([
    { title: "OrderId", field: "_id", editable: "never" },
    { title: "Customer Name", field: "customerName", editable: "never" },
    { title: "Car Name", field: "carName", editable: "never" },
    { title: "Car Number", field: "carNumber", editable: "never" },
    { title: "Address", field: "custAddress", editable: "never" },
    { title: "Service Name", field: "serviceName", editable: "never" },
    { title: "Price", field: "servicePrice", editable: "never" },
    {
      title: "Status",
      field: "status",
      lookup: dynamicManagerLookUp,
    },
  ]);

  const handleRowUpdate = (newData, oldData, resolve) => {
    let errorList = [];
    if (errorList.length < 1) {
      ManagerOrders.updateOrder(newData._id, newData.status)
        .then((res) => {
          const dataUpdate = [...orders];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setOrders([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
          enqueueSnackbar(res, {
            variant: "success",
          });
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  return (
    <div className="cars_container">
      {orders ? (
        <MaterialTable
          title="IN PROCESS ORDERS DATA"
          columns={columns}
          data={orders}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                handleRowUpdate(newData, oldData, resolve);
              }),
          }}
          options={{
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
            exportButton: true,
          }}
        />
      ) : (
        <div>
          <br />
          <h2>&nbsp;&nbsp;NO ASSIGNED ORDERS RIGHT NOW</h2>
        </div>
      )}
    </div>
  );
}

export default FindOrders;
