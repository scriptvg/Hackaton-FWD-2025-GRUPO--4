import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  ChevronDownIcon
} from "@radix-ui/react-icons";
import { BiDonateHeart } from 'react-icons/bi';
import { Ticket, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@assets/img/LOGO.webp";
import { useAuth } from "@context/AuthContext";
import Avatar from "../auth/Avatar";
import TopBarRedes from "@components/atoms/TopBarRedes";

const links = [
  {
    name: "Quienes Somos",
    href: "/quienes-somos",
    dropdown: true,
    sublinks: [
      { name: "Información Institucional", href: "/quienes-somos/informacion-institucional" },
      { name: "Transparencia Institucional", href: "/quienes-somos/transparencia-institucional" },
    ],
  },
  {
    name: "Exhibiciones y Servicios",
    href: "/exhibiciones-y-servicios",
    dropdown: true,
    sublinks: [
      { name: "Exhibiciones", href: "/exhibiciones-y-servicios/exhibiciones" },
      { name: "Servicios Educativos", href: "/exhibiciones-y-servicios/servicios-educativos" }
    ],
  },
  {
    name: "Investigación y Conservación",
    href: "/investigacion-y-conservacion",
    dropdown: true,
    sublinks: [
      { name: "Acuicultura y Biotecnología Marina", href: "/investigacion-y-conservacion/acuicultura-y-biotecnologia-marina" },
      { name: "Centro de Rescate y Rehabilitación", href: "/investigacion-y-conservacion/centro-de-rescate-y-rehabilitacion" },
    ],
  }
];

const ticketLink = { name: "Ticketera", href: "/purchase-form/ticketera" };
const DonarLink = { name: "Donar", href: "/apoyo/donaciones" };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const dropdownRef = useRef();
  const { isAuthenticated, user, logout } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(null);
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mobileMenuVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    open: { height: "auto", opacity: 1, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.1 } }
  };

  const mobileItemVariants = { closed: { opacity: 0, x: -20 }, open: { opacity: 1, x: 0 } };
  const desktopDropdownVariants = { hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0 } };
  const dropdownItemVariants = { hidden: { opacity: 0, y: -5 }, visible: { opacity: 1, y: 0 } };

  return (
    <nav className={`w-full fixed top-0 z-50 bg-background shadow-md transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
      <TopBarRedes />

      {/* Main navbar */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo + texto */}
        <Link to="/" className="flex items-center gap-2 group" aria-label="Inicio">
          <motion.img
            src={logo}
            alt="Logo Parque Marino del Pacífico"
            className="h-12 w-auto group-hover:scale-105 transition-transform duration-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
          <div className="leading-tight flex flex-col">
            <span className="text-base font-bold text-foreground uppercase tracking-wider group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              PARQUE MARINO
            </span>
            <span className="text-xs text-muted-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
              DEL PACÍFICO
            </span>
          </div>
        </Link>

        {/* Links desktop */}
        <ul className="hidden md:flex gap-8 items-center flex-1 justify-center" ref={dropdownRef}>
          {links.map((link, index) => (
            <motion.li
              key={link.name}
              className="relative group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.07, duration: 0.4 }}
            >
              {link.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(index)}
                    className="flex items-center gap-1 text-foreground font-medium transition-all relative py-2 px-3"
                  >
                    {link.name}
                    <motion.span animate={{ rotate: dropdownOpen === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDownIcon className="w-4 h-4" />
                    </motion.span>
                    <span className="absolute left-3 right-3 bottom-0 h-0.5 bg-teal-500 dark:bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 rounded-full" />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen === index && (
                      <motion.div
                        variants={desktopDropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="absolute left-0 mt-2 w-56 bg-popover shadow-2xl rounded-lg z-50 border border-border py-2"
                      >
                        {link.sublinks.map((sublink) => (
                          <motion.div key={sublink.href} variants={dropdownItemVariants}>
                            <Link
                              to={sublink.href}
                              className="block px-5 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
                              onClick={() => setDropdownOpen(null)}
                            >
                              {sublink.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={link.href}
                  className="text-foreground font-medium transition-all relative py-2 px-3"
                >
                  {link.name}
                  <span className="absolute left-3 right-3 bottom-0 h-0.5 bg-teal-500 dark:bg-teal-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300 rounded-full" />
                </Link>
              )}
            </motion.li>
          ))}
        </ul>

        {/* Botones Donar / Ticketera / User */}
        <div className="hidden md:flex items-center gap-4 self-center">
          <Link
            to={DonarLink.href}
            className="bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
          >
            <BiDonateHeart className="w-4 h-4" />
            {DonarLink.name}
          </Link>
          <Link
            to={ticketLink.href}
            className="bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold text-sm px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Ticket className="w-4 h-4" />
            {ticketLink.name}
          </Link>
          {isAuthenticated && user && (
            <div className="relative">
              <button onClick={() => setShowUserDropdown((prev) => !prev)} className="flex items-center gap-2">
                <Avatar user={user} size={40} className="w-10 h-10" />
              </button>
              <AnimatePresence>
                {showUserDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-popover shadow-xl rounded-lg z-50 border border-border py-2"
                  >
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link to="/perfil" className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground">
                      <User className="w-4 h-4 mr-2" />
                      Mi Perfil
                    </Link>
                    <button
                      onClick={() => logout()}
                      className="flex w-full items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Menú móvil */}
        <motion.button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden p-2 rounded-lg text-foreground"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <Cross1Icon className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <HamburgerMenuIcon className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="md:hidden bg-background px-4 py-4 space-y-3 shadow-xl border-t border-border"
          >
            {links.map((link) => (
              <motion.div key={link.name} variants={mobileItemVariants}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(links.indexOf(link))}
                      className="flex items-center justify-between w-full font-medium text-foreground py-3 px-2 rounded-lg hover:bg-accent"
                    >
                      {link.name}
                      <motion.span animate={{ rotate: dropdownOpen === links.indexOf(link) ? 180 : 0 }}>
                        <ChevronDownIcon className="w-4 h-4" />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === links.indexOf(link) && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="pl-4">
                          {link.sublinks.map((sublink) => (
                            <Link
                              key={sublink.href}
                              to={sublink.href}
                              className="block py-2 px-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                              onClick={() => setIsOpen(false)}
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className="block py-3 px-2 text-foreground font-medium hover:text-teal-700 dark:hover:text-teal-400 hover:bg-accent rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                )}
              </motion.div>
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <Link to={DonarLink.href} className="flex items-center justify-center gap-2 bg-teal-500 dark:bg-teal-600 hover:bg-teal-600 dark:hover:bg-teal-700 text-white font-semibold py-3 rounded-lg" onClick={() => setIsOpen(false)}>
                <BiDonateHeart className="w-5 h-5" />
                {DonarLink.name}
              </Link>
              <Link to={ticketLink.href} className="flex items-center justify-center gap-2 bg-orange-500 dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-700 text-white font-semibold py-3 rounded-lg" onClick={() => setIsOpen(false)}>
                <Ticket className="w-5 h-5" />
                {ticketLink.name}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}