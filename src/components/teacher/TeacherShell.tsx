import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, ClipboardList, CheckSquare, FileBarChart,
  AlertTriangle, Sparkles, Settings, LogOut, GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/teacher", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/teacher/classes", label: "Classes", icon: Users },
  { to: "/teacher/homework", label: "Homework", icon: ClipboardList },
  { to: "/teacher/marking", label: "Marking", icon: CheckSquare },
  { to: "/teacher/reports", label: "Reports", icon: FileBarChart },
  { to: "/teacher/interventions", label: "Interventions", icon: AlertTriangle },
  { to: "/teacher/insights", label: "Insights", icon: Sparkles },
  { to: "/teacher/settings", label: "Settings", icon: Settings },
];

export default function TeacherShell({ children, schoolName }: { children: ReactNode; schoolName?: string | null }) {
  const { user, signOut } = useAuth();
  const { roles } = useUserRoles();
  const navigate = useNavigate();
  const primaryRole = roles.find((r) => r !== "student") ?? "teacher";

  return (
    <div className="min-h-screen flex bg-background dot-grid-bg">
      {/* Sidebar */}
      <aside className="w-[240px] shrink-0 border-r border-border bg-card/30 backdrop-blur-sm flex flex-col">
        <div className="px-5 py-5 border-b border-border">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-primary/15 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-foreground tracking-tight">EconRev</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Teacher</p>
            </div>
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/15 text-foreground border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button onClick={signOut} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-muted-foreground hover:text-foreground rounded-lg">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/80 backdrop-blur-xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{schoolName ?? "Teacher Workspace"}</p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {primaryRole}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden md:inline">{user?.email}</span>
            <Button size="sm" variant="outline" onClick={() => navigate("/dashboard")} className="text-xs h-8">
              Student view
            </Button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
