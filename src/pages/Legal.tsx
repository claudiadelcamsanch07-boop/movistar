export default function Legal() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Aviso Legal y Privacidad</h1>
      
      <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Política de Privacidad</h2>
          <p>
            En Movistar, respetamos tu privacidad y nos comprometemos a proteger los datos personales que nos proporcionas.
            Esta política explica cómo recopilamos, usamos y protegemos tu información.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Uso de Cookies</h2>
          <p>
            Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarte publicidad relacionada con tus preferencias mediante el análisis de tus hábitos de navegación.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Términos de Servicio</h2>
          <p>
            Al acceder y utilizar esta aplicación, aceptas estar sujeto a estos términos y condiciones. Nos reservamos el derecho de modificar estos términos en cualquier momento.
          </p>
        </section>
      </div>
    </div>
  );
}
