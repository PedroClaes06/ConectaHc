import { useState } from 'react';
import { Layout } from '../components/Layout';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'Como faço para agendar uma consulta?',
    answer: 'Para agendar uma consulta, clique no menu "Nova Consulta" e preencha o formulário com as informações necessárias. Após salvar, sua consulta aparecerá no dashboard.',
  },
  {
    question: 'Posso editar uma consulta já agendada?',
    answer: 'Sim! No dashboard, clique no ícone de edição ao lado da consulta desejada. Você pode alterar qualquer informação e salvar as mudanças.',
  },
  {
    question: 'Como cancelar uma consulta?',
    answer: 'Para cancelar uma consulta, você pode editá-la e alterar o status para "Cancelada", ou excluí-la clicando no ícone de lixeira no dashboard.',
  },
  {
    question: 'O que significa a taxa de adesão?',
    answer: 'A taxa de adesão é a porcentagem de consultas concluídas em relação ao total de consultas agendadas. Quanto maior a taxa, melhor a adesão ao tratamento.',
  },
  {
    question: 'Como funciona o sistema de login?',
    answer: 'O sistema utiliza autenticação segura com armazenamento local e cookies. Suas credenciais ficam salvas para facilitar o acesso futuro.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer: 'Sim! Utilizamos práticas de segurança modernas, incluindo criptografia e armazenamento seguro de dados. Suas informações pessoais são protegidas.',
  },
  {
    question: 'O sistema funciona em dispositivos móveis?',
    answer: 'Sim! O ConectaHC é totalmente responsivo e funciona perfeitamente em smartphones, tablets e computadores.',
  },
  {
    question: 'Como posso ver o histórico de consultas?',
    answer: 'No dashboard principal, você encontra uma tabela com todas as suas consultas, incluindo as agendadas, concluídas e canceladas.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h1>
          <p className="text-lg text-gray-600">
            Encontre respostas para as dúvidas mais comuns
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ainda tem dúvidas?</h2>
          <p className="text-gray-700 mb-4">
            Se você não encontrou a resposta que procurava, entre em contato conosco!
          </p>
          <a
            href="/contato"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Fale Conosco
          </a>
        </div>
      </div>
    </Layout>
  );
}
