import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import defaultSettings from "../components/config/defaultSetting";

// ------------------------------
// 🧩 تابع کمکی برای آپدیت ایمن مقدارهای تو در تو
// ------------------------------
const updateNestedValueSafe = (obj, path, value) => {
  if (!path || typeof path !== "string") return obj;

  try {
    const keys = path.split(".");
    /* 
    * کاربر گرامی توجه داشته باشید که در این بخش شما باید یک کپی از state 
    * قرار دهید تا بتوانید روی آن کپی کار های مد نظر خود را انجام دهید که 
    * اگر در تنظیمات و داده های اولیه خود از Date, Map, Math, Undefined, Null, ...
    * این مواردی که در واقع کلاس هستند و لازم است برای استفاده از آنها اصطلاحا instance
    * از آنها ساخته شود دارید الزاما باید از تابع structuredClone 
    * استفاده کنید زیرا این تابع درونی جاوااسکرپیت هست و یک کپی کامل ایجاد میکند ولی زمانی که از JSON 
    * استفاده میکنید ممکن است مقادیر کلاسی یا Null, Undefined 
    * به درستی کار نکنند و با خطا ها یا Fatal Error 
    * یا حتی باگ مواجه شوید
    * که در اینجا دو راه هست راه اول: به این صورتی که کد آن کامنت شده
    */

    //  const newObj = structuredClone(obj); // جلوگیری از تغییر مستقیم state
    // const newObj = JSON.parse(JSON.stringify(obj)); // جلوگیری از mutate شدن state اصلی

    /* 
    * راه دوم : یا هم به این صورت که بهتر است: 
    */
    const newObj = typeof structuredClone === "function"
      ? structuredClone(obj)
      : JSON.parse(JSON.stringify(obj));

    let current = newObj;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      const nextKey = isNaN(keys[i + 1]) ? keys[i + 1] : parseInt(keys[i + 1]);

      // اگر مسیر وجود نداشت خودش ایجادش کن
      if (!(key in current) || current[key] === null) {
        current[key] = typeof nextKey === "number" ? [] : {};
      }

      current = current[key];
    }

    const lastKey = keys[keys.length - 1];
    if (Array.isArray(current)) {
      current[parseInt(lastKey)] = value;
    } else {
      current[lastKey] = value;
    }

    return newObj;
  } catch (e) {
    if (import.meta.env.MODE === "development") {
      console.warn("⚠️ مسیر نامعتبر در updateNestedValueSafe:", path, e);
    }
    return obj; // در صورت خطا state اصلی را برگردان
  }
};

// ------------------------------
// ⚙️ Context اصلی تنظیمات
// ------------------------------
const SettingsContext = createContext();
export const useSettings = () => useContext(SettingsContext);

// ------------------------------
// 🔄 Reducer برای مدیریت اکشن‌ها
// ------------------------------
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL":
      if (import.meta.env.MODE === "development") {
        console.log("⚙️ [SET_ALL] جایگزینی کامل تنظیمات:", action.payload);
      }
      // اگر بخوای merge بشه و نه جایگزینی کامل:
      return { ...state, ...action.payload };

    case "UPDATE":
      if (import.meta.env.MODE === "development") {
        console.log("🛠 [UPDATE] مسیر:", action.path, "مقدار جدید:", action.value);
      }
      return updateNestedValueSafe(state, action.path, action.value);

    case "RESET_SETTINGS":
      if (import.meta.env.MODE === "development") {
        console.log("🔄 [RESET] تنظیمات بازنشانی شد به پیش‌فرض‌ها");
      }
      return defaultSettings;

    default:
      return state;
  }
};

// ------------------------------
// 🌐 Provider اصلی Context
// ------------------------------
export const SettingsProvider = ({ children }) => {
  const { user } = useAuth();
  const [state, dispatch] = useReducer(reducer, defaultSettings);
  // const [isDirty, setIsDirty] = useState(false);

  // 📥 دریافت تنظیمات از سرور یا استفاده از پیش‌فرض‌ها
  useEffect(() => {
    if (user?.access_token) {
      axios
        .get("http://messenger.local/api/settings", {
          headers: { Authorization: `Bearer ${user.access_token}` },
        })
        .then((res) => {
          const data = res.data;
          if (data && Object.keys(data).length > 0) {
            dispatch({ type: "SET_ALL", payload: data });
          } else {
            dispatch({ type: "SET_ALL", payload: defaultSettings });
          }
          setIsDirty(false);
        })
        .catch((err) => {
          console.error("⚠️ خطا در بارگذاری تنظیمات:", err);
          dispatch({ type: "SET_ALL", payload: defaultSettings });
          setIsDirty(false);
        });
    }
  }, [user?.access_token]);

  // 📍 وقتی تنظیمی تغییر کرد → علامت بده که تغییر انجام شده
  useEffect(() => {
    if (isDirty && import.meta.env.MODE === "development") {
      console.log("✏️ تنظیمات تغییر کرده‌اند و هنوز ذخیره نشده‌اند.");
    }
  }, [isDirty]);

  // 🧠 Dispatch wrapper برای ثبت تغییر
  const safeDispatch = (action) => {
    if (action.type === "UPDATE") setIsDirty(true);
    dispatch(action);
  };

  // 💾 ذخیره تنظیمات در سرور (فقط در صورت تغییر)
  const saveSettings = async () => {
    if (!user?.access_token || !isDirty) return;
    try {
      await axios.post(
        "http://messenger.local/api/settings",
        { preferences: state },
        { headers: { Authorization: `Bearer ${user.access_token}` } }
      );
      if (import.meta.env.MODE === "development") {
        console.log("✅ تنظیمات با موفقیت ذخیره شد:", state);
      }
      setIsDirty(false); // بعد از ذخیره ریست کن
    } catch (err) {
      console.error("❌ خطا در ذخیره تنظیمات:", err);
    }
  };

  // 🧩 خروجی Context
  return (
    <SettingsContext.Provider
      value={{
        settings: state,
        dispatch: safeDispatch,
        saveSettings,
        resetSettings: () => dispatch({ type: "RESET_SETTINGS" }),
        isDirty,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};