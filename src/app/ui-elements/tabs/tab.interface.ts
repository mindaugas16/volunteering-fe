export interface TabInterface {
  id: number;
  title: string;
  position?: number;
  icon?: string;
  isHidden?: boolean | Function;
  link?: string[];
}
