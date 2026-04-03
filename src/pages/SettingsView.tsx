import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { SettingsPage } from "@/components/SettingsPage";

const SettingsView = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <SettingsPage />
        </main>
      </div>
    </div>
  );
};

export default SettingsView;
