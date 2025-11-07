import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout, WorkoutFormData, DashboardMetrics } from '../types';

interface WorkoutsContextType {
  workouts: Workout[];
  metrics: DashboardMetrics;
  isLoading: boolean;
  error: string | null;
  fetchWorkouts: () => Promise<void>;
  getWorkoutById: (id: string) => Workout | undefined;
  createWorkout: (data: WorkoutFormData) => Promise<void>;
  updateWorkout: (id: string, data: WorkoutFormData) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
}

const WorkoutsContext = createContext<WorkoutsContextType | undefined>(undefined);

const mockWorkouts: Workout[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Pedro Silva',
    type: 'Consulta Cardiologia',
    description: 'Consulta de rotina cardiológica',
    duration: 30,
    date: '2025-11-05',
    status: 'scheduled',
    createdAt: '2025-10-30T10:00:00Z',
    updatedAt: '2025-10-30T10:00:00Z',
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'Pedro Silva',
    type: 'Consulta Ortopedia',
    description: 'Avaliação de joelho',
    duration: 45,
    date: '2025-10-28',
    status: 'completed',
    createdAt: '2025-10-20T14:00:00Z',
    updatedAt: '2025-10-28T14:00:00Z',
  },
];

function calculateMetrics(workouts: Workout[]): DashboardMetrics {
  const totalConsultations = workouts.length;
  const completedConsultations = workouts.filter(w => w.status === 'completed').length;
  const cancelledConsultations = workouts.filter(w => w.status === 'cancelled').length;
  const totalDuration = workouts.reduce((sum, w) => sum + w.duration, 0);
  const attendanceRate = totalConsultations > 0
    ? (completedConsultations / totalConsultations) * 100
    : 0;

  return {
    totalConsultations,
    completedConsultations,
    cancelledConsultations,
    totalDuration,
    attendanceRate,
  };
}

export function WorkoutsProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalConsultations: 0,
    completedConsultations: 0,
    cancelledConsultations: 0,
    totalDuration: 0,
    attendanceRate: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    setMetrics(calculateMetrics(workouts));
  }, [workouts]);

  const fetchWorkouts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setWorkouts(mockWorkouts);
    } catch (err) {
      setError('Erro ao carregar consultas');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkoutById = (id: string) => {
    return workouts.find(w => w.id === id);
  };

  const createWorkout = async (data: WorkoutFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      const newWorkout: Workout = {
        ...data,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      setWorkouts(prev => [...prev, newWorkout]);
    } catch (err) {
      setError('Erro ao criar consulta');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateWorkout = async (id: string, data: WorkoutFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      setWorkouts(prev => prev.map(w =>
        w.id === id
          ? { ...w, ...data, updatedAt: new Date().toISOString() }
          : w
      ));
    } catch (err) {
      setError('Erro ao atualizar consulta');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorkout = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setWorkouts(prev => prev.filter(w => w.id !== id));
    } catch (err) {
      setError('Erro ao excluir consulta');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WorkoutsContext.Provider
      value={{
        workouts,
        metrics,
        isLoading,
        error,
        fetchWorkouts,
        getWorkoutById,
        createWorkout,
        updateWorkout,
        deleteWorkout,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  const context = useContext(WorkoutsContext);
  if (context === undefined) {
    throw new Error('useWorkouts must be used within a WorkoutsProvider');
  }
  return context;
}
