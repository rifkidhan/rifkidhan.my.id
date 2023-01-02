'use client'

import React from 'react'
import { ThemeProvider } from '@components/themes'

export interface State {
  displayNavbar: boolean
  displayModal: boolean
  modalView: string
}

const initialState = {
  displayNavbar: false,
  displayModal: false,
  modalView: 'FILES_MODAL'
}

type Action =
  | { type: 'OPEN_NAVBAR' }
  | { type: 'CLOSE_NAVBAR' }
  | { type: 'OPEN_MODAL' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_MODAL_VIEWS'; view: MODAL_VIEWS }

type MODAL_VIEWS = 'FILES_MODAL'

export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

const uiReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CLOSE_NAVBAR':
      return {
        ...state,
        displayNavbar: false
      }
    case 'OPEN_NAVBAR':
      return {
        ...state,
        displayNavbar: true
      }
    case 'OPEN_MODAL':
      return {
        ...state,
        displayModal: true
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        displayModal: false
      }
    case 'SET_MODAL_VIEWS':
      return {
        ...state,
        modalView: action.view
      }
  }
}

export const UIProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openNavbar = React.useCallback(
    () => dispatch({ type: 'OPEN_NAVBAR' }),
    [dispatch]
  )

  const closeNavbar = React.useCallback(
    () => dispatch({ type: 'CLOSE_NAVBAR' }),
    [dispatch]
  )

  const toggleNavbar = React.useCallback(
    () =>
      state.displayNavbar
        ? dispatch({ type: 'CLOSE_NAVBAR' })
        : dispatch({ type: 'OPEN_NAVBAR' }),
    [dispatch, state.displayNavbar]
  )

  const openModal = React.useCallback(
    () => dispatch({ type: 'OPEN_MODAL' }),
    [dispatch]
  )

  const closeModal = React.useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  )

  const setModalView = React.useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEWS', view }),
    [dispatch]
  )

  const value = React.useMemo(
    () => ({
      ...state,
      openNavbar,
      closeNavbar,
      toggleNavbar,
      openModal,
      closeModal,
      setModalView
    }),

    [
      state,
      openNavbar,
      closeNavbar,
      toggleNavbar,
      openModal,
      closeModal,
      setModalView
    ]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = React.useContext(UIContext)
  if (context === undefined) {
    throw new Error('useUI must be used within a UI provider')
  }
  return context
}

export const ManagedUI: React.FC<{ children: React.ReactNode }> = ({
  children
}) => (
  <UIProvider>
    <ThemeProvider attribute="class">{children}</ThemeProvider>
  </UIProvider>
)
