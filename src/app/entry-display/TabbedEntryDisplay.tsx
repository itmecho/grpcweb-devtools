import { useState } from "react";
import type { Entry } from "../../state/entries";
import { JsonDisplay } from "../../components/JsonDisplay";
import classNames from "classnames";
import { EntryDisplayMessage } from "../../components/EntryDisplayMessage";

type TabKey = "info" | "request" | "response";

export function TabbedEntryDisplay({ entry }: { entry: Entry }) {
  const [selectedTab, setSelectedTab] = useState<TabKey>("info");
  return (
    <div className="w-full">
      <div className="border-b-2 border-slate-700">
        <Tab
          name="Info"
          onClick={() => setSelectedTab("info")}
          isSelected={selectedTab === "info"}
        />
        <Tab
          name="Request"
          onClick={() => setSelectedTab("request")}
          isSelected={selectedTab === "request"}
        />
        <Tab
          name="Response"
          onClick={() => setSelectedTab("response")}
          isSelected={selectedTab === "response"}
        />
      </div>
      <div>
        {selectedTab === "info" && <InfoTabContent entry={entry} />}
        {selectedTab === "request" && <JsonTabContent data={entry.request} />}
        {selectedTab === "response" && <JsonTabContent data={entry.response} />}
      </div>
    </div>
  );
}

function Tab({
  name,
  isSelected,
  onClick,
}: {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={classNames(
        "cursor-pointer px-4 py-2 border-r-2 border-slate-700 hover:bg-slate-600",
        isSelected && "font-bold",
      )}
      onClick={onClick}
    >
      {name}
    </button>
  );
}

function InfoTabContent({ entry }: { entry: Entry }) {
  return (
    <table className="table table-auto m-4">
      <tbody>
        <tr>
          <td className="font-bold">Method:</td>
          <td>{entry.method ? entry.method : "unknown"}</td>
        </tr>
        <tr>
          <td>Duration:</td>
          <td>{entry.duration ? `${entry.duration}ms` : "unknown"}</td>
        </tr>
      </tbody>
    </table>
  );
}
function JsonTabContent({ data }: { data: Record<string, any> | undefined }) {
  if (!data) {
    return <EntryDisplayMessage>Missing data.</EntryDisplayMessage>;
  }
  return <JsonDisplay src={data} />;
}
