import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from ":)/components/ui/dialog";
import ScoringSettingsDisplayTable from "./scoring-settings-display-table";

const ScoringSettingsDialog = ({ leagues }: { leagues: string[] }) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-transparent">
        Compare league scoring settings
      </DialogTrigger>
      <DialogContent className=" w-[90vw] overflow-scroll">
        <DialogHeader>
          <DialogTitle>Scoring Settings</DialogTitle>
          <DialogDescription>
            Configure the scoring settings for your league.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-around">
          {leagues.map((leagueId) => (
            <ScoringSettingsDisplayTable key={leagueId} leagueId={leagueId} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoringSettingsDialog;
