import React, { useState, useEffect } from 'react';
import { SubjectData, StudentUser, EssaySubmission } from '../types';
import { correctEssayWithAI } from '../services/essayAiService';
import { getStudentEssays, saveStudentEssay } from '../utils/authManager';
import { soundManager } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  PenTool,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Send,
  History,
  FileText,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Trophy,
  Loader2,
} from 'lucide-react';
import { AnimalAvatar } from './AnimalAvatar';

interface EssayCorrectionSectionProps {
  subject: SubjectData;
  currentUser: StudentUser | null;
  onAddXp: (amount: number, badgeId?: string) => void;
  onOpenLogin: () => void;
}

interface EssayPromptTheme {
  id: string;
  title: string;
  source: string;
  motivatingTexts: string[];
  sampleModel?: {
    title: string;
    text: string;
  };
}

const PROMPT_THEMES: EssayPromptTheme[] = [
  {
    id: 'cuidado-trabalho',
    title: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
    source: 'ENEM Oficial Recente',
    motivatingTexts: [
      'Texto I: O trabalho de cuidado — cozinhar, limpar, cuidar de crianças, idosos e pessoas com deficiência — é a base sobre a qual se sustenta a sociedade, mas permanece invisibilizado e recai majoritariamente sobre as mulheres.',
      'Texto II: Dados do IBGE apontam que as mulheres dedicam quase o dobro de horas semanais a afazeres domésticos e cuidados de pessoas em comparação aos homens.',
      'Texto III: A ausência de creches públicas suficientes e de políticas de assistência perpetua a sobrecarga feminina e restringe o acesso ao mercado de trabalho qualificado.',
    ],
    sampleModel: {
      title: 'O peso invisível da dedicação',
      text: `Na clássica obra "Quarto de Despejo", Carolina Maria de Jesus retrata a exaustiva labuta cotidiana das mulheres brasileiras na manutenção de suas famílias, evidenciando uma dedicação histórica desprovida de justo reconhecimento. Hodiernamente, essa conjuntura permanece vívida no Brasil, onde a invisibilidade do trabalho de cuidado realizado pela mulher configura um grave entrave social. Com efeito, esse cenário perverso é alimentado tanto pela omissão estatal na provisão de redes de apoio quanto pelo enraizamento de papéis de gênero arcaicos que sobrecarregam a figura feminina.

Em primeiro lugar, cabe pontuar a inércia do Poder Público como catalisadora da sobrecarga feminina. De acordo com o filósofo Thomas Hobbes, o Estado foi criado para garantir o bem-estar e a equidade entre os cidadãos. Todavia, a escassez crônica de creches públicas e de centros de acolhimento para idosos no país força as mulheres a assumirem integralmente as tarefas de assistência domiciliar. Como consequência, milhões de brasileiras são compelidas a abandonar os estudos ou a aceitar empregos informais de menor remuneração, perpetuando o abismo de desigualdade socioeconômica.

Ademais, a perpetuação de constructos culturais patriarcais consolida essa negligência histórica. Segundo a socióloga Simone de Beauvoir, "não se nasce mulher, torna-se mulher", inferindo que as expectativas sociais são forjadas culturalmente. Nesse sentido, naturalizar que o trabalho doméstico e os cuidados com vulneráveis sejam dever exclusivo da mulher desonera a sociedade e o Estado de responsabilidades coletivas. Essa divisão sexual do trabalho, desprovida de remuneração ou valorização moral, gera adoecimento físico e psíquico contínuo na população feminina.

Infere-se, portanto, a urgência de medidas concretas para remediar esse quadro. Para tanto, o Ministério do Desenvolvimento e Assistência Social, em parceria com o Ministério da Educação, deve expandir a Rede Nacional de Cuidados, mediante a alocação de verbas orçamentárias na construção de creches em tempo integral e centros diurnos para idosos nas periferias urbanas. Outrossim, canais de mídia aberta e escolas devem veicular campanhas socioeducativas sobre a divisão igualitária das tarefas domésticas, com o fito de desconstruir o machismo estrutural. Assim, o Brasil avançará rumo à justiça social e ao reconhecimento pleno de suas cuidadoras.`,
    },
  },
  {
    id: 'biodiversidade-biomas',
    title: 'A preservação da biodiversidade e a valorização dos biomas brasileiros como imperativo nacional',
    source: 'Tema Proposto • Floresta do Saber',
    motivatingTexts: [
      'Texto I: O Brasil abriga cerca de 20% de toda a biodiversidade mundial, distribuída entre Amazônia, Cerrado, Mata Atlântica, Caatinga, Pantanal e Pampa.',
      'Texto II: As queimadas ilegais e o desmatamento predatório ameaçam espécies emblemáticas como a Onça-Pintada, o Quati e a Harpia, comprometendo o equilíbrio hídrico e climático do continente.',
      'Texto III: A Constituição Federal de 1988 estabelece, em seu artigo 225, o direito de todos ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo.',
    ],
  },
  {
    id: 'inteligencia-artificial-educacao',
    title: 'Os desafios e oportunidades da Inteligência Artificial na educação básica brasileira',
    source: 'Tema Atual • Inovações Pedagógicas',
    motivatingTexts: [
      'Texto I: Ferramentas de IA generativa transformam o aprendizado, permitindo tutoria personalizada e democratização do conhecimento em escala.',
      'Texto II: Por outro lado, o risco de plágio, o enfraquecimento do pensamento crítico e a desigualdade digital entre escolas públicas e particulares demandam regulação ética e formação docente.',
    ],
  },
  {
    id: 'tema-livre',
    title: 'Tema Livre / Personalizado',
    source: 'Definido pelo Estudante',
    motivatingTexts: [
      'Digite seu próprio tema no campo abaixo e teste seus argumentos sobre qualquer assunto de relevância social, cultural ou científica.',
    ],
  },
];

