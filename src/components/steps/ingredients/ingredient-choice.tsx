import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

const IngredientCard = ({ 
    icon: Icon, 
    label, 
    description, 
    checked, 
    onCheckedChange, 
    variant = "preferred" 
  }: {
    icon: React.ElementType,
    label: string,
    description: string,
    checked: boolean | undefined,
    onCheckedChange: (checked: boolean) => void,
    variant: "preferred" | "avoid"
  }) => (
    <div 
      className={`relative overflow-hidden transition-all duration-200 ${
        checked 
          ? variant === "preferred" 
            ? "bg-green-50 border-green-200" 
            : "bg-red-50 border-red-200"
          : "hover:bg-accent"
      } rounded-lg border p-4`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-full ${
          variant === "preferred" 
            ? "bg-green-100 text-green-600" 
            : "bg-red-100 text-red-600"
        }`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <Label className="flex flex-col cursor-pointer" onClick={() => onCheckedChange(!checked)}>
            <span className="font-semibold">{label}</span>
            <span className="text-sm text-muted-foreground">{description}</span>
          </Label>
        </div>
        <Checkbox 
          checked={checked}
          onCheckedChange={onCheckedChange}
          className={`mt-1 ${
            checked && variant === "preferred" 
              ? "border-green-500 bg-green-500 text-white" 
              : checked && variant === "avoid" 
                ? "border-red-500 bg-red-500 text-white" 
                : ""
          }`}
        />
      </div>
    </div>
  );

  
  export default IngredientCard;