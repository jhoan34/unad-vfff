"use client"
import React from 'react';
import Link from 'next/link';
import { notes } from '@/data';

export default function NotesPage() {

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">Mis Notas</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">usuario@ejemplo.com</span>
              <Link href="/login" className="text-sm text-red-600 hover:text-red-800">
                Cerrar Sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">Todas las Notas</h2>
            <Link 
              href="/notes/new" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Nueva Nota
            </Link>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <Link href={`/notes/${note.id}`} key={note.id}>
                <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer h-full">
                  <div className="px-4 py-5 sm:p-6 flex flex-col h-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2 truncate">
                      {note.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-grow">
                      {note.content}
                    </p>
                    <div className="text-xs text-gray-400 mt-auto pt-2 border-t border-gray-100">
                      Actualizado: {note.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
