// app/admin/users/page.jsx
"use client";

// --- BAGIAN IMPORT DIMULAI DI SINI ---
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  UserPlus,
  UserCheck,
  UserX,
  Clock,
  Mail,
  ShieldAlert,
  UserCog,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup, // Digunakan untuk mengelompokkan item di DropdownMenu
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Untuk menampilkan avatar pengguna
// --- BAGIAN IMPORT BERAKHIR DI SINI ---

// Mock Data Pengguna dengan Avatar dari Unsplash
const initialUsersData = [
  {
    id: "usr-001",
    name: "Helmi Said",
    email: "helmi.said@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "Admin",
    registrationDate: "2024-01-15T10:00:00Z",
    lastLoginDate: "2025-05-29T14:30:00Z",
    status: "Active",
    emailVerified: true,
  },
  {
    id: "usr-002",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    role: "Customer",
    registrationDate: "2024-03-20T11:20:00Z",
    lastLoginDate: "2025-05-30T09:00:00Z",
    status: "Active",
    emailVerified: true,
  },
  {
    id: "usr-003",
    name: "Citra Lestari",
    email: "citra.lestari@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: "Customer",
    registrationDate: "2024-05-10T09:30:00Z",
    lastLoginDate: "2025-05-28T11:00:00Z",
    status: "Suspended",
    emailVerified: false,
  },
  {
    id: "usr-004",
    name: "Aventis Editor",
    email: "editor@aventis.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    role: "Editor",
    registrationDate: "2024-02-01T15:00:00Z",
    lastLoginDate: "2025-05-25T10:15:00Z",
    status: "Active",
    emailVerified: true,
  },
  {
    id: "usr-005",
    name: "Sari Dewi",
    email: "sari.dewi@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "Customer",
    registrationDate: "2025-05-30T12:00:00Z",
    lastLoginDate: null,
    status: "Pending Verification",
    emailVerified: false,
  },
  {
    id: "usr-006",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    role: "Member",
    registrationDate: "2024-04-12T14:20:00Z",
    lastLoginDate: "2025-05-29T16:45:00Z",
    status: "Active",
    emailVerified: true,
  },
  {
    id: "usr-007",
    name: "Maya Putri",
    email: "maya.putri@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    role: "Customer",
    registrationDate: "2024-06-08T09:15:00Z",
    lastLoginDate: "2025-05-30T08:30:00Z",
    status: "Active",
    emailVerified: true,
  },
  {
    id: "usr-008",
    name: "Doni Pratama",
    email: "doni.pratama@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face",
    role: "Customer",
    registrationDate: "2024-02-28T11:30:00Z",
    lastLoginDate: "2025-05-27T13:20:00Z",
    status: "Deactivated",
    emailVerified: true,
  },
  {
    id: "usr-009",
    name: "Rina Sari",
    email: "rina.sari@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    role: "Editor",
    registrationDate: "2024-03-15T16:45:00Z",
    lastLoginDate: "2025-05-29T10:15:00Z",
    status: "Active",
    emailVerified: true,
  },
  {
    id: "usr-010",
    name: "Fajar Nugroho",
    email: "fajar.nugroho@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
    role: "Customer",
    registrationDate: "2024-07-22T08:00:00Z",
    lastLoginDate: "2025-05-28T19:30:00Z",
    status: "Active",
    emailVerified: true,
  },
  {
    id: "usr-011",
    name: "Indira Sari",
    email: "indira.sari@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    role: "Member",
    registrationDate: "2024-08-10T12:30:00Z",
    lastLoginDate: "2025-05-30T07:45:00Z",
    status: "Suspended",
    emailVerified: false,
  },
  {
    id: "usr-012",
    name: "Reza Pratama",
    email: "reza.pratama@example.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    role: "Customer",
    registrationDate: "2024-09-05T15:20:00Z",
    lastLoginDate: "2025-05-29T14:10:00Z",
    status: "Active",
    emailVerified: true,
  },
];

const USER_ROLES = ["Admin", "Customer", "Editor", "Member"];
const USER_STATUSES = [
  "Active",
  "Suspended",
  "Pending Verification",
  "Deactivated",
];
const ITEMS_PER_PAGE = 10;

