import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useWorkouts } from '../contexts/WorkoutsContext';
import { Layout } from '../components/Layout';
import { Save, ArrowLeft } from 'lucide-react';

const workoutSchema = z.object({
  patientId: z.string().min(1, 'ID do paciente é obrigatório'),
  patientName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  type: z.string().min(3, 'Tipo é obrigatório'),
  description: z.string().min(5, 'Descrição deve ter no mínimo 5 caracteres'),
  duration: z.number().min(5, 'Duração mínima é 5 minutos'),
  date: z.string().min(1, 'Data é obrigatória'),
  status: z.enum(['scheduled', 'completed', 'cancelled']),
});

type WorkoutFormData = z.infer<typeof workoutSchema>;

export function EditWorkout() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getWorkoutById, updateWorkout } = useWorkouts();

  const workout = getWorkoutById(id || '');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<WorkoutFormData>({
    resolver: zodResolver(workoutSchema),
  });

  useEffect(() => {
    if (!workout) {
      navigate('/');
      return;
    }

    reset({
      patientId: workout.patientId,
      patientName: workout.patientName,
      type: workout.type,
      description: workout.description,
      duration: workout.duration,
      date: workout.date,
      status: workout.status,
    });
  }, [workout, reset, navigate]);

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      if (!id) return;
      await updateWorkout(id, data);
      navigate('/');
    } catch (error) {
      setError('root', {
        message: 'Erro ao atualizar consulta. Tente novamente.',
      });
    }
  };

  if (!workout) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Editar Consulta</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="patientId" className="block text-sm font-medium text-gray-700 mb-2">
                  ID do Paciente
                </label>
                <input
                  {...register('patientId')}
                  type="text"
                  id="patientId"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.patientId && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientId.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Paciente
                </label>
                <input
                  {...register('patientName')}
                  type="text"
                  id="patientName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-600">{errors.patientName.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consulta
              </label>
              <input
                {...register('type')}
                type="text"
                id="type"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                  Data
                </label>
                <input
                  {...register('date')}
                  type="date"
                  id="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                  Duração (minutos)
                </label>
                <input
                  {...register('duration', { valueAsNumber: true })}
                  type="number"
                  id="duration"
                  min="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                {...register('status')}
                id="status"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="scheduled">Agendada</option>
                <option value="completed">Concluída</option>
                <option value="cancelled">Cancelada</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            {errors.root && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{errors.root.message}</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
              >
                <Save className="w-5 h-5" />
                <span>{isSubmitting ? 'Salvando...' : 'Salvar'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
