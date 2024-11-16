import {
  ClipboardList,
  FileText,
  GraduationCap,
  Settings2,
  Users,
} from "lucide-react";

export const menuItems = [
  {
    title: "Estudiantes",
    url: "/estudiantes",
    icon: GraduationCap,
    isActive: true,
  },
  {
    title: "Profesores",
    url: "#",
    icon: Users,
    items: [
      {
        title: "Agregar Profesor",
        url: "#",
      },
      {
        title: "Asignaciones",
        url: "#",
      },
    ],
  },
  {
    title: "Calificaciones",
    url: "#",
    icon: ClipboardList,
    items: [
      {
        title: "Ingresar Calificaciones",
        url: "#",
      },
      {
        title: "Periodos Academicos",
        url: "#",
      },
    ],
  },
  {
    title: "Informes",
    url: "#",
    icon: FileText,
    items: [
      {
        title: "General Informes",
        url: "#",
      },
      {
        title: "Historico de Informes",
        url: "#",
      },
    ],
  },
  {
    title: "Configuracion",
    url: "/configuracion",
    icon: Settings2,
  },
];
