import {
  Avatar,
  Badge,
  Container,
  Flex,
  Group,
  Input,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { DataTable, DataTableColumn } from "mantine-datatable";

import UpgradeAction from "@/features/subscription/components/upgrade-action";
import { UpgradeRequest } from "@/features/subscription/domains/upgrade-request";
import useGetAllUpgradeRequest from "@/features/subscription/hooks/use-get-all-upgrade-request";

const columns: DataTableColumn<UpgradeRequest>[] = [
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
          <Avatar src={record.userResponse?.feImageName} />
          <Stack spacing={0}>
            <Text>{record.userResponse?.fullName}</Text>
            <Text color="dimmed" size="xs">
              {record.userResponse?.email}
            </Text>
          </Stack>
        </Group>
      );
    },
  },

  {
    accessor: "paidType",
    title: "Plan type",
    width: "10%",
    textAlignment: "center",
  },

  {
    accessor: "formatPrice",
    title: "Price",
    width: "10%",
    textAlignment: "center",
  },

  {
    accessor: "status",
    title: "Status",
    width: "10%",
    textAlignment: "center",
    render(record) {
      return (
        <Badge variant="filled" color={record.statusColor}>
          {record.status}
        </Badge>
      );
    },
  },

  {
    accessor: "action",
    title: "Action",
    width: "10%",
    textAlignment: "center",
    render(record) {
      return <UpgradeAction domain={record} />;
    },
  },
];

export default function SubscriptionRequestPage() {
  const theme = useMantineTheme();

  const { data, isFetching } = useGetAllUpgradeRequest(undefined);

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
        />
      </Stack>
    </Container>
  );
}
