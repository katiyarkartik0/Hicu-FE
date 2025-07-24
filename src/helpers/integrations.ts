import type {
  Integration,
  IntegrationWithForm,
} from "@/type/interfaces/integration";
import type {
  ConfigForm,
  Configurations,
} from "@/type/interfaces/configurations";

export const mergeConfigurationsWithIntegrations = ({
  integrations = [],
  configurations = [],
}: {
  integrations: Integration[];
  configurations: Configurations[];
}): IntegrationWithForm[] => {
  const forms = integrations.map((integration) => {
    const savedConfiguration = configurations.find(
      (configuration) => configuration.integrationId === integration.id
    );

    const savedValues: ConfigForm = savedConfiguration?.config || {};

    const form: ConfigForm = Object.fromEntries(
      integration.config.map((field) => {
        const value = savedValues[field.name] || "";
        return [[field.name], value];
      })
    );
    return {
      ...integration,
      form,
      savedConfiguration,
    };
  });

  return forms;
};
