import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, Car, ScanLine, Disc, Gauge, Layers, Zap, Filter,
  Thermometer, Wind, RotateCw, Wrench,
  AlertTriangle, Stethoscope, ChevronLeft, ChevronRight, Plus,
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
        <motion.div variants={section} style={{ padding: '10px 16px 0', flexShrink: 0 }}>

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
                          borderRadius: '3px', border: 'none', cursor: 'pointer', padding: 0,
                          background: i === safeIndex ? '#ef4444' : 'rgba(255,255,255,0.4)',
                          transition: 'width 0.2s ease, background 0.2s ease',
                        }} />
                    ))}
                    <button onClick={(e) => { e.stopPropagation(); setDrawerOpen(true); }}
                      style={{
                        background: 'rgba(255,255,255,0.12)', border: '1px dashed rgba(255,255,255,0.28)',
                        borderRadius: '5px', padding: '2px 8px', cursor: 'pointer',
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
                  paddingLeft: '10px', zIndex: 10, borderRadius: '16px 0 0 16px',
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
                  paddingRight: '10px', zIndex: 10, borderRadius: '0 16px 16px 0',
                }}>
                <ChevronRight size={24} />
              </button>
            )}
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
            <p style={{ color: '#6b7280', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 10px', fontFamily: 'Saira Condensed, sans-serif' }}>
              Escaneos Recientes
            </p>
            {history.map(scan => {
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
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderLeft: `3px solid ${severityColor}`,
                  borderRadius: '12px', padding: '12px 14px',
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
                  <div style={{ color: '#4a5568', fontSize: '0.73rem', marginTop: '1px' }}>
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
