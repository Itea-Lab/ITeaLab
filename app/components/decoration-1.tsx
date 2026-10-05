"use client"
import Image from "next/image"

interface TextSliderProps {
  text: string
  fontSize?: number
  speed?: number
  gap?: number
}

const TextSlider = ({ text, fontSize = 80, speed = 20, gap = 10 }: TextSliderProps) => {
  // Calculate animation duration based on speed (lower speed = slower animation)
  const animationDuration = `${speed}s`

  // Create many more instances to ensure seamless loop
  const textInstances = Array(20).fill(text)

  // Responsive font sizes
  const responsiveFontSize = {
    base: Math.max(fontSize * 0.4, 20), // Mobile: 40% of desktop, min 20px
    sm: Math.max(fontSize * 0.5, 24),   // Small: 50% of desktop, min 24px
    md: Math.max(fontSize * 0.6, 28),   // Medium: 60% of desktop, min 28px
    lg: Math.max(fontSize * 0.8, 32),   // Large: 80% of desktop, min 32px
    xl: fontSize,                       // XL and above: full size
  }

  const sliderVars = {
    "--slider-duration": animationDuration,
    "--slider-h-base": `${responsiveFontSize.base * 1.2}px`,
    "--slider-h-sm": `${responsiveFontSize.sm * 1.2}px`,
    "--slider-h-md": `${responsiveFontSize.md * 1.2}px`,
    "--slider-h-lg": `${responsiveFontSize.lg * 1.2}px`,
    "--slider-h-xl": `${fontSize * 1.2}px`,
    "--slider-fs-base": `${responsiveFontSize.base}px`,
    "--slider-fs-sm": `${responsiveFontSize.sm}px`,
    "--slider-fs-md": `${responsiveFontSize.md}px`,
    "--slider-fs-lg": `${responsiveFontSize.lg}px`,
    "--slider-fs-xl": `${fontSize}px`,
    "--slider-gap-base": `${Math.max(gap * 0.4, 4)}px`,
    "--slider-gap-sm": `${Math.max(gap * 0.5, 6)}px`,
    "--slider-gap-md": `${Math.max(gap * 0.6, 8)}px`,
    "--slider-gap-lg": `${Math.max(gap * 0.8, 12)}px`,
    "--slider-gap-xl": `${gap}px`,
  } as React.CSSProperties;

  return (
    <section className="w-full overflow-hidden" style={sliderVars}>
      {/* Left to Right */}
      <div 
        className="w-full overflow-hidden relative h-[var(--slider-h-base)] sm:h-[var(--slider-h-sm)] md:h-[var(--slider-h-md)] lg:h-[var(--slider-h-lg)] xl:h-[var(--slider-h-xl)]"
      >
        <div
          className="flex absolute whitespace-nowrap"
          style={{
            animation: `slideLeft ${animationDuration} linear infinite`,
            width: "max-content",
          }}
        >
          {textInstances.map((item, index) => (
            <span
              key={`row1-${index}`}
              className="font-bold text-dark-green flex-shrink-0 font-michroma inline-flex items-center leading-[1.2] text-[length:var(--slider-fs-base)] sm:text-[length:var(--slider-fs-sm)] md:text-[length:var(--slider-fs-md)] lg:text-[length:var(--slider-fs-lg)] xl:text-[length:var(--slider-fs-xl)] mr-[var(--slider-gap-base)] sm:mr-[var(--slider-gap-sm)] md:mr-[var(--slider-gap-md)] lg:mr-[var(--slider-gap-lg)] xl:mr-[var(--slider-gap-xl)]"
            >
              {item}
              <Image
                src='/images/icon_transparent.png'
                alt="itealab watermark"
                width={responsiveFontSize.base * 1.5}
                height={responsiveFontSize.base * 1.5}
                className="ml-4 w-[calc(var(--slider-fs-base)*1.5)] sm:w-[calc(var(--slider-fs-sm)*1.5)] md:w-[calc(var(--slider-fs-md)*1.5)] lg:w-[calc(var(--slider-fs-lg)*1.5)] xl:w-[calc(var(--slider-fs-xl)*1.5)] h-auto"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function IteaLabSlider() {
  return (
    <main className="w-full mx-auto bg-light-green py-2 sm:py-3 md:py-4">
      <TextSlider
        text="ITEA LAB"
        fontSize={40}
        speed={50}
        gap={20}
      />
      
    </main>
  )
}