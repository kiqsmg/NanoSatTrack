
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Spacelab from "scenes/spacelab";
import FloripaSat1 from "scenes/floripasat1";
import Locations from "scenes/location";
import Battery from "scenes/battery";



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
              <Route path="/FloripaSat-1 Main" element={<FloripaSat1 />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/battery" element={<Battery />} />

            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