const formatDate = (dateString, includeTime = false) => {
  if (!dateString) return "-";
  const options = { year: "numeric", month: "short", day: "numeric" };
  if (includeTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
  }
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const getRoleBadgeVariant = (role) => {
  switch (role.toLowerCase()) {
    case "admin":
      return "destructive";
    case "editor":
      return "info";
    case "customer":
      return "secondary";
    case "member":
      return "outline";
    default:
      return "default";
  }
};

const getStatusBadgeVariant = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return "success";
    case "suspended":
      return "warning";
    case "pending verification":
      return "info";
    case "deactivated":
      return "outline";
    default:
      return "default";
  }
};

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case "active":
      return <UserCheck className="mr-2 h-4 w-4 text-green-600" />;
    case "suspended":
      return <UserX className="mr-2 h-4 w-4 text-yellow-600" />;
    case "pending verification":
      return <Clock className="mr-2 h-4 w-4 text-blue-600" />;
    case "deactivated":
      return <UserX className="mr-2 h-4 w-4 text-gray-500" />;
    default:
      return null;
  }
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setUsers(initialUsersData);
      setIsLoading(false);
    }, 800);
  }, []);

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    return users
      .filter((user) => {
        const searchMatch =
          searchTerm.toLowerCase() === "" ||
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const roleMatch = roleFilter === "all" || user.role === roleFilter;
        const statusMatch =
          statusFilter === "all" || user.status === statusFilter;
        return searchMatch && roleMatch && statusMatch;
      })
      .sort(
        (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
      );
  }, [users, searchTerm, roleFilter, statusFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handleUpdateUser = (userId, field, value) => {
    console.log(`Update user ${userId}: set ${field} to ${value}`);
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, [field]: value } : u))
    );
  };

  const handleDeleteUser = (userId, userName) => {
    if (
      window.confirm(
        `Apakah Anda yakin ingin menghapus pengguna "${userName}" (ID: ${userId})? Tindakan ini tidak dapat diurungkan.`
      )
    ) {
      console.log(`Delete user ${userId}`);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Kelola Pengguna
          </h1>
          <p className="text-gray-500 mt-1">
            Lihat, edit, dan kelola semua pengguna platform.
          </p>
        </div>
        <Link href="/admin/users/create" passHref>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Tambah Pengguna Baru
          </Button>
        </Link>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Filter Pengguna</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="searchUser">Cari (Nama, Email)</Label>
            <div className="relative mt-1">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="searchUser"
                type="text"
                placeholder="Ketik nama atau email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-8"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="roleFilter">Peran (Role)</Label>
            <Select
              value={roleFilter}
              onValueChange={(value) => {
                setRoleFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id="roleFilter" className="w-full mt-1">
                <SelectValue placeholder="Semua Peran" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Peran</SelectItem>
                {USER_ROLES.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="statusFilterUser">Status Pengguna</Label>
            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger id="statusFilterUser" className="w-full mt-1">
                <SelectValue placeholder="Semua Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                {USER_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead className="hidden lg:table-cell">Email</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Terdaftar</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.avatarUrl || undefined}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-primary hover:underline"
                    >
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={getStatusBadgeVariant(user.status)}
                      className="whitespace-nowrap flex w-fit items-center"
                    >
                      {getStatusIcon(user.status)}
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-gray-600">
                    {formatDate(user.registrationDate)}
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Aksi</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Aksi Pengguna</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/users/${user.id}`}
                            className="flex items-center cursor-pointer"
                          >
                            <Eye className="mr-2 h-4 w-4" /> Lihat Profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/users/edit/${user.id}`}
                            className="flex items-center cursor-pointer"
                          >
                            <Edit className="mr-2 h-4 w-4" /> Edit Pengguna
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Ubah Status</DropdownMenuLabel>
                          {USER_STATUSES.filter((s) => s !== user.status).map(
                            (newStatus) => (
                              <DropdownMenuItem
                                key={`status-${newStatus}`}
                                onClick={() =>
                                  handleUpdateUser(user.id, "status", newStatus)
                                }
                                className="cursor-pointer"
                              >
                                {getStatusIcon(newStatus)} Jadikan {newStatus}
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Ubah Peran</DropdownMenuLabel>
                          {USER_ROLES.filter((r) => r !== user.role).map(
                            (newRole) => (
                              <DropdownMenuItem
                                key={`role-${newRole}`}
                                onClick={() =>
                                  handleUpdateUser(user.id, "role", newRole)
                                }
                                className="cursor-pointer"
                              >
                                {newRole === "Admin" ? (
                                  <ShieldAlert className="mr-2 h-4 w-4" />
                                ) : (
                                  <UserCog className="mr-2 h-4 w-4" />
                                )}{" "}
                                Jadikan {newRole}
                              </DropdownMenuItem>
                            )
                          )}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            alert(`Trigger reset password untuk ${user.email}`)
                          }
                          className="cursor-pointer"
                        >
                          <Mail className="mr-2 h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id, user.name)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Hapus Pengguna
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Tidak ada pengguna ditemukan.
                  {(searchTerm ||
                    roleFilter !== "all" ||
                    statusFilter !== "all") &&
                    " Coba ubah filter atau kata kunci pencarian Anda."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Menampilkan{" "}
            <span className="font-medium">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            sampai{" "}
            <span className="font-medium">
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)}
            </span>{" "}
            dari <span className="font-medium">{filteredUsers.length}</span>{" "}
            hasil
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              <ChevronLeft className="h-4 w-4 mr-1 sm:mr-2" /> Sebelumnya
            </Button>
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
            >
              Berikutnya <ChevronRight className="h-4 w-4 ml-1 sm:ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
