"use client";

import * as React from "react";
import { useState } from "react";
import {
  Search,
  User,
  Calendar,
  Book,
  Award,
  Pencil,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AddStudentButton } from "@/components/agregar-estudiante";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// TODO: Se toma de la base de datos
const studentsData: StudentType[] = [
  {
    studentId: 1,
    document: "123456789",
    name: "Wylder Quiceno",
    dateOfBirth: "2000-12-18",
    gradeId: 2,
  },
];

//TODO: Se toma de la base de datos
const grades: GradeType[] = [
  { gradeId: 1, name: "Transición", level: "Preescolar" },
  { gradeId: 2, name: "Grado 1", level: "Primero" },
  { gradeId: 3, name: "Grado 2", level: "Segundo" },
  { gradeId: 4, name: "Grado 3", level: "Tercero" },
  { gradeId: 5, name: "Grado 4", level: "Cuarto" },
  { gradeId: 6, name: "Grado 5", level: "Quinto" },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<StudentType[]>(studentsData);
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentType | null>(
    null
  );

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.document.toString().includes(searchTerm.toString())
  );

  const handleEditStudent = (student: StudentType) => {
    setEditingStudent({ ...student });
  };

  const handleSaveEdit = () => {
    if (editingStudent) {
      setStudents(
        students.map((est: StudentType) =>
          est.studentId === editingStudent.studentId ? editingStudent : est
        )
      );
    }
    setIsEditingStudent(false);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((est) => est.studentId !== id));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Expedientes de Estudiantes</h1>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar estudiante"
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <AddStudentButton />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Estudiantes</CardTitle>
          <CardDescription>
            Gestiona los expedientes de los estudiantes de la institución.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Nombre</TableHead>
                <TableHead className="hidden sm:table-cell">Grado</TableHead>
                <TableHead className="hidden sm:table-cell">Promedio</TableHead>
                <TableHead className="hidden sm:table-cell text-right pr-12">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell className="sm:hidden">
                    <div className="font-medium">{student.name}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {student.name}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {
                      grades.find((grade) => grade.gradeId === student.gradeId)
                        ?.level
                    }
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">3.3</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            Ver
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Expediente de {student.name}
                            </DialogTitle>
                            <DialogDescription>
                              Detalles del expediente del estudiante
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                              <Avatar className="w-20 h-20">
                                <AvatarImage src={``} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="text-center sm:text-left">
                                <h3 className="font-semibold text-lg">
                                  {student.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Documento: {student.document}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>
                                  Grado:{" "}
                                  {
                                    grades.find(
                                      (grade) =>
                                        grade.gradeId === student.gradeId
                                    )?.level
                                  }
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  Fecha de Nacimiento: {student.dateOfBirth}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Book className="h-4 w-4" />
                                <span>Promedio: 3.3</span>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Logros</h4>
                              <div className="flex gap-2">
                                <Badge variant="secondary">
                                  <Award className="h-3 w-3 mr-1" />
                                  Cuadro de Honor
                                </Badge>
                                <Badge variant="secondary">
                                  <Award className="h-3 w-3 mr-1" />
                                  Mejor Proyecto
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={isEditingStudent}
                        onOpenChange={setIsEditingStudent}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => handleEditStudent(student)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Estudiante</DialogTitle>
                            <DialogDescription>
                              Modifica la información del estudiante aquí.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="document" className="text-right">
                                Documento de Identidad
                              </Label>
                              <Input
                                id="document"
                                value={editingStudent?.document}
                                onChange={(e) => {
                                  if (editingStudent) {
                                    setEditingStudent({
                                      ...editingStudent,
                                      document: e.target.value,
                                    });
                                  }
                                }}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nombre
                              </Label>
                              <Input
                                id="name"
                                value={editingStudent?.name}
                                onChange={(e) => {
                                  if (editingStudent) {
                                    setEditingStudent({
                                      ...editingStudent,
                                      name: e.target.value,
                                    });
                                  }
                                }}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="new-grade" className="text-right">
                                Grado
                              </Label>
                              <Select
                                value={editingStudent?.gradeId.toString()}
                                onValueChange={(e) => {
                                  if (editingStudent) {
                                    setEditingStudent({
                                      ...editingStudent,
                                      gradeId: parseInt(e),
                                    });
                                  }
                                }}
                              >
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Seleccionar grado" />
                                </SelectTrigger>
                                <SelectContent>
                                  {grades.map((grade: GradeType) => (
                                    <SelectItem
                                      key={grade.gradeId}
                                      value={grade.gradeId.toString()}
                                    >
                                      {grade.name} - {grade.level}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                htmlFor="dateOfBirth"
                                className="text-right"
                              >
                                Fecha de Nacimiento
                              </Label>
                              <Input
                                id="dateOfBirth"
                                type="date"
                                value={editingStudent?.dateOfBirth}
                                onChange={(e) => {
                                  if (editingStudent) {
                                    setEditingStudent({
                                      ...editingStudent,
                                      dateOfBirth: e.target.value,
                                    });
                                  }
                                }}
                                className="col-span-3"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleSaveEdit}>
                              Guardar cambios
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="w-full sm:w-auto"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              ¿Estás absolutamente seguro?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Esto eliminará
                              permanentemente el expediente del estudiante y lo
                              removerá de nuestros servidores.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                handleDeleteStudent(student.studentId)
                              }
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
