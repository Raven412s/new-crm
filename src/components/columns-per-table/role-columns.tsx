/** @type import(@tanstack/react-table).ColumnDef<IRole> */
export const RoleColumns = [
    {
        header: "Name",
        accessorKey: "name",
        cell: (row:any)=><p>{row.getValue().toString()}</p>
    },
   

];
