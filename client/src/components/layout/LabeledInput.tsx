
interface LabeledInputProps {
    label: string;
    placeholder: string;
    id: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function LabeledInput({
    label,
    placeholder,
    id,
    type = "text",
    required = false,
    value,
    onChange,
} : LabeledInputProps) {
  return (
    <div>
      <div className="mb-2 block">
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
        </label>
      </div>
      <input id={id} type={type} placeholder={placeholder} required={required} value={value} onChange={onChange} className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
    </div>
  );
}
