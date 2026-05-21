import { Component, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Beklenmeyen hata:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-ink-50 px-6 text-center">
          <h1 className="text-2xl font-bold text-ink-900">
            Bir şeyler ters gitti
          </h1>
          <p className="mt-3 max-w-md text-ink-500">
            Sayfa yüklenirken beklenmeyen bir hata oluştu. Lütfen sayfayı
            yenileyin.
          </p>
          <button
            type="button"
            onClick={() => window.location.assign('/')}
            className="mt-6 rounded-full bg-brand-500 px-7 py-3 font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
