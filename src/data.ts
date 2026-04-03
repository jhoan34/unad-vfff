export type Attachment = {
    name: string;
    url: string;
    type: string;
    size: number;
}

export type Notes = {
    id? : number
    title : string
    content : string
    date : string
    category? : string
    file? : Attachment
}

export const notes : Notes[] = [
    { id: 1, title: 'Reunión de Proyecto', content: 'Discutir los requerimientos del nuevo sistema de autenticación.', date: '2023-10-24', category: 'Trabajo', file: { name: 'requerimientos_v1.pdf', url: '#', type: 'application/pdf', size: 102400 } },
    { id: 2, title: 'Lista de Compras', content: 'Leche, Huevos, Pan, Café, Manzanas.', date: '2023-10-23', category: 'Personal' },
    { id: 3, title: 'Ideas para el Blog', content: 'Escribir sobre pruebas dinámicas en QA, Automatización con Selenium.', date: '2023-10-22', category: 'Estudio' },
    { id: 4, title: 'Notas de Curso Next.js', content: 'App router, Server components, Tailwind CSS.', date: '2023-10-21', category: 'Estudio' },
  ];