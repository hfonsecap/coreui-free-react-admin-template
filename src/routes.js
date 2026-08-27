import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ListaVehiculos = React.lazy(() => import('./views/parqueadero/ListaVehiculos'))
const ListaPuestos = React.lazy(() => import('./views/parqueadero/ListaPuestos'))
const ListaPropietarios = React.lazy(() => import('./views/parqueadero/ListaPropietarios'))

export const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/parqueadero/vehiculos', name: 'Vehículos', element: ListaVehiculos },
  { path: '/parqueadero/puestos', name: 'Puestos', element: ListaPuestos },
  { path: '/parqueadero/propietarios', name: 'Propietarios', element: ListaPropietarios },
]

export default routes