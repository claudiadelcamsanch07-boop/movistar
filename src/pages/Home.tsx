import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Impulsa tu negocio al siguiente nivel
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Plataforma integral con servicios modernos, inteligencia artificial y gestión de contenidos diseñada para escalar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services" className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition flex items-center justify-center">
              Nuestros Servicios
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/contact" className="bg-transparent border border-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transition">
              Contactar Ventas
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
            <p className="mt-4 text-gray-600">Construimos herramientas robustas pensadas en tus usuarios.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Rápido y Escalable</h3>
              <p className="text-gray-600">Arquitectura moderna preparada para manejar alto tráfico sin perder rendimiento.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Seguro por Diseño</h3>
              <p className="text-gray-600">Tus datos y los de tus clientes están protegidos con los más altos estándares.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <Smartphone size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multiplataforma</h3>
              <p className="text-gray-600">Experiencias impecables en cualquier dispositivo, móvil o escritorio.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
