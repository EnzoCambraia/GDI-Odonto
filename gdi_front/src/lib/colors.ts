// Configuração de cores do projeto
export const themeColors = {
  primary: {
    light: "#3b82f6", // blue-500
    dark: "#1d4ed8", // blue-700
    hover: "#2563eb", // blue-600
  },
  secondary: {
    light: "#8b5cf6", // violet-500
    dark: "#7c3aed", // violet-600
    hover: "#7c3aed", // violet-600
  },
  accent: {
    light: "#f59e0b", // amber-500
    dark: "#d97706", // amber-600
    hover: "#f59e0b", // amber-500
  },
  success: {
    light: "#10b981", // emerald-500
    dark: "#059669", // emerald-600
    hover: "#059669", // emerald-600
  },
  warning: {
    light: "#f59e0b", // amber-500
    dark: "#d97706", // amber-600
    hover: "#f59e0b", // amber-500
  },
  error: {
    light: "#ef4444", // red-500
    dark: "#dc2626", // red-600
    hover: "#dc2626", // red-600
  },
  sidebar: {
    background: {
      light: "#ffffff",
      dark: "#1f2937", // gray-800
    },
    text: {
      light: "#374151", // gray-700
      dark: "#f9fafb", // gray-50
    },
    hover: {
      light: "#f3f4f6", // gray-100
      dark: "#374151", // gray-700
    },
    active: {
      light: "#dbeafe", // blue-100
      dark: "#1e40af", // blue-800
    },
  },
  appbar: {
    background: {
      light: "#ffffff",
      dark: "#111827", // gray-900
    },
    text: {
      light: "#111827", // gray-900
      dark: "#f9fafb", // gray-50
    },
  },
} as const;

// Função para obter cor baseada no tema
export function getThemeColor(
  colorKey: keyof typeof themeColors,
  variant: "light" | "dark" = "light"
) {
  const color = themeColors[colorKey];
  if (typeof color === "object" && "light" in color && "dark" in color) {
    return color[variant];
  }
  return color as string;
}

// Classes CSS para uso com Tailwind
export const themeClasses = {
  sidebar: {
    background: "bg-white dark:bg-gray-800",
    text: "text-gray-700 dark:text-gray-50",
    hover: "hover:bg-gray-100 dark:hover:bg-gray-700",
    active: "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-50",
  },
  appbar: {
    background: "bg-white dark:bg-black",
    text: "text-gray-900 dark:text-gray-50",
  },
  primary: {
    background: "bg-blue-500 dark:bg-blue-700",
    text: "text-white",
    hover: "hover:bg-blue-600 dark:hover:bg-blue-800",
  },
  secondary: {
    background: "bg-violet-500 dark:bg-violet-600",
    text: "text-white",
    hover: "hover:bg-violet-600 dark:hover:bg-violet-700",
  },
} as const;
