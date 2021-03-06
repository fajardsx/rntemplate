class Constant {
  static COPYRIGHT = "Copyright © Project X 2020";
  // DEVMODE
  static DEV_MODE = true;
  // Async Storage
  static IS_OPENED = "IS_OPENED";
  static FIREBASE_TOKEN = "FIREBASE_TOKEN";

  static TOKET_LOCATIONIQ = ""; //Token my.locationiq.com
  static TEMP_TOKEN = null; //Token Temp
  //Rest
  static SERVER_ID = 1; //DEBUG USE 0  // RELEASE USE 1
  //ONESIGN
  static OSKEY = ""; //one-signal
  static OSKEY_PRIVACY = false; //one-signal-privacy
  static APPSTATUS = "";
  static NAME_APPS = "Project X";
  //VERSION
  static APP_VERSION = "19";
  static APP_STATUS = "";
  static SERVER_APP_VERSION = "0.0.1";
  static FORCE_UPDATE = "no";
  static LOCATION_VERSION = "0.1";
  static SERVER_LOCATION_VERSION = "0.1";
  //api rest method
  static P = "post";
  static G = "get";
  static PU = "put";
  //TOAST TYPE
  // static TYPE_WARNING = "warning";
  // static TYPE_SUCCESS = "success";
  // static TYPE_DANGER = "danger";

  static LOCATION_DEFAULT = {
    latitude: -6.2087634,
    longitude: 106.845599,
    alamat: "Daerah Khusus Ibukota Jakarta",
  };

  //Header
  static HEADER_1 = {
    "X-Requested-With": "XMLHttpRequest",
  };

  static WEB =
    this.SERVER_ID === 0
      ? "https://beta2.dotcomsolution.co.id/himalaya/public/api/"
      : "https://himalayafrontline.com/public/api";

  // WILL REPLACE WITH RESLINK FROM API ENVIROTMENT
  //static RESTLINK = "https://beta2.dotcomsolution.co.id/himalaya/public/api";
  static RESTLINK =
    this.SERVER_ID === 0
      ? "https://beta2.dotcomsolution.co.id/himalaya/public/api"
      : "https://himalayafrontline.com/public/api";

  static RESTPAYLINK =
    this.SERVER_ID === 0
      ? "https://beta2.dotcomsolution.co.id/rhapsodie/public/webview/payment/booking/"
      : "https://www.rhapsodie.co/webview/payment/booking/";

  static BASELINK = "";
  static HEADER_GET = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Cache-Control": "no-cache",
  };
  static REWARD_HEADER_GET = {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Cache-Control": "no-cache",
  };
  static HEADER_GETw = {
    Accept: "application/json",
  };
  static HEADER_POST = {
    Accept: "application/javascript",
    "Content-Type": "multipart/form-data",
  };
  static HEADER_POST_RAW_JSON = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "bearer ",
  };
  static HEADER_POST_NOPARAM = {
    Accept: "application/javascript",
  };
  static HEADER_POST_AUTH = {
    Accept: "application/javascript",
    Authorization: "",
  };
  //APP STORE LINK
  static GOOGLEPLAY_LINK = "https://play.google.com/store/apps/details?id=com.rhapsodie_apps";
  static PLAYSTORE = "https://www.google.com";
  //
  static TIME_OUT = 30000;
  //CONFIG
  static CREATE_ADDRESS_SCREENMODE = "Address";
  //DEBUG MODE
  static SHOW_MESSAGE = true;
  static DEBUG_MODE = 0; ///0 for DEBUG MODE
  static RANGE_SCHEDULE = 3000;
  static PADDING_SCHEDULE = 72;
  static GOOGGlE_KEY = "AIzaSyDNSwIcncIP3mdbpcQWMMKVlJ5mWitz5FQ";
  // static GOOGGlE_KEY = 'AIzaSyCKcgmzuGrRPykWiFNS3uH5bxXG93wo264'; // PUNYA TALASI JANGAN DIPAKE KECUALI UNTUK DEBUGGING

  // MAZ FILE UPLOAD
  static MAX_HELPCENTER_FILE_SIZE = 2097152;

  static LOGIN_TYPE_ORIGIN = "Origin";
  static appStatus() {
    return this.APPSTATUS;
  }
  static updateAppStatus(values) {
    this.APPSTATUS = values;
  }
  static updateAppADDRESS_SCREENMODE(values) {
    this.CREATE_ADDRESS_SCREENMODE = values;
  }
  //PIC BLANK
  static URL_DUMMY = "https://dotcomsolution.000webhostapp.com/rapsody/";
  static URL_BLANK_CONTENT =
    "https://rhapsodie.co/uploads/10/2019-03/9fdeb5456f63c999f756a74d8d4af264.jpeg";
  static URL_BLANK_PROFIL = "../assets/img/default_avatar.jpg";
  static URL_NO_IMAGE = "../assets/img/no-image-found.png";
  static URL_BLANK_COVER =
    "https://rhapsodie.co/uploads/10/2019-03/845c0978b9a8eff0b21bd94c2b149833.png";
  // DEEP LINKING
  static PREFIX = /https:\/\/www.rhapsodie.co\/|https:\/\/www.rhapsodie.co\/m\/|https:\/\/rhapsodie.co\/m\/|rhapsodie.co:\/m|rhapsodie.co:\/\/|https:\/\/rhapsodie.co\//;

  //ROLE
  static ROLE_INLOGIN = 1;
  static ROLE_INSELECTSCHEDULE = 2;
  static ROLE_READYSTARTSCHEDULE = 3;
  static ROLE_ADDDOCTORAGAIN = 4;
  static ROLE_FINISHTODAY = 5;
  static ROLE_YESTERDAY = 6;

  //ENVI CONTROLLER
  static getEnvi(data, name) {
    const getdata = data.find((res) => {
      return res.name == name;
    });

    return getdata.content;
  }
  // DATE ATTEND
  static formatAttend = "YYYY-MM-DD HH:mm:ss";
  // MINIMUM FEEDBACK CHARACTER
  static maxCharFeedback = 6;
}

export default Constant;
