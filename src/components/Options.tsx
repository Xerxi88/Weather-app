import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { CitiesFavsContext } from "../context/CitiesFavsContext";
import { DarkModeContext } from "../context/DarkModeContext";
import { SunriseIcon, SunsetIcon } from "./Icons";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface Props {
  openOptions: boolean;
  setSelectedLanguage: (lang: string) => void;
}

const Options = ({ openOptions, setSelectedLanguage }: Props) => {
  const { t } = useTranslation(["translate"]);

  const {
    isLight,
    darkModeStart,
    setDarkModeStart,
    lightModeStart,
    setLightModeStart,
  } = useContext(DarkModeContext);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const [openTemp, setOpenTemp] = useState(false);
  const { temperature, setTemperature } = useContext(CitiesFavsContext);

  function convertTextTemp(value: string) {
    const newValue = value.charAt(0).toLocaleUpperCase() + value.substring(1);
    if (newValue === "Celsius") {
      return "Celsius" + " (ºC)";
    } else {
      return "Fahrenheit" + " (ºF)";
    }
  }

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenTemp(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sharedTextFieldProps = {
    fullWidth: true,
    sx: {
      width: "65px",
      backgroundColor: "transparent",
      border: "1px solid #ffffff",
      borderRadius: "5px",
      "& .MuiInputBase-input": {
        padding: 0,
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer",
        userSelect: "none",
      },
    },
  };

  return (
    <section
      className={`${openOptions ? "options-open" : "options-close"} ${
        isLight ? "light" : "dark"
      }`}
    >
      <p>{t(`Setting`)}</p>
      <div className="options-menu">
        <div className="language-option">
          <span>{t(`Lang`)}</span>
          <select onChange={handleLanguageChange}>
            <option value="es">{t(`Spanish`)}</option>
            <option value="ca">{t(`Catalan`)}</option>
            <option value="en">{t(`English`)}</option>
            <option value="fr">{t(`French`)}</option>
            <option value="it">{t(`Italian`)}</option>
            <option value="de">{t(`German`)}</option>
          </select>
        </div>
        <hr />
        <div className="temperature-option">
          <span>{t(`Temperature`)}</span>
          <div className="temperature" ref={menuRef}>
            <span
              className="temperature-title"
              onClick={() => setOpenTemp(!openTemp)}
            >
              {convertTextTemp(temperature)}
            </span>
            {openTemp && (
              <div className="temperature-name">
                <div
                  onClick={() => {
                    setTemperature("celsius");
                    setOpenTemp(false);
                  }}
                >
                  Celsius (ºC)
                </div>
                <hr />
                <div
                  onClick={() => {
                    setTemperature("fahrenheit");
                    setOpenTemp(false);
                  }}
                >
                  Fahrenheit (ºF)
                </div>
              </div>
            )}
          </div>
        </div>
        <hr />
        <div className="sunset-option">
          <span>{t(`Day/Night switch`)}</span>
          <section>
            <div className="option-container">
              <SunriseIcon />
              <MobileTimePicker
                value={dayjs()
                  .hour(lightModeStart.hour)
                  .minute(lightModeStart.minute)}
                ampm={false}
                format="HH:mm[h]"
                onChange={(newValue) => {
                  if (newValue) {
                    setLightModeStart({
                      hour: newValue.hour(),
                      minute: newValue.minute(),
                    });
                  }
                }}
                slotProps={{
                  textField: sharedTextFieldProps,
                  mobilePaper: {
                    sx: {
                      backgroundColor: "#63ceff",
                    },
                  },
                }}
              />
            </div>
            <div className="option-container">
              <SunsetIcon />
              <MobileTimePicker
                value={dayjs()
                  .hour(darkModeStart.hour)
                  .minute(darkModeStart.minute)}
                ampm={false}
                format="HH:mm[h]"
                onChange={(newValue) => {
                  if (newValue) {
                    setDarkModeStart({
                      hour: newValue.hour(),
                      minute: newValue.minute(),
                    });
                  }
                }}
                slotProps={{
                  textField: sharedTextFieldProps,
                  mobilePaper: {
                    sx: {
                      backgroundColor: "#63ceff",
                    },
                  },
                }}
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Options;
