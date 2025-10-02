import type { FilterName } from "../property-type";

export const makeClickFilterParameter = (filterName: FilterName) => ({
  filter_name: filterName,
});
