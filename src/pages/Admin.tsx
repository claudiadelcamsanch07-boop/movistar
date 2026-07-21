import { useState } from 'react';
import { Settings, Users, FileText, MessageSquare } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-800">Panel Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center p-3 rounded-lg transition ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <Settings className="mr-3" size={20} /> General
          </button>
          <button 
            onClick={() => setActiveTab('content')} 
            className={`w-full flex items-center p-3 rounded-lg transition ${activeTab === 'content' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <FileText className="mr-3" size={20} /> Contenidos
          </button>
          <button 
            onClick={() => setActiveTab('chatbot')} 
            className={`w-full flex items-center p-3 rounded-lg transition ${activeTab === 'chatbot' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <MessageSquare className="mr-3" size={20} /> Chatbot IA
          </button>
          <button 
            onClick={() => setActiveTab('users')} 
            className={`w-full flex items-center p-3 rounded-lg transition ${activeTab === 'users' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
          >
            <Users className="mr-3" size={20} /> Usuarios
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 min-h-full">
          {activeTab === 'dashboard' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Resumen del Sistema</h2>
              <div className="grid grid-cols-3 gap-6">
                <div className="p-6 bg-blue-50 text-blue-800 rounded-xl">
                  <div className="text-sm font-medium opacity-80">Visitas Hoy</div>
                  <div className="text-3xl font-bold mt-1">1,248</div>
                </div>
                <div className="p-6 bg-green-50 text-green-800 rounded-xl">
                  <div className="text-sm font-medium opacity-80">Mensajes Chatbot</div>
                  <div className="text-3xl font-bold mt-1">432</div>
                </div>
                <div className="p-6 bg-purple-50 text-purple-800 rounded-xl">
                  <div className="text-sm font-medium opacity-80">Nuevos Usuarios</div>
                  <div className="text-3xl font-bold mt-1">24</div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Gestión de Contenidos</h2>
              <p className="text-gray-600">Aquí podrás añadir y editar páginas, entradas de blog y traducciones.</p>
              {/* CMS UI Placeholder */}
            </div>
          )}

          {activeTab === 'chatbot' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Configuración del Chatbot</h2>
              <p className="text-gray-600">Entrena el modelo de IA, revisa conversaciones y ajusta respuestas predefinidas.</p>
              {/* Chatbot Config Placeholder */}
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Gestión de Usuarios</h2>
              <p className="text-gray-600">Administra accesos y roles de la plataforma.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
