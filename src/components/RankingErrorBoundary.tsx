import React from 'react';
import { AlertTriangle, RotateCcw, ArrowLeft } from 'lucide-react';

interface RankingErrorBoundaryProps {
  children: React.ReactNode;
  onBackToHome?: () => void;
}

interface RankingErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class RankingErrorBoundary extends React.Component<
  RankingErrorBoundaryProps,
  RankingErrorBoundaryState
> {
  declare props: RankingErrorBoundaryProps;
  state: RankingErrorBoundaryState = { hasError: false, errorMessage: '' };
  declare setState: (
    state:
      | RankingErrorBoundaryState
      | Partial<RankingErrorBoundaryState>
      | ((prevState: RankingErrorBoundaryState) => RankingErrorBoundaryState | Partial<RankingErrorBoundaryState>)
  ) => void;

  constructor(props: RankingErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error): RankingErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message || 'Erro inesperado ao carregar o Ranking.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-xl mx-auto py-10 px-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/60 shadow-xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">
                Falha ao conectar ao Ranking
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 break-words">
                Não foi possível carregar os dados do Firestore no momento.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => this.setState({ hasError: false, errorMessage: '' })}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Tentar Novamente</span>
              </button>
              {this.props.onBackToHome && (
                <button
                  type="button"
                  onClick={this.props.onBackToHome}
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Voltar ao Início</span>
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
