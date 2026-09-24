import React from 'react';
import styles from './AnimatedHero.module.css';

export default function AnimatedHero() {
  return (
    <div className={styles.scene}>
      <div className={styles.orbits}>
        <div className={`${styles.orbitRing} ${styles.orbitRing1}`}>
          <div className={`${styles.orbitDot} ${styles.orbitDotViolet}`}></div>
        </div>
        <div className={`${styles.orbitRing} ${styles.orbitRing2}`}>
          <div className={`${styles.orbitDot} ${styles.orbitDotCyan}`}></div>
        </div>
      </div>

      <div className={styles.cubeWrap}>
        <div className={styles.cube}>
          <div className={`${styles.cubeFace} ${styles.cubeFront}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeBack}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeRight}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeLeft}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeTop}`}></div>
          <div className={`${styles.cubeFace} ${styles.cubeBottom}`}></div>
          {/* Centered pulse core inside the cube */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={styles.cubeCore}></div>
          </div>
        </div>
      </div>

      {/* Floating Status Pills */}
      <div className={`${styles.pill} ${styles.pillTop}`}>
        <div className={`${styles.pillDot} ${styles.pillToneCyan}`}></div>
        <span>AI Engine Active</span>
      </div>
      
      <div className={`${styles.pill} ${styles.pillLeft}`}>
        <div className={`${styles.pillDot} ${styles.pillToneViolet}`}></div>
        <span>Data Processing</span>
      </div>

      <div className={`${styles.pill} ${styles.pillRight}`}>
        <div className={`${styles.pillDot} ${styles.pillToneMint}`}></div>
        <span>Real-time</span>
      </div>
    </div>
  );
}
