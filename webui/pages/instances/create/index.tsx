import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const InstanceCreate: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.name}>
                <FormLabel>{translate("instances.fields.name")}</FormLabel>
                <Input
                    type="text"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.name?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.description}>
                <FormLabel>
                    {translate("instances.fields.description")}
                </FormLabel>
                <Input
                    type="text"
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.description?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};

export default InstanceCreate;
