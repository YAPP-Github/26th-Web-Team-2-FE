import IcAccessibleForward from "@/assets/icons/ic_accessible_forward.svg?react";
import IcAdd from "@/assets/icons/ic_add.svg?react";
import IcAddMemo from "@/assets/icons/ic_add_memo.svg?react";
import IcAlert from "@/assets/icons/ic_alert.svg?react";
import IcArrowDown from "@/assets/icons/ic_arrow_down.svg?react";
import IcArrowLeft from "@/assets/icons/ic_arrow_left.svg?react";
import IcArrowRight from "@/assets/icons/ic_arrow_right.svg?react";
import IcArrowUp from "@/assets/icons/ic_arrow_up.svg?react";
import IcCar from "@/assets/icons/ic_car.svg?react";
import IcCheckFill from "@/assets/icons/ic_check_fill.svg?react";
import IcCleaningServices from "@/assets/icons/ic_cleaning_services.svg?react";
import IcClose from "@/assets/icons/ic_close.svg?react";
import IcCollapse from "@/assets/icons/ic_collapse.svg?react";
import IcDelete from "@/assets/icons/ic_delete.svg?react";
import IcEdit from "@/assets/icons/ic_edit.svg?react";
import IcExpand from "@/assets/icons/ic_expand.svg?react";
import IcFitnessCenter from "@/assets/icons/ic_fitness_center.svg?react";
import IcHasMemo from "@/assets/icons/ic_has_memo.svg?react";
import IcHomeRepairService from "@/assets/icons/ic_home_repair_service.svg?react";
import IcInfo from "@/assets/icons/ic_info.svg?react";
import IcKm from "@/assets/icons/ic_km.svg?react";
import IcLink from "@/assets/icons/ic_link.svg?react";
import IcList from "@/assets/icons/ic_list.svg?react";
import IcLocalBar from "@/assets/icons/ic_local_bar.svg?react";
import IcLocalParking from "@/assets/icons/ic_local_parking.svg?react";
import IcLocation from "@/assets/icons/ic_location.svg?react";
import IcLuggage from "@/assets/icons/ic_luggage.svg?react";
import IcMap from "@/assets/icons/ic_map.svg?react";
import IcMemo from "@/assets/icons/ic_memo.svg?react";
import IcPets from "@/assets/icons/ic_pets.svg?react";
import IcPointOfSale from "@/assets/icons/ic_point_of_sale.svg?react";
import IcPool from "@/assets/icons/ic_pool.svg?react";
import IcRestaurant from "@/assets/icons/ic_restaurant.svg?react";
import IcRoundPlus from "@/assets/icons/ic_round-plus.svg?react";
import IcSave from "@/assets/icons/ic_save.svg?react";
import IcShare from "@/assets/icons/ic_share.svg?react";
import IcStarEmpty from "@/assets/icons/ic_star_empty.svg?react";
import IcStarFull from "@/assets/icons/ic_star_full.svg?react";
import IcStarHalf from "@/assets/icons/ic_star_half.svg?react";
import IcTable from "@/assets/icons/ic_table.svg?react";
import IcVariant from "@/assets/icons/ic_variant.svg?react";
import IcWalker from "@/assets/icons/ic_walker.svg?react";
import IcWifi from "@/assets/icons/ic_wifi.svg?react";

const icons = {
  IcAccessibleForward,
  IcAdd,
  IcAddMemo,
  IcAlert,
  IcArrowDown,
  IcArrowLeft,
  IcArrowRight,
  IcArrowUp,
  IcCar,
  IcCheckFill,
  IcCleaningServices,
  IcClose,
  IcCollapse,
  IcDelete,
  IcEdit,
  IcExpand,
  IcFitnessCenter,
  IcHasMemo,
  IcHomeRepairService,
  IcInfo,
  IcKm,
  IcLink,
  IcList,
  IcLocalBar,
  IcLocalParking,
  IcLocation,
  IcLuggage,
  IcMap,
  IcMemo,
  IcPets,
  IcPointOfSale,
  IcPool,
  IcRestaurant,
  IcRoundPlus,
  IcSave,
  IcShare,
  IcStarEmpty,
  IcStarFull,
  IcStarHalf,
  IcTable,
  IcVariant,
  IcWalker,
  IcWifi,
};

export default {
  title: "Foundations/Icons",
};

export const Icons = () => (
  <div className="flex flex-col gap-16 p-8">
    <section>
      <h2 className="mb-6 font-bold text-3xl text-gray-800">
        Ssok Icon Library 🚀
      </h2>

      <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7">
        {Object.entries(icons).map(([name, Icon]) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 rounded-md bg-gray-50 p-4 shadow-sm"
          >
            <Icon width={32} height={32} />
            <code className="break-words text-center text-gray-700 text-xs">
              {name}
            </code>
          </div>
        ))}
      </div>
    </section>
  </div>
);
