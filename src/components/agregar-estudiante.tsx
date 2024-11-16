"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

//TODO: Se toma de la base de datos
export const grades: GradeType[] = [
  { gradeId: 1, name: "Transición", level: "Preescolar" },
  { gradeId: 2, name: "Grado 1", level: "Preescolar" },
  { gradeId: 3, name: "Grado 2", level: "Preescolar" },
  { gradeId: 4, name: "Grado 3", level: "Preescolar" },
  { gradeId: 5, name: "Grado 4", level: "Preescolar" },
  { gradeId: 6, name: "Grado 5", level: "Preescolar" },
];

export const AddStudentButton = () => {
  const [newStudent, setNewStudent] = useState<Omit<StudentType, "studentId">>({
    document: "",
    name: "",
    dateOfBirth: "",
    gradeId: 1,
  });

  const [isAddingStudent, setIsAddingStudent] = useState(false);

  const handleAddStudent = () => {
    console.log("Studento añadido: ", newStudent);
    setIsAddingStudent(false);
  };

  return (
    <Dialog open={isAddingStudent} onOpenChange={setIsAddingStudent}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Agregar Estudiante
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Estudiante</DialogTitle>
          <DialogDescription>
            Ingrese los datos del nuevo estudiante aquí.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-document" className="text-right">
              Documento de Identidad
            </Label>
            <Input
              id="new-document"
              value={newStudent.document}
              onChange={(e) =>
                setNewStudent({ ...newStudent, document: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-name" className="text-right">
              Nombre
            </Label>
            <Input
              id="new-name"
              value={newStudent.name}
              onChange={(e) =>
                setNewStudent({ ...newStudent, name: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-birthdate" className="text-right">
              Fecha de Nacimiento
            </Label>
            <Input
              id="new-birthdate"
              type="date"
              value={newStudent.dateOfBirth}
              onChange={(e) =>
                setNewStudent({
                  ...newStudent,
                  dateOfBirth: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="new-grade" className="text-right">
              Grado
            </Label>
            <Select
              value={newStudent.gradeId.toString()}
              onValueChange={(value) =>
                setNewStudent({ ...newStudent, gradeId: parseInt(value) })
              }
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
        </div>
        <DialogFooter>
          <Button onClick={handleAddStudent}>Agregar Estudiante</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
