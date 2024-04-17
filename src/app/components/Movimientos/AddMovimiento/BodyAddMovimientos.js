import React, { useState } from "react";
import { Box, ButtonGroup, IconButton } from "@mui/material";
import { colors } from "../../../../assets/colors";
import { sortDataListSimple } from "../../../../utils/function";
import MainPagination from "../../General/MainPagination";
import ServicioService from "../../../../services/servicio";
import { CODES } from "../../../../utils/responseCodes";
import { simpleAlerts } from "../../../../utils/alerts";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import _ from "lodash";

const columns = [
  { id: "checkbox", label: "#", width: 60, align: "center" },
  { id: "servicio_descripcion", label: "Producto", width: 400, align: "left" },
  { id: "cuenta_correo", label: "Correo", width: 200, align: "left" },
  { id: "fecha_fin", label: "Fecha Vcto", width: 200, align: "center" },
  { id: "fecha_nueva", label: "Fecha Nueva", width: 200, align: "center" },
];

const BodyAddMovimientos = (props) => {
  const url = "'" + window.location.pathname + "'";
  const { clientesPerfilCuenta, setClientesPerfilCuenta,setInfoclientesCuenta,infoclientesCuenta,movimientosPagados,
    setMovimientosPagados} = props;
 
   
 
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCuenta, setSelectedCuenta] = useState(null);


  const [newDate, setNewDate] = useState(""); // Asegúrate de inicializarlo según tus necesidades
  const [selectedDates, setSelectedDates] = useState({}); // Objeto para almacenar las fechas por perfil_id
 
  // /** inicio ordenamiento de columnas */
  const [sortConfigTable, setSortConfigTable] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSortTable = (key) => {
    let direction = "ascending";
    if (
      sortConfigTable &&
      sortConfigTable.key === key &&
      sortConfigTable.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfigTable({ key, direction });
  };

  const sortedData = sortDataListSimple(
    clientesPerfilCuenta?.perfiles,
    sortConfigTable
  );
  // /** fin ordenamiento de columnas */

  const handleCheckboxChange = (perfilId,oneMonthLater) => {
    setSelectedProfile(perfilId);
    setNewDate(selectedDates[perfilId] || ""); // Establecer la fecha según el perfil seleccionado

    // Actualizar infoclientesCuenta con perfil_id y fecha_nueva
    setInfoclientesCuenta({
      ...infoclientesCuenta,
      fecha_nueva: oneMonthLater,
      perfil_id: perfilId,
    });
  };

  const handleDateChange = (perfilId, date) => {
    setSelectedDates((prevSelectedDates) => ({
      ...prevSelectedDates,
      [perfilId]: date,
    }));

    setInfoclientesCuenta({
      ...infoclientesCuenta,
      fecha_nueva: date,
    });
  };

  const handleSomeAction = () => {
    // Aquí puedes acceder a los perfiles seleccionados
    console.log("Perfiles seleccionados:", selectedProfile);

    // También puedes acceder a la fecha nueva
    console.log("Fecha nueva:", newDate);
  };

  return (
    <>
      <Box className="page-body-main">
        <Box className="page-body-table table-responsive-md">
          <table className="table table-hover table-striped table-bordered">
            <thead
              className="sticky-top"
              style={{
                backgroundColor: colors.darkCabecera.hex,
                color: "#ffff",
                whiteSpace: "nowrap",
              }}
            >
              <tr>
                {columns.map((column) => (
                  <th
                    scope="col"
                    key={column.id}
                    style={{
                      textAlign: column.align,
                      width: column.width,
                      maxWidth: column.width,
                    }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {sortedData?.map((group, indexRow) => {
                // Calcular la fecha un mes adelante
                const oneMonthLater = group.fecha_nueva;

               
                return (
                  <tr
                    key={"row" + indexRow}
                    style={{ whiteSpace: "nowrap", color: "#ffff" }}
                  >
                    {columns.map((column, indexColumn) => {
                      const value = group[column.id];
                      return (
                        <td key={"col" + indexColumn} align={column.align}>
                          {column.id === "checkbox" ? (
                            <input
                              type="checkbox"
                              checked={selectedProfile == group.perfil_id}
                              onChange={() =>
                                handleCheckboxChange(group.perfil_id,oneMonthLater)
                                
                              }
                            />
                          ) : column.id === "fecha_nueva" ? (
                            <input
                              type="date"
                              value={
                                selectedDates[group.perfil_id] ||
                                oneMonthLater
                              }
                              onChange={(e) =>
                                handleDateChange(
                                  group.perfil_id,
                                  e.target.value
                                )
                              }
                            />
                          )  : 
                          
                          (
                            value
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      </Box>
    </>
  );
};
 

export default BodyAddMovimientos;
