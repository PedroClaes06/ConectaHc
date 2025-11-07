export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'admin';
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface Workout {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  description: string;
  duration: number;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Consultation extends Workout {
  specialty: string;
  doctor: string;
}

export type WorkoutFormData = Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>;

export interface DashboardMetrics {
  totalConsultations: number;
  completedConsultations: number;
  cancelledConsultations: number;
  totalDuration: number;
  attendanceRate: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface TeamMember {
  name: string;
  rm: string;
  class: string;
}
