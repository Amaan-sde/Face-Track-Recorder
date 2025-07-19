import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import CameraSetupRecordingStudio from "pages/camera-setup-recording-studio";
import SettingsPreferencesDashboard from "pages/settings-preferences-dashboard";
import VideoLibraryPlaybackManager from "pages/video-library-playback-manager";
import HelpTutorialCenter from "pages/help-tutorial-center";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CameraSetupRecordingStudio />} />
        <Route path="/camera-setup-recording-studio" element={<CameraSetupRecordingStudio />} />
        <Route path="/settings-preferences-dashboard" element={<SettingsPreferencesDashboard />} />
        <Route path="/video-library-playback-manager" element={<VideoLibraryPlaybackManager />} />
        <Route path="/help-tutorial-center" element={<HelpTutorialCenter />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;