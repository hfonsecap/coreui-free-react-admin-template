/**
 * Sidebar Navigation Configuration - UTEQ Smart Parking
 */

import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCarAlt, cilGrid, cilUser } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'PARQUEADEROS',
  },
  {
    component: CNavItem,
    name: 'Vehículos',
    to: '/parqueadero/vehiculos',
    icon: <CIcon icon={cilCarAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Puestos',
    to: '/parqueadero/puestos',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Propietarios',
    to: '/parqueadero/propietarios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
]

export default _nav