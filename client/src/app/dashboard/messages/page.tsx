import * as React from "react";
import type { Metadata } from "next";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

import { config } from "@/utils/dashboard/config";
import { MessagesFilters } from "./_components/messages-filters";
import { MessagesTable } from "./_components/messages-table";
import type { Messages } from "./_components/messages-table";

export const metadata = {
  title: `Messages | Dashboard | ${config.site.name}`,
} satisfies Metadata;

const messages = [
  {
    id: "USR-010",
    name: "Alcides Antonio",
    brand: "Apple",
    avatar: "",
    subject: "Review Apple MacBook Pro 2023",
    createdAt: dayjs().subtract(2, "hours").toDate(),
  },
  {
    id: "USR-009",
    name: "Marcus Finn",
    brand: "Dell",
    avatar: "",
    subject: "Review Dell XPS 13 2023",
    createdAt: dayjs().subtract(2, "hours").toDate(),
  },
  {
    id: "USR-008",
    name: "Jie Yan",
    brand: "HP",
    avatar: "",
    subject: "Review HP Spectre x360 2023",
    createdAt: dayjs().subtract(2, "hours").toDate(),
  },
  {
    id: "USR-007",
    name: "Nasimiyu Danai",
    brand: "Microsoft",
    avatar: "",
    subject: "Review Microsoft Surface Laptop 4",
    createdAt: dayjs().subtract(2, "hours").toDate(),
  },
] satisfies Messages[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedMessages = applyPagination(messages, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: "1 1 auto" }}>
          <Typography variant="h4">Messages</Typography>
        </Stack>
      </Stack>
      <MessagesFilters />
      <MessagesTable
        count={paginatedMessages.length}
        page={page}
        rows={paginatedMessages}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(
  rows: Messages[],
  page: number,
  rowsPerPage: number
): Messages[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
