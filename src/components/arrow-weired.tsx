// From Skiper UI's Skiper29; points down by default, rotate it for other directions
const ArrowWeired = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      width="100%"
      className={className}
    >
      <path
        fill="currentColor"
        d="M69.022 85.363c16.693-13.32 20.658-33.261 20.16-43.736H77.95c0 17.454-11.106 29.106-20.543 35.517-4.676 3.177-10.818 2.998-15.414-.293-17.124-12.264-19.958-27.753-18.988-35.224H10.305c0 20.438 9.697 34.444 20.244 43.16 11.033 9.118 27.285 9.503 38.473.576Z"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M56.016 5v79.243H43.56V5h12.455Z"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

export { ArrowWeired }
