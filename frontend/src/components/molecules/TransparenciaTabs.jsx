import React, { useRef, useState, useMemo, useCallback, Suspense, lazy } from "react";

// Carga diferida de los componentes de Chart
const Pie = lazy(() => import("react-chartjs-2").then(m => ({ default: m.Pie })));
const Line = lazy(() => import("react-chartjs-2").then(m => ({ default: m.Line })));

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);


export default function TabFinanzas() {
  const chartRef = useRef(null);
  const [showDetails, setShowDetails] = useState(true);

  // Memoiza configuraciones para charts y CSV
  const pieData = useMemo(() => ({
    labels: [
      "Donaciones privadas (25%)",
      "Subvenciones gubernamentales (25%)",
      "Entradas (30%)",
      "Educación (15%)",
      "Otros (5%)"
    ],
    datasets: [{
      data: [25, 25, 30, 15, 5],
      backgroundColor: ["#ec4899","#3b82f6","#10b981","#f59e0b","#6366f1"],
      borderWidth: 1
    }]
  }), []);

  const lineData = useMemo(() => ({
    labels: ["2019","2020","2021","2022","2023"],
    datasets: [{
      label: "Presupuesto Anual (M€)",
      data: [307,346,380,420,450],
      borderColor: "#14b8a6",
      backgroundColor: "rgba(20,184,166,0.1)",
      tension: 0.4,
      fill: true
    }]
  }), []);

  const indicadores = useMemo(() => [
    { label: "Presupuesto Total", vals: ["380M€","420M€","450M€"], var: "+18.4%" },
    { label: "Donaciones", vals: ["120M€","145M€","158M€"], var: "+31.7%" },
    { label: "Proyectos", vals: [15,18,22], var: "+46.7%" },
    { label: "Beneficiarios", vals: [12500,15800,18200], var: "+45.6%" },
    { label: "Transparencia", vals: ["8.7/10","9.2/10","9.8/10"], var: "+12.6%" },
  ], []);

  const exportCSV = useCallback(() => {
    const header = ["Indicador","2021","2022","2023","Variación"];
    const rows = indicadores.map(({ label, vals, var: variacion }) => [label, ...vals, variacion]);
    const csvContent = [header, ...rows]
      .map(r => r.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "indicadores_financieros.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  }, [indicadores]);


   return (
    <section className="grid gap-8 p-6 md:grid-cols-2">
      {/* Gráfica de pastel */}
      <article className="bg-white border rounded-xl shadow-lg p-6 flex flex-col">
        <header>
          <h2 className="text-2xl text-teal-700 mb-2">Fuentes de Financiamiento</h2>
          <p className="text-gray-600 mb-4">
            Principales fuentes de ingresos para nuestras iniciativas.
          </p>
        </header>

        <div className="flex justify-center" role="img" aria-label="Distribución de fuentes de financiamiento">
          <Suspense fallback={<div className="py-16">Cargando gráfico…</div>}>
            <Pie data={pieData} />
          </Suspense>
        </div>

        <section aria-labelledby="gastos-programa" className="mt-8 space-y-4">
          <h3 id="gastos-programa" className="text-xl font-semibold">Gastos por Programa</h3>
          {/* Barra de progreso */}
          {[
            { label: "Conservación", value: 40, color: "bg-teal-600" },
            { label: "Investigación", value: 25, color: "bg-blue-600" },
            { label: "Educación", value: 20, color: "bg-green-600" },
            { label: "Administración", value: 10, color: "bg-yellow-500" },
            { label: "Recaudación", value: 5, color: "bg-purple-500" }
          ].map(({ label, value, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm text-gray-700">
                <span>{label}</span>
                <span>{value}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded mt-1">
                <div
                  className={`${color} h-2 rounded`}
                  style={{ width: `${value}%` }}
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Carga completada al 59%"
                  role="progressbar"
                />
              </div>
            </div>
          ))}
        </section>
      </article>

      {/* Gráfica de línea y tabla */}
      <article className="bg-white border rounded-xl shadow-lg p-6 flex flex-col">
        <header>
          <h2 className="text-2xl text-teal-700 mb-2">Evolución del Presupuesto</h2>
          <p className="text-gray-600 mb-4">
            Crecimiento presupuestario anual desde 2019.
          </p>
        </header>

        <div className="mb-6">
          <Suspense fallback={<div className="py-16">Cargando gráfico…</div>}>
            <Line ref={chartRef} data={lineData} height={200} />
          </Suspense>
        </div>

        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div>
            <h3 className="text-xl font-semibold text-teal-700">Indicadores Clave</h3>
            <p className="text-gray-600 text-sm">Monitoreo de resultados institucionales.</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowDetails(prev => !prev)}
              aria-expanded={showDetails}
              aria-controls="tabla-indicadores"
              className="px-4 py-2 text-sm border rounded-lg bg-gray-100 hover:bg-gray-200 transition"
            >
              {showDetails ? "Ocultar Detalles" : "Mostrar Detalles"}
            </button>
            <button
              onClick={exportCSV}
              className="px-4 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
            >
              Exportar CSV
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="overflow-x-auto">
            <table
              id="tabla-indicadores"
              className="w-full text-sm text-left border rounded-lg"
            >
              <caption className="sr-only">Valores de indicadores 2021–2023</caption>
              <thead className="bg-teal-100 text-teal-700">
                <tr>
                  <th scope="col" className="px-4 py-2">Indicador</th>
                  <th scope="col" className="px-4 py-2">2021</th>
                  <th scope="col" className="px-4 py-2">2022</th>
                  <th scope="col" className="px-4 py-2">2023</th>
                  <th scope="col" className="px-4 py-2">Variación</th>
                </tr>
              </thead>
              <tbody>
                {indicadores.map(({ label, vals, var: variacion }, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{label}</td>
                    {vals.map((v, k) => (
                      <td key={k} className="px-4 py-2">{v}</td>
                    ))}
                    <td className="px-4 py-2 text-green-600 font-semibold">{variacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </article>
    </section>
  );
}
