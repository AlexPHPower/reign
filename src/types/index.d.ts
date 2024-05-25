export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type TableData = {
  name: string;
  image: string;
  kills: number;
  played: number;
  points: number;
  placement: number;
};

export interface ApiResponse {
  data: TableData[];
}
