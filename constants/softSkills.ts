export const SOFT_SKILLS = [
  "Analytical thinking",
  "Creative thinking",
  "Resilience, flexibility and agility",
  "Motivation and self-awareness",
  "Curiosity and lifelong learning",
  "Technological literacy",
  "Dependability and attention to detail",
  "Empathy and active listening",
  "Leadership and social influence",
] as const;

export type SoftSkill = (typeof SOFT_SKILLS)[number];

export const DEFINITIONS: {
  title: SoftSkill;
  definition: string;
  source: string;
  index: number;
}[] = [
  {
    title: "Analytical thinking" as const,
    definition:
      "The ability to identify and define problems, extract key information from data and develop a workable solution",
    source: "Chicago state university",
  },
  {
    title: "Creative thinking" as const,
    definition: "The ability to come up with unique, original solutions",
    source: "University of Pennsylvania",
  },
  {
    title: "Resilience, flexibility and agility" as const,
    definition:
      "The ability to adapt, thrive, and remain productive amongst adversity or varying expectations",
    source: "",
  },
  {
    title: "Motivation and self-awareness" as const,
    definition:
      "Motivation - emotional tendencies that guide or facilitate reaching goals. Self-awareness - knowing one’s internal states, preferences, resources, and institutions",
    source:
      "Goleman, D. (1998). Working with emotional intelligence. New York, NY: Bantam Books",
  },
  {
    title: "Curiosity and lifelong learning" as const,
    definition:
      "Driven to engage with the world through an open-minded pursuit of knowledge and insight",
    source: "University of Ottawa",
  },
  {
    title: "Technological literacy" as const,
    definition: "The ability to use, manage, assess, and understand technology",
    source:
      "Rose, L., Gallup, A., Dugger, W., & Starkweather, K. (2004, September). The second installment of the ITEA/Gallup Poll and what it reveals as to how Americans think about technology.",
  },
  {
    title: "Dependability and attention to detail" as const,
    definition:
      "Dependability is the quality of being reliable, consistent, and trustworthy in fulfilling commitments and responsibilities. Attention to detail involves a meticulous approach to work, focusing on precision, thoroughness, and accuracy",
    source: "",
  },
  {
    title: "Empathy and active listening" as const,
    definition: "Awareness of others’ feelings, needs, and concerns",
    source:
      "Goleman, D. (1998). Working with emotional intelligence. New York, NY: Bantam Books",
  },
  {
    title: "Leadership and social influence" as const,
    definition:
      "Leadership is a set of behaviors used to help people align their collective direction, to execute strategic plans, and to continually renew an organization. Social influence involves intentional and unintentional efforts to change another person's beliefs, attitudes, or behavior",
    source: "McKinsey, ScienceDirect",
  },
].map((item, i) => ({
  ...item,
  index: i + 1,
}));
