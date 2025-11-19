import svgPaths from "../imports/svg-2s6wwhrlcm";

export function Logo({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${className}`}
    >
      {/* Icon part - square */}
      <div
        className="relative flex-shrink-0"
        style={{ width: "40px", height: "40px" }}
      >
        <svg
          className="block size-full"
          fill="none"
          viewBox="0 0 46 46"
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            <path d={svgPaths.pb5fb00} fill="#0016DF" />
            <path d={svgPaths.p20c89280} fill="white" />
            <path d={svgPaths.p31f6ab00} fill="white" />
          </g>
        </svg>
      </div>
      {/* Text part */}
      <div
        className="relative flex-shrink-0"
        style={{ width: "120px", height: "40px" }}
      >
        <svg
          className="block size-full"
          fill="none"
          viewBox="0 0 144 45"
          preserveAspectRatio="xMidYMid meet"
        >
          <g>
            <path d={svgPaths.p3efd5500} fill="#0016DF" />
            <path d={svgPaths.pc5fdc00} fill="#0016DF" />
            <path d={svgPaths.p2fdd6580} fill="#0016DF" />
            <path d={svgPaths.p240f1600} fill="#0016DF" />
            <path d={svgPaths.p10869700} fill="#0016DF" />
            <path d={svgPaths.p3d067900} fill="#0016DF" />
          </g>
        </svg>
      </div>
    </div>
  );
}