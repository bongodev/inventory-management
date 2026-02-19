import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useInstanceSearch } from '@/api/hooks/useInstances';

type Instance = {
  _id: string;
  name: string;
  subDomain?: string;
  createdAt: string;
};

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');

  const { instanceSearchQuery } = useInstanceSearch({
    searchQuery: search,
    offset: page,
    limit: rowsPerPage,
  });

  const instances: Instance[] = instanceSearchQuery.data?.data || [];
  const total = instanceSearchQuery.data?.total || 0;
  const totalPages = Math.ceil(total / rowsPerPage);
  const paginatedData: Instance[] = instances;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">All Instances</h1>
      </div>

      {/* Search input */}
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search instances..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded px-3 py-2 w-64"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                ID
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Name
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Sub Domain
              </TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedData.map((inst: Instance, i: number) => (
              <TableRow key={inst._id} className="hover:bg-gray-50 transition">
                <TableCell className="text-sm text-gray-800">
                  {(page - 1) * rowsPerPage + i + 1}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {inst.name}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {inst.subDomain || '-'}
                </TableCell>
                <TableCell className="text-sm text-gray-800">
                  {new Date(inst.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 text-sm">
          Rows per page:
          <Select
            value={String(rowsPerPage)}
            onValueChange={(v) => {
              setRowsPerPage(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-20 bg-white border border-gray-300 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))} //page but never below 1
                className={`hover:bg-gray-100 rounded-md transition ${
                  page === 1 ? 'pointer-events-none opacity-40' : ''
                }`}
              />
            </PaginationItem>

            <span className="text-sm font-medium text-gray-700 px-3">
              Page {page} of {totalPages}
            </span>

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))} //page but never above total page
                className={`hover:bg-gray-100 rounded-md transition ${
                  page === totalPages ? 'pointer-events-none opacity-40' : ''
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
