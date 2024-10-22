import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Spacelab from "scenes/spacelab";
import MainFloripaSat1 from "scenes/mainfloripasat1";
import Battery from "scenes/battery";
import Downlink from "scenes/downlinks";
import Solarpanel from "scenes/solarpanel";
import Location from "scenes/location";
import Hamradio from "scenes/hamradios";
import OBDH from "scenes/obdh"


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/spacelab" replace />} />
              <Route path="/spacelab" element={<Spacelab />} />
              <Route path="/FloripaSat-1 Main" element={<MainFloripaSat1 />} />
              <Route path="/battery" element={<Battery />} />
              <Route path="/downlink" element={<Downlink />} />
              <Route path="/solarpanel" element={<Solarpanel />} />
              <Route path="/location" element={<Location />} />
              <Route path="/Ham Radios" element={<Hamradio />} />
              <Route path="/OBDH-data" element={<OBDH />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
