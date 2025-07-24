import Provider from "@/components/ui/Provider";
import { Instagram } from "lucide-react";

const PROVIDERS = ["instagram"];

function Providers() {
  return (
    <div>
      {PROVIDERS.map((provider: string) => (
        <Provider icon={<Instagram />} to={provider} label={provider} />
      ))}
    </div>
  );
}

export default Providers;
