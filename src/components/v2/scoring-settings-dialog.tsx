import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ":)/components/ui/dialog";
import ScoringSettingsDisplayTable from "./scoring-settings-display-table";
import { Button } from ":)/components/ui/button";

const ScoringSettingsDialog = ({ leagues }: { leagues: string[] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Compare league scoring settings</Button>
      </DialogTrigger>
      <DialogContent className="w-full overflow-scroll md:w-auto">
        <DialogHeader>
          <DialogTitle>Scoring Settings</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-6">
          {leagues.map((leagueId) => (
            <ScoringSettingsDisplayTable key={leagueId} leagueId={leagueId} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoringSettingsDialog;
