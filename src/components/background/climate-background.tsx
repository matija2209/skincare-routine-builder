import   { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ClimateBackground = ({ climateType }: { climateType: "ARID" | "HUMID" | "URBAN" }) => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const particleCount = climateType === "ARID" ? 100 : climateType === "HUMID" ? 80 : 60;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (climateType === "HUMID" ? 2 : 3) + 1,
    }));
    setParticles(newParticles);
  }, [climateType]);

  const renderUrbanBackground = () => (
    <g>
      <defs>
        <linearGradient id="urbanGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(220, 14%, 15%)" />
          <stop offset="100%" stopColor="hsl(220, 14%, 25%)" />
        </linearGradient>
        <filter id="urbanMist">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#urbanGradient)" />
      {particles.map((particle) => (
        <motion.rect
          key={particle.id}
          x={`${particle.x}%`}
          y={`${particle.y}%`}
          width={particle.size/2}
          height={particle.size*4}
          fill="hsl(220, 14%, 35%)"
          opacity="0.1"
          initial={{ y: particle.y }}
          animate={{
            y: [particle.y, particle.y - 20, particle.y],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      <motion.rect
        width="100%"
        height="100%"
        fill="hsla(220, 14%, 50%, 0.05)"
        filter="url(#urbanMist)"
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </g>
  );

  const renderAridBackground = () => (
    <g>
      <defs>
        <linearGradient id="aridGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#aridGradient)" />
      
      {/* Rolling Hills */}
      <path d="M0 70 Q15 50 30 70 T60 70 Q75 55 90 70 L100 70 L100 100 L0 100 Z" fill="#EAB308" opacity="0.4"/>
      <path d="M0 80 Q20 60 40 80 T80 80 Q90 65 100 80 L100 100 L0 100 Z" fill="#D97706" opacity="0.6"/>
      <path d="M0 85 Q25 70 50 85 T100 85 L100 100 L0 100 Z" fill="#B45309" opacity="0.8"/>
      
      {/* Wind particles */}
      {particles.map((particle) => (
        <motion.path
          key={particle.id}
          d={`M${particle.x} ${particle.y} q${10 + particle.size} ${-particle.size} ${20 + particle.size*2} ${-particle.size}`}
          stroke="#FDE68A"
          strokeWidth={particle.size/2}
          opacity="0.3"
          initial={{ x: -10 }}
          animate={{
            x: [0, 100],
            opacity: [0.3, 0],
          }}
          transition={{
            delay: Math.random() * 2,
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </g>
  );

  const renderHumidBackground = () => (
    <g>
      <defs>
        <linearGradient id="humidGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(210, 60%, 25%)" />
          <stop offset="100%" stopColor="hsl(210, 60%, 15%)" />
        </linearGradient>
        <radialGradient id="raindropGradient">
          <stop offset="0%" stopColor="hsl(210, 80%, 60%)" />
          <stop offset="100%" stopColor="hsl(210, 80%, 40%)" />
        </radialGradient>
      </defs>
      
      <rect width="100%" height="100%" fill="url(#humidGradient)" />
      
      {particles.map((particle) => (
        <g key={particle.id}>
          <motion.line
            x1={particle.x}
            y1={particle.y}
            x2={particle.x + particle.size/2}
            y2={particle.y + particle.size*2}
            stroke="url(#raindropGradient)"
            strokeWidth={particle.size/3}
            opacity="0.6"
            initial={{ y: -20 }}
            animate={{
              y: [particle.y, particle.y + 120],
              opacity: [0.6, 0],
            }}
            transition={{
              delay: Math.random(),
              duration: 1.5 + Math.random(),
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.circle
            cx={particle.x + particle.size/2}
            cy={particle.y + 120}
            r={particle.size/2}
            fill="url(#raindropGradient)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1.5, 2],
            }}
            transition={{
              duration: 0.5,
              delay: 1 + Math.random(),
              repeat: Infinity,
              times: [0, 0.5, 1]
            }}
          />
        </g>
      ))}
      
      <motion.rect
        width="100%"
        height="100%"
        fill="hsla(210, 50%, 80%, 0.05)"
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </g>
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {climateType === "URBAN" && renderUrbanBackground()}
        {climateType === "ARID" && renderAridBackground()}
        {climateType === "HUMID" && renderHumidBackground()}
      </svg>
    </div>
  );
};

export default ClimateBackground;