export {};

declare global {
  type GradeType = {
    gradeId: number;
    name: string;
    level: string;
  };

  type StudentType = {
    studentId: number;
    document: string;
    name: string;
    dateOfBirth: string;
    gradeId: number;
  };
}
