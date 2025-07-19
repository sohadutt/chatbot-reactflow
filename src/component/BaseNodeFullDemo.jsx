import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  BaseNode,
  BaseNodeContent,
  BaseNodeHeader,
  BaseNodeHeaderTitle,
} from "@/components/base-node";

const WhatsAppIcon = () => (
  <svg
    className="w-4 h-4"
    fill="#ffffff"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16.001 2.667c-7.364 0-13.334 5.969-13.334 13.333 0 2.352.612 4.653 1.77 6.684l-1.852 6.849 7.06-1.858a13.28 13.28 0 0 0 6.356 1.615h.001c7.364 0 13.333-5.97 13.333-13.334s-5.969-13.333-13.334-13.333zm0 24.889a11.565 11.565 0 0 1-5.916-1.613l-.424-.251-4.187 1.102 1.117-4.09-.276-.45a11.57 11.57 0 1 1 9.686 5.302zm6.293-8.63c-.345-.172-2.037-1.007-2.353-1.123-.316-.117-.547-.172-.778.173s-.89 1.123-1.092 1.353-.4.258-.745.086a9.432 9.432 0 0 1-2.788-1.721 10.377 10.377 0 0 1-1.92-2.378c-.2-.345-.002-.532.15-.703.154-.172.345-.4.517-.601.173-.2.23-.344.345-.573.115-.23.057-.43-.029-.602-.086-.172-.778-1.878-1.066-2.573-.28-.672-.564-.582-.778-.592-.2-.008-.43-.01-.66-.01s-.602.086-.916.43c-.314.344-1.2 1.172-1.2 2.859 0 1.687 1.23 3.315 1.4 3.544.172.229 2.42 3.698 5.872 5.184.821.354 1.462.566 1.961.725.823.262 1.57.225 2.158.137.658-.098 2.037-.83 2.326-1.631.287-.8.287-1.487.201-1.631-.086-.144-.314-.23-.66-.401z" />
  </svg>
);

export const BaseNodeFullDemo = memo(({ data }) => {
  return (
    <BaseNode className="w-96 relative">
      <Handle
        type="target"
        position={Position.Left}
        className="w-10 h-10 bg-green-600 border-none"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-10 h-10 bg-green-600 border-none"
      />

      <BaseNodeHeader className="bg-green-500 text-white rounded-t-md px-3 py-2 flex items-center gap-2">
        <WhatsAppIcon />
        <BaseNodeHeaderTitle>Send Message</BaseNodeHeaderTitle>
      </BaseNodeHeader>

      <BaseNodeContent className="p-4">
        <p className="text-xs text-muted-foreground">{data.message}</p>
      </BaseNodeContent>
    </BaseNode>
  );
});
