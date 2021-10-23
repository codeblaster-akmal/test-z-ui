import DashboardIcon from "@material-ui/icons/DashboardOutlined";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import FolderIcon from "@material-ui/icons/FolderOutlined";
import DashboardTwoToneIcon from "@material-ui/icons/DashboardTwoTone";
import ListAltIcon from "@material-ui/icons/ListAlt";
import MailIcon from "@material-ui/icons/MailOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import PersonIcon from "@material-ui/icons/PersonOutlined";
import CategoryOutlinedIcon from "@material-ui/icons/CategoryOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import AllInboxOutlinedIcon from "@material-ui/icons/AllInboxOutlined";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import EditAttributesIcon from "@material-ui/icons/EditAttributes";
import { MdLocalOffer } from "react-icons/md";
import { FaSitemap } from "react-icons/fa";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EmailIcon from "@material-ui/icons/Email";
import EventIcon from "@material-ui/icons/Event";
import PhonelinkSetupIcon from "@material-ui/icons/PhonelinkSetup";
import ReportIcon from "@material-ui/icons/Report";
import AssessmentIcon from "@material-ui/icons/Assessment";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import BlockIcon from "@material-ui/icons/Block";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import ViewListIcon from "@material-ui/icons/ViewList";

var iconsMap = {
  DashboardIcon: DashboardIcon,
  ErrorIcon: ErrorIcon,
  FolderIcon: FolderIcon,
  DashboardTwoToneIcon: DashboardTwoToneIcon,
  ListAltIcon: ListAltIcon,
  MailIcon: MailIcon,
  PeopleIcon: PeopleIcon,
  PersonIcon: PersonIcon,
  CategoryOutlinedIcon: CategoryOutlinedIcon,
  LocalOfferOutlinedIcon: LocalOfferOutlinedIcon,
  AllInboxOutlinedIcon: AllInboxOutlinedIcon,
  ShowChartIcon: ShowChartIcon,
  EditAttributesIcon: EditAttributesIcon,
  MdLocalOffer: MdLocalOffer,
  FaSitemap: FaSitemap,
  NotificationsIcon: NotificationsIcon,
  EventIcon: EventIcon,
  EmailIcon: EmailIcon,
  PhonelinkSetupIcon: PhonelinkSetupIcon,
  ReportIcon: ReportIcon,
  AssessmentIcon: AssessmentIcon,
  LoyaltyIcon: LoyaltyIcon,
  ShoppingCartIcon: ShoppingCartIcon,
  BlockIcon: BlockIcon,
  KeyboardReturnIcon: KeyboardReturnIcon,
  ViewListIcon: ViewListIcon,
};

export default [
  {
    label: "",
    content: JSON.parse(
      `[
  {
    "label": "Dashboard",
    "icon": "AssessmentIcon",
    "content": []
  },
  {
    "label": "Product",
    "icon": "LoyaltyIcon",
    "content": [
      {
        "label": "Brand",
        "description": "This is a dashboard page example built using this template.",
        "to": "/brand",
        "icon": "LocalOfferOutlinedIcon"
      },
      {
        "label": "Category",
        "description": "This is a dashboard page example built using this template.",
        "to": "/category",
        "icon": "CategoryOutlinedIcon"
      },
      {
        "label": "Group",
        "description": "This is a dashboard page example built using this template.",
        "to": "/group",
        "icon": "FolderIcon"
      },
      {
        "label": "Sub Group",
        "description": "This is a dashboard page example built using this template.",
        "to": "/subgroup",
        "icon": "ListAltIcon"
      },
      {
        "label": "Variants",
        "description": "This is a dashboard page example built using this template.",
        "to": "/variants",
        "icon": "ListAltIcon"
      },
      {
        "label": "Attributes",
        "description": "This is a dashboard page example built using this template.",
        "to": "/attribute",
        "icon": "EditAttributesIcon"
      },
      {
        "label": "Product",
        "description": "This is a dashboard page example built using this template.",
        "to": "/productList",
        "icon": "LoyaltyIcon"
      },
      {
        "label": "Inventory",
        "description": "This is a dashboard page example built using this template.",
        "to": "/priceList",
        "icon": "AllInboxOutlinedIcon"
      }
    ]
  },
  {
    "label": "E-commerce",
    "icon": "DashboardTwoToneIcon",
    "content": [
      {
        "label": "Orders",
        "description": "This is a dashboard page example built using this template.",
        "to": "/orderlisting",
        "icon": "ShoppingCartIcon"
      },
      {
        "label": "Cancel Orders",
        "description": "This is a dashboard page example built using this template.",
        "to": "/ordercancel",
        "icon": "BlockIcon"
      },
      {
        "label": "Return Orders",
        "description": "This is a dashboard page example built using this template.",
        "to": "/orderreturn",
        "icon": "KeyboardReturnIcon"
      },
      {
        "label": "Refund Orders",
        "description": "This is a dashboard page example built using this template.",
        "to": "/orderrefund",
        "icon": "KeyboardReturnIcon"
      }
    ]
  },
  {
    "label": "Customers",
    "icon": "PeopleIcon",
    "content": [
      {
        "label": "Customer List",
        "description": "This is a dashboard page example built using this template.",
        "to": "/customerList",
        "icon": "PersonIcon"
      } 
    ]      
  },
  {
    "label": "Marketing",
    "icon": "MdLocalOffer",
    "content": [
      {
        "label": "Offers",
        "description": "This is a dashboard page example built using this template.",
        "to": "/promotion",
        "icon": "MdLocalOffer"
      },
      {
        "label": "Promotions",
        "description": "This is a dashboard page example built using this template.",
        "to": "/trendingProductList",
        "icon": "FaSitemap"
      }
    ]
  },                                                       
  {
    "label": "Notification",
    "icon": "NotificationsIcon",
    "to": "/notification",
    "content": [
      {
        "label": "Events",
        "description": "This is a dashboard page example built using this template.",
        "to": "/eventList",
        "icon": "EventIcon"
      },
      {
        "label": "Alerts",
        "description": "This is a dashboard page example built using this template.",
        "to": "/alertList",
        "icon": "ErrorIcon"
      },
      {
        "label": "Emails",
        "description": "This is a dashboard page example built using this template.",
        "to": "/emailList",
        "icon": "EmailIcon"
      }      
    ]
  },
  {
    "label": "Setup",
    "icon": "PhonelinkSetupIcon",
    "content": [
      {
        "label": "Store",
        "description": "This is a dashboard page example built using this template.",
        "to": "/warehouse",
        "icon": "ShowChartIcon"
      }
    ]
  },
  {
    "label": "Reports",
    "icon": "ReportIcon",
    "content": []
  },
  {
    "label": "Others",
    "icon": "ViewListIcon",
    "content": [      
      {
        "label": "Section Builder",
        "description": "This is a dashboard page example built using this template.",
        "to": "/section",
        "icon": "AllInboxOutlinedIcon"
      }
    ]
  }
]`,
      (key, value) => {
        if (key === "icon") {
          return iconsMap[value];
        } else {
          return value;
        }
      }
    ),
  },
];
