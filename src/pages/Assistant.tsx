import { useState, useEffect } from 'react';
import { Mail, Users, Sparkles, Send } from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken, logout } from '../firebase';
import { User } from 'firebase/auth';

interface EmailMessage {
  id: string;
  snippet: string;
  subject?: string;
  from?: string;
  date?: string;
}

interface Contact {
  resourceName: string;
  names?: { displayName: string }[];
  emailAddresses?: { value: string }[];
}

export default function Assistant() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [emails, setEmails] = useState<EmailMessage[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [askingAi, setAskingAi] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setUser(user);
        setNeedsAuth(false);
        fetchData(token);
      },
      () => setNeedsAuth(true)
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
        fetchData(result.accessToken);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchData = async (token: string) => {
    setLoadingData(true);
    try {
      // Fetch Gmail
      const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (gmailRes.ok) {
        const gmailData = await gmailRes.json();
        const messages = gmailData.messages || [];
        const fullMessages = await Promise.all(
          messages.map(async (msg: {id: string}) => {
            const detailRes = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            const detailData = await detailRes.json();
            const headers = detailData.payload?.headers || [];
            return {
              id: detailData.id,
              snippet: detailData.snippet,
              subject: headers.find((h: any) => h.name === 'Subject')?.value || 'Sin Asunto',
              from: headers.find((h: any) => h.name === 'From')?.value || 'Desconocido',
              date: headers.find((h: any) => h.name === 'Date')?.value || ''
            };
          })
        );
        setEmails(fullMessages);
      }

      // Fetch Contacts
      const contactsRes = await fetch('https://people.googleapis.com/v1/people/me/connections?personFields=names,emailAddresses&pageSize=5', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (contactsRes.ok) {
        const contactsData = await contactsRes.json();
        setContacts(contactsData.connections || []);
      }
    } catch (err) {
      console.error("Error fetching workspace data", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleAskAi = async () => {
    if (!aiInput.trim()) return;
    setAskingAi(true);
    try {
      const contextLines = [];
      if (emails.length > 0) {
        contextLines.push("Últimos correos:");
        emails.forEach(e => contextLines.push(`- De: ${e.from}, Asunto: ${e.subject}, Extracto: ${e.snippet}`));
      }
      if (contacts.length > 0) {
        contextLines.push("Contactos recientes:");
        contacts.forEach(c => contextLines.push(`- ${c.names?.[0]?.displayName || 'Sin nombre'} (${c.emailAddresses?.[0]?.value || 'Sin email'})`));
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: aiInput,
          context: contextLines.join('\n')
        })
      });
      const data = await response.json();
      setAiResponse(data.reply);
    } catch (error) {
      setAiResponse("Hubo un error al comunicarse con la IA.");
    } finally {
      setAskingAi(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="py-20 px-4 max-w-3xl mx-auto text-center flex flex-col items-center min-h-[calc(100vh-16rem)] justify-center">
        <Sparkles className="text-blue-600 mb-6" size={48} />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Asistente de Workspace</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl">
          Conecta tu cuenta para que la Inteligencia Artificial pueda ayudarte a gestionar tus correos de Gmail y contactos de forma eficiente.
        </p>
        
        <button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="gsi-material-button w-64 hover:shadow-md transition bg-white border border-gray-300 rounded-sm relative inline-flex items-center px-2 py-2 overflow-hidden"
          style={{ height: '40px' }}
        >
          <div className="gsi-material-button-icon bg-white flex items-center justify-center w-10 h-10 absolute left-0 top-0">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-5 h-5 block">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </svg>
          </div>
          <span className="gsi-material-button-contents flex-1 text-center font-medium text-gray-600 font-sans text-sm tracking-wide ml-10">Sign in with Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Sparkles className="text-blue-600 mr-3" />
            Asistente IA de Workspace
          </h1>
          <p className="text-gray-600 mt-2">Conectado como {user?.email}</p>
        </div>
        <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-900 border border-gray-300 rounded-md px-4 py-2">
          Cerrar Sesión
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* IA Chat Column */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
          <div className="p-6 border-b border-gray-100 bg-gray-50 flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">Interactúa con la IA</h2>
            <p className="text-sm text-gray-500 mt-1">Pregúntale sobre tus correos, pídeles que te resuma información o busque contactos.</p>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto bg-white">
            {aiResponse ? (
              <div className="prose prose-blue max-w-none">
                <div className="bg-blue-50 border border-blue-100 text-blue-900 p-5 rounded-xl whitespace-pre-wrap">
                  {aiResponse}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>Escribe tu consulta abajo para empezar.</p>
              </div>
            )}
            {askingAi && (
              <div className="mt-4 flex space-x-2 justify-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex-shrink-0">
            <div className="flex space-x-3">
              <input 
                type="text" 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                placeholder="Ej. Resume mis últimos correos..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                onClick={handleAskAi}
                disabled={askingAi || !aiInput.trim()}
                className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center"
              >
                <Send size={20} className="mr-2" />
                Preguntar
              </button>
            </div>
          </div>
        </div>

        {/* Data Column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Mail className="mr-2 text-gray-500" size={20} />
              Últimos Correos
            </h2>
            {loadingData ? (
              <p className="text-sm text-gray-500">Cargando...</p>
            ) : emails.length > 0 ? (
              <div className="space-y-4">
                {emails.map(email => (
                  <div key={email.id} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <p className="font-medium text-sm text-gray-900 truncate" title={email.subject}>{email.subject}</p>
                    <p className="text-xs text-gray-500 truncate" title={email.from}>{email.from}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No se encontraron correos.</p>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="mr-2 text-gray-500" size={20} />
              Contactos Recientes
            </h2>
            {loadingData ? (
              <p className="text-sm text-gray-500">Cargando...</p>
            ) : contacts.length > 0 ? (
              <div className="space-y-4">
                {contacts.map((contact, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                      {contact.names?.[0]?.displayName?.charAt(0) || '?'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-sm text-gray-900 truncate">{contact.names?.[0]?.displayName || 'Sin nombre'}</p>
                      <p className="text-xs text-gray-500 truncate">{contact.emailAddresses?.[0]?.value || 'Sin email'}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No se encontraron contactos.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
