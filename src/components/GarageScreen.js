import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Droplets, Filter, Wind, Disc, Gauge, Thermometer,
  Zap, RotateCw, Battery, Timer, Eye, CheckCircle2, AlertCircle,
  AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Car, Wrench,
} from 'lucide-react';
import { useVehicles } from '../contexts/VehiclesContext';
import { useGarage } from '../contexts/GarageContext';
import { screen, section, item as itemAnim, btn, backBtn } from '../utils/animations';

// ── Maintenance catalogue ─────────────────────────────────────────────────────
const ITEMS = [
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
const getProgress = (item, record, currentKm) => {
  if (!record) return null;
  const monthsAgo = (Date.now() - new Date(record.date)) / (1000 * 60 * 60 * 24 * 30.44);
  const kmSince   = currentKm && record.mileage ? currentKm - record.mileage : null;
  let p = 0;
  if (item.intervalMonths) p = Math.max(p, monthsAgo / item.intervalMonths);
  if (item.intervalKm && kmSince !== null) p = Math.max(p, kmSince / item.intervalKm);
  return Math.min(p, 2);
};

const getStatus = (item, record, currentKm) => {
  const p = getProgress(item, record, currentKm);
  if (p === null) return 'unknown';
  if (p >= 1)    return 'overdue';
  if (p >= 0.8)  return 'soon';
  return 'ok';
};

const STATUS_META = {
  overdue: { label: 'Vencido',   color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   Icon: AlertTriangle },
  soon:    { label: 'Próximo',   color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  Icon: AlertCircle   },
  ok:      { label: 'Al día',    color: '#22c55e', bg: 'rgba(34,197,94,0.12)',   Icon: CheckCircle2  },
  unknown: { label: 'Pendiente', color: '#6b7280', bg: 'rgba(107,114,128,0.12)', Icon: HelpCircle    },
};

const ORDER = ['overdue', 'soon', 'ok', 'unknown'];

const formatAgo = (dateStr) => {
  if (!dateStr) return 'Nunca registrado';
  const months = (Date.now() - new Date(dateStr)) / (1000 * 60 * 60 * 24 * 30.44);
  if (months < 1)  return 'Este mes';
  if (months < 12) return `Hace ${Math.round(months)} mes${Math.round(months) > 1 ? 'es' : ''}`;
  const yrs = Math.floor(months / 12);
  return `Hace ${yrs} año${yrs > 1 ? 's' : ''}`;
};

const today = () => new Date().toISOString().slice(0, 10);

const getNextDue = (item, record) => {
  if (!record?.date) return null;
  const kmDue   = item.intervalKm   && record.mileage ? record.mileage + item.intervalKm : null;
  const dateDue = item.intervalMonths
    ? new Date(new Date(record.date).setMonth(new Date(record.date).getMonth() + item.intervalMonths))
    : null;
  return { kmDue, dateDue };
};

const fmtDate = (d) => d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

// ── MaintenanceCard ───────────────────────────────────────────────────────────
const MaintenanceCard = ({ item, record, currentKm, onLog }) => {
  const [open, setOpen]         = useState(false);
  const [logDate, setLogDate]   = useState(today());
  const [logKm, setLogKm]       = useState(currentKm || '');
  const [logNotes, setLogNotes] = useState('');
  const [logCost, setLogCost]   = useState('');

  const status   = getStatus(item, record, currentKm);
  const progress = getProgress(item, record, currentKm);
  const meta     = STATUS_META[status];
  const { Icon } = item;
  const barW     = progress !== null ? Math.min(progress, 1) * 100 : 0;
  const barColor = status === 'overdue' ? '#ef4444' : status === 'soon' ? '#f59e0b' : '#22c55e';

  const handleSave = () => {
    onLog(item.id, { date: logDate, mileage: logKm ? Number(logKm) : null, notes: logNotes, cost: logCost ? Number(logCost) : null });
    setOpen(false);
    setLogNotes('');
    setLogCost('');
  };

  const nextDue = getNextDue(item, record);

  return (
    <motion.div layout style={{
      background: open ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)',
      border: `1px solid ${open ? meta.color + '55' : 'rgba(255,255,255,0.07)'}`,
      borderRadius: '12px', overflow: 'hidden', marginBottom: '8px',
    }}>
      {/* Row */}
      <div onClick={() => setOpen(o => !o)}
        style={{ padding: '12px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
          background: meta.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: meta.color,
        }}>
          <Icon size={18} />
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Saira Condensed, sans-serif' }}>
              {item.name}
            </span>
            <span style={{
              background: meta.bg, color: meta.color, border: `1px solid ${meta.color}44`,
              borderRadius: '20px', padding: '1px 7px', fontSize: '0.68rem', fontWeight: 700,
              fontFamily: 'Saira Condensed, sans-serif', flexShrink: 0,
            }}>
              {meta.label}
            </span>
          </div>
          <div style={{ color: '#6b7280', fontSize: '0.75rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span>{formatAgo(record?.date)}</span>
            {record?.cost ? <span style={{ color: '#a0aec0' }}>· ${record.cost.toLocaleString()}</span> : null}
          </div>
          {progress !== null && (
            <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', marginTop: '6px' }}>
              <div style={{ height: '100%', width: `${barW}%`, background: barColor, borderRadius: '2px', transition: 'width 0.4s ease' }} />
            </div>
          )}
        </div>

        <div style={{ color: '#4a5568', flexShrink: 0 }}>
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>

      {/* Expanded form */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 14px 14px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ color: '#a0aec0', fontSize: '0.8rem', margin: '10px 0 10px' }}>{item.desc}</p>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {item.intervalKm && (
                  <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', color: '#a0aec0' }}>
                    Cada {item.intervalKm.toLocaleString()} km
                  </span>
                )}
                {item.intervalMonths && (
                  <span style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', color: '#a0aec0' }}>
                    Cada {item.intervalMonths} {item.intervalMonths === 1 ? 'mes' : 'meses'}
                  </span>
                )}
              </div>

              {/* Next due info */}
              {nextDue && (
                <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '8px', padding: '8px 12px', marginBottom: '10px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  {nextDue.kmDue && (
                    <div>
                      <span style={{ color: '#6b7280', fontSize: '0.7rem', display: 'block', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Próximo km</span>
                      <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}>{nextDue.kmDue.toLocaleString()} km</span>
                      {currentKm && <span style={{ color: '#6b7280', fontSize: '0.75rem' }}> · faltan {Math.max(0, nextDue.kmDue - currentKm).toLocaleString()} km</span>}
                    </div>
                  )}
                  {nextDue.dateDue && (
                    <div>
                      <span style={{ color: '#6b7280', fontSize: '0.7rem', display: 'block', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Próxima fecha</span>
                      <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}>{fmtDate(nextDue.dateDue)}</span>
                    </div>
                  )}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <label style={{ color: '#6b7280', fontSize: '0.72rem', display: 'block', marginBottom: '4px' }}>Fecha</label>
                  <input type="date" className="input" value={logDate}
                    onChange={e => setLogDate(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '0.9rem' }} />
                </div>
                <div>
                  <label style={{ color: '#6b7280', fontSize: '0.72rem', display: 'block', marginBottom: '4px' }}>Kilometraje</label>
                  <input type="number" className="input" placeholder="ej. 52000" value={logKm}
                    onChange={e => setLogKm(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '0.9rem' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                <div>
                  <label style={{ color: '#6b7280', fontSize: '0.72rem', display: 'block', marginBottom: '4px' }}>Costo (opcional)</label>
                  <input type="number" className="input" placeholder="ej. 25000" value={logCost}
                    onChange={e => setLogCost(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '0.9rem' }} />
                </div>
                <div>
                  <label style={{ color: '#6b7280', fontSize: '0.72rem', display: 'block', marginBottom: '4px' }}>Notas</label>
                  <input type="text" className="input" placeholder="Taller, marca..." value={logNotes}
                    onChange={e => setLogNotes(e.target.value)}
                    style={{ padding: '8px 10px', fontSize: '0.9rem' }} />
                </div>
              </div>

              <motion.button className="btn" onClick={handleSave} {...btn}
                style={{ marginTop: 0, padding: '10px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> Guardar registro
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ── GarageScreen ──────────────────────────────────────────────────────────────
const GarageScreen = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { vehicles } = useVehicles();
  const { updateMileage, logMaintenance, getVehicleData } = useGarage();

  // Vehicle passed from HomeScreen, fallback to first
  const initIdx = Math.max(0, vehicles.findIndex(v => v.id === (location.state?.vehicleId || '')));
  const [editingKm, setEditingKm] = useState(false);
  const [kmInput, setKmInput]     = useState('');

  const vehicle    = vehicles[initIdx] || vehicles[0] || null;
  const vData      = vehicle ? getVehicleData(vehicle.id) : {};
  const currentKm  = vData.currentMileage || null;
  const maintenance = vData.maintenance || {};

  const handleKmSave = () => {
    if (vehicle && kmInput) updateMileage(vehicle.id, kmInput);
    setEditingKm(false);
  };

  const handleLog = (itemId, record) => logMaintenance(vehicle.id, itemId, record);

  const grouped = ITEMS.reduce((acc, item) => {
    const s = getStatus(item, maintenance[item.id], currentKm);
    (acc[s] = acc[s] || []).push(item);
    return acc;
  }, {});

  const overdue   = (grouped.overdue || []).length;
  const soon      = (grouped.soon    || []).length;
  const totalCost = Object.values(maintenance).reduce((sum, r) => sum + (r?.cost || 0), 0);

  // ── No vehicles ──
  if (vehicles.length === 0) {
    return (
      <motion.div className="container" variants={screen} initial="initial" animate="animate"
        style={{ justifyContent: 'center', alignItems: 'center', padding: '24px', textAlign: 'center' }}>
        <motion.div variants={section}>
          <Car size={48} color="#4a5568" style={{ marginBottom: '16px' }} />
          <h2 style={{ color: 'white', fontFamily: 'Saira Condensed, sans-serif', fontSize: '1.6rem', marginBottom: '8px' }}>Sin vehículos</h2>
          <p style={{ color: '#a0aec0', fontSize: '0.95rem', marginBottom: '20px' }}>
            Agrega un vehículo en Ajustes para llevar su mantenimiento.
          </p>
          <motion.button className="btn" style={{ marginTop: 0 }} {...btn} onClick={() => navigate('/')}>
            Ir al Inicio
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div className="container" variants={screen} initial="initial" animate="animate">

      {/* ── BACK ── */}
      <motion.div variants={section} style={{ padding: '16px 20px 0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.button onClick={() => navigate('/')} {...backBtn}
          style={{ background: 'none', border: 'none', color: '#a0aec0', cursor: 'pointer', fontSize: '0.9rem', padding: 0, display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Saira Condensed, sans-serif' }}>
          <ArrowLeft size={14} /> Inicio
        </motion.button>
        <span style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Saira Condensed, sans-serif' }}>
          Mi Garaje
        </span>
      </motion.div>

      {/* ── VEHICLE CARD ── */}
      <motion.div variants={section} style={{ padding: '10px 16px 0', flexShrink: 0 }}>
        <div style={{
          position: 'relative', aspectRatio: '16/9', borderRadius: '16px', overflow: 'hidden',
          backgroundImage: vehicle.photo
            ? `linear-gradient(to top right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 40%, transparent 70%), url(${vehicle.photo})`
            : 'linear-gradient(135deg, rgba(239,68,68,0.22) 0%, rgba(14,14,14,0.99) 65%)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {!vehicle.photo && (
            <div style={{ position: 'absolute', right: '-24px', bottom: '30px', color: '#ef4444', opacity: 0.06, pointerEvents: 'none' }}>
              <Car size={260} strokeWidth={0.7} />
            </div>
          )}

          <div style={{ padding: '12px 14px 0', position: 'relative', zIndex: 2 }}>
            <span style={{ color: '#ef4444', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: 'Saira Condensed, sans-serif', textShadow: '0 1px 8px rgba(0,0,0,0.9)' }}>
              Mi Garaje
            </span>
          </div>

          <div style={{ padding: '0 14px 14px', position: 'relative', zIndex: 2 }}>
            <div style={{ color: 'white', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 800, fontSize: '2.4rem', lineHeight: 0.9, letterSpacing: '-0.02em', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              {vehicle.brand}
            </div>
            <div style={{ color: '#cbd5e0', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.1, marginTop: '1px' }}>
              {vehicle.model}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginTop: '7px' }}>
              <span style={{ background: 'rgba(255,255,255,0.12)', borderRadius: '5px', padding: '2px 8px', color: '#e2e8f0', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}>
                {vehicle.year}
              </span>
              {currentKm && (
                <span style={{ background: 'rgba(239,68,68,0.18)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: '5px', padding: '2px 8px', color: '#fca5a5', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700 }}>
                  {currentKm.toLocaleString()} km
                </span>
              )}
              {vehicle.engine && <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif' }}>{vehicle.engine}</span>}
              {vehicle.fuel && <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif' }}>· {vehicle.fuel}</span>}
              {vehicle.transmission && <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif' }}>· {vehicle.transmission}</span>}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── MILEAGE + STATUS ── */}
      <motion.div variants={section} style={{ padding: '12px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: totalCost > 0 ? '1fr 1fr 1fr' : '1fr 1fr', gap: '8px' }}>
          {/* Mileage */}
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
            <p style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Kilometraje
            </p>
            {editingKm ? (
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <input autoFocus type="number" className="input" placeholder="km" value={kmInput}
                  onChange={e => setKmInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleKmSave()}
                  style={{ padding: '6px 8px', fontSize: '0.9rem', flex: 1 }} />
                <button onClick={handleKmSave}
                  style={{ background: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', padding: '6px 10px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, fontFamily: 'Saira Condensed, sans-serif' }}>
                  OK
                </button>
              </div>
            ) : (
              <div onClick={() => { setEditingKm(true); setKmInput(currentKm || ''); }} style={{ cursor: 'pointer' }}>
                <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif', margin: 0 }}>
                  {currentKm ? `${currentKm.toLocaleString()} km` : '—'}
                </p>
                <p style={{ color: '#4a5568', fontSize: '0.7rem', margin: '2px 0 0' }}>Toca para actualizar</p>
              </div>
            )}
          </div>

          {/* Total cost */}
          {totalCost > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', padding: '12px 14px' }}>
              <p style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px', fontFamily: 'Saira Condensed, sans-serif' }}>
                Invertido
              </p>
              <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif', margin: 0 }}>
                ${totalCost.toLocaleString()}
              </p>
              <p style={{ color: '#4a5568', fontSize: '0.7rem', margin: '2px 0 0' }}>total registrado</p>
            </div>
          )}

          {/* Status summary */}
          <div style={{
            background: overdue > 0 ? 'rgba(239,68,68,0.08)' : soon > 0 ? 'rgba(245,158,11,0.08)' : 'rgba(34,197,94,0.08)',
            border: `1px solid ${overdue > 0 ? 'rgba(239,68,68,0.25)' : soon > 0 ? 'rgba(245,158,11,0.25)' : 'rgba(34,197,94,0.25)'}`,
            borderRadius: '10px', padding: '12px 14px',
          }}>
            <p style={{ color: '#6b7280', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 6px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Estado
            </p>
            {overdue > 0 ? (
              <>
                <p style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif', margin: 0 }}>{overdue} vencido{overdue > 1 ? 's' : ''}</p>
                {soon > 0 && <p style={{ color: '#f59e0b', fontSize: '0.72rem', margin: '2px 0 0' }}>{soon} próximo{soon > 1 ? 's' : ''}</p>}
              </>
            ) : soon > 0 ? (
              <>
                <p style={{ color: '#f59e0b', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif', margin: 0 }}>{soon} próximo{soon > 1 ? 's' : ''}</p>
                <p style={{ color: '#22c55e', fontSize: '0.72rem', margin: '2px 0 0' }}>Resto al día</p>
              </>
            ) : (
              <>
                <p style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Saira Condensed, sans-serif', margin: 0 }}>Todo al día</p>
                <p style={{ color: '#4a5568', fontSize: '0.72rem', margin: '2px 0 0' }}>Buen trabajo</p>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── MAINTENANCE LIST ── */}
      <motion.div style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 24px', minHeight: 0 }}>
        {ORDER.filter(s => grouped[s]?.length).map(status => (
          <motion.div key={status} variants={itemAnim}>
            <p style={{ color: STATUS_META[status].color, fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '14px 0 8px', fontFamily: 'Saira Condensed, sans-serif' }}>
              {STATUS_META[status].label}
            </p>
            {grouped[status].map(item => (
              <MaintenanceCard key={item.id} item={item} record={maintenance[item.id]} currentKm={currentKm} onLog={handleLog} />
            ))}
          </motion.div>
        ))}
      </motion.div>

    </motion.div>
  );
};

export default GarageScreen;
