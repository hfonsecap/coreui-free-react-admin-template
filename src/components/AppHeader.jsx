import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CBadge,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CNavLink,
  CNavItem,
  CSearchButton,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import  Logo  from 'src/assets/brand/Logo'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [searchVisible, setSearchVisible] = useState(false)

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  useEffect(() => {
    const handleScroll = () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    }

    document.addEventListener('scroll', handleScroll)
    return () => document.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        {/* LOGO SMART PARKING UTEQ */}
        <div className="d-flex align-items-center ms-2 me-3">
          <Logo height={30} width="auto" />
        </div>

        <CSearchButton
          onTrigger={() => setSearchVisible(true)}
          aria-label="Open search dialog"
          aria-controls="app-header-search-modal"
        />
        <CModal
          id="app-header-search-modal"
          visible={searchVisible}
          onClose={() => setSearchVisible(false)}
          aria-labelledby="app-header-search-modal-title"
        >
          <CModalHeader>
            <CModalTitle id="app-header-search-modal-title" className="w-100">
              <CFormInput type="search" placeholder="Search" aria-label="Search" />
            </CModalTitle>
          </CModalHeader>
          <CModalBody>
            <p className="text-body-secondary small mb-2">Recent searches</p>
            <CListGroup flush>
              <CListGroupItem
                as="button"
                type="button"
                className="d-flex justify-content-between align-items-center"
              >
                CoreUI components overview
                <CBadge color="secondary" shape="rounded-pill">
                  Open
                </CBadge>
              </CListGroupItem>
              <CListGroupItem
                as="button"
                type="button"
                className="d-flex justify-content-between align-items-center"
              >
                Modal dialog examples
                <CBadge color="secondary" shape="rounded-pill">
                  Open
                </CBadge>
              </CListGroupItem>
              <CListGroupItem
                as="button"
                type="button"
                className="d-flex justify-content-between align-items-center"
              >
                Sidebar navigation customization
                <CBadge color="secondary" shape="rounded-pill">
                  Open
                </CBadge>
              </CListGroupItem>
            </CListGroup>
          </CModalBody>
        </CModal>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader