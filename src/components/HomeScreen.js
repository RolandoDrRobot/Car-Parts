import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Car, ScanLine, Disc, Gauge, Layers, Zap, Filter,
  Thermometer, Wind, RotateCw, Wrench,
  AlertTriangle, Stethoscope, ChevronLeft, ChevronRight, Plus,
} from 'lucide-react';
import { useVehicles } from '../contexts/VehiclesContext';
import { useHistory } from '../contexts/HistoryContext';
import { useGarage } from '../contexts/GarageContext';
import SettingsDrawer from './SettingsDrawer';
import { screen, section, sectionStagger, item, btn, scanBtn } from '../utils/animations';
import { getHealthSummary } from '../utils/maintenance';

const CATEGORY_ICONS = {
  frenos: <Disc size={18} />, motor: <Gauge size={18} />, 'suspensión': <Layers size={18} />,
  eléctrico: <Zap size={18} />, filtros: <Filter size={18} />, carrocería: <Car size={18} />,
  enfriamiento: <Thermometer size={18} />, escape: <Wind size={18} />,
  'transmisión': <RotateCw size={18} />, otro: <Wrench size={18} />,
};

const TabButton = ({ icon, label, onClick }) => (
  <motion.button onClick={onClick} whileTap={{ scale: 0.9 }} whileHover={{ color: '#e2e8f0' }}
    style={{
      background: 'none', border: 'none', cursor: 'pointer', flex: 1,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
      color: '#a0aec0', padding: '6px 4px', fontFamily: 'Saira Condensed, sans-serif',
    }}>
    {icon}
    <span style={{ fontSize: '0.64rem', fontWeight: 600, letterSpacing: '0.01em' }}>{label}</span>
  </motion.button>
);

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.28, ease: [0.25, 0.1, 0.25, 1] } },
  exit: (dir) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0, transition: { duration: 0.2 } }),
};

const HomeScreen = () => {
  const navigate = useNavigate();
  const { vehicles } = useVehicles();
  const { history } = useHistory();
  const { getVehicleData } = useGarage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const safeIndex       = vehicles.length > 0 ? Math.min(carouselIndex, vehicles.length - 1) : 0;
  const selectedVehicle = vehicles[safeIndex] || null;
  const vehicleHistory  = selectedVehicle
    ? history.filter(s => s.vehicle?.id === selectedVehicle.id)
    : [];

  const vData  = selectedVehicle ? getVehicleData(selectedVehicle.id) : {};
  const health = selectedVehicle
    ? getHealthSummary({ maintenance: vData.maintenance || {}, currentKm: vData.currentMileage || null, scans: vehicleHistory })
    : null;

  const goTo = (dir) => {
    setDirection(dir);
    setCarouselIndex(i => (i + dir + vehicles.length) % vehicles.length);
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });

  return (
    <motion.div className="container" variants={screen} initial="initial" animate="animate">

      {/* ── VEHICLE CAROUSEL ── */}
      {vehicles.length > 0 && (
        <motion.div variants={section} style={{ padding: '18px 16px 0', flexShrink: 0 }}>

          {/* Card — tap to open garage */}
          <div
            onClick={() => navigate('/garage', { state: { vehicleId: selectedVehicle?.id } })}
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              borderRadius: '16px', overflow: 'hidden',
              cursor: 'pointer',
            }}>

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={safeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter" animate="center" exit="exit"
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: selectedVehicle.photo
                    ? `linear-gradient(to top right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 40%, transparent 70%), url(${selectedVehicle.photo})`
                    : 'linear-gradient(135deg, rgba(239,68,68,0.22) 0%, rgba(14,14,14,0.99) 65%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '16px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                  overflow: 'hidden',
                }}
              >
                {/* Watermark (only when no photo) */}
                {!selectedVehicle.photo && (
                  <div style={{
                    position: 'absolute', right: '-24px', bottom: '36px',
                    color: '#ef4444', opacity: 0.06, pointerEvents: 'none',
                  }}>
                    <Car size={300} strokeWidth={0.7} />
                  </div>
                )}

                {/* Top bar: label + dots + add */}
                <div style={{
                  padding: '12px 14px 0',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  position: 'relative', zIndex: 2,
                }}>
                  <span style={{
                    color: '#ef4444', fontSize: '0.65rem', fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.14em',
                    fontFamily: 'Saira Condensed, sans-serif',
                    textShadow: '0 1px 8px rgba(0,0,0,0.9)',
                  }}>
                    Mi Vehículo {vehicles.length > 1 ? `${safeIndex + 1} / ${vehicles.length}` : ''}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {vehicles.length > 1 && vehicles.map((_, i) => (
                      <button key={i}
                        onClick={(e) => { e.stopPropagation(); setDirection(i > safeIndex ? 1 : -1); setCarouselIndex(i); }}
                        style={{
                          width: i === safeIndex ? '16px' : '5px', height: '5px',
                          borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0,
                          background: i === safeIndex ? '#ef4444' : 'rgba(255,255,255,0.4)',
                          transition: 'width 0.2s ease, background 0.2s ease',
                        }} />
                    ))}
                    <button onClick={(e) => { e.stopPropagation(); setDrawerOpen(true); }}
                      style={{
                        background: 'rgba(255,255,255,0.12)', border: '2px dashed rgba(255,255,255,0.28)',
                        borderRadius: '4px', padding: '2px 8px', cursor: 'pointer',
                        color: 'rgba(255,255,255,0.65)', fontSize: '0.65rem',
                        fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '3px',
                      }}>
                      <Plus size={9} /> Agregar
                    </button>
                  </div>
                </div>

                {/* Bottom info */}
                <div style={{ padding: '0 14px 14px', position: 'relative', zIndex: 2 }}>
                  <div style={{
                    color: 'white', fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 800, fontSize: '2.4rem', lineHeight: 0.9,
                    letterSpacing: '-0.02em',
                    textShadow: '0 2px 20px rgba(0,0,0,0.8)',
                  }}>
                    {selectedVehicle.brand}
                  </div>
                  <div style={{
                    color: '#cbd5e0', fontFamily: 'Saira Condensed, sans-serif',
                    fontWeight: 600, fontSize: '1.15rem', lineHeight: 1.1, marginTop: '1px',
                  }}>
                    {selectedVehicle.model}
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center', marginTop: '7px' }}>
                    <span style={{
                      background: 'rgba(255,255,255,0.12)', borderRadius: '5px',
                      padding: '2px 8px', color: '#e2e8f0', fontSize: '0.75rem',
                      fontFamily: 'Saira Condensed, sans-serif', fontWeight: 700,
                    }}>
                      {selectedVehicle.year}
                    </span>
                    {selectedVehicle.color && (
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                        {selectedVehicle.color}
                      </span>
                    )}
                    {selectedVehicle.engine && (
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                        · {selectedVehicle.engine}
                      </span>
                    )}
                    {selectedVehicle.fuel && (
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                        · {selectedVehicle.fuel}
                      </span>
                    )}
                    {selectedVehicle.transmission && (
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', fontFamily: 'Saira Condensed, sans-serif' }}>
                        · {selectedVehicle.transmission}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Left arrow */}
            {vehicles.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); goTo(-1); }}
                style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: '52px',
                  background: 'linear-gradient(to right, rgba(0,0,0,0.42), transparent)',
                  border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                  paddingLeft: '10px', zIndex: 10, borderRadius: '4px',
                }}>
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Right arrow */}
            {vehicles.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); goTo(1); }}
                style={{
                  position: 'absolute', right: 0, top: 0, bottom: 0, width: '52px',
                  background: 'linear-gradient(to left, rgba(0,0,0,0.42), transparent)',
                  border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.65)',
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                  paddingRight: '10px', zIndex: 10, borderRadius: '4px',
                }}>
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* ── HEALTH STATUS ── */}
      {selectedVehicle && health && (
        <motion.div variants={section} style={{ padding: '10px 16px 0', flexShrink: 0 }}>
          <div
            onClick={() => navigate('/garage', { state: { vehicleId: selectedVehicle.id } })}
            style={{
              background: health.bg,
              border: `1px solid ${health.color}33`,
              borderRadius: '12px', padding: '12px 14px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '10px', cursor: 'pointer',
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: 0 }}>
              <span
                className={health.status === 'critical' || health.status === 'warning' ? 'pulse-animation' : ''}
                style={{
                  width: '9px', height: '9px', borderRadius: '50%', flexShrink: 0,
                  background: health.color, boxShadow: `0 0 8px ${health.color}`,
                }} />
              <span style={{
                color: health.color, fontWeight: 700, fontSize: '0.95rem',
                fontFamily: 'Saira Condensed, sans-serif', letterSpacing: '0.01em',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>
                {health.label}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span key={`${health.status}-${health.pendingCount}`}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                style={{
                  color: '#a0aec0', fontSize: '0.78rem', fontFamily: 'Saira Condensed, sans-serif',
                  flexShrink: 0, textAlign: 'right',
                }}>
                {health.status === 'unknown'
                  ? 'Registra tu kilometraje en Mi Garaje'
                  : health.pendingCount > 0
                    ? `${health.pendingCount} chequeo${health.pendingCount > 1 ? 's' : ''} pendiente${health.pendingCount > 1 ? 's' : ''}`
                    : 'Todo en orden'}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── NO VEHICLE YET ── */}
      {vehicles.length === 0 && (
        <motion.div variants={section} style={{ padding: '18px 20px 0', flexShrink: 0 }}>
          <motion.button className="btn btn-secondary"
            onClick={() => setDrawerOpen(true)} {...btn}
            style={{ marginTop: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Plus size={16} /> Agregar Vehículo
          </motion.button>
        </motion.div>
      )}

      {/* ── HISTORY ── */}
      <motion.div variants={sectionStagger}
        style={{ flex: 1, overflowY: 'auto', padding: '20px', minHeight: 0 }}>
        {vehicleHistory.length > 0 ? (
          <>
            <p style={{ color: '#6b7280', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 10px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Historial Médico
            </p>
            {vehicleHistory.map(scan => {
              const severityColor = scan.conditionSeverity === 'critical' ? '#ef4444' : scan.conditionSeverity === 'warning' ? '#f59e0b' : '#22c55e';
              return (
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
                  background: 'rgba(255,255,255,0.04)',
                  borderTop: '2px solid rgba(255,255,255,0.07)',
                  borderRight: '2px solid rgba(255,255,255,0.07)',
                  borderBottom: '2px solid rgba(255,255,255,0.07)',
                  borderLeft: `3px solid ${severityColor}`,
                  borderRadius: '4px', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  marginBottom: '8px', cursor: 'pointer', width: '100%', textAlign: 'left',
                }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
                  background: `${severityColor}14`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: severityColor,
                }}>
                  {CATEGORY_ICONS[scan.partCategory] || <Wrench size={16} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Saira Condensed, sans-serif', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '0.01em' }}>
                    {scan.partName}
                  </div>
                  <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '1px' }}>
                    {formatDate(scan.date)}{scan.vehicle ? ` · ${scan.vehicle.brand} ${scan.vehicle.model}` : ''}
                  </div>
                </div>
                <ChevronRight size={14} color="#4a5568" style={{ flexShrink: 0 }} />
              </motion.button>
              );
            })}
          </>
        ) : (
          <motion.div variants={item}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#4a5568', textAlign: 'center', gap: '8px' }}>
            <ScanLine size={40} color="#4a5568" />
            <p style={{ fontFamily: 'Saira Condensed, sans-serif', fontSize: '1rem', margin: 0, color: '#4a5568' }}>
              {selectedVehicle ? `Sin chequeos para ${selectedVehicle.brand} ${selectedVehicle.model}` : 'Agrega un vehículo para empezar'}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* ── BOTTOM BAR ── */}
      <motion.div variants={section} style={{
        flexShrink: 0, position: 'relative', zIndex: 5,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(10,10,10,0.82)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end',
          padding: '8px 6px calc(8px + env(safe-area-inset-bottom))',
        }}>
          <TabButton icon={<Settings size={21} />} label="Ajustes" onClick={() => setDrawerOpen(true)} />
          <TabButton icon={<Stethoscope size={21} />} label="Síntomas"
            onClick={() => navigate('/symptoms', { state: { vehicle: selectedVehicle } })} />

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <motion.button
              onClick={() => navigate('/scan', { state: { vehicle: selectedVehicle } })}
              {...scanBtn}
              aria-label="Escanear pieza"
              style={{
                width: '56px', height: '56px', marginTop: '-18px', flexShrink: 0,
                borderRadius: '4px',
                background: 'linear-gradient(160deg, #f05252 0%, #dc2626 55%, #b91c1c 100%)',
                border: 'none', borderBottom: '2px solid rgba(0,0,0,0.25)',
                boxShadow: '0 4px 20px rgba(239,68,68,0.4), inset 0 1px 0 rgba(255,255,255,0.14)',
                color: 'white', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              <ScanLine size={25} />
            </motion.button>
          </div>

          <TabButton icon={<AlertTriangle size={21} />} label="Luz"
            onClick={() => navigate('/scan', { state: { vehicle: selectedVehicle, mode: 'lights' } })} />
        </div>
      </motion.div>

      <SettingsDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </motion.div>
  );
};

export default HomeScreen;
