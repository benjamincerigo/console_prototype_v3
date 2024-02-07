import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    Show,
    TagField,
    TextField,
    NumberField,
    DateField,
} from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export const InstanceShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                {translate("instances.fields.name")}
            </Heading>
            <TextField value={record?.name} />
            <Heading as="h5" size="sm" mt={4}>
                {translate("instances.fields.description")}
            </Heading>
            <TextField value={record?.description} />
            <Heading as="h5" size="sm" mt={4}>
                {translate("instances.fields.id")}
            </Heading>
            <NumberField value={record?.id ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                {translate("instances.fields.status")}
            </Heading>
            <TextField value={record?.status} />
            <Heading as="h5" size="sm" mt={4}>
                {translate("instances.fields.created_at")}
            </Heading>
            <DateField value={record?.created_at} />
        </Show>
    );
};

export default InstanceShow;
