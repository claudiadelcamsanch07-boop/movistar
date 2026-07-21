import { Monitor, Code, Cloud, Database } from 'lucide-react';

export default function Services() {
  const services = [
    {
      title: 'Desarrollo Web',
      description: 'Creamos aplicaciones web modernas, rápidas y escalables utilizando las últimas tecnologías.',
      icon: <Monitor size={40} />
    },
    {
      title: 'Soluciones Cloud',
      description: 'Migramos y gestionamos tu infraestructura en la nube para máxima disponibilidad.',
      icon: <Cloud size={40} />
    },
    {
      title: 'Consultoría IT',
      description: 'Te asesoramos en la toma de decisiones tecnológicas estratégicas para tu negocio.',
      icon: <Code size={40} />
    },
    {
      title: 'Bases de Datos',
      description: 'Diseño, optimización y mantenimiento de bases de datos seguras y de alto rendimiento.',
      icon: <Database size={40} />
    }
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Ofrecemos soluciones integrales adaptadas a las necesidades específicas de tu empresa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="text-blue-600 mb-6">{service.icon}</div>
            <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
            <p className="text-gray-600 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
