import {
    useShow,
    IResourceComponentsProps,
    useTranslate,
    useGo,
} from "@refinedev/core";
import {
    Show,
    TagField,
    TextField,
    NumberField,
    DateField,
} from "@refinedev/chakra-ui";
import { Heading, HStack, Button } from "@chakra-ui/react";
import Link from 'next/link'
import { useForm } from "@refinedev/react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/router'


export const RunOverviewShow: React.FC = () => {
    const router = useRouter()
    const { instanceid } = router.query

    console.log(instanceid);
    const translate = useTranslate();
    const { queryResult } = useShow({
      resource: "instances",
      id: instanceid,
    });
    const { data, isLoading } = queryResult;

    const record = data?.data;
    const {
      register,
      refineCore: { onFinish, formLoading },
      handleSubmit,
      formState: { errors, isSubmitting},
    } = useForm({
        refineCoreProps: {
          resource: "run",
          instanceid: instanceid,
        },
    });
    const go = useGo()
    const onSubmit = (e) => {
      console.log(e);
      go({
        to: {
          resource: "instances",
          id: instanceid,
          action: "show",
        }, 
        type: "push"
      })
    }


    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                {translate("instances.fields.name")}
            </Heading>
            <TextField value={record?.name} />
           <form onSubmit={handleSubmit(onSubmit)}>
             <Button isLoading={isSubmitting} type='submit'>
              {translate("run.start_run")}
            </Button> 
          </form>
        </Show>
    );
};

export default RunOverviewShow;
