import { Format } from "@/lib";
import { APIResponse } from "@/models";

export function AuditDetails({
  audit,
}: {
  audit: APIResponse.AuditTrailItems;
}) {
  let parsedAction = "";
  let parsedObject: Record<string, any> = {};

  try {
    const match = audit.details.match(/^(.*?)\s+(\{.*\})$/);
    if (match) {
      parsedAction = match[1];
      parsedObject = JSON.parse(match[2]);
    }
  } catch (err) {
    console.error("Failed to parse audit details JSON", err);
  }

  return (
    <div
      style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}
    >
      <p>
        <strong>Action:</strong> {Format.fromCamelCaseToTitle(audit.action)}
      </p>
      <p>
        <strong>Email:</strong> {audit.userEmail}
      </p>
      <div style={{ marginTop: "1rem" }}>
        <h4>Updated Fields:</h4>
        <ul>
          {Object.entries(parsedObject).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {String(value)}
            </li>
          ))}
        </ul>
      </div>
      <p style={{ marginTop: "1rem", fontStyle: "italic" }}>
        Timestamp: {new Date(audit.timestamp).toLocaleString()}
      </p>
    </div>
  );
}
