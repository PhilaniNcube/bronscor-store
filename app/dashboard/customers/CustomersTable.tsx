import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from '@/schema';

type ComponentProps = {
  profiles: Database['public']['Tables']['profiles']['Row'][]
}

const CustomersTable = ({profiles}:ComponentProps) => {
  return (
    <Table className="w-full">
      <TableRow>
        <TableHead>First Name</TableHead>
        <TableHead>Last Name</TableHead>

      </TableRow>

      <TableBody>
        {profiles.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell>{profile.first_name}</TableCell>
            <TableCell>{profile.last_name}</TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  );
};
export default CustomersTable;
