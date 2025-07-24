import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { useNumericParam } from "@/hooks/react-router";

import { configurationsService } from "@/services/configurations";
import { integrationService } from "@/services/integration";

import Form from "./Form";

import { mergeConfigurationsWithIntegrations } from "@/helpers/integrations";

function Integrations() {
  const brandId = useNumericParam("brandId");
  if (!brandId) {
    return "Loading...";
  }
  const integrations = useQuery({
    queryKey: ["integrations"],
    queryFn: integrationService.fetchIntegrations,
    refetchOnWindowFocus: false,
  });

  const configurations = useQuery({
    queryFn: ({ queryKey }) => {
      const [, brandId] = queryKey;
      return configurationsService.getConfigurationsForBrand({
        brandId: Number(brandId),
      });
    },
    queryKey: ["brandConfiguration", brandId],
    refetchOnWindowFocus: false,
    enabled: !!brandId,
  });

  const configuredIntegrations = useMemo(() => {
    if (integrations.data && configurations.data) {
      return mergeConfigurationsWithIntegrations({
        integrations: integrations.data,
        configurations: configurations.data,
      });
    }
    return [];
  }, [integrations.data, configurations.data]);
  return (
    <div className="w-full">
      {configuredIntegrations.map(
        ({ form, savedConfiguration, ...integration }, index) => {
          const key = String(integration.id) + String(brandId) + String(index);
          return (
            <Form
              key={key}
              brandId={Number(brandId)}
              form={form}
              integration={integration}
              savedConfiguration={savedConfiguration}
            />
          );
        }
      )}
    </div>
  );
}

export default Integrations;
