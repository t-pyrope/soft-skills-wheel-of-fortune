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
    definition: "",
    source: "",
    emoji: "✔️",
  },
].map((item, i) => ({
  ...item,
  index: i + 1,
}));

const analyticalThinkingExercises: string[] = [
  "Выпишите на бумаге, сколько часов в день вы тратите на - работу, домашние дела, физическую активность, возможно, какие-то дополнительные занятия (хобби, сериалы). Сколько у вас, получается, уходит на все это часов - в месяц, в полгода, в год? Запишите, что вы думаете об этих цифрах",
  "Есть ли у вас какой-то навык, который вы бы хотели освоить в совершенстве? Согласно исследованиям, после 10000 часов занятий этим вы однозначно будете это делать на высоком уровне. Сколько бы вам понадобилось тратить часов в неделю, чтобы получить эти 10000 часов - за пару лет, за четыре года, за восемь лет?",
  "Есть ли что-то, что вас сейчас беспокоит, и вы бы хотели это решить, но забываете или забрасываете? Придумайте 3 действия, которые вы бы могли сделать прямо сейчас для временного решения проблемы или приближения к ее решению",
  "Найдите и выпишите 3 определения вашего любимого мягкого навыка (того, который вы бы хотели развить сильнее всего). Лучше всего, если это будут определения из научной литературы или университетов. Выпишите 3-5 выражений или идей, которые вас больше всего зацепили в этих определениях",
  "Подумайте о навыке, который вы бы хотели освоить, и который бы вам помог в жизни. Найдите 2 хорошие книги (курсы) на эту тему, которые бы вам помогли лучше разбираться в этом навыке",
];

