import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockPapers = [
  { title: "Macro Paper 1", date: "12 Mar", score: 74, grade: "A", id: "1" },
  { title: "Micro Paper 2", date: "8 Mar", score: 68, grade: "B", id: "2" },
  { title: "Development Eco", date: "4 Mar", score: 81, grade: "A*", id: "3" },
];

export default function RecentPapersTable() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-foreground font-semibold text-sm">Recent Papers</h3>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-border">
            <TableHead className="text-muted-foreground text-xs">Paper Title</TableHead>
            <TableHead className="text-muted-foreground text-xs">Date</TableHead>
            <TableHead className="text-muted-foreground text-xs">Score</TableHead>
            <TableHead className="text-muted-foreground text-xs">Grade</TableHead>
            <TableHead className="text-muted-foreground text-xs text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPapers.map((p) => (
            <TableRow key={p.id} className="border-border hover:bg-popover/50 transition-colors">
              <TableCell className="text-sm font-medium text-foreground">{p.title}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
              <TableCell>
                <span className="text-sm font-bold font-mono text-foreground">{p.score}%</span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="border-primary/30 text-primary text-xs font-bold">
                  {p.grade}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <button className="text-xs font-medium text-primary hover:underline">View</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
