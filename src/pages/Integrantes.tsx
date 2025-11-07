import { Layout } from '../components/Layout';
import { Users, Mail, GraduationCap } from 'lucide-react';
import { TeamMember } from '../types';

const teamMembers: TeamMember[] = [
  {
    name: 'João Silva',
    rm: 'RM12345',
    class: 'Turma 1TDSPX',
  },
  {
    name: 'Maria Santos',
    rm: 'RM12346',
    class: 'Turma 1TDSPX',
  },
  {
    name: 'Pedro Oliveira',
    rm: 'RM12347',
    class: 'Turma 1TDSPX',
  },
];

export function Integrantes() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Nossa Equipe</h1>
          <p className="text-lg text-gray-600">
            Conheça os integrantes do projeto ConectaHC
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>

                <div className="space-y-2 w-full mt-4">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{member.rm}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <GraduationCap className="w-4 h-4" />
                    <span className="text-sm">{member.class}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre o Projeto</h2>
          <p className="text-gray-700 leading-relaxed">
            O ConectaHC é uma iniciativa desenvolvida como parte da Sprint 4 do curso,
            com o objetivo de reduzir faltas em consultas online de pacientes do Hospital
            das Clínicas. Nossa equipe trabalhou arduamente para criar uma solução moderna,
            responsiva e acessível que facilita o gerenciamento de consultas e melhora a
            experiência dos pacientes.
          </p>
        </div>
      </div>
    </Layout>
  );
}
