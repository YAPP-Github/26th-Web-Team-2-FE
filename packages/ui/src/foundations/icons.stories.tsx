import IcAddMemo from "@/assets/icons/ic_add_memo.svg?react";
import IcAlert from "@/assets/icons/ic_alert.svg?react";
import IcArrowDown from "@/assets/icons/ic_arrow_down.svg?react";
import IcArrowLeft from "@/assets/icons/ic_arrow_left.svg?react";
import IcArrowRight from "@/assets/icons/ic_arrow_right.svg?react";
import IcArrowUp from "@/assets/icons/ic_arrow_up.svg?react";
import IcCar from "@/assets/icons/ic_car.svg?react";
import IcCollapse from "@/assets/icons/ic_collapse.svg?react";
import IcDelete from "@/assets/icons/ic_delete.svg?react";
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcExpand from "@/assets/icons/ic_expand.svg?react";
import IcInfo from "@/assets/icons/ic_info.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import IcMap from "@/assets/icons/ic_map.svg?react";
import IcMemo from "@/assets/icons/ic_memo.svg?react";
import IcSave from "@/assets/icons/ic_save.svg?react";
import IcShare from "@/assets/icons/ic_share.svg?react";
import IcStarEmpty from "@/assets/icons/ic_star_empty.svg?react";
import IcStarFull from "@/assets/icons/ic_star_full.svg?react";
import IcStarHalf from "@/assets/icons/ic_star_half.svg?react";
import IcTable from "@/assets/icons/ic_table.svg?react";
import IcVariant from "@/assets/icons/ic_variant.svg?react";

const icons = {
  ArrowLeft: IcArrowLeft,
  ArrowRight: IcArrowRight,
  IcAddMemo: IcAddMemo,
  IcAlert: IcAlert,
  IcArrowDown: IcArrowDown,
  IcArrowUp: IcArrowUp,
  IcCar: IcCar,
  IcCollapse: IcCollapse,
  IcDelete: IcDelete,
  IcEdit: IcEdit,
  IcExpand: IcExpand,
  IcInfo: IcInfo,
  IcLink: IcLink,
  IcLocation: IcLocation,
  IcMap: IcMap,
  IcMemo: IcMemo,
  IcSave: IcSave,
  IcShare: IcShare,
  IcStarEmpty: IcStarEmpty,
  IcStarFull: IcStarFull,
  IcStarHalf: IcStarHalf,
  IcTable: IcTable,
  IcVariant: IcVariant,
};

export default {
  title: "Foundations/Icons",
};

export const Icons = () => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
      gap: "24px",
      alignItems: "center",
      justifyItems: "center",
    }}
  >
    {Object.entries(icons).map(([name, Icon]) => (
      <div key={name} style={{ textAlign: "center" }}>
        <Icon width={32} height={32} />
        <div style={{ marginTop: 8, fontSize: 12, color: "#888" }}>{name}</div>
      </div>
    ))}
  </div>
);
