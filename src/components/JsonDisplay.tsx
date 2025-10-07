import ReactJson from "@microlink/react-json-view";

export function JsonDisplay({ src }: { src: object }) {
  return (
    <div className="text-xs">
      <ReactJson
        name={false}
        src={src}
        theme="tomorrow"
        displayArrayKey={false}
        displayDataTypes={false}
        style={{
          backgroundColor: "var(--color-gray-900)",
          padding: "calc(var(--spacing) * 4)",
        }}
      />
    </div>
  );
}
