import React from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { useVehiculos } from '../../hooks/useVehiculos'

const ListaPropietarios = () => {
  const { vehiculos, cargando } = useVehiculos()

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Directorio de Propietarios UTEQ</strong>
      </CCardHeader>
      <CCardBody>
        <CTable align="middle" bordered hover responsive striped>
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Perfil</CTableHeaderCell>
              <CTableHeaderCell>Nombre del Propietario</CTableHeaderCell>
              <CTableHeaderCell>Cédula</CTableHeaderCell>
              <CTableHeaderCell>Correo Institucional</CTableHeaderCell>
              <CTableHeaderCell>Vehículo Asignado</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {cargando ? (
              <CTableRow>
                <CTableDataCell colSpan={5} className="text-center py-4">
                  Cargando propietarios...
                </CTableDataCell>
              </CTableRow>
            ) : (
              vehiculos.map((v) => (
                <CTableRow key={v.id}>
                  <CTableDataCell className="text-center">
                    <img
                      src={v.foto_propietario_url || 'https://via.placeholder.com/50'}
                      alt={v.propietario_nombre}
                      width="50"
                      height="50"
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  </CTableDataCell>
                  <CTableDataCell><strong>{v.propietario_nombre}</strong></CTableDataCell>
                  <CTableDataCell>{v.cedula_enmascarada}</CTableDataCell>
                  <CTableDataCell>{v.correo_institucional}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color="dark">{v.placa}</CBadge> - {v.marca} {v.modelo}
                  </CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default ListaPropietarios