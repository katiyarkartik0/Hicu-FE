import { useParams } from "react-router-dom";

export function useNumericParam(paramName: string): number | undefined {
    const params = useParams();
    const raw = params[paramName];
    const num = Number(raw);
    return isNaN(num) ? undefined : num;
  }