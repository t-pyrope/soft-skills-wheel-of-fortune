import { i18n } from "@/i18n/config";

export const DEFINITIONS: {
  title: string;
  definition: string;
  source: string;
  emoji: string;
  index: number;
}[] = [
  {
    title: i18n.t("skills.analyticalThinking.name"),
    definition: i18n.t("skills.analyticalThinking.definition"),
    source: "Chicago state university",
    emoji: "📊",
  },
  {
    title: i18n.t("skills.creativeThinking.name"),
    definition: i18n.t("skills.creativeThinking.definition"),
    source: "University of Pennsylvania",
    emoji: "🎨",
  },
  {
    title: i18n.t("skills.resilience.name"),
    definition: i18n.t("skills.resilience.definition"),
    source: "",
    emoji: "🌱",
  },
  {
    title: i18n.t("skills.motivation.name"),
    definition: i18n.t("skills.motivation.definition"),
    source:
      "Goleman, D. (1998). Working with emotional intelligence. New York, NY: Bantam Books",
    emoji: "🚀",
  },
  {
    title: i18n.t("skills.curiosity.name"),
    definition: i18n.t("skills.curiosity.definition"),
    source: "University of Ottawa",
    emoji: "📚",
  },
  {
    title: i18n.t("skills.technologicalLiteracy.name"),
    definition: i18n.t("skills.technologicalLiteracy.definition"),
    source:
      "Rose, L., Gallup, A., Dugger, W., & Starkweather, K. (2004, September). The second installment of the ITEA/Gallup Poll and what it reveals as to how Americans think about technology.",
    emoji: "💻",
  },
  {
    title: i18n.t("skills.dependability.name"),
    definition: i18n.t("skills.dependability.definition"),
    source: "",
    emoji: "🔎",
  },
  {
    title: i18n.t("skills.empathy.name"),
    definition: i18n.t("skills.empathy.definition"),
    source:
      "Goleman, D. (1998). Working with emotional intelligence. New York, NY: Bantam Books",
    emoji: "🤝",
  },
  {
    title: i18n.t("skills.leadership.name"),
    definition: i18n.t("skills.leadership.definition"),
    source: "McKinsey, ScienceDirect",
    emoji: "🌟",
  },
  {
    title: i18n.t("skills.qualityControl.name"),
    definition: i18n.t("skills.qualityControl.definition"),
    source: "",
    emoji: "✔️",
  },
].map((item, i) => ({
  ...item,
  index: i + 1,
}));
