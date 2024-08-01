import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ":)/components/ui/dialog";
import ScoringSettingsDisplayTable from "./scoring-settings-display-table";

const ScoringSettingsDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="bg-transparent">
        League Scoring Settings
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scoring Settings</DialogTitle>
          <DialogDescription>
            Configure the scoring settings for your league.
          </DialogDescription>
        </DialogHeader>
        <ScoringSettingsDisplayTable leagueId="992986007853195264" />
      </DialogContent>
    </Dialog>
  );
};

export default ScoringSettingsDialog;
