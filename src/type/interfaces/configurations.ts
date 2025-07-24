export type ConfigForm = {
  [key: string]: string | number;
};

export interface Configurations {
  id: number;
  accountId: number;
  integrationId: number;
  config: ConfigForm;
}