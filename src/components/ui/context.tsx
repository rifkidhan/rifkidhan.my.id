'use client'

import React from 'react'

export interface State {
  displayNavbar: boolean
}

const initialState = {
  displayNavbar: false
}

type Action = { type: 'OPEN_NAVBAR' } | { type: 'CLOSE_NAVBAR' }

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

  const value = React.useMemo(
    () => ({
      ...state,
      openNavbar,
      closeNavbar,
      toggleNavbar
    }),

    [state, openNavbar, closeNavbar, toggleNavbar]
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
}) => <UIProvider>{children}</UIProvider>
