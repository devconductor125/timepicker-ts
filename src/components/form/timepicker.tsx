import { useEffect, useRef, useState } from "react"

interface Props {
  placeholder: string
  defaultValue?: string
  className?: string
  onChange: (value: string) => void
}

const TimePicker: React.FC<Props> = ({ placeholder, defaultValue, className, onChange }) => {
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false)
  const [defaultHour, setDefaultHour] = useState<number>(8)
  const [defaultMinute, setDefaultMinute] = useState<number>(29)
  const [defaultPeriod, setDefaultPeriod] = useState<string>("PM")

  const [selectedHour, setSelectedHour] = useState<number>(8)
  const [selectedMinute, setSelectedMinute] = useState<number>(29)
  const [selectedPeriod, setSelectedPeriod] = useState<string>("PM")
  const [timestring, setTimestring] = useState<string>()

  useEffect(() => {
    setTimestring(selectedHour + ":" + (selectedMinute < 10 ? "0" + selectedMinute : selectedMinute) + " " + selectedPeriod)
  }, [selectedHour, selectedMinute, selectedPeriod])


  useEffect(() => {
    if (selectedHour && selectedMinute && selectedPeriod) {
      setDefaultHour(selectedHour)
      setDefaultMinute(selectedMinute)
      setDefaultPeriod(selectedPeriod)
    }

  }, [timestring])

  return (
    <div onClick={() => { setShowTimePicker(!showTimePicker) }} className={`relative flex flex-row justify-between bg-[#2A2A2A] p-2 rounded ${showTimePicker && "border border-white "}`}>
      <p className={`${typeof (timestring) == 'undefined' ? "text-secondary" : "text-white"}`}>{typeof (timestring) == 'undefined' ? placeholder : timestring}</p>
      <img src="/chevron.svg" className={`transition-all ${showTimePicker ? "-rotate-90" : "rotate-90"}`} />

      {showTimePicker && (
        <div className="absolute shadow-lg -bottom-2 translate-y-full left-0 right-0 bg-[#2A2A2A] rounded flex flex-row p-2 overflow-clip z-50">
          <TimePickerSection
            type={TimePickerSectionType.Hour}
            onChange={(value) => {
              setSelectedHour(parseInt(value));
            }}
            defaultValue={(defaultHour < 10 ? "0" : "") + defaultHour.toString()}
          />
          <p className="my-auto">:</p>
          <TimePickerSection
            type={TimePickerSectionType.Minute}
            onChange={(value) => { setSelectedMinute(parseInt(value)) }}
            defaultValue={(defaultMinute < 10 ? "0" : "") + defaultMinute.toString()}
          />
          <p className="my-auto">:</p>
          <TimePickerSection
            type={TimePickerSectionType.Period}
            onChange={(value) => { setSelectedPeriod(value) }}
            defaultValue={defaultPeriod}
          />
        </div>
      )}
    </div>
  )
}

enum TimePickerSectionType {
  Hour,
  Minute,
  Period
}

interface TimePickerSectionProps {
  type: TimePickerSectionType
  onChange: (value: string) => void
  defaultValue: string
}

