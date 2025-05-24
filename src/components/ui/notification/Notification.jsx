// components/ui/Notification.js
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/20/solid";

const iconMap = {
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
};

const colorMap = {
  success: "green",
  warning: "yellow",
  error: "red",
};

export default function Notification({ type = "success", message, onClose }) {
  const Icon = iconMap[type];
  const color = colorMap[type];

  return (
    <div className={`rounded-md bg-${color}-50 p-4 mb-4`}>
      <div className="flex">
        <div className="shrink-0">
          <Icon className={`h-5 w-5 text-${color}-400`} />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm text-${color}-700`}>{message}</p>
        </div>
        <div className="ml-4">
          <button
            className={`text-${color}-700 hover:text-${color}-900`}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
