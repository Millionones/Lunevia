import AdminHeader from "../../_componets/Header";
import Sidebar from "../../_componets/Sidebar";

export default function CMSLayout({ children }) {
  return (
    <div className="flex h-screen w-full relative overflow-hidden">
      <Sidebar />

      {/* flex-1 + min-w-0 lets this column shrink instead of forcing horizontal
          overflow when a page (e.g. the property editor) has wide content. */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        <AdminHeader />
        <main className="p-3 min-w-0">{children}</main>
      </div>
    </div>
  );
}