const TimePickerSection: React.FC<TimePickerSectionProps> = ({ type, onChange, defaultValue }) => {

  const [values, setValues] = useState<Array<string>>([])
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [selectedValue, setSelectedValue] = useState<string>("06")
  const [dragStartOffset, setDragStartOffset] = useState(0);
  const [previousDragTime, setPreviousDragTime] = useState(0)
  const velocity = useRef(0);
  const componentRef = useRef(null)
  const previousDrag = useRef(0)
  const currentDrag = useRef(0)
  const closestValueLocation = useRef(0)
  const [lastAnimationTime, setLastAnimationTime] = useState(0);

  const animationRef = useRef(0);

  const itemOffset = 50
  const velocityFalloff = 0.2
  const snapThreshold = 0.5 //Velocity where it switches to snapping
  const scrollSpeed = 0.02
  const animateThreshold = 0.005 //Velocity where it stops the animation
  const snapStrength = 100 //Larger number = weaker snap

  function handleTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    setDragStartOffset(e.targetTouches[0].clientY - currentDrag.current)
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animateScroll);
    e.stopPropagation()
  }

  function handleTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    previousDrag.current = currentDrag.current
    setPreviousDragTime(Date.now())
    currentDrag.current = e.targetTouches[0].clientY - dragStartOffset
    let dy = currentDrag.current - previousDrag.current
    let dt = Date.now() - previousDragTime
    let newVelocity = (dy / dt)
    if (newVelocity < 0.01) {
      velocity.current = newVelocity
    }
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animateScroll);
    e.stopPropagation()
  }

  const animateScroll = () => {
    if (lastAnimationTime == 0) setLastAnimationTime(Date.now())
    setLastAnimationTime(Date.now());

    // Update scroll position based on velocity
    currentDrag.current = currentDrag.current + velocity.current
    let newDrag = currentDrag.current + velocity.current

    // Gradually reduce velocity to simulate slowing down
    velocity.current = velocity.current * Math.exp(-velocityFalloff * (Date.now() - previousDragTime) / 1000)

    // Snap to closest value if velocity is negligible
    if (Math.abs(velocity.current) < snapThreshold) {
      closestValueLocation.current = Math.round(newDrag / itemOffset) * (itemOffset)
      const newIndex = Math.abs(Math.round((currentDrag.current) / itemOffset) - 1)
      if (selectedIndex != newIndex) {
        setSelectedIndex(newIndex)
      }
      let dist = newDrag - closestValueLocation.current
      if (dist == 0) return
      velocity.current = Math.pow(dist, 2) / snapStrength
      if (dist > 0) velocity.current = -velocity.current
    }

    // Continue animation until velocity becomes negligible
    if (Math.abs(velocity.current) > animateThreshold) {
      animationRef.current = requestAnimationFrame(animateScroll);
    }

    if (Math.round(newDrag / itemOffset) * itemOffset > itemOffset) {
      if (velocity.current > 0) velocity.current = -2
    } else if (Math.abs((Math.round(newDrag / itemOffset) * itemOffset - itemOffset)) / values.length >= itemOffset) {
      if (velocity.current < 0) velocity.current = 2
    }
  };

  function handleScroll(e: React.WheelEvent<HTMLDivElement>) {
    setPreviousDragTime(Date.now())
    velocity.current += scrollSpeed * e.deltaY
    cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animateScroll);
    e.stopPropagation()
  }

  // Trigger animation when velocity changes
  useEffect(() => {
    animationRef.current = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(animationRef.current);
  }, [dragStartOffset]);

  useEffect(() => {
    if (type == TimePickerSectionType.Hour) {
      let tmp = []
      for (let i = 1; i <= 12; i++) {
        tmp.push(i.toString().padStart(2, '0'))
      }
      setValues(tmp)
    } else if (type == TimePickerSectionType.Minute) {
      let tmp = []
      for (let i = 0; i <= 59; i++) {
        tmp.push(i.toString().padStart(2, '0'))
      }
      setValues(tmp)
    } else if (type == TimePickerSectionType.Period) {
      let tmp = ["AM", "PM"]
      setValues(tmp)
    }
  }, [type])

  useEffect(() => {
    setSelectedValue(values[selectedIndex])
  }, [selectedIndex, values])

  useEffect(() => {
    onChange(selectedValue)
    if (selectedValue) {
      switch (type) {
        case 0:
          currentDrag.current = (parseInt(selectedValue) - 2) * itemOffset * -1;
          break;
        case 1:
          currentDrag.current = (parseInt(selectedValue) - 1) * itemOffset * -1;
          break;
        case 2:
          currentDrag.current = (selectedValue == "AM" ? -1 : 0) * itemOffset * -1
          break;
      }
    }

  }, [selectedValue])

  useEffect(() => {
    const changeValue = async () => {
      if (defaultValue) {
        setSelectedIndex(values.indexOf(defaultValue))
      }
    }
    changeValue();
  }, [values, defaultValue])

  return (
    <div className={`relative h-32 w-full timepicker-container`} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onWheel={handleScroll} ref={componentRef}>
      {values.map((value, index) => {
        return (
          <p key={index} className={`${Math.abs(((index - 1) * itemOffset) + currentDrag.current) < itemOffset / 2 ? "text-white text-xl font-bold" : "text-secondary font-normal"} font-normal absolute left-1/2 -translate-x-1/2 timepicker-selector`} style={{ top: `${(index * itemOffset) + currentDrag.current}px` }}>{value}</p>
        )
      })}
    </div>
  )
}

export default TimePicker