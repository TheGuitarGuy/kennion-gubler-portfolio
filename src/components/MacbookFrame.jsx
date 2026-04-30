import { motion } from 'framer-motion'

export default function MacbookFrame({ src, alt, style, compact = false, isInView = true }) {
  const shellRadius = compact ? '18px' : '22px'
  const bezelTop = compact ? '16px' : '22px'
  const bezelSide = compact ? '8px' : '12px'
  const bezelBottom = compact ? '4px' : '6px'
  const cameraSize = compact ? '5px' : '6px'
  const notchWidth = compact ? '54px' : '74px'
  const notchHeight = compact ? '10px' : '14px'
  const baseHeight = compact ? '16px' : '20px'

  return (
    <div style={{ width: '100%', perspective: '1500px', filter: 'drop-shadow(0 30px 50px rgba(15,23,42,0.24)) drop-shadow(0 12px 20px rgba(15,23,42,0.16))', ...style }}>
      <motion.div 
        initial={{ rotateX: -90 }}
        animate={{ rotateX: isInView ? 0 : -90 }}
        transition={{ type: 'spring', stiffness: 45, damping: 14, delay: 0.3 }}
        style={{
          position: 'relative',
          borderRadius: `${shellRadius} ${shellRadius} 10px 10px`,
          padding: `${bezelTop} ${bezelSide} ${bezelBottom}`,
          background: 'linear-gradient(180deg, #101114 0%, #040506 28%, #000000 100%)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 8px rgba(0,0,0,0.6)',
          transformOrigin: 'bottom center',
          transformStyle: 'preserve-3d',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: notchWidth,
          height: notchHeight,
          borderRadius: `0 0 ${compact ? '8px' : '10px'} ${compact ? '8px' : '10px'}`,
          background: 'linear-gradient(180deg, #050607 0%, #000000 100%)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.03)',
          zIndex: 3,
        }}>
          <div style={{
            position: 'absolute',
            top: compact ? '3px' : '4px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: cameraSize,
            height: cameraSize,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #506079 0%, #18212f 35%, #06070b 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
          }} />
        </div>

        <div style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          borderRadius: 0,
          overflow: 'hidden',
          background: '#000000',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.03)',
          lineHeight: 0,
          fontSize: 0,
        }}>
          <img src={src} alt={alt} style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center top',
            transformOrigin: 'top center',
            transform: compact ? 'scaleX(1.005) scaleY(1.11)' : 'scaleX(1.005) scaleY(1.12)',
            background: '#000000',
          }} />

          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(145deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 24%, rgba(255,255,255,0.01) 42%, transparent 60%)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }} />
        </div>

        <div style={{
          position: 'absolute',
          left: bezelSide,
          right: bezelSide,
          bottom: 0,
          height: compact ? '6px' : '8px',
          borderRadius: '0 0 8px 8px',
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.34) 100%)',
          pointerEvents: 'none',
        }} />
      </motion.div>

      <div style={{
        height: baseHeight,
        margin: `${compact ? '-1px' : '-2px'} -5.5% 0`,
        borderRadius: `0 0 ${compact ? '10px' : '12px'} ${compact ? '10px' : '12px'}`,
        position: 'relative',
        background: 'linear-gradient(180deg, #cfd4da 0%, #c2c7ce 32%, #adb4bc 72%, #989fa8 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.7), 0 8px 12px rgba(15,23,42,0.12)',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '1px',
          background: 'rgba(255,255,255,0.55)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0,
          left: '50%', transform: 'translateX(-50%)',
          width: compact ? '30%' : '28%',
          height: compact ? '3px' : '4px',
          background: 'linear-gradient(180deg, #a5abb3 0%, #8a9098 100%)',
          borderRadius: '0 0 999px 999px',
        }} />
      </div>
    </div>
  )
}
