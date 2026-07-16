import React from 'react'
import { NavLink } from 'react-router-dom'
import { FileText, Home as HomeIcon, Files } from 'lucide-react'

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    [
      'relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
      isActive
        ? 'text-white'
        : 'text-gray-400 hover:text-gray-200',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-[#30363D] bg-[#0D1117]/80 backdrop-blur-md supports-[backdrop-filter]:bg-[#0D1117]/60">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-[#30363D] group-hover:border-emerald-500/40 transition-colors duration-200">
              <FileText size={16} className="text-white" strokeWidth={2} />
            </div>
            <span className="text-[15px] font-semibold text-white tracking-tight">
              PasteVault
            </span>
          </NavLink>

          {/* Right: Nav links */}
          <nav className="flex items-center gap-1 p-1 rounded-xl bg-[#161B22] border border-[#30363D]">
            <NavLink to="/" end className={navLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-white/10 border border-white/10" />
                  )}
                  <HomeIcon size={15} strokeWidth={2} className="relative" />
                  <span className="relative">Home</span>
                </>
              )}
            </NavLink>

            <NavLink to="/pastes" className={navLinkClass}>
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute inset-0 rounded-lg bg-white/10 border border-white/10" />
                  )}
                  <Files size={15} strokeWidth={2} className="relative" />
                  <span className="relative">My Pastes</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar
