import Image from 'next/image';
import logoPic from '@/public/logo.png';

export function IridescentButterfly({ size = 44 }: { size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Image
        src={logoPic}
        alt="Sitrezhuthu Logo"
        width={size}
        height={size}
        style={{
          width: '100%', height: '100%',
          objectFit: 'contain',
          position: 'relative', zIndex: 1,
        }}
      />
    </div>
  );
}
