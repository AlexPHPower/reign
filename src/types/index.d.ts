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

export interface Feature {
  name: string;
  enabled: boolean;
}

export interface TierDetails {
  title: string;
  description: string;
  features: Feature[];
  price: number;
}

export interface Tier {
  peasant: TierDetails;
  lord: TierDetails;
  king: TierDetails;
}

interface TierCardProps {
  title: string;
  description: string;
  features: Feature[];
  price: number;
}

interface ScrollingHomeCardProps {
  cards: PlayerProfile[];
}

type PlayerProfile = {
  name: string;
  image: string;
  badges: Record<string, string>;
  played: number;
  wins: number;
  kills: number;
};
