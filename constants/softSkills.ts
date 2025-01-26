import { i18n } from "@/i18n/config";

export const SOFT_SKILLS = [
  i18n.t("skills.analyticalThinking.name"),
  i18n.t("skills.creativeThinking.name"),
  i18n.t("skills.resilience.name"),
  i18n.t("skills.motivation.name"),
  i18n.t("skills.curiosity.name"),
  i18n.t("skills.technologicalLiteracy.name"),
  i18n.t("skills.dependability.name"),
  i18n.t("skills.empathy.name"),
  i18n.t("skills.leadership.name"),
  i18n.t("skills.qualityControl.name"),
] as const;

export type SoftSkill = (typeof SOFT_SKILLS)[number];

export const DEFINITIONS: {
  title: string;
  definition: string;
  source: string;
  index: number;
}[] = [
  {
    title: i18n.t("skills.analyticalThinking.name"),
    definition: i18n.t("skills.analyticalThinking.definition"),
    source: "Chicago state university",
  },
  {
    title: i18n.t("skills.creativeThinking.name"),
    definition: i18n.t("skills.creativeThinking.definition"),
    source: "University of Pennsylvania",
  },
  {
    title: i18n.t("skills.resilience.name"),
    definition: i18n.t("skills.resilience.definition"),
    source: "",
  },
  {
    title: i18n.t("skills.motivation.name"),
    definition: i18n.t("skills.motivation.definition"),
    source:
      "Goleman, D. (1998). Working with emotional intelligence. New York, NY: Bantam Books",
  },
  {
    title: i18n.t("skills.curiosity.name"),
    definition: i18n.t("skills.curiosity.definition"),
    source: "University of Ottawa",
  },
  {
    title: i18n.t("skills.technologicalLiteracy.name"),
    definition: i18n.t("skills.technologicalLiteracy.definition"),
    source:
      "Rose, L., Gallup, A., Dugger, W., & Starkweather, K. (2004, September). The second installment of the ITEA/Gallup Poll and what it reveals as to how Americans think about technology.",
  },
  {
    title: i18n.t("skills.dependability.name"),
    definition: i18n.t("skills.dependability.definition"),
    source: "",
  },
  {
    title: i18n.t("skills.empathy.name"),
    definition: i18n.t("skills.empathy.definition"),
    source:
      "Goleman, D. (1998). Working with emotional intelligence. New York, NY: Bantam Books",
  },
  {
    title: i18n.t("skills.leadership.name"),
    definition: i18n.t("skills.leadership.definition"),
    source: "McKinsey, ScienceDirect",
  },
  {
    title: i18n.t("skills.qualityControl.name"),
    definition: "",
    source: "",
  },
].map((item, i) => ({
  ...item,
  index: i + 1,
}));
