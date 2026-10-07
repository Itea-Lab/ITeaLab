"use client"
import Image from "next/image"

interface TextSliderProps {
  text?: string
  items?: string[]
  fontSize?: number
  speed?: number
  gap?: number
}

const TextSlider = ({
  text,
  items,
  fontSize = 80,
  speed = 20,
  gap = 10,
}: TextSliderProps) => {
  // Calculate animation duration based on speed (lower speed = slower animation)
  const animationDuration = `${speed}s`

  const sliderItems = items ?? (text ? [text] : ["ITEA LAB", "WHERE TECH MEETS ITS QUALI-TEA"])

  // Repeat sequence an even number of times so first half (-50%) matches second half seamlessly
  const repeatCount = Math.max(4, Math.ceil(20 / sliderItems.length))
  const evenRepeatCount = repeatCount % 2 === 0 ? repeatCount : repeatCount + 1
  const textInstances = Array.from(
    { length: evenRepeatCount * sliderItems.length },
    (_, i) => sliderItems[i % sliderItems.length]
  )

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
    "--slider-h-base": `${responsiveFontSize.base * 1.8}px`,
    "--slider-h-sm": `${responsiveFontSize.sm * 1.8}px`,
    "--slider-h-md": `${responsiveFontSize.md * 1.8}px`,
    "--slider-h-lg": `${responsiveFontSize.lg * 1.8}px`,
    "--slider-h-xl": `${fontSize * 1.8}px`,
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
        className="w-full overflow-hidden relative flex items-center h-[var(--slider-h-base)] sm:h-[var(--slider-h-sm)] md:h-[var(--slider-h-md)] lg:h-[var(--slider-h-lg)] xl:h-[var(--slider-h-xl)]"
      >
        <div
          className="flex absolute inset-y-0 items-center whitespace-nowrap"
          style={{
            animation: `slideLeft ${animationDuration} linear infinite`,
            width: "max-content",
          }}
        >
          {textInstances.map((item, index) => (
            <span
              key={`row1-${index}`}
              className="font-bold text-dark-green flex-shrink-0 font-michroma uppercase inline-flex items-center leading-normal text-[length:var(--slider-fs-base)] sm:text-[length:var(--slider-fs-sm)] md:text-[length:var(--slider-fs-md)] lg:text-[length:var(--slider-fs-lg)] xl:text-[length:var(--slider-fs-xl)] mr-[var(--slider-gap-base)] sm:mr-[var(--slider-gap-sm)] md:mr-[var(--slider-gap-md)] lg:mr-[var(--slider-gap-lg)] xl:mr-[var(--slider-gap-xl)] py-2"
            >
              {item}
              <Image
                src='/images/icon_transparent.png'
                alt="itealab watermark"
                width={60}
                height={60}
                className="ml-4 w-[calc(var(--slider-fs-base)*1.25)] sm:w-[calc(var(--slider-fs-sm)*1.25)] md:w-[calc(var(--slider-fs-md)*1.25)] lg:w-[calc(var(--slider-fs-lg)*1.25)] xl:w-[calc(var(--slider-fs-xl)*1.25)] h-auto object-contain flex-shrink-0"
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
    <main className="w-full mx-auto bg-light-green py-6 sm:py-8 md:py-10 relative z-10">
      <TextSlider
        items={["ITEA LAB", "WHERE TECH MEETS ITS QUALI-TEA"]}
        fontSize={40}
        speed={50}
        gap={20}
      />
      
    </main>
  )
}