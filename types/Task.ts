export interface Task {
  id: string;
  text: {
    cs: string;
    en: string;
    ru: string;
  };
  parentId: number;
}

export interface ExtendedTask extends Task {
  done: boolean;
}
