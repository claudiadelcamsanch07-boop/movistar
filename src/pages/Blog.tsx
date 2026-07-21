import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Mock data for now. In a real app, fetch from API.
    setPosts([
      { id: 1, title: 'El futuro de la Inteligencia Artificial en empresas', excerpt: 'Descubre cómo la IA está transformando los procesos de negocio...', date: '2023-10-15' },
      { id: 2, title: 'Migración a la nube: Guía paso a paso', excerpt: 'Todo lo que necesitas saber antes de mover tu infraestructura al cloud...', date: '2023-09-28' },
      { id: 3, title: 'Mejores prácticas en ciberseguridad para 2024', excerpt: 'Protege tus activos digitales con estas estrategias fundamentales...', date: '2023-09-10' }
    ]);
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog y Noticias</h1>
        <p className="text-xl text-gray-600">Novedades, recursos y artículos de interés.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map(post => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-lg transition">
            <div className="h-48 bg-gray-200 w-full object-cover"></div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-sm text-blue-600 font-semibold mb-2">{post.date}</span>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h2>
              <p className="text-gray-600 mb-4 flex-1">{post.excerpt}</p>
              <button className="text-blue-600 font-semibold hover:text-blue-800 text-left mt-auto">Leer más &rarr;</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
