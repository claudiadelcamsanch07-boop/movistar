import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          ¿Tienes un proyecto en mente? Hablemos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input type="text" id="name" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Tu nombre" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" id="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="tu@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
              <textarea id="message" rows={5} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500" placeholder="¿En qué podemos ayudarte?"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition">
              Enviar Mensaje
            </button>
          </form>
        </div>

        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Información de contacto</h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Ubicación</h3>
                <p className="text-gray-600">Av. Principal 123, Ciudad de México, CDMX</p>
              </div>
            </div>
            <div className="flex items-start">
              <Phone className="text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Teléfono</h3>
                <p className="text-gray-600">+52 (55) 1234-5678</p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="text-blue-600 mt-1 mr-4 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-gray-600">contacto@movistar.com</p>
              </div>
            </div>
          </div>
          
          {/* Placeholder for map */}
          <div className="mt-8 bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-500">
            [Mapa de Google Maps]
          </div>
        </div>
      </div>
    </div>
  );
}
