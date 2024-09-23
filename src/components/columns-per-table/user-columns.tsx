import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";



/** @type import(@tanstack/react-table).ColumnDef<any> */
export const UserColumns = [
    {
        id: "select",
        header: ({ table}:any) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }:any) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
    {
        header: "Name",
        accessorKey: "name",
        cell: (info:any) => <span>{info.getValue().toString()}</span>,
        enableHiding: false,
    },
    {
        header: "Role",
        accessorKey: "role",
        cell: (info:any) => <span className="flex justify-center items-center w-max "><Badge className=" dark:bg-slate-400 dark:text-blue-900 bg-slate-200 text-black font-extralight border-[1px] border-dashed  border-black dark:border-white p-[1px] px-2  " variant="outline">{info.getValue()}</Badge></span>
    },
    {
        header: "Email",
        accessorKey: "email",
        cell: (info:any) => <span>{info.getValue().toString()}</span>
    },
    {
        header: "Phone",
        accessorKey: "mobile",
        cell: (info:any) => <span>{info.getValue().toString()}</span>
    },
    {
        header: "Created At",
        accessorKey: "_createdAt",
        cell: (info:any) => format(new Date(info.getValue()), "MMMM d, yyyy h:mm:ss a"),
        filterFn: ({row, id, filterValue}:any) => {
            const dateValue = new Date(row.original[id]);
            return <span>{format(dateValue, "MMMM").toLowerCase().includes(filterValue.toLowerCase())}</span>;
        }
    },
];
