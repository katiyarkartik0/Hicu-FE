import { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import queryClient from "@/api/queryClient";

import { configurationsService } from "@/services/configurations";

import type { Integration } from "@/type/interfaces/integration";
import { ConfigForm, Configurations } from "@/type/interfaces/configurations";
import Loader from "@/components/ui/Loader";

const useBrandConfigurations = function () {
  return useMutation({
    mutationFn: configurationsService.upsertBrandConfiguration,
  });
};

function Form({
  form,
  integration,
  savedConfiguration,
  brandId,
}: {
  integration: Integration;
  brandId: number;
  form: ConfigForm;
  savedConfiguration: Configurations | undefined;
}) {
  const [formData, setFormData] = useState<ConfigForm>(form);
  const brandConfiguration = useBrandConfigurations();

  const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
    setFormData((prev: ConfigForm) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    brandConfiguration.mutate(
      {
        id: savedConfiguration?.id,
        brandId,
        integrationId: integration.id,
        config: formData,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["brandConfiguration", brandId, integration.id],
          });
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      onChange={handleChange}
      className="p-4 border rounded mb-4"
    >
      <div className="flex gap-2">
        {" "}
        <div className="w-8 h-8 [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain" dangerouslySetInnerHTML={{ __html: integration.image }} />
        <h2 className="text-xl font-bold mb-2">{integration.name}</h2>
      </div>

      {integration.config.map(
        ({
          name: fieldName,
          type: fieldType,
          displayName: fieldDisplayName,
        }) => (
          <div key={fieldName} className="mb-2">
            <label className="block mb-1 capitalize">{fieldDisplayName}</label>
            <input
              type={fieldType}
              name={fieldName}
              defaultValue={formData[fieldName]}
              className="border p-2 w-full"
              required
            />
          </div>
        )
      )}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {brandConfiguration.isPending ? <Loader /> : "Save changes"}
      </button>
    </form>
  );
}

export default Form;
