import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Chatbot from '../components/Chatbot';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                Movistar
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-blue-600 transition">Inicio</Link>
              <Link to="/services" className="text-gray-600 hover:text-blue-600 transition">Servicios</Link>
              <Link to="/blog" className="text-gray-600 hover:text-blue-600 transition">Blog</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition">Contacto</Link>
              <Link to="/admin" className="text-gray-600 hover:text-blue-600 transition">Panel Admin</Link>
              <Link to="/assistant" className="text-gray-600 hover:text-blue-600 transition">Asistente IA</Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link onClick={() => setIsMenuOpen(false)} to="/" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Inicio</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Servicios</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/blog" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Blog</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/contact" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Contacto</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/admin" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Panel Admin</Link>
              <Link onClick={() => setIsMenuOpen(false)} to="/assistant" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Asistente IA</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 w-full relative">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <span className="text-2xl font-bold text-white mb-4 block">Movistar</span>
              <p className="text-gray-400 text-sm">
                Soluciones integrales para tu negocio. Escalables, rápidas y eficientes.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-100">Enlaces</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition">Inicio</Link></li>
                <li><Link to="/services" className="hover:text-white transition">Servicios</Link></li>
                <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-100">Soporte</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/contact" className="hover:text-white transition">Contacto</Link></li>
                <li><Link to="/legal" className="hover:text-white transition">Aviso Legal</Link></li>
                <li><Link to="/legal" className="hover:text-white transition">Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-100">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white transition">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition">GitHub</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Movistar. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {isChatOpen && (
          <div className="mb-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden w-80 h-96 flex flex-col transition-all duration-300 transform origin-bottom-right">
            <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Asistente Virtual</h3>
              <button onClick={() => setIsChatOpen(false)} className="text-blue-100 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 p-4 bg-gray-50 flex flex-col">
              <Chatbot />
            </div>
          </div>
        )}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors focus:outline-none ${
            isChatOpen ? 'bg-gray-200 text-gray-700' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          aria-label="Abrir chat"
        >
          {isChatOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      </div>
    </div>
  );
}
