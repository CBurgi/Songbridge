import { RefObject, useEffect, useRef, useState } from "react"
import { TextSpan } from "typescript"

type ScrollTextParams = {
  id: string;
  text: string;
  classes: string;
}
export default function ScrollText(
  {
    id,
    text,
    classes
  }: ScrollTextParams
) {
  const spanRef: RefObject<any> = useRef(null)
  const containerRef: RefObject<any> = useRef(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [duration, setDuration] = useState(10)

  useEffect(() => {
    if (spanRef.current && containerRef.current) {
      const isExceeding = (
        spanRef.current.scrollWidth
        > containerRef.current.clientWidth
      )
      setIsOverflowing(isExceeding)
    }

    const speed = 40;
    setDuration(spanRef.current.scrollWidth / speed)
  }, [text])

  const baseClasses = `w-fit block whitespace-nowrap ${classes}`

  return (
    <>
      <style>{`
        @keyframes scroll-${id} {
          20% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div id={id} className="w-full overflow-hidden" ref={containerRef}>
        <span className={baseClasses} ref={spanRef} style={{
          animation: isOverflowing ? `scroll-${id} ${duration}s linear infinite` : 'none'
        }}>
          {text} {isOverflowing && ` • ${text} • `}
        </span>
      </div>
    </>
  )
}
