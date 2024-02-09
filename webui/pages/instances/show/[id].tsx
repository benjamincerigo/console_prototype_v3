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
import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import Link from 'next/link'

export const InstanceShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Box>
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
            </Box>
            <Box mt={20}>
              <Link
                href= {{
                  pathname: "/instances/[instanceid]/gathers",
                  query: { instanceid: record?.id },
                }}
              >
                <Button>{translate("instances.buttons.view_gathers")}</Button>
            </Link>
            </Box>
        </Show>
    );
};

export default InstanceShow;
