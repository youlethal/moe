export interface TemplateConfig {
  businessName: string;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  clientId?: string;
  modules: string[];
  darkMode?: boolean;
  aiContent?: any;
}

export const defaultConfig: TemplateConfig = {
  businessName: "moe",
  primaryColor: "#6366f1",
  accentColor: "#6366f1",
  fontFamily: "Inter, sans-serif",
  clientId: "77331d85-f82a-4f39-a94a-58cf83bb26c7",
  modules: ["hero","about","footer","staff-management","booking","services","gallery"],
  darkMode: false,
  aiContent: undefined
}; 