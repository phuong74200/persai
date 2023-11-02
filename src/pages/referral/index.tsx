import { Avatar, Container, Flex, Group, Input, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { DataTable, DataTableColumn } from "mantine-datatable";

import { components } from "@/api/v1";
import useGetReferral from "@/features/referral/hooks/use-get-referral";

const columns: DataTableColumn<components["schemas"]["UserResponse"]>[] = [
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
    accessor: "referralCode.referralCode",
    title: "Referral code",
    width: "10%",
    textAlignment: "center",
  },

  {
    accessor: "referralCode.referenceNumber",
    title: "Reference number",
    width: "10%",
    textAlignment: "center",
  },
];

export default function ReferralPage() {
  const theme = useMantineTheme();

  const { data, isFetching } = useGetReferral();

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
