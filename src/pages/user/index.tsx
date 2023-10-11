import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Group,
  Input,
  Select,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconBan, IconDeviceFloppy, IconPlus, IconSearch } from "@tabler/icons-react";
import { sentenceCase } from "change-case";
import { DataTable, DataTableColumn } from "mantine-datatable";

import { User } from "@/features/user-management/domains/user";
import useGetAllUser from "@/features/user-management/hooks/use-get-all-user";
import useRedirect from "@/hooks/use-redirect";

const columns: DataTableColumn<User>[] = [
  {
    accessor: "#",
    title: "#",
    width: "5%",
    textAlignment: "center",
    render(record, index) {
      return index + 1;
    },
  },
  {
    accessor: "fullName",
    title: "Fullname",
    width: "40%",
    render(record) {
      return (
        <Group>
          <Avatar src={record.feImageName} />
          <Text>{record.fullName}</Text>
        </Group>
      );
    },
  },
  {
    accessor: "role",
    title: "Role",
    textAlignment: "center",
    width: "10%",
  },
  {
    accessor: "subscription.currentSubscriptionId",
    title: "Subscription",
    width: "30%",
    textAlignment: "center",
    render(record) {
      return (
        <Select
          data={[
            { value: "BASIC", label: "Basic" },
            { value: "PRO", label: "Pro" },
          ]}
          defaultValue={record.subscription?.currentSubscriptionId}
          onClick={(e) => e.stopPropagation()}
        />
      );
    },
  },
  {
    accessor: "action",
    title: "Action",
    width: "10%",
    textAlignment: "center",
    render() {
      return (
        <Group position="center">
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="filled"
            color="blue"
          >
            <IconDeviceFloppy size="1rem" />
          </ActionIcon>
          <ActionIcon
            onClick={(e) => {
              e.stopPropagation();
            }}
            variant="filled"
            color="red"
          >
            <IconBan size="1rem" />
          </ActionIcon>
        </Group>
      );
    },
  },
];

export default function UserPage() {
  const theme = useMantineTheme();
  const { onRedirect } = useRedirect();

  const { data, isFetching } = useGetAllUser();

  return (
    <Container my="lg" size="xl" className="">
      <Stack className="flex-1">
        <Flex justify="space-between" align="center">
          <Input
            variant="filled"
            icon={<IconSearch size={theme.fontSizes.md} />}
            placeholder="Tìm kiếm"
          />
          <Button onClick={onRedirect("create")} leftIcon={<IconPlus size={theme.fontSizes.md} />}>
            Thêm trường
          </Button>
        </Flex>
        <DataTable
          withBorder
          borderRadius="sm"
          fontSize="md"
          withColumnBorders
          striped
          highlightOnHover
          records={data}
          fetching={isFetching}
          verticalSpacing="sm"
          noRecordsText="Không có dữ liệu"
          columns={columns}
          rowExpansion={{
            allowMultiple: true,
            content: ({ record }) => (
              <Box p="lg">
                <Table striped highlightOnHover withBorder withColumnBorders>
                  <tbody>
                    {record.body.map((item) => (
                      <tr key={item}>
                        <td>{sentenceCase(item)}</td>
                        <td>{record.field(item)?.toString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Box>
            ),
          }}
        />
      </Stack>
    </Container>
  );
}