export const EssayCorrectionSection: React.FC<EssayCorrectionSectionProps> = ({
  subject,
  currentUser,
  onAddXp,
  onOpenLogin,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>(PROMPT_THEMES[0].id);
  const [customTheme, setCustomTheme] = useState<string>('');
  const [essayTitle, setEssayTitle] = useState<string>('');
  const [essayContent, setEssayContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [latestSubmission, setLatestSubmission] = useState<EssaySubmission | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [savedEssays, setSavedEssays] = useState<EssaySubmission[]>([]);
  const [showMotivatingTexts, setShowMotivatingTexts] = useState<boolean>(true);

  const activeTheme = PROMPT_THEMES.find((t) => t.id === selectedThemeId) || PROMPT_THEMES[0];
  const finalThemeTitle = selectedThemeId === 'tema-livre' ? (customTheme.trim() || 'Tema Livre') : activeTheme.title;

  // Load essays for current user
  useEffect(() => {
    if (currentUser?.id) {
      setSavedEssays(getStudentEssays(currentUser.id));
    } else {
      setSavedEssays(getStudentEssays('visitante-floresta'));
    }
  }, [currentUser]);

  // Calculate live statistics
  const words = essayContent.trim() ? essayContent.trim().split(/\s+/).filter(Boolean) : [];
  const lines = essayContent ? essayContent.split('\n') : [''];
  const wordCount = words.length;
  const lineCount = lines.length;

  const handleLoadSample = () => {
    if (activeTheme.sampleModel) {
      soundManager.playClick();
      setEssayTitle(activeTheme.sampleModel.title);
      setEssayContent(activeTheme.sampleModel.text);
    }
  };

  const handleClear = () => {
    soundManager.playClick();
    if (window.confirm('Deseja limpar o texto da redação atual?')) {
      setEssayTitle('');
      setEssayContent('');
    }
  };

  const handleCorrectEssay = async () => {
    if (!essayContent.trim() || essayContent.trim().length < 50) {
      soundManager.playError();
      alert('Escreva pelo menos 50 caracteres para que a IA possa avaliar seu texto com os critérios do ENEM.');
      return;
    }

    soundManager.playClick();
    setIsSubmitting(true);

    try {
      const studentId = currentUser?.id || 'visitante-floresta';
      const studentName = currentUser?.name || 'Estudante da Floresta';

      const result = await correctEssayWithAI({
        theme: finalThemeTitle,
        title: essayTitle.trim(),
        text: essayContent,
        userId: studentId,
        studentName,
      });

      setLatestSubmission(result);

      // Save essay to student's persistent history
      saveStudentEssay(studentId, result);
      setSavedEssays(getStudentEssays(studentId));

      // Play level-up sound and confetti
      soundManager.playLevelUp();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      // Add XP reward (+100 XP)
      onAddXp(100, 'badge-por');
    } catch (err) {
      console.error('Erro na correção:', err);
      soundManager.playError();
      alert('Houve um imprevisto ao processar a correção da redação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto py-2">
      {/* Quati Quirino Master Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-950 via-slate-900 to-amber-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-rose-500/30 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-bold uppercase tracking-wider">
              <PenTool className="w-3.5 h-3.5 text-rose-400" />
              <span>Língua Portuguesa • Laboratório de Redação ENEM</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white">
              Oficina de Redação com IA
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 max-w-2xl leading-relaxed">
              Escreva sua redação dissertativo-argumentativa e receba a correção instantânea do <strong>Quati Quirino</strong> com nota de <strong>0 a 1000 pontos</strong> dividida pelas <strong>5 Competências oficiais do ENEM</strong>.
            </p>
          </div>

          <div className="shrink-0 flex items-center space-x-3 bg-white/10 dark:bg-slate-900/60 backdrop-blur-md p-4 rounded-2xl border border-rose-400/30">
            <AnimalAvatar animalId="portugues" size="lg" />
            <div className="text-left">
              <div className="font-heading font-bold text-amber-300 text-sm">Quati Quirino</div>
              <div className="text-[11px] text-rose-200">"Cada parágrafo é um galho forte para a nota 1000!"</div>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Selection Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-rose-500" />
            <span>Escolha a Proposta de Redação:</span>
          </label>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {activeTheme.source}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PROMPT_THEMES.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedThemeId(theme.id);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 ring-2 ring-rose-500/40 text-rose-950 dark:text-rose-200 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:border-rose-300'
                }`}
              >
                <div className="text-xs line-clamp-3 leading-snug">{theme.title}</div>
                <div className="text-[10px] text-rose-600 dark:text-rose-400 mt-2 font-semibold uppercase">
                  {theme.source}
                </div>
              </button>
            );
          })}
        </div>

        {selectedThemeId === 'tema-livre' && (
          <div className="space-y-1.5 pt-2 animate-fade-in">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Digite seu tema personalizado:
            </label>
            <input
              type="text"
              value={customTheme}
              onChange={(e) => setCustomTheme(e.target.value)}
              placeholder="ex: Os desafios da mobilidade urbana sustentável nas metrópoles brasileiras"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}

        {/* Motivating Texts Accordion */}
        {activeTheme.motivatingTexts.length > 0 && (
          <div className="border border-rose-100 dark:border-rose-950/80 rounded-2xl overflow-hidden bg-rose-50/50 dark:bg-slate-850/60 text-xs">
            <button
              onClick={() => setShowMotivatingTexts(!showMotivatingTexts)}
              className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-rose-900 dark:text-rose-300 hover:bg-rose-100/50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="flex items-center space-x-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Textos Motivadores & Repertório Sugerido</span>
              </span>
              {showMotivatingTexts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showMotivatingTexts && (
              <div className="px-4 pb-4 space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
                {activeTheme.motivatingTexts.map((text, idx) => (
                  <p key={idx} className="bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-xl border border-rose-100 dark:border-slate-800">
                    {text}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Essay Writing Interactive Sheet */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-heading font-extrabold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-rose-500" />
              <span>Folha de Redação do Estudante</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Gênero dissertativo-argumentativo em prosa • Modelo ENEM
            </p>
          </div>

          <div className="flex items-center space-x-2 flex-wrap gap-2 text-xs">
            {activeTheme.sampleModel && (
              <button
                type="button"
                onClick={handleLoadSample}
                className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-300/40 transition-colors"
                title="Carregar texto modelo nota 960 para testar a correção"
              >
                ✨ Carregar Modelo Nota 960
              </button>
            )}
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1.5 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Título da Redação (Opcional no ENEM):
          </label>
          <input
            type="text"
            value={essayTitle}
            onChange={(e) => setEssayTitle(e.target.value)}
            placeholder="ex: O imperativo do cuidado e a igualdade cidadã"
            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Essay Textarea with Lined ENEM Look */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold">Corpo da Redação (Mínimo 7 linhas, ideal de 20 a 30 linhas):</span>
            <div className="flex items-center space-x-3">
              <span className={`font-mono font-bold ${wordCount >= 200 ? 'text-emerald-600' : 'text-slate-600'}`}>
                {wordCount} palavras
              </span>
              <span className={`font-mono font-bold ${lineCount >= 20 && lineCount <= 30 ? 'text-emerald-600' : 'text-amber-600'}`}>
                ~{lineCount} linhas
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 focus-within:border-rose-500 focus-within:ring-2 focus-within:ring-rose-500/20">
            <textarea
              id="essay-textarea"
              rows={16}
              value={essayContent}
              onChange={(e) => setEssayContent(e.target.value)}
              placeholder="Comece sua redação aqui com a introdução e a tese...&#10;&#10;Em primeiro lugar, desenvolva o argumento 1 com repertório sociocultural legitimado...&#10;&#10;Ademais, elabore o argumento 2 demonstrando a causa ou consequência do problema...&#10;&#10;Portanto, formule a proposta de intervenção completa com Agente, Ação, Modo/Meio, Efeito e Detalhamento."
              className="w-full p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-850/80 font-serif text-sm sm:text-base text-slate-900 dark:text-slate-100 leading-relaxed resize-y focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Quick Structure Guidance Pill */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-center font-medium text-slate-700 dark:text-slate-300">
              1. Introdução + Tese
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-center font-medium text-slate-700 dark:text-slate-300">
              2. D1 (Causa + Repertório)
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-center font-medium text-slate-700 dark:text-slate-300">
              3. D2 (Consequência)
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-xl text-center font-medium text-slate-700 dark:text-slate-300">
              4. Proposta de Intervenção
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {currentUser ? (
              <span>Corrigindo como: <strong>{currentUser.name}</strong> • Salva no seu perfil</span>
            ) : (
              <span className="text-amber-600 dark:text-amber-400">
                Você está escrevendo como visitante. <button onClick={onOpenLogin} className="underline font-bold">Faça login</button> para salvar no seu perfil pessoal!
              </span>
            )}
          </div>

          <button
            id="correct-essay-btn"
            type="button"
            disabled={isSubmitting || !essayContent.trim()}
            onClick={handleCorrectEssay}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center space-x-2 transition-all shadow-lg active:scale-95 cursor-pointer ${
              isSubmitting || !essayContent.trim()
                ? 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white shadow-rose-600/30 hover:scale-105'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Quati Quirino está corrigindo sua redação...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Corrigir Redação com IA & Dar Nota (+100 XP)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Latest Evaluation Result */}
      {latestSubmission && (
        <div id="essay-result-card" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-rose-500/40 shadow-2xl space-y-6 animate-scale-up">
          {/* Header Score Overview */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-rose-900 via-slate-900 to-emerald-950 p-6 rounded-2xl text-white">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-300">
                Resultado Oficial da Correção • ENEM
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white">
                "{latestSubmission.title}"
              </h3>
              <p className="text-xs text-slate-300">
                Tema: {latestSubmission.theme} • {latestSubmission.wordCount} palavras • {latestSubmission.lineCount} linhas
              </p>
            </div>

            <div className="flex items-center space-x-4 shrink-0 bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/20">
              <div className="text-center">
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Nota Final</div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {latestSubmission.scores.total} <span className="text-lg font-normal text-rose-200">/ 1000</span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-300 mt-0.5">
                  {latestSubmission.feedback.levelLabel}
                </div>
              </div>
            </div>
          </div>

          {/* General Review & Mascot Advice */}
          <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-5 rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-rose-900 dark:text-rose-300 font-bold text-sm">
              <Award className="w-5 h-5 text-rose-600 shrink-0" />
              <span>Parecer Geral do Professor Quati Quirino:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic">
              "{latestSubmission.feedback.generalReview}"
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-3 rounded-xl border border-rose-200/60 dark:border-slate-800 text-xs text-rose-800 dark:text-rose-300 font-semibold flex items-start space-x-2">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{latestSubmission.feedback.quatiTip}</span>
            </div>
          </div>

          {/* 5 Competencies Detailed Breakdown */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Desempenho por Competência do ENEM (0 a 200 pts cada)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                latestSubmission.scores.c1,
                latestSubmission.scores.c2,
                latestSubmission.scores.c3,
                latestSubmission.scores.c4,
                latestSubmission.scores.c5,
              ].map((comp, idx) => {
                const percent = Math.round((comp.score / 200) * 100);
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                        {comp.title}
                      </span>
                      <span className="font-mono font-black text-sm text-rose-600 dark:text-rose-400 shrink-0 ml-2">
                        {comp.score} / 200
                      </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full transition-all duration-700"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {comp.feedback}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-2xl space-y-2">
              <h5 className="font-bold text-xs text-emerald-900 dark:text-emerald-300 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Pontos Fortes do Seu Texto:</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200">
                {latestSubmission.feedback.strengths.map((str, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-4 rounded-2xl space-y-2">
              <h5 className="font-bold text-xs text-amber-900 dark:text-amber-300 flex items-center space-x-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Oportunidades de Melhoria:</span>
              </h5>
              <ul className="space-y-1.5 text-xs text-amber-950 dark:text-amber-200">
                {latestSubmission.feedback.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start space-x-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Student Essay History */}
      {savedEssays.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center space-x-2 text-sm font-bold text-slate-900 dark:text-white hover:text-rose-600"
            >
              <History className="w-4 h-4 text-rose-500" />
              <span>Histórico de Redações Salvas ({savedEssays.length})</span>
              {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <span className="text-xs text-slate-500">
              Salvo no armazenamento local deste dispositivo
            </span>
          </div>

          {showHistory && (
            <div className="space-y-3 pt-2">
              {savedEssays.map((essay) => (
                <div
                  key={essay.id}
                  onClick={() => {
                    soundManager.playClick();
                    setLatestSubmission(essay);
                    setEssayTitle(essay.title);
                    setEssayContent(essay.content);
                    const el = document.getElementById('essay-result-card');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-rose-400 bg-slate-50 dark:bg-slate-850/60 flex items-center justify-between cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {essay.title || 'Sem título'}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      {essay.theme} • {new Date(essay.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-mono font-black text-sm">
                      {essay.scores.total} pts
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Ver correção &rarr;</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
