import * as Select from "@radix-ui/react-select"

const ChevronDown = () => {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

const ThermometerSVG = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 256 512"
      className="h-4 w-4 group-hover:fill-yellow-500 group-data-[value='temperature']:h-7 group-data-[value='temperature']:w-7 group-data-[value='temperature']:fill-yellow-500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M224 96c0-53.019-42.981-96-96-96S32 42.981 32 96v203.347C12.225 321.756.166 351.136.002 383.333c-.359 70.303 56.787 128.176 127.089 128.664.299.002.61.003.909.003 70.698 0 128-57.304 128-128 0-32.459-12.088-62.09-32-84.653V96zm-96 368l-.576-.002c-43.86-.304-79.647-36.544-79.423-80.42.173-33.98 19.266-51.652 31.999-66.08V96c0-26.467 21.533-48 48-48s48 21.533 48 48v221.498c12.63 14.312 32 32.164 32 66.502 0 44.112-35.888 80-80 80zm64-80c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-23.685 12.876-44.349 32-55.417V96c0-17.673 14.327-32 32-32s32 14.327 32 32v232.583c19.124 11.068 32 31.732 32 55.417z"></path>
    </svg>
  )
}

const FeelsLikeSVG = () => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 256 512"
      className="h-4 w-4 group-hover:fill-green-500 group-data-[value='feelsLike']:h-7 group-data-[value='feelsLike']:w-7 group-data-[value='feelsLike']:fill-green-500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M192 384c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64zm32-84.653c19.912 22.563 32 52.194 32 84.653 0 70.696-57.303 128-128 128-.299 0-.609-.001-.909-.003C56.789 511.509-.357 453.636.002 383.333.166 351.135 12.225 321.755 32 299.347V96c0-53.019 42.981-96 96-96s96 42.981 96 96v203.347zM208 384c0-34.339-19.37-52.19-32-66.502V96c0-26.467-21.533-48-48-48S80 69.533 80 96v221.498c-12.732 14.428-31.825 32.1-31.999 66.08-.224 43.876 35.563 80.116 79.423 80.42L128 464c44.112 0 80-35.888 80-80z"></path>
    </svg>
  )
}
const DropSVG = () => {
  return (
    <svg
      className="w-4 group-hover:fill-blue-600 group-data-[value='precipProb']:w-7 group-data-[value='precipProb']:fill-blue-600"
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M406.043 316c24.11 96.443-50.59 180-150 180s-174.405-82.38-150-180c15-60 90-150 150-300 60 150 135 240 150 300z"></path>
    </svg>
  )
}

const CloudSVG = () => {
  return (
    <svg
      className="w-4 group-hover:fill-[#697180] group-data-[value='cloudCover']:w-7 group-data-[value='cloudCover']:fill-[#697180]"
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M396 432H136c-36.44 0-70.36-12.57-95.51-35.41C14.38 372.88 0 340 0 304c0-36.58 13.39-68.12 38.72-91.22 19.93-18.19 47.12-30.56 77.38-35.37a156.42 156.42 0 0 1 45.22-63.61C187.76 91.69 220.5 80 256 80a153.57 153.57 0 0 1 107.14 42.9c27.06 26.06 44.59 61.28 51.11 102.46C463.56 232.66 512 266.15 512 328c0 33.39-12.24 60.78-35.41 79.23C456.23 423.43 428.37 432 396 432z"></path>
    </svg>
  )
}

const EyeSVG = () => {
  return (
    <svg
      className="w-4 group-hover:fill-[#5c9aff] group-data-[value='visibility']:w-7 group-data-[value='visibility']:fill-[#5c9aff]"
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="256" cy="256" r="64"></circle>
      <path d="M394.82 141.18C351.1 111.2 304.31 96 255.76 96c-43.69 0-86.28 13-126.59 38.48C88.52 160.23 48.67 207 16 256c26.42 44 62.56 89.24 100.2 115.18C159.38 400.92 206.33 416 255.76 416c49 0 95.85-15.07 139.3-44.79C433.31 345 469.71 299.82 496 256c-26.38-43.43-62.9-88.56-101.18-114.82zM256 352a96 96 0 1 1 96-96 96.11 96.11 0 0 1-96 96z"></path>
    </svg>
  )
}

const CircleSVG = () => {
  return (
    <svg
      className="w-4 group-hover:fill-amber-500 group-data-[value='uv']:w-7 group-data-[value='uv']:fill-amber-500"
      stroke="currentColor"
      fill="currentColor"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="256" cy="256" r="256"></circle>
    </svg>
  )
}

const className = {
  item: "flex group items-center gap-2 py-1 hover:bg-accent px-2 outline-none text-base text-muted-foreground hover:text-foreground rounded cursor-pointer",
}

export default function ViewSelector({
  currentView,
  setCurrentView,
}: {
  currentView: string
  setCurrentView: (view: string) => void
}) {
  return (
    <Select.Root value={currentView} onValueChange={setCurrentView}>
      <Select.Trigger
        data-value={currentView}
        className="group flex items-center justify-center gap-2 rounded-lg py-2 pl-1 pr-4 text-2xl font-medium leading-none outline-none"
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" className="rounded-lg border bg-card p-1.5">
          <Select.Viewport>
            <Select.Item className={className.item} value="temperature">
              <Select.ItemText>
                <span className="flex items-center gap-2">
                  <ThermometerSVG />
                  Temperature
                </span>
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={className.item} value="feelsLike">
              <Select.ItemText>
                <span className="flex items-center gap-2">
                  <FeelsLikeSVG />
                  Feels like
                </span>
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={className.item} value="precipProb">
              <Select.ItemText>
                <span className="flex items-center gap-2">
                  <DropSVG />
                  Precipitation %
                </span>
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={className.item} value="cloudCover">
              <Select.ItemText>
                <span className="flex items-center gap-2">
                  <CloudSVG />
                  Cloud cover
                </span>
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={className.item} value="visibility">
              <Select.ItemText>
                <span className="flex items-center gap-2">
                  <EyeSVG />
                  Visibility
                </span>
              </Select.ItemText>
            </Select.Item>
            <Select.Item className={className.item} value="uv">
              <Select.ItemText>
                <span className="flex items-center gap-2">
                  <CircleSVG />
                  UV Index
                </span>
              </Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
