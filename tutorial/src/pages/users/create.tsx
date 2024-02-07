import { IResourceComponentsProps, useSelect } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Checkbox,
    Select,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    const { options: itemsOptions } = useSelect({
        resource: "items",
    });

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.email}>
                <FormLabel>Email</FormLabel>
                <Input
                    type="email"
                    {...register("email", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.email?.message as string}
                </FormErrorMessage>
            </FormControl>
            <FormControl mb="3" isInvalid={!!(errors as any)?.password}>
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    {...register("password", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.password?.message as string}
                </FormErrorMessage>
            </FormControl>
        </Create>
    );
};

