import { Layout } from '../components/Layout';
import { Info, Target, Heart, Award } from 'lucide-react';

export function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Info className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre o ConectaHC</h1>
          <p className="text-lg text-gray-600">
            Conectando pacientes ao melhor cuidado
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-start space-x-4">
              <Target className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Missão</h2>
                <p className="text-gray-700 leading-relaxed">
                  Reduzir o índice de faltas em consultas online através de uma plataforma
                  intuitiva e eficiente que facilita o gerenciamento de agendamentos e
                  melhora a comunicação entre pacientes e o Hospital das Clínicas.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-start space-x-4">
              <Heart className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Visão</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ser referência em soluções tecnológicas para gestão de consultas médicas,
                  promovendo maior adesão dos pacientes e otimizando recursos do sistema
                  de saúde pública.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-start space-x-4">
              <Award className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Valores</h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Compromisso:</strong> Dedicação à saúde e bem-estar dos pacientes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Inovação:</strong> Uso de tecnologia para melhorar processos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Acessibilidade:</strong> Interface inclusiva e fácil de usar</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Responsividade:</strong> Adaptação a diferentes dispositivos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span><strong>Segurança:</strong> Proteção de dados e privacidade</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Tecnologias Utilizadas</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="font-semibold">React</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="font-semibold">TypeScript</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="font-semibold">Vite</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="font-semibold">TailwindCSS</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="font-semibold">React Router</p>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center">
                <p className="font-semibold">React Hook Form</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
