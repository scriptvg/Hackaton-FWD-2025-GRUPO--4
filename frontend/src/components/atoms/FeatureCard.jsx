import React from "react";

// FeatureCard component displays an icon, title, and description with optional click behavior
function FeatureCard({ icon, title, description, onClick }) {
  return (
    <div
      className={`
        bg-gray-50 dark:bg-[var(--card)]
        rounded-lg p-6
        border-1  hover:dark:border-[#2AB5B0]
        shadow-[0_8px_30px_rgba(0,0,0,0.15)] dark:shadow-none
        hover:-translate-y-1.5 transition-all duration-300
        flex-1
        ${onClick ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#125E5C] dark:focus-within:ring-offset-[var(--background)]" : ""}
      `}
      onClick={onClick}
      role={onClick ? "button" : "group"}
      tabIndex={onClick ? 0 : -1}
      aria-label={title}
    >
      <div className="flex flex-col items-start">
        {/* Icon container with custom color and accessible contrast */}
        {icon && (
          <div
            className="rounded-lg mb-4"
            aria-hidden="true"
          >
            {icon}
          </div>
        )}

        {/* Title and description */}
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-[var(--foreground)] mb-2.5">
            {title}
          </h3>
          <div className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCard;
