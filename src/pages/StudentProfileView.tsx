import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { StudentProfilePage } from "@/components/student-profile/StudentProfilePage";

const StudentProfileView = () => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <StudentProfilePage />
        </main>
      </div>
    </div>
  );
};

export default StudentProfileView;
