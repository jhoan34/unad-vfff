"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { notes } from '@/data';

export default function ViewNotePage() {
  const params = useParams();
  const id = Number(params.id);
  
  // Buscar la nota por ID
  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nota no encontrada</h2>
        <Link href="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
                Mis Notas
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">usuario@ejemplo.com</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto py-10 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {note.title}
            </h3>
            <div className="flex gap-2">
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 bg-gray-100 px-3 py-1 rounded">
                Volver
              </Link>
              <button className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded">
                Editar
              </button>
            </div>
          </div>
          
          <div className="px-4 py-5 sm:p-6 space-y-4">
            <div>
              {note.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {note.category}
                </span>
              )}
              <span className="ml-2 text-xs text-gray-500">
                Creado: {note.date}
              </span>
            </div>

            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {note.content}
            </div>

            {/* Archivo adjunto condicional */}
            {note.file && (
              <div className="pt-4 border-t border-gray-200 mt-6">
                <h4 className="text-sm font-medium text-gray-900">Archivos Adjuntos</h4>
                <ul className="mt-2 border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 flex-1 w-0 truncate">
                        {note.file.name} 
                        {note.file.size && <span className="text-gray-400 text-xs ml-1">({Math.round(note.file.size / 1024)} KB)</span>}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a 
                        href={note.file.url} 
                        download={note.file.name}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Descargar
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
