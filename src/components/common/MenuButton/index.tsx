'use client'

import { Button, useUI } from '@components/ui'

const MenuButton = ({ className }: { className?: string }) => {
  const { toggleNavbar, openNavbar } = useUI()
  return (
    <Button
      type="button"
      variant="circle"
      title="menu button"
      onClick={() => openNavbar()}
      className={className}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 stroke-2"
      >
        <g className="closeMenuButton">
          <line x1="18" y1="6" x2="6" y2="18" pathLength={1} />
          <line x1="6" y1="6" x2="18" y2="18" pathLength={1} />
        </g>
        <g className="openMenuButton">
          <line x1="4" y1="8" x2="20" y2="8" pathLength={1} />
          <line x1="4" y1="16" x2="20" y2="16" pathLength={1} />
        </g>
      </svg>
    </Button>
  )
}

export default MenuButton
