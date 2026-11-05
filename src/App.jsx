import { useState } from 'react'

function App() {
  const [cuenta, setCuenta] = useState('')
  const [porcentaje, setPorcentaje] = useState(15)
  const [resultado, setResultado] = useState(null)
  const [error, setError] = useState('')

  const calcularPropina = () => {
    const monto = Number(cuenta)

    if (cuenta === '' || !Number.isFinite(monto) || monto <= 0) {
      setError('Ingresa un monto válido para continuar.')
      setResultado(null)
      return
    }

    const propina = monto * (porcentaje / 100)
    const total = monto + propina

    setResultado({ propina, total })
    setError('')
  }

  const reiniciar = () => {
    setCuenta('')
    setPorcentaje(15)
    setResultado(null)
    setError('')
  }

  const formatoMoneda = (cantidad) =>
    cantidad.toLocaleString('es-HN', {
      style: 'currency',
      currency: 'HNL',
    })

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Calculadora de Propinas
          </h1>
          <p className="text-slate-500 mt-2">
            Calcula fácilmente cuánto dejar de propina.
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-slate-700 font-semibold mb-2">
            Total de la cuenta (L)
          </label>

          <input
            type="number"
            min="0"
            step="0.01"
            value={cuenta}
            onChange={(e) => {
              setCuenta(e.target.value)
              setResultado(null)
              setError('')
            }}
            placeholder="Ejemplo: 500"
            className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <p className="text-slate-700 font-semibold mb-3">
            Selecciona el porcentaje de propina
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[10, 15, 20].map((valor) => (
              <button
                key={valor}
                onClick={() => {
                  setPorcentaje(valor)
                  setResultado(null)
                }}
                className={`py-3 rounded-lg font-bold transition ${
                  porcentaje === valor
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-blue-100'
                }`}
              >
                {valor}%
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={calcularPropina}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
        >
          Calcular propina
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">
            {error}
          </p>
        )}

        {resultado !== null && (
          <div className="mt-6 bg-slate-50 rounded-xl p-5">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Resultado
            </h2>

            <div className="flex justify-between mb-3">
              <span className="text-slate-600">Monto de la cuenta:</span>
              <span className="font-semibold">
                {formatoMoneda(Number(cuenta))}
              </span>
            </div>

            <div className="flex justify-between mb-3">
              <span className="text-slate-600">
                Propina ({porcentaje}%):
              </span>
              <span className="font-semibold text-blue-600">
                {formatoMoneda(resultado.propina)}
              </span>
            </div>

            <div className="border-t border-slate-300 pt-4 mt-4 flex justify-between items-center">
              <span className="font-bold text-slate-800">
                Total a pagar:
              </span>
              <span className="text-xl font-bold text-green-600">
                {formatoMoneda(resultado.total)}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={reiniciar}
          className="w-full mt-4 border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold py-3 rounded-lg transition"
        >
          Reiniciar
        </button>

      </div>
    </main>
  )
}

export default App