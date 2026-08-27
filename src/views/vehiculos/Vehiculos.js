import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormSelect,
  CBadge,
  CImage,
  CSpinner,
  CRow,
  CCol,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilPlus, cilReload, cilSearch } from '@coreui/icons'

import {
  obtenerVehiculos,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo,
} from '../../services/VehiculosService'

const estadoInicialForm = {
  placa: '',
  marca: '',
  modelo: '',
  anio: new Date().getFullYear(),
  color: '',
  tipo: 'AUTOMOVIL',
  cedula_propietario: '',
  propietario_nombre: '',
  correo_institucional: '',
  correo_microsoft: '',
  foto_url: '',
  foto_fuente_url: '',
  foto_propietario_url: '',
  autorizado: true,
}

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  // Estados para Modal
  const [modalVisible, setModalVisible] = useState(false)
  const [editando, setEditando] = useState(false)
  const [idActual, setIdActual] = useState(null)
  const [formData, setFormData] = useState(estadoInicialForm)
  const [guardando, setGuardando] = useState(false)

  // Cargar datos
  const cargarDatos = async () => {
    setLoading(true)
    try {
      const data = await obtenerVehiculos()
      setVehiculos(data || [])
    } catch (err) {
      alert('Error al cargar vehículos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarDatos()
  }, [])

  // Manejador de Inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Abrir Modal Crear
  const handleAbrirCrear = () => {
    setEditando(false)
    setIdActual(null)
    setFormData(estadoInicialForm)
    setModalVisible(true)
  }

  // Abrir Modal Editar
  const handleAbrirEditar = (item) => {
    setEditando(true)
    setIdActual(item.id)
    setFormData({
      placa: item.placa || '',
      marca: item.marca || '',
      modelo: item.modelo || '',
      anio: item.anio || new Date().getFullYear(),
      color: item.color || '',
      tipo: item.tipo || 'AUTOMOVIL',
      cedula_propietario: item.cedula_propietario || '',
      propietario_nombre: item.propietario_nombre || '',
      correo_institucional: item.correo_institucional || '',
      correo_microsoft: item.correo_microsoft || '',
      foto_url: item.foto_url || '',
      foto_fuente_url: item.foto_fuente_url || '',
      foto_propietario_url: item.foto_propietario_url || '',
      autorizado: item.autorizado ?? true,
    })
    setModalVisible(true)
  }

  // Guardar (Crear / Editar)
  const handleGuardar = async (e) => {
    e.preventDefault()
    setGuardando(true)

    try {
      if (editando) {
        await actualizarVehiculo(idActual, formData)
        alert('Vehículo actualizado exitosamente')
      } else {
        await crearVehiculo(formData)
        alert('Vehículo registrado exitosamente')
      }

      setModalVisible(false)
      cargarDatos()
    } catch (err) {
      alert('Error al guardar: ' + err.message)
    } finally {
      setGuardando(false)
    }
  }

  // Eliminar
  const handleEliminar = async (id, placa) => {
    if (window.confirm(`¿Seguro que deseas eliminar el vehículo con placa ${placa}?`)) {
      try {
        await eliminarVehiculo(id)
        alert('Vehículo eliminado')
        cargarDatos()
      } catch (err) {
        alert('Error al eliminar: ' + err.message)
      }
    }
  }

  // Filtro
  const vehiculosFiltrados = vehiculos.filter((v) => {
    const q = busqueda.toLowerCase()
    return (
      v.placa?.toLowerCase().includes(q) ||
      v.propietario_nombre?.toLowerCase().includes(q) ||
      v.cedula_propietario?.includes(q) ||
      v.marca?.toLowerCase().includes(q) ||
      v.modelo?.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <CCard className="mb-4 shadow-sm">
        <CCardHeader className="d-flex justify-content-between align-items-center bg-primary text-white">
          <h5 className="mb-0">Gestión de Vehículos - UTEQ Smart Parking</h5>
          <div>
            <CButton color="light" variant="outline" className="me-2" onClick={cargarDatos}>
              <CIcon icon={cilReload} className="me-1" /> Actualizar
            </CButton>
            <CButton color="success" className="text-white" onClick={handleAbrirCrear}>
              <CIcon icon={cilPlus} className="me-1" /> Nuevo Vehículo
            </CButton>
          </div>
        </CCardHeader>

        <CCardBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <CInputGroup>
                <CInputGroupText>
                  <CIcon icon={cilSearch} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Buscar por placa, propietario, cédula, marca..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </CInputGroup>
            </CCol>
          </CRow>

          {loading ? (
            <div className="text-center my-5">
              <CSpinner color="primary" />
              <p className="mt-2 text-muted">Cargando vehículos...</p>
            </div>
          ) : (
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell className="text-center">Propietario</CTableHeaderCell>
                  <CTableHeaderCell>Nombre / Correo</CTableHeaderCell>
                  <CTableHeaderCell>Cédula</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Vehículo</CTableHeaderCell>
                  <CTableHeaderCell>Placa</CTableHeaderCell>
                  <CTableHeaderCell>Detalles</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Estado</CTableHeaderCell>
                  <CTableHeaderCell className="text-center">Acciones</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vehiculosFiltrados.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan="8" className="text-center py-4 text-muted">
                      No se encontraron registros.
                    </CTableDataCell>
                  </CTableRow>
                ) : (
                  vehiculosFiltrados.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell className="text-center">
                        <CImage
                          src={item.foto_propietario_url || 'https://via.placeholder.com/45'}
                          width={45}
                          height={45}
                          className="rounded-circle border"
                          alt="Propietario"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/45?text=User' }}
                        />
                      </CTableDataCell>

                      <CTableDataCell>
                        <div className="fw-bold">{item.propietario_nombre}</div>
                        <div className="small text-muted">{item.correo_institucional}</div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <code>{item.cedula_enmascarada || item.cedula_propietario}</code>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <CImage
                          src={item.foto_url || 'https://via.placeholder.com/60x40'}
                          width={60}
                          height={40}
                          className="rounded border"
                          style={{ objectFit: 'cover' }}
                          alt="Vehiculo"
                          onError={(e) => { e.target.src = 'https://via.placeholder.com/60x40?text=Auto' }}
                        />
                      </CTableDataCell>

                      <CTableDataCell>
                        <CBadge color="dark" className="fs-6 px-2 py-1">
                          {item.placa}
                        </CBadge>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div><strong>{item.marca}</strong> {item.modelo} ({item.anio})</div>
                        <div className="small text-muted">Color: {item.color} | Tipo: {item.tipo}</div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <CBadge color={item.autorizado ? 'success' : 'danger'}>
                          {item.autorizado ? 'AUTORIZADO' : 'INACTIVO'}
                        </CBadge>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <CButton
                          color="info"
                          size="sm"
                          className="me-1 text-white"
                          title="Editar"
                          onClick={() => handleAbrirEditar(item)}
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          className="text-white"
                          title="Eliminar"
                          onClick={() => handleEliminar(item.id, item.placa)}
                        >
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {/* MODAL CREAR / EDITAR */}
      <CModal
        alignment="center"
        size="lg"
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        backdrop="static"
      >
        <CForm onSubmit={handleGuardar}>
          <CModalHeader className="bg-primary text-white">
            <CModalTitle>{editando ? 'Editar Vehículo' : 'Registrar Nuevo Vehículo'}</CModalTitle>
          </CModalHeader>

          <CModalBody>
            <h6 className="text-primary mb-3">Datos del Propietario</h6>
            <CRow className="g-3 mb-3">
              <CCol md={6}>
                <CFormInput
                  label="Nombre Completo *"
                  name="propietario_nombre"
                  value={formData.propietario_nombre}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Cédula de Identidad *"
                  name="cedula_propietario"
                  maxLength={10}
                  value={formData.cedula_propietario}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Correo Institucional *"
                  type="email"
                  name="correo_institucional"
                  value={formData.correo_institucional}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="Correo Microsoft (Opcional)"
                  type="email"
                  name="correo_microsoft"
                  value={formData.correo_microsoft}
                  onChange={handleChange}
                />
              </CCol>
              <CCol md={12}>
                <CFormInput
                  label="URL Foto del Propietario *"
                  name="foto_propietario_url"
                  placeholder="https://sga.uteq.edu.ec/media/fotos/..."
                  value={formData.foto_propietario_url}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>

            <hr />
            <h6 className="text-primary mb-3">Datos del Vehículo</h6>
            <CRow className="g-3">
              <CCol md={4}>
                <CFormInput
                  label="Placa (Ej: RAA-1001) *"
                  name="placa"
                  value={formData.placa}
                  onChange={handleChange}
                  placeholder="RAA-1000"
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Marca *"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Modelo *"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Año *"
                  type="number"
                  name="anio"
                  min="1990"
                  max="2035"
                  value={formData.anio}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  label="Color *"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={4}>
                <CFormSelect
                  label="Tipo de Vehículo *"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="AUTOMOVIL">AUTOMOVIL</option>
                  <option value="CAMIONETA">CAMIONETA</option>
                  <option value="SUV">SUV</option>
                  <option value="MOTOCICLETA">MOTOCICLETA</option>
                </CFormSelect>
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="URL Foto del Vehículo *"
                  name="foto_url"
                  placeholder="https://commons.wikimedia.org/..."
                  value={formData.foto_url}
                  onChange={handleChange}
                  required
                />
              </CCol>
              <CCol md={6}>
                <CFormInput
                  label="URL Fuente Foto (Atribución) *"
                  name="foto_fuente_url"
                  placeholder="https://commons.wikimedia.org/..."
                  value={formData.foto_fuente_url}
                  onChange={handleChange}
                  required
                />
              </CCol>
            </CRow>
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Cancelar
            </CButton>
            <CButton color="primary" type="submit" disabled={guardando}>
              {guardando ? 'Guardando...' : editando ? 'Actualizar' : 'Guardar'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  )
}

export default Vehiculos