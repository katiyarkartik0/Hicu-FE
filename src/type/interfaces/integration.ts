import { ConfigForm, Configurations } from "./configurations";

export interface Integration {
  id: number;
  name: string;
  image: string;
  description: string;
  config: { name: string; type: string; displayName: string }[];
}

type IntegrationFormField = Integration["config"][number] & {
  value: string | number;
};

export type IntegrationForm = IntegrationFormField[];

export interface IntegrationWithForm extends Integration {
  form: ConfigForm;
  savedConfiguration: Configurations | undefined;
}
