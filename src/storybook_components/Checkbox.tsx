import Value from "../interfaces/Value";

export default function Checkbox({
  className,
  value,
  src,
  img = false,
  onClick,
  checked,
  labelActive = false,
}: Value) {
  return (
    <>
      {labelActive ? (
        <label
          className={`checkbox-container ${className ? className : ""}`}
          htmlFor={value}
        >
          <span className="ml-2 h-auto">
            {img ? <img className="max-h-80" src={src} alt={value} /> : value}
          </span>
          <input
            type="checkbox"
            id={value}
            name={value}
            onClick={onClick}
            defaultChecked={checked}
          />
          <span className="checkbox top-1"></span>
        </label>
      ) : (
        <div className={`flex items-center m-2 ${className ? className : ""}`}>
          <label className="checkbox-container mb-[14px]" htmlFor={value}>
            <input
              type="checkbox"
              id={value}
              name={value}
              onClick={onClick}
              defaultChecked={checked}
            />
            <span className="checkbox"></span>
          </label>
          <span className="ml-2 h-auto">
            {img ? <img className="max-h-80" src={src} alt={value} /> : value}
          </span>
        </div>
      )}
    </>
  );
}
