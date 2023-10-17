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

import UserActions from "@/features/user-management/components/user-actions";
import { User } from "@/features/user-management/domains/user";
import useGetAllUser from "@/features/user-management/hooks/use-get-all-user";

const userGroup: DataTableColumn<User>[] = [
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
          <Stack spacing={0}>
            <Text>{record.fullName}</Text>
            <Text color="dimmed" size="xs">
              {record.email}
            </Text>
          </Stack>
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
];

const subscriptionGroup: DataTableColumn<User>[] = [
  {
    accessor: "subscription.currentSubscriptionId",
    title: "Plan",
    textAlignment: "center",
    width: "10%",
  },
  {
    accessor: "subscription.paidType",
    title: "Duration",
    textAlignment: "center",
    width: "10%",
  },
  {
    accessor: "subscription",
    title: "Expired date",
    textAlignment: "center",
    width: "10%",
    render(record) {
      return <Text>{record.subscriptionExpireDate}</Text>;
    },
  },
];

const actionGroup: DataTableColumn<User>[] = [
  {
    accessor: "action",
    title: "Ban/Unban",
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
          groups={[
            {
              id: "userInformation",
              columns: userGroup,
              style: {
                textAlign: "center",
              },
            },
            {
              id: "subscription",
              columns: subscriptionGroup,
              style: {
                textAlign: "center",
              },
            },
            {
              id: "action",
              columns: actionGroup,
              style: {
                textAlign: "center",
              },
            },
          ]}
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
