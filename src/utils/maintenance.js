import {
  Droplets, Filter, Wind, Disc, Gauge, Thermometer,
  Zap, RotateCw, Battery, Timer, Eye, CheckCircle2, AlertCircle,
  AlertTriangle, HelpCircle, Wrench,
} from 'lucide-react';

// ── Maintenance catalogue ─────────────────────────────────────────────────────
export const MAINTENANCE_ITEMS = [
  { id: 'oil',           name: 'Aceite de motor',       desc: 'Lubrica y protege el motor',         Icon: Droplets,    intervalKm: 5000,  intervalMonths: 6  },
  { id: 'oil_filter',    name: 'Filtro de aceite',       desc: 'Se cambia junto con el aceite',      Icon: Filter,      intervalKm: 5000,  intervalMonths: 6  },
  { id: 'air_filter',    name: 'Filtro de aire',         desc: 'Protege el motor del polvo',         Icon: Wind,        intervalKm: 20000, intervalMonths: 24 },
  { id: 'cabin_filter',  name: 'Filtro de cabina',       desc: 'Calidad del aire en el interior',    Icon: Filter,      intervalKm: 15000, intervalMonths: 12 },
  { id: 'brakes',        name: 'Pastillas de freno',     desc: 'Inspección por desgaste',            Icon: Disc,        intervalKm: 25000, intervalMonths: null },
  { id: 'brake_fluid',   name: 'Líquido de frenos',      desc: 'Se degrada con la humedad',          Icon: Gauge,       intervalKm: null,  intervalMonths: 24 },
  { id: 'tires',         name: 'Rotación de llantas',    desc: 'Desgaste parejo en las 4 ruedas',    Icon: RotateCw,    intervalKm: 10000, intervalMonths: 12 },
  { id: 'tire_pressure', name: 'Presión de llantas',     desc: 'Revisar con el auto frío',           Icon: Gauge,       intervalKm: null,  intervalMonths: 1  },
  { id: 'coolant',       name: 'Refrigerante',           desc: 'Evita el sobrecalentamiento',        Icon: Thermometer, intervalKm: 40000, intervalMonths: 30 },
  { id: 'spark_plugs',   name: 'Bujías',                 desc: 'Encendido del motor',                Icon: Zap,         intervalKm: 30000, intervalMonths: 36 },
  { id: 'transmission',  name: 'Aceite de transmisión',  desc: 'Lubrica la caja de cambios',         Icon: Wrench,      intervalKm: 40000, intervalMonths: 36 },
  { id: 'battery',       name: 'Batería',                desc: 'Inspección y nivel de carga',        Icon: Battery,     intervalKm: null,  intervalMonths: 36 },
  { id: 'timing_belt',   name: 'Banda de distribución',  desc: 'Crítico — falla destruye el motor',  Icon: Timer,       intervalKm: 80000, intervalMonths: 60 },
  { id: 'wipers',        name: 'Limpiaparabrisas',       desc: 'Visibilidad en lluvia',              Icon: Eye,         intervalKm: null,  intervalMonths: 12 },
];

// ── Status helpers ────────────────────────────────────────────────────────────
export const getProgress = (item, record, currentKm) => {
  if (!record) return null;
  const monthsAgo = (Date.now() - new Date(record.date)) / (1000 * 60 * 60 * 24 * 30.44);
  const kmSince   = currentKm && record.mileage ? currentKm - record.mileage : null;
  let p = 0;
  if (item.intervalMonths) p = Math.max(p, monthsAgo / item.intervalMonths);
  if (item.intervalKm && kmSince !== null) p = Math.max(p, kmSince / item.intervalKm);
  return Math.min(p, 2);
};

export const getStatus = (item, record, currentKm) => {
  const p = getProgress(item, record, currentKm);
  if (p === null) return 'unknown';
  if (p >= 1)    return 'overdue';
  if (p >= 0.8)  return 'soon';
  return 'ok';
};

export const STATUS_META = {
  overdue: { label: 'Vencido',   color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   Icon: AlertTriangle },
  soon:    { label: 'Próximo',   color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  Icon: AlertCircle   },
  ok:      { label: 'Al día',    color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   Icon: CheckCircle2  },
  unknown: { label: 'Pendiente', color: '#6b7280', bg: 'rgba(107,114,128,0.12)', Icon: HelpCircle    },
};

export const ORDER = ['overdue', 'soon', 'ok', 'unknown'];

export const formatAgo = (dateStr) => {
  if (!dateStr) return 'Nunca registrado';
  const months = (Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24 * 30.44);
  if (months < 1)  return 'Este mes';
  if (months < 12) return `Hace ${Math.round(months)} mes${Math.round(months) > 1 ? 'es' : ''}`;
  const yrs = Math.floor(months / 12);
  return `Hace ${yrs} año${yrs > 1 ? 's' : ''}`;
};

export const today = () => new Date().toISOString().slice(0, 10);

export const getNextDue = (item, record) => {
  if (!record?.date) return null;
  const kmDue   = item.intervalKm   && record.mileage ? record.mileage + item.intervalKm : null;
  const dateDue = item.intervalMonths
    ? new Date(new Date(record.date).setMonth(new Date(record.date).getMonth() + item.intervalMonths))
    : null;
  return { kmDue, dateDue };
};

// ── Overall vehicle health summary (used on Home) ──────────────────────────────
const SEVERITY_RANK = { critical: 2, warning: 1, ok: 0 };

const HEALTH_META = {
  critical: { label: 'Atención urgente', color: '#ef4444', bg: 'rgba(239,68,68,0.09)'  },
  warning:  { label: 'Revisar pronto',   color: '#f59e0b', bg: 'rgba(245,158,11,0.09)' },
  ok:       { label: 'Saludable',        color: '#22c55e', bg: 'rgba(34,197,94,0.09)'  },
  unknown:  { label: 'Aún sin chequeos', color: '#6b7280', bg: 'rgba(107,114,128,0.09)' },
};

export const getHealthSummary = ({ maintenance = {}, currentKm = null, scans = [] }) => {
  let overdueCount = 0;
  let soonCount    = 0;
  let hasAnyRecord = false;

  for (const item of MAINTENANCE_ITEMS) {
    const record = maintenance[item.id];
    if (record) hasAnyRecord = true;
    const status = getStatus(item, record, currentKm);
    if (status === 'overdue') overdueCount++;
    if (status === 'soon')    soonCount++;
  }

  const worstScanSeverity = scans.reduce((worst, s) => {
    const rank = SEVERITY_RANK[s.conditionSeverity] ?? -1;
    return rank > SEVERITY_RANK[worst] ? s.conditionSeverity : worst;
  }, 'ok');

  const hasData = hasAnyRecord || currentKm != null || scans.length > 0;

  let status;
  if (overdueCount > 0 || worstScanSeverity === 'critical') status = 'critical';
  else if (soonCount > 0 || worstScanSeverity === 'warning') status = 'warning';
  else if (hasData) status = 'ok';
  else status = 'unknown';

  return {
    status,
    pendingCount: overdueCount + soonCount,
    ...HEALTH_META[status],
  };
};
