import React from 'react'
import { CBadge, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const ListaPuestos = () => {
  const puestos = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    codigo: `P-${101 + i}`,
    estado: i % 3 === 0 ? 'Ocupado' : 'Disponible',
    tipo: i % 4 === 0 ? 'Preferencial' : 'General',
  }))

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Gestión de Puestos de Estacionamiento</strong>
      </CCardHeader>
      <CCardBody>
        <CRow>
          {puestos.map((puesto) => (
            <CCol key={puesto.id} xs={12} sm={6} md={4} lg={3} className="mb-3">
              <CCard className={`border-top-3 ${puesto.estado === 'Ocupado' ? 'border-top-danger' : 'border-top-success'}`}>
                <CCardBody className="text-center">
                  <h4 className="mb-1">{puesto.codigo}</h4>
                  <div className="small text-body-secondary mb-2">{puesto.tipo}</div>
                  <CBadge color={puesto.estado === 'Ocupado' ? 'danger' : 'success'}>
                    {puesto.estado}
                  </CBadge>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default ListaPuestos