'use client';

interface AdContainerProps {
  type: 'horizontal' | 'vertical';
}

export const AdContainer = ({ type }: AdContainerProps) => {
  return (
    <div 
      className={`
        ad-container 
        ${type === 'horizontal' 
          ? 'w-full max-w-screen-xl mx-auto px-4' 
          : 'w-[160px] h-[600px] mx-4'}
      `}
    >
      {/* AdSense 代码将在这里插入 */}
      <div className={`
        w-full h-full 
        ${type === 'horizontal' ? 'min-h-[90px]' : 'min-h-[600px]'}
        bg-neutral-100 rounded 
        flex items-center justify-center 
        text-neutral-400
      `}>
        广告位
      </div>
    </div>
  );
}; 