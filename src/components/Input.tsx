import { ChangeEvent } from "react";

export function Input({
  id,
  onChange,
  value,
  label,
  maxChars = 0,
  disabled,
  placeholder,
  errorText,
}: {
  id: string;
  value: string;
  onChange?: (e: any) => void;
  label?: string;
  errorText?: string;
  maxChars?: number;
  disabled?: boolean;
  placeholder?: string;
}) {
  const limitedOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    let changed_value = e.target.value;
    if (maxChars > 0 && changed_value.length > maxChars) {
      changed_value = changed_value.slice(0, maxChars);
    }
    e.target.value = changed_value;
    if (onChange) onChange(changed_value);
  };
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
        {maxChars > 0 && (
          <span className="label-text-alt">
            {value?.length || 0}/{maxChars}
          </span>
        )}
      </label>
      {maxChars > 30 ? (
        <textarea
          className="textarea textarea-bordered w-full placeholder-primary"
          onChange={limitedOnChange}
          id={id}
          disabled={disabled}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="input input-bordered w-full placeholder-primary"
          onChange={limitedOnChange}
          type="text"
          id={id}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
      {errorText && errorText.length > 0 && (
        <label className="label">
          <span className="label-text-alt">{errorText}</span>
        </label>
      )}
    </div>
  );
}
