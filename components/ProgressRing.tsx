
type Props = {
  value: number;
  max: number;
  color: string;
  label: string;
  valueLabel: string;
};

export default function ProgressRing({ value, max, color, label, valueLabel }: Props) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const r = 38;
  const c = 2 * Math.PI * r;
  const dash = c - (pct / 100) * c;

  return (
    <div className="ringCard">
      <div className="ringWrap">
        <svg viewBox="0 0 100 100" className="ringSvg">
          <circle cx="50" cy="50" r={r} className="ringBg" />
          <circle
            cx="50" cy="50" r={r}
            className="ringFg"
            stroke={color}
            strokeDasharray={c}
            strokeDashoffset={dash}
          />
        </svg>
        <div className="ringCenter">
          <strong>{valueLabel}</strong>
        </div>
      </div>
      <span className="ringLabel">{label}</span>
    </div>
  );
}
