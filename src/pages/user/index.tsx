import {
  Avatar,
  Box,
  Container,
  Flex,
  Group,
  Input,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { sentenceCase } from "change-case";
import { DataTable, DataTableColumn } from "mantine-datatable";

import ManageSubscription from "@/features/subscription/components/manage-subscription";
import UserActions from "@/features/user-management/components/user-actions";
import { User } from "@/features/user-management/domains/user";
import useGetAllUser from "@/features/user-management/hooks/use-get-all-user";

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
      return <ManageSubscription domain={record} />;
    },
  },
  {
    accessor: "action",
    title: "Action",
    width: "10%",
    textAlignment: "center",
    render(record) {
      return <UserActions domain={record} />;
    },
  },
];

export default function UserPage() {
  const theme = useMantineTheme();

  const { data, isFetching } = useGetAllUser();

  return (
    <Container my="lg" size="xl" className="">
      <Stack className="flex-1">
        <Flex justify="space-between" align="center">
          <Input
            variant="filled"
            icon={<IconSearch size={theme.fontSizes.md} />}
            placeholder="Tìm kiếm"
            w="100%"
          />
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
