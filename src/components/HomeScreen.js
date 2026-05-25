import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Car, ScanLine, Disc, Gauge, Layers, Zap, Filter,
  Thermometer, Wind, RotateCw, Wrench, CheckCircle2, AlertCircle,
  AlertTriangle, Hammer, Stethoscope, ChevronLeft, ChevronRight, Plus,
} from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useVehicles } from '../contexts/VehiclesContext';
import { useHistory } from '../contexts/HistoryContext';
import SettingsDrawer from './SettingsDrawer';
import { screen, section, sectionStagger, item, btn, scanBtn, gearBtn } from '../utils/animations';

const COUNTRY_NAMES = {
  CR: 'Costa Rica', MX: 'México', CO: 'Colombia',
  AR: 'Argentina',  CL: 'Chile',  US: 'Estados Unidos',
};

const SEVERITY_ICONS = {
  ok:       <CheckCircle2 size={10} color="#22c55e" />,
  warning:  <AlertCircle size={10} color="#f59e0b" />,
  critical: <AlertTriangle size={10} color="#ef4444" />,
};

const CATEGORY_ICONS = {
  frenos: <Disc size={18} />, motor: <Gauge size={18} />, 'suspensión': <Layers size={18} />,
  eléctrico: <Zap size={18} />, filtros: <Filter size={18} />, carrocería: <Car size={18} />,
  enfriamiento: <Thermometer size={18} />, escape: <Wind size={18} />,
  'transmisión': <RotateCw size={18} />, otro: <Wrench size={18} />,
};

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.2 } }),
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { vehicles } = useVehicles();
  const { history } = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const safeIndex     = vehicles.length > 0 ? Math.min(carouselIndex, vehicles.length - 1) : 0;
  const selectedVehicle = vehicles[safeIndex] || null;

  const goTo = (dir) => {
    setDirection(dir);
    setCarouselIndex(i => (i + dir + vehicles.length) % vehicles.length);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });

  return (
    <motion.div className="container" variants={screen} initial="initial" animate="animate">

      {/* ── HEADER ── */}
      <motion.div variants={section} style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: '#a0aec0', margin: 0, fontSize: '1rem', fontFamily: 'Saira Condensed, sans-serif' }}>
            {COUNTRY_NAMES[settings.country] || 'Sin país'}
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {vehicles.length > 0 && (
              <motion.button
                onClick={() => navigate('/garage', { state: { vehicleId: selectedVehicle?.id } })}
                aria-label="Mi Garaje" {...gearBtn}
                style={{
                  background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '20px',
                  height: '44px', padding: '0 14px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  color: '#a0aec0', fontFamily: 'Saira Condensed, sans-serif',
                  fontWeight: 700, fontSize: '0.9rem', flexShrink: 0,
                }}>
                <Hammer size={16} /> Mi Garaje
              </motion.button>
            )}
            <motion.button onClick={() => setDrawerOpen(true)} aria-label="Abrir ajustes" {...gearBtn}
              style={{
                background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: '50%',
                width: '44px', height: '44px', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: '#a0aec0',
              }}>
              <Settings size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ── VEHICLE CAROUSEL ── */}
      {vehicles.length > 0 && (
        <motion.div variants={section} style={{ padding: '14px 20px 0', flexShrink: 0 }}>

          {/* Card */}
          <div style={{ position: 'relative', height: '158px', borderRadius: '16px', overflow: 'hidden' }}>

            {/* Animated card content */}
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={safeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position: 'absolute', inset: 0,
                  background: selectedVehicle.photo
                    ? `linear-gradient(120deg, rgba(239,68,68,0.55) 0%, rgba(0,0,0,0.82) 50%), url(${selectedVehicle.photo})`
                    : 'linear-gradient(120deg, rgba(239,68,68,0.18) 0%, rgba(20,20,20,0.97) 55%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid rgba(239,68,68,0.25)',
                  borderRadius: '16px',
                  padding: '18px 20px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                {/* Background watermark car */}
                <div style={{
                  position: 'absolute', right: '-18px', top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#ef4444', opacity: 0.07, pointerEvents: 'none',
                }}>
                  <Car size={180} strokeWidth={1} />
                </div>

                {/* Top row: label + status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{
                    color: '#ef4444', fontSize: '0.65rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    fontFamily: 'Saira Condensed, sans-serif',
                  }}>
                    Mi Vehículo {vehicles.length > 1 ? `${safeIndex + 1}/${vehicles.length}` : ''}
                  </span>
                  {selectedVehicle.color && (
                    <span style={{ color: '#6b7280', fontSize: '0.72rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                      {selectedVehicle.color}
                    </span>
                  )}
                </div>

                {/* Main info */}
                <div>
                  <div style={{
                    color: 'white', fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 800, fontSize: '2.2rem', lineHeight: 1, letterSpacing: '-0.01em',
                    textShadow: '0 2px 20px rgba(239,68,68,0.3)',
                  }}>
                    {selectedVehicle.brand}
                  </div>
                  <div style={{
                    color: '#cbd5e0', fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.1, marginTop: '1px',
                  }}>
                    {selectedVehicle.model}
                  </div>
                </div>

                {/* Bottom row: year / details */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{
                    background: 'rgba(255,255,255,0.08)', borderRadius: '6px',
                    padding: '2px 8px', color: '#a0aec0', fontSize: '0.78rem',
                    fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700,
                  }}>
                    {selectedVehicle.year}
                  </span>
                  {selectedVehicle.engine && (
                    <span style={{ color: '#6b7280', fontSize: '0.78rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                      {selectedVehicle.engine}
                    </span>
                  )}
                  {selectedVehicle.fuel && (
                    <span style={{ color: '#6b7280', fontSize: '0.78rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                      · {selectedVehicle.fuel}
                    </span>
                  )}
                  {selectedVehicle.transmission && (
                    <span style={{ color: '#6b7280', fontSize: '0.78rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                      · {selectedVehicle.transmission}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left arrow */}
            {vehicles.length > 1 && (
              <button onClick={() => goTo(-1)}
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: '40px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.5), transparent)',
                  border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                  paddingLeft: '6px', zIndex: 10, borderRadius: '16px 0 0 16px',
                }}>
                <ChevronLeft size={20} />
              </button>
            )}

            {/* Right arrow */}
            {vehicles.length > 1 && (
              <button onClick={() => goTo(1)}
                style={{
                  position: 'absolute', right: 0, top: 0, bottom: 0, width: '40px',
                  background: 'linear-gradient(to left, rgba(0,0,0,0.5), transparent)',
                  border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                  paddingRight: '6px', zIndex: 10, borderRadius: '0 16px 16px 0',
                }}>
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          {/* Dots + add button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '10px' }}>
            {vehicles.length > 1 && vehicles.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > safeIndex ? 1 : -1); setCarouselIndex(i); }}
                style={{
                  width: i === safeIndex ? '18px' : '6px', height: '6px',
                  borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0,
                  background: i === safeIndex ? '#ef4444' : 'rgba(255,255,255,0.2)',
                  transition: 'width 0.2s ease, background 0.2s ease',
                }} />
            ))}
            <button onClick={() => setDrawerOpen(true)}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px dashed rgba(255,255,255,0.15)',
                borderRadius: '6px', padding: '2px 8px', cursor: 'pointer',
                color: '#6b7280', fontSize: '0.72rem', fontFamily: 'Saira Condensed, sans-serif',
                fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px',
                marginLeft: vehicles.length > 1 ? '4px' : 0,
              }}>
              <Plus size={10} /> Agregar
            </button>
          </div>
        </motion.div>
      )}

      {/* ── ACTIONS ── */}
      <motion.div variants={section} style={{ padding: '14px 20px 0', flexShrink: 0 }}>
        <motion.button className="btn"
          onClick={() => navigate('/scan', { state: { vehicle: selectedVehicle } })}
          {...scanBtn}
          style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <ScanLine size={18} /> Escanear Pieza
        </motion.button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '8px' }}>
          <motion.button className="btn btn-secondary"
            onClick={() => navigate('/symptoms', { state: { vehicle: selectedVehicle } })}
            {...btn}
            style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Stethoscope size={16} /> Describir Problema
          </motion.button>
          <motion.button className="btn btn-secondary"
            onClick={() => navigate('/scan', { state: { vehicle: selectedVehicle, mode: 'lights' } })}
            {...btn}
            style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> Luz de Tablero
          </motion.button>
        </div>

        {vehicles.length === 0 && (
          <motion.button className="btn btn-secondary"
            onClick={() => setDrawerOpen(true)} {...btn}
            style={{ marginTop: '8px' }}>
            + Agregar Vehículo
          </motion.button>
        )}
      </motion.div>

      {/* ── HISTORY ── */}
      <motion.div variants={sectionStagger}
        style={{ flex: 1, overflowY: 'auto', padding: '20px', minHeight: 0 }}>
        {history.length > 0 ? (
          <>
            <p style={{ color: '#a0aec0', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Escaneos Recientes
            </p>
            {history.map(scan => (
              <motion.button key={scan.id} variants={item}
                onClick={() => navigate('/results', {
                  state: {
                    fromHistory: true,
                    vehicle: scan.vehicle || null,
                    result: {
                      isCarPart: true,
                      type: scan.type || 'scan',
                      partName: scan.partName,
                      partCategory: scan.partCategory,
                      conditionSeverity: scan.conditionSeverity,
                      searchQuery: scan.searchQuery,
                      description: scan.description || null,
                      recommendedAction: scan.recommendedAction || null,
                      causes: scan.causes || null,
                      canDrive: scan.canDrive ?? null,
                    },
                  },
                })}
                style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '10px', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  marginBottom: '8px', cursor: 'pointer', width: '100%', textAlign: 'left',
                }}>
                <span style={{ flexShrink: 0, color: '#a0aec0', display: 'flex' }}>
                  {CATEGORY_ICONS[scan.partCategory] || <Wrench size={18} />}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Saira Condensed, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {scan.partName}
                  </div>
                  <div style={{ color: '#4a5568', fontSize: '0.75rem' }}>
                    {formatDate(scan.date)}{scan.vehicle ? ` · ${scan.vehicle.brand} ${scan.vehicle.model}` : ''}
                  </div>
                </div>
                <span style={{ flexShrink: 0, display: 'flex' }}>
                  {SEVERITY_ICONS[scan.conditionSeverity] || <AlertCircle size={10} color="#a0aec0" />}
                </span>
              </motion.button>
            ))}
          </>
        ) : (
          <motion.div variants={item}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4a5568', textAlign: 'center', gap: '8px' }}>
            <ScanLine size={40} color="#4a5568" />
            <p style={{ fontFamily: 'Saira Condensed, sans-serif', fontSize: '1rem', margin: 0, color: '#4a5568' }}>
              Tus escaneos aparecerán aquí
            </p>
          </motion.div>
        )}
      </motion.div>

      <SettingsDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </motion.div>
  );
};

export default HomeScreen;
