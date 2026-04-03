"use client"
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from "react"
import { notes, Attachment } from '@/data';

export default function NewNotePage() {
  const router = useRouter();
  const [formdata, setFormdata ] = useState({
    title : "",
    content : "",
    category : "Personal",
    date : new Date().toISOString().split('T')[0],
    file_upload : null as File | null
  })

  const submitForm = async ( event : React.FormEvent<HTMLFormElement> ) => {
    event.preventDefault()
    try {
      let attachment: Attachment | undefined = undefined;
      
      if (formdata.file_upload) {
        // Creamos una URL simulada en el navegador para el archivo subido
        const fileUrl = URL.createObjectURL(formdata.file_upload);
        attachment = {
          name: formdata.file_upload.name,
          url: fileUrl,
          type: formdata.file_upload.type,
          size: formdata.file_upload.size
        };
      }

      const newNote = {
        id: notes.length + 1,
        title: formdata.title,
        content: formdata.content,
        date: formdata.date,
        category: formdata.category,
        file: attachment
      };
      
      notes.unshift(newNote); // Agrega al principio para verlo en el dashboard
      
      // Redirige al dashboard
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error("Error al crear la nota:", error);
    }
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
              Crear Nueva Nota
            </h3>
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
              Volver
            </Link>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={submitForm} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título de la Nota <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormdata({ ...formdata, title: e.target.value })}
                    type="text"
                    name="title"
                    id="title"
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="Ej. Lista de compras"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Contenido <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <textarea
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setFormdata({ ...formdata, content: e.target.value })
                    }
                    id="content"
                    name="content"
                    rows={8}
                    required
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                    placeholder="Escribe el contenido de tu nota aquí..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Categoría
                </label>
                <select
                  id="category"
                  name="category"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormdata({ ...formdata, category: e.target.value })}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border"
                >
                  <option>Personal</option>
                  <option>Trabajo</option>
                  <option>Estudio</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Adjuntar Archivo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Sube un archivo</span>
                        <input
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setFormdata({ ...formdata, file_upload: e.target.files[0] });
                            }
                          }}
                          id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">o arrastra y suelta</p>
                    </div>
                    {formdata.file_upload ? (
                      <p className="text-sm text-green-600 mt-2 font-medium">
                        Archivo seleccionado: {formdata.file_upload.name}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG, PDF hasta 10MB</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-5 flex justify-end gap-3">
                <Link
                  href="/"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Guardar Nota
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
