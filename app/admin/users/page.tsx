import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import db from "@/db/db"
import { formatCurrency, formatNumber } from "@/lib/formatter"
import PageHeader from "../_components/PageHeader"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { DeleteDropDownItem } from "./_components/UserActions"

const getUsers = () => {
    return db.user.findMany({
        select: {
            id: true,
            email: true,
            orders: { select: { pricePaidInCents: true } },
        },
        orderBy: { createdAt: "desc" },
    })
}

const UsersPage = () => {
    return (
        <>
            <PageHeader>Customers</PageHeader>
            <UsersTable />
        </>
    )
}

export default UsersPage

const UsersTable = async () => {
    const users = await getUsers()

    if (users.length === 0) return <p>No customers found</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map(user => (
                    <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{formatNumber(user.orders.length)}</TableCell>
                        <TableCell>
                            {formatCurrency(
                                user.orders.reduce((sum, o) => o.pricePaidInCents + sum, 0) /
                                100
                            )}
                        </TableCell>
                        <TableCell className="text-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical />
                                    <span className="sr-only">Actions</span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DeleteDropDownItem id={user.id} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}