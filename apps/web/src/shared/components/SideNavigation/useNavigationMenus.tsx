import { IcList, IcTable } from "@ssok/ui";
import { useParams, usePathname } from "next/navigation";
import type { ReactElement } from "react";

type NavigationType = "list" | "compare";

interface NavigationMenuItem {
  type: NavigationType;
  icon: ReactElement;
  label: string;
  href: string;
  active: boolean;
}

interface NavigationRouteConfig {
  type: NavigationType;
  icon: ReactElement;
  label: string;
  route: (id: string) => string;
  active: (pathname: string) => boolean;
}

const NAVIGATION_ROUTES: NavigationRouteConfig[] = [
  {
    type: "list",
    icon: <IcList className="h-[2.8rem] w-[2.8rem]" />,
    label: "리스트",
    route: (id) => `/boards/${id}/lists`,
    active: (pathname) => /^\/boards\/[^/]+\/lists(?:\/|$)/.test(pathname),
  },
  {
    type: "compare",
    icon: <IcTable className="h-[2.8rem] w-[2.8rem]" />,
    label: "비교표",
    route: (id) => `/boards/${id}/compares/`,
    active: (pathname) => /^\/boards\/[^/]+\/compares(?:\/|$)/.test(pathname),
  },
];

const useNavigationMenus = (): NavigationMenuItem[] => {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();

  return NAVIGATION_ROUTES.map((item) => ({
    type: item.type,
    icon: item.icon,
    label: item.label,
    href: item.route(id),
    active: item.active(pathname),
  }));
};

export default useNavigationMenus;
