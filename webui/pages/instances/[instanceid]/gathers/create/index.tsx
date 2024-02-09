import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const InstanceCreate: React.FC<IResourceComponentsProps> = (instanceid) => {
    console.log(instanceid);
    const translate = useTranslate();
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm({
      redirect: "list",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.platform}>
                <FormLabel>{translate("instances.fields.platform")}</FormLabel>
                <Input
                    type="text"
                    {...register("platform", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.platform?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.source}>
                <FormLabel>{translate("instances.fields.source")}</FormLabel>
                <Input
                    type="text"
                    {...register("source", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.source?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.start_date}>
                <FormLabel>{translate("instances.fields.start_date")}</FormLabel>
                <Input
                    type="text"
                    {...register("start_date", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.start_date?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.end_date}>
                <FormLabel>{translate("instances.fields.end_date")}</FormLabel>
                <Input
                    type="text"
                    {...register("end_date", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.end_date?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.updateing}>
                <FormLabel>{translate("instances.fields.updateing")}</FormLabel>
                <Input
                    type="text"
                    {...register("updateing", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.updateing?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};

export default InstanceCreate;

