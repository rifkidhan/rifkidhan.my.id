'use client'

import { Button, useUI } from '#/components/ui'

const MenuButton = () => {
  const { openNavbar } = useUI()

  return (
    <Button
      type="button"
      variant="circle"
      title="Open Menu"
      aria-label="Open menu button"
      onClick={() => openNavbar()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="openMenuButton w-6 stroke-2"
      >
        <line x1="4" y1="8" x2="20" y2="8" pathLength={1} />
        <line x1="4" y1="16" x2="20" y2="16" pathLength={1} />
      </svg>
    </Button>
  )
}

export default MenuButton
