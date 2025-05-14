"use client"

import { useState, useRef, useEffect } from "react"

const PriceRangeSlider = ({
  min = 0,
  max = 5000000,
  step = 100000,
  initialMin = 200000,
  initialMax = 3000000,
  formatPrice = (price) => `Rp ${price.toLocaleString("id-ID")}`,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(initialMin)
  const [maxValue, setMaxValue] = useState(initialMax)
  const [isDragging, setIsDragging] = useState(null)

  const trackRef = useRef(null)
  const minHandleRef = useRef(null)
  const maxHandleRef = useRef(null)

  // Calculate percentage for positioning
  const getPercent = (value) => {
    return Math.round(((value - min) / (max - min)) * 100)
  }

  // Update the width of the progress bar
  const updateProgressBar = () => {
    if (trackRef.current) {
      const minPercent = getPercent(minValue)
      const maxPercent = getPercent(maxValue)

      trackRef.current.style.left = `${minPercent}%`
      trackRef.current.style.width = `${maxPercent - minPercent}%`
    }
  }

  // Handle min value change
  const handleMinChange = (e) => {
    const newMinValue = Math.min(Math.max(Number.parseInt(e.target.value), min), maxValue - step)
    setMinValue(newMinValue)
    onChange && onChange([newMinValue, maxValue])
  }

  // Handle max value change
  const handleMaxChange = (e) => {
    const newMaxValue = Math.max(Math.min(Number.parseInt(e.target.value), max), minValue + step)
    setMaxValue(newMaxValue)
    onChange && onChange([minValue, newMaxValue])
  }

  // Mouse/Touch event handlers
  const handleMouseDown = (e, handle) => {
    e.preventDefault()
    setIsDragging(handle)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return

    const trackRect = trackRef.current.parentElement.getBoundingClientRect()
    const trackWidth = trackRect.width
    const trackLeft = trackRect.left

    // Get position (mouse or touch)
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0

    // Calculate position as percentage
    let position = (clientX - trackLeft) / trackWidth
    position = Math.max(0, Math.min(position, 1))

    // Calculate value based on position
    const newValue = Math.round((position * (max - min) + min) / step) * step

    if (isDragging === "min") {
      const updatedMin = Math.min(newValue, maxValue - step)
      setMinValue(updatedMin)
      onChange && onChange([updatedMin, maxValue])
    } else if (isDragging === "max") {
      const updatedMax = Math.max(newValue, minValue + step)
      setMaxValue(updatedMax)
      onChange && onChange([minValue, updatedMax])
    }
  }

  const handleMouseUp = () => {
    setIsDragging(null)
  }

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchmove", handleMouseMove)
      document.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleMouseMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging, minValue, maxValue])

  // Update progress bar when values change
  useEffect(() => {
    updateProgressBar()
  }, [minValue, maxValue])

  return (
    <div className="w-full px-1 py-4">
      <div className="relative h-12">
        {/* Background track */}
        <div className="absolute h-1 w-full bg-gray-200 rounded-full top-5"></div>

        {/* Active track */}
        <div ref={trackRef} className="absolute h-1 bg-primary rounded-full top-5"></div>

        {/* Min handle */}
        <div
          ref={minHandleRef}
          className={`absolute w-5 h-5 bg-white border-2 border-primary rounded-full top-3 -ml-2.5 flex items-center justify-center cursor-pointer shadow-md ${isDragging === "min" ? "ring-2 ring-primary ring-opacity-50" : ""}`}
          style={{ left: `${getPercent(minValue)}%` }}
          onMouseDown={(e) => handleMouseDown(e, "min")}
          onTouchStart={(e) => handleMouseDown(e, "min")}
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>

        {/* Max handle */}
        <div
          ref={maxHandleRef}
          className={`absolute w-5 h-5 bg-white border-2 border-primary rounded-full top-3 -ml-2.5 flex items-center justify-center cursor-pointer shadow-md ${isDragging === "max" ? "ring-2 ring-primary ring-opacity-50" : ""}`}
          style={{ left: `${getPercent(maxValue)}%` }}
          onMouseDown={(e) => handleMouseDown(e, "max")}
          onTouchStart={(e) => handleMouseDown(e, "max")}
        >
          <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
        </div>
      </div>

      {/* Price display */}
      <div className="flex items-center justify-between mt-4">
        <div className="px-3 py-1 bg-white rounded-md border text-sm">{formatPrice(minValue)}</div>
        <div className="px-3 py-1 bg-white rounded-md border text-sm">{formatPrice(maxValue)}</div>
      </div>

      {/* Hidden inputs for form submission if needed */}
      <input type="hidden" name="min-price" value={minValue} />
      <input type="hidden" name="max-price" value={maxValue} />
    </div>
  )
}

export default PriceRangeSlider
